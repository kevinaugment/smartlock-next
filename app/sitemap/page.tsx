import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles/registry'
import { calculatorRouteSlugs, calculatorTitles } from '@/lib/calculators/slugs'
import { priorityComparisonLinks } from '@/lib/seo/priority-comparisons'
import { coreHubLinks, priorityBestPageLinks, protocolPageLinks } from '@/lib/seo/priority-pages'

export const metadata: Metadata = {
  title: 'SLockHub Sitemap | Guides, Calculators, Resources',
  description: 'Map SLockHub pages for smart lock guides, calculators, brand data, protocol comparisons, buying resources, and site links.',
  alternates: { canonical: '/sitemap' },
}

const categories = [
  { name: 'Protocols', slug: 'protocols' },
  { name: 'Security', slug: 'security' },
  { name: 'Installation', slug: 'installation' },
  { name: 'Guides', slug: 'guides' },
  { name: 'Use Cases', slug: 'use-cases' },
  { name: 'Resources', slug: 'resources' },
  { name: 'Integration', slug: 'integration' },
]

const calculators = calculatorRouteSlugs.map((slug) => ({
  name: calculatorTitles[slug],
  slug,
}))

export default function Sitemap() {
  const articleCount = getAllArticles().length

  return (
    <div className="page-bg">
      <div className="container-main section">
        <div className="max-w-6xl mx-auto">
          <h1 className="page-header__title" style={{ marginBottom: 'var(--space-md)' }}>Sitemap</h1>
          <p className="page-subtitle" style={{ marginBottom: 'var(--space-3xl)' }}>
            Complete overview of all pages on SLockHub.com
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Main Pages */}
            <div className="content-card">
              <h2 className="section-title">Main Pages</h2>
              <ul className="space-y-3">
                <li><Link href="/" style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>Home</Link></li>
                <li><Link href="/about" style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>About</Link></li>
                <li><Link href="/contact" style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>Contact</Link></li>
                <li><Link href="/faq" style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>FAQ</Link></li>
                <li><Link href="/privacy" style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>Privacy Policy</Link></li>
                <li><Link href="/terms" style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>Terms of Service</Link></li>
              </ul>
            </div>

            {/* Core Hubs */}
            <div className="content-card">
              <h2 className="section-title">Core Hubs</h2>
              <ul className="space-y-3">
                {coreHubLinks.map((hub) => (
                  <li key={hub.href}>
                    <Link href={hub.href} style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>
                      {hub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Articles */}
            <div className="content-card">
              <h2 className="section-title">Smart Lock Guides</h2>
              <ul className="space-y-3">
                <li><Link href="/articles" style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>All Articles ({articleCount})</Link></li>
                {categories.map(cat => (
                  <li key={cat.slug}>
                    <Link href={`/articles/${cat.slug}`} style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculators */}
            <div className="content-card md:col-span-2">
              <h2 className="section-title">Planning Calculators ({calculators.length})</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {calculators.map((calc) => (
                  <Link key={calc.slug} href={`/calculators/${calc.slug}`} style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>
                    • {calc.name}
                  </Link>
                ))}
              </div>
              <div style={{ marginTop: 'var(--space-md)' }}>
                <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 600 }} prefetch={false}>
                  View All Calculators →
                </Link>
              </div>
            </div>

            {/* Best Pages */}
            <div className="content-card">
              <h2 className="section-title">Best Smart Lock Pages</h2>
              <ul className="space-y-3">
                {priorityBestPageLinks.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="content-card">
              <h2 className="section-title">Protocol Pages</h2>
              <ul className="space-y-3">
                <li><Link href="/protocols" style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>All Protocols</Link></li>
                {protocolPageLinks.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="content-card md:col-span-2">
              <h2 className="section-title">Priority Brand Comparisons</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {priorityComparisonLinks.map((page) => (
                  <Link key={page.href} href={page.href} style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>
                    • {page.title}
                  </Link>
                ))}
              </div>
              <div style={{ marginTop: 'var(--space-md)' }}>
                <Link href="/compare" style={{ color: 'var(--color-accent)', fontWeight: 600 }} prefetch={false}>
                  View All Comparisons →
                </Link>
              </div>
            </div>
          </div>

          <div className="info-box" style={{ marginTop: 'var(--space-3xl)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>
              Guides, Tools, Contact
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
              Jump to article hubs, calculators, or support contact paths.
            </p>
            <div className="grid-actions">
              <Link href="/articles" className="btn btn-primary" prefetch={false}>Browse Articles</Link>
              <Link href="/contact" className="btn btn-secondary" prefetch={false}>Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
