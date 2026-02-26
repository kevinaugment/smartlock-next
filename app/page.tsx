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
      {/* Hero — Precision Engineering + Animated Mesh Gradient */}
      <section className="hero hero--mesh noise-overlay" style={{ background: 'var(--color-bg-dark)' }}>
        {/* Animated Mesh Gradient Background */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          {/* Light Orb 1 — Cyan */}
          <div style={{
            position: 'absolute', top: '10%', left: '15%', width: '500px', height: '500px',
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)',
            filter: 'blur(120px)', animation: 'meshFloat1 12s ease-in-out infinite',
          }} />
          {/* Light Orb 2 — Indigo */}
          <div style={{
            position: 'absolute', top: '30%', right: '10%', width: '450px', height: '450px',
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
            filter: 'blur(120px)', animation: 'meshFloat2 15s ease-in-out infinite',
          }} />
          {/* Light Orb 3 — Violet accent */}
          <div style={{
            position: 'absolute', bottom: '5%', left: '40%', width: '350px', height: '350px',
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
            filter: 'blur(120px)', animation: 'meshFloat3 10s ease-in-out infinite',
          }} />
        </div>

        <div className="container-main" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center" style={{ minHeight: '420px' }}>
            {/* Left — Text Content (60%) */}
            <div className="lg:col-span-3">
              <h1 className="hero__title" style={{ letterSpacing: '-0.03em' }}>
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
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-mono)' }}>
                  TCO Calculator Preview
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    $794
                  </span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>over 5 years</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  {[
                    { label: 'Hardware', value: '$600', pct: 76 },
                    { label: 'Hub/Gateway', value: '$80', pct: 10 },
                    { label: 'Battery', value: '$60', pct: 8 },
                    { label: 'Labor', value: '$54', pct: 6 },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', fontSize: '0.8125rem' }}>
                      <span style={{ width: '5rem', color: 'var(--color-text-muted)' }}>{item.label}</span>
                      <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: `${item.pct}%`, height: '100%', background: 'var(--gradient-brand)', borderRadius: '99px' }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-inverse)', fontWeight: 600, width: '3rem', textAlign: 'right' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <Link href="/calculators/lock-tco" className="btn btn-glass" style={{ width: '100%', marginTop: 'var(--space-lg)', textAlign: 'center', justifyContent: 'center', fontSize: '0.8125rem' }}>
                  Open Full Calculator →
                </Link>
              </div>
            </div>
          </div>

          {/* Stats — Glassmorphism Mini Cards */}
          <div className="stagger-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-md)', marginTop: 'var(--space-3xl)' }}>
            {[
              { value: '70+', label: 'Technical Articles' },
              { value: '32', label: 'Interactive Tools' },
              { value: '7', label: 'Topic Categories' },
              { value: '100%', label: 'Free & Open' },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-accent)', lineHeight: 1, marginBottom: 'var(--space-xs)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
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
