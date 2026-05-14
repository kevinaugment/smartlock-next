# SLockHub Tool-First SEO Execution Roadmap

**Goal:** Reposition SLockHub as a tool-first smart-lock decision site where calculators, data transparency, and intent-matched comparison pages drive organic growth.

**Success criteria:**
- Tool outputs are realistic, transparent, and internally consistent.
- High-intent pages lead users into calculators before product or brand exploration.
- Prices, protocol claims, battery ranges, and evidence notes use one shared data policy.
- Each batch is testable with existing TypeScript checks and focused regression tests.

## Batch 1: Trust Breakpoints

**Priority:** P0

Fix issues that can make users distrust the tools immediately.

- Battery calculator: cap unrealistic theoretical outputs and show when a practical planning cap is applied.
- Price display: treat catalog `price_usd` values as cents and format them as USD across Best, Compare, and Product pages.
- Regression tests: lock the battery cap and price formatting behavior.

**Verify:**
- `./node_modules/.bin/tsx tests/battery-life-model.test.ts`
- `./node_modules/.bin/tsx tests/price-format.test.ts`
- `npm run build`

## Batch 2: Tool Page E-E-A-T Template

**Priority:** P1

Upgrade the five highest-value calculator pages into consistent tool SEO pages:

- Battery Life Calculator
- Door Compatibility Checker
- Protocol Wizard
- Signal Strength Calculator
- Lock TCO Calculator

**Status:** Implemented for the core five pages. The shared checks now require answer-first content, formula/decision logic, assumptions, source notes, next-step links, visible FAQs, and evidence panels.

Each page should include:
- answer-first block above supporting copy;
- visible formula or decision logic;
- assumptions and model limits;
- source/evidence panel;
- next-step tool links;
- five visible FAQs matched to long-tail intent.

**Verify:**
- `./node_modules/.bin/tsx tests/evidence-panels.test.ts`
- `./node_modules/.bin/tsx tests/seo-content-consistency.test.ts`
- `./node_modules/.bin/tsx tests/tool-first-seo-pages.test.ts`
- manual review of the five pages.

## Batch 3: Homepage as Tool Router

**Priority:** P1

Make the homepage a calculator and decision-path router, not a generic guide hub.

- First viewport: route by user problem: fit, battery, protocol, signal, cost, rental.
- Add a compact "start with this tool" decision matrix.
- Move article categories below tools.
- Clarify that SLockHub is an independent planning tool and database, not an official lock brand.

**Status:** Implemented. The homepage now leads with calculator-based decision paths, routes secondary search intents to tools/reference pages, and states independent tool-site positioning.

**Verify:**
- homepage copy matches tool-first positioning;
- primary CTAs point to calculators;
- no official-brand language.
- `./node_modules/.bin/tsx tests/home-tool-router.test.ts`

## Batch 4: Programmatic Long-Tail Clusters

**Priority:** P2

Use existing data to grow high-intent clusters.

**Status:** Implemented for the published Best-page cluster. All 20 seeded `/best/*` pages now have dedicated tool-first SEO profiles instead of relying on generic fallback copy, with unique titles/descriptions, intent-specific evidence limits, commercial investigation blocks, and calculator pathways to real tool pages. Tests now cross-check the profile list against the published `top_n_pages` seed data to prevent future Best pages from launching without a dedicated profile.

- Best by use case: Airbnb, renter-friendly, long battery life, Matter, Z-Wave.
- Protocol pages: Wi-Fi vs Z-Wave, Zigbee vs Z-Wave, Thread vs Zigbee, Matter over Thread.
- Comparison pages: brand-vs-brand with calculator validation above product lists.
- Reference tables: battery capacity, protocol power draw, ANSI/BHMA grades, door dimensions.

**Verify:**
- no duplicate titles/descriptions;
- each cluster links back to the relevant calculator;
- pages include evidence/limitations for claims.

## Batch 5: Proprietary Data Layer

**Priority:** P2

Create cite-worthy assets that competitors cannot copy easily.

- Smart Lock Dataset page with verified date and field definitions.
- Reliability index based on battery, protocol, access fallback, door-fit completeness, and data completeness.
- Model data freshness labels on product pages.
- CSV/download path if crawlable HTML tables are already strong.

**Verify:**
- schema and tables are crawlable;
- every dataset field has a source or limitation note;
- internal links from Best, Compare, Brand, and Calculator pages.

## Batch 6: Measurement

**Priority:** P1-P2

Define SEO metrics around tool behavior, not brand-site vanity metrics.

- Tool entrance sessions.
- Calculator completion rate.
- Result-to-next-tool CTR.
- Tool-to-product/comparison CTR.
- GSC clicks and CTR for calculator-intent queries.
- Indexed pages by cluster.

**Expected direction:**
- 90 days: +25-50% long-tail clicks on calculator-adjacent queries after fixes and internal-link cleanup.
- 6 months: +40-80% entrances to Best/Compare/use-case pages once the tool pathways are consistently linked.
- 12 months: 2-3x non-brand organic traffic if the data layer and programmatic clusters are kept fresh.
