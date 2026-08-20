# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Visual direction confirmed by user: avoid flat white page backgrounds. Use a colder, darker AI atmosphere with pearl/ice surfaces, deep navy anchor sections, restrained cobalt/cyan glow, dimensional depth, and purposeful motion. Keep the original mockup structure and premium Swiss restraint; wow effects must feel intelligent, not neon-gaming or generic sci-fi.

Updated visual direction: full site content is Ukrainian. Use award-level futuristic editorial composition, selective condensed heavy display typography, and four current service modules. Redesign case studies; Sweezy is the dominant product case and uses its live brand language: black, off-white, and sharp lime green. Never show raster assets as white rectangles; blend or replace them so their background disappears into the section.

Latest correction from user: avoid AI-slop aesthetics. Do not use repeated square panels, oversized condensed headlines across every section, colored word rectangles, generic AI dashboards, or rigid boxed grids. Prefer soft architectural radii, asymmetry, calm editorial typography, generous whitespace, natural product storytelling, and restrained futuristic detail.

Current art direction, confirmed by the user: **mirror the UI/UX of the user's own site sweezy.world**, adapted to AI Insider. Green is banned. `src/system.css` is the single stylesheet — the older layered `styles.css` / `reference-elements.css` / `atelier.css` were deleted, do not reintroduce a stacking-override approach.

SEO goal confirmed on 2026-08-20: grow qualified organic traffic toward 10,000 clicks per month while preserving useful signals from the previous site on `www.aiinsider.it.com`. Never trade relevance for raw impressions. Keep valuable legacy URLs mapped with relevant 301 redirects, return real 404 responses for unknown pages, and treat technical SEO, content clusters, proof, and authority as one program.

Selected Sweezy direction, confirmed 2026-08-20: implement the approved “Swiss Route Atlas” mockup as source of truth. Use an ice/pearl embossed topographic field, atlas coordinates, a thin cyan journey line connecting `100+ / 26 / 3`, and four real Sweezy phones flowing toward one dominant career screen. Lime remains confined to authentic Sweezy UI inside device screens; outer section uses ink, ice, and cyan only.

Swiss Route Atlas correction, confirmed 2026-08-20: background must match the mockup's tactile pearl/ice topographic plaster, not a CSS grid or simple contour strokes. Use `public/assets/sweezy/swiss-atlas-bg.webp`. Cyan route must be one continuous SVG path with aligned circular nodes; never assemble it from disconnected CSS borders.

Selected case-study direction: use the approved “Editorial Hero Case” mockup supplied on 2026-08-18 as source of truth. The section has a spacious off-white editorial header followed by one unified dark media board: dominant logistics case on the left, two stacked secondary cases on the right, cyan outcome metrics, real imagery, thin internal dividers, and working full-card links. Do not return to an equal 2×2 case-card grid.

Durable decisions:

- Type is Inter Variable. Headings weight **750**, letter-spacing **−0.068em**, line-height **0.93** (`.h-xl` / `.h-lg` / `.h-md`). Every meta label, eyebrow and counter uses JetBrains Mono, uppercase, 0.18em tracking.
- Colour-blocked chapters with hard switches, never a gradient blend: `--ink` #08090C, `--paper` #F1F2F4, `--ink-3` #14161B, `--tint` #DCE4F7, accent CTA panel. Order is hero ink → paper proof → ink → paper → paper tabs → ink values → paper method → ink stories → tint Sweezy → paper FAQ → accent CTA → ink footer.
- Accent replaces Sweezy's lime: `--accent` #4FE3FF electric cyan, always with dark `#04252C` text on it. `--cobalt` #2B4BFF and `--sky` #A9C8FF complete the multicolour card quadrant with `--paper`.
- Radii: pills 999px, cards 30px, panels 34px.
- Components carried over from Sweezy: pinned cinematic hero with `001 / 004` stage counter and progress rail, floating stage pill, proof strip, 2×2 cards with one accent-filled, photo case cards with circular index badge, segmented tab bar + dark detail panel, multicolour value cards, numbered method rows, review card with ghost quote mark and arrow nav, eyebrow+accordion FAQ, giant accent CTA panel containing a dark inner panel, four-column footer.
- The hero is a four-clip cinematic dolly through one location, "хаос → система", supplied by the user and stored in `public/assets/journey/`. The clips are chained frame-to-frame: the last frame of clip N is the first frame of clip N+1. Therefore each clip **plays once and holds its last frame — never loop them**, and the stage crossfade stays short (0.45s); a long fade between identical frames reads as a ghost. Stages are declared in the `stages` array at the top of `src/App.jsx`.
- Clip `src` is attached lazily (current stage + next only), posters carry the gap, and `prefers-reduced-motion` or `navigator.connection.saveData` falls back to posters only. Source clips are 1916×1080 / 24fps / 4.04s; re-encode with `-crf 25 -preset slow -g 48 -movflags +faststart` and no audio track.
- The cyan route line is inside the footage — do not draw an SVG path over it.
- Every glass render in `public/assets` sits on a white background: on dark surfaces they need `filter: invert(1) hue-rotate(176deg) …` (see `.case-img.is-inverted`, `.card-art`); on light or accent surfaces use `mix-blend-mode: multiply` instead.
- Recharts is intentionally uninstalled — no chart-library dashboards.
- SEO growth model: Ukrainian traffic engine around `n8n`, `Google AI Studio`, `NotebookLM` and `AI agent`; commercial long-tail pages convert that traffic into process audits. Every insight needs first-hand structure, explicit limitations, author/date, internal links and a reusable asset. Do not mass-produce generic AI articles.
- Preserve valuable legacy search signals with intent-matched 301 redirects. Current primary migration targets: old n8n content → `/insights/n8n-ukrainskoiu`; AI-agent guides → `/insights/ai-agent-what-is-it`; real-estate and SaaS pages → matching `/solutions/` pages.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
