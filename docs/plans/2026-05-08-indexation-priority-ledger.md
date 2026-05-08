# SLockHub Indexation Priority Ledger

Date: 2026-05-08

Purpose:

- Convert current GSC Search Performance data and sitemap/static coverage into an actionable indexing queue.
- Avoid blind bulk submission of programmatic long-tail pages.
- Separate pages that should be submitted now from pages that should be improved first.

Data limitation:

- Current GSC export is Search Performance, not Page Indexing.
- A URL missing from `网页.csv` is classified as "no visible search performance", not confirmed "not indexed".
- True `indexed.md` / `to-index.md` files should be generated after a GSC Page Indexing export or URL Inspection sample is available.

## Current Coverage Signals

| Signal | Count | Notes |
|---|---:|---|
| Build route output | 1543 pages | Clean `rm -rf .next && npm run build` completed static generation for 1543 routes |
| XML sitemap body | 1527 URLs | Read from `.next/server/app/sitemap.xml.body` after the clean build |
| GSC page export | 1000 rows | Search Performance page rows |
| GSC query export | 731 rows | Search Performance query rows |
| Ubersuggest export | 140 rows | Keyword/opportunity reference |

## XML Sitemap vs Visible GSC Performance by Template

| Template | Sitemap URLs | GSC performance URLs | Visible gap | Interpretation |
|---|---:|---:|---:|---|
| `/compare/[slug]` | 1081 | 689 | 392 | current XML body includes all generated compare pairs; many have no visible search performance |
| `/brands/[slug]/[product]` | 246 | 122 | 124 | many product pages have no visible performance |
| `/brands/[slug]` | 47 | 42 | 5 | current XML body includes all generated brand detail pages; a few have no visible performance |
| `/best/[slug]` | 20 | 20 | 0 | full visible coverage; weak CTR/rank |
| `/articles/[category]/[slug]` | 71 | 71 | 0 | full visible coverage; weak CTR |
| `/calculators/[slug]` | 32 | 28 | 4 | a few calculator pages have no visible performance |
| `/protocols/[protocol]` | 6 | 6 | 0 | full visible coverage; zero clicks |
| Article categories | 7 | 6 | 1 | one category has no visible performance |
| Hubs/resources/static | 17 | 17 | 0 | low-click navigational pages |

This table is a planning signal, not a definitive indexation report.

## Queue Rules

### Submit Now

Use for pages that already have visible GSC impressions, have search demand, and are not thin enough to require template work first.

Criteria:

- In GSC `网页.csv`.
- Impressions above template median or position already near page 1/2.
- CTR is weak, but page has enough unique data or has already received P0 template improvements.

### Improve First

Use for pages with demand but insufficient unique value, weak template packaging, or high scaled-content risk.

Criteria:

- High impressions with zero/low clicks and clear missing template blocks.
- Programmatic page with large sibling set and near-duplicate risk.
- Page class has known missing schema/internal links/static explanation.

### Hold

Use for low-evidence long-tail pages where bulk submission could waste crawl budget or invite canonical consolidation.

Criteria:

- No visible GSC performance.
- Weak or generic template content.
- Large programmatic family, especially compare pages not yet differentiated.

## Submit Now Queue

These pages are safe to submit or resubmit after the next deployment because they already show demand and either have received P0 improvements or are strong enough to validate.

| Priority | URL | Evidence | Reason |
|---|---|---:|---|
| P1 | `https://www.slockhub.com/compare/nuki-vs-tedee` | 868 impressions, 12 clicks, pos 7.16 | strongest compare page; use as benchmark |
| P1 | `https://www.slockhub.com/compare/schlage-vs-weiser` | 836 impressions, 4 clicks, pos 9.28 | high impression, low CTR |
| P1 | `https://www.slockhub.com/compare/kwikset-vs-defiant` | 607 impressions, 5 clicks, pos 10.18 | high commercial comparison intent |
| P1 | `https://www.slockhub.com/compare/schlage-vs-defiant` | 440 impressions, 0 clicks, pos 9.11 | page 1/2 with zero CTR |
| P1 | `https://www.slockhub.com/compare/kwikset-vs-weiser` | 394 impressions, 1 click, pos 11.53 | near page 1; title/snippet opportunity |
| P1 | `https://www.slockhub.com/best/matter-smart-locks` | 533 impressions, 4 clicks, pos 18.06 | commercial ecosystem query |
| P1 | `https://www.slockhub.com/best/zigbee-smart-locks` | 177 impressions, 1 click, pos 8.76 | page 1 visibility, low CTR |
| P1 | `https://www.slockhub.com/brands/samsung/samsung-shp-dp609` | 597 impressions, 0 clicks, pos 5.63 | high-ranking product page with zero CTR |
| P1 | `https://www.slockhub.com/brands/nuki/nuki-smart-lock-pro-4` | 309 impressions, 0 clicks, pos 5.79 | high-ranking product page with zero CTR |
| P1 | `https://www.slockhub.com/calculators/signal-strength` | 276 impressions, 1 click, pos 8.45 | Batch 4 formula, assumptions, example, sources, and protocol/product links added; inspect after deploy |
| P1 | `https://www.slockhub.com/calculators/compatibility` | 207 impressions, 0 clicks, pos 8.49 | Batch 4 compatibility interpretation, standards assumptions, example, sources, and adjacent tool links added; inspect after deploy |
| P1 | `https://www.slockhub.com/protocols/zigbee` | 47 impressions, 0 clicks, pos 7.21 | page 1 visibility, no clicks |
| P1 | `https://www.slockhub.com/protocols/thread` | 29 impressions, 0 clicks, pos 7.14 | page 1 visibility, no clicks |

## Improve First Queue

These pages have clear demand but should be improved before manual URL submission or expansion.

| Priority | URL | Evidence | Required improvement |
|---|---|---:|---|
| P0 | `https://www.slockhub.com/articles/guides/door-compatibility-guide` | 933 impressions, 0 clicks, pos 8.47 | Batch 3 answer summary, measurement checklist, trust block, and compatibility tool CTA added; inspect after deploy |
| P0 | `https://www.slockhub.com/articles/security/smart-lock-security-complete-analysis` | 544 impressions, 0 clicks, pos 10.49 | Batch 3 trust block and security tool fallback added; inspect after deploy |
| P0 | `https://www.slockhub.com/articles/protocols/connect-lock-to-homekit` | 425 impressions, 1 click, pos 10.42 | Batch 3 HomeKit/protocol checklist and protocol tool links added; inspect after deploy |
| P0 | `https://www.slockhub.com/best/homekit-smart-locks` | 473 impressions, 0 clicks, pos 49.37 | HomeKit-specific ranking logic, ecosystem fields, stronger intro |
| P0 | `https://www.slockhub.com/best/z-wave-smart-locks` | 429 impressions, 0 clicks, pos 42.97 | protocol authority, best products, hub guidance |
| P0 | `https://www.slockhub.com/best/smart-locks-with-longest-battery-life` | 336 impressions, 1 click, pos 20.86 | battery methodology and full matrix |
| P0 | `https://www.slockhub.com/calculators/installation-cost` | 284 impressions, 0 clicks, pos 17.18 | Batch 4 cost formula, assumptions, sample estimate, data sources, and report-ready CTA added; inspect after deploy |
| P1 | `https://www.slockhub.com/brands/yale/yale-assure-lock-2-wifi` | 180 impressions, 0 clicks, pos 11.33 | product quick verdict and schema review |
| P1 | `https://www.slockhub.com/brands/august/august-wifi-4th-gen` | 98 impressions, 0 clicks, pos 5.72 | product CTR packaging and compare links |
| P1 | `https://www.slockhub.com/brands/weiser` | 92 impressions, 1 click, pos 10.18 | Batch 2 brand verdict, matrix, top models, alternatives added; submit after deploy |
| P1 | `https://www.slockhub.com/brands/sesame` | 89 impressions, 0 clicks, pos 15.26 | Batch 2 brand authority modules added; submit after deploy if rendered fields are non-empty |
| P1 | `https://www.slockhub.com/protocols/matter` | 60 impressions, 0 clicks, pos 10.92 | Batch 2 protocol scorecard, alternatives, products, calculator links added; submit after deploy |

## Hold Queue

Do not bulk-submit these classes until template uniqueness and sitemap consistency are verified.

| Class | Reason | Next action |
|---|---|---|
| Low-impression long-tail `/compare/*` pages | current family is large and many pages can look structurally similar | hold until pair-specific caveats, model-level proof, and related links are complete |
| Product pages with no visible performance and sparse specs | may be valid pages but weak CTR/index value until fields are surfaced | improve product template first, then submit in brand/product batches |
| Calculator pages without visible performance | many are useful but need static explanation and source blocks | apply shared calculator SEO pattern first |
| Article category pages with low/no performance | category hubs now have editorial paths but still need metadata and post-deploy inspection | inspect samples before submitting |
| Utility static pages | low SEO value and not commercial targets | no manual submission needed unless crawl issues appear |

## Template Submission Order

1. Submit top compare URLs after deployment of pair-specific enhancements.
2. Submit top product URLs after product page JSON-LD and verdict modules are verified.
3. Submit best pages only after each target page has methodology, matrix, and decision tree.
4. Submit high-impression articles after Quick Answer and trust blocks are visible.
5. Submit calculator pages after formula/assumption/source blocks are visible.
6. Hold long-tail compare and no-performance pages until unique-value checks pass.

Batch 2 update:

- Brand pages with visible demand (`/brands/weiser`, `/brands/sesame`, `/brands/eufy`, `/brands/samsung`, `/brands/tedee`) can move from improve-first to post-deploy inspection once rendered product evidence is confirmed.
- Protocol pages with visible demand (`/protocols/matter`, `/protocols/zigbee`, `/protocols/thread`, `/protocols/wifi`, `/protocols/z-wave`) should be manually inspected after deployment because each now has scorecard, alternatives, product, calculator, and ItemList signals.
- Continue to avoid bulk submitting low-evidence brand pages if the rendered page has zero active models; those should stay in improve-first until product data exists.

Batch 3 update:

- High-impression article URLs can move from improve-first to post-deploy inspection once rendered answer summary, reviewed guidance, and tool links are confirmed.
- Article category pages should be sampled after deployment because they now render as editorial hubs with start-here paths and category tools, but their metadata still needs a later CTR rewrite.
- Keep article pages without visible GSC performance out of bulk submission unless they have explicit related tools or strong internal links from a category hub.

Batch 4 update:

- High-opportunity calculator URLs (`/calculators/installation-cost`, `/calculators/signal-strength`, `/calculators/compatibility`) should move to post-deploy inspection after rendered formula/assumption/source/example blocks are confirmed.
- `/calculators/battery-life` and `/calculators/protocol-wizard` now have the same static SEO pattern and can be sampled as commercial support pages for battery-life, protocol, and HomeKit/Matter paths.
- The calculator hub should be inspected as a discovery page because it now routes users by planning scenario instead of only listing tools.
- Keep lower-priority calculator pages in hold until the shared pattern is rolled out or each page has equivalent static content.

Batch 5 update:

- `/compare`, `/brands`, `/articles`, `/resources`, `/protocols`, and `/` now have stronger discovery-hub modules and should be sampled after deployment as crawl/discovery pages rather than treated as thin navigational pages.
- `/compare` should be inspected for the high-demand comparison links because it now routes into selected brand-vs-brand pages and protocol/product validation tools.
- `/brands` should be inspected after deployment to confirm brand data renders; if the DB fallback returns no brands in production, keep brand hub out of manual submission until data availability is fixed.
- `/resources` and `/protocols` now have CollectionPage/ItemList signals and explicit calculator/product pathways; sample them before manually submitting lower-priority long-tail pages they link to.
- Homepage can be used as the highest-level discovery verification sample because it now links directly to door fit, protocol selection, brand browsing, and compare paths.

Batch 6 update:

- `/calculators/compatibility` now has a Door Compatibility Audit PDF lead-capture CTA. After deploy, inspect this page as both an indexation candidate and a conversion path from the high-exposure door-compatibility guide.
- `/calculators/installation-cost` now has a Smart Lock TCO Report PDF CTA. Keep it in the post-fix inspection set because it already had 284 impressions and 0 clicks in the current Search Performance export.
- `/calculators/lock-tco` now also has the Smart Lock TCO Report PDF CTA. Use this as the primary ownership-cost sample URL because it is the canonical multi-year cost calculator.
- `/compare/[slug]` pages now have a Product Comparison Report PDF CTA. Sample one high-demand pair such as `/compare/nuki-vs-tedee` and one lower-demand pair after deploy to confirm the modal, report context, and static compare content render together.
- `/articles/guides/door-compatibility-guide` now has the same Door Compatibility Audit CTA as the calculator path. Treat it as a content-to-tool conversion sample in URL Inspection and post-deploy QA.
- `/brands/[slug]/[product]` now has a product-level shortlist report CTA. Sample one strong product URL after deploy to ensure product JSON-LD, quick verdict, and report CTA coexist without weakening the commercial template.
- Report downloads should not change canonical or submission priority by themselves; they improve conversion and usefulness after the template content fixes.
- If URL Inspection reports `Crawled - currently not indexed` for calculator or compare pages after Batch 6, use the new report CTA as supporting uniqueness but still prioritize unique body content, internal links, and product/measurement data first.

Cross-batch metadata cleanup update:

- Brand detail pages with existing impressions should be re-sampled after deployment because they now emit explicit page-level Open Graph and Twitter metadata instead of inheriting the site default snippet.
- Article category pages should stay in post-deploy inspection until the new category-level social metadata is visible in rendered HTML.
- Calculator pages that previously relied on partial layout metadata should be re-sampled from the generated HTML set before manually submitting lower-priority tool URLs with no visible performance.
- A clean rebuild confirmed compare-page default metadata hits were stale `.next` artifacts rather than live template failures; do not use old build output as an indexation signal without clearing `.next`.
- Protocol detail pages still needed explicit Twitter metadata; re-sample `/protocols/zigbee`, `/protocols/matter`, and `/protocols/thread` after deploy before manual resubmission.

Second cross-check update:

- Re-ran a clean `rm -rf .next && npm run build`; static generation completed for 1543/1543 pages.
- Generated sitemap body now has 1527 URLs: 1081 compare, 246 product, 47 brand, 20 best, 71 article detail, 7 article category, 32 calculator, 6 protocol detail, 1 protocol hub, and 16 static/hub URLs.
- Generated artifacts for covered template families show 0 default site-title hits, 0 missing canonical, 0 missing OG title, 0 missing Twitter title, and 0 `NEXT_NOT_FOUND`.

## URL Inspection Sampling Plan

Because a Page Indexing export is not available, use manual URL Inspection samples:

| Sample group | Count | Examples |
|---|---:|---|
| High-impression submit-now | 10 | compare, product, calculator, protocol |
| Improve-first after fix | 10 | article, best, calculator |
| No-performance sitemap URLs | 20 | product, calculator, compare long-tail |
| Hubs/categories | 8 | compare, brands, articles, calculators, protocols, resources, article categories |

Record inspection results as:

- `Indexed`
- `Discovered - currently not indexed`
- `Crawled - currently not indexed`
- `Duplicate / Google chose different canonical`
- `Not found / blocked`

## Future True Tracking Files

When a Page Indexing export or URL Inspection results are available, create:

- `docs/plans/indexed.md`
- `docs/plans/to-index.md`

Initial schema:

### `indexed.md`

| # | URL | Source | Confirmed |
|---|---|---|---|

Sources:

- GSC Page Indexing export
- URL Inspection

### `to-index.md`

| # | Priority | URL | Template | Action | Submitted | Notes |
|---|---|---|---|---|---|---|

Actions:

- submit-now
- improve-first
- hold

## Batch Execution Log

### Batch 0: Created Priority Ledger

Status: complete

Facts recorded:

- GSC Search Performance rows: 1000 page rows, 731 query rows.
- XML sitemap body count: 1527 URLs after clean build.
- Build-route count and sitemap count are now reconciled as different scopes: build includes non-indexable/API/utility routes; sitemap contains indexable URL entries.
- Submit-now, improve-first, and hold queues created.

Next:

- Recheck sitemap XML after deployment against the production environment variables.
- Generate true indexed/to-index files only after Page Indexing export or URL Inspection sample results are available.

### Batch 1: P0 Commercial Template Improvements

Status: complete

Affected queues:

- Compare submit-now pages now have stronger pair-specific content patterns.
- Product submit-now pages now have stronger verdict/schema/internal-link patterns.
- Best improve-first pages now have ranking-signal and missing-data patterns, but the HomeKit/Z-Wave targets still need query-specific metadata and link tuning in a later pass.

Verification:

- `npm run build` passed.
- 1543/1543 static pages generated.

Queue update:

- Keep top compare and product URLs in `Submit Now` after deployment.
- Keep HomeKit/Z-Wave/battery best pages in `Improve First` until metadata and intent-specific copy are reviewed URL by URL.
