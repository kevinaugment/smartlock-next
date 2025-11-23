import { NextResponse } from 'next/server'

export const runtime = 'edge'

const categories = [
  'protocols',
  'security',
  'installation',
  'guides',
  'use-cases',
  'support',
  'integration',
]

const calculators = [
  'lock-tco',
  'battery-life',
  'protocol-wizard',
  'signal-strength',
  'str-roi',
  'installation-cost',
  'compatibility',
  'mesh-planner',
  'rf-coverage',
  'fleet-planner',
  'credential-planner',
  'installation-time',
  'subscription-compare',
  'offline-resilience',
  'emergency-backup',
]

const staticPages = [
  '',
  'about',
  'contact',
  'privacy',
  'terms',
  'sitemap',
  'articles',
  'calculators',
]

export async function GET() {
  const baseUrl = 'https://smartlockhub.com'
  const currentDate = new Date().toISOString()

  const staticUrls = staticPages.map(page => `
  <url>
    <loc>${baseUrl}/${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')

  const categoryUrls = categories.map(cat => `
  <url>
    <loc>${baseUrl}/articles/${cat}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')

  const calculatorUrls = calculators.map(calc => `
  <url>
    <loc>${baseUrl}/calculators/${calc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${categoryUrls}
${calculatorUrls}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
