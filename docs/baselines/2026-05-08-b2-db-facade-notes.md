# B2 DB Facade Notes

Date: 2026-05-08

## GitNexus Impact

Before editing `lib/db.ts`, impact analysis was run on the exported DB symbols.

| Symbol | Risk | Direct callers | Affected processes |
|---|---:|---:|---:|
| `getTursoClient` | CRITICAL | 3 | 8 |
| `query` | CRITICAL | 4 | 6 |
| `queryOne` | HIGH | 4 | 4 |
| `execute` | CRITICAL | 3 | 7 |
| `batch` | LOW | 0 | 0 |

Affected high-value surfaces include:

- `app/api/ratings/route.ts`
- `app/api/reports/download/route.ts`
- `app/api/categories/route.ts`
- `app/api/calculators/[slug]/route.ts`
- `app/status/page.tsx`
- `lib/services/rating-service.ts`

## B2 Constraint

Because `query` and `execute` are CRITICAL risk shared symbols, B2 must preserve the existing public API and Turso behavior while removing the static `@libsql/client` dependency from the Worker bundle path.

## Implemented Adjustment

`lib/db.ts` now dynamically imports `@libsql/client` instead of statically importing the package or forcing `@libsql/client/node`.

Rationale:

- Static imports make OpenNext bundle DB code into routes that do not need it.
- Forcing `@libsql/client/node` pulls native `libsql`/Neon bindings into workerd and fails in local Workers preview.
- Importing the package root lets runtime export conditions choose the web/workerd implementation for Workers and the node implementation where appropriate.

The exported facade shape remains unchanged:

- `getTursoClient`
- `query`
- `queryOne`
- `execute`
- `batch`
- default `db`

The stale second adapter `lib/db/client.ts` has been removed. All active DB consumers now route through the canonical `@/lib/db` facade.

## Verification Notes

- `npm run test:db-facade` passes.
- `npm run cf:build` passes and preserves `1543/1543` generated pages.
- Wrangler local preview no longer fails with `Neon: unsupported macOS architecture`.
- Turso-backed routes still fail under local workerd with `Network connection lost`, so D1 binding work remains required before B1 runtime smoke can pass.

## B3 Adapter Extension

The facade now contains the first D1 runtime branch:

- It reads `getCloudflareContext().env.DB` through the OpenNext Cloudflare runtime context.
- It uses D1 for `query`, `queryOne`, `execute`, and `batch` when the binding exists.
- It falls back to Turso when the D1 binding is absent.
- Test injection uses a private global symbol and does not export a test-only setter from the production facade.
- Report lead persistence now uses the canonical facade and no longer checks Turso-specific env vars before writing.

`tests/db-facade.test.ts` verifies the fake D1 path for:

- result rows from `query`;
- first-row behavior through `queryOne`;
- change counts from `execute`;
- one result per statement from `batch`.

It also guards against:

- static `@libsql/client` imports;
- forced `@libsql/client/node` imports;
- `process.env.DB` binding lookup;
- restoring stale `lib/db/client.ts`;
- exporting test-only hooks from `lib/db.ts`;
- reintroducing Turso-specific report lead persistence gates.

This does not complete D1 migration. It only establishes the runtime adapter boundary needed for the next D1 schema/import smoke.
