# Design QA — case studies / option 1

## Source and evidence

- Selected source: `/var/folders/h0/856jbdbx62dc4n9mfh_35k540000gn/T/codex-clipboard-3132ab11-5132-4ab2-994c-fe5ae1f26eb4.png`.
- Implementation URL: `http://localhost:5174/#work`.
- Desktop viewport: `1487 × 1058` CSS px, DPR 1.
- Mobile viewport: `390 × 844` CSS px, DPR 1.
- Desktop capture: `/Users/vladyslav.katash/Insider Website /implementation-cases-desktop-final.png`.
- Mobile capture: `/Users/vladyslav.katash/Insider Website /implementation-cases-mobile-final.png`.
- Full-view side-by-side: `/Users/vladyslav.katash/Insider Website /design-comparison-cases-final.png`.
- No focused crop required: source and implementation stay fully readable at native 1487 px width.

## Fidelity review

- Composition: off-white editorial header, three-line statement, right-aligned context copy, one unified dark case board.
- Grid: board begins at `y=389.3 px`, measures `1321.1 × 645 px`, and uses the source's dominant-left / stacked-right split.
- Content: logistics remains dominant; insurtech and retail occupy the right rail. Cyan metrics, thin rules, compact metadata, and dark image treatment follow the source.
- Assets: industrial and glass imagery reuse project assets. Retail aisle uses a new cold-blue, text-free image matched to the selected visual direction.
- Responsive: mobile board stacks into one featured case plus two secondary cases. Document width equals viewport width (`390 px`); no horizontal overflow.
- Interaction: all three case surfaces are semantic links. Primary case click changes URL to `#contact`.
- Runtime: browser console produced no warnings or errors during desktop review.

## Iteration history

- Iteration 1 — P2: section headline and featured title wrapped too broadly. Fixed headline measure, explicit desktop line breaks, divider placement, and featured text rhythm.
- Iteration 1 — P2: board started below source position. Fixed header spacing; final board top matches source at approximately `389 px`.
- Iteration 2 — P2: featured result block sat low. Increased action separation so content stack rises while action remains bottom-aligned.
- Final review: no P0, P1, or P2 visual defects remain. Minor image-content differences are intentional because source photography was not supplied as separate assets.

## Verification

- `npm run build`: passed.
- `npm run test:sites`: 4/4 passed.
- Sites artifacts produced: `dist/client/index.html`, `dist/server/index.js`, `dist/.openai/hosting.json`.

final result: passed
