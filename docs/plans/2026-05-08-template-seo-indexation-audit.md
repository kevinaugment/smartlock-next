# Template SEO & Indexation Audit

Date: 2026-05-08

Source data:

- `https___www.slockhub.com_-Performance-on-Search-2026-05-08/网页.csv`
- `https___www.slockhub.com_-Performance-on-Search-2026-05-08/查询数.csv`
- `https___www.slockhub.com_-Performance-on-Search-2026-05-08/ubersuggest https___www.slockhub.com_.csv`
- Current Next.js route templates and database-backed sitemap.

Important data note:

- `网页.csv` is Search Performance page data, not the full Page Indexing export. A URL missing from this export can mean no impressions, not necessarily not indexed.
- The build currently generates 1543 sitemap/static URLs; the GSC page export contains 1000 page rows. This is enough to identify template-level demand and weak templates, but a final indexation backlog should also import the GSC Page Indexing export.

Official Google constraints used:

- Google canonicalization: duplicate or very similar pages may be consolidated; canonical hints are not commands.
- Google helpful content guidance: scaled templates must add original, substantial, useful value, not only swap names.
- Google crawling/indexing guidance: sitemaps help discovery, but page quality, internal links, duplication, and canonical selection affect indexing.

## GSC Template Baseline

| Template | URLs in GSC export | Clicks | Impressions | CTR | Avg position | Read |
|---|---:|---:|---:|---:|---:|---|
| `/compare/[slug]` | 689 | 323 | 18087 | 1.79% | 9.23 | Strongest demand, low CTR headroom |
| `/articles/[category]/[slug]` | 71 | 11 | 6375 | 0.17% | 10.08 | Ranking exists, snippet/intent mismatch |
| `/best/[slug]` | 20 | 7 | 3346 | 0.21% | 27.48 | Big opportunity, currently weak authority |
| `/brands/[slug]/[product]` | 122 | 6 | 2990 | 0.20% | 9.03 | Good rank potential, CTR/content weak |
| `/brands/[slug]` | 42 | 1 | 1306 | 0.08% | 19.01 | Thin brand authority pages |
| `/calculators/[slug]` | 28 | 3 | 1181 | 0.25% | 12.42 | Useful tools, low SERP packaging |
| `/protocols/[protocol]` | 6 | 0 | 177 | 0% | 10.01 | Needs stronger comparison/data blocks |
| Hub pages | 12+ | 3 | 633+ | low | mixed | Hubs rank but do not drive clicks |

Query intent distribution from `查询数.csv`:

| Intent | Queries | Clicks | Impressions | Avg position | Diagnosis |
|---|---:|---:|---:|---:|---|
| Comparison | 115 | 19 | 1518 | 13.83 | Strongest commercial intent |
| Protocol/ecosystem | 94 | 1 | 502 | 52.43 | Pages exist but are not competitive |
| Best-of | 93 | 0 | 358 | 42.15 | Weak relevance/trust for list queries |
| Calculator/problem | 60 | 0 | 168 | 51.08 | Tool pages need explainers + snippets |
| Use case | 25 | 0 | 63 | 79.94 | Airbnb/hotel/rental pages underbuilt |

## Template Classification & Action Plan

### 1. Compare Detail: `/compare/[brand-a]-vs-[brand-b]`

Current value:

- Best-performing template: 18087 impressions, 323 clicks.
- GSC examples: `nuki-vs-tedee`, `veise-vs-teeho`, `schlage-vs-veise`, `august-vs-switchbot`.
- Existing data used: product count, rating, price range, protocols, battery, fingerprint, keypad, target market, price tier.

Main gaps:

- Many pages are structurally similar; Google may canonicalize/ignore weaker long-tail pairs if they do not contain enough pair-specific content.
- Page lacks a generated pair-specific winner summary across use cases.
- No model-level "best from each brand" comparison.
- No "who should choose A/B" section.
- FAQ text is generic and no longer output as FAQ schema, which is correct, but visible answers still need stronger pair-specific evidence.

Add:

- `Verdict by use case`: home security, rental, HomeKit/Matter, budget, battery life.
- `Best model from each brand`: top product from each side with price, protocol, battery, feature delta.
- `Shared ecosystem compatibility`: intersection of protocols/ecosystems.
- `Do not choose X if...`: data-driven caveats.
- `Comparison methodology`: explain how ratings, price range, protocols, battery, and features are calculated.

Implementation priority: P0.

### 2. Best-Of Pages: `/best/[slug]`

Current value:

- 20 pages, 3346 impressions, average position 27.48.
- Ubersuggest shows demand for HomeKit, Airbnb, Matter, fingerprint, auto-lock, and protocol-specific best pages.

Main gaps:

- The template is still close to a product list; it needs editorial proof.
- It uses product specs, but lacks a clear selection methodology and persona-specific ranking logic.
- Top products get Product schema, but not enough visible evidence to support "best" claims.

Add:

- `How we picked`: criteria and weightings from existing product fields.
- `Best for X` badges generated from data: battery, protocol, fingerprint, Matter, rental, commercial.
- `Comparison matrix` for all products, not only sidebar top 5.
- `Buying decision tree`: "choose Wi-Fi if...", "choose Z-Wave if...".
- `Missing-data disclaimer`: avoid overstating unknown price/specs.
- Link each page to relevant calculators: compatibility, battery, installation cost, signal.

Implementation priority: P0 for `homekit-smart-locks`, `smart-locks-for-airbnb`, `matter-smart-locks`, `fingerprint-smart-locks`, `smart-locks-with-longest-battery-life`.

### 3. Product Detail: `/brands/[brand]/[product]`

Current value:

- 122 URLs in GSC export, 2990 impressions, avg position 9.03, CTR only 0.20%.
- This means Google can rank them, but snippets and perceived value are weak.

Main gaps:

- Strong structured data opportunity is underused.
- Product pages have rich fields: dimensions, door thickness, bore diameter, backset, power draw, credential capacity, RF range, ecosystems, ANSI, UL, encryption.
- Missing "compatibility verdict" and "why/why not" explanations.
- No model-specific comparison to sibling products.

Add:

- `Quick verdict`: who this lock is for and who should skip it.
- `Door fit verdict`: generated from thickness/bore/backset.
- `Battery cost estimate`: generated from battery fields and operations/day.
- `Protocol reliability note`: generated from protocol/RF/range.
- `Credential capacity verdict`: PIN/fingerprint/cards/app users.
- `Sibling comparison`: other products from same brand/series.
- Product schema: add `offers` only where price exists; add `aggregateRating` only if rating/review_count are defensible.

Implementation priority: P0.

### 4. Brand Detail: `/brands/[slug]`

Current value:

- 42 URLs, 1306 impressions, avg position 19.01, CTR 0.08%.

Main gaps:

- Brand pages read mostly like product-line listings.
- They do not yet answer "is this brand good", "what ecosystem does it fit", "best models", "alternatives", or "brand vs competitors".
- Existing fields like country, founded year, target market, price tier, supported protocols, series, products are not fully converted into editorial sections.

Add:

- `Brand verdict`: market position, best buyer, avoid-if.
- `Protocol support matrix`: Wi-Fi/Zigbee/Z-Wave/Thread/Matter/Bluetooth.
- `Best products from this brand`: generated top 3 with reason.
- `Brand alternatives`: links to compare pages for the top GSC competitor pairs.
- `Use-case fit`: residential, commercial, rental, hotel, HomeKit/Matter.
- Organization/Brand schema where appropriate.

Implementation priority: P1.

### 5. Article Detail: `/articles/[category]/[slug]`

Current value:

- 71 pages, 6375 impressions, avg position 10.08, CTR 0.17%.
- This is a snippet/title problem plus trust problem: pages rank near page 1 but do not earn clicks.

Main gaps:

- Article metadata exists, but the template does not add a "quick answer" when article content lacks one.
- Many support articles are short; Google may see them as thin unless they include diagnosis, steps, evidence, and next actions.
- Author/process trust is weak.
- Related tools exist but only appear below content, often too late.

Add:

- Auto-render `Quick Answer` from metadata or frontmatter when present.
- Add `Symptoms / Cause / Fix / When to call locksmith` blocks for troubleshooting articles.
- Add `Reviewed / Updated / Sources / Methodology` trust block.
- Move relevant tool CTA higher for problem-solving queries.
- Add `Article` schema image/logo and stronger publisher fields.
- Build category-specific templates: troubleshooting, protocol, installation, security, use-case, resource/reference.

Implementation priority: P0 for high-impression pages; P1 for all article pages.

### 6. Calculator Detail: `/calculators/[slug]`

Current value:

- 28 URLs, 1181 impressions, avg position 12.42, CTR 0.25%.
- Tools are useful but SERP packaging is weak, and many pages need more explain-before-tool content.

Main gaps:

- Most pages have the calculator, Be-Tech recommendation, tables, and related resources, but not enough above-fold answer content for searchers.
- Some calculator pages are pure client tools; Google can index the shell, but needs supporting static content.
- The `/api/calculators/[slug]` DB has rich content sections, FAQs, protocol data, sources, related calculators, related articles, and brands; many static calculator pages do not fully consume this DB content.

Add:

- `What this calculator answers` block above the tool.
- `Formula / assumptions` block for trust.
- `Example scenario` with computed sample output.
- `Data sources` block from calculator DB where available.
- `Related product recommendations` using `getProductsForCalculator`.
- Lead funnel: generate PDF/report from calculator output after form capture.

Implementation priority: P0 for installation-cost, compatibility, signal-strength, battery-life, protocol-wizard.

### 7. Protocol Detail: `/protocols/[protocol]`

Current value:

- 6 URLs, 177 impressions, avg position 10.01, zero clicks.

Main gaps:

- Protocol pages likely compete with bigger guides; they need unique smart-lock-specific data.
- No visible "compare this protocol against alternatives" matrix on every protocol page.

Add:

- Protocol scorecard: battery, range, latency, hub cost, ecosystem support.
- `Best locks using this protocol` from product DB.
- `Protocol vs alternatives` table.
- Internal links to `/compare`, `/best/[protocol]`, and signal/battery calculators.

Implementation priority: P1.

### 8. Hubs: `/compare`, `/brands`, `/articles`, `/calculators`, `/resources`, `/protocols`

Current value:

- Hubs have impressions and reasonable positions but almost no clicks.

Main gaps:

- Hubs are not acting as "indexable directories with editorial value"; many are navigation pages.
- Hubs need explainers, filters, top links, and GSC-driven popular paths.

Add:

- "Popular comparisons this month" from GSC top compare URLs.
- "Top brands by product coverage" and "brands by protocol".
- "Start here" blocks for calculators.
- Category descriptions and curated top articles.
- `ItemList` / `CollectionPage` schema where useful.

Implementation priority: P1.

## Indexation Strategy

Observed risk:

- Sitemap/build URL count is 1543, but GSC performance export only shows 1000 URLs. This does not prove all missing URLs are unindexed, but it strongly suggests many long-tail URLs have no search visibility yet.
- The highest indexation risk is long-tail programmatic content with weak uniqueness: compare pages, product pages with sparse fields, brand pages with generic copy, and thin support articles.

Actions:

1. Import the GSC Page Indexing export, not only Search Performance export.
2. Generate `indexed.md` and `to-index.md` by comparing sitemap URLs to indexed URLs.
3. Prioritize URL Inspection requests:
   - Priority 1: high-impression pages with low CTR or page-1/2 positions.
   - Priority 2: best-of and product pages with strong commercial intent.
   - Priority 3: long-tail compare pages only after adding pair-specific content.
4. Do not submit all 1000+ long-tail compare URLs blindly. Improve template uniqueness first, then submit in batches.

## Next Implementation Batch

Batch 6 should implement the highest-leverage template improvements:

1. Compare template:
   - pair-specific verdict
   - best model from each brand
   - use-case winner cards
   - methodology block

2. Product template:
   - quick verdict
   - door fit verdict
   - battery/cost verdict
   - sibling products
   - stronger Product JSON-LD where data is available

3. Best-of template:
   - selection methodology
   - full comparison matrix
   - buyer decision tree
   - calculator links above the fold

Success criteria:

- `npm run build` remains clean.
- Sitemap/static generation remains complete.
- GSC next export should show higher CTR on compare/product/best pages and broader visibility on article category/product URLs.
