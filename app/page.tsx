import Link from 'next/link'
import type { Metadata } from 'next'
import {
  BookOpen, Calculator, Radio, Lock, Battery, Wrench,
  Building2, Lightbulb, Link as LinkIcon, DollarSign,
  Wand2, Signal, DoorOpen, ShieldCheck, Home, Database
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Smart Lock Fit, Protocol & Cost Tools | SLockHub',
  description: 'Plan a smart lock purchase with calculators and guides for door compatibility, protocol choice, battery life, signal range, security, and cost.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Smart Lock Fit, Protocol & Cost Tools',
    description: 'Smart lock calculators and guides for compatibility, protocol choice, battery life, signal range, security, and cost.',
    type: 'website',
    url: 'https://www.slockhub.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Lock Fit, Protocol & Cost Tools',
    description: 'Validate door fit, protocol, signal reliability, battery life, security, and ownership cost.',
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
      description: 'Independent smart lock planning tools, calculators, reference data, and buying decision guides.',
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
  { href: '/calculators/compatibility', title: 'Will this lock fit my door?', description: 'Check thickness, bore, backset, material, and install risk before buying.', icon: <DoorOpen className="w-5 h-5" /> },
  { href: '/calculators/protocol-wizard', title: 'Which protocol should I use?', description: 'Choose Wi-Fi, Z-Wave, Zigbee, Thread, Bluetooth, or Matter by use case.', icon: <Wand2 className="w-5 h-5" /> },
  { href: '/calculators/battery-life', title: 'How long will batteries last?', description: 'Estimate runtime by protocol, usage, temperature, and battery chemistry.', icon: <Battery className="w-5 h-5" /> },
  { href: '/calculators/lock-tco', title: 'What will this cost over time?', description: 'Model hardware, installation, hubs, batteries, subscriptions, and maintenance.', icon: <DollarSign className="w-5 h-5" /> },
]

const problemRoutes = [
  { href: '/calculators/signal-strength', label: 'Weak signal or offline lock', icon: <Signal className="w-5 h-5" /> },
  { href: '/calculators/security-compliance', label: 'Security and compliance check', icon: <ShieldCheck className="w-5 h-5" /> },
  { href: '/articles/use-cases/smart-locks-airbnb-complete-guide', label: 'Airbnb or rental workflow', icon: <Home className="w-5 h-5" /> },
  { href: '/resources/reference-tables', label: 'Reference tables and specs', icon: <Database className="w-5 h-5" /> },
]

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="home-hero">
        <div className="container-main">
          <div className="home-hero__grid">
            <div>
              <div className="tool-eyebrow">Smart lock decision tools</div>
              <h1 className="hero__title">Calculate smart lock fit, battery, protocol, and cost before buying</h1>
              <p className="hero__subtitle">
                SLockHub is an independent tool site for smart lock decisions. Start with a calculator, verify the assumptions, then compare models with fewer surprises.
              </p>
              <div className="grid-actions home-hero__actions">
                <Link href="/calculators" className="btn btn-primary btn-lg" prefetch={false}>
                  <Calculator className="w-5 h-5" /> Open Calculators
                </Link>
                <Link href="/calculators/compatibility" className="btn btn-secondary btn-lg" prefetch={false}>
                  <DoorOpen className="w-5 h-5" /> Check Door Fit
                </Link>
                <Link href="/calculators/protocol-wizard" className="btn btn-ghost btn-lg" prefetch={false}>
                  <Wand2 className="w-5 h-5" /> Choose Protocol
                </Link>
              </div>
            </div>

            <aside className="home-hero__panel" aria-label="Primary checks">
              <div className="tool-eyebrow">Start with the problem</div>
              {decisionHubs.map((item) => (
                <Link key={item.href} href={item.href} className="home-check-row" prefetch={false}>
                  <span>{item.icon}{item.title}</span>
                  <small>{item.description}</small>
                </Link>
              ))}
            </aside>
          </div>

          <div className="home-metrics">
            {[
              { value: 'Tool-first', label: 'Independent planning site' },
              { value: '32', label: 'Interactive Tools' },
              { value: '119', label: 'Supporting Guides' },
              { value: 'Free', label: 'No account required' },
            ].map((stat) => (
              <div key={stat.label} className="home-metric">
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

      <section className="section-sm section-alt home-decision-section">
        <div className="container-main">
          <h2 className="section-title section-title--center">Choose the Next Tool</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {decisionHubs.map((item) => (
              <Link key={item.href} href={item.href} className="link-card" prefetch={false}>
                <div style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-sm)' }}>{item.icon}</div>
                <h3 className="link-card__title">{item.title}</h3>
                <p className="link-card__desc">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container-main">
          <div className="home-tool-router">
            <div>
              <div className="tool-eyebrow">More entry points</div>
              <h2 className="section-title">Route by search intent</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '42rem' }}>
                Use tools for decisions, reference tables for specifications, and guides for context. SLockHub is not a lock manufacturer or official brand site.
              </p>
            </div>
            <div className="home-problem-grid">
              {problemRoutes.map((item) => (
                <Link key={item.href} href={item.href} className="home-problem-link" prefetch={false}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Smart Lock Guide Categories */}
      <section className="section">
        <div className="container-main">
          <h2 className="section-title section-title--center">Guides That Support the Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/articles/${category.slug}`}
                className="icon-card"
               prefetch={false}>
                <div className="icon-card__icon">{category.icon}</div>
                <h3 className="icon-card__title text-lg">{category.name}</h3>
                <p className="icon-card__desc">{category.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/articles" className="btn btn-ghost" prefetch={false}>
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
          <h2 className="section-title section-title--center">Cost, Signal, Battery Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="icon-card icon-card--horizontal group"
               prefetch={false}>
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
            <Link href="/calculators" className="btn btn-ghost" prefetch={false}>
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
