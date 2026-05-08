# B3 D1 Worker Smoke

Date: 2026-05-08

Base URL: `http://localhost:3211`

Runtime: Wrangler local workerd preview using local D1 binding `env.DB` and B3 ordered import.

Raw responses are stored under ignored `.baseline-artifacts/2026-05-08-b3/worker-smoke/`.

## Summary

| Target | Status | Bytes | SHA-256 | Raw output |
|---|---:|---:|---|---|
| `/` | 200 | 74381 | `6c50dd82e05121a2...` | `.baseline-artifacts/2026-05-08-b3/worker-smoke/home.html` |
| `/compare/yale-vs-august` | 200 | 148754 | `be629d4367f455fd...` | `.baseline-artifacts/2026-05-08-b3/worker-smoke/compare-yale-vs-august.html` |
| `/brands/yale/yale-assure-lock-2-plus` | 200 | 95651 | `a203432215cfd753...` | `.baseline-artifacts/2026-05-08-b3/worker-smoke/brand-product-yale-assure-lock-2-plus.html` |
| `/best/homekit-smart-locks` | 200 | 183607 | `4cdfe21e9fa59108...` | `.baseline-artifacts/2026-05-08-b3/worker-smoke/best-homekit-smart-locks.html` |
| `/protocols/matter` | 200 | 213129 | `755341fa649dcb1b...` | `.baseline-artifacts/2026-05-08-b3/worker-smoke/protocol-matter.html` |
| `/calculators/protocol-wizard` | 200 | 124421 | `06e163cca5f5f4bf...` | `.baseline-artifacts/2026-05-08-b3/worker-smoke/calculator-protocol-wizard.html` |
| `/api/health` | 200 | 102 | `54b455627ee12c0e...` | `.baseline-artifacts/2026-05-08-b3/worker-smoke/api-health.json` |
| `/api/categories` | 200 | 1006 | `cdb694b5de6c3987...` | `.baseline-artifacts/2026-05-08-b3/worker-smoke/api-categories.json` |
| `/api/reports/download` | 200 | 2209 | `8fef21845e2ffce9...` | `.baseline-artifacts/2026-05-08-b3/worker-smoke/api-report-download-write.pdf` |

## HTML Signals

| Path | Title | Canonical | H1 |
|---|---|---|---|
| `/` | SLockHub | Smart Lock Guides, Calculators, Brands &amp; Protocols | https://www.slockhub.com | Smart LockEngineering Hub |
| `/compare/yale-vs-august` | Yale vs August Smart Locks (2026) | SLockHub | https://www.slockhub.com/compare/yale-vs-august | Yale vs August |
| `/brands/yale/yale-assure-lock-2-plus` | Yale Assure Lock 2 Plus Review — Apple Home Key Smart Lock 2026 | https://www.slockhub.com/brands/yale/yale-assure-lock-2-plus | Yale Assure Lock 2 Plus |
| `/best/homekit-smart-locks` | Best Apple HomeKit Smart Locks 2026 — Home Key &amp; Siri | https://www.slockhub.com/best/homekit-smart-locks | Best Apple HomeKit Smart Locks 2026 |
| `/protocols/matter` | Matter Smart Locks: Compatible Products &amp; Guide 2026 — SLockHub.com | https://www.slockhub.com/protocols/matter | Matter Smart Locks |
| `/calculators/protocol-wizard` | Smart Lock Protocol Wizard | Zigbee vs Z-Wave vs Wi-Fi Selector | https://www.slockhub.com/calculators/protocol-wizard | Smart Lock Protocol Selection Wizard |

## API Signals

| Path | JSON valid | Top-level keys | Array lengths | Error |
|---|---:|---|---|---|
| `/api/health` | yes | `service, status, timestamp, version` | `{}` |  |
| `/api/categories` | yes | `categories, success, timestamp` | `{"categories":8}` |  |

## Write Signals

| Path | Status | X-Lead-Stored | Content-Type | Content-Disposition | PDF header |
|---|---:|---|---|---|---|
| `/api/reports/download` | 200 | `1` | application/pdf | attachment; filename="door-compatibility-audit.pdf" | `%PDF-1.4` |

## Result

- Passed targets: 9/9
- Failed targets: 0
- Failures: none
