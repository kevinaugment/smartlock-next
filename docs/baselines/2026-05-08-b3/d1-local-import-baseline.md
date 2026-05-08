# B3 D1 Local Import Baseline

Date: 2026-05-08

## Scope

This baseline validates the B0 Turso export against a local Wrangler D1 database bound as `env.DB`.

Remote Cloudflare D1 creation/import was not executed in this batch because the current non-interactive shell does not have `CLOUDFLARE_API_TOKEN`.

## Source

- Source export: `.baseline-artifacts/2026-05-08-b0/turso-export.sql`
- D1 import file: `.baseline-artifacts/2026-05-08-b3/d1-import-ordered.sql`
- Import report: `.baseline-artifacts/2026-05-08-b3/d1-import-order-report.json`

The raw Turso export failed direct local D1 import with:

```text
FOREIGN KEY constraint failed: SQLITE_CONSTRAINT
```

Root cause: the export inserts some join/dependent tables before parent rows. The B3 import file keeps the same data but orders insert statements by foreign-key dependency so D1 can validate constraints during import.

## Import Shape

| Metric | Value |
|---|---:|
| Source SQL bytes | 770796 |
| Source statements | 1837 |
| D1 import statements | 1836 |
| Tables created | 24 |
| Insert statements | 1756 |
| Indexes created | 53 |
| Max statement size | 4297 bytes |

The max statement size is below the B3 100 KB quality gate.

## Count Comparison

| Table | B0 source count | Local D1 count | Status |
|---|---:|---:|---|
| `brands` | 47 | 47 | match |
| `products` | 246 | 246 | match |
| `calculators` | 17 | 17 | match |
| `top_n_pages` | 20 | 20 | match |
| `report_leads` | 2 | 2 before write smoke, 3 after write smoke | match plus verified write |
| `product_ratings` | 0 | 0 | match |
| `tool_ratings` | 1 | 1 | match |

## Representative Rows

Verified through local D1:

- `brands.slug = 'yale'`
- `products.slug = 'yale-assure-lock-2-plus'`
- `top_n_pages.slug = 'homekit-smart-locks'`
- calculator content uses `protocol-selection-wizard`; the route smoke path remains `/calculators/protocol-wizard`.

## Worker Smoke

`docs/baselines/2026-05-08-b3/d1-worker-smoke.md` records 9/9 passing Worker requests against local D1:

- `/`
- `/compare/yale-vs-august`
- `/brands/yale/yale-assure-lock-2-plus`
- `/best/homekit-smart-locks`
- `/protocols/matter`
- `/calculators/protocol-wizard`
- `/api/health`
- `/api/categories`
- `POST /api/reports/download`

The report download write returned `X-Lead-Stored: 1`, a valid `%PDF-1.4` response, and `report_leads` increased from 2 to 3.
