---
name: product
description: "Skill for the [product] area of smartlock-next. 4 symbols across 1 files."
---

# [product]

4 symbols | 1 files | Cohesion: 100%

## When to Use

- Working with code in `app/`
- Understanding how generateMetadata, ProductDetailPage work
- Modifying [product]-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `app/brands/[slug]/[product]/page.tsx` | getProductDetail, generateMetadata, getPriceTier, ProductDetailPage |

## Entry Points

Start here when exploring this area:

- **`generateMetadata`** (Function) — `app/brands/[slug]/[product]/page.tsx:35`
- **`ProductDetailPage`** (Function) — `app/brands/[slug]/[product]/page.tsx:64`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `generateMetadata` | Function | `app/brands/[slug]/[product]/page.tsx` | 35 |
| `ProductDetailPage` | Function | `app/brands/[slug]/[product]/page.tsx` | 64 |
| `getProductDetail` | Function | `app/brands/[slug]/[product]/page.tsx` | 14 |
| `getPriceTier` | Function | `app/brands/[slug]/[product]/page.tsx` | 56 |

## How to Explore

1. `gitnexus_context({name: "generateMetadata"})` — see callers and callees
2. `gitnexus_query({query: "[product]"})` — find related execution flows
3. Read key files listed above for implementation details
