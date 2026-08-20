#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { makeWorkflowJson, workflowTemplates } from "../src/content.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "public", "downloads");
mkdirSync(output, { recursive: true });

for (const template of workflowTemplates) {
  writeFileSync(
    path.join(output, `ai-insider-${template.slug}.json`),
    `${JSON.stringify(makeWorkflowJson(template), null, 2)}\n`,
  );
}

console.log(`Generated ${workflowTemplates.length} n8n workflow blueprints.`);
