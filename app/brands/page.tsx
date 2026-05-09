import Link from 'next/link'
import type { Metadata } from 'next'
import { AlertTriangle, Check, X, ExternalLink } from 'lucide-react'
import { getBrands } from '@/lib/services/brand-service'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Smart Lock Brands | Compare Protocols, Products & Use Cases',
  description: 'Compare smart lock brands by protocol support, product depth, price tier, door fit, ecosystem, and best use case.',
  alternates: { canonical: '/brands' },
  openGraph: {
    title: 'Smart Lock Brands',
    description: 'Compare major smart lock brands by protocol support, product lines, target market, and buying path.',
    type: 'website',
    url: 'https://www.slockhub.com/brands',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Lock Brands',
    description: 'Compare smart lock brand catalogs, product lines, protocols, ecosystems, and comparison paths.',
  },
}

const features = [
  { name: 'Auto-lock', description: 'Automatically locks after closing' },
  { name: 'Auto-unlock', description: 'Unlocks when you approach (geofencing)' },
  { name: 'Keypad', description: 'PIN code entry' },
  { name: 'Fingerprint', description: 'Biometric authentication' },
  { name: 'Remote Access', description: 'Control from anywhere via internet' },
  { name: 'Guest Codes', description: 'Temporary access codes' },
  { name: 'Activity Log', description: 'Track who accessed and when' },
  { name: 'Voice Control', description: 'Alexa/Google Assistant support' },
]

const brandPathways = [
  {
    title: 'I already know the brand',
    links: [
      { href: '/brands/yale', label: 'Yale products' },
      { href: '/brands/schlage', label: 'Schlage products' },
      { href: '/brands/samsung', label: 'Samsung products' },
    ],
  },
  {
    title: 'I want ecosystem fit',
    links: [
      { href: '/best/matter-smart-locks', label: 'Matter locks' },
      { href: '/best/homekit-smart-locks', label: 'HomeKit locks' },
      { href: '/protocols', label: 'Protocol guides' },
    ],
  },
  {
    title: 'I need a purchase check',
    links: [
      { href: '/calculators/compatibility', label: 'Door compatibility' },
      { href: '/calculators/lock-tco', label: 'Ownership cost' },
      { href: '/compare', label: 'Brand comparisons' },
    ],
  },
]

function getProtocols(brand: { supports_wifi: boolean; supports_zigbee: boolean; supports_zwave: boolean; supports_thread: boolean; supports_matter: boolean; supports_bluetooth: boolean }) {
  const protocols: string[] = []
  if (brand.supports_wifi) protocols.push('Wi-Fi')
  if (brand.supports_zigbee) protocols.push('Zigbee')
  if (brand.supports_zwave) protocols.push('Z-Wave')
  if (brand.supports_thread) protocols.push('Thread')
  if (brand.supports_matter) protocols.push('Matter')
  if (brand.supports_bluetooth) protocols.push('Bluetooth')
  return protocols
}

export default async function Brands() {
  let brands: Awaited<ReturnType<typeof getBrands>> = []

  try {
    brands = await getBrands()
  } catch {
    // 数据库不可用时使用空数组，页面仍然可以渲染
  }

  const topBrands = [...brands]
    .sort((a, b) => b.product_count - a.product_count)
    .slice(0, 6)

  const protocolStats = [
    { label: 'Wi-Fi', count: brands.filter((brand) => brand.supports_wifi).length, href: '/protocols/wifi' },
    { label: 'Matter', count: brands.filter((brand) => brand.supports_matter).length, href: '/protocols/matter' },
    { label: 'Z-Wave', count: brands.filter((brand) => brand.supports_zwave).length, href: '/protocols/z-wave' },
    { label: 'Zigbee', count: brands.filter((brand) => brand.supports_zigbee).length, href: '/protocols/zigbee' },
  ]

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Smart Lock Brands',
    description: 'Compare smart lock brands by protocol support, product depth, price tier, ecosystem fit, and use case.',
    url: 'https://www.slockhub.com/brands',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: brands.length,
      itemListElement: brands.slice(0, 20).map((brand, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: brand.name,
        url: `https://www.slockhub.com/brands/${brand.slug}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <div className="page-bg">
        <div className="container-main section">
        <div className="page-header">
          <h1 className="page-header__title">Smart Lock Brands</h1>
          <p className="page-header__subtitle">
            Overview of major smart lock manufacturers, their protocols, and best use cases
          </p>
        </div>

        <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="section-title">Brand, Protocol, Door Fit</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {brandPathways.map((path) => (
              <div key={path.title} className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>{path.title}</h3>
                <ol className="space-y-3">
                  {path.links.map((link, index) => (
                    <li key={link.href} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                      <span className="badge badge-accent">{index + 1}</span>
                      <Link href={link.href} style={{ color: 'var(--color-accent)', fontWeight: 600 }} prefetch={false}>{link.label}</Link>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {topBrands.length > 0 && (
          <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2 className="section-title">Largest Brand Catalogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topBrands.map((brand) => (
                <Link key={brand.slug} href={`/brands/${brand.slug}`} className="link-card" prefetch={false}>
                  <h3 className="link-card__title">{brand.name}</h3>
                  <p className="link-card__desc">{brand.product_count} products indexed. Protocols: {getProtocols(brand).join(', ') || 'Not specified'}.</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {brands.length > 0 ? (
          <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2 className="section-title">Wi-Fi, Matter, Z-Wave Brands</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {protocolStats.map((stat) => (
                <Link key={stat.label} href={stat.href} className="link-card" prefetch={false}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{stat.count}</div>
                  <h3 className="link-card__title">{stat.label} brands</h3>
                  <p className="link-card__desc">Review protocol tradeoffs and compatible locks.</p>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <div className="callout callout-warning" style={{ marginBottom: 'var(--space-3xl)' }}>
            <p className="callout-title">Brand database is not populated</p>
            <p>
              The brand catalog tables are empty in the active database. Import the D1 seed data before using protocol coverage and brand comparison pages in production.
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="callout callout-warning" style={{ marginBottom: 'var(--space-3xl)' }}>
          <p className="callout-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <AlertTriangle className="w-5 h-5" /> Important Note
          </p>
          <p>
            We are not affiliated with any manufacturers listed here. Information is provided for
            educational purposes. Always verify specifications with official sources before purchasing.
            Prices and features subject to change.
          </p>
        </div>

        {/* Brand Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {brands.map(brand => {
            const protocols = getProtocols(brand)
            return (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="card card-hover"
                style={{ padding: 0, overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}
               prefetch={false}>
                <div style={{ background: 'var(--color-bg-dark)', padding: 'var(--space-xl)', color: 'var(--color-text-inverse)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{brand.name}</h3>
                      <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                        {brand.country} · Est. {brand.founded_year}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                      <span className="badge badge-accent">{brand.product_count} products</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: 'var(--space-xl)' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
                    {brand.description}
                  </p>

                  <div style={{ marginBottom: 'var(--space-md)' }}>
                    <h4 className="form-label">Protocols:</h4>
                    <div className="flex flex-wrap gap-2">
                      {protocols.map(p => (
                        <span key={p} className="badge badge-accent">{p}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span className="badge badge-default" style={{ textTransform: 'capitalize' }}>{brand.price_tier}</span>
                        <span className="badge badge-default" style={{ marginLeft: 'var(--space-xs)', textTransform: 'capitalize' }}>{brand.target_market}</span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                        View Products →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Common Features */}
        <div className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="section-title">Keypad, Fingerprint, Guest Codes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(feature => (
              <div key={feature.name} className="card" style={{ padding: 'var(--space-md)', background: 'var(--color-bg-alt)' }}>
                <h3 style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>{feature.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buying Guide */}
        <div className="cta-section" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="cta-section__title" style={{ fontSize: '1.75rem' }}>Price, Support, Compatibility</h2>
          <div className="grid md:grid-cols-3 gap-6" style={{ textAlign: 'left' }}>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-sm)', fontSize: '1.125rem' }}>Protocol</h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                Choose based on your existing smart home ecosystem and future plans.
                Thread/Matter for future-proofing, Z-Wave for reliability.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-sm)', fontSize: '1.125rem' }}>Security Rating</h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                Look for ANSI/BHMA Grade 1 (highest) or Grade 2 certification.
                Commercial applications should use Grade 1 only.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-sm)', fontSize: '1.125rem' }}>Battery Type</h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                AA batteries are most common and convenient. Some use CR123A lithium.
                Consider battery life and replacement cost.
              </p>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="content-card" style={{ textAlign: 'center' }}>
          <h2 className="section-title section-title--center">Fit, Cost, Protocol Tools</h2>
          <p className="page-subtitle" style={{ marginBottom: 'var(--space-xl)' }}>
            Use our interactive tools to find the perfect smart lock for your needs
          </p>
          <div className="grid-actions">
            <Link href="/calculators/protocol-wizard" className="btn btn-primary btn-lg" prefetch={false}>
              Protocol Wizard
            </Link>
            <Link href="/calculators/lock-tco" className="btn btn-secondary btn-lg" prefetch={false}>
              Cost Calculator
            </Link>
            <Link href="/compare" className="btn btn-secondary btn-lg" prefetch={false}>
              Compare Protocols
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
