import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle, XCircle, GitCompareArrows
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Smart Lock Compare Hub | Brand vs Brand & Protocol Comparisons',
  description: 'Compare smart lock brands and protocols. Start with high-demand brand matchups, then validate protocol, battery, range, installation, and ownership cost.',
  alternates: { canonical: '/compare' },
  openGraph: {
    title: 'Smart Lock Compare Hub',
    description: 'Compare smart lock brands and protocols before choosing a model.',
    siteName: 'SLockHub.com',
    type: 'website',
    url: 'https://www.slockhub.com/compare',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Lock Compare Hub',
    description: 'Start with popular brand comparisons, then validate protocol, signal, battery, and total cost.',
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

const popularComparisons = [
  { href: '/compare/nuki-vs-tedee', title: 'Nuki vs Tedee', detail: 'High-click benchmark pair with strong European smart lock intent.' },
  { href: '/compare/schlage-vs-weiser', title: 'Schlage vs Weiser', detail: 'High-impression North American brand comparison with low CTR opportunity.' },
  { href: '/compare/kwikset-vs-defiant', title: 'Kwikset vs Defiant', detail: 'Budget and hardware-store comparison for replacement buyers.' },
  { href: '/compare/schlage-vs-defiant', title: 'Schlage vs Defiant', detail: 'Page-1/2 GSC visibility with zero-click improvement opportunity.' },
]

const comparePaths = [
  {
    title: 'Compare brands first',
    links: [
      { href: '/brands', label: 'Browse all brands' },
      { href: '/best/matter-smart-locks', label: 'Shortlist Matter locks' },
      { href: '/calculators/lock-tco', label: 'Model 5-year cost' },
    ],
  },
  {
    title: 'Compare protocols first',
    links: [
      { href: '/protocols', label: 'Browse protocol guides' },
      { href: '/calculators/protocol-wizard', label: 'Use the protocol wizard' },
      { href: '/calculators/signal-strength', label: 'Check signal range' },
    ],
  },
  {
    title: 'Validate installation fit',
    links: [
      { href: '/calculators/compatibility', label: 'Check door compatibility' },
      { href: '/calculators/installation-cost', label: 'Estimate install cost' },
      { href: '/articles/guides/door-compatibility-guide', label: 'Read door fit guide' },
    ],
  },
]

export default function ComparePage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Smart Lock Compare Hub',
    description: 'Compare smart lock brands and communication protocols before selecting a model.',
    url: 'https://www.slockhub.com/compare',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: popularComparisons.length + protocols.length,
      itemListElement: [
        ...popularComparisons.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.title,
          url: `https://www.slockhub.com${item.href}`,
        })),
        ...protocols.map((protocol, index) => ({
          '@type': 'ListItem',
          position: popularComparisons.length + index + 1,
          name: `${protocol.name} protocol comparison`,
          url: `https://www.slockhub.com/protocols/${protocol.name.toLowerCase().replace(' ', '-')}`,
        })),
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
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

        <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="section-title">Start With High-Demand Comparisons</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '52rem', lineHeight: 1.7, marginBottom: 'var(--space-xl)' }}>
            These brand matchups already show visible Google Search Console demand. Use them as commercial comparison entry points, then validate protocol, door fit, signal, battery life, and ownership cost.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularComparisons.map((item) => (
              <Link key={item.href} href={item.href} className="link-card">
                <h3 className="link-card__title">{item.title}</h3>
                <p className="link-card__desc">{item.detail}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="section-title">Choose the Right Comparison Path</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {comparePaths.map((path) => (
              <div key={path.title} className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>{path.title}</h3>
                <ol className="space-y-3">
                  {path.links.map((link, index) => (
                    <li key={link.href} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                      <span className="badge badge-accent">{index + 1}</span>
                      <Link href={link.href} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{link.label}</Link>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

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
              <div key={item.q} className="card flex items-start gap-4">
                <div className="text-color-accent mt-0.5">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-color-primary">{item.q}</h3>
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
          <div className="card overflow-hidden p-0">
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
                      <td className="font-medium text-color-primary">
                        {row.label}
                      </td>
                      {protocols.map((p) => (
                        <td key={p.name} className="mono-value text-sm">
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
              <div key={protocol.name} className="card">
                <h3 className={`text-xl font-bold mb-4 ${protocolColors[protocol.color]}`}>
                  {protocol.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pros */}
                  <div>
                    <h4 className="text-sm font-bold uppercase mb-3 text-color-success tracking-wider">
                      Advantages
                    </h4>
                    <ul className="space-y-2">
                      {protocol.pros.map((pro) => (
                        <li key={pro} className="flex items-center gap-2 text-sm text-color-secondary">
                          <CheckCircle className="w-4 h-4 flex-shrink-0 text-color-success" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Cons */}
                  <div>
                    <h4 className="text-sm font-bold uppercase mb-3 text-color-danger tracking-wider">
                      Limitations
                    </h4>
                    <ul className="space-y-2">
                      {protocol.cons.map((con) => (
                        <li key={con} className="flex items-center gap-2 text-sm text-color-secondary">
                          <XCircle className="w-4 h-4 flex-shrink-0 text-color-danger" />
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
    </>
  )
}
