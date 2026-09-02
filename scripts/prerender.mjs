#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { insightArticles, solutionPages } from "../src/content.js";
import { caseItems } from "../src/data.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(root, "dist", "client");
const templatePath = path.join(clientDir, "index.html");
const staticRoutes = [
  "/",
  "/services",
  "/cases",
  "/studio",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/insights",
  "/tools/n8n-workflow-library",
  "/tools/ai-automation-calculator",
];
const routes = [
  ...staticRoutes,
  ...caseItems.map((item) => `/cases/${item.slug}`),
  ...insightArticles.map((article) => `/insights/${article.slug}`),
  ...solutionPages.map((solution) => `/solutions/${solution.slug}`),
];

const template = readFileSync(templatePath, "utf8");
const vite = await createServer({
  root,
  configFile: false,
  appType: "custom",
  plugins: [react()],
  server: { middlewareMode: true, hmr: false, ws: false },
  resolve: {
    alias: [
      {
        find: /^react-router-dom$/,
        replacement: path.join(
          root,
          "node_modules/react-router-dom/dist/index.mjs",
        ),
      },
      {
        find: /^react-router$/,
        replacement: path.join(
          root,
          "node_modules/react-router/dist/development/index.mjs",
        ),
      },
    ],
  },
  logLevel: "error",
});

try {
  const { render } = await vite.ssrLoadModule("/src/ssr.jsx");
  const { getSeoForPath, pageJsonLd } = await vite.ssrLoadModule("/src/seo.js");

  const escapeAttribute = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  const replaceTag = (html, pattern, replacement) =>
    pattern.test(html)
      ? html.replace(pattern, replacement)
      : html.replace("</head>", `${replacement}\n  </head>`);

  function withHead(html, route) {
    const { pathname, meta, canonical, image } = getSeoForPath(route);
    const title = escapeAttribute(meta.title);
    const description = escapeAttribute(meta.description);
    const imageAlt = escapeAttribute(`${meta.title} — AI Insider`);
    const robots = meta.noindex
      ? "noindex, follow"
      : "index, follow, max-image-preview:large";
    const jsonLd = JSON.stringify(
      pageJsonLd(meta, pathname, canonical),
    ).replaceAll("<", "\\u003c");

    let result = replaceTag(
      html,
      /<title>[\s\S]*?<\/title>/i,
      `<title>${title}</title>`,
    );
    result = replaceTag(
      result,
      /<meta\s+name=["']description["'][\s\S]*?>/i,
      `<meta name="description" content="${description}" />`,
    );
    result = replaceTag(
      result,
      /<meta\s+name=["']robots["'][\s\S]*?>/i,
      `<meta name="robots" content="${robots}" />`,
    );
    result = replaceTag(
      result,
      /<link\s+rel=["']canonical["'][\s\S]*?>/i,
      `<link rel="canonical" href="${canonical}" />`,
    );
    result = replaceTag(
      result,
      /<meta\s+property=["']og:title["'][\s\S]*?>/i,
      `<meta property="og:title" content="${title}" />`,
    );
    result = replaceTag(
      result,
      /<meta\s+property=["']og:type["'][\s\S]*?>/i,
      `<meta property="og:type" content="${meta.schema === "Article" ? "article" : "website"}" />`,
    );
    result = replaceTag(
      result,
      /<meta\s+property=["']og:description["'][\s\S]*?>/i,
      `<meta property="og:description" content="${description}" />`,
    );
    result = replaceTag(
      result,
      /<meta\s+property=["']og:url["'][\s\S]*?>/i,
      `<meta property="og:url" content="${canonical}" />`,
    );
    result = replaceTag(
      result,
      /<meta\s+property=["']og:image["'][\s\S]*?>/i,
      `<meta property="og:image" content="${image}" />`,
    );
    result = replaceTag(
      result,
      /<meta\s+property=["']og:image:alt["'][\s\S]*?>/i,
      `<meta property="og:image:alt" content="${imageAlt}" />`,
    );
    result = replaceTag(
      result,
      /<meta\s+name=["']twitter:title["'][\s\S]*?>/i,
      `<meta name="twitter:title" content="${title}" />`,
    );
    result = replaceTag(
      result,
      /<meta\s+name=["']twitter:description["'][\s\S]*?>/i,
      `<meta name="twitter:description" content="${description}" />`,
    );
    result = replaceTag(
      result,
      /<meta\s+name=["']twitter:image["'][\s\S]*?>/i,
      `<meta name="twitter:image" content="${image}" />`,
    );
    result = replaceTag(
      result,
      /<script\s+id=["']page-jsonld["'][\s\S]*?<\/script>/i,
      `<script id="page-jsonld" type="application/ld+json">${jsonLd}</script>`,
    );
    if (!result.includes('id="page-jsonld"')) {
      result = result.replace(
        "</head>",
        `  <script id="page-jsonld" type="application/ld+json">${jsonLd}</script>\n  </head>`,
      );
    }
    return result;
  }

  for (const route of routes) {
    const markup = render(route);
    const html = withHead(
      template.replace(
        '<div id="root"></div>',
        `<div id="root">${markup}</div>`,
      ),
      route,
    );
    const output =
      route === "/"
        ? templatePath
        : path.join(clientDir, route.slice(1), "index.html");
    mkdirSync(path.dirname(output), { recursive: true });
    writeFileSync(output, html);
  }
} finally {
  await vite.close();
}

console.log(`Prerendered ${routes.length} routes.`);
