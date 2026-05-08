# Cloudflare Workers Preview Runbook

Date: 2026-05-08

## Scope

Use this runbook for B1 preview validation only.

It keeps Turso as the active database and does not migrate data to D1.

## Prerequisites

- `.env.local` contains `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`.
- The project builds cleanly with `npm run build`.
- Wrangler and OpenNext dependencies are installed.

## Commands

```bash
npm run build
npm run cf:build
npx wrangler deploy --dry-run --outdir bundled
npm run preview
```

For local workerd smoke without the full OpenNext cache prefill, use Wrangler directly after `npm run cf:build`:

```bash
set -a
source .env.local
set +a
CI=1 ./node_modules/.bin/wrangler dev --port 3211 --inspector-port 0 --show-interactive-dev-session false
```

Notes:

- `opennextjs-cloudflare preview -- --port 3211` passes arguments through to Wrangler, but first populates the R2 incremental cache. With the current app it attempts 1849 local R2 cache objects and is slow enough that `wrangler dev` is the faster B1 smoke command.
- Do not commit `.dev.vars` with Turso secrets. Load local secrets from `.env.local` only in the shell process used to start preview.

## What to verify

- `wrangler deploy --dry-run --outdir bundled` produces `.open-next/worker.js` and `.open-next/assets`.
- `npm run preview` serves representative pages under `workerd`.
- The following routes load without regressions:
  - `/`
  - `/compare/yale-vs-august`
  - `/brands/yale/yale-assure-lock-2-plus`
  - `/best/homekit-smart-locks`
  - `/protocols/matter`
  - `/calculators/protocol-wizard`
  - `/api/health`
  - `/api/categories`

## Rollback

- Stop the Worker preview.
- Keep the legacy host as production.
- Do not disable Turso secrets during B1.

## Current B1 status

Status as of 2026-05-08:

- OpenNext and Wrangler dependencies are installed.
- `wrangler.jsonc` exists with Worker entry, assets directory, assets binding, R2 incremental cache binding, `nodejs_compat`, `global_fetch_strictly_public`, and observability enabled.
- `open-next.config.ts` exists using the Cloudflare adapter default R2 incremental cache override.
- `npm run build` passes with `1543/1543` static pages.
- `npm run cf:build` creates `.open-next/worker.js` and `.open-next/assets`.
- `npx wrangler deploy --dry-run --outdir bundled` passes. Latest dry-run bundle output:
  - total upload: `8917.09 KiB`;
  - gzip upload: `1454.32 KiB`;
  - bindings: `NEXT_INC_CACHE_R2_BUCKET`, `ASSETS`, `NEXT_RUNTIME`.
- `wrangler dev` starts local workerd preview at `http://localhost:3211`.
- Worker smoke currently passes 4/8 representative targets:
  - pass: `/`, `/protocols/matter`, `/calculators/protocol-wizard`, `/api/health`;
  - fail: `/compare/yale-vs-august`, `/brands/yale/yale-assure-lock-2-plus`, `/best/homekit-smart-locks`, `/api/categories`.
- The first B1 failure mode, native `libsql`/Neon import from `@libsql/client/node`, was removed by the B2 facade adjustment.
- The current B1 blocker is Turso runtime connectivity from local workerd via the web libSQL client:
  - Worker logs show repeated `Network connection lost.`;
  - DB-backed pages/API return HTTP 500 after retry delays.

B1 hosting build/dry-run is ready, but B1 runtime smoke is blocked for Turso-backed routes. The recommended next batch is B3/D1 adapter work rather than treating Turso as a stable Worker runtime dependency.
