import Link from 'next/link'
import type { Metadata } from 'next'
import {
  BookOpen, Calculator, Radio, Lock, Battery, Wrench,
  Building2, Lightbulb, Link as LinkIcon, DollarSign,
  Wand2, Signal
} from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SLockHub.com',
    url: 'https://www.slockhub.com',
    logo: 'https://www.slockhub.com/favicon.svg',
    description: 'Comprehensive smart lock guides covering protocols, security, installation, troubleshooting, and real-world applications.',
    sameAs: [],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SLockHub.com',
    url: 'https://www.slockhub.com',
  },
]

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero — Industrial Authority + SVG Topology */}
      <section className="hero hero--topo hero--left">
        {/* SVG Topology Background */}
        <div className="hero__topo-bg" aria-hidden="true">
          <svg viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            {/* Network nodes */}
            <circle cx="180" cy="120" r="6" fill="#22d3ee" />
            <circle cx="420" cy="80" r="4" fill="#22d3ee" />
            <circle cx="650" cy="160" r="8" fill="#22d3ee" />
            <circle cx="900" cy="100" r="5" fill="#22d3ee" />
            <circle cx="1050" cy="200" r="6" fill="#22d3ee" />
            <circle cx="300" cy="280" r="5" fill="#22d3ee" />
            <circle cx="550" cy="350" r="7" fill="#22d3ee" />
            <circle cx="780" cy="300" r="4" fill="#22d3ee" />
            <circle cx="1000" cy="380" r="6" fill="#22d3ee" />
            <circle cx="150" cy="400" r="4" fill="#22d3ee" />

            {/* Connection lines */}
            <line x1="180" y1="120" x2="420" y2="80" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
            <line x1="420" y1="80" x2="650" y2="160" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
            <line x1="650" y1="160" x2="900" y2="100" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
            <line x1="900" y1="100" x2="1050" y2="200" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
            <line x1="180" y1="120" x2="300" y2="280" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
            <line x1="300" y1="280" x2="550" y2="350" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
            <line x1="550" y1="350" x2="780" y2="300" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
            <line x1="780" y1="300" x2="1000" y2="380" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
            <line x1="650" y1="160" x2="550" y2="350" stroke="#22d3ee" strokeWidth="1" opacity="0.2" />
            <line x1="420" y1="80" x2="300" y2="280" stroke="#22d3ee" strokeWidth="1" opacity="0.2" />
            <line x1="900" y1="100" x2="780" y2="300" stroke="#22d3ee" strokeWidth="1" opacity="0.2" />
            <line x1="1050" y1="200" x2="1000" y2="380" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
            <line x1="150" y1="400" x2="300" y2="280" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
            <line x1="150" y1="400" x2="550" y2="350" stroke="#22d3ee" strokeWidth="1" opacity="0.2" />

            {/* Lock icon (simplified keyhole) */}
            <g transform="translate(640, 140)" opacity="0.6">
              <rect x="-14" y="-4" width="28" height="22" rx="3" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
              <path d="M0-4 L0-14 A10 10 0 0 1 10-14 A10 10 0 0 1 10-4" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
              <circle cx="0" cy="8" r="3" fill="#22d3ee" opacity="0.5" />
            </g>

            {/* Secondary lock icon */}
            <g transform="translate(300, 270) scale(0.7)" opacity="0.4">
              <rect x="-14" y="-4" width="28" height="22" rx="3" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
              <path d="M0-4 L0-14 A10 10 0 0 1 10-14 A10 10 0 0 1 10-4" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
            </g>

            {/* Signal waves (radio) */}
            <g transform="translate(900, 95)" opacity="0.4">
              <path d="M5-8 A12 12 0 0 1 5 8" stroke="#22d3ee" strokeWidth="1" fill="none" />
              <path d="M9-12 A18 18 0 0 1 9 12" stroke="#22d3ee" strokeWidth="1" fill="none" />
            </g>
          </svg>
        </div>

        <div className="container-main">
          <div className="max-w-3xl">
            <h1 className="hero__title">
              Smart Lock<br />Engineering Hub
            </h1>
            <p className="hero__subtitle">
              Technical guides, decision tools, and protocol documentation for access control systems
            </p>
            <div className="grid-actions">
              <Link href="/articles" className="btn btn-primary btn-lg">
                <BookOpen className="w-5 h-5" /> Browse Knowledge Base
              </Link>
              <Link href="/calculators" className="btn btn-secondary btn-lg">
                <Calculator className="w-5 h-5" /> Try Calculators
              </Link>
            </div>
          </div>

          {/* Inline Stats */}
          <div className="hero__stats">
            <div>
              <div className="hero__stat-value">49+</div>
              <div className="hero__stat-label">Technical Articles</div>
            </div>
            <div>
              <div className="hero__stat-value">15</div>
              <div className="hero__stat-label">Interactive Tools</div>
            </div>
            <div>
              <div className="hero__stat-value">7</div>
              <div className="hero__stat-label">Topic Categories</div>
            </div>
            <div>
              <div className="hero__stat-value">100%</div>
              <div className="hero__stat-label">Free & Open</div>
            </div>
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
                <svg className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-text-muted)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/calculators" className="btn btn-ghost">
              View All 15 Calculators
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
  { name: 'Support', slug: 'support', icon: <Lightbulb className="w-8 h-8" />, description: 'Quick support & how-to' },
  { name: 'Integration', slug: 'integration', icon: <LinkIcon className="w-8 h-8" />, description: 'System integration & APIs' },
]

const calculators = [
  { name: 'TCO Calculator', slug: 'lock-tco', icon: <DollarSign className="w-7 h-7" />, description: 'Calculate total cost of ownership over multiple years' },
  { name: 'Battery Life Calculator', slug: 'battery-life', icon: <Battery className="w-7 h-7" />, description: 'Estimate how long your smart lock batteries will last' },
  { name: 'Protocol Selection Wizard', slug: 'protocol-wizard', icon: <Wand2 className="w-7 h-7" />, description: 'Get personalized protocol recommendations' },
  { name: 'Signal Strength Analyzer', slug: 'signal-strength', icon: <Signal className="w-7 h-7" />, description: "Analyze and optimize your lock's wireless signal" },
]
