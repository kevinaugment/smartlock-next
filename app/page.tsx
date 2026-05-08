import Link from 'next/link'
import type { Metadata } from 'next'
import {
  BookOpen, Calculator, Radio, Lock, Battery, Wrench,
  Building2, Lightbulb, Link as LinkIcon, DollarSign,
  Wand2, Signal
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'SLockHub | Smart Lock Guides, Calculators, Brands & Protocols',
  description: 'Research smart locks with expert guides, calculators, brand comparisons, protocol explainers, product shortlists, and installation planning tools.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SLockHub - Smart Lock Engineering Hub',
    description: 'Smart lock guides, calculators, protocols, brand comparisons, and product decision tools.',
    type: 'website',
    url: 'https://www.slockhub.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SLockHub - Smart Lock Engineering Hub',
    description: 'Research smart lock protocols, products, installation fit, signal reliability, and ownership cost.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'SLockHub.com',
      url: 'https://www.slockhub.com',
      logo: 'https://www.slockhub.com/favicon.svg',
      description: 'Comprehensive smart lock guides covering protocols, security, installation, troubleshooting, and real-world applications.',
    },
    {
      '@type': 'WebSite',
      name: 'SLockHub.com',
      url: 'https://www.slockhub.com',
    },
    {
      '@type': 'ItemList',
      name: 'Primary Smart Lock Research Paths',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Smart Lock Calculators', url: 'https://www.slockhub.com/calculators' },
        { '@type': 'ListItem', position: 2, name: 'Smart Lock Brands', url: 'https://www.slockhub.com/brands' },
        { '@type': 'ListItem', position: 3, name: 'Smart Lock Protocols', url: 'https://www.slockhub.com/protocols' },
        { '@type': 'ListItem', position: 4, name: 'Smart Lock Compare Hub', url: 'https://www.slockhub.com/compare' },
      ],
    },
  ],
}

const decisionHubs = [
  { href: '/calculators/compatibility', title: 'Check Door Fit', description: 'Start here if you are unsure whether a smart lock will fit your door.' },
  { href: '/calculators/protocol-wizard', title: 'Choose a Protocol', description: 'Pick Wi-Fi, Z-Wave, Zigbee, Thread, Bluetooth, or Matter by use case.' },
  { href: '/brands', title: 'Browse Brands', description: 'Compare brand catalogs, protocol support, and product depth.' },
  { href: '/compare', title: 'Compare Options', description: 'Move into brand-vs-brand and protocol comparison paths.' },
]

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero — Precision Engineering + Animated Mesh Gradient */}
      <section className="hero hero--mesh noise-overlay">
        {/* Animated Mesh Gradient Background */}
        <div aria-hidden="true" className="hero__mesh-container">
          <div className="hero__mesh-orb hero__mesh-orb--cyan" />
          <div className="hero__mesh-orb hero__mesh-orb--indigo" />
          <div className="hero__mesh-orb hero__mesh-orb--violet" />
        </div>

        <div className="container-main" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center" style={{ minHeight: '420px' }}>
            {/* Left — Text Content (60%) */}
            <div className="lg:col-span-3">
              <h1 className="hero__title">
                Smart Lock<br />Engineering Hub
              </h1>
              <p className="hero__subtitle" style={{ maxWidth: '32rem' }}>
                Technical guides, decision tools, and protocol documentation for access control systems
              </p>
              <div className="grid-actions" style={{ justifyContent: 'flex-start' }}>
                <Link href="/articles" className="btn btn-gradient btn-lg" style={{ borderRadius: 'var(--radius-lg)' }}>
                  <BookOpen className="w-5 h-5" /> Explore 70+ Expert Guides
                </Link>
                <Link href="/calculators" className="btn btn-glass btn-lg" style={{ borderRadius: 'var(--radius-lg)' }}>
                  <Calculator className="w-5 h-5" /> Calculate Costs &amp; Compare
                </Link>
              </div>
            </div>

            {/* Right — Floating Calculator Preview (40%) */}
            <div className="lg:col-span-2 hidden lg:block">
              <div className="glass-panel--dark gradient-stripe--top" style={{ padding: 'var(--space-xl)', position: 'relative' }}>
                <div className="tco-preview__label">
                  TCO Calculator Preview
                </div>
                <div className="tco-preview__value">
                  <span className="tco-preview__amount">$794</span>
                  <span className="tco-preview__period">over 5 years</span>
                </div>
                <div className="tco-preview__bars">
                  {[
                    { label: 'Hardware', value: '$600', pct: 76 },
                    { label: 'Hub/Gateway', value: '$80', pct: 10 },
                    { label: 'Battery', value: '$60', pct: 8 },
                    { label: 'Labor', value: '$54', pct: 6 },
                  ].map((item) => (
                    <div key={item.label} className="tco-preview__bar-row">
                      <span className="tco-preview__bar-label">{item.label}</span>
                      <div className="tco-preview__bar-track">
                        <div className="tco-preview__bar-fill" style={{ width: `${item.pct}%` }} />
                      </div>
                      <span className="tco-preview__bar-value">{item.value}</span>
                    </div>
                  ))}
                </div>
                <Link href="/calculators/lock-tco" className="btn btn-glass tco-preview__cta">
                  Open Full Calculator →
                </Link>
              </div>
            </div>
          </div>

          {/* Stats — Glassmorphism Mini Cards */}
          <div className="hero__stats stagger-reveal">
            {[
              { value: '70+', label: 'Technical Articles' },
              { value: '32', label: 'Interactive Tools' },
              { value: '7', label: 'Topic Categories' },
              { value: '100%', label: 'Free & Open' },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                <div className="hero__stat-value">
                  {stat.value}
                </div>
                <div className="hero__stat-label">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm section-alt">
        <div className="container-main">
          <h2 className="section-title section-title--center">Start by Decision Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {decisionHubs.map((item) => (
              <Link key={item.href} href={item.href} className="link-card">
                <h3 className="link-card__title">{item.title}</h3>
                <p className="link-card__desc">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Base Categories */}
      <section className="section">
        <div className="container-main">
          <h2 className="section-title section-title--center">Knowledge Base</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/articles/${category.slug}`}
                className="icon-card"
              >
                <div className="icon-card__icon">{category.icon}</div>
                <h3 className="icon-card__title text-lg">{category.name}</h3>
                <p className="icon-card__desc">{category.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/articles" className="btn btn-ghost">
              View All Articles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Calculators */}
      <section className="section-sm section-alt">
        <div className="container-main">
          <h2 className="section-title section-title--center">Interactive Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="icon-card icon-card--horizontal group"
              >
                <div className="icon-card__icon">{calc.icon}</div>
                <div className="flex-1">
                  <h3 className="icon-card__title">{calc.name}</h3>
                  <p className="icon-card__desc">{calc.description}</p>
                </div>
                <svg className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform text-color-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/calculators" className="btn btn-ghost">
              View All 32 Calculators
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const categories = [
  { name: 'Protocols', slug: 'protocols', icon: <Radio className="w-8 h-8" />, description: 'Z-Wave, Zigbee, Matter protocols' },
  { name: 'Security', slug: 'security', icon: <Lock className="w-8 h-8" />, description: 'Security analysis & best practices' },
  { name: 'Installation', slug: 'installation', icon: <Battery className="w-8 h-8" />, description: 'Battery & installation guides' },
  { name: 'Guides', slug: 'guides', icon: <Wrench className="w-8 h-8" />, description: 'Troubleshooting & problem solving' },
  { name: 'Use Cases', slug: 'use-cases', icon: <Building2 className="w-8 h-8" />, description: 'Real-world applications' },
  { name: 'Resources', slug: 'resources', icon: <Lightbulb className="w-8 h-8" />, description: 'Guides, templates & references' },
  { name: 'Integration', slug: 'integration', icon: <LinkIcon className="w-8 h-8" />, description: 'System integration & APIs' },
]

const calculators = [
  { name: 'TCO Calculator', slug: 'lock-tco', icon: <DollarSign className="w-7 h-7" />, description: 'Calculate total cost of ownership over multiple years' },
  { name: 'Battery Life Calculator', slug: 'battery-life', icon: <Battery className="w-7 h-7" />, description: 'Estimate how long your smart lock batteries will last' },
  { name: 'Protocol Selection Wizard', slug: 'protocol-wizard', icon: <Wand2 className="w-7 h-7" />, description: 'Get personalized protocol recommendations' },
  { name: 'Signal Strength Analyzer', slug: 'signal-strength', icon: <Signal className="w-7 h-7" />, description: "Analyze and optimize your lock's wireless signal" },
]
