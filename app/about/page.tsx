import Link from 'next/link'
import type { Metadata } from 'next'
import {
  BookOpen, Calculator, Shield, Wrench, Building2, Globe,
  Wifi, Lock, Key, Cpu, Info
} from 'lucide-react'
import { calculatorCount } from '@/lib/calculators/catalog'

export const metadata: Metadata = {
  title: 'About SLockHub | Smart Lock Guides, Tools & Product Research',
  description: 'Use SLockHub to compare smart lock door fit, protocols, battery life, cost, security risk, and product data.',
  alternates: { canonical: '/about' },
}


export default function AboutPage() {
  return (
    <div className="page-wrapper-alt">
      <div className="container-main section">
        {/* Header */}
        <div className="page-header">
          <div className="page-header__icon">
            <Info className="w-10 h-10" />
          </div>
          <h1 className="page-header__title">About SLockHub.com</h1>
          <p className="page-header__subtitle">
            Smart lock fit, protocol, cost, and security research tools
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="card-elevated" style={{ padding: 'var(--space-2xl)' }}>
          <h2 className="section-title section-title--center">Buyers, Installers, Operators</h2>
            <p className="text-center" style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', lineHeight: '1.75' }}>
              SLockHub helps property managers, installers, security teams, and homeowners compare door fit,
              protocols, battery life, signal range, cost, and access risk before choosing a smart lock.
            </p>
          </div>
        </div>

        {/* Guides, Tools, Comparisons */}
        <div className="mb-16">
          <h2 className="section-title section-title--center">Guides, Tools, Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: 'Smart Lock Guides',
                desc: '70+ in-depth articles covering protocols, security, installation, troubleshooting, and real-world applications'
              },
              {
                icon: <Calculator className="w-8 h-8" />,
                title: 'Interactive Calculators',
                desc: `${calculatorCount} specialized tools to estimate battery life, calculate costs, check compatibility, and plan installations`
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Expert Guidance',
                desc: 'Protocol comparisons, brand reviews, and industry best practices to help you choose the right solution'
              },
            ].map((item) => (
              <div key={item.title} className="card card-hover">
                <div className="feature-item__icon feature-item__icon--accent feature-item__icon--lg" style={{ marginBottom: 'var(--space-md)' }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="content-card mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '70+', label: 'Articles' },
              { value: String(calculatorCount), label: 'Calculators' },
              { value: '7', label: 'Categories' },
              { value: '6+', label: 'Protocols' },
            ].map((stat) => (
              <div key={stat.label} className="stat-block">
                <div className="stat-block__value">{stat.value}</div>
                <div className="stat-block__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Topics We Cover */}
        <div className="mb-16">
          <h2 className="section-title section-title--center">Protocols, Security, Installation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: <Wifi className="w-5 h-5" />, label: 'Wireless Protocols' },
              { icon: <Lock className="w-5 h-5" />, label: 'Security Analysis' },
              { icon: <Key className="w-5 h-5" />, label: 'Access Management' },
              { icon: <Wrench className="w-5 h-5" />, label: 'Installation & Setup' },
              { icon: <Building2 className="w-5 h-5" />, label: 'Commercial Deployments' },
              { icon: <Cpu className="w-5 h-5" />, label: 'Smart Home Integration' },
              { icon: <Shield className="w-5 h-5" />, label: 'Privacy & Compliance' },
              { icon: <Globe className="w-5 h-5" />, label: 'Industry Standards' },
              { icon: <Calculator className="w-5 h-5" />, label: 'Cost & ROI Analysis' },
            ].map((topic) => (
              <div key={topic.label} className="flex items-center gap-3 card" style={{ padding: 'var(--space-md) var(--space-lg)' }}>
                <span style={{ color: 'var(--color-accent)' }}>{topic.icon}</span>
                <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{topic.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="section-title section-title--center">Data, Calculators, References</h2>
          <div className="max-w-4xl mx-auto">
            <div className="card" style={{ padding: 'var(--space-xl)' }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { name: 'Next.js 14', desc: 'React Framework' },
                  { name: 'Vercel', desc: 'Edge Deployment' },
                  { name: 'TypeScript', desc: 'Type Safety' },
                  { name: 'Tailwind', desc: 'CSS Framework' },
                ].map((tech) => (
                  <div key={tech.name}>
                    <p className="font-bold" style={{ color: 'var(--color-text-primary)' }}>{tech.name}</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{tech.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <h2 className="cta-section__title">Door Fit, Cost, Signal</h2>
          <p className="cta-section__subtitle">
            Use calculators and guide hubs for the first decision pass.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/articles" className="btn btn-primary btn-lg" prefetch={false}>Browse Articles</Link>
            <Link href="/calculators" className="btn btn-secondary btn-lg" prefetch={false}>Try Calculators</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
