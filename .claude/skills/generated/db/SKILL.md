---
name: db
description: "Skill for the Db area of smartlock-next. 34 symbols across 11 files."
---

# Db

34 symbols | 11 files | Cohesion: 96%

## When to Use

- Working with code in `lib/`
- Understanding how getD1, query, queryOne work
- Modifying db-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `lib/db/client.ts` | prepare, batch, bind, first, run (+10) |
| `lib/db/brand-models.ts` | getAll, getByBrandSlug, getByTag, getForCalculator |
| `lib/services/brand-service.ts` | getTopNPageData, getProductsForCalculator, getRecommendedProducts |
| `lib/db/models.ts` | getRelatedArticlesBySlug, get, set |
| `lib/auth.ts` | verifyToken, getUserFromRequest |
| `lib/markdown.ts` | generateId, extractHeadings |
| `app/protocols/[protocol]/page.tsx` | ProtocolDetailPage |
| `app/best/[slug]/page.tsx` | TopNPage |
| `app/api/products/route.ts` | GET |
| `app/api/related-articles/route.ts` | GET |

## Entry Points

Start here when exploring this area:

- **`getD1`** (Function) — `lib/db/client.ts:92`
- **`query`** (Function) — `lib/db/client.ts:113`
- **`queryOne`** (Function) — `lib/db/client.ts:135`
- **`execute`** (Function) — `lib/db/client.ts:157`
- **`batch`** (Function) — `lib/db/client.ts:188`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `getD1` | Function | `lib/db/client.ts` | 92 |
| `query` | Function | `lib/db/client.ts` | 113 |
| `queryOne` | Function | `lib/db/client.ts` | 135 |
| `execute` | Function | `lib/db/client.ts` | 157 |
| `batch` | Function | `lib/db/client.ts` | 188 |
| `getTopNPageData` | Function | `lib/services/brand-service.ts` | 128 |
| `getProductsForCalculator` | Function | `lib/services/brand-service.ts` | 156 |
| `getRecommendedProducts` | Function | `lib/services/brand-service.ts` | 161 |
| `ProtocolDetailPage` | Function | `app/protocols/[protocol]/page.tsx` | 170 |
| `TopNPage` | Function | `app/best/[slug]/page.tsx` | 47 |
| `GET` | Function | `app/api/products/route.ts` | 5 |
| `verifyToken` | Function | `lib/auth.ts` | 42 |
| `getUserFromRequest` | Function | `lib/auth.ts` | 92 |
| `GET` | Function | `app/api/related-articles/route.ts` | 3 |
| `extractHeadings` | Function | `lib/markdown.ts` | 72 |
| `ProductRecommendation` | Function | `components/brands/ProductRecommendation.tsx` | 29 |
| `prepare` | Method | `lib/db/client.ts` | 9 |
| `batch` | Method | `lib/db/client.ts` | 11 |
| `bind` | Method | `lib/db/client.ts` | 16 |
| `first` | Method | `lib/db/client.ts` | 17 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Query → IsRetryableDatabaseError` | intra_community | 4 |
| `QueryOne → IsRetryableDatabaseError` | intra_community | 4 |
| `Batch → IsRetryableDatabaseError` | intra_community | 4 |
| `GET → GetForCalculator` | intra_community | 3 |
| `Query → GetLibSQLClient` | intra_community | 3 |
| `Query → GetD1` | intra_community | 3 |
| `QueryOne → GetLibSQLClient` | intra_community | 3 |
| `QueryOne → GetD1` | intra_community | 3 |
| `Batch → GetLibSQLClient` | intra_community | 3 |
| `Batch → GetD1` | intra_community | 3 |

## How to Explore

1. `gitnexus_context({name: "getD1"})` — see callers and callees
2. `gitnexus_query({query: "db"})` — find related execution flows
3. Read key files listed above for implementation details
