# SLockHub URL Inspection Priority Queue

- Generated: 2026-08-13
- Rule: submit a small number of high-value and diagnostic URLs only. Do not bulk-submit all compare long-tail URLs.
- Evidence base: local source review, Coverage aggregate counts, and GSC Performance URL rows.
- Performance CSV: `/Users/luokun/Downloads/https___www.slockhub.com_-Performance-on-Search-2026-08-06/网页.csv`
- Sitemap XML: `/Users/luokun/Downloads/us.sitesucker.mac.sitesucker-pro/www.betechlock.com/GitHub/smartlock-next/out/sitemap.xml`

## Summary

- Sitemap URLs: 1575
- Compare URLs in sitemap: 1081
- Short resource URLs in sitemap: 45
- Performance URL rows imported: 1000
- Compare performance rows: 648
- Canonical compare groups: 606
- Non-canonical compare variants in performance export: 153
- Product rows with performance visibility: 141
- Short resource articles under 600 words: 24
- Short resource articles with performance visibility: 7

## Batch 0: Deployment And Technical Verification

Purpose: verify that the deployed static Cloudflare Pages site is serving the generated sitemap and redirects before requesting indexing.

Do not click `Request indexing` for diagnostic negative URLs. Use URL Inspection live test only.

| Action | URL | Expected result |
|---|---|---|
| Live test only | `https://www.slockhub.com/sitemap.xml` | Stable 200. No partial sitemap on DB failure. |
| Live test only | `https://www.slockhub.com/compare/weiser-vs-schlage` | 301 to `/compare/schlage-vs-weiser`. |
| Live test only | `https://www.slockhub.com/compare/schlage-vs-weiser` | 200, self-canonical. |
| Live test only | `https://www.slockhub.com/brands/wrong-brand/yale-assure-lock-2-plus` | 404/noindex/no canonical. Do not request indexing. |
| Live test only | `https://www.slockhub.com/resources/glossary` | 200, self-canonical. |
| Live test only | `https://www.slockhub.com/resources/buying-guide` | 200, self-canonical. |

Stop if any of these return Cloudflare 503, unexpected 404, wrong canonical, or no redirect.

## Batch 1: High-Value Canonical Compare Pages

Purpose: preserve existing compare demand while consolidating non-canonical variants.

Submit canonical URLs only after Batch 0 passes and URL Inspection says the canonical URL is not indexed.

| Priority | URL | Performance signal | Non-canonical variant seen |
|---:|---|---|---|
| 1 | `https://www.slockhub.com/compare/nuki-vs-tedee` | 1360 grouped impressions, 24 grouped clicks | - |
| 2 | `https://www.slockhub.com/compare/schlage-vs-weiser` | 1231 grouped impressions, 4 grouped clicks | `https://www.slockhub.com/compare/weiser-vs-schlage` |
| 3 | `https://www.slockhub.com/compare/schlage-vs-defiant` | 966 grouped impressions, 1 grouped click | - |
| 4 | `https://www.slockhub.com/compare/kwikset-vs-defiant` | 607 grouped impressions, 5 grouped clicks | - |
| 5 | `https://www.slockhub.com/compare/kwikset-vs-weiser` | 580 grouped impressions, 1 grouped click | - |
| 6 | `https://www.slockhub.com/compare/veise-vs-schlage` | 550 grouped impressions, 14 grouped clicks | `https://www.slockhub.com/compare/schlage-vs-veise` |
| 7 | `https://www.slockhub.com/compare/yale-vs-hafele` | 435 grouped impressions, 6 grouped clicks | `https://www.slockhub.com/compare/hafele-vs-yale` |
| 8 | `https://www.slockhub.com/compare/lockly-vs-schlage` | 427 grouped impressions, 5 grouped clicks | `https://www.slockhub.com/compare/schlage-vs-lockly` |
| 9 | `https://www.slockhub.com/compare/yale-vs-nuki` | 403 grouped impressions, 2 grouped clicks | `https://www.slockhub.com/compare/nuki-vs-yale` |
| 10 | `https://www.slockhub.com/compare/kwikset-vs-brinks` | 400 grouped impressions, 4 grouped clicks | - |

## Batch 2: Non-Canonical Compare Consolidation Checks

Purpose: confirm that Google sees old/reverse compare URLs as permanent redirects, not indexable duplicates or 404s.

Use URL Inspection live test. Do not request indexing on the non-canonical source URL.

| Source URL | Expected canonical target |
|---|---|
| `https://www.slockhub.com/compare/weiser-vs-schlage` | `https://www.slockhub.com/compare/schlage-vs-weiser` |
| `https://www.slockhub.com/compare/schlage-vs-veise` | `https://www.slockhub.com/compare/veise-vs-schlage` |
| `https://www.slockhub.com/compare/hafele-vs-yale` | `https://www.slockhub.com/compare/yale-vs-hafele` |
| `https://www.slockhub.com/compare/schlage-vs-lockly` | `https://www.slockhub.com/compare/lockly-vs-schlage` |
| `https://www.slockhub.com/compare/nuki-vs-yale` | `https://www.slockhub.com/compare/yale-vs-nuki` |
| `https://www.slockhub.com/compare/switchbot-vs-nuki` | `https://www.slockhub.com/compare/nuki-vs-switchbot` |
| `https://www.slockhub.com/compare/august-vs-yale` | `https://www.slockhub.com/compare/yale-vs-august` |
| `https://www.slockhub.com/compare/schlage-vs-kwikset` | `https://www.slockhub.com/compare/kwikset-vs-schlage` |
| `https://www.slockhub.com/compare/nuki-vs-august` | `https://www.slockhub.com/compare/august-vs-nuki` |
| `https://www.slockhub.com/compare/yale-vs-aqara` | `https://www.slockhub.com/compare/aqara-vs-yale` |

## Batch 3: High-Exposure Non-Compare Pages

Purpose: protect useful pages with existing impressions across guides, best pages, calculators, products, and brands.

Submit only if Batch 0 passes and the URL is not already indexed in URL Inspection.

| Priority | URL | Template | Performance signal |
|---:|---|---|---|
| 1 | `https://www.slockhub.com/articles/guides/door-compatibility-guide` | article | 933 impressions, 0 clicks |
| 2 | `https://www.slockhub.com/best/matter-smart-locks` | best | 788 impressions, 4 clicks |
| 3 | `https://www.slockhub.com/best/z-wave-smart-locks` | best | 769 impressions, 0 clicks |
| 4 | `https://www.slockhub.com/brands/samsung/samsung-shp-dp609` | product | 616 impressions, 0 clicks |
| 5 | `https://www.slockhub.com/articles/security/smart-lock-security-complete-analysis` | article | 546 impressions, 0 clicks |
| 6 | `https://www.slockhub.com/best/homekit-smart-locks` | best | 501 impressions, 0 clicks |
| 7 | `https://www.slockhub.com/best/smart-locks-with-longest-battery-life` | best | 486 impressions, 2 clicks |
| 8 | `https://www.slockhub.com/calculators/installation-cost` | calculator | 464 impressions, 0 clicks |
| 9 | `https://www.slockhub.com/articles/protocols/connect-lock-to-homekit` | article | 436 impressions, 1 click |
| 10 | `https://www.slockhub.com/best/fingerprint-smart-locks` | best | 411 impressions, 1 click |

## Batch 4: Product And Brand Samples

Purpose: verify the product brand-slug fix and product-detail indexability across known exposed URLs.

| Priority | URL | Reason |
|---:|---|---|
| 1 | `https://www.slockhub.com/brands/samsung/samsung-shp-dp609` | Highest product exposure in performance export. |
| 2 | `https://www.slockhub.com/brands/nuki/nuki-smart-lock-pro-4` | Product detail sample with performance visibility. |
| 3 | `https://www.slockhub.com/brands/yale/yale-assure-lock-2-wifi` | Product detail sample with performance visibility. |
| 4 | `https://www.slockhub.com/brands/weiser/weiser-halo-touch` | Product detail sample with performance visibility. |
| 5 | `https://www.slockhub.com/brands/nuki/nuki-smart-lock-4` | Product detail sample with performance visibility. |

## Batch 5: Short Resource Quality Samples

Purpose: determine whether short resource pages are being excluded for quality/thin-content reasons before changing index policy.

Live inspect first. Request indexing only when the page is useful, canonical, 200, and not already indexed.

| URL | Word count | Performance signal | Reason |
|---|---|---|---|
| `https://www.slockhub.com/articles/resources/kwikset-vs-defiant-smart-locks` | 565 | 145 impressions, 0 clicks | Short resource with performance visibility. |
| `https://www.slockhub.com/articles/resources/wire-gauge-calculator-steps` | 494 | 87 impressions, 1 click | Short resource with performance visibility. |
| `https://www.slockhub.com/articles/resources/troubleshooting-z-wave-range` | 468 | 33 impressions, 0 clicks | Short resource with performance visibility. |
| `https://www.slockhub.com/articles/resources/fail-safe-vs-fail-secure` | 188 | 18 impressions, 0 clicks | Short resource with performance visibility. |
| `https://www.slockhub.com/articles/resources/lock-anatomy-glossary` | 257 | 7 impressions, 0 clicks | Short resource with performance visibility. |

## Do Not Submit In Bulk

Do not bulk-submit:

- All 1081 compare sitemap URLs.
- All 153 non-canonical compare variants found in the performance export.
- All 24 resource articles under 600 words.
- Any URL from the `Other 4xx`, `404`, robots-blocked, duplicate-canonical, or noindex buckets until the URL-level Page Indexing export identifies the exact URLs.

## Promotion Rules After URL-Level Export Exists

When the missing Page Indexing URL examples are exported:

1. Move exact `Other 4xx` and `404` URLs into a repair queue, not an indexing request queue.
2. Move exact duplicate canonical URLs into a canonical/redirect verification queue.
3. Move exact `Crawled - currently not indexed` URLs into quality review by page type.
4. Move exact `Discovered - currently not indexed` URLs into internal-link and sitemap-discovery review.
5. Request indexing only for repaired, canonical, high-value URLs that return 200 and show correct canonical metadata.
