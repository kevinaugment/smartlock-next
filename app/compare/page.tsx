import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, Radio, Wifi, Home, Zap, CheckCircle, XCircle, GitCompareArrows
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Protocol Comparison - SLockHub.com',
  description: 'Compare Z-Wave, Zigbee, Wi-Fi, and Thread smart lock protocols side-by-side. Detailed specs on range, battery life, latency, security, and pricing.',
  alternates: { canonical: '/compare' },
  openGraph: {
    title: 'Protocol Comparison - SLockHub.com',
    description: 'Compare Z-Wave, Zigbee, Wi-Fi, and Thread smart lock protocols side-by-side.',
    siteName: 'SLockHub.com',
    type: 'website',
  },
}

const protocols = [
  {
    name: 'Z-Wave',
    frequency: '908 MHz',
    range: '40m',
    batteryLife: '12 months',
    latency: '<100ms',
    maxNodes: '232',
    security: 'S2 AES-128',
    hubRequired: 'Yes',
    price: '$$',
    color: 'zwave' as const,
    pros: ['Low power consumption', 'No WiFi interference', 'Excellent mesh routing', 'Dedicated frequency band'],
    cons: ['Hub required', 'Limited bandwidth', 'Lower node density', 'Proprietary protocol'],
  },
  {
    name: 'Zigbee',
    frequency: '2.4 GHz',
    range: '20m',
    batteryLife: '18 months',
    latency: '<50ms',
    maxNodes: '65,000',
    security: 'AES-128',
    hubRequired: 'Yes',
    price: '$',
    color: 'zigbee' as const,
    pros: ['Massive node support', 'Low power', 'Fast response', 'Cost-effective'],
    cons: ['WiFi interference potential', 'Hub required', 'Shorter range', 'Complex mesh management'],
  },
  {
    name: 'Wi-Fi',
    frequency: '2.4/5 GHz',
    range: '30m',
    batteryLife: '6 months',
    latency: '<200ms',
    maxNodes: 'Varies',
    security: 'WPA3',
    hubRequired: 'No',
    price: '$$$',
    color: 'wifi' as const,
    pros: ['No hub needed', 'Easy setup', 'Remote access built-in', 'Wide compatibility'],
    cons: ['High power consumption', 'Network congestion', 'Shorter battery life', 'Security concerns'],
  },
  {
    name: 'Thread',
    frequency: '2.4 GHz',
    range: '30m',
    batteryLife: '12+ months',
    latency: '<50ms',
    maxNodes: '250+',
    security: 'DTLS',
    hubRequired: 'Border Router',
    price: '$$',
    color: 'thread' as const,
    pros: ['Matter compatible', 'Self-healing mesh', 'Low power', 'IP-based'],
    cons: ['Newer technology', 'Limited devices', 'Border router needed', 'Evolving standard'],
  },
]

const comparisonRows = [
  { label: 'Frequency', key: 'frequency' as const },
  { label: 'Range', key: 'range' as const },
  { label: 'Battery Life', key: 'batteryLife' as const },
  { label: 'Latency', key: 'latency' as const },
  { label: 'Max Nodes', key: 'maxNodes' as const },
  { label: 'Security', key: 'security' as const },
  { label: 'Hub Required', key: 'hubRequired' as const },
  { label: 'Price Range', key: 'price' as const },
]

const protocolColors = {
  zwave: 'text-protocol-zwave',
  zigbee: 'text-protocol-zigbee',
  wifi: 'text-protocol-wifi',
  thread: 'text-protocol-thread',
}

export default function ComparePage() {
  return (
    <div className="page-wrapper-alt">
      <div className="container-main section">
        {/* Header */}
        <div className="page-header">
          <div className="page-header__icon">
            <GitCompareArrows className="w-10 h-10" />
          </div>
          <h1 className="page-header__title">Protocol Comparison</h1>
          <p className="page-header__subtitle">
            Compare smart lock communication protocols side-by-side to find the best fit for your needs
          </p>
        </div>

        {/* Quick Decision Guide */}
        <div className="mb-16">
          <h2 className="section-title section-title--center">Quick Decision Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: 'Best Battery Life', a: 'Zigbee — up to 18 months', protocol: 'zigbee' as const },
              { q: 'Easiest Setup', a: 'Wi-Fi — no hub required', protocol: 'wifi' as const },
              { q: 'Most Reliable', a: 'Z-Wave — dedicated frequency', protocol: 'zwave' as const },
              { q: 'Future-Proof', a: 'Thread — Matter compatible', protocol: 'thread' as const },
            ].map((item) => (
              <div key={item.q} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                <div style={{ color: 'var(--color-accent)', marginTop: '2px' }}>
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>{item.q}</h3>
                  <p className={`text-sm font-medium ${protocolColors[item.protocol]}`}>
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="section-title">Detailed Comparison</h2>
          <div className="card overflow-hidden" style={{ padding: 0 }}>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    {protocols.map((p) => (
                      <th key={p.name} className={protocolColors[p.color]}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.key}>
                      <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {row.label}
                      </td>
                      {protocols.map((p) => (
                        <td key={p.name} className="mono-value" style={{ fontSize: '0.875rem' }}>
                          {p[row.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="mb-16">
          <h2 className="section-title section-title--center">Pros & Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protocols.map((protocol) => (
              <div key={protocol.name} className="card" style={{ padding: 'var(--space-xl)' }}>
                <h3 className={`text-xl font-bold mb-4 ${protocolColors[protocol.color]}`}>
                  {protocol.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pros */}
                  <div>
                    <h4 className="text-sm font-bold uppercase mb-3" style={{ color: 'var(--color-success)', letterSpacing: '0.05em' }}>
                      Advantages
                    </h4>
                    <ul className="space-y-2">
                      {protocol.pros.map((pro) => (
                        <li key={pro} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Cons */}
                  <div>
                    <h4 className="text-sm font-bold uppercase mb-3" style={{ color: 'var(--color-danger)', letterSpacing: '0.05em' }}>
                      Limitations
                    </h4>
                    <ul className="space-y-2">
                      {protocol.cons.map((con) => (
                        <li key={con} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-danger)' }} />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <h2 className="cta-section__title">Need Help Deciding?</h2>
          <p className="cta-section__subtitle">
            Try our Protocol Selection Wizard for a personalized recommendation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculators/protocol-wizard" className="btn btn-primary btn-lg">
              Try Protocol Wizard <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/articles/protocols" className="btn btn-secondary btn-lg">
              Read Protocol Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
