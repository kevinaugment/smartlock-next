# Indexing Deployment And GSC Runbook

Use this after indexing-related changes land on `main`.

## Deployment Gate

The GitHub Actions deploy job requires these repository secrets:

- `CLOUDFLARE_API_TOKEN`: token with access to deploy the `smartlock-next` Cloudflare Pages project.
- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account id used by the production Pages project.

Static generation uses the checked-in `database/d1-import-ordered.sql` seed.

The deploy must generate the static `out/` directory and publish it with `wrangler pages deploy out`. It must not build or deploy `.open-next/worker.js`, and production must not depend on Worker, API, D1, KV, or remote database runtime reads.

## Production Smoke

Run these after a successful deploy:

```bash
curl -I https://www.slockhub.com/compare/weiser-vs-schlage
curl -I https://www.slockhub.com/compare/schlage-vs-weiser
curl -I https://www.slockhub.com/brands/wrong-brand/yale-assure-lock-2-plus
curl -I https://www.slockhub.com/protocols/wifi
curl -sS https://www.slockhub.com/sitemap.xml | node -e "let s='';process.stdin.on('data',d=>s+=d);process.stdin.on('end',()=>console.log({bytes:s.length, urls:(s.match(/<url>/g)||[]).length, compare:(s.match(/<loc>https:\\/\\/www\\.slockhub\\.com\\/compare\\//g)||[]).length, fakeLastmod:(s.match(/<lastmod>2026-08-13<\\/lastmod>/g)||[]).length}))"
```

Expected:

- `/compare/weiser-vs-schlage`: `301` to `/compare/schlage-vs-weiser`.
- `/compare/schlage-vs-weiser`: `200`.
- `/brands/wrong-brand/yale-assure-lock-2-plus`: `404`, no canonical, noindex in HTML.
- `/protocols/wifi`: stable `200`.
- `/sitemap.xml`: stable XML response with the expected URL count, canonical compare URLs, and no fake build-date `lastmod`.

If static sitemap generation fails during build, fix the build-time data issue before deployment. Do not publish a partial sitemap.

## GSC URL Detail Export

The current local Coverage export is aggregate-only. Before changing index policy or bulk-submitting URLs, export URL-level examples from Search Console Page Indexing for:

- Crawled - currently not indexed
- Discovered - currently not indexed
- Other 4xx
- Not found (404)
- Duplicate, Google chose different canonical
- Blocked by robots.txt
- Excluded by noindex

Save the exports under:

`/Users/luokun/Downloads/https___www.slockhub.com_-Coverage-2026-08-13-url-details/`

Minimum useful columns:

- URL
- Issue / reason
- Source
- Validation status
- Last crawled, if available
- User-declared canonical, if available
- Google-selected canonical, if available

## URL Inspection Submission

Use:

- `analysis/gsc/2026-08-13_url-evidence-ledger.md`
- `analysis/gsc/2026-08-13_url-inspection-priority.md`

Do not bulk-submit all compare long-tail URLs. Start with Batch 0 live tests, then submit only canonical high-value URLs that return `200`, have correct canonical metadata, and are not already indexed.

## When URL-Level Page Indexing Files Arrive

Place the exported CSV files in:

`/Users/luokun/Downloads/https___www.slockhub.com_-Coverage-2026-08-13-url-details/`

Then generate the working queue:

```bash
node scripts/generate-gsc-page-indexing-queues.mjs \
  --details-dir /Users/luokun/Downloads/https___www.slockhub.com_-Coverage-2026-08-13-url-details/ \
  --performance-csv /Users/luokun/Downloads/https___www.slockhub.com_-Performance-on-Search-2026-08-06/网页.csv \
  --output analysis/gsc/2026-08-13_page-indexing-url-queues.md
```

That output is the queue input for URL Inspection and repair prioritization. It should not be treated as proof of indexing; it only organizes the URL-level Page Indexing rows that you export from Search Console.
