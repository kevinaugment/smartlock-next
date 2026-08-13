# SLockHub GSC URL Evidence Ledger

- Date: 2026-08-13
- Domain: `https://www.slockhub.com`
- Purpose: separate URL-level evidence from aggregate-only Search Console exports before indexing actions.

## Available Local Exports

| Source | Path | URL-level? | Use |
|---|---|---:|---|
| Page Indexing / Coverage export | `/Users/luokun/Downloads/https___www.slockhub.com_-Coverage-2026-08-13/` | No | Aggregate issue counts and trend only. Do not use for page-level submit/noindex decisions. |
| Performance export | `/Users/luokun/Downloads/https___www.slockhub.com_-Performance-on-Search-2026-08-06/网页.csv` | Yes | URL-level impressions/clicks/rank. Useful for prioritizing inspection, not for proving indexing status. |
| Older Performance exports | `/Users/luokun/Downloads/https___www.slockhub.com_-Performance-on-Search-2026-02-15/`, `/Users/luokun/Downloads/https___www.slockhub.com_-Performance-on-Search-2026-03-05/`, `/Users/luokun/Downloads/https___www.slockhub.com_-Performance-on-Search-2026-05-08.*` | Yes | Historical performance context. Not a substitute for Page Indexing URL examples. |

## Missing Evidence

The required GSC Page Indexing URL examples are not present in the local export folder. The current Coverage files contain only these columns:

- `严重问题.csv`: `原因,来源,验证,网页`
- `非严重问题.csv`: `原因,来源,验证,网页`
- `图表.csv`: `日期,未编入索引,已编入索引,展示`
- `元数据.csv`: `资源,值`

This means the project still lacks URL-level rows for:

- Crawled - currently not indexed: 274 URLs
- Discovered - currently not indexed: 217 URLs
- Other 4xx: 171 URLs
- Not found (404): 60 URLs
- Duplicate, Google chose different canonical: 4 URLs
- Blocked by robots.txt: 3 URLs
- Excluded by noindex: 1 URL

## What This Allows

Allowed now:

- Prioritize URL Inspection using performance rows and source-code risk.
- Verify deployed technical fixes on representative URLs.
- Submit a small number of high-value canonical URLs after live checks pass.
- Inspect historical non-canonical compare URLs to confirm they now consolidate by 301.

Not allowed yet:

- Bulk request indexing for all compare URLs.
- Bulk noindex or sitemap-removal decisions based only on aggregate Coverage counts.
- Treat performance rows as proof that a URL is currently indexed.
- Assume the 171 `Other 4xx` rows are all fixed without URL examples.

## Local URL Signals From Performance Export

From `/Users/luokun/Downloads/https___www.slockhub.com_-Performance-on-Search-2026-08-06/网页.csv`:

- 1000 exported URL rows.
- 648 rows are `/compare/` URLs.
- 292 compare rows are non-canonical direction variants relative to the current canonical comparison ordering.
- The strongest non-compare URL signals are high-value guides, best pages, calculators, products, and brand pages.

Top canonical compare groups by impressions:

| Impressions | Clicks | Canonical URL | Non-canonical variant seen |
|---:|---:|---|---|
| 1360 | 24 | `https://www.slockhub.com/compare/nuki-vs-tedee` | - |
| 1231 | 4 | `https://www.slockhub.com/compare/schlage-vs-weiser` | `https://www.slockhub.com/compare/weiser-vs-schlage` |
| 966 | 1 | `https://www.slockhub.com/compare/defiant-vs-schlage` | `https://www.slockhub.com/compare/schlage-vs-defiant` |
| 607 | 5 | `https://www.slockhub.com/compare/defiant-vs-kwikset` | `https://www.slockhub.com/compare/kwikset-vs-defiant` |
| 580 | 1 | `https://www.slockhub.com/compare/kwikset-vs-weiser` | - |
| 550 | 14 | `https://www.slockhub.com/compare/schlage-vs-veise` | `https://www.slockhub.com/compare/veise-vs-schlage` |
| 435 | 6 | `https://www.slockhub.com/compare/hafele-vs-yale` | `https://www.slockhub.com/compare/yale-vs-hafele` |
| 427 | 5 | `https://www.slockhub.com/compare/lockly-vs-schlage` | `https://www.slockhub.com/compare/schlage-vs-lockly` |
| 403 | 2 | `https://www.slockhub.com/compare/nuki-vs-yale` | `https://www.slockhub.com/compare/yale-vs-nuki` |
| 400 | 4 | `https://www.slockhub.com/compare/brinks-vs-kwikset` | `https://www.slockhub.com/compare/kwikset-vs-brinks` |

Top non-compare URLs by impressions:

| Impressions | Clicks | URL |
|---:|---:|---|
| 933 | 0 | `https://www.slockhub.com/articles/guides/door-compatibility-guide` |
| 788 | 4 | `https://www.slockhub.com/best/matter-smart-locks` |
| 769 | 0 | `https://www.slockhub.com/best/z-wave-smart-locks` |
| 616 | 0 | `https://www.slockhub.com/brands/samsung/samsung-shp-dp609` |
| 546 | 0 | `https://www.slockhub.com/articles/security/smart-lock-security-complete-analysis` |
| 501 | 0 | `https://www.slockhub.com/best/homekit-smart-locks` |
| 486 | 2 | `https://www.slockhub.com/best/smart-locks-with-longest-battery-life` |
| 464 | 0 | `https://www.slockhub.com/calculators/installation-cost` |
| 436 | 1 | `https://www.slockhub.com/articles/protocols/connect-lock-to-homekit` |
| 411 | 1 | `https://www.slockhub.com/best/fingerprint-smart-locks` |

## Source-Code Quality Signals

Article registry:

- Total articles: 119.
- Resource articles: 45.
- Resource articles under 600 words: 24.
- All articles under 600 words: 53.

The short-resource cluster is a likely quality/indexing bucket, but there is no URL-level Page Indexing export proving which of these URLs are in `Crawled - currently not indexed` or `Discovered - currently not indexed`.

## Required Export Next

Export URL examples from Search Console Page Indexing for each issue state above. Save them under:

`/Users/luokun/Downloads/https___www.slockhub.com_-Coverage-2026-08-13-url-details/`

Minimum useful columns:

- URL
- Issue / reason
- Source
- Validation status
- Last crawled, if available
- User-declared canonical, if available
- Google-selected canonical, if available

After this export exists, regenerate the inspection queue from actual issue rows instead of relying on performance-priority sampling.
