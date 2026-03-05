# Performance Optimization

## Next.js Build Performance

- Use Server Components by default (avoid `'use client'` unless needed)
- Split large client components into smaller chunks
- Use `next/dynamic` for heavy components below the fold
- Keep `page.tsx` as Server Component for SEO metadata

## Database (Turso / LibSQL)

- Select only needed columns (never `SELECT *`)
- Use parameterized queries for security and plan caching
- Add appropriate indexes for frequently queried fields
- Batch related queries when possible

## Image Optimization

- Use Next.js `<Image>` component or manual `<picture>` with WebP/AVIF
- Set explicit `width` and `height` on all images (CLS prevention)
- Use `loading="lazy"` on below-fold images
- Use `fetchpriority="high"` on hero/LCP images
- Target: thumbnails <50KB, content <100KB, hero <200KB

## Vercel Deployment

- Monitor build times — flag if exceeding 3 minutes
- Use ISR (Incremental Static Regeneration) for data-driven pages
- Configure proper caching headers for static assets
- Monitor Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1

## Context Window Management

When working on large tasks:
- Avoid starting large-scale refactoring late in a session
- Break multi-file changes into focused, sequential steps
- Use targeted file reads instead of reading entire files

## Build Troubleshooting

If build fails:
1. Read the error message carefully — don't skip details
2. Load `systematic-debugging/SKILL.md` for investigation
3. Fix incrementally — one change at a time
4. Verify with `npm run build` after each fix
