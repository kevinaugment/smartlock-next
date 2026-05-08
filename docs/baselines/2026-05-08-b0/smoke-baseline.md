# B0 Smoke Baseline

Date: 2026-05-08

Base URL: `http://localhost:3210`

Raw responses are stored under ignored `.baseline-artifacts/2026-05-08-b0/smoke/`.

## Summary

| Target | Status | Bytes | SHA-256 | Raw output |
|---|---:|---:|---|---|
| `/` | 200 | 74209 | `681d9a96130a419c...` | `.baseline-artifacts/2026-05-08-b0/smoke/home.html` |
| `/compare/yale-vs-august` | 200 | 148276 | `6e195f8222a6e402...` | `.baseline-artifacts/2026-05-08-b0/smoke/compare-yale-vs-august.html` |
| `/brands/yale/yale-assure-lock-2-plus` | 200 | 95512 | `87b4f5b266fad6ad...` | `.baseline-artifacts/2026-05-08-b0/smoke/brand-product-yale-assure-lock-2-plus.html` |
| `/best/homekit-smart-locks` | 200 | 183005 | `8b00e99901bfffd9...` | `.baseline-artifacts/2026-05-08-b0/smoke/best-homekit-smart-locks.html` |
| `/protocols/matter` | 200 | 212389 | `e63e43bc1e99a0a0...` | `.baseline-artifacts/2026-05-08-b0/smoke/protocol-matter.html` |
| `/calculators/compatibility` | 200 | 120526 | `e54fd9a9cfe45d38...` | `.baseline-artifacts/2026-05-08-b0/smoke/calculator-compatibility.html` |
| `/calculators/protocol-wizard` | 200 | 123991 | `03e3e69bd3509934...` | `.baseline-artifacts/2026-05-08-b0/smoke/calculator-protocol-wizard.html` |
| `/articles/guides/door-compatibility-guide` | 200 | 234208 | `5a088ac613ab842f...` | `.baseline-artifacts/2026-05-08-b0/smoke/article-door-compatibility-guide.html` |
| `/api/health` | 200 | 102 | `d9336eba5b5a6533...` | `.baseline-artifacts/2026-05-08-b0/smoke/api-health.json` |
| `/api/categories` | 200 | 1006 | `79f1c5ed143e4ccf...` | `.baseline-artifacts/2026-05-08-b0/smoke/api-categories.json` |
| `/api/calculators/protocol-wizard` | 200 | 146 | `2a648c74fd14ee81...` | `.baseline-artifacts/2026-05-08-b0/smoke/api-calculator-protocol-wizard.json` |

## HTML SEO Signals

| Path | Title | Canonical | JSON-LD | H1 |
|---|---|---|---:|---|
| `/` | SLockHub | Smart Lock Guides, Calculators, Brands &amp; Protocols | https://www.slockhub.com | 1 | Smart LockEngineering Hub |
| `/compare/yale-vs-august` | Yale vs August Smart Locks (2026) | SLockHub | https://www.slockhub.com/compare/yale-vs-august | 1 | Yale vs August |
| `/brands/yale/yale-assure-lock-2-plus` | Yale Assure Lock 2 Plus Review — Apple Home Key Smart Lock 2026 | https://www.slockhub.com/brands/yale/yale-assure-lock-2-plus | 1 | Yale Assure Lock 2 Plus |
| `/best/homekit-smart-locks` | Best Apple HomeKit Smart Locks 2026 — Home Key &amp; Siri | https://www.slockhub.com/best/homekit-smart-locks | 1 | Best Apple HomeKit Smart Locks 2026 |
| `/protocols/matter` | Matter Smart Locks: Compatible Products &amp; Guide 2026 — SLockHub.com | https://www.slockhub.com/protocols/matter | 1 | Matter Smart Locks |
| `/calculators/compatibility` | Smart Lock Door Compatibility Checker | ANSI A156.2 Standards | https://www.slockhub.com/calculators/compatibility | 3 | Smart Lock Door Compatibility Checker |
| `/calculators/protocol-wizard` | Smart Lock Protocol Wizard | Zigbee vs Z-Wave vs Wi-Fi Selector | https://www.slockhub.com/calculators/protocol-wizard | 3 | Smart Lock Protocol Selection Wizard |
| `/articles/guides/door-compatibility-guide` | Will a Smart Lock Fit Your Door? Complete Compatibility Guide (2026) | SLockHub.com | https://www.slockhub.com/articles/guides/door-compatibility-guide | 1 | Will a Smart Lock Fit Your Door? Complete Compatibility Guide (2026) |

## API Signals

| Path | JSON valid | Top-level keys | Array lengths | Error |
|---|---:|---|---|---|
| `/api/health` | yes | `service, status, timestamp, version` | `{}` |  |
| `/api/categories` | yes | `categories, success, timestamp` | `{"categories":8}` |  |
| `/api/calculators/protocol-wizard` | yes | `brands, calculator, dataSources, faqs, protocols, relatedArticles, relatedCalculators, sections, useCases` | `{"sections":0,"faqs":0,"protocols":0,"useCases":0,"dataSources":0,"relatedArticles":0,"relatedCalculators":0,"brands":0}` |  |

## Result

- Passed targets: 11/11
- Failed targets: 0
- Failures: none
