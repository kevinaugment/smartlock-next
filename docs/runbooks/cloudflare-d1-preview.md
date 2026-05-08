# Cloudflare D1 Preview Runbook

Date: 2026-05-08

## Scope

Use this runbook for B3 D1 preview validation.

This batch introduces the D1 runtime binding path behind the existing `lib/db.ts` facade. It does not cut production traffic to Workers and does not remove Turso fallback.

## Current Adapter Behavior

The canonical DB facade now checks for a Cloudflare `DB` binding through OpenNext's runtime context.

Priority:

1. Use `getCloudflareContext().env.DB` when available.
2. Fall back to Turso when no D1 binding is available.

The public facade API remains:

- `query`
- `queryOne`
- `execute`
- `batch`
- `getTursoClient`

## Current Validation Status

Status as of 2026-05-08:

- `npm run test:db-facade` passes with fake D1 coverage.
- `npm run build` passes with `1543/1543` static pages.
- `npm run cf:build` passes.
- `wrangler deploy --dry-run --outdir bundled` passes and reports the `env.DB` D1 binding.
- Dry-run bundle size: `8896.39 KiB` total upload, `1447.40 KiB` gzip upload.
- Local D1 import is complete using `.baseline-artifacts/2026-05-08-b3/d1-import-ordered.sql`.
- Local Worker D1 smoke passes 9/9 targets; see `docs/baselines/2026-05-08-b3/d1-worker-smoke.md`.
- Remote preview D1 creation/import is not complete because the current non-interactive shell does not have `CLOUDFLARE_API_TOKEN`.

## Create Preview D1

Create the preview database manually or through Wrangler:

```bash
npx wrangler d1 create smartlock-next-preview
```

Then replace `REPLACE_WITH_PREVIEW_D1_DATABASE_ID` in `wrangler.jsonc` with the returned database id.

Do not commit production database ids or secrets before the environment ownership is agreed.

## Apply Schema

Preview/local first:

```bash
npx wrangler d1 execute smartlock-next-preview --local --file database/schema.sql
npx wrangler d1 execute smartlock-next-preview --local --file database/migrations/brands-system.sql
npx wrangler d1 execute smartlock-next-preview --local --file database/migrations/brand-model-system.sql
npx wrangler d1 execute smartlock-next-preview --local --file database/migrations/product-ratings.sql
npx wrangler d1 execute smartlock-next-preview --local --file database/migrations/tool-ratings.sql
npx wrangler d1 execute smartlock-next-preview --local --file database/migrations/calculator-content-system.sql
npx wrangler d1 execute smartlock-next-preview --local --file database/migrations/report-leads.sql
```

Remote preview after local validation:

```bash
npx wrangler d1 execute smartlock-next-preview --remote --file database/schema.sql
```

Apply remote migrations only after local import/count checks pass.

## Data Import Gate

Use B0 as the source of truth:

- `brands`: 47
- `products`: 246
- `calculators`: 17
- `top_n_pages`: 20
- `report_leads`: 2
- `product_ratings`: 0
- `tool_ratings`: 1

Before importing remote preview data, confirm:

- SQL statements are chunked below D1 limits.
- Bound parameters do not exceed 100 per query.
- Import order preserves foreign keys.
- The `calculator_protocol_wizard` API empty dataset observed in B0 is understood before treating it as a D1 regression.

The raw B0 Turso export failed direct local D1 import with `FOREIGN KEY constraint failed` because insert order did not preserve parent/dependent table relationships. Use the B3 generated import file for D1 preview import:

```bash
./node_modules/.bin/wrangler d1 execute smartlock-next-preview --local --file .baseline-artifacts/2026-05-08-b3/d1-import-ordered.sql
```

For remote preview after the database id is known:

```bash
./node_modules/.bin/wrangler d1 execute smartlock-next-preview --remote --file .baseline-artifacts/2026-05-08-b3/d1-import-ordered.sql
```

B3 import shape:

- 24 tables;
- 1756 insert statements;
- 53 indexes;
- max statement size 4297 bytes.

## Smoke Checklist

After D1 local binding is populated:

```bash
set -a
source .env.local
set +a
CI=1 ./node_modules/.bin/wrangler dev --port 3211 --inspector-port 0 --show-interactive-dev-session false
node .baseline-artifacts/2026-05-08-b1/collect-worker-smoke.mjs
```

Expected first D1 milestone:

- `/api/categories` returns HTTP 200 from D1.
- `/compare/yale-vs-august` returns HTTP 200 from D1-backed data.
- `/brands/yale/yale-assure-lock-2-plus` returns HTTP 200 from D1-backed data.
- `/best/homekit-smart-locks` returns HTTP 200 from D1-backed data.

## Rollback

- Leave Turso secrets configured.
- Remove or unset the `DB` binding from preview if D1 smoke fails.
- Re-run B1 smoke to confirm non-DB static Worker routes still work.
