---
name: slug
description: "Skill for the [slug] area of smartlock-next. 16 symbols across 4 files."
---

# [slug]

16 symbols | 4 files | Cohesion: 88%

## When to Use

- Working with code in `app/`
- Understanding how BrandComparisonPage, getBrandBySlug, BrandDetailPage work
- Modifying [slug]-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `app/compare/[slug]/page.tsx` | getAvgRating, getLowestPrice, getProtocols, getAvgBatteryLife, hasFeature (+7) |
| `app/brands/[slug]/page.tsx` | getProtocols, BrandDetailPage |
| `lib/services/brand-service.ts` | getBrandBySlug |
| `lib/db/brand-models.ts` | getBySeriesId |

## Entry Points

Start here when exploring this area:

- **`BrandComparisonPage`** (Function) — `app/compare/[slug]/page.tsx:174`
- **`getBrandBySlug`** (Function) — `lib/services/brand-service.ts:82`
- **`BrandDetailPage`** (Function) — `app/brands/[slug]/page.tsx:42`
- **`generateMetadata`** (Function) — `app/compare/[slug]/page.tsx:66`
- **`getBySeriesId`** (Method) — `lib/db/brand-models.ts:242`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `BrandComparisonPage` | Function | `app/compare/[slug]/page.tsx` | 174 |
| `getBrandBySlug` | Function | `lib/services/brand-service.ts` | 82 |
| `BrandDetailPage` | Function | `app/brands/[slug]/page.tsx` | 42 |
| `generateMetadata` | Function | `app/compare/[slug]/page.tsx` | 66 |
| `getBySeriesId` | Method | `lib/db/brand-models.ts` | 242 |
| `getAvgRating` | Function | `app/compare/[slug]/page.tsx` | 116 |
| `getLowestPrice` | Function | `app/compare/[slug]/page.tsx` | 130 |
| `getProtocols` | Function | `app/compare/[slug]/page.tsx` | 136 |
| `getAvgBatteryLife` | Function | `app/compare/[slug]/page.tsx` | 145 |
| `hasFeature` | Function | `app/compare/[slug]/page.tsx` | 152 |
| `getBetterRatedBrand` | Function | `app/compare/[slug]/page.tsx` | 156 |
| `getLowerPricedBrand` | Function | `app/compare/[slug]/page.tsx` | 163 |
| `getProtocols` | Function | `app/brands/[slug]/page.tsx` | 29 |
| `parseBrandSlugs` | Function | `app/compare/[slug]/page.tsx` | 27 |
| `getComparisonData` | Function | `app/compare/[slug]/page.tsx` | 42 |
| `getPriceRange` | Function | `app/compare/[slug]/page.tsx` | 121 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `BrandComparisonPage → ParseBrandSlugs` | cross_community | 3 |
| `BrandComparisonPage → GetAvgRating` | intra_community | 3 |
| `BrandComparisonPage → GetLowestPrice` | intra_community | 3 |
| `GenerateMetadata → ParseBrandSlugs` | intra_community | 3 |
| `BrandDetailPage → GetBySeriesId` | intra_community | 3 |

## How to Explore

1. `gitnexus_context({name: "BrandComparisonPage"})` — see callers and callees
2. `gitnexus_query({query: "[slug]"})` — find related execution flows
3. Read key files listed above for implementation details
