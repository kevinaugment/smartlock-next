import { MetadataRoute } from 'next'
import { cache } from 'react'
import { getAllArticles } from '@/lib/articles/registry'
import { calculatorRouteSlugs } from '@/lib/calculators/slugs'
import { BrandModel, ProductModel, TopNPageModel } from '@/lib/db/brand-models'
import { getCanonicalComparisonHref, priorityComparisonLinks } from '@/lib/seo/priority-comparisons'
import { priorityBestPageLinks, protocolPageLinks } from '@/lib/seo/priority-pages'

const BASE_URL = 'https://www.slockhub.com'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Normalize any date string to W3C Datetime YYYY-MM-DD format for sitemaps.
 * Handles: ISO strings, space-separated DB timestamps, plain YYYY-MM-DD.
 */
function toSitemapDate(dateStr: string | undefined | null): string | undefined {
    if (!dateStr) return undefined
    // Already YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr
    // DB format "2026-02-15 18:40:00" → replace space with T for parsing
    const normalized = dateStr.includes(' ') ? dateStr.replace(' ', 'T') + 'Z' : dateStr
    const d = new Date(normalized)
    if (isNaN(d.getTime())) return undefined
    return d.toISOString().slice(0, 10) // YYYY-MM-DD
}

const getSeoProducts = cache(() => ProductModel.getAllForSeo())

function uniqueSitemapPages(pages: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
    const byUrl = new Map<string, MetadataRoute.Sitemap[number]>()
    for (const page of pages) {
        byUrl.set(page.url, page)
    }
    return Array.from(byUrl.values())
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = getAllArticles()

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/about`,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/contact`,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/privacy`,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/faq`,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/articles`,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/calculators`,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/brands`,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/resources`,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/resources/glossary`,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/resources/reference-tables`,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/resources/installation-guides`,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/resources/buying-guide`,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/compare`,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/sitemap`,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ]

    // Article category pages
    const categories = ['guides', 'installation', 'protocols', 'security', 'integration', 'use-cases', 'resources']
    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${BASE_URL}/articles/${cat}`,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Individual article pages (dynamically from registry)
    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${BASE_URL}/articles/${article.category}/${article.slug}`,
        lastModified: toSitemapDate(article.updatedAt || article.pubDate),
        changeFrequency: 'monthly' as const,
        priority: article.isPillar ? 0.9 : 0.8,
    }))

    // Calculator pages
    const calculatorPages: MetadataRoute.Sitemap = calculatorRouteSlugs.map((slug) => ({
        url: `${BASE_URL}/calculators/${slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    const priorityComparisonPages: MetadataRoute.Sitemap = priorityComparisonLinks.map((link) => ({
        url: `${BASE_URL}${link.href}`,
        changeFrequency: 'monthly' as const,
        priority: link.source === 'gsc' ? 0.8 : 0.7,
    }))

    const priorityBrandPages: MetadataRoute.Sitemap = Array.from(
        new Set(priorityComparisonLinks.flatMap(link => link.slugs))
    ).map((slug) => ({
        url: `${BASE_URL}/brands/${slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
    }))

    const priorityBestPages: MetadataRoute.Sitemap = priorityBestPageLinks.map((link) => ({
        url: `${BASE_URL}${link.href}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Dynamic brand/product/best pages (from database)
    const brands = await BrandModel.getAll()
    const products = await getSeoProducts()
    const topNPages = await TopNPageModel.getAllForSeo()

    const brandLastModified = new Map(brands.map((brand) => [brand.slug, toSitemapDate(brand.updated_at)]))
    const productLastModified = new Map<string, string | undefined>()
    for (const product of products) {
        const current = productLastModified.get(product.brand_slug)
        const next = toSitemapDate(product.updated_at)
        if (!current || (next && next > current)) productLastModified.set(product.brand_slug, next)
    }

    const latestBrandDataDate = (brandSlug: string): string | undefined => {
        const dates = [brandLastModified.get(brandSlug), productLastModified.get(brandSlug)].filter(
            (date): date is string => Boolean(date)
        )
        return dates.sort().at(-1)
    }

    const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
        url: `${BASE_URL}/brands/${b.slug}`,
        lastModified: brandLastModified.get(b.slug),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const comparisonPages: MetadataRoute.Sitemap = []
    // Brand comparison pages (all combinations)
    for (let i = 0; i < brands.length; i++) {
        for (let j = i + 1; j < brands.length; j++) {
            const href = getCanonicalComparisonHref(brands[i].slug, brands[j].slug)
            comparisonPages.push({
                url: `${BASE_URL}${href}`,
                lastModified: [latestBrandDataDate(brands[i].slug), latestBrandDataDate(brands[j].slug)]
                    .filter((date): date is string => Boolean(date))
                    .sort()
                    .at(-1),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            })
        }
    }

    const productPages: MetadataRoute.Sitemap = products.map((p) => ({
        url: `${BASE_URL}/brands/${p.brand_slug}/${p.slug}`,
        lastModified: toSitemapDate(p.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const bestLastModified = new Map(topNPages.map((page) => [page.slug, toSitemapDate(page.updated_at)]))
    const bestPages: MetadataRoute.Sitemap = topNPages.map((p) => ({
        url: `${BASE_URL}/best/${p.slug}`,
        lastModified: bestLastModified.get(p.slug),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    for (const page of priorityComparisonPages) {
        const pair = priorityComparisonLinks.find((link) => `${BASE_URL}${link.href}` === page.url)
        if (!pair) continue
        page.lastModified = [latestBrandDataDate(pair.slugs[0]), latestBrandDataDate(pair.slugs[1])]
            .filter((date): date is string => Boolean(date))
            .sort()
            .at(-1)
    }
    for (const page of priorityBrandPages) {
        const slug = page.url.replace(`${BASE_URL}/brands/`, '')
        page.lastModified = brandLastModified.get(slug)
    }
    for (const page of priorityBestPages) {
        const slug = page.url.replace(`${BASE_URL}/best/`, '')
        page.lastModified = bestLastModified.get(slug)
    }

    // Protocol pages (static list)
    const protocolPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/protocols`,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        ...protocolPageLinks.map((link) => ({
            url: `${BASE_URL}${link.href}`,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ]

    return uniqueSitemapPages([
        ...staticPages,
        ...categoryPages,
        ...articlePages,
        ...calculatorPages,
        ...protocolPages,
        ...priorityComparisonPages,
        ...priorityBrandPages,
        ...priorityBestPages,
        ...comparisonPages,
        ...brandPages,
        ...productPages,
        ...bestPages,
    ])
}
