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
function toSitemapDate(dateStr: string | undefined | null): string {
    if (!dateStr) return BUILD_DATE
    // Already YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr
    // DB format "2026-02-15 18:40:00" → replace space with T for parsing
    const normalized = dateStr.includes(' ') ? dateStr.replace(' ', 'T') + 'Z' : dateStr
    const d = new Date(normalized)
    if (isNaN(d.getTime())) return BUILD_DATE
    return d.toISOString().slice(0, 10) // YYYY-MM-DD
}

// Evaluated once at build time — every deploy refreshes sitemap dates
const BUILD_DATE = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

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
            lastModified: BUILD_DATE,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: BUILD_DATE,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: BUILD_DATE,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/faq`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/articles`,
            lastModified: BUILD_DATE,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/calculators`,
            lastModified: BUILD_DATE,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/brands`,
            lastModified: BUILD_DATE,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/resources`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/resources/glossary`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/resources/reference-tables`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/resources/installation-guides`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/resources/buying-guide`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/compare`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/sitemap`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ]

    // Article category pages
    const categories = ['guides', 'installation', 'protocols', 'security', 'integration', 'use-cases', 'resources']
    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${BASE_URL}/articles/${cat}`,
        lastModified: BUILD_DATE,
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
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    const priorityComparisonPages: MetadataRoute.Sitemap = priorityComparisonLinks.map((link) => ({
        url: `${BASE_URL}${link.href}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly' as const,
        priority: link.source === 'gsc' ? 0.8 : 0.7,
    }))

    const priorityBrandPages: MetadataRoute.Sitemap = Array.from(
        new Set(priorityComparisonLinks.flatMap(link => link.slugs))
    ).map((slug) => ({
        url: `${BASE_URL}/brands/${slug}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
    }))

    const priorityBestPages: MetadataRoute.Sitemap = priorityBestPageLinks.map((link) => ({
        url: `${BASE_URL}${link.href}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Dynamic brand/product/best pages (from database)
    let brandPages: MetadataRoute.Sitemap = []
    let productPages: MetadataRoute.Sitemap = []
    let bestPages: MetadataRoute.Sitemap = []
    let comparisonPages: MetadataRoute.Sitemap = []

    try {
        const brands = await BrandModel.getAll()
        brandPages = brands.map((b) => ({
            url: `${BASE_URL}/brands/${b.slug}`,
            lastModified: toSitemapDate(b.updated_at),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))

        // Brand comparison pages (all combinations)
        for (let i = 0; i < brands.length; i++) {
            for (let j = i + 1; j < brands.length; j++) {
                const href = getCanonicalComparisonHref(brands[i].slug, brands[j].slug)
                comparisonPages.push({
                    url: `${BASE_URL}${href}`,
                    lastModified: BUILD_DATE,
                    changeFrequency: 'monthly' as const,
                    priority: 0.7,
                })
            }
        }

        const products = await getSeoProducts()
        productPages = products.map((p) => ({
            url: `${BASE_URL}/brands/${p.brand_slug}/${p.slug}`,
            lastModified: toSitemapDate(p.updated_at),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))

        const topNPages = await TopNPageModel.getAllSlugs()
        bestPages = topNPages.map((p) => ({
            url: `${BASE_URL}/best/${p.slug}`,
            lastModified: BUILD_DATE,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    } catch {
        // Database not available — skip dynamic pages gracefully
    }

    // Protocol pages (static list)
    const protocolPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/protocols`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        ...protocolPageLinks.map((link) => ({
            url: `${BASE_URL}${link.href}`,
            lastModified: BUILD_DATE,
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
