---
name: brands
description: "Skill for the Brands area of smartlock-next. 5 symbols across 4 files."
---

# Brands

5 symbols | 4 files | Cohesion: 100%

## When to Use

- Working with code in `components/`
- Understanding how getBrands, Brands, GET work
- Modifying brands-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `components/brands/StarRating.tsx` | getFingerprint, StarRating |
| `lib/services/brand-service.ts` | getBrands |
| `app/brands/page.tsx` | Brands |
| `app/api/brands/route.ts` | GET |

## Entry Points

Start here when exploring this area:

- **`getBrands`** (Function) — `lib/services/brand-service.ts:69`
- **`Brands`** (Function) — `app/brands/page.tsx:33`
- **`GET`** (Function) — `app/api/brands/route.ts:2`
- **`StarRating`** (Function) — `components/brands/StarRating.tsx:21`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `getBrands` | Function | `lib/services/brand-service.ts` | 69 |
| `Brands` | Function | `app/brands/page.tsx` | 33 |
| `GET` | Function | `app/api/brands/route.ts` | 2 |
| `StarRating` | Function | `components/brands/StarRating.tsx` | 21 |
| `getFingerprint` | Function | `components/brands/StarRating.tsx` | 10 |

## How to Explore

1. `gitnexus_context({name: "getBrands"})` — see callers and callees
2. `gitnexus_query({query: "brands"})` — find related execution flows
3. Read key files listed above for implementation details
