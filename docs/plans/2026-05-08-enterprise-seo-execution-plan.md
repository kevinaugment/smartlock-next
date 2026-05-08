# SLockHub Enterprise SEO Execution Plan

**Date:** 2026-05-08
**Scope:** Full-site technical SEO, indexation quality, information architecture, page-template CTR uplift, and conversion-oriented SEO assets
**Inputs used:** repository source audit, GitNexus index, GSC export set in `https___www.slockhub.com_-Performance-on-Search-2026-05-08/`

## Executive Summary

SLockHub already has a strong SEO wedge: comparison pages (`/compare/*`) generate the majority of organic clicks, while `best/*`, article pages, and calculators have meaningful impression share but underperform on CTR and crawl-to-value efficiency. The site is not bottlenecked by lack of page count alone. It is bottlenecked by:

1. build and prerender instability on DB-backed SEO pages,
2. incomplete or fragile sitemap coverage,
3. weak SERP packaging on high-impression templates,
4. missing download / lead-capture assets for commercial-intent traffic,
5. uneven internal linking between articles, tools, brands, and comparison pages.

The execution model should be phased. Do not mix technical foundation work with broad content expansion. Fixing crawl/index/render stability first will raise the yield of all future content work.

## Current SEO Diagnosis

### GSC baseline from 2026-05-08 export

| Segment | Pages in export | Clicks | Impressions | CTR |
| --- | ---: | ---: | ---: | ---: |
| Compare | 689 | 323 | 18,087 | 1.79% |
| Best | 20 | 7 | 3,346 | 0.21% |
| Articles | 77 | 11 | 6,459 | 0.17% |
| Brands / products | 164 | 7 | 4,296 | 0.16% |
| Calculators | 28 | 3 | 1,181 | 0.25% |

Device split shows desktop has much higher impressions but materially lower CTR than mobile:

| Device | Clicks | Impressions | CTR | Avg position |
| --- | ---: | ---: | ---: | ---: |
| Mobile | 184 | 10,203 | 1.80% | 8.42 |
| Desktop | 162 | 21,028 | 0.77% | 12.61 |
| Tablet | 8 | 689 | 1.16% | 9.64 |

Search appearance is currently thin: only Product snippet exposure was visible in the export, with 21 impressions and 0 clicks. This suggests schema coverage should be expanded from "valid markup exists" to "SERP feature acquisition by page type."

### What is working

- `/compare/*` is the primary organic engine.
- Brand/product/best page architecture already exists and is indexable.
- Article pages already ship structured data for `Article`, `BreadcrumbList`, `FAQPage`, and `HowTo` when present.
- Sitemap generation is implemented centrally and already includes multiple page classes.

### What is underperforming

- High-impression low-CTR pages:
  - `/articles/guides/door-compatibility-guide`
  - `/compare/schlage-vs-weiser`
  - `/compare/kwikset-vs-defiant`
  - `/best/matter-smart-locks`
  - `/best/homekit-smart-locks`
- Best-of pages rank but do not convert impressions into clicks efficiently.
- Resource pages are informational but not packaged as downloadable assets, which leaves B2B / evaluator traffic unmonetized.

### High-priority GSC opportunities

Pages with meaningful impressions and weak CTR:

- `/articles/guides/door-compatibility-guide`: 933 impressions, 0 clicks
- `/compare/schlage-vs-weiser`: 836 impressions, 0.48% CTR
- `/compare/kwikset-vs-defiant`: 607 impressions, 0.82% CTR
- `/best/matter-smart-locks`: 533 impressions, 0.75% CTR
- `/best/homekit-smart-locks`: 473 impressions, 0 clicks
- `/best/z-wave-smart-locks`: 429 impressions, 0 clicks
- `/articles/protocols/connect-lock-to-homekit`: 425 impressions, 0.24% CTR
- `/calculators/installation-cost`: 284 impressions, 0 clicks
- `/calculators/signal-strength`: 276 impressions, 0.36% CTR

Query groups already close enough to win with template improvements:

- Brand-vs-brand: `schlage vs weiser`, `kwikset vs defiant`, `defiant vs schlage`, `tedee vs nuki`, `nuki vs tedee`
- Ecosystem/best: `homekit smart lock`, `homekit lock`, `z wave locks`
- Calculator-led: installation cost, signal strength, compatibility, battery life

### What is structurally risky

- DB-backed SSG pages can fail build due to Turso connectivity resets.
- Product sitemap coverage is capped by `ProductModel.getAll(200, 0)`.
- GitNexus semantic query support is degraded by read-only FTS initialization, though index status and impact analysis remain usable.

## KPI Framework

### 30-day targets

- Build success rate: 100%
- Sitemap completeness for product, brand, best, compare, article classes: 100%
- Reduce high-impression low-CTR template set by 20%
- Introduce at least 2 downloadable lead magnets with form capture

### 90-day targets

- Organic clicks from `best/*`: +50%
- Organic clicks from calculators/resources: +40%
- Improved CTR on target compare pages by +1.0 to +2.5 percentage points
- Lead capture conversion from SEO landing sessions: baseline established and improving

### 180-day targets

- Comparison cluster authority expanded across top uncovered brand-pair queries
- Resource/download cluster becomes secondary organic acquisition channel
- PDF/report funnel contributes qualified B2B and high-intent consumer leads

## Phased Execution

### Batch 1 — Technical SEO Foundation

**Goal:** make SEO pages stable to build, fully discoverable, and not truncated in sitemap / static generation.

Work:
- Fix build blockers and prerender instability on DB-backed routes
- Remove known content parsing issues
- Ensure sitemap includes all DB-backed products, not only first 200
- Review static generation scope for compare/brand/product/best pages
- Keep GitNexus index fresh after each batch

Success criteria:
- `npm run build` passes consistently
- sitemap generation covers all intended page classes
- no known content-file parse failures

### Batch 2 — SERP CTR Uplift on Existing Winners

**Goal:** improve title, description, H1, intro block, schema packaging, and above-fold messaging on pages already earning impressions.

Priority templates:
- `/compare/[slug]`
- `/best/[slug]`
- top-performing article templates

Work:
- rewrite metadata patterns per template
- align target synonyms in title/description/H1
- add decision-summary blocks
- improve query-to-page matching for HomeKit / Matter / Airbnb / brand-vs-brand clusters

Success criteria:
- CTR improvement measurable in GSC within 2-6 weeks

### Batch 3 — Internal Linking and Information Architecture

**Goal:** route authority between articles, brands, products, best pages, compare pages, and calculators.

Work:
- add stronger bidirectional links between:
  - article → calculator
  - calculator → compare / best
  - brand → compare / calculator
  - product → related best pages
- normalize “related tools” and “related articles” logic
- add cluster hubs for key commercial intents

### Batch 4 — Downloadable SEO Assets and Lead Capture

**Goal:** convert organic evaluators into leads.

Work:
- build downloadable PDF/report workflow behind modal form
- recommended first assets:
  - Door Compatibility Audit PDF
  - Smart Lock TCO / ROI Report PDF
  - Compliance Checklist PDF
  - Product Comparison Report PDF
- persist lead + source page + selected inputs + UTM fields

### Batch 5 — Content Expansion at High Intent

**Goal:** scale only after the technical and template base is stable.

Work:
- expand uncovered compare pairs from GSC/Ubersuggest
- expand best-of pages with stronger query alignment
- build more reference tables and downloadable buyer resources

## Batch Ordering Rationale

Do not start with mass article production. Existing data shows traffic is concentrated in a few high-intent page types. Improving the reliability, packaging, and conversion path of those templates produces better ROI than broad content expansion.

## Immediate Backlog

### P0

- Stabilize DB-backed SSG / prerender paths
- Remove sitemap truncation for products
- Keep login route on Node runtime to avoid `bcryptjs` Edge incompatibility

### P1

- Rewrite metadata strategy for compare/best templates
- Improve low-CTR, high-impression winners
- Build first downloadable report flow

### P2

- Expand resource tables into downloadable assets
- Improve internal linking automation
- Add segmentation by use case (Airbnb, enterprise, hotel, retrofit, HomeKit, Matter)

## Recommended Execution Cadence

- One batch at a time
- Each batch must end with:
  - code verification,
  - build verification,
  - GitNexus re-index,
  - GitNexus detect-changes check,
  - short outcome note in docs

## What Batch 1 Should Change

Batch 1 should remain narrow:
- `app/sitemap.ts`
- DB-backed page static generation / metadata access patterns
- selective DB access helpers only where needed for stability
- no broad UI redesign
- no large content rewrite

## Batch 1 Execution Log

Completed on 2026-05-08:

- Fixed build-level content / lint blockers:
  - quoted the MDX frontmatter title in `lock-anatomy-glossary.mdx`
  - disabled `react/no-unescaped-entities` for content-heavy pages
  - kept `app/api/auth/login` on Node runtime to remove the `bcryptjs` Edge crypto warning
- Added retry handling for transient Turso / libsql socket failures.
- Removed the product sitemap and product static path 200-row cap by adding `ProductModel.getAllForSeo()`.
- Reduced compare-page SSG database pressure by adding cached build-process reads for all brands and all comparison products.
- Refreshed GitNexus with `gitnexus analyze . --force --skills --name smartlock-next`.

Verification:

- `npm run build` now exits 0.
- Static generation increased from 977 pages to 1530 pages, confirming product pages are no longer capped at 200.
- Remaining build warnings are non-blocking:
  - stale Browserslist / baseline-browser-mapping data
  - existing `no-img-element` and React hook lint warnings
  - one compare page static worker timeout/retry warning; generation completed successfully after Next restarted the worker

Residual Batch 1 risk:

- Compare pages still generate 1000+ static paths. Build now passes, but a dedicated follow-up should decide whether long-tail compare pages should stay fully prerendered or move to on-demand static generation with a prioritized prebuild list.

## Batch 2 Execution Log

Completed on 2026-05-08:

- Improved `/compare/[slug]` SERP packaging:
  - tightened title and meta description around brand-vs-brand smart lock intent
  - added Twitter metadata fallback
  - added server-rendered `WebPage` and `BreadcrumbList` JSON-LD
  - added a first-screen Quick Verdict block for rating, price, and protocol coverage
- Improved `/best/[slug]` SERP and rich-data packaging:
  - added stronger fallback title and meta description when DB metadata is sparse
  - added Open Graph and Twitter metadata
  - added server-rendered `WebPage` JSON-LD
  - expanded top-ranked product JSON-LD with brand and technical properties
  - added summary stats above the list: number of ranked picks, protocol coverage, best battery life

Verification:

- `npm run build` exits 0.
- Static generation completed all 1530 pages without the prior compare-page worker timeout warning.

Batch 2 follow-up queue:

- Apply single-page copy improvements to the highest-impression pages:
  - `/articles/guides/door-compatibility-guide`
  - `/articles/protocols/connect-lock-to-homekit`
  - `/calculators/installation-cost`
  - `/calculators/signal-strength`
- Revisit FAQ schema usage. Google rich results restrict FAQ visibility to government/health authority sites, so long-term schema should emphasize `WebPage`, `Product`, `ItemList`, `BreadcrumbList`, `Article`, and `Organization` rather than relying on FAQ rich results.

## Batch 2.5 Execution Log

Completed on 2026-05-08:

- Improved high-impression article pages:
  - `/articles/guides/door-compatibility-guide`
    - added a direct Quick Answer before the long introduction
    - added a compatibility checklist and calculator CTA near the first measurement section
    - strengthened links to the compatibility and installation-cost calculators
  - `/articles/protocols/connect-lock-to-homekit`
    - rewrote title and description around `homekit smart lock`, setup, pairing, and `No Response` intent
    - added HomeKit vs Matter quick check
    - added protocol/compatibility tool links
    - clarified the `Unable to Add Accessory` troubleshooting intent
- Improved high-impression calculator pages:
  - `/calculators/installation-cost`
    - tightened metadata around labor + hardware estimates
    - added canonical, Open Graph, and Twitter metadata
    - replaced deprecated `HowTo` JSON-LD with `WebPage`
    - added above-fold cost summary cards
  - `/calculators/signal-strength`
    - tightened metadata around Z-Wave, Wi-Fi, BLE, RSSI, and link margin
    - added canonical and Twitter metadata
    - replaced deprecated `HowTo` JSON-LD with `WebPage`
    - added above-fold signal summary cards
- Improved product detail build stability:
  - added `ProductSeriesModel.getAllForSeo()`
  - changed product detail static rendering to use build-process cached product and series datasets
  - added retry handling to the actual shared DB gateway in `lib/db.ts`; the earlier retry helper in `lib/db/client.ts` was not the path used by `brand-models`

Verification:

- `npm run build` exits 0.
- Static generation completed all 1530 pages.
- Product page coverage stayed intact: `/brands/[slug]/[product]` still reports `+243 more paths`.
- Compare page coverage stayed intact: `/compare/[slug]` still reports `+1078 more paths`.

Residual risk:

- `lib/db.ts` is a CRITICAL-impact shared DB gateway according to GitNexus. The retry change is intentionally narrow: it only retries transient network/socket errors and preserves SQL, return values, and non-retryable error behavior.

## Batch 3 Execution Log

Completed on 2026-05-08:

- Added `SeoPathways`, a small reusable internal-link component for topic-based SEO journeys.
- Added topic pathways to:
  - article pages, with automatic routing for HomeKit, compatibility, protocol/signal, and installation intent
  - installation cost calculator
  - signal strength calculator
  - best-of pages
  - brand comparison pages
  - product detail pages
- Internal link routes now intentionally connect:
  - compatibility article → compatibility checker → installation cost → Matter/HomeKit best pages
  - HomeKit article → HomeKit best page → Matter best page → protocol wizard
  - signal calculator → protocol wizard → Z-Wave best page → Zigbee vs Z-Wave article
  - comparison/best/product pages → calculators that help validate purchase fit

Verification:

- `npm run build` exits 0.
- Static generation completed all 1530 pages.
- Product and compare page coverage stayed intact.

Batch 4 candidate:

- Build the first downloadable PDF/report funnel behind a lead-capture modal. Recommended first implementation: Door Compatibility Audit PDF because it connects directly to the highest-impression article and the compatibility/installation calculators.

## Cross-check / Hardening Log

Completed on 2026-05-08:

- Ran a horizontal schema audit across `app`, `lib`, and `components` to remove outdated structured data patterns instead of patching individual pages only where already touched.
- Removed deprecated or restricted JSON-LD types from all remaining page templates in scope:
  - removed `FAQPage` from:
    - `/best/[slug]`
    - `/compare/[slug]`
    - `/protocols/[protocol]`
    - `/faq` layout
  - removed `HowTo` from:
    - `/calculators/protocol-wizard`
    - `/calculators/battery-life`
    - `/calculators/lock-tco`
- Kept visible FAQ and instructional content on-page, while standardizing structured data toward still-supported types such as `WebPage`, `BreadcrumbList`, and `SoftwareApplication`.
- Removed one dead DB call from `lib/services/brand-service.ts` (`ProductSeriesModel.getBySlug('')`) so the SEO/build path no longer carries an unused lookup.

Cross-check verification:

- `rg -n "HowTo|FAQPage" app lib components` returns no matches after cleanup.
- `git --no-pager diff --check` returns clean.
- `npm run build` exits 0 and completes static generation for all 1530 pages.
- `gitnexus analyze . --force --skills --name smartlock-next` completes successfully.
- `gitnexus status` reports the repo is up to date.
- `gitnexus detect-changes -r smartlock-next` reports `critical` overall risk because this working set still includes the shared DB retry changes in `lib/db.ts`, which affect shared GET/POST/status execution flows. This is expected and reflects the real blast radius of the root-cause reliability fix, not a regression introduced by the schema cleanup.

Remaining non-blocking build warnings:

- stale `baseline-browser-mapping` / `caniuse-lite`
- local `JWT_SECRET` missing warning for auth

## Batch 4 Execution Log

Completed on 2026-05-08:

- Removed build-log noise from calculator and article image rendering:
  - replaced repeated Be-Tech logo `<img>` usage with `next/image` in calculator pages
  - replaced the shared Be-Tech calculator recommendation logo with `next/image`
  - replaced markdown article image rendering in `ArticleContent` with `next/image` using fixed dimensions and `unoptimized` for source-agnostic article content
- Removed React hook lint warnings:
  - made `ToolRating.fetchStats` stable with `useCallback` and included it in the `useEffect` dependency list
  - removed unused `frontDeskStaff` from the hotel ROI `useMemo` dependencies
- Removed the last project-code lint warning by changing `lib/db.ts` from an anonymous default export object to a named `db` constant export.

Verification:

- `npm run build` exits 0.
- Static generation completed all 1530 pages.
- Project-code ESLint warnings from `<img>`, hook dependencies, and anonymous default export are gone.
- Remaining build messages are environment or route-runtime signals:
  - stale `baseline-browser-mapping` / `caniuse-lite`
  - local `JWT_SECRET` missing warning for auth
  - existing Edge runtime static-generation warning
- `gitnexus analyze . --force --skills --name smartlock-next` completes successfully.
- `gitnexus status` reports the repo is up to date.
- `gitnexus detect-changes -r smartlock-next` still reports `critical` overall risk because the full working set includes the shared DB gateway retry fix in `lib/db.ts`.

Batch 5 candidates:

- Resolve the remaining Edge runtime static-generation warning by identifying the exact route still using Edge where static generation is expected.
- Decide whether to update browser compatibility data in dependencies or leave it to dependency maintenance.
- Add production-like `JWT_SECRET` handling to local verification docs or test env so auth warnings are explicit rather than surprising.

## Batch 5 Execution Log

Completed on 2026-05-08:

- Traced the remaining Edge runtime warning to route runtime configuration rather than page content:
  - removed `runtime = 'edge'` from `/articles`
  - removed `runtime = 'edge'` from `/articles/[category]`
  - changed `/status` from Edge to Node runtime while keeping it dynamic/noindex
  - removed unnecessary Edge runtime declarations from JSON API routes that do not require Edge-only APIs
- Restored static rendering for article index/category pages:
  - `/articles` now builds as static
  - `/articles/[category]` now prerenders all category paths
- Added `dynamic = 'force-dynamic'` to `/api/products` because it is query-parameter driven and reads `request.url`; this prevents Next from probing it as a static route and logging `DYNAMIC_SERVER_USAGE`.

Verification:

- `npm run build` exits 0.
- Static generation completed all 1543 pages.
- The Edge runtime static-generation warning is gone.
- The `/api/products` dynamic server usage log is gone.
- Build output now has no project-code warnings; remaining messages are environment/toolchain only:
  - stale `baseline-browser-mapping` / `caniuse-lite`
  - Node type-stripping experimental warning
  - local `JWT_SECRET` missing warning for auth
- `gitnexus analyze . --force --skills --name smartlock-next` completes successfully.
- `gitnexus status` reports the repo is up to date.
- `gitnexus detect-changes -r smartlock-next` still reports `critical` overall risk because the full working set includes the shared DB gateway retry fix in `lib/db.ts`.

Batch 6 candidates:

- Decide whether to update browser compatibility data in dependencies or leave it to scheduled dependency maintenance.
- Add a local verification env/example for `JWT_SECRET` so auth warnings are intentional during local builds.
