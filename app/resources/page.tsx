import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ClipboardList, Shield, CheckCircle, Wrench, AlertTriangle,
  BookOpen, Table2, Ruler, GitFork
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Smart Lock Resources — Professional Guides, Tables & Diagrams | SLockHub',
  description: 'Professional smart lock resources: glossary of 45+ terms, protocol comparison tables, SVG installation diagrams, and interactive buying guide flowcharts.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Smart Lock Resources',
    description: 'Glossaries, tables, diagrams, buying guides, and planning tools for smart lock decisions.',
    type: 'website',
    url: 'https://www.slockhub.com/resources',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Lock Resources',
    description: 'Use glossaries, reference tables, diagrams, and buying guides to support product and protocol decisions.',
  },
}

const professionalResources = [
  {
    title: 'Glossary',
    description: '45+ industry terms with professional SVG diagrams. Searchable by category.',
    href: '/resources/glossary',
    icon: <BookOpen className="w-8 h-8" />,
    badge: '45+ terms',
  },
  {
    title: 'Reference Tables',
    description: 'Protocol, grade, battery, and encryption comparison tables.',
    href: '/resources/reference-tables',
    icon: <Table2 className="w-8 h-8" />,
    badge: '5 tables',
  },
  {
    title: 'Installation Diagrams',
    description: 'SVG diagrams for door anatomy, lock components, wiring, and measurements.',
    href: '/resources/installation-guides',
    icon: <Ruler className="w-8 h-8" />,
    badge: '5 diagrams',
  },
  {
    title: 'Buying Guide',
    description: 'Interactive decision flowcharts for protocol and lock type selection.',
    href: '/resources/buying-guide',
    icon: <GitFork className="w-8 h-8" />,
    badge: 'Interactive',
  },
]

const sections = [
  {
    title: 'Industry Standards',
    icon: <ClipboardList className="w-8 h-8" />,
    resources: [
      { name: 'Z-Wave Alliance', description: 'Official Z-Wave certification and standards', url: 'https://z-wavealliance.org' },
      { name: 'Zigbee Alliance (CSA)', description: 'Connectivity Standards Alliance resources', url: 'https://csa-iot.org' },
      { name: 'Thread Group', description: 'Thread protocol specifications', url: 'https://threadgroup.org' },
      { name: 'Matter', description: 'Matter smart home standard', url: 'https://buildwithmatter.com' },
    ],
  },
  {
    title: 'Security References',
    icon: <Shield className="w-8 h-8" />,
    resources: [
      { name: 'NIST Cybersecurity', description: 'IoT security guidelines', url: 'https://www.nist.gov/cyberframework' },
      { name: 'OWASP IoT', description: 'IoT security best practices', url: 'https://owasp.org/www-project-internet-of-things/' },
      { name: 'Common Criteria', description: 'Security certification standards', url: 'https://commoncriteriaportal.org' },
    ],
  },
  {
    title: 'Testing & Certification',
    icon: <CheckCircle className="w-8 h-8" />,
    resources: [
      { name: 'UL IoT Security', description: 'Product safety certification', url: 'https://ul.com' },
      { name: 'ANSI/BHMA', description: 'Door hardware standards', url: 'https://www.buildershardware.com' },
      { name: 'FCC Database', description: 'RF device certifications', url: 'https://fccid.io' },
    ],
  },
  {
    title: 'Developer Tools',
    icon: <Wrench className="w-8 h-8" />,
    resources: [
      { name: 'Home Assistant', description: 'Open-source home automation', url: 'https://www.home-assistant.io' },
      { name: 'OpenHAB', description: 'Vendor-agnostic automation', url: 'https://www.openhab.org' },
      { name: 'MQTT', description: 'IoT messaging protocol', url: 'https://mqtt.org' },
    ],
  },
]

const tools = [
  {
    name: 'Protocol Analyzer',
    description: 'Wireshark for IoT protocol debugging',
    category: 'Development',
    url: 'https://www.wireshark.org',
  },
  {
    name: 'RF Signal Meter',
    description: 'Measure wireless signal strength',
    category: 'Installation',
    url: '/calculators/signal-strength',
  },
  {
    name: 'Battery Calculator',
    description: 'Estimate battery replacement schedules',
    category: 'Planning',
    url: '/calculators/battery-life',
  },
  {
    name: 'TCO Calculator',
    description: 'Total cost of ownership analysis',
    category: 'Planning',
    url: '/calculators/lock-tco',
  },
]

export default function Resources() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Smart Lock Resources',
    description: 'Professional reference resources, diagrams, tables, and buying guides for smart lock research.',
    url: 'https://www.slockhub.com/resources',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: professionalResources.length + tools.length,
      itemListElement: [
        ...professionalResources.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.title,
          url: `https://www.slockhub.com${item.href}`,
        })),
        ...tools.map((tool, index) => ({
          '@type': 'ListItem',
          position: professionalResources.length + index + 1,
          name: tool.name,
          url: tool.url.startsWith('/') ? `https://www.slockhub.com${tool.url}` : tool.url,
        })),
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <div className="page-bg">
        <div className="container-main section">
        <div className="max-w-6xl mx-auto">
          <div className="page-header">
            <h1 className="page-header__title">Resources</h1>
            <p className="page-header__subtitle">
              Professional guides, reference tables, SVG diagrams, and decision tools for smart lock experts
            </p>
          </div>

          <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2 className="section-title">Use Resources by Decision Stage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>Learn the terminology</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>Start with definitions, protocol basics, and physical door anatomy before comparing products.</p>
                <Link href="/resources/glossary" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Open glossary</Link>
              </div>
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>Validate measurements and specs</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>Use diagrams and reference tables to confirm door prep, security grades, protocol tradeoffs, and battery expectations.</p>
                <Link href="/resources/reference-tables" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Open reference tables</Link>
              </div>
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>Move into calculators</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>After research, route directly into signal, compatibility, battery, and TCO tools.</p>
                <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Open calculators</Link>
              </div>
            </div>
          </section>

          {/* Professional Resources */}
          <div className="mb-24">
            <h2 className="section-title">Professional Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {professionalResources.map(item => (
                <Link key={item.title} href={item.href} className="icon-card">
                  <div className="flex items-center justify-between mb-3">
                    <span className="icon-card__icon">{item.icon}</span>
                    <span className="badge badge-accent">{item.badge}</span>
                  </div>
                  <h3 className="icon-card__title text-xl">{item.title}</h3>
                  <p className="icon-card__desc">{item.description}</p>
                  <div className="text-sm font-semibold mt-3" style={{ color: 'var(--color-accent)' }}>
                    Explore →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* External Resources */}
          <div className="mb-24">
            <h2 className="section-title">External References</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {sections.map(section => (
                <div key={section.title} className="content-card">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-color-accent">{section.icon}</span>
                    <h3 className="text-2xl font-bold text-color-primary">{section.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {section.resources.map(resource => (
                      <li key={resource.name}>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-card"
                        >
                          <div className="link-card__title">{resource.name}</div>
                          <div className="link-card__desc">{resource.description}</div>
                          <div className="text-xs text-color-accent mt-2 font-semibold">Visit website →</div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Our Tools */}
          <div className="mb-24">
            <h2 className="section-title">Our Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tools.map(tool => (
                <Link key={tool.name} href={tool.url} className="link-card">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="link-card__title text-xl">{tool.name}</h3>
                    <span className="badge badge-accent">{tool.category}</span>
                  </div>
                  <p className="link-card__desc">{tool.description}</p>
                  <div className="text-color-accent font-semibold mt-2">
                    {tool.url.startsWith('/') ? 'Use Tool' : 'Visit'} →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="cta-section mb-16">
            <h2 className="cta-section__title">Our Knowledge Base</h2>
            <p className="cta-section__subtitle">
              49+ comprehensive articles covering all aspects of smart lock technology
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <Link href="/articles/protocols" className="link-card bg-white/10 border-0 text-color-inverse hover:bg-white/20">
                <div className="font-semibold mb-1">Protocols</div>
                <div className="text-sm opacity-80">Z-Wave, Zigbee, Thread, Matter</div>
              </Link>
              <Link href="/articles/security" className="link-card bg-white/10 border-0 text-color-inverse hover:bg-white/20">
                <div className="font-semibold mb-1">Security</div>
                <div className="text-sm opacity-80">Encryption, vulnerabilities, best practices</div>
              </Link>
              <Link href="/articles/installation" className="link-card bg-white/10 border-0 text-color-inverse hover:bg-white/20">
                <div className="font-semibold mb-1">Installation</div>
                <div className="text-sm opacity-80">Setup guides and battery tips</div>
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="callout callout-warning">
            <p className="callout-title flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Disclaimer
            </p>
            <p>
              External links are provided for reference only. We are not affiliated with these organizations
              and do not endorse specific products or services. Always verify information with official sources.
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
