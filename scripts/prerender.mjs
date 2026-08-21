#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(root, "dist", "client");
const templatePath = path.join(clientDir, "index.html");
const routes = [
  "/",
  "/services",
  "/cases",
  "/cases/operatsiina-systema-kreatyvnoi-ahentsii",
  "/cases/ai-rekruter-dlia-ahentsii",
  "/cases/content-factory-ai-video",
  "/studio",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/insights",
  "/insights/n8n-ukrainskoiu",
  "/insights/google-ai-studio-guide",
  "/insights/notebooklm-for-business",
  "/insights/n8n-vs-make-vs-zapier",
  "/insights/ai-agent-what-is-it",
  "/tools/n8n-workflow-library",
  "/tools/ai-automation-calculator",
  "/solutions/real-estate-automation",
  "/solutions/beauty-salon-automation",
  "/solutions/saas-onboarding-ai",
  "/solutions/lead-routing-ai",
  "/solutions/n8n-hosting-switzerland",
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
        replacement: path.join(root, "node_modules/react-router-dom/dist/index.mjs"),
      },
      {
        find: /^react-router$/,
        replacement: path.join(root, "node_modules/react-router/dist/development/index.mjs"),
      },
    ],
  },
  logLevel: "error",
});

try {
  const { render } = await vite.ssrLoadModule("/src/ssr.jsx");

  for (const route of routes) {
    const markup = render(route);
    const html = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    const output = route === "/" ? templatePath : path.join(clientDir, route.slice(1), "index.html");
    mkdirSync(path.dirname(output), { recursive: true });
    writeFileSync(output, html);
  }
} finally {
  await vite.close();
}

console.log(`Prerendered ${routes.length} routes.`);
