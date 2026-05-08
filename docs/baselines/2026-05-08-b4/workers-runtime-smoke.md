# B4 Workers Runtime Smoke

Date: 2026-05-08

Base URL: `http://localhost:3211`

Runtime: Wrangler local workerd preview with local D1 binding and temporary ignored `.dev.vars` auth smoke credentials.

Raw responses are stored under ignored `.baseline-artifacts/2026-05-08-b4/runtime-smoke/`.

## Summary

| Target | Status | Expected | ms | Bytes | SHA-256 | Raw output |
|---|---:|---:|---:|---:|---|---|
| `status-page` | 200 | pass | 97 | 45859 | `8cd64993af4b4d96...` | `.baseline-artifacts/2026-05-08-b4/runtime-smoke/status-page.html` |
| `auth-login-missing-fields` | 400 | pass | 19 | 43 | `2495d198c0cf18ba...` | `.baseline-artifacts/2026-05-08-b4/runtime-smoke/auth-login-missing-fields.json` |
| `auth-login-wrong-password` | 401 | pass | 81 | 37 | `2adc086a5e41b51f...` | `.baseline-artifacts/2026-05-08-b4/runtime-smoke/auth-login-wrong-password.json` |
| `auth-login-success` | 200 | pass | 69 | 293 | `d1d3afdf7bae8a30...` | `.baseline-artifacts/2026-05-08-b4/runtime-smoke/auth-login-success.json` |
| `report-download-write` | 200 | pass | 11 | 2190 | `18002911eb058edb...` | `.baseline-artifacts/2026-05-08-b4/runtime-smoke/report-download-write.pdf` |

## Auth Signals

| Target | Status | JSON valid | Success | Error | Token present | Role |
|---|---:|---:|---:|---|---:|---|
| `auth-login-missing-fields` | 400 | yes | null | Email and password are required | no |  |
| `auth-login-wrong-password` | 401 | yes | null | Invalid email or password | no |  |
| `auth-login-success` | 200 | yes | true |  | yes | admin |

## Status Signals

| Target | Platform text | D1 facade text | DB connected |
|---|---:|---:|---:|
| `status-page` | yes | yes | yes |

## Write Signals

| Target | Status | X-Lead-Stored | Content-Type | PDF header |
|---|---:|---|---|---|
| `report-download-write` | 200 | `1` | application/pdf | `%PDF-1.4` |

## Result

- Passed targets: 5/5
- Failed targets: 0
- Failures: none
