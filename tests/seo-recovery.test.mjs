import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { insightArticles, solutionPages } from "../src/content.js";

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");
const site = "https://www.aiinsider.it.com";
const attr = (html, selector, attribute) => {
  const tag = html.match(new RegExp(`<[^>]+${selector}[^>]*>`, "i"))?.[0];
  return tag?.match(new RegExp(`${attribute}="([^"]*)"`))?.[1];
};
const routes = async () =>
  [...(await read("public/sitemap.xml")).matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (m) => m[1].replace(site, "") || "/",
  );
const documentFor = (route) =>
  read(`dist/client${route === "/" ? "" : route}/index.html`);

test("every public page has unique metadata, one H1 and a connected structured-data graph", async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const route of await routes()) {
    const html = await documentFor(route);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: H1`);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    const description = attr(html, 'name="description"', "content");
    assert.ok(title?.length > 15 && !titles.has(title), `${route}: title`);
    assert.ok(
      description?.length > 50 && !descriptions.has(description),
      `${route}: description`,
    );
    titles.add(title);
    descriptions.add(description);
    assert.equal(
      attr(html, 'rel="canonical"', "href"),
      `${site}${route === "/" ? "" : route}`,
      route,
    );
    assert.match(
      attr(html, 'name="robots"', "content"),
      /^index, follow/,
      route,
    );
    assert.equal(
      attr(html, 'property="og:image"', "content"),
      attr(html, 'property="og:image:secure_url"', "content"),
      route,
    );
    const graph = JSON.parse(
      html.match(/<script id="page-jsonld"[^>]*>(.*?)<\/script>/s)[1],
    )["@graph"];
    const page = graph.find((node) => node["@id"]?.endsWith("#webpage"));
    assert.ok(page, route);
    if (page.mainEntity) {
      const entity = graph.find(
        (node) => node["@id"] === page.mainEntity["@id"],
      );
      assert.ok(entity, `${route}: mainEntity resolves`);
      if (entity["@type"] === "Article") {
        assert.ok(
          entity.image.length && entity.author.url && entity.datePublished,
          route,
        );
        assert.equal(entity.mainEntityOfPage["@id"], page["@id"]);
        assert.ok(
          entity.dateModified >= entity.datePublished &&
            entity.dateModified <= "2026-10-05",
          route,
        );
      }
    }
    const imagePath = attr(html, 'property="og:image"', "content").replace(
      site,
      "",
    );
    await access(new URL(`../dist/client${imagePath}`, import.meta.url));
  }
});

test("all rendered internal links and downloadable assets resolve", async () => {
  const paths = new Set([...(await routes()), "/privacy", "/terms"]);
  const issues = new Set();
  for (const route of paths) {
    const html = await documentFor(route);
    for (const [, href] of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
      if (paths.has(href) || paths.has(href.replace(/\/$/, ""))) continue;
      try {
        await access(new URL(`../dist/client${href}`, import.meta.url));
      } catch {
        issues.add(`${route} → ${href}`);
      }
    }
  }
  assert.deepEqual([...issues], []);
});

test("404 is a branded recovery document and never enters the sitemap", async () => {
  const html = await read("dist/client/404.html");
  assert.match(html, /Загубили сторінку/);
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.doesNotMatch(html, /rel="canonical"/);
  for (const route of ["/insights", "/services", "/cases"])
    assert.ok(html.includes(`href="${route}"`));
  assert.ok(!(await routes()).includes("/404"));
});

test("all permanent legacy redirects lead directly to a current document", async () => {
  const config = JSON.parse(await read("vercel.json"));
  const current = new Set(await routes());
  const sources = new Set();
  for (const rule of config.redirects) {
    assert.ok(!sources.has(rule.source), rule.source);
    sources.add(rule.source);
    assert.equal(rule.permanent, true);
    assert.ok(
      current.has(rule.destination.split("#")[0]),
      `${rule.source} → ${rule.destination}`,
    );
  }
  assert.ok(sources.has("/en/solutions/ai-for-ecommerce"));
  assert.ok(sources.has("/uk/blog/ai-sdr-workflow-for-b2b-outbound"));
});

test("practice downloads include real sources and explicit limits; every solution has acceptance criteria", async () => {
  const practices = insightArticles.filter((a) => a.practice);
  assert.equal(practices.length, 14);
  for (const article of practices) {
    const text = await read(`public/downloads/guides/${article.slug}.md`);
    assert.match(text, /Навчальне завдання на синтетичних даних/);
    assert.ok(text.includes(article.practice.limit));
    assert.ok(text.includes(article.sources[0][1]));
    assert.doesNotMatch(text, /undefined/);
  }
  for (const solution of solutionPages) {
    assert.ok(solution.details?.length >= 3, solution.slug);
    assert.ok(solution.measurement?.length >= 3, solution.slug);
    assert.ok(solution.related?.length >= 2, solution.slug);
  }
});
