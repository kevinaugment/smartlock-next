---
name: articles
description: "Skill for the Articles area of smartlock-next. 13 symbols across 6 files."
---

# Articles

13 symbols | 6 files | Cohesion: 96%

## When to Use

- Working with code in `app/`
- Understanding how getArticlesByCategory, getArticleBySlug, CategoryPage work
- Modifying articles-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `lib/articles/registry.ts` | getArticlesByCategory, getArticleBySlug, getFeaturedArticles, getAllArticles |
| `app/articles/[category]/[slug]/page.tsx` | generateMetadata, ArticlePage, generateStaticParams |
| `components/articles/ReadingProgress.tsx` | ReadingProgress, updateProgress |
| `components/articles/ArticleContent.tsx` | ArticleContent, extractText |
| `app/articles/[category]/page.tsx` | CategoryPage |
| `app/articles/page.tsx` | ArticlesPage |

## Entry Points

Start here when exploring this area:

- **`getArticlesByCategory`** (Function) — `lib/articles/registry.ts:1207`
- **`getArticleBySlug`** (Function) — `lib/articles/registry.ts:1230`
- **`CategoryPage`** (Function) — `app/articles/[category]/page.tsx:36`
- **`generateMetadata`** (Function) — `app/articles/[category]/[slug]/page.tsx:25`
- **`ArticlePage`** (Function) — `app/articles/[category]/[slug]/page.tsx:70`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `getArticlesByCategory` | Function | `lib/articles/registry.ts` | 1207 |
| `getArticleBySlug` | Function | `lib/articles/registry.ts` | 1230 |
| `CategoryPage` | Function | `app/articles/[category]/page.tsx` | 36 |
| `generateMetadata` | Function | `app/articles/[category]/[slug]/page.tsx` | 25 |
| `ArticlePage` | Function | `app/articles/[category]/[slug]/page.tsx` | 70 |
| `getFeaturedArticles` | Function | `lib/articles/registry.ts` | 1216 |
| `getAllArticles` | Function | `lib/articles/registry.ts` | 1237 |
| `ArticlesPage` | Function | `app/articles/page.tsx` | 18 |
| `generateStaticParams` | Function | `app/articles/[category]/[slug]/page.tsx` | 16 |
| `ReadingProgress` | Function | `components/articles/ReadingProgress.tsx` | 4 |
| `updateProgress` | Function | `components/articles/ReadingProgress.tsx` | 8 |
| `ArticleContent` | Function | `components/articles/ArticleContent.tsx` | 76 |
| `extractText` | Function | `components/articles/ArticleContent.tsx` | 138 |

## How to Explore

1. `gitnexus_context({name: "getArticlesByCategory"})` — see callers and callees
2. `gitnexus_query({query: "articles"})` — find related execution flows
3. Read key files listed above for implementation details
