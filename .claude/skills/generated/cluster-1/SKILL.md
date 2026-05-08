---
name: cluster-1
description: "Skill for the Cluster_1 area of smartlock-next. 4 symbols across 1 files."
---

# Cluster_1

4 symbols | 1 files | Cohesion: 60%

## When to Use

- Working with code in `lib/`
- Understanding how getTursoClient, batch work
- Modifying cluster_1-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `lib/db.ts` | getTursoClient, isRetryableDatabaseError, withDatabaseRetry, batch |

## Entry Points

Start here when exploring this area:

- **`getTursoClient`** (Function) — `lib/db.ts:4`
- **`batch`** (Function) — `lib/db.ts:79`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `getTursoClient` | Function | `lib/db.ts` | 4 |
| `batch` | Function | `lib/db.ts` | 79 |
| `isRetryableDatabaseError` | Function | `lib/db.ts` | 13 |
| `withDatabaseRetry` | Function | `lib/db.ts` | 21 |

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

## How to Explore

1. `gitnexus_context({name: "getTursoClient"})` — see callers and callees
2. `gitnexus_query({query: "cluster_1"})` — find related execution flows
3. Read key files listed above for implementation details
