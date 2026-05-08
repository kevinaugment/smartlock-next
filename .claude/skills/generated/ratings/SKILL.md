---
name: ratings
description: "Skill for the Ratings area of smartlock-next. 6 symbols across 3 files."
---

# Ratings

6 symbols | 3 files | Cohesion: 67%

## When to Use

- Working with code in `app/`
- Understanding how execute, getProductRating, submitRating work
- Modifying ratings-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `app/api/ratings/route.ts` | success, GET, POST |
| `lib/services/rating-service.ts` | getProductRating, submitRating |
| `lib/db.ts` | execute |

## Entry Points

Start here when exploring this area:

- **`execute`** (Function) — `lib/db.ts:63`
- **`getProductRating`** (Function) — `lib/services/rating-service.ts:15`
- **`submitRating`** (Function) — `lib/services/rating-service.ts:44`
- **`GET`** (Function) — `app/api/ratings/route.ts:15`
- **`POST`** (Function) — `app/api/ratings/route.ts:45`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `execute` | Function | `lib/db.ts` | 63 |
| `getProductRating` | Function | `lib/services/rating-service.ts` | 15 |
| `submitRating` | Function | `lib/services/rating-service.ts` | 44 |
| `GET` | Function | `app/api/ratings/route.ts` | 15 |
| `POST` | Function | `app/api/ratings/route.ts` | 45 |
| `success` | Function | `app/api/ratings/route.ts` | 3 |

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
| Services | 2 calls |
| Db | 1 calls |

## How to Explore

1. `gitnexus_context({name: "execute"})` — see callers and callees
2. `gitnexus_query({query: "ratings"})` — find related execution flows
3. Read key files listed above for implementation details
