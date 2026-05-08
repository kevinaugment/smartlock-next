---
name: app
description: "Skill for the App area of smartlock-next. 4 symbols across 3 files."
---

# App

4 symbols | 3 files | Cohesion: 86%

## When to Use

- Working with code in `app/`
- Understanding how sitemap, generateStaticParams, getAllSlugs work
- Modifying app-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `app/sitemap.ts` | toSitemapDate, sitemap |
| `lib/db/brand-models.ts` | getAllSlugs |
| `app/best/[slug]/page.tsx` | generateStaticParams |

## Entry Points

Start here when exploring this area:

- **`sitemap`** (Function) — `app/sitemap.ts:27`
- **`generateStaticParams`** (Function) — `app/best/[slug]/page.tsx:36`
- **`getAllSlugs`** (Method) — `lib/db/brand-models.ts:342`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `sitemap` | Function | `app/sitemap.ts` | 27 |
| `generateStaticParams` | Function | `app/best/[slug]/page.tsx` | 36 |
| `getAllSlugs` | Method | `lib/db/brand-models.ts` | 342 |
| `toSitemapDate` | Function | `app/sitemap.ts` | 11 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Articles | 1 calls |

## How to Explore

1. `gitnexus_context({name: "sitemap"})` — see callers and callees
2. `gitnexus_query({query: "app"})` — find related execution flows
3. Read key files listed above for implementation details
