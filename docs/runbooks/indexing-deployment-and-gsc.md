# Indexing Deployment And GSC Runbook

Use this after indexing-related changes land on `main`.

## Deployment Gate

The GitHub Actions deploy job requires these repository secrets:

- `CLOUDFLARE_API_TOKEN`: token with access to the Cloudflare account that owns the `smartlock-next` Worker.
- `CLOUDFLARE_ACCOUNT_ID`: the account id used by the production Worker.
- `CF_KV_NAMESPACE_ID`: the production `slockhub` KV namespace id used by the `SLOCKHUB_KV` binding.

The 2026-08-13 deploy run failed because all three values were empty in Actions. Local Wrangler also failed because the logged-in OAuth account did not have access to the target account used by `wrangler.jsonc`.

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

If sitemap DB generation fails, the Worker should return the KV last-known-good sitemap from `seo:sitemap:last-known-good:v1`. If there is no cached sitemap, it should fail closed rather than return a partial sitemap.

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
