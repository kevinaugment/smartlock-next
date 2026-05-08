---
name: services
description: "Skill for the Services area of smartlock-next. 7 symbols across 5 files."
---

# Services

7 symbols | 5 files | Cohesion: 74%

## When to Use

- Working with code in `lib/`
- Understanding how query, queryOne, getUserRating work
- Modifying services-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `lib/db.ts` | query, queryOne |
| `lib/services/rating-service.ts` | getUserRating, getBrandAverageRating |
| `app/status/page.tsx` | StatusPage |
| `app/api/categories/route.ts` | GET |
| `app/api/calculators/[slug]/route.ts` | GET |

## Entry Points

Start here when exploring this area:

- **`query`** (Function) — `lib/db.ts:41`
- **`queryOne`** (Function) — `lib/db.ts:57`
- **`getUserRating`** (Function) — `lib/services/rating-service.ts:34`
- **`getBrandAverageRating`** (Function) — `lib/services/rating-service.ts:69`
- **`StatusPage`** (Function) — `app/status/page.tsx:22`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `query` | Function | `lib/db.ts` | 41 |
| `queryOne` | Function | `lib/db.ts` | 57 |
| `getUserRating` | Function | `lib/services/rating-service.ts` | 34 |
| `getBrandAverageRating` | Function | `lib/services/rating-service.ts` | 69 |
| `StatusPage` | Function | `app/status/page.tsx` | 22 |
| `GET` | Function | `app/api/categories/route.ts` | 3 |
| `GET` | Function | `app/api/calculators/[slug]/route.ts` | 108 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `POST → IsRetryableDatabaseError` | cross_community | 8 |
| `GET → IsRetryableDatabaseError` | cross_community | 7 |
| `POST → GetTursoClient` | cross_community | 7 |
| `GET → GetTursoClient` | cross_community | 6 |
| `StatusPage → IsRetryableDatabaseError` | cross_community | 6 |
| `GetBrandAverageRating → IsRetryableDatabaseError` | cross_community | 6 |
| `StatusPage → GetTursoClient` | cross_community | 5 |
| `GET → IsRetryableDatabaseError` | cross_community | 5 |
| `GET → IsRetryableDatabaseError` | cross_community | 5 |
| `GetBrandAverageRating → GetTursoClient` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Cluster_1 | 2 calls |
| Ratings | 1 calls |

## How to Explore

1. `gitnexus_context({name: "query"})` — see callers and callees
2. `gitnexus_query({query: "services"})` — find related execution flows
3. Read key files listed above for implementation details
