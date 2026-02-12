import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ClipboardList, Shield, CheckCircle, Wrench, AlertTriangle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resources - Smart Lock Hub',
  description: 'Curated resources, tools, and references for smart lock technology.',
  alternates: { canonical: '/resources' },
}

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
  return (
    <div className="page-bg">
      <div className="container-main section">
        <div className="max-w-6xl mx-auto">
          <div className="page-header">
            <h1 className="page-header__title">Resources</h1>
            <p className="page-header__subtitle">
              Curated collection of standards, tools, and references for smart lock professionals
            </p>
          </div>

          {/* External Resources */}
          <div style={{ marginBottom: 'var(--space-4xl)' }}>
            <h2 className="section-title">External References</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {sections.map(section => (
                <div key={section.title} className="content-card">
                  <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-lg)' }}>
                    <span style={{ color: 'var(--color-accent)' }}>{section.icon}</span>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{section.title}</h3>
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
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', marginTop: 'var(--space-sm)' }}>Visit website →</div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Our Tools */}
          <div style={{ marginBottom: 'var(--space-4xl)' }}>
            <h2 className="section-title">Our Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tools.map(tool => (
                <Link key={tool.name} href={tool.url} className="link-card">
                  <div className="flex items-start justify-between" style={{ marginBottom: 'var(--space-sm)' }}>
                    <h3 className="link-card__title" style={{ fontSize: '1.25rem' }}>{tool.name}</h3>
                    <span className="badge badge-accent">{tool.category}</span>
                  </div>
                  <p className="link-card__desc">{tool.description}</p>
                  <div style={{ color: 'var(--color-accent)', fontWeight: 600, marginTop: 'var(--space-sm)' }}>
                    {tool.url.startsWith('/') ? 'Use Tool' : 'Visit'} →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="cta-section" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2 className="cta-section__title">Our Knowledge Base</h2>
            <p className="cta-section__subtitle">
              49+ comprehensive articles covering all aspects of smart lock technology
            </p>
            <div className="grid md:grid-cols-3 gap-4" style={{ textAlign: 'left' }}>
              <Link href="/articles/protocols" className="link-card" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--color-text-inverse)' }}>
                <div style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Protocols</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Z-Wave, Zigbee, Thread, Matter</div>
              </Link>
              <Link href="/articles/security" className="link-card" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--color-text-inverse)' }}>
                <div style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Security</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Encryption, vulnerabilities, best practices</div>
              </Link>
              <Link href="/articles/installation" className="link-card" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--color-text-inverse)' }}>
                <div style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Installation</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Setup guides and battery tips</div>
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="callout callout-warning">
            <p className="callout-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
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
  )
}
