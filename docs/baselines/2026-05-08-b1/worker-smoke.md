# B1 Cloudflare Workers Preview Smoke

Date: 2026-05-08

Base URL: `http://localhost:3211`

Runtime: Wrangler local workerd preview using `.open-next/worker.js`.

Raw responses are stored under ignored `.baseline-artifacts/2026-05-08-b1/worker-smoke/`.

## Context

This smoke was run after replacing the forced `@libsql/client/node` import with a dynamic `@libsql/client` import in `lib/db.ts`.

The earlier native `libsql` failure changed from:

- `Neon: unsupported macOS architecture`

to the current runtime/database failure:

- `Network connection lost.`

That means the Worker bundle no longer pulls the native Node libSQL path, but Turso-backed database routes still do not meet the B1 workerd runtime gate.

## Summary

| Target | Status | Bytes | SHA-256 | Raw output |
|---|---:|---:|---|---|
| `/` | 200 | 74381 | `62dc123ddecadcb0...` | `.baseline-artifacts/2026-05-08-b1/worker-smoke/home.html` |
| `/compare/yale-vs-august` | 500 | 2105 | `26a4a34ef094c1ea...` | `.baseline-artifacts/2026-05-08-b1/worker-smoke/compare-yale-vs-august.html` |
| `/brands/yale/yale-assure-lock-2-plus` | 500 | 2105 | `26a4a34ef094c1ea...` | `.baseline-artifacts/2026-05-08-b1/worker-smoke/brand-product-yale-assure-lock-2-plus.html` |
| `/best/homekit-smart-locks` | 500 | 2105 | `26a4a34ef094c1ea...` | `.baseline-artifacts/2026-05-08-b1/worker-smoke/best-homekit-smart-locks.html` |
| `/protocols/matter` | 200 | 88872 | `d008952231183d39...` | `.baseline-artifacts/2026-05-08-b1/worker-smoke/protocol-matter.html` |
| `/calculators/protocol-wizard` | 200 | 124421 | `d452113e709dc1c1...` | `.baseline-artifacts/2026-05-08-b1/worker-smoke/calculator-protocol-wizard.html` |
| `/api/health` | 200 | 102 | `a2e86f92af9562ef...` | `.baseline-artifacts/2026-05-08-b1/worker-smoke/api-health.json` |
| `/api/categories` | 500 | 117 | `a26e089b535aa9fd...` | `.baseline-artifacts/2026-05-08-b1/worker-smoke/api-categories.json` |

## HTML Signals

| Path | Title | Canonical | H1 |
|---|---|---|---|
| `/` | SLockHub | Smart Lock Guides, Calculators, Brands &amp; Protocols | https://www.slockhub.com | Smart LockEngineering Hub |
| `/compare/yale-vs-august` | 500: Internal Server Error | n/a | 500 |
| `/brands/yale/yale-assure-lock-2-plus` | 500: Internal Server Error | n/a | 500 |
| `/best/homekit-smart-locks` | 500: Internal Server Error | n/a | 500 |
| `/protocols/matter` | Matter Smart Locks: Compatible Products &amp; Guide 2026 — SLockHub.com | https://www.slockhub.com/protocols/matter | Matter Smart Locks |
| `/calculators/protocol-wizard` | Smart Lock Protocol Wizard | Zigbee vs Z-Wave vs Wi-Fi Selector | https://www.slockhub.com/calculators/protocol-wizard | Smart Lock Protocol Selection Wizard |

## API Signals

| Path | JSON valid | Top-level keys | Array lengths | Error |
|---|---:|---|---|---|
| `/api/health` | yes | `service, status, timestamp, version` | `{}` |  |
| `/api/categories` | yes | `details, error, stack` | `{}` | Failed to fetch categories |

## Result

- Passed targets: 4/8
- Failed targets: 4
- Failures: `/compare/yale-vs-august` (500), `/brands/yale/yale-assure-lock-2-plus` (500), `/best/homekit-smart-locks` (500), `/api/categories` (500)

## Decision

B1 should not proceed to production Worker routing while Turso-backed database routes return 500 under workerd.

Next execution batch should move the runtime DB path to Cloudflare D1 bindings for read routes first, then re-run this same smoke checklist.
