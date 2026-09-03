#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { caseItems } from "../src/data.js";
import { insightArticles, solutionPages } from "../src/content.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const siteUrl = "https://www.aiinsider.it.com";
const today = "2026-09-03";

const pages = [
  ["/", today, "weekly", "1.0"],
  ["/services", today, "monthly", "0.9"],
  ["/cases", today, "monthly", "0.8"],
  ...caseItems.map((item) => [
    `/cases/${item.slug}`,
    "2026-08-21",
    "monthly",
    "0.8",
  ]),
  ["/studio", today, "monthly", "0.8"],
  ["/about", today, "monthly", "0.6"],
  ["/contact", today, "monthly", "0.6"],
  ["/insights", today, "weekly", "0.9"],
  ...insightArticles.map((article) => [
    `/insights/${article.slug}`,
    article.updated,
    "monthly",
    article.slug.startsWith("n8n") ? "0.9" : "0.8",
  ]),
  ["/tools/n8n-workflow-library", today, "monthly", "0.9"],
  ["/tools/ai-automation-calculator", today, "monthly", "0.9"],
  ...solutionPages.map((solution) => [
    `/solutions/${solution.slug}`,
    today,
    "monthly",
    "0.8",
  ]),
];

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([pathname, lastmod, changefreq, priority]) => `  <url><loc>${siteUrl}${pathname}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`).join("\n")}
</urlset>
`;

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>AI Insider Insights</title>
    <link>${siteUrl}/insights</link>
    <description>Практичні матеріали про n8n, AI-агентів та автоматизацію бізнесу.</description>
    <language>uk-UA</language>
${insightArticles
  .map(
    (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${siteUrl}/insights/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/insights/${article.slug}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${new Date(`${article.updated}T12:00:00Z`).toUTCString()}</pubDate>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;

const llms = `# AI Insider

> AI Insider designs AI agents, business automation, n8n workflows and AI content systems for companies in Ukraine and Switzerland.

Primary language: Ukrainian (uk-UA)
Canonical site: ${siteUrl}

## Core pages
- [Services](${siteUrl}/services)
- [Verified case studies](${siteUrl}/cases)
- [AI Content Studio](${siteUrl}/studio)
- [Insights](${siteUrl}/insights)
- [Contact](${siteUrl}/contact)

## Current research clusters
- [n8n українською](${siteUrl}/insights/n8n-ukrainskoiu)
- [n8n MCP Server](${siteUrl}/insights/n8n-mcp-server)
- [n8n AI Agent](${siteUrl}/insights/n8n-ai-agent)
- [Google Workspace Studio](${siteUrl}/insights/google-workspace-studio-ukrainskoiu)
- [Gemini Notebook / NotebookLM](${siteUrl}/insights/notebooklm-for-business)

## Reusable assets
- [10 n8n workflow JSON blueprints](${siteUrl}/tools/n8n-workflow-library)
- [AI automation ROI calculator](${siteUrl}/tools/ai-automation-calculator)

Editorial policy: official sources, explicit limitations, verification date, measurable process outcomes. No confidential client data is published.
`;

writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
writeFileSync(path.join(publicDir, "feed.xml"), feed);
writeFileSync(path.join(publicDir, "llms.txt"), llms);

console.log(
  `Generated SEO discovery files for ${pages.length} indexable URLs.`,
);
