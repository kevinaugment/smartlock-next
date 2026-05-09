import type { Metadata } from 'next'
import Link from 'next/link'

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

const calculators = [
  { name: 'TCO Calculator', slug: 'lock-tco' },
  { name: 'Battery Life Calculator', slug: 'battery-life' },
  { name: 'Protocol Selection Wizard', slug: 'protocol-wizard' },
  { name: 'Signal Strength Analyzer', slug: 'signal-strength' },
  { name: 'STR ROI Calculator', slug: 'str-roi' },
  { name: 'Installation Cost Estimator', slug: 'installation-cost' },
  { name: 'Door Compatibility Checker', slug: 'compatibility' },
  { name: 'Mesh Node Planner', slug: 'mesh-planner' },
  { name: 'RF Coverage Estimator', slug: 'rf-coverage' },
  { name: 'Multi-Property Fleet Planner', slug: 'fleet-planner' },
  { name: 'Credential Capacity Planner', slug: 'credential-planner' },
  { name: 'Installation Time Estimator', slug: 'installation-time' },
  { name: 'Subscription vs Purchase', slug: 'subscription-compare' },
  { name: 'Offline Resilience Scorecard', slug: 'offline-resilience' },
  { name: 'Emergency Backup Evaluator', slug: 'emergency-backup' },
]

export default function Sitemap() {
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
                <li><Link href="/" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>Home</Link></li>
                <li><Link href="/about" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>About</Link></li>
                <li><Link href="/contact" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>Contact</Link></li>
                <li><Link href="/privacy" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>Privacy Policy</Link></li>
                <li><Link href="/terms" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>Terms of Service</Link></li>
              </ul>
            </div>

            {/* Articles */}
            <div className="content-card">
              <h2 className="section-title">Smart Lock Guides</h2>
              <ul className="space-y-3">
                <li><Link href="/articles" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>All Articles (49+)</Link></li>
                {categories.map(cat => (
                  <li key={cat.slug}>
                    <Link href={`/articles/${cat.slug}`} style={{ color: 'var(--color-accent)', fontWeight: 500 }}>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculators */}
            <div className="content-card md:col-span-2">
              <h2 className="section-title">Planning Calculators</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {calculators.map((calc) => (
                  <Link key={calc.slug} href={`/calculators/${calc.slug}`} style={{ color: 'var(--color-accent)', fontWeight: 500 }}>
                    • {calc.name}
                  </Link>
                ))}
              </div>
              <div style={{ marginTop: 'var(--space-md)' }}>
                <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                  View All Calculators →
                </Link>
              </div>
            </div>

            {/* Admin */}
            <div className="content-card">
              <h2 className="section-title">Admin Portal</h2>
              <ul className="space-y-3">
                <li><Link href="/admin/login" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>Admin Login</Link></li>
                <li style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  (Dashboard and management pages require authentication)
                </li>
              </ul>
            </div>

            {/* API */}
            <div className="content-card">
              <h2 className="section-title">API Endpoints</h2>
              <ul className="space-y-3">
                <li><Link href="/api/categories" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>/api/categories</Link></li>
                <li>
                  <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>/api/auth/login</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: 'var(--space-sm)' }}>(POST only)</span>
                </li>
              </ul>
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
              <Link href="/articles" className="btn btn-primary">Browse Articles</Link>
              <Link href="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
