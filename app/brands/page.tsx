import Link from 'next/link'
import type { Metadata } from 'next'
import {
  Lock, Home, Shield, DoorOpen, Key, Sparkles, AlertTriangle, Check, X
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Smart Lock Brands - Smart Lock Hub',
  description: 'Overview of major smart lock brands and manufacturers with protocol support and best use cases.',
  alternates: { canonical: '/brands' },
}

const brands = [
  {
    name: 'Yale',
    logo: <Lock className="w-9 h-9" />,
    protocols: ['Zigbee', 'Z-Wave', 'Wi-Fi', 'Thread'],
    priceRange: '$150-$300',
    rating: 4.5,
    pros: ['Trusted brand', 'Wide protocol support', 'Good battery life', 'HomeKit support'],
    cons: ['Premium pricing', 'Some models cloud-dependent'],
    bestFor: 'Homeowners wanting reliability',
    ecosystems: ['Apple HomeKit', 'Google Home', 'Alexa', 'SmartThings'],
  },
  {
    name: 'August',
    logo: <Home className="w-9 h-9" />,
    protocols: ['Wi-Fi', 'Zigbee'],
    priceRange: '$200-$280',
    rating: 4.3,
    pros: ['Retrofit design', 'Easy installation', 'Auto-unlock', 'App-based'],
    cons: ['Cloud required', 'Shorter battery life', 'Limited to Wi-Fi'],
    bestFor: 'Renters and tech enthusiasts',
    ecosystems: ['Apple HomeKit', 'Google Home', 'Alexa'],
  },
  {
    name: 'Schlage',
    logo: <Shield className="w-9 h-9" />,
    protocols: ['Zigbee', 'Z-Wave', 'Wi-Fi'],
    priceRange: '$180-$350',
    rating: 4.6,
    pros: ['Commercial grade', 'Excellent build quality', 'Long battery life', 'ANSI Grade 1'],
    cons: ['Higher cost', 'Less modern app'],
    bestFor: 'Security-focused users',
    ecosystems: ['Apple HomeKit', 'Alexa', 'SmartThings', 'Ring'],
  },
  {
    name: 'Kwikset',
    logo: <DoorOpen className="w-9 h-9" />,
    protocols: ['Zigbee', 'Z-Wave'],
    priceRange: '$120-$250',
    rating: 4.2,
    pros: ['Budget-friendly', 'SmartKey technology', 'Easy rekey', 'Good value'],
    cons: ['Plastic construction', 'Basic features'],
    bestFor: 'Budget-conscious buyers',
    ecosystems: ['Alexa', 'Google Home', 'SmartThings'],
  },
  {
    name: 'Aqara',
    logo: <Key className="w-9 h-9" />,
    protocols: ['Zigbee', 'Thread'],
    priceRange: '$180-$250',
    rating: 4.4,
    pros: ['Matter support', 'Affordable hub', 'Compact design', 'Good app'],
    cons: ['Limited availability', 'Newer brand'],
    bestFor: 'Smart home enthusiasts',
    ecosystems: ['Apple HomeKit', 'Google Home', 'Alexa'],
  },
  {
    name: 'Level',
    logo: <Sparkles className="w-9 h-9" />,
    protocols: ['Thread', 'Wi-Fi'],
    priceRange: '$230-$330',
    rating: 4.4,
    pros: ['Invisible design', 'Matter compatible', 'Premium feel', 'Modern app'],
    cons: ['Expensive', 'Limited models', 'Newer company'],
    bestFor: 'Design-conscious users',
    ecosystems: ['Apple HomeKit', 'Google Home', 'Alexa'],
  },
]

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

export default function Brands() {
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
          {brands.map(brand => (
            <div key={brand.name} className="card card-hover" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ background: 'var(--color-bg-dark)', padding: 'var(--space-xl)', color: 'var(--color-text-inverse)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ color: 'var(--color-text-inverse)' }}>{brand.logo}</span>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{brand.name}</h3>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{brand.priceRange}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ fontSize: '1.125rem', color: i < Math.floor(brand.rating) ? '#facc15' : 'var(--color-text-muted)' }}>
                      ★
                    </span>
                  ))}
                  <span style={{ marginLeft: 'var(--space-sm)', fontSize: '0.875rem' }}>{brand.rating}/5</span>
                </div>
              </div>

              <div style={{ padding: 'var(--space-xl)' }}>
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <h4 className="form-label">Protocols:</h4>
                  <div className="flex flex-wrap gap-2">
                    {brand.protocols.map(p => (
                      <span key={p} className="badge badge-accent">{p}</span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <h4 className="form-label">Pros:</h4>
                  <ul className="space-y-1">
                    {brand.pros.map((pro, i) => (
                      <li key={i} className="check-item">
                        <Check className="check-item__icon check-item__icon--success" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <h4 className="form-label">Cons:</h4>
                  <ul className="space-y-1">
                    {brand.cons.map((con, i) => (
                      <li key={i} className="check-item">
                        <X className="check-item__icon check-item__icon--danger" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>Best For:</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{brand.bestFor}</div>
                </div>

                <div style={{ marginTop: 'var(--space-md)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-sm)' }}>Works with:</div>
                  <div className="flex flex-wrap gap-1">
                    {brand.ecosystems.map(eco => (
                      <span key={eco} className="badge badge-default">{eco}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
