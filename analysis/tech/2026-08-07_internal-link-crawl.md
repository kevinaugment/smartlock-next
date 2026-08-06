# 2026-08-07 Internal Link Crawl

## Method

- Source: local production render at `http://localhost:3011`.
- URL source: `sitemap.xml`, plus monitored target URLs when needed.
- Extraction: rendered HTML links inside `<main>`; header, footer, and scripts are excluded when a `<main>` element is present.
- Threshold: core and monitored pages should have at least 50 main-content internal inbounds from smart-lock-relevant page types.
- Caveat: `relevantInbound` is a source-type heuristic, not a Google metric. The large gains below are mostly crawl-recovery signals from shared `Research Hubs`; they are not proof that topical authority is fully resolved. GSC and production crawl data still need a 2-4 week retest.

## Crawl Summary

| Run | Sitemap URLs | Crawled URLs | Failures | Notes |
| --- | ---: | ---: | ---: | --- |
| Before shared architecture fix | 1575 | 1579 | 82 | Compare pages passed after Batch 2; several hub/content targets failed `>=50`. |
| After shared architecture fix | 1582 | 1582 | 3 | Shared `SeoPathways` research hubs and sitemap fallback are active. |

Remaining crawl failures after the first crawl were timeouts/aborts on `/brands/defiant`, `/compare/schlage-vs-tedee`, and `/brands/salto/salto-neoxx-g3`. A follow-up production-render HTTP check on `http://localhost:3012` returned 200 for all three URLs; the next full crawl should confirm they no longer fail.

After the comparison URL normalization fix, rendered `/sitemap.xml` returned 1575 URLs, 1081 compare URLs, and 0 duplicate unordered comparison pairs. Priority comparison URLs such as `/compare/kwikset-vs-schlage`, `/compare/tedee-vs-august`, `/compare/veise-vs-schlage`, `/compare/lockly-vs-schlage`, `/compare/aqara-vs-yale`, and `/compare/nuki-vs-switchbot` remained present, while the opposite directions were absent from the sitemap.

## Target Results

| Target | Before relevant inbound | After relevant inbound | Status |
| --- | ---: | ---: | --- |
| `/compare` | 1089 | 1108 | Pass |
| `/calculators` | 34 | 1504 | Pass for crawl recovery; topical relevance pending retest |
| `/protocols` | 7 | 1386 | Pass for crawl recovery; topical relevance pending retest |
| `/brands` | 1317 | 1398 | Pass |
| `/articles` | 127 | 128 | Pass |
| `/resources` | 4 | 1481 | Pass for crawl recovery; topical relevance pending retest |
| `/articles/guides/door-compatibility-guide` | 102 | 1479 | Pass |
| `/articles/security/smart-lock-security-complete-analysis` | 11 | 1478 | Pass for crawl recovery; topical relevance pending retest |
| `/compare/schlage-vs-weiser` | 98 | 100 | Pass |
| `/compare/schlage-vs-defiant` | 96 | 97 | Pass |
| `/compare/kwikset-vs-defiant` | 96 | 99 | Pass |
| `/compare/nuki-vs-tedee` | 94 | 96 | Pass |
| `/compare/kwikset-vs-schlage` | 97 | 98 | Pass |
| `/compare/samsung-vs-xiaomi` | 97 | 99 | Pass |
| `/compare/tedee-vs-august` | 94 | 96 | Pass |
| `/compare/veise-vs-schlage` | 98 | 100 | Pass |
| `/compare/lockly-vs-schlage` | 97 | 99 | Pass |
| `/compare/eufy-vs-simplisafe` | 100 | 101 | Pass |
| `/best/matter-smart-locks` | 1133 | 1154 | Pass |
| `/best/z-wave-smart-locks` | 59 | 65 | Pass |
| `/best/homekit-smart-locks` | 1093 | 1112 | Pass |
| `/best/smart-locks-with-longest-battery-life` | 23 | 1476 | Pass for crawl recovery; topical relevance pending retest |

## What Changed

- Added shared `priority-pages` SEO registry for:
  - core hub links,
  - protocol pages,
  - published priority `best` pages,
  - strategic research hub links.
- Expanded `SeoPathways` with a `Research Hubs` block that links to calculators, protocols, resources, security analysis, longest-battery-life picks, and the door compatibility guide.
- Reused the shared registry in the human sitemap instead of maintaining separate hardcoded best/protocol/core-hub lists.
- Updated XML sitemap generation to use shared calculator slugs, static fallback URLs for priority comparisons, priority brands, priority best pages, and protocol pages, and one canonical internal URL per unordered brand-comparison pair.
- Added sitemap de-duplication so DB-backed URLs can still override fallback entries when available.

## Verification Signals

- `/compare/lockly-vs-schlage`, `/compare/eufy-vs-simplisafe`, `/compare/kaadas-vs-latch`, `/best/smart-locks-with-longest-battery-life`, and `/articles/security/smart-lock-security-complete-analysis` render the new `Research Hubs` links.
- `/sitemap.xml` includes `/calculators`, `/resources`, protocol URLs, priority comparison URLs, and priority best-page URLs, without exposing duplicate comparison directions for priority pairs.
- Priority comparison pages checked after the fix do not link to their opposite-direction duplicate URLs from rendered `href` attributes.
- No protected canonical, redirect, or existing structured-data fields were intentionally changed.

## Retest

- First recrawl/GSC check: 2026-08-21.
- Second GSC trend check: 2026-09-04.
- If target pages remain below expectations after recrawl, route back to the technical SEO diagnosis flow with rendered crawl output, GSC coverage, affected URL/query list, and a narrower topic-specific internal-link map.
