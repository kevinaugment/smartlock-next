# SLockHub Template SEO Remediation Ledger

Date: 2026-05-08

Sources:

- GSC Search Performance export: `https___www.slockhub.com_-Performance-on-Search-2026-05-08/网页.csv`
- GSC query export: `https___www.slockhub.com_-Performance-on-Search-2026-05-08/查询数.csv`
- Ubersuggest export: `https___www.slockhub.com_-Performance-on-Search-2026-05-08/ubersuggest https___www.slockhub.com_.csv`
- Source templates under `app/`
- Sitemap implementation in `app/sitemap.ts`

Important indexing note:

- The current GSC files are Search Performance exports, not Page Indexing exports.
- Missing from `网页.csv` means "no visible search performance in this export", not confirmed "not indexed".
- Current clean build output shows 1543 generated pages, while `.next/server/app/sitemap.xml.body` contains 1527 `<loc>` entries. Treat build-route count and XML sitemap count as separate signals because API routes, robots, sitemap, and utility routes are not all sitemap URLs.

## Baseline

### GSC Template Performance

| Template | URLs in GSC export | Clicks | Impressions | CTR | Avg position | Diagnosis |
|---|---:|---:|---:|---:|---:|---|
| `/compare/[slug]` | 689 | 323 | 18,087 | 1.79% | 9.23 | strongest demand; long-tail uniqueness risk |
| `/articles/[category]/[slug]` | 71 | 11 | 6,375 | 0.17% | 10.08 | ranks near page 1; snippet and trust weak |
| `/best/[slug]` | 20 | 7 | 3,346 | 0.21% | 27.48 | commercial intent, weak authority packaging |
| `/brands/[slug]/[product]` | 122 | 6 | 2,990 | 0.20% | 9.03 | good positions, very weak CTR |
| `/brands/[slug]` | 42 | 1 | 1,306 | 0.08% | 19.01 | thin brand authority pages |
| `/calculators/[slug]` | 28 | 3 | 1,181 | 0.25% | 12.42 | useful tools, weak static answer content |
| `/protocols/[protocol]` | 6 | 0 | 177 | 0% | 10.01 | page-1/2 visibility but no clicks |
| Hubs and resources | 24 | 4 | 467 | 0.86% | mixed | hubs rank but are mostly navigational |

### Query Intent Demand

| Intent group | Queries | Clicks | Impressions | CTR | Avg position | Action |
|---|---:|---:|---:|---:|---:|---|
| Comparison | 133 | 19 | 1,573 | 1.21% | 14.44 | keep as primary SEO engine |
| Protocol/ecosystem | 108 | 1 | 617 | 0.16% | 52.96 | rebuild protocol, best, and article links |
| Best-of | 110 | 0 | 420 | 0% | 37.82 | add evidence, matrices, decision logic |
| Brand/product | 97 | 0 | 281 | 0% | 28.13 | improve product and brand CTR packaging |
| Calculator/problem | 71 | 0 | 207 | 0% | 57.98 | add explainers and report/PDF paths |
| Use case | 20 | 0 | 45 | 0% | 78.73 | underbuilt Airbnb/hotel/rental intent |

## Field Utilization Matrix

| Data source | Available fields | Templates that should use it | Current gap |
|---|---|---|---|
| Product DB | protocol, secondary_protocol, supports_matter, battery fields, standby/active power, ANSI, UL, encryption, credential capacity, RF range/frequency, ecosystems, door fit, rating, review_count, price | product, compare, best, calculator, protocol, brand | many fields exist but only some templates turn them into verdicts |
| Brand DB | country, founded year, target market, price tier, supported protocols, rating, long description, product series | brand, compare, brand hub, best internal links | brand pages still mostly product listings |
| TopN pages | title, h1, intro, filter_type/value, sort_by, max_items, FAQ JSON | best pages | ranking logic not fully visible; no missing-data policy |
| Article registry | title, description, keywords, tags, category, word count, related tools, related articles, FAQs, howToSteps | article detail, category hubs, related tools | article template does not consistently surface quick answers/trust blocks |
| Calculator DB/API | metadata, content sections, FAQs, protocol data, use cases, data sources, related articles, related calculators, brands | calculator detail, calculator hub, product links | many static calculator pages do not fully consume these tables |
| Protocol static data | frequency, range, max nodes, security, battery impact, hub requirement, pros/cons, best use cases | protocol detail, best, calculators, compare | protocol pages need product-backed scorecards and alternatives |
| GSC performance | top URLs, low CTR, query intent, device split | all templates and hubs | not yet wired into content priority or internal link priority |

## Template Ledgers

### 1. Compare Detail: `/compare/[slug]`

GSC:

- 689 URLs, 323 clicks, 18,087 impressions, 1.79% CTR, avg position 9.23.
- Top risks: high-volume pages such as `/compare/schlage-vs-weiser`, `/compare/kwikset-vs-defiant`, and `/compare/schlage-vs-defiant` have low or zero CTR despite page-1/2 positions.

Current code:

- `app/compare/[slug]/page.tsx`
- Uses brands and active product data from `BrandModel.getAll()` and `ProductModel.getAllForComparison()`.
- Recent P0 additions: pair verdict, winner cards, best model from each brand, methodology, WebPage/Breadcrumb schema.

Used fields:

- brand name, slug, description, target market, price tier.
- product count, rating, review_count, price, protocol, secondary protocol, Matter, battery life, fingerprint, keypad, guest/remote access.

Underused fields:

- ANSI/UL/security certification, encryption, door fit, RF range, ecosystems, credential capacity.

Missing content:

- "Do not choose this brand if..." caveats.
- Shared ecosystem intersection.
- Pair-specific FAQs with model evidence.
- Product-level comparison row for top model A vs top model B.

Missing schema:

- ItemList for selected models.
- Product schema for top model pair only where data is defensible.

Internal linking gaps:

- Needs links to matching `/best/*`, protocol pages, calculators, and sibling compare pages.

Indexation risk:

- High. Large programmatic set can be seen as near-duplicate if pair pages do not contain enough unique evidence.

Actions:

- P0: finish field-backed caveats, ecosystem intersection, top model A/B table.
- P1: add GSC-prioritized "related comparisons" from high-impression pairs.
- P2: decide whether weakest long-tail compare pages should remain in sitemap before uniqueness threshold is met.

Acceptance:

- Each compare page has at least 5 field-driven unique modules.
- Top 20 GSC compare URLs contain pair-specific verdict, top models, caveats, and non-generic internal links.

### Cross-Batch Metadata Cleanup

Scope:

- `app/brands/[slug]/page.tsx`
- `app/articles/[category]/page.tsx`
- calculator metadata across `app/calculators/*/layout.tsx` plus `credential-planner`, `mesh-planner`, and `str-roi`

Problem:

- Several high-value templates still inherited the root default social metadata (`SLockHub.com - Expert Guides & Tools`) because they only set title/description/canonical or only set partial `openGraph`.
- This weakened CTR packaging for URLs that already have visible GSC impressions, especially brand pages, article categories, and long-tail calculators.

Implemented:

- Added shared helper `lib/seo/metadata.ts` to standardize title, description, canonical, Open Graph, and Twitter metadata for calculator pages.
- Updated brand detail metadata to emit explicit `openGraph` and `twitter` fields per brand.
- Updated article category metadata to emit explicit `openGraph.url` and `twitter`.
- Repointed calculator layout/page metadata to the shared helper so new calculator pages do not regress to partial metadata.

Verification target:

- `.next/server/app` should stop showing the default site-level social metadata for high-value brand, article-category, and calculator routes covered in this batch.
- `npm run build` must continue to pass without introducing new metadata warnings.

Follow-up metadata/indexation cross-check:

- A clean `.next` rebuild showed the earlier `/compare/*` default metadata and `NEXT_NOT_FOUND` sample was stale build artifact noise, not a current template failure: 1081 compare RSC files, 0 default-metadata hits, 0 `NEXT_NOT_FOUND` hits.
- The same clean rebuild exposed 6/6 `/protocols/[protocol]` pages still inheriting root Twitter title/description while their title and OG tags were page-specific.
- `/protocols/[protocol]` metadata was updated to include `openGraph.url` and explicit Twitter title/description.
- Clean build also showed static generation timeout retries for a couple of compare pages. Build completed, but this remains a performance/crawl-risk item for a later compare generation optimization pass.

Second cross-check:

- Re-ran a fresh `rm -rf .next && npm run build`; generation completed for 1543/1543 pages and the retry warning did not recur in this run.
- Re-audited generated RSC artifacts for `/brands/[slug]`, article categories, calculators, `/protocols/[protocol]`, and `/compare/[slug]`.
- Results: 47 brand pages, 7 article category pages, 32 calculator pages, 6 protocol pages, and 1081 compare pages all had canonical, OG title, Twitter title, no default site title, and no `NEXT_NOT_FOUND`.
- Rechecked `sitemap.xml.body`: 1527 URLs total, including 1081 compare, 47 brand, 246 product, 20 best, 71 article detail, 7 article category, 32 calculator, and 6 protocol detail URLs.

### 2. Best Detail: `/best/[slug]`

GSC:

- 20 URLs, 7 clicks, 3,346 impressions, 0.21% CTR, avg position 27.48.
- Highest-priority URLs: `/best/matter-smart-locks`, `/best/homekit-smart-locks`, `/best/z-wave-smart-locks`, `/best/smart-locks-with-longest-battery-life`, `/best/fingerprint-smart-locks`.

Current code:

- `app/best/[slug]/page.tsx`
- Uses `getTopNPageData(slug)` and product rankings.
- Recent P0 additions: methodology, summary stats, full comparison matrix, buyer decision tree, Product schema for top products.

Used fields:

- title, h1, intro, filter settings, product protocol, battery, ANSI, fingerprint, rating.

Underused fields:

- Matter support, price bands, UL, encryption, capacity, RF, ecosystems, door fit, review_count as confidence signal.

Missing content:

- Weighting by page type: HomeKit/Matter pages should privilege ecosystems; battery pages should privilege battery fields; Airbnb pages should privilege guest/remote access.
- "Missing data" disclaimer per page.
- Best-for badges generated by product field strengths.

Missing schema:

- ItemList exists; Product schema is partial.
- CollectionPage may be useful for list pages.

Internal linking gaps:

- Needs direct links to protocol detail, relevant calculators, and top compare pairs.

Indexation risk:

- Medium. Small set, high commercial value, but can be perceived as thin list pages without methodology and evidence.

Actions:

- P0: add page-type-specific weighting and missing-data messaging.
- P1: add best-for badges and calculator links based on slug intent.
- P2: expand intro/meta from Ubersuggest query language.

Acceptance:

- Every `/best/*` page explains why products qualify and shows a complete matrix.
- Top 5 best pages have above-fold evidence tied to their search intent.

### 3. Product Detail: `/brands/[brand]/[product]`

GSC:

- 122 URLs, 6 clicks, 2,990 impressions, 0.20% CTR, avg position 9.03.
- High-priority URLs include Samsung SHP-DP609, Nuki Smart Lock Pro 4, Yale Assure Lock 2 WiFi, August WiFi 4th Gen.

Current code:

- `app/brands/[slug]/[product]/page.tsx`
- Uses active product and series data.
- Recent P0 additions: quick verdict, door fit verdict, battery/cost verdict, sibling comparison, stronger Product JSON-LD.

Used fields:

- name, brand, series, model number, description, price, protocol, secondary protocol, Matter, battery, power, ANSI, UL, encryption, features, capacity, installation dimensions, ecosystems, rating/review_count.

Underused fields:

- operations_per_day, RF range, antenna type, dimensions JSON, exact credential fit analysis.

Missing content:

- Who should skip this product.
- Protocol reliability verdict.
- Credential capacity verdict.
- Series-level alternatives when same-brand siblings are sparse.

Missing schema:

- Product schema now stronger; still needs careful review for image and category when available.

Internal linking gaps:

- Needs links to matching `/best/*`, protocol page, compare pages, and calculators.

Indexation risk:

- Medium-low. Product pages have unique specs and good positions, but CTR is weak.

Actions:

- P0: add skip-if, credential capacity, and protocol reliability verdicts.
- P1: add links to best/protocol/compare pages.
- P2: add image/category schema only where data is present.

Acceptance:

- High-impression product pages show at least 4 unique spec-backed verdict modules.
- Product JSON-LD never emits unsupported price/rating/image claims.

### 4. Brand Detail: `/brands/[slug]`

GSC:

- 42 URLs, 1 click, 1,306 impressions, 0.08% CTR, avg position 19.01.
- Brands with visible demand: Weiser, Sesame, SimpliSafe, Veise, Tedee, Qrio, Eufy, Samsung.

Current code:

- `app/brands/[slug]/page.tsx`
- Uses `getBrandBySlug`, series, and products.

Used fields:

- brand country, founded year, long description, supported protocols, price tier, target market, product series, product protocol, ANSI, fingerprint, battery, rating.

Underused fields:

- product-level Matter, price ranges, top models, feature distribution, compare alternatives.

Missing content:

- Brand verdict.
- Protocol support matrix.
- Best models from brand.
- Alternatives and compare links.
- Use-case fit.

Missing schema:

- Organization/Brand schema.
- ItemList for product lines.

Actions:

- P0: add brand verdict driven by active-model count, protocol coverage, Matter/remote-access support, and battery evidence.
- P0: add protocol support matrix with per-protocol product-count evidence and links to protocol guides.
- P0: add top-model shortlist, use-case fit, and compare/best pathways so the page works as a commercial routing hub instead of a brand catalog.
- P1: refine alternative brand links using real compare/GSC pairs instead of the current fixed competitor pool.

Acceptance:

- Brand pages expose at least one evidence-backed verdict, one matrix/table, one top-model module, and one internal-link block to compare/best/protocol/calculator pages.
- Brand schema and ItemList are present without inventing unsupported price or review data.

Internal linking gaps:

- No systematic links to `/compare/{brand}-vs-*`, `/best/*`, protocol pages, calculators.

Indexation risk:

- Medium. Brand pages are unique but thin compared with SERP competitors.

Actions:

- P1: add brand verdict, protocol matrix, best models, alternatives, and use-case fit.
- P2: add schema and GSC-driven compare links.

Acceptance:

- Every brand page answers "is this brand good for me?" before product listings.

### 5. Article Detail: `/articles/[category]/[slug]`

GSC:

- 71 URLs, 11 clicks, 6,375 impressions, 0.17% CTR, avg position 10.08.
- Top low-CTR opportunities: door compatibility guide, smart lock security analysis, connect lock to HomeKit, forgot master code reset, Zigbee vs Z-Wave comparison.

Current code:

- `app/articles/[category]/[slug]/page.tsx`
- Uses article registry, MDX content, ArticleHeader, ArticleContent, BeTech recommendation, SeoPathways, related articles/tools.

Used fields:

- title, description, keywords, author, dates, category, tags, related tools/articles.

Underused fields:

- word count, reading time as trust, isPillar/isSupport, FAQs, howToSteps, related tool intent mapping.

Missing content:

- Quick Answer block.
- Category-specific answer blocks for troubleshooting, protocol, installation, security, use-case.
- Reviewed/updated/sources block.
- Related tools appear too late for problem-solving queries.

Missing schema:

- Article schema exists.
- Avoid reintroducing restricted FAQ/HowTo rich-result spam unless justified and visible.

Internal linking gaps:

- Needs higher article-to-calculator links and article-to-product/best links for commercial intent.

Indexation risk:

- Low for discovered pages, but CTR risk is high.

Actions:

- P0: add Quick Answer and trust block for high-impression articles.
- P1: add category-specific supplemental blocks.
- P2: update article registry for missing related tools.

Acceptance:

- High-impression articles answer the query within the first screen and link to the relevant tool before the MDX body ends.

Batch 3 implementation:

- Added template-level answer summary / quick-answer support driven by article category and slug.
- Added reviewed guidance block using `updatedAt`, `pubDate`, word count, reading time, and pillar/support status.
- Moved calculator/tool validation links above the MDX body, with fallback tools by intent when an article has no explicit `relatedTools`.
- Kept Article/Breadcrumb schema direction and did not add FAQPage/HowTo schema spam.

### 6. Article Category Pages

GSC:

- 6 category URLs, 84 impressions, 0 clicks, avg position 8.25.

Current code:

- `app/articles/[category]/page.tsx`

Underused fields:

- category description, article tags, pillar/support split, related calculator mapping.

Missing content:

- Category intro, "start here" paths, top tools, pillar articles, support quick fixes.

Actions:

- P1: upgrade categories into editorial hubs.

Acceptance:

- Each category page has a clear buyer/help intent and links to top articles/tools.

Batch 3 implementation:

- Added category verdict / start-here block.
- Added pillar/support/topic coverage summary from existing article registry fields.
- Added best articles to read first and category-specific tool paths.
- Preserved existing article list as the full directory section.

### 7. Calculator Detail Pages

GSC:

- 28 URLs, 3 clicks, 1,181 impressions, 0.25% CTR, avg position 12.42.
- Highest-priority: installation-cost, signal-strength, compatibility, battery-life, mesh-planner, installation-time, lock-tco.

Current code:

- Individual pages under `app/calculators/*/page.tsx`.
- API data available at `app/api/calculators/[slug]/route.ts`.
- Calculator DB supports sections, FAQs, protocol data, use cases, data sources, related articles, related calculators, brands.

Used fields:

- Varies by page. Some pages have strong static explainers; many are primarily tool UI.

Underused fields:

- DB content sections, data sources, use cases, related products/brands.

Missing content:

- What this calculator answers.
- Formula/assumptions.
- Example scenario.
- Data sources.
- Product recommendations.
- PDF/report CTA.

Missing schema:

- SoftwareApplication/WebApplication schema is inconsistent by calculator.
- Breadcrumb coverage varies between page and layout.

Internal linking gaps:

- Needs systematic calculator-to-article/product/best links.

Indexation risk:

- Medium. Tools are useful, but static content must explain the value before interaction.

Actions:

- P1: create shared calculator SEO content pattern, then apply to top 5 calculators.
- P2: add PDF/report lead capture.

Acceptance:

- Top calculator pages have static answer, assumptions, example, source, and internal links before/around the tool.

### 8. Calculator Hub: `/calculators`

GSC:

- 1 URL, 67 impressions, 0 clicks, avg position 4.85.

Current code:

- `app/calculators/page.tsx`
- Contains 32 calculator entries and category grouping.

Missing content:

- Search-intent grouping above cards.
- Popular calculators from GSC.
- How to choose the right calculator.
- CollectionPage/ItemList schema.

Actions:

- P1: convert from directory to calculator decision hub.

Acceptance:

- Users can choose a calculator by problem type without scanning every card.

### 9. Protocol Detail: `/protocols/[protocol]`

GSC:

- 6 URLs, 0 clicks, 177 impressions, avg position 10.01.
- Matter, Zigbee, Thread, Wi-Fi, Z-Wave have visible search demand.

Current code:

- `app/protocols/[protocol]/page.tsx`
- Uses static `protocolData` and filters products from `ProductModel.getAll(200, 0)`.

Used fields:

- protocol static frequency, range, max nodes, security, battery impact, hub, pros/cons, FAQs.
- product protocol, price, battery, ANSI, fingerprint.

Underused fields:

- Matter support, secondary protocol, RF range, product counts by protocol, compare links.

Missing content:

- Protocol scorecard.
- Protocol vs alternatives matrix.
- Best locks using protocol.
- Link to calculators and `/best/{protocol}` pages.

Missing schema:

- WebPage/Breadcrumb/ItemList for compatible products.

Internal linking gaps:

- Protocol pages should bridge articles, calculators, best pages, and products.

Indexation risk:

- Medium-low. The family is small and already has visible impressions, but the old template was too informational and not buyer-decision oriented.

Actions:

- P0: switch product retrieval to `ProductModel.getAllForComparison()` so protocol evidence is not capped at 200 rows.
- P0: add protocol scorecard, alternatives matrix, top compatible locks, and calculator/best-page pathways.
- P0: add WebPage, BreadcrumbList, and ItemList schema for protocol pages with real product evidence where available.

Acceptance:

- Each protocol page shows a buyer-facing scorecard, at least one alternatives comparison table, at least one ranked product module, and links into calculators and best pages.
- Protocol copy remains conditional on available product evidence and does not fabricate unsupported counts.

- Low page count but high CTR loss.

Actions:

- P1: add scorecard, alternatives matrix, best locks, and calculator links.
- P2: replace 200-row product cap with full comparison product cache if needed.

Acceptance:

- Each protocol page makes a smart-lock-specific argument, not just generic protocol education.

### 10. Hubs and Resources

Templates:

- `/compare`, `/brands`, `/articles`, `/resources`, `/protocols`, `/`, utility pages.

GSC:

- Hubs collectively show impressions but minimal clicks.
- `/compare`, `/articles`, `/calculators`, `/resources`, and `/protocols` rank in low positions for some queries.

Current gap:

- Many hubs are navigation pages, not indexable editorial directories.

Actions:

- P1: add GSC-driven popular links, collection schema, top pathways, and search-intent grouping.
- P2: add downloadable resources and report CTAs where commercially useful.

Acceptance:

- Hubs pass the standalone value test and push crawl equity to high-priority deep pages.

## Batch Execution Log

### Batch 0: Ledger and Fact Audit

Status: in progress

Implemented:

- Created this remediation ledger.
- Created indexation priority ledger separately.
- Aggregated GSC by template and query intent.
- Split build-route count and XML sitemap count as separate facts.

Validation:

- No business code changed in this batch.
- Source facts read from CSV exports, route files, sitemap source, and `.next/server/app/sitemap.xml.body`.

Residual risks:

- GSC Page Indexing export is still missing.
- XML sitemap count should be rechecked after a clean production build and deploy environment DB availability.

### Batch 1: P0 Commercial Template Deepening

Status: complete

Target templates:

- `/compare/[slug]`
- `/best/[slug]`
- `/brands/[slug]/[product]`

Impact analysis:

- `BrandComparisonPage`: LOW, 0 upstream dependents.
- `ProductDetailPage`: LOW, 0 upstream dependents.
- `TopNPage`: CLI target name is ambiguous with `TopNPage` interface; changes were limited to `app/best/[slug]/page.tsx`.

Implemented:

- `/compare/[slug]`
  - Added shared protocol compatibility summary.
  - Added security and door-fit coverage summaries for each brand.
  - Added "when to skip each brand" caveats based on Matter, fingerprint, battery, and price-data availability.
  - Added top model A/B matchup table using protocol, Matter, battery, security, door fit, and access features.
  - Added ItemList schema for selected top models.
- `/brands/[slug]/[product]`
  - Added choose/skip/credential verdict block.
  - Added protocol reliability note using protocol, secondary protocol, Matter, RF range, and RF frequency.
  - Added related buying paths to protocol, brand comparison, and best-of pages.
  - Preserved Product JSON-LD guardrails for price/rating/additionalProperty.
- `/best/[slug]`
  - Added slug-specific ranking signals for HomeKit, Matter, battery, fingerprint, and generic best-of pages.
  - Added best-for badges per product using Matter, fingerprint, battery, ANSI, guest access, and budget signals.
  - Added missing-data note for price, battery, and security-certification fields.

Validation:

- `npm run build` passed.
- Static generation completed for 1543/1543 pages.
- `git --no-pager diff --check` passed for edited Batch 1 files and new ledger docs.

Residual risks:

- GitNexus detect-changes remains `critical` for the whole working tree because this branch/session already includes earlier 40-file changes, including shared DB retry changes.
- `/best/[slug]` breadcrumb still follows the current visible page breadcrumb path through Brands; revisit in hub IA batch if `/best` gets its own hub.

### Batch 2: Brand and Protocol Pages

Status: completed

Target templates:

- `/brands/[slug]`
- `/protocols/[protocol]`

Impact:

- `BrandDetailPage`: `gitnexus impact -r smartlock-next BrandDetailPage --direction upstream` → `LOW`, 0 upstream dependents.
- `ProtocolDetailPage`: `gitnexus impact -r smartlock-next ProtocolDetailPage --direction upstream` → `LOW`, 0 upstream dependents.

Implemented:

- `app/brands/[slug]/page.tsx`
  - Added Brand/WebPage/BreadcrumbList/ItemList JSON-LD.
  - Added brand verdict, summary stats, protocol support matrix, top models, use-case fit, and alternatives/best pathways.
- `app/protocols/[protocol]/page.tsx`
  - Switched protocol product retrieval from `ProductModel.getAll(200, 0)` to `ProductModel.getAllForComparison()`.
  - Added WebPage/BreadcrumbList/ItemList JSON-LD.
  - Added protocol scorecard, protocol-vs-alternatives matrix, best locks using protocol, and planning-tool links.

Validation:

- `npm run build` passed before and after price-summary normalization.
- First Batch 2 verification completed static generation for `1543/1543` pages.
- Follow-up verification completed static generation for `990/990` pages; the delta appears tied to current DB/env static-param output for compare pages, not to the edited brand/protocol templates.
- `git --no-pager diff --check` passed for edited Batch 2 files and ledgers.
- HTML spot checks confirmed canonical, JSON-LD, brand verdict/matrix/pathways, and protocol scorecard/alternatives/product/planning modules render for `/brands/weiser`, `/brands/qrio`, and `/protocols/matter`.

Residual risks:

- `gitnexus detect-changes` for the full working tree will still reflect earlier unrelated edits in this long-running branch/session.
- Brand alternative links currently use a fixed competitor pool; replace with GSC-backed compare pairing in a later internal-link batch.
- Existing product cards still render raw `price_usd` values in some places; Batch 2 normalized only the new brand/protocol summary modules to avoid expanding scope.
- Static generation count should be rechecked in a clean build/deploy-equivalent environment before sitemap submission.

### Batch 3: Articles

Status: completed

Target templates:

- `/articles/[category]/[slug]`
- `/articles/[category]`

Impact:

- `ArticlePage`: `gitnexus impact -r smartlock-next ArticlePage --direction upstream` → `LOW`, 0 upstream dependents.
- `CategoryPage`: `gitnexus impact -r smartlock-next CategoryPage --direction upstream` → `LOW`, 0 upstream dependents.

Implemented:

- `app/articles/[category]/[slug]/page.tsx`
  - Added answer summary, category/slug-specific checklist, reviewed guidance, and above-fold calculator links.
  - Reused existing registry data and avoided per-article hard-coded blocks except intent mapping.
- `app/articles/[category]/page.tsx`
  - Added start-here verdict, hub stats, featured/pillar articles, and category tool links.

Validation:

- `npm run build` passed.
- Static generation completed for `1529/1529` pages.
- Build emitted existing compare static-generation timeout restarts for several long-tail compare pages, but recovered successfully.
- `git --no-pager diff --check` passed for edited Batch 3 files.

Residual risks:

- Current article registry has only partial `relatedTools`; template fallbacks cover gaps, but high-impression pages should still get explicit per-article tools over time.
- Category hub titles/descriptions still use broad category metadata; a future metadata pass can make category snippets more CTR-oriented.

### Batch 4: Calculators

Status: completed

Target templates:

- Top 5 calculator detail pages by GSC opportunity.
- `/calculators` hub.

Impact:

- `InstallationCostPage`: `gitnexus impact -r smartlock-next InstallationCostPage --direction upstream` → `LOW`, 0 upstream dependents.
- `SignalStrengthPage`: `gitnexus impact -r smartlock-next SignalStrengthPage --direction upstream` → `LOW`, 0 upstream dependents.
- `CompatibilityPage`: `gitnexus impact -r smartlock-next CompatibilityPage --direction upstream` → `LOW`, 0 upstream dependents.
- `BatteryLifePage`: `gitnexus impact -r smartlock-next BatteryLifePage --direction upstream` → `LOW`, 0 upstream dependents.
- `ProtocolWizardPage`: `gitnexus impact -r smartlock-next ProtocolWizardPage --direction upstream` → `LOW`, 0 upstream dependents.
- `CalculatorsPage`: `gitnexus impact -r smartlock-next CalculatorsPage --direction upstream` → `LOW`, 0 upstream dependents.

Implemented:

- Added `components/seo/CalculatorSeoBlock.tsx` as a small static SEO pattern for calculator pages.
- Applied the pattern to:
  - `/calculators/installation-cost`
  - `/calculators/signal-strength`
  - `/calculators/compatibility`
  - `/calculators/battery-life`
  - `/calculators/protocol-wizard`
- Each target page now has:
  - what the calculator answers;
  - formula or decision model;
  - explicit assumptions;
  - example scenario;
  - data source summary;
  - report-ready input guidance;
  - links to adjacent calculator, article, protocol, and best pages.
- Added missing canonical metadata for compatibility, battery-life, and protocol-wizard.
- Upgraded `/calculators` from a plain directory to a decision hub with:
  - highest-value checks;
  - GSC/opportunity notes;
  - planning paths for single-lock buyers, multi-door projects, and signal-risk scenarios.

Validation:

- `git --no-pager diff --check` passed for Batch 4 edited files.
- `npm run build` passed; static generation completed for `1543/1543` pages.
- Build emitted existing browserslist/baseline data and missing `JWT_SECRET` warnings; no Batch 4 calculator build failure.
- `gitnexus detect-changes -r smartlock-next` still reports full-worktree `critical` risk because the repository contains accumulated dirty changes from earlier batches and unrelated API/DB/MDX edits. Batch 4's own pre-edit impact checks were all `LOW`.
- HTML spot checks confirmed static output contains:
  - installation-cost: formula, assumptions, example scenario, report-ready inputs, canonical, and adjacent calculator links;
  - signal-strength: signal usage guidance, RF formula, mesh/protocol links, canonical, and JSON-LD;
  - compatibility: interpretation block, fit-score formula, canonical, and standards/source content;
  - battery-life: battery formula, assumptions, example, canonical, and battery/TCO links;
  - protocol-wizard: decision model, assumptions, example, canonical, and protocol/best/TCO links;
  - `/calculators`: highest-value checks, planning paths, canonical, and CollectionPage/ItemList JSON-LD.
- Cross-check pass:
  - Found compatibility, battery-life, protocol-wizard, and calculator hub were still relying on generic site-level OpenGraph/Twitter fallbacks in generated HTML.
  - Added explicit calculator-specific OpenGraph/Twitter metadata for those pages.
  - Added WebPage JSON-LD to compatibility, battery-life, and protocol-wizard, matching the pattern already present on installation-cost and signal-strength.
  - Rebuilt successfully after the fix and confirmed generated HTML no longer contains the default `SLockHub.com - Expert Guides & Tools` social title on the checked calculator pages.
  - Cleaned the new shared calculator SEO component to avoid new non-ASCII glyphs.

Residual risks:

- Many long-tail calculator pages still have useful calculators but lack the shared static SEO pattern.
- The future PDF/lead-capture batch should replace the current "report-ready inputs" copy with an actual download flow.
- Current GSC export still cannot confirm calculator index status; use URL Inspection or Page Indexing export for real indexed/not-indexed state.

### Batch 5: Hubs and Internal Links

Status: completed

Target templates:

- `/compare`, `/brands`, `/articles`, `/resources`, `/protocols`, `/`.

Impact:

- `ComparePage`: `gitnexus impact -r smartlock-next ComparePage --direction upstream` → `LOW`, 0 upstream dependents.
- `Brands`: `gitnexus impact -r smartlock-next Brands --direction upstream` → `LOW`, 0 upstream dependents.
- `ArticlesPage`: `gitnexus impact -r smartlock-next ArticlesPage --direction upstream` → `LOW`, 0 upstream dependents.
- `Resources`: `gitnexus impact -r smartlock-next 'Function:app/resources/page.tsx:Resources' --direction upstream` → `LOW`, 0 upstream dependents.
- `ProtocolsPage`: `gitnexus impact -r smartlock-next ProtocolsPage --direction upstream` → `LOW`, 0 upstream dependents.
- `HomePage`: `gitnexus impact -r smartlock-next HomePage --direction upstream` → `LOW`, 0 upstream dependents.

Implemented:

- `/compare`
  - upgraded from protocol table page to compare hub with high-demand compare entry points, comparison pathways, and CollectionPage/ItemList JSON-LD.
- `/brands`
  - added brand-depth pathways, top-brand shortlist, protocol coverage modules, CollectionPage/ItemList JSON-LD, and social metadata.
- `/articles`
  - added high-intent start-here article links and article-to-calculator/article-to-best routing modules above the category grid.
- `/resources`
  - added decision-stage routing, CollectionPage/ItemList JSON-LD, and social metadata so the page is a real discovery hub rather than a references list.
- `/protocols`
  - added protocol-to-calculator/product workflow links, CollectionPage/ItemList JSON-LD, and stronger metadata.
- `/`
  - added explicit homepage metadata plus a "Start by Decision Type" path section and ItemList in homepage JSON-LD to route crawlers and users into the deepest commercial/support hubs.

Validation:

- `git --no-pager diff --check` passed for Batch 5 edited hub files.
- `npm run build` passed; static generation completed for `1543/1543` pages.
- HTML spot checks confirmed:
  - `/compare`: high-demand comparison links, comparison pathways, canonical, and CollectionPage.
  - `/brands`: brand pathways, protocol coverage block, canonical, CollectionPage, and non-default social metadata.
  - `/articles`: start-here guides, research-to-decision path, canonical, and CollectionPage.
  - `/resources`: decision-stage routing, canonical, CollectionPage, and non-default social metadata.
  - `/protocols`: calculator/product workflow links, canonical, CollectionPage, and non-default social metadata.
  - `/`: decision-type routing, updated homepage title/meta, canonical, and ItemList in homepage JSON-LD.
- `gitnexus detect-changes -r smartlock-next` remains full-worktree `critical` because the repo still includes accumulated dirty changes from prior article/API/DB/template batches. Batch 5 hub symbols themselves remained `LOW` before editing.

Residual risks:

- Some hub pages still contain older non-ASCII copy and legacy CTA text outside this batch; those were left alone to avoid unrelated churn.
- `/compare` hub still presents protocol guidance more strongly than brand-vs-brand navigation; future iteration can add a fuller compare-family index once long-tail uniqueness work is complete.
- `/brands` relies on `getBrands()` which does per-brand product counting; performance is acceptable at current scale but not ideal if the dataset grows substantially.

### Batch 6: PDF and Lead Capture

Status: completed

Target assets:

- Door Compatibility Audit PDF.
- Smart Lock TCO Report PDF.
- Product Comparison Report PDF.

Impact:

- `CompatibilityPage`: `gitnexus impact -r smartlock-next CompatibilityPage --direction upstream` -> `LOW`, 0 upstream dependents.
- `InstallationCostPage`: `gitnexus impact -r smartlock-next InstallationCostPage --direction upstream` -> `LOW`, 0 upstream dependents.
- `BrandComparisonPage`: `gitnexus impact -r smartlock-next BrandComparisonPage --direction upstream` -> `LOW`, 0 upstream dependents.

Implemented:

- Added `lib/reports/pdf.ts` as a dependency-free first-pass PDF generator for:
  - Door Compatibility Audit;
  - Smart Lock TCO Report;
  - Product Comparison Report.
- Added `app/api/reports/download/route.ts`:
  - validates report type, email, use case, door count, source path, UTM, and page context with `zod`;
  - returns `application/pdf` with a download filename;
  - captures source page, referrer, user agent, UTM, and template context;
  - creates/writes `report_leads` in Turso when database credentials exist;
  - degrades gracefully when database credentials are absent so PDF download still works.
- Added `components/seo/ReportLeadCapture.tsx` as a reusable client CTA/modal:
  - collects email, use case, and door count;
  - submits source page and UTM fields;
  - downloads the generated PDF;
  - includes success, loading, and error states.
- Integrated the first lead-capture report CTAs into high-intent templates:
  - `/calculators/compatibility` -> Door Compatibility Audit PDF;
  - `/calculators/installation-cost` -> Smart Lock TCO Report PDF;
  - `/compare/[slug]` -> Product Comparison Report PDF.

Validation:

- `git --no-pager diff --check` passed for Batch 6 files.
- `npm run build` passed; static generation completed for `1543/1543` pages.
- API smoke test confirmed `/api/reports/download` returns `application/pdf` and a non-empty PDF payload without requiring Turso credentials.
- HTML spot checks confirmed generated static pages include:
  - `Door Compatibility Audit PDF` on `/calculators/compatibility`;
  - `Smart Lock TCO Report PDF` on `/calculators/installation-cost`;
  - `Comparison Report` on sampled compare pages.
- `gitnexus detect-changes -r smartlock-next` remains full-worktree `critical` because the repo contains accumulated dirty changes from earlier batches. Batch 6 target symbols were `LOW` before editing.

Residual risks:

- The first PDF renderer is intentionally simple and single-page. It is suitable for launch validation, but a later version should add branded layout, multi-page sections, and richer template-specific tables.
- Lead persistence depends on Turso environment variables. Without them, downloads work but leads are not stored.
- No CRM/email automation is connected yet; this batch only closes the report generation and capture endpoint loop.

Cross-check update:

- Found and fixed four structural gaps:
  - added `database/migrations/report-leads.sql` so `report_leads` is a real schema artifact, not only a runtime `CREATE TABLE IF NOT EXISTS`;
  - added the Smart Lock TCO Report CTA to `/calculators/lock-tco`, which is the true ownership-cost calculator and not just installation-cost support content;
  - added the Door Compatibility Audit CTA to `/articles/guides/door-compatibility-guide`, the highest-intent compatibility article path from the Search Performance export;
  - added the Product Shortlist Report CTA to `/brands/[slug]/[product]`, giving product-detail pages a first-party conversion path beyond retailer clicks.
- Additional impact checks:
  - `TCOCalculator`: `gitnexus impact -r smartlock-next 'Function:app/calculators/lock-tco/page.tsx:TCOCalculator' --direction upstream` -> `LOW`, 0 upstream dependents.
  - `ArticlePage`: `gitnexus impact -r smartlock-next ArticlePage --direction upstream` -> `LOW`, 0 upstream dependents.
  - `ProductDetailPage`: `gitnexus impact -r smartlock-next ProductDetailPage --direction upstream` -> `LOW`, 0 upstream dependents.

### Batch UX-1 to UX-5: Mobile + Desktop UX Deep Optimization

Status: completed

Target templates and shared surfaces:

- `app/layout.tsx`
- `components/Header.tsx`
- `components/seo/ReportLeadCapture.tsx`
- `components/TableOfContents.tsx`
- `components/articles/ArticleContent.tsx`
- `/calculators/compatibility`
- `/calculators/installation-cost`
- `/calculators/lock-tco`
- `/calculators/signal-strength`
- `/compare/[slug]`
- `/best/[slug]`
- `/brands/[slug]/[product]`
- `/protocols/[protocol]`
- `/articles/[category]/[slug]`

Impact:

- `Header`: `gitnexus impact -r smartlock-next Header --direction upstream` -> `LOW`, 0 upstream dependents.
- `RootLayout`: `gitnexus impact -r smartlock-next RootLayout --direction upstream` -> `LOW`, 0 upstream dependents.
- `CompatibilityPage`: `gitnexus impact -r smartlock-next CompatibilityPage --direction upstream` -> `LOW`, 0 upstream dependents.
- `TableOfContents`: `gitnexus impact -r smartlock-next TableOfContents --direction upstream` -> `LOW`, 0 upstream dependents.
- `ReportLeadCapture`: not yet resolved by GitNexus symbol lookup, so UX work stayed limited to local modal behavior and shared CSS rather than business logic changes.

Implemented:

- Global UX foundations:
  - added a skip link and focusable `#main-content` target in `app/layout.tsx`;
  - added consistent `:focus-visible` treatment, touch-target sizing, mobile container spacing, and shared responsive utility classes in `app/globals.css`;
  - improved desktop mega-menu viewport safety and mobile-nav panel scrolling/locking behavior.
- Header:
  - mobile trigger now exposes `aria-expanded` and `aria-controls`;
  - Escape closes both the open mobile menu and its active accordion;
  - `body.mobile-nav-open` now locks background scroll while the menu is open.
- Report modal / lead capture:
  - modal now closes on Escape and backdrop press;
  - body scroll locks while the modal is open;
  - initial focus moves to the email field;
  - mobile modal height/scroll behavior was constrained for small viewports;
  - modal close button was excluded from the mobile full-width button rule to avoid a broken header row.
- Articles:
  - added mobile `details` TOC plus desktop sticky TOC rail using `components/TableOfContents.tsx`;
  - aligned rendered heading ids with extracted markdown heading ids in `components/articles/ArticleContent.tsx`;
  - widened the article content shell so desktop reading and right-rail TOC can coexist without crowding.
- Calculators:
  - normalized the high-value tools onto shared `calculator-shell`, `calculator-inputs`, and `calculator-results` layout primitives;
  - on mobile, sticky result cards fall back to normal flow instead of fighting viewport height.
- Commercial templates:
  - `/compare/[slug]`, `/best/[slug]`, and `/protocols/[protocol]` now use desktop tables plus mobile comparison-card matrices rather than depending only on horizontal scrolling;
  - `/brands/[slug]/[product]` now uses a sticky decision card on desktop and a bottom action bar on mobile;
  - mobile action bars were added only where there is a clear next-step path and padded for safe-area devices.

Validation:

- `npm run build` passed on May 8, 2026 after the UX pass; static generation completed for `1543/1543` pages.
- `git --no-pager diff --check` passed after the final UX fixes.
- Local production server was verified on `http://localhost:3002`.
- HTML smoke checks returned `200` and preserved canonical + JSON-LD on:
  - `/`
  - `/calculators/compatibility`
  - `/calculators/lock-tco`
  - `/compare/yale-vs-august`
  - `/brands/yale/yale-assure-lock-2-plus`
  - `/articles/guides/door-compatibility-guide`
- The same smoke checks confirmed the expected UX hooks are present in generated HTML:
  - skip link on all sampled pages;
  - calculator shell on calculator pages;
  - comparison-card grid and mobile action bar on compare templates;
  - mobile action bar on product pages;
  - mobile TOC on article pages.
- `gitnexus detect-changes -r smartlock-next --scope all` still reports full-worktree `critical` because the repository contains accumulated SEO, API, DB, and content edits from earlier batches. That signal is not attributable to this UX pass alone; the target symbols above were checked individually and remained `LOW`.

Residual risks:

- This batch did not include screenshot-based browser automation because local Playwright tooling is not installed in the workspace.
- Some older calculators outside the prioritized set still use legacy sticky result layouts and raw `overflow-x-auto` tables; they were left alone to keep this pass scoped.
- Existing content/data issues such as unusual raw price formatting on some pages were preserved for a later data-normalization batch rather than mixed into UX work.

Cross-check update:

- Rechecked the UX plan against implementation and found one material omission:
  - `/calculators/protocol-wizard` still used the older stacked questionnaire/result structure and its technical comparison depended on horizontal table scrolling.
- Fixed the omission without changing the recommendation algorithm:
  - moved `ProtocolWizard` onto the shared `calculator-shell`, `calculator-inputs`, and `calculator-results` layout used by the other priority calculators;
  - changed the form controls to the shared `form-input` class;
  - kept the recommendation result sticky on desktop and normal-flow on mobile through the existing calculator shell rules;
  - added a mobile comparison-card matrix for the protocol technical comparison while preserving the desktop `data-table`.
- Added a cross-template mobile safety rule:
  - `.sticky.top-4` is forced back to normal flow only under the mobile breakpoint, reducing sticky result-card obstruction risk across legacy calculators without touching each calculator implementation.
- Added long-value wrapping protection to `.comparison-card__value` so protocol names, standards, and product spec values cannot force horizontal overflow on small screens.
- Additional impact checks:
  - `ProtocolWizardPage`: `gitnexus impact -r smartlock-next ProtocolWizardPage --direction upstream` -> `LOW`, 0 upstream dependents.
  - `ProtocolWizard`: `gitnexus impact -r smartlock-next 'Function:app/calculators/protocol-wizard/ProtocolWizard.tsx:ProtocolWizard' --direction upstream` -> `LOW`, 0 upstream dependents.
- Additional validation:
  - `npm run build` passed; static generation completed for `1543/1543` pages.
  - `git --no-pager diff --check` passed before this cross-check update.
  - Local production HTML smoke checks confirmed:
    - `/calculators/protocol-wizard`: `200`, canonical, JSON-LD, `calculator-shell`, and `comparison-card-grid`;
    - `/articles/guides/door-compatibility-guide`: `200`, canonical, JSON-LD, `mobile-toc`, and `reading-progress`;
    - `/calculators/compatibility`: `200`, canonical, JSON-LD, and `calculator-shell`;
    - `/compare/yale-vs-august`: `200`, canonical, JSON-LD, `comparison-card-grid`, and `mobile-action-bar`.
