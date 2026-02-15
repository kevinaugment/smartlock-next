import Link from 'next/link'
import type { Metadata } from 'next'
import { AlertTriangle, Check, X, ExternalLink } from 'lucide-react'
import { getBrands } from '@/lib/services/brand-service'

export const metadata: Metadata = {
  title: 'Smart Lock Brands - SLockHub.com',
  description: 'Overview of major smart lock brands and manufacturers with protocol support, product lines, and best use cases.',
  alternates: { canonical: '/brands' },
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

  return (
    <div className="page-bg">
      <div className="container-main section">
        <div className="page-header">
          <h1 className="page-header__title">Smart Lock Brands</h1>
          <p className="page-header__subtitle">
            Overview of major smart lock manufacturers, their protocols, and best use cases
          </p>
        </div>

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
              >
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
          <h2 className="section-title">Common Features to Look For</h2>
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
          <h2 className="cta-section__title" style={{ fontSize: '1.75rem' }}>Buying Considerations</h2>
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
          <h2 className="section-title section-title--center">Need Help Choosing?</h2>
          <p className="page-subtitle" style={{ marginBottom: 'var(--space-xl)' }}>
            Use our interactive tools to find the perfect smart lock for your needs
          </p>
          <div className="grid-actions">
            <Link href="/calculators/protocol-wizard" className="btn btn-primary btn-lg">
              Protocol Wizard
            </Link>
            <Link href="/calculators/lock-tco" className="btn btn-secondary btn-lg">
              Cost Calculator
            </Link>
            <Link href="/compare" className="btn btn-secondary btn-lg">
              Compare Protocols
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
