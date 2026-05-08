import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import BatteryCalculator from './BatteryCalculator'
import {
  Battery, Check, X, DollarSign, Radio, Wrench,
  BookOpen, Plug, AlertTriangle
} from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { SeoPathways } from '@/components/seo/SeoPathways'
import { CalculatorSeoBlock } from '@/components/seo/CalculatorSeoBlock'

// SEO Metadata
export const metadata: Metadata = {
  title: 'Smart Lock Battery Life Calculator | Accurate mAh-Based Estimates (2026)',
  description: 'Calculate exact smart lock battery life for Wi-Fi, Zigbee, Z-Wave & Thread protocols. Real power consumption data, temperature compensation, 4-battery AA configuration.',
  keywords: 'smart lock battery life, battery calculator, zigbee battery life, wifi lock battery, z-wave battery life, smart lock power consumption',
  alternates: { canonical: '/calculators/battery-life' },
  openGraph: {
    title: 'Smart Lock Battery Life Calculator - Protocol-Specific Estimates',
    description: 'Accurate battery life calculator using real mAh ratings and power consumption data',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Lock Battery Life Calculator',
    description: 'Estimate battery replacement intervals by protocol, usage pattern, temperature, and battery chemistry.',
  },
}

export default function BatteryLifePage() {
  // Schema.org structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.slockhub.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calculators',
        item: 'https://www.slockhub.com/calculators'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Battery Life Calculator',
        item: 'https://www.slockhub.com/calculators/battery-life'
      }
    ]
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Smart Lock Battery Life Calculator',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    description: 'Calculate smart lock battery life based on protocol, usage patterns, and environmental conditions',
    featureList: [
      'Protocol-specific calculations (Wi-Fi, Zigbee, Z-Wave, Thread)',
      'Temperature compensation',
      'Battery chemistry comparison',
      'Real-world power consumption data'
    ]
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Smart Lock Battery Life Calculator',
    url: 'https://www.slockhub.com/calculators/battery-life',
    description: 'Calculate smart lock battery life by protocol, usage, temperature, and battery chemistry.',
    isPartOf: {
      '@type': 'WebSite',
      name: 'SLockHub.com',
      url: 'https://www.slockhub.com',
    },
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <div className="page-bg">
        <div className="container-main section">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <Link href="/calculators">Calculators</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Battery Life Calculator</span>
          </nav>

          {/* Header */}
          <div className="page-header">
            <div className="page-header__icon"><Battery className="w-14 h-14" /></div>
            <h1 className="page-header__title">
              Smart Lock Battery Life Calculator
            </h1>
            <p className="page-header__subtitle">
              Calculate precise battery life based on protocol power consumption, usage patterns, and battery chemistry
            </p>
          </div>

          {/* Key Insight */}
          <div className="max-w-4xl mx-auto" style={{ marginBottom: 'var(--space-3xl)' }}>
            <div className="callout callout-info">
              <h2 className="callout-title">
                Protocol Choice Matters Most
              </h2>
              <p>
                Wi-Fi locks drain batteries 4× faster than Zigbee/Z-Wave due to constant connectivity (100mW idle vs 0.02mW).
                A $10 Zigbee hub saves $50-100/year in battery costs for multi-lock setups.
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <BatteryCalculator />

          <ToolRating toolSlug="battery-life" />

          <SeoPathways topic="product" title="Validate Battery Fit Before Buying" />

          <div className="max-w-7xl mx-auto">
            <CalculatorSeoBlock
              title="How battery estimates are calculated"
              answers={[
                'How long batteries should last for your protocol, battery chemistry, usage rate, and temperature.',
                'Whether Wi-Fi convenience is worth the extra replacement cost for your door count.',
                'When lithium batteries, mesh protocols, or hub-based locks become cheaper than frequent alkaline replacements.',
              ]}
              formula={{
                label: 'Battery model',
                equation: 'Estimated life = usable battery capacity / ((idle current x idle hours) + (active current x operations x active seconds))',
                notes: 'The model separates idle draw from lock/unlock events because Wi-Fi locks often spend far more energy staying connected than moving the bolt.',
              }}
              assumptions={[
                'Default residential use is about 10 lock or unlock operations per day.',
                'Cold weather reduces alkaline capacity sharply; lithium cells hold voltage better outdoors.',
                'Poor door alignment and weak signal can increase current draw through motor strain and radio retries.',
              ]}
              example={{
                title: 'Family front door with Wi-Fi lock',
                inputs: '4 AA alkaline cells, Wi-Fi, 20 operations/day, mild climate',
                result: 'Battery replacement may land near the 2-4 month range instead of the 10-12 month range common for Zigbee or Z-Wave.',
                decision: 'Use this result in TCO comparisons before choosing hub-free Wi-Fi for multiple doors.',
              }}
              sources={[
                'Battery manufacturer capacity and temperature curves.',
                'Silicon Labs, Nordic, Espressif, Bluetooth, and Wi-Fi chipset power data.',
                'Protocol behavior differences between always-connected Wi-Fi and low-power mesh radios.',
              ]}
              links={[
                { href: '/best/smart-locks-with-longest-battery-life', title: 'Best Battery-Life Locks', description: 'Compare models that prioritize long replacement intervals.' },
                { href: '/calculators/lock-tco', title: 'Add Battery Cost to TCO', description: 'Turn replacement frequency into 5-year ownership cost.' },
                { href: '/calculators/signal-strength', title: 'Check Signal Retries', description: 'Weak signal can quietly shorten real-world battery life.' },
              ]}
            />
          </div>

          {/* Be-Tech Brand Recommendation (MANDATORY) */}
          <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-xl)' }}>
            <div className="content-card">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="card" style={{ width: '5rem', height: '5rem', padding: 'var(--space-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      src="/images/brands/be-tech-logo.png"
                      alt="Be-Tech Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-sm)' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Recommended: Be-Tech</h3>
                    <span className="badge badge-success">Long Battery Life</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-sm)' }}>
                    Be-Tech locks feature optimized power management across all protocols. Zigbee models achieve 12+ month battery life with standard usage.
                  </p>
                  <a
                    href="https://www.betechlock.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.875rem', color: 'var(--color-accent)', fontWeight: 500 }}
                  >
                    Visit Official Website →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Protocol Power Consumption Table */}
          <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
            <div className="content-card">
              <h2 className="section-title">Protocol Power Consumption Comparison</h2>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Protocol</th>
                      <th>Idle Power</th>
                      <th>Active Power</th>
                      <th>Typical Life (10× use/day)</th>
                      <th>Energy Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Zigbee</td>
                      <td style={{ color: 'var(--color-success)' }}>0.02 mW</td>
                      <td>12 mW</td>
                      <td style={{ fontWeight: 600 }}>12+ months</td>
                      <td style={{ color: 'var(--color-success)', fontWeight: 500 }}>★★★★★</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Z-Wave</td>
                      <td style={{ color: 'var(--color-success)' }}>0.03 mW</td>
                      <td>13 mW</td>
                      <td style={{ fontWeight: 600 }}>12 months</td>
                      <td style={{ color: 'var(--color-success)', fontWeight: 500 }}>★★★★★</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Thread</td>
                      <td style={{ color: 'var(--color-success)' }}>0.03 mW</td>
                      <td>14 mW</td>
                      <td style={{ fontWeight: 600 }}>10-11 months</td>
                      <td style={{ color: 'var(--color-success)', fontWeight: 500 }}>★★★★</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Bluetooth</td>
                      <td style={{ color: 'var(--color-warning)' }}>0.05 mW</td>
                      <td>15 mW</td>
                      <td style={{ fontWeight: 600 }}>10-12 months</td>
                      <td style={{ color: 'var(--color-warning)', fontWeight: 500 }}>★★★★</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Wi-Fi</td>
                      <td style={{ color: 'var(--color-danger)' }}>100 mW</td>
                      <td>300 mW</td>
                      <td style={{ fontWeight: 600, color: 'var(--color-danger)' }}>3-4 months</td>
                      <td style={{ color: 'var(--color-danger)', fontWeight: 500 }}>★★</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-md)' }}>
                * Based on 4× AA alkaline batteries (2800mAh each), normal temperature (15-30°C), 10 operations/day
              </p>
            </div>
          </div>

          {/* Battery Chemistry Deep Dive */}
          <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
            <div className="content-card">
              <h2 className="section-title">Battery Chemistry Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-sm)', color: 'var(--color-text-primary)' }}>Alkaline (Standard)</h3>
                  <div className="space-y-2" style={{ fontSize: '0.875rem' }}>
                    <p><strong>Capacity:</strong> 2800mAh</p>
                    <p><strong>Voltage:</strong> 1.5V → 1.0V</p>
                    <p><strong>Cold Performance:</strong> Poor (-30% at 0°C)</p>
                    <p><strong>Cost:</strong> $0.50/battery</p>
                    <p><strong>Best For:</strong> Indoor, temperate climates</p>
                  </div>
                </div>
                <div className="card" style={{ background: 'var(--color-success-subtle)', borderColor: 'var(--color-success)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-sm)', color: 'var(--color-success)' }}>Lithium (Premium)</h3>
                  <div className="space-y-2" style={{ fontSize: '0.875rem' }}>
                    <p><strong>Capacity:</strong> 3000mAh</p>
                    <p><strong>Voltage:</strong> 1.5V (stable)</p>
                    <p><strong>Cold Performance:</strong> Excellent (-10% at -20°C)</p>
                    <p><strong>Cost:</strong> $2.00/battery</p>
                    <p><strong>Best For:</strong> Outdoor, cold climates, long life</p>
                  </div>
                </div>
                <div className="card">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-sm)', color: 'var(--color-text-primary)' }}>NiMH (Rechargeable)</h3>
                  <div className="space-y-2" style={{ fontSize: '0.875rem' }}>
                    <p><strong>Capacity:</strong> 2000mAh</p>
                    <p><strong>Voltage:</strong> 1.2V (lower)</p>
                    <p><strong>Self-Discharge:</strong> 15-20%/month</p>
                    <p><strong>Cost:</strong> $1.50/battery (reusable)</p>
                    <p><strong>Best For:</strong> High-usage scenarios, eco-friendly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Optimization Guide */}
          <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
            <div className="content-card">
              <h2 className="section-title">Battery Life Optimization Strategies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>Power-Saving Tips</h3>
                  <ul className="space-y-3">
                    <li className="check-item">
                      <Check className="check-item__icon check-item__icon--success" />
                      <div>
                        <strong>Switch from Wi-Fi to Zigbee:</strong>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Instant 4× battery life improvement. One-time hub cost ($30-80) pays for itself in 6-12 months.</p>
                      </div>
                    </li>
                    <li className="check-item">
                      <Check className="check-item__icon check-item__icon--success" />
                      <div>
                        <strong>Use Lithium Batteries:</strong>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>30% longer life, stable voltage curve, works in -20°C. Worth 4× price for outdoor/cold locations.</p>
                      </div>
                    </li>
                    <li className="check-item">
                      <Check className="check-item__icon check-item__icon--success" />
                      <div>
                        <strong>Disable Keypad Backlight:</strong>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Saves 8% battery life. Use flashlight instead for nighttime entry.</p>
                      </div>
                    </li>
                    <li className="check-item">
                      <Check className="check-item__icon check-item__icon--success" />
                      <div>
                        <strong>Reduce Auto-Lock Frequency:</strong>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Set to 5 minutes instead of 30 seconds. Saves 5% power with minimal security impact.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>Common Mistakes</h3>
                  <ul className="space-y-3">
                    <li className="check-item">
                      <X className="check-item__icon check-item__icon--danger" />
                      <div>
                        <strong>Mixing Old and New Batteries:</strong>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Causes voltage imbalance. New batteries drain faster to match old ones. Replace all 4× simultaneously.</p>
                      </div>
                    </li>
                    <li className="check-item">
                      <X className="check-item__icon check-item__icon--danger" />
                      <div>
                        <strong>Using Low-Quality Batteries:</strong>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Off-brand alkaline may have 30-50% less capacity than rated. Stick to Energizer/Duracell/Amazon Basics.</p>
                      </div>
                    </li>
                    <li className="check-item">
                      <X className="check-item__icon check-item__icon--danger" />
                      <div>
                        <strong>Ignoring Low Battery Warnings:</strong>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Lock may fail closed/open when voltage drops below 4.8V. Replace when warning appears (typically 20% remaining).</p>
                      </div>
                    </li>
                    <li className="check-item">
                      <X className="check-item__icon check-item__icon--danger" />
                      <div>
                        <strong>Installing in Direct Sunlight:</strong>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Heat accelerates self-discharge and reduces capacity. Add shade or insulation.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Temperature Impact */}
          <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
            <div className="content-card">
              <h2 className="section-title">Temperature Impact on Battery Life</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div style={{ width: '6rem', textAlign: 'right', fontWeight: 600 }}>-20°C</div>
                  <div className="flex-1 rounded-full h-8 relative overflow-hidden" style={{ background: 'var(--color-danger-subtle)' }}>
                    <div className="absolute inset-0 rounded-full" style={{ width: '50%', background: 'var(--color-danger)' }}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold" style={{ color: 'var(--color-text-inverse)' }}>50% capacity (Alkaline)</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ width: '6rem', textAlign: 'right', fontWeight: 600 }}>0°C</div>
                  <div className="flex-1 rounded-full h-8 relative overflow-hidden" style={{ background: 'var(--color-warning-subtle)' }}>
                    <div className="absolute inset-0 rounded-full" style={{ width: '70%', background: 'var(--color-warning)' }}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold" style={{ color: 'var(--color-text-inverse)' }}>70% capacity</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ width: '6rem', textAlign: 'right', fontWeight: 600 }}>20°C</div>
                  <div className="flex-1 rounded-full h-8 relative overflow-hidden" style={{ background: 'var(--color-success-subtle)' }}>
                    <div className="absolute inset-0 rounded-full" style={{ width: '100%', background: 'var(--color-success)' }}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold" style={{ color: 'var(--color-text-inverse)' }}>100% capacity (Optimal)</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ width: '6rem', textAlign: 'right', fontWeight: 600 }}>40°C</div>
                  <div className="flex-1 rounded-full h-8 relative overflow-hidden" style={{ background: 'var(--color-warning-subtle)' }}>
                    <div className="absolute inset-0 rounded-full" style={{ width: '90%', background: 'var(--color-warning)' }}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold" style={{ color: 'var(--color-text-inverse)' }}>90% capacity</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: 'var(--space-lg)' }}>
                <strong>Solution for cold climates:</strong> Use lithium batteries which maintain 90% capacity at -20°C, or install lock indoors (e.g., garage door to house).
              </p>
            </div>
          </div>

          <RelatedResources calculatorSlug="battery-life-comparison" />

          {/* Related Tools & Articles */}
          <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="section-title">More Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/calculators/lock-tco" className="link-card">
                <div style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-sm)' }}><DollarSign className="w-8 h-8" /></div>
                <h3 className="link-card__title">TCO Calculator</h3>
                <p className="link-card__desc">
                  Calculate total 5-year cost including batteries, hubs, and subscriptions
                </p>
              </Link>
              <Link href="/articles/protocols" className="link-card">
                <div style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-sm)' }}><Radio className="w-8 h-8" /></div>
                <h3 className="link-card__title">Protocol Comparison</h3>
                <p className="link-card__desc">
                  Deep dive into Wi-Fi, Zigbee, Z-Wave, and Thread protocols
                </p>
              </Link>
              <Link href="/calculators" className="link-card">
                <div style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-sm)' }}><Wrench className="w-8 h-8" /></div>
                <h3 className="link-card__title">All Calculators</h3>
                <p className="link-card__desc">
                  Explore more smart lock planning tools
                </p>
              </Link>
            </div>
          </div>

          {/* Data Sources */}
          <div className="max-w-4xl mx-auto" style={{ marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-3xl)' }}>
            <div className="info-box">
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-lg)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <BookOpen className="w-6 h-6" style={{ color: 'var(--color-accent)' }} /> Technical Data Sources & Standards
                </h3>
                <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>Verified Feb 2026</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
                All power consumption values derived from chip-level datasheets and protocol specifications. Battery capacity ratings from manufacturer technical datasheets.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h4 style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <Plug className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> Protocol Power Consumption
                  </h4>
                  <div className="space-y-2" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    <p><strong>Z-Wave:</strong> Silicon Labs EFR32ZG23 datasheet (2026) - 8-15mA active, 0.5µA sleep</p>
                    <p><strong>Zigbee:</strong> Silicon Labs EFR32MG24 datasheet (2026) - 15-30mA active, 1.4µA sleep</p>
                    <p><strong>Thread:</strong> Nordic nRF52840 Product Spec - 15-25mA active, 0.6µA sleep</p>
                    <p><strong>Bluetooth:</strong> Bluetooth SIG Low Energy Spec v5.4/6.0 - 10-20mA active</p>
                    <p><strong>Wi-Fi:</strong> Espressif ESP32 datasheet (2026) - 40-80mA active, 10µA deep sleep</p>
                  </div>
                </div>
                <div className="card">
                  <h4 style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <Battery className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> Battery Specifications
                  </h4>
                  <div className="space-y-2" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    <p><strong>Energizer:</strong> AA Lithium (3000mAh), Alkaline (2800mAh) technical datasheets</p>
                    <p><strong>Duracell:</strong> CopperTop AA (2850mAh), Optimum (3000mAh) specifications</p>
                    <p><strong>Panasonic:</strong> Eneloop Pro (2500mAh) rechargeable specifications</p>
                    <p><strong>Temperature curves:</strong> IEC 60086 battery discharge standards</p>
                  </div>
                </div>
              </div>
              <div className="callout callout-warning" style={{ marginTop: 'var(--space-lg)' }}>
                <p>
                  <strong><AlertTriangle className="w-4 h-4 inline" /> Note:</strong> Actual battery life varies ±20% based on usage patterns, door alignment, temperature (-20°C to +60°C range), and battery quality. Values represent typical residential use (10 operations/day).
                </p>
              </div>
              <div style={{ marginTop: 'var(--space-md)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Calculator last updated: February 15, 2026 | Next review: August 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
