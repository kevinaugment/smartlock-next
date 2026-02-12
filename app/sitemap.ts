import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles/registry'

const BASE_URL = 'https://smartlockhub.com'
// Evaluated once at build time — every deploy refreshes sitemap dates
const BUILD_DATE = new Date().toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
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
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/resources`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly',
            priority: 0.5,
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
    const categories = ['guides', 'installation', 'protocols', 'security', 'integration', 'use-cases', 'support']
    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${BASE_URL}/articles/${cat}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Individual article pages (dynamically from registry)
    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${BASE_URL}/articles/${article.category}/${article.slug}`,
        lastModified: article.updatedAt || article.pubDate,
        changeFrequency: 'monthly' as const,
        priority: article.isPillar ? 0.9 : 0.8,
    }))

    // Calculator pages
    const calculatorSlugs = [
        'lock-tco', 'battery-life', 'protocol-wizard', 'signal-strength',
        'str-roi', 'installation-cost', 'compatibility', 'mesh-planner',
        'rf-coverage', 'fleet-planner', 'credential-planner', 'installation-time',
        'subscription-compare', 'offline-resilience', 'emergency-backup',
    ]
    const calculatorPages: MetadataRoute.Sitemap = calculatorSlugs.map((slug) => ({
        url: `${BASE_URL}/calculators/${slug}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    return [
        ...staticPages,
        ...categoryPages,
        ...articlePages,
        ...calculatorPages,
    ]
}
