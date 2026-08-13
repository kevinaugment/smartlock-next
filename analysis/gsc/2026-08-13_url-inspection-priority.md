# SLockHub URL Inspection Priority Queue

- Date: 2026-08-13
- Rule: submit a small number of high-value and diagnostic URLs only. Do not bulk-submit all compare long-tail URLs.
- Evidence base: local source review, Coverage aggregate counts, and 2026-08-06 GSC Performance URL rows.

## Batch 0: Deployment And Technical Verification

Purpose: verify that the deployed Cloudflare Worker is running the local fixes before requesting indexing.

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

Submit canonical URLs only after Batch 0 passes.

| Priority | URL | Performance signal |
|---:|---|---|
| 1 | `https://www.slockhub.com/compare/nuki-vs-tedee` | 1360 impressions, 24 clicks |
| 2 | `https://www.slockhub.com/compare/schlage-vs-weiser` | 1231 grouped impressions, 4 grouped clicks |
| 3 | `https://www.slockhub.com/compare/defiant-vs-schlage` | 966 grouped impressions, 1 grouped click |
| 4 | `https://www.slockhub.com/compare/defiant-vs-kwikset` | 607 grouped impressions, 5 grouped clicks |
| 5 | `https://www.slockhub.com/compare/kwikset-vs-weiser` | 580 impressions, 1 click |
| 6 | `https://www.slockhub.com/compare/schlage-vs-veise` | 550 grouped impressions, 14 grouped clicks |
| 7 | `https://www.slockhub.com/compare/hafele-vs-yale` | 435 grouped impressions, 6 grouped clicks |
| 8 | `https://www.slockhub.com/compare/lockly-vs-schlage` | 427 grouped impressions, 5 grouped clicks |
| 9 | `https://www.slockhub.com/compare/nuki-vs-yale` | 403 grouped impressions, 2 grouped clicks |
| 10 | `https://www.slockhub.com/compare/brinks-vs-kwikset` | 400 grouped impressions, 4 grouped clicks |

## Batch 2: Non-Canonical Compare Consolidation Checks

Purpose: confirm that Google sees old/reverse compare URLs as permanent redirects, not indexable duplicates or 404s.

Use URL Inspection live test. Do not request indexing on the non-canonical source URL.

| Source URL | Expected canonical target |
|---|---|
| `https://www.slockhub.com/compare/weiser-vs-schlage` | `https://www.slockhub.com/compare/schlage-vs-weiser` |
| `https://www.slockhub.com/compare/schlage-vs-defiant` | `https://www.slockhub.com/compare/defiant-vs-schlage` |
| `https://www.slockhub.com/compare/kwikset-vs-defiant` | `https://www.slockhub.com/compare/defiant-vs-kwikset` |
| `https://www.slockhub.com/compare/veise-vs-schlage` | `https://www.slockhub.com/compare/schlage-vs-veise` |
| `https://www.slockhub.com/compare/yale-vs-hafele` | `https://www.slockhub.com/compare/hafele-vs-yale` |
| `https://www.slockhub.com/compare/schlage-vs-lockly` | `https://www.slockhub.com/compare/lockly-vs-schlage` |
| `https://www.slockhub.com/compare/yale-vs-nuki` | `https://www.slockhub.com/compare/nuki-vs-yale` |
| `https://www.slockhub.com/compare/kwikset-vs-brinks` | `https://www.slockhub.com/compare/brinks-vs-kwikset` |
| `https://www.slockhub.com/compare/lockly-vs-eufy` | `https://www.slockhub.com/compare/eufy-vs-lockly` |
| `https://www.slockhub.com/compare/switchbot-vs-nuki` | `https://www.slockhub.com/compare/nuki-vs-switchbot` |

## Batch 3: High-Exposure Non-Compare Pages

Purpose: protect useful pages with existing impressions across guides, best pages, calculators, products, and brands.

Submit only if Batch 0 passes and the URL is not already indexed in URL Inspection.

| Priority | URL | Performance signal |
|---:|---|---|
| 1 | `https://www.slockhub.com/articles/guides/door-compatibility-guide` | 933 impressions |
| 2 | `https://www.slockhub.com/best/matter-smart-locks` | 788 impressions, 4 clicks |
| 3 | `https://www.slockhub.com/best/z-wave-smart-locks` | 769 impressions |
| 4 | `https://www.slockhub.com/brands/samsung/samsung-shp-dp609` | 616 impressions |
| 5 | `https://www.slockhub.com/articles/security/smart-lock-security-complete-analysis` | 546 impressions |
| 6 | `https://www.slockhub.com/best/homekit-smart-locks` | 501 impressions |
| 7 | `https://www.slockhub.com/best/smart-locks-with-longest-battery-life` | 486 impressions, 2 clicks |
| 8 | `https://www.slockhub.com/calculators/installation-cost` | 464 impressions |
| 9 | `https://www.slockhub.com/articles/protocols/connect-lock-to-homekit` | 436 impressions, 1 click |
| 10 | `https://www.slockhub.com/best/fingerprint-smart-locks` | 411 impressions, 1 click |

## Batch 4: Product And Brand Samples

Purpose: verify the product brand-slug fix and product-detail indexability across known exposed URLs.

| Priority | URL | Reason |
|---:|---|---|
| 1 | `https://www.slockhub.com/brands/samsung/samsung-shp-dp609` | Highest product exposure in performance export. |
| 2 | `https://www.slockhub.com/brands/nuki/nuki-smart-lock-pro-4` | High product exposure and non-US retrofit demand. |
| 3 | `https://www.slockhub.com/brands/yale/yale-assure-lock-2-wifi` | High brand/product relevance and canonical brand validation. |
| 4 | `https://www.slockhub.com/brands/weiser/weiser-halo-touch` | Compare cluster support and Canada/Weiser demand. |
| 5 | `https://www.slockhub.com/brands/schlage` | Brand hub sample for compare/product pathways. |

## Batch 5: Short Resource Quality Samples

Purpose: determine whether short resource pages are being excluded for quality/thin-content reasons before changing index policy.

Live inspect first. Request indexing only when the page is useful, canonical, 200, and not already indexed.

| URL | Word count | Reason |
|---|---:|---|
| `https://www.slockhub.com/articles/resources/edge-vs-cloud-guide` | 171 | Very short resource sample. |
| `https://www.slockhub.com/articles/resources/capex-opex-access-control` | 174 | Very short resource sample. |
| `https://www.slockhub.com/articles/resources/network-hops-glossary` | 176 | Glossary-style short resource. |
| `https://www.slockhub.com/articles/resources/credential-rotation-guide` | 188 | Access/security resource. |
| `https://www.slockhub.com/articles/resources/kwikset-vs-defiant-smart-locks` | 565 | Short resource with performance visibility. |

## Do Not Submit In Bulk

Do not bulk-submit:

- All 1081 compare sitemap URLs.
- All 292 non-canonical compare variants found in the 2026-08-06 performance export.
- All 24 resource articles under 600 words.
- Any URL from the `Other 4xx`, `404`, robots-blocked, duplicate-canonical, or noindex buckets until the URL-level Page Indexing export identifies the exact URLs.

## Promotion Rules After URL-Level Export Exists

When the missing Page Indexing URL examples are exported:

1. Move exact `Other 4xx` and `404` URLs into a repair queue, not an indexing request queue.
2. Move exact duplicate canonical URLs into a canonical/redirect verification queue.
3. Move exact `Crawled - currently not indexed` URLs into quality review by page type.
4. Move exact `Discovered - currently not indexed` URLs into internal-link and sitemap-discovery review.
5. Request indexing only for repaired, canonical, high-value URLs that return 200 and show correct canonical metadata.
