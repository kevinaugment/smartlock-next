# SLockHub Indexing Audit

- Date: 2026-08-13
- Scope: Google Search Console Coverage export, recent Performance export, local source review, multi-agent review, production build, and local production HTTP smoke.
- Input Coverage folder: `/Users/luokun/Downloads/https___www.slockhub.com_-Coverage-2026-08-13/`
- Important limitation: the Coverage export contains counts only, not URL-level issue lists. URL Inspection and Page Indexing URL details are still required before bulk submission or bulk `noindex` decisions.

## Coverage Snapshot

| GSC state | Count | Priority | Notes |
|---|---:|---|---|
| Crawled - currently not indexed | 274 | P1 | Largest quality/indexability bucket. Needs URL details before page-level decisions. |
| Discovered - currently not indexed | 217 | P1 | Often crawl budget, weak internal links, or low perceived value. |
| Other 4xx | 171 | P1 | High enough to affect crawl quality. Needs URL drilldown. |
| Not found (404) | 60 | P1 | Confirmed compare-direction samples existed in performance data. |
| Duplicate, Google chose different canonical | 4 | P2 | Likely helped by compare canonical redirects, but URL detail is required. |
| Blocked by robots.txt | 3 | P2 | Current app rules intentionally block `/admin/`, `/api/`, `/status/`. Confirm exact URLs. |
| Excluded by noindex | 1 | P2 | Current `/status` and `/admin` are intentional noindex surfaces. Confirm exact URL. |

Trend:

- 2026-05-15: 352 not indexed, 1261 indexed.
- 2026-08-05: 497 not indexed, 1207 indexed.
- 2026-08-06: 730 not indexed, 1203 indexed.
- 2026-08-07: 730 not indexed, 1203 indexed.

The 2026-08-06 jump from 497 to 730 not-indexed URLs looks like a sitewide reclassification or discovery event. The available export does not prove which URLs moved.

## Confirmed Gaps Fixed In This Pass

1. Non-canonical compare URLs returned 404 instead of consolidating.
   - Fixed with `middleware.ts`, which redirects `/compare/{b}-vs-{a}` to `getCanonicalComparisonHref(a, b)` using HTTP 301.
   - Local production smoke: `/compare/weiser-vs-schlage` returns `301 Location: /compare/schlage-vs-weiser`; `/compare/schlage-vs-weiser` returns 200 with canonical.

2. Compare pages loaded the full product catalog on each detail request.
   - Fixed by `BrandModel.getBySlugs()` and `ProductModel.getForComparisonByBrandSlugs()`.
   - This reduces per-request dynamic database work from all brands/products to the two compared brands.

3. Product detail pages loaded all comparison products and all SEO series, and metadata did not constrain brand slug.
   - Fixed by `ProductModel.getByBrandAndSlug()` and `ProductSeriesModel.getById()`.
   - Sibling links now use `ProductModel.getByBrandSlug(brandSlug)`.
   - Local production smoke: `/brands/wrong-brand/yale-assure-lock-2-plus` returns 404 + `noindex` and no canonical.

4. XML sitemap silently swallowed database failures and could publish a partial 200 sitemap.
   - Fixed by removing the empty catch around dynamic database reads.
   - If dynamic reads fail, the sitemap fails closed instead of presenting incomplete URL discovery data as valid.

5. XML sitemap used current build date as `lastmod` for many static/fallback pages.
   - Fixed by omitting `lastModified` where no real content timestamp exists.
   - Brand/product/best pages use database timestamps where available; article pages use `updatedAt` or `pubDate`; compare pages use the latest timestamp from either brand/product side.
   - Local production smoke: `/sitemap.xml` has 1575 URLs, 1081 compare URLs, and 0 occurrences of `<lastmod>2026-08-13</lastmod>`.

6. `/resources/glossary` and `/resources/buying-guide` inherited the sitewide default metadata.
   - Fixed with route layouts that declare page-specific title, description, and canonical.
   - Local production smoke confirmed both pages return 200 with distinct canonical URLs.

7. Article metadata `relatedTools` was not rendered as crawlable article-to-tool links.
   - Fixed in the article detail template using `resolveCalculatorRouteSlug()` and `calculatorTitles`.
   - Local production smoke on `/articles/guides/door-compatibility-guide` found crawlable calculator links for compatibility, door fit, and installation cost.

## Live Production Verification Gap

Current code and local production smoke show the fixes above, but the live domain still needs deployment verification. A same-day live check against `https://www.slockhub.com` showed:

- `/compare/weiser-vs-schlage`: `404`, not the expected `301` to `/compare/schlage-vs-weiser`.
- `/brands/wrong-brand/yale-assure-lock-2-plus`: `503`, not the expected 404/noindex invalid-product path.
- `/protocols/wifi`: `503` on one sampled request.
- `/sitemap.xml`: returned both `200` and `503` across samples. The successful response had 1575 URLs and 1081 compare URLs, but still contained 1163 `<lastmod>2026-08-13</lastmod>` entries.

Treat the production indexing state as not yet proven fixed until the current `main` build is deployed and the technical verification set passes on the live Worker.

## Confirmed Issues Still Requiring Non-Code Or Data Follow-Up

1. GSC URL-level Coverage detail is missing.
   - The current CSV only has issue counts. Export Page Indexing URL examples for all seven issue states before bulk inspection or submission.

2. Cloudflare edge configuration appears to inject extra crawler rules.
   - Prior live checks saw Cloudflare Managed robots rules blocking several AI crawlers. That is not controlled by `app/robots.ts`.
   - This is a GEO/AI-search issue, not ordinary Googlebot blocking, unless exact Googlebot URL Inspection says otherwise.

3. Dynamic route 503/Worker resource spikes were observed online under load.
   - This pass reduced database fan-out on compare/product pages, but Cloudflare preview/production should still be smoke-tested after deployment.
   - Watch `/brands/yale`, `/brands/yale/yale-assure-lock-2-plus`, `/best/homekit-smart-locks`, `/compare/schlage-vs-weiser`, `/protocols/wifi`, and `/sitemap.xml`.

4. Compare page volume is still high.
   - Local sitemap grouping: 1575 total URLs, including 1081 compare URLs, 246 product URLs, 119 article URLs, 47 brand URLs, 32 calculator URLs, 20 best URLs, 7 article category URLs, 6 protocol detail URLs, and 17 static/hub URLs.
   - Keep full sitemap coverage for now because URL-level Coverage is missing and historical compare URLs have real clicks/impressions. Do not bulk `noindex` or remove compare URLs without URL Inspection samples.

5. Short resource articles remain a likely quality bucket.
   - Registry count: 119 articles; 45 resource articles; 24 resource articles under 600 words; 53 total articles under 600 words.
   - These should be upgraded, merged into stronger resource hubs, or excluded only after URL-level GSC evidence.

## Indexing Layer Matrix

This matrix is the current operating policy until URL-level Page Indexing exports and URL Inspection samples prove a narrower action.

| Page class | Current sitemap treatment | Canonical / redirect treatment | Robots / noindex treatment | Inspection action |
|---|---|---|---|---|
| Core hubs: `/`, `/articles`, `/calculators`, `/brands`, `/compare`, `/protocols`, `/resources` | Included with hub-level priority; static pages do not get fake build-date `lastmod`. | Self-canonical metadata exists on major hubs; keep indexed. | Allowed by `app/robots.ts`; no intentional `noindex`. | Inspect only if a hub appears in GSC excluded/not-indexed buckets or after deploy smoke fails. |
| Priority tools and best pages | Included through shared calculator slug registry and priority best-page registry. Best pages use DB `updated_at` where available. | Self-canonical route metadata/layouts; keep indexed. | Allowed; no intentional `noindex`. | Submit representative high-exposure tools/best pages first, not every calculator or long-tail best URL. |
| Compare pages | All canonical unordered brand-pair URLs remain in sitemap for now; priority GSC/silo pairs are explicit fallbacks. | Non-canonical directions redirect 301 in middleware; detail route also refuses reverse/non-canonical slugs. | Allowed; no blanket `noindex` until URL-level evidence separates useful vs thin pairs. | Inspect high-impression canonical pairs and historical reverse URLs that now 301; do not request indexing for all 1081 compare URLs. |
| Product detail pages | Active products are included from `ProductModel.getAllForSeo()` with product `updated_at`. | Canonical is constrained to the product's real brand slug; wrong-brand paths 404 via `notFound()`. | 404 pages should inherit Next.js noindex behavior; no product blanket `noindex`. | Inspect a small sample across high-value brands plus any product URLs found in GSC 4xx/not-indexed details. |
| Resource hub pages | `/resources`, `/resources/glossary`, `/resources/reference-tables`, `/resources/installation-guides`, `/resources/buying-guide` are included. | Glossary and buying-guide now have page-level metadata/canonical; other resource hubs already define metadata. | Allowed; no intentional `noindex`. | Inspect only representative hub pages unless GSC details show specific exclusions. |
| Short resource articles | Currently included as ordinary article URLs because URL-level evidence is missing. | Article template self-canonicalizes every valid article route. | No blanket `noindex`; do not remove from sitemap until GSC URL details identify low-value clusters. | Build a URL-level queue from Page Indexing export first. Upgrade, merge, or noindex only after sample inspection confirms quality/indexability problems. |
| Admin/API/status | Excluded from discovery by robots where applicable. | Not intended as indexable content. | `app/robots.ts` disallows `/admin/`, `/api/`, `/status/`; admin/status layouts also use noindex where present. | Confirm the 3 robots-blocked and 1 noindex GSC URLs are these intentional surfaces before taking action. |

## URL Inspection Priority Queue

Use this order after deploying the fixes. Submit only a small set at a time and prefer representative samples over long-tail bulk submission.

1. Technical verification set:
   - `https://www.slockhub.com/sitemap.xml`
   - `https://www.slockhub.com/compare/weiser-vs-schlage`
   - `https://www.slockhub.com/compare/schlage-vs-weiser`
   - `https://www.slockhub.com/brands/wrong-brand/yale-assure-lock-2-plus`
   - `https://www.slockhub.com/resources/glossary`
   - `https://www.slockhub.com/resources/buying-guide`

2. High-value canonical compare URLs:
   - `https://www.slockhub.com/compare/nuki-vs-tedee`
   - `https://www.slockhub.com/compare/schlage-vs-weiser`
   - `https://www.slockhub.com/compare/kwikset-vs-schlage`
   - `https://www.slockhub.com/compare/schlage-vs-yale`
   - `https://www.slockhub.com/compare/lockly-vs-schlage`
   - `https://www.slockhub.com/compare/veise-vs-schlage`

3. Historical non-canonical compare URLs with impressions/clicks:
   - `https://www.slockhub.com/compare/schlage-vs-veise` -> `https://www.slockhub.com/compare/veise-vs-schlage`
   - `https://www.slockhub.com/compare/switchbot-vs-nuki` -> `https://www.slockhub.com/compare/nuki-vs-switchbot`
   - `https://www.slockhub.com/compare/schlage-vs-lockly` -> `https://www.slockhub.com/compare/lockly-vs-schlage`
   - `https://www.slockhub.com/compare/yale-vs-aqara` -> `https://www.slockhub.com/compare/aqara-vs-yale`
   - `https://www.slockhub.com/compare/schlage-vs-kwikset` -> `https://www.slockhub.com/compare/kwikset-vs-schlage`
   - `https://www.slockhub.com/compare/yale-vs-schlage` -> `https://www.slockhub.com/compare/schlage-vs-yale`

4. High-exposure content/tool URLs:
   - `https://www.slockhub.com/articles/guides/door-compatibility-guide`
   - `https://www.slockhub.com/best/matter-smart-locks`
   - `https://www.slockhub.com/best/z-wave-smart-locks`
   - `https://www.slockhub.com/best/homekit-smart-locks`
   - `https://www.slockhub.com/calculators/compatibility`
   - `https://www.slockhub.com/calculators/installation-cost`
   - `https://www.slockhub.com/calculators/signal-strength`

5. Product sample URLs:
   - `https://www.slockhub.com/brands/yale/yale-assure-lock-2-plus`
   - `https://www.slockhub.com/brands/nuki/nuki-smart-lock-pro-4`
   - `https://www.slockhub.com/brands/samsung/samsung-shp-dp609`

## Retest Plan

- Same day after deployment: inspect the technical verification set, sitemap count, compare redirects, and 5 dynamic page HTTP responses at low concurrency.
- 7 days after deployment: compare Coverage counts for 4xx/404, duplicate canonical, and crawled-not-indexed.
- 21 to 28 days after deployment: compare indexed URL count and GSC performance for canonical compare pages, resource pages, and high-exposure tools.
- Do not request indexing for hundreds of long-tail compare URLs. Let sitemap discovery and internal links work unless a URL has impressions/clicks or direct business value.
