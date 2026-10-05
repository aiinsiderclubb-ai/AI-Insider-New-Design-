import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { insightArticles, solutionPages } from "../src/content.js";
import { caseItems } from "../src/data.js";

const rootUrl = new URL("../", import.meta.url);
const read = (pathname) => readFile(new URL(pathname, rootUrl), "utf8");

test("Vercel keeps prerendered documents and real 404 responses", async () => {
  const config = JSON.parse(await read("vercel.json"));
  assert.equal(config.rewrites, undefined);
  assert.ok(config.redirects.length >= 30);
  assert.ok(config.redirects.every((redirect) => redirect.permanent === true));
  assert.ok(
    config.redirects.some(
      ({ source, destination }) =>
        source === "/uk/blog/n8n-for-content-automation" &&
        destination === "/insights/n8n-ukrainskoiu",
    ),
  );
  assert.ok(
    config.redirects.some(
      ({ source, destination }) =>
        source === "/en/blog/ai-cold-calling-agent-that-books-meetings" &&
        destination === "/insights/ai-sdr-b2b-outbound",
    ),
  );
  assert.ok(
    config.redirects.some(
      ({ source, destination }) =>
        source === "/en/cases/real-estate-operations-os" &&
        destination === "/solutions/real-estate-automation",
    ),
  );
  assert.ok(
    config.redirects.some(
      ({ source, destination }) =>
        source === "/en/ai-proposal-generator" &&
        destination === "/solutions/ai-proposal-generator-for-agencies",
    ),
  );
});

test("every indexable content route is present once in sitemap", async () => {
  const sitemap = await read("public/sitemap.xml");
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  const expectedPaths = [
    "/",
    "/services",
    "/solutions",
    "/cases",
    ...caseItems.map(({ slug }) => `/cases/${slug}`),
    "/studio",
    "/about",
    "/contact",
    "/insights",
    ...insightArticles.map(({ slug }) => `/insights/${slug}`),
    "/tools/n8n-workflow-library",
    "/tools/ai-automation-calculator",
    ...solutionPages.map(({ slug }) => `/solutions/${slug}`),
  ];

  assert.equal(locations.length, expectedPaths.length);
  assert.equal(new Set(locations).size, locations.length);
  for (const pathname of expectedPaths) {
    assert.ok(
      locations.includes(`https://www.aiinsider.it.com${pathname}`),
      pathname,
    );
  }
});

test("insight library has unique, sourced, internally linked articles", () => {
  assert.ok(insightArticles.length >= 13);
  assert.equal(
    new Set(insightArticles.map(({ slug }) => slug)).size,
    insightArticles.length,
  );
  assert.equal(
    new Set(insightArticles.map(({ title }) => title)).size,
    insightArticles.length,
  );

  const slugs = new Set(insightArticles.map(({ slug }) => slug));
  for (const article of insightArticles) {
    assert.ok(
      article.description.length >= 100,
      `${article.slug}: description`,
    );
    assert.ok(article.sections.length >= 3, `${article.slug}: sections`);
    assert.ok(article.faq.length >= 2, `${article.slug}: faq`);
    assert.ok(article.sources.length >= 1, `${article.slug}: sources`);
    assert.ok(article.related.length >= 2, `${article.slug}: related`);
    assert.ok(
      article.related.every((slug) => slugs.has(slug)),
      `${article.slug}: bad related slug`,
    );
  }

  const course = insightArticles.find(
    ({ slug }) => slug === "n8n-kurs-ukrainskoiu",
  );
  assert.ok(course);
  assert.equal(
    course.sections.filter(({ id }) => id.startsWith("lesson-")).length,
    7,
  );
  assert.equal(course.destination?.to, "/solutions/n8n-hosting-switzerland");
});

test("GSC opportunity solutions have rich proof and measurement content", () => {
  for (const slug of [
    "beauty-salon-automation",
    "ai-recruiter-agency",
    "ai-inbound-call-automation",
  ]) {
    const solution = solutionPages.find((item) => item.slug === slug);
    assert.ok(solution, slug);
    assert.ok(solution.details.length >= 3, `${slug}: details`);
    assert.ok(solution.measurement.length >= 3, `${slug}: measurement`);
    assert.ok(solution.related.length >= 2, `${slug}: related`);
  }
});

test("prerendered insight has route-specific head, schema and body", async () => {
  const html = await read("dist/client/insights/n8n-mcp-server/index.html");
  assert.match(html, /<title>n8n MCP Server:/);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/www\.aiinsider\.it\.com\/insights\/n8n-mcp-server"/,
  );
  assert.match(html, /property="og:type" content="article"/);
  assert.match(html, /"@type":"Article"/);
  assert.match(
    html,
    /"citation":\["https:\/\/blog\.n8n\.io\/n8n-mcp-server\/"/,
  );
  assert.match(html, /MCP server і MCP Server Trigger/);
  assert.doesNotMatch(
    html,
    /AI-автоматизація бізнесу та AI-агенти \| AI Insider<\/title>/,
  );
});

test("RSS and llms discovery files expose current research routes", async () => {
  const [feed, llms] = await Promise.all([
    read("public/feed.xml"),
    read("public/llms.txt"),
  ]);
  assert.match(feed, /<language>uk-UA<\/language>/);
  assert.match(feed, /\/insights\/n8n-mcp-server/);
  assert.match(llms, /\/insights\/google-workspace-studio-ukrainskoiu/);
});

test("AI recruiter case exposes indexable video proof", async () => {
  const html = await read(
    "dist/client/cases/ai-rekruter-dlia-ahentsii/index.html",
  );
  assert.match(html, /AI-рекрутер для агенції: Telegram-бот/);
  assert.match(html, /"@type":"VideoObject"/);
  assert.match(html, /ai-recruiter-demo\.mp4/);
  assert.match(html, /Увесь шлях кандидата/);
  assert.match(html, /ai-recruiter-demo-v2\.mp4/);
});

test("new SEO cluster pages expose canonical content and Service schema", async () => {
  const [course, recruiter, calls] = await Promise.all([
    read("dist/client/insights/n8n-kurs-ukrainskoiu/index.html"),
    read("dist/client/solutions/ai-recruiter-agency/index.html"),
    read("dist/client/solutions/ai-inbound-call-automation/index.html"),
  ]);

  assert.match(course, /Курс n8n українською: 7 практичних уроків/);
  assert.match(course, /https:\/\/docs\.n8n\.io\/learning-paths/);
  assert.match(course, /\/solutions\/n8n-hosting-switzerland/);
  assert.match(recruiter, /AI-рекрутер для агенції/);
  assert.match(recruiter, /"@type":"Service"/);
  assert.match(recruiter, /\/cases\/ai-rekruter-dlia-ahentsii/);
  assert.match(calls, /ШІ-обробка вхідних дзвінків/);
  assert.match(calls, /"serviceType":"ШІ-обробка вхідних дзвінків/);
});
