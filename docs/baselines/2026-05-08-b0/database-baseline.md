# B0 Database Baseline

Date: 2026-05-08

## Export

- Raw SQL dump: `.baseline-artifacts/2026-05-08-b0/turso-export.sql`
- Dump size: 770796 bytes
- Exported tables: 24
- Privacy note: raw export is intentionally stored under ignored `.baseline-artifacts/` because it may contain users, report leads, emails, and operational data.

## Counts

| Table | Exists | Count |
|---|---:|---:|
| `users` | yes | 1 |
| `categories` | yes | 8 |
| `articles` | yes | 30 |
| `tags` | yes | 4 |
| `article_tags` | yes | 48 |
| `article_relations` | yes | 0 |
| `calculators` | yes | 17 |
| `calculator_articles` | yes | 32 |
| `calculator_tools` | yes | 0 |
| `pages` | yes | 1 |
| `navigation` | yes | 10 |
| `settings` | yes | 12 |
| `analytics` | yes | 0 |
| `audit_logs` | yes | 0 |
| `brands` | yes | 47 |
| `product_series` | yes | 125 |
| `products` | yes | 246 |
| `product_tags` | yes | 1152 |
| `top_n_pages` | yes | 20 |
| `product_articles` | yes | 0 |
| `product_ratings` | yes | 0 |
| `tool_ratings` | yes | 1 |
| `calculator_content_sections` | no | n/a |
| `calculator_faqs` | no | n/a |
| `calculator_protocol_data` | no | n/a |
| `calculator_use_cases` | no | n/a |
| `calculator_data_sources` | no | n/a |
| `report_leads` | yes | 2 |

## Representative Row Checks

| Check | Found |
|---|---:|
| `brand_yale` | yes |
| `product_yale_assure_lock_2_plus` | yes |
| `calculator_protocol_wizard` | no |
| `top_page_homekit` | yes |

## Timing

- Started: 2026-05-08T04:53:01.703Z
- Completed: 2026-05-08T04:53:43.387Z
