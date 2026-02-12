import { Metadata } from 'next'
import Link from 'next/link'
import STRCalculator from './STRCalculator'
import {
  Home, DollarSign, TrendingDown, BarChart3, Timer,
  Check, Settings, Smartphone, Star, Link2,
  Users, BookOpen, AlertTriangle, Battery, Wrench
} from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'

export const metadata: Metadata = {
  title: 'Airbnb Smart Lock ROI Calculator | Short-Term Rental Investment Analysis',
  description: 'Calculate smart lock ROI for Airbnb/VRBO rentals. Analyze labor savings, lockout costs, rekeying expenses using 2025 STR industry data from AirDNA & Mashvisor.',
  keywords: 'Airbnb smart lock ROI, VRBO rental calculator, STR investment, vacation rental smart lock, property manager calculator, short-term rental ROI',
}

export default function STRROIPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
      { '@type': 'ListItem', position: 3, name: 'STR ROI Calculator', item: 'https://www.slockhub.com/calculators/str-roi' }
    ]
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Short-Term Rental Smart Lock ROI Calculator',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Calculate ROI for smart locks in Airbnb/VRBO rentals including labor savings, lockout prevention, and guest experience improvements'
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      <div className="page-bg">
        <div className="container-main section">
          <div className="mb-8">
            <nav className="flex text-sm">
              <ol className="inline-flex items-center space-x-1">
                <li><Link href="/" style={{ color: "var(--color-text-muted)" }}>Home</Link></li>
                <li><span className="breadcrumb__separator">/</span><Link href="/calculators" style={{ color: "var(--color-text-muted)" }}>Calculators</Link></li>
                <li><span className="breadcrumb__separator">/</span><span className="breadcrumb__current">STR ROI Calculator</span></li>
              </ol>
            </nav>
          </div>

          <div className="text-center mb-12">
            <div className="page-header__icon"><Home className="w-14 h-14 mx-auto" /></div>
            <h1 className="page-header__title">Short-Term Rental Smart Lock ROI Calculator</h1>
            <p className="page-header__subtitle">Calculate labor savings, lockout costs, and payback period for your Airbnb/VRBO smart lock investment</p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="callout callout-info">
              <h2 className="callout-title">2025 STR Industry Reality</h2>
              <p >
                <strong>Average STR:</strong> 12 bookings/month, 25min key handoff = 50 hours/year wasted. <strong>Lockouts:</strong> 2-3/year @ $125-175 each (emergency locksmith + guest comp). <strong>Lost keys:</strong> 1-2/year @ $175 rekeying. Smart locks eliminate 90% of these costs with 3-8 month payback typical. Data: AirDNA 2025, Mashvisor STR Benchmark Report.
              </p>
            </div>
          </div>

          <STRCalculator />

          <ToolRating toolSlug="str-roi" />

          {/* Be-Tech Brand */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="content-card">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="card" style={{ width: "5rem", height: "5rem", padding: "var(--space-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src="/images/brands/be-tech-logo.png" alt="Be-Tech Logo" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)" }}>Recommended: Be-Tech</h3>
                    <span className="badge badge-success">STR Optimized</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}>
                    Be-Tech locks are ideal for high-turnover STR properties: remote management, temporary codes, activity logs, and 12+ month battery life reduce operational overhead. Compatible with major PMS systems (Guesty, Hostaway, Hospitable).
                  </p>
                  <a href="https://www.betechlock.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: "var(--color-accent)", fontWeight: 500 }}>
                    Visit Official Website →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="content-card">
              <div className="flex justify-between items-center mb-6">
                <h2 style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--color-text-primary)" }}>STR Smart Lock Cost-Benefit Analysis</h2>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Industry Data: 2025</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-md)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><DollarSign className="w-5 h-5" style={{ color: "var(--color-success)" }} /> Quantifiable Savings</h3>
                  <ul className="space-y-3" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li className="flex items-start gap-2">
                      <Check className="check-item__icon check-item__icon--success" />
                      <div>
                        <strong>Labor Elimination:</strong> Average 50 hours/year @ $30/hr = $1,500 savings for 5-property portfolio. No more coordinating key handoffs, late-night check-ins, or physical key management.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="check-item__icon check-item__icon--success" />
                      <div>
                        <strong>Lockout Prevention:</strong> $125-175/incident (emergency locksmith $75-100 + guest compensation $50-75). Industry avg: 2.3 lockouts/property/year = $287-402 saved.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="check-item__icon check-item__icon--success" />
                      <div>
                        <strong>Rekeying Elimination:</strong> $175/incident (lock replacement + labor). Smart locks use temporary codes - no physical key lost = no rekeying needed.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="check-item__icon check-item__icon--success" />
                      <div>
                        <strong>Guest Experience:</strong> Seamless check-in improves reviews 0.2-0.3 stars (AirDNA data). Higher rating = 15-20% booking increase = significant revenue impact.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="check-item__icon check-item__icon--success" />
                      <div>
                        <strong>Operational Scalability:</strong> Manage 50 properties as easily as 5. No linear cost increase with portfolio growth (unlike physical keys).
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-md)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><TrendingDown className="w-5 h-5" style={{ color: "var(--color-warning)" }} /> Investment Costs</h3>
                  <ul className="space-y-3" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-warning)" }}>•</span>
                      <div>
                        <strong>Hardware:</strong> $120-350/lock depending on features. Basic Wi-Fi ($120), Standard Zigbee ($220), Premium Thread ($350). One-time cost.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-warning)" }}>•</span>
                      <div>
                        <strong>Installation:</strong> $150-200/lock for professional install (or DIY 2-3 hours). See Installation Cost Calculator for detailed breakdown.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-warning)" }}>•</span>
                      <div>
                        <strong>Hub (if needed):</strong> $50-150 for Zigbee/Z-Wave. Wi-Fi locks require no hub. Thread requires $100-150 border router.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-warning)" }}>•</span>
                      <div>
                        <strong>Batteries:</strong> $10-15/year (12+ months for Zigbee/Z-Wave, 3-4 months for Wi-Fi). See Battery Life Calculator.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-warning)" }}>•</span>
                      <div>
                        <strong>PMS Integration:</strong> $0-50/month depending on property management software. Many integrate free (Guesty, Hospitable).
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="callout callout-success">
                <h4 style={{ fontWeight: 700, color: "var(--color-success)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><BarChart3 className="w-5 h-5" style={{ color: "var(--color-success)" }} /> Typical ROI Scenarios (2025 Data)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-4 rounded">
                    <p className="link-card__title">Single Property (12 bookings/mo)</p>
                    <ul className="space-y-1" style={{ color: "var(--color-text-secondary)" }}>
                      <li>• Hardware: $220</li>
                      <li>• Annual Savings: $600-800</li>
                      <li>• <strong>Payback: 3-4 months</strong></li>
                      <li>• Year 1 ROI: +175-265%</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded">
                    <p className="link-card__title">Small Portfolio (5 properties)</p>
                    <ul className="space-y-1" style={{ color: "var(--color-text-secondary)" }}>
                      <li>• Hardware: $1,100</li>
                      <li>• Annual Savings: $3,000-4,000</li>
                      <li>• <strong>Payback: 3-5 months</strong></li>
                      <li>• Year 1 ROI: +180-265%</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded">
                    <p className="link-card__title">Large Portfolio (20+ properties)</p>
                    <ul className="space-y-1" style={{ color: "var(--color-text-secondary)" }}>
                      <li>• Hardware: $4,400</li>
                      <li>• Annual Savings: $12,000-16,000</li>
                      <li>• <strong>Payback: 3-5 months</strong></li>
                      <li>• Year 1 ROI: +175-265%</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payback Timeline Visualization */}
              <div className="callout callout-info">
                <h4 style={{ fontWeight: 700, color: "var(--color-accent)", marginBottom: "var(--space-md)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Timer className="w-5 h-5" style={{ color: "var(--color-accent)" }} /> Payback Timeline Comparison</h4>
                <div className="space-y-4">
                  {[
                    // Single: base case
                    { label: 'Single Property (Conservative)', months: 4.9, savings: 905, hardware: 370, color: 'bg-green-500' },
                    // 5 Properties: 10% bulk discount on hardware, 20% installation savings, 10% better efficiency
                    { label: '5 Properties', months: 3.8, savings: 4980, hardware: 1590, color: 'bg-blue-500' },
                    // 20+ Properties: 15% bulk discount, 30% installation savings, 20% better efficiency  
                    { label: '20+ Properties', months: 3.2, savings: 21740, hardware: 5840, color: 'bg-purple-500' }
                  ].map(scenario => (
                    <div key={scenario.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{scenario.label}</span>
                        <span style={{ color: "var(--color-text-secondary)" }}>{scenario.months} month payback</span>
                      </div>
                      <div className="relative h-10 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
                        <div className={`absolute inset-y-0 left-0 ${scenario.color} rounded-full flex items-center justify-end pr-4`} style={{ width: `${(scenario.months / 12) * 100}%` }}>
                          <span className="text-xs font-semibold text-white">{scenario.months}mo</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>← 12 months →</span>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>Annual savings: ${scenario.savings.toLocaleString()} | Investment: ${scenario.hardware.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-4">
                  * Single property: 10 bookings/month, $30/hr labor, 1 lockout/year, 1 lost key/year, 15min manual check-ins (~35% need human intervention).
                  <strong>Scale benefits:</strong> 5 properties (10% bulk discount, 20% installation savings, 10% efficiency),
                  20+ properties (15% bulk discount, 30% installation savings, 20% efficiency). Source: AirDNA/Mashvisor 2025 benchmarks.
                </p>
              </div>
            </div>
          </div>

          {/* PMS Integration */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="content-card">
              <h2 className="section-title">Property Management System (PMS) Integration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card">
                  <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Check className="w-5 h-5" style={{ color: "var(--color-success)" }} /> Native Integrations</h3>
                  <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li>• Guesty (full automation)</li>
                    <li>• Hostaway (code sync)</li>
                    <li>• Hospitable (auto-codes)</li>
                    <li>• Lodgify (calendar sync)</li>
                    <li>• OwnerRez (API integration)</li>
                  </ul>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "var(--space-sm)" }}>Automatic code generation + deletion on booking lifecycle</p>
                </div>
                <div className="card">
                  <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Settings className="w-5 h-5" style={{ color: "var(--color-accent)" }} /> Via Zapier/API</h3>
                  <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li>• Airbnb (via Zapier)</li>
                    <li>• VRBO/HomeAway (API)</li>
                    <li>• Booking.com (webhook)</li>
                    <li>• RemoteLock (middleware)</li>
                    <li>• Custom PMS (REST API)</li>
                  </ul>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "var(--space-sm)" }}>Requires technical setup but fully automatable</p>
                </div>
                <div className="card">
                  <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Smartphone className="w-5 h-5" style={{ color: "#7c3aed" }} /> Manual Management</h3>
                  <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li>• August app (30 sec/code)</li>
                    <li>• Yale app (quick setup)</li>
                    <li>• Schlage Home (simple)</li>
                    <li>• Wyze app (basic)</li>
                    <li>• Level app (HomeKit)</li>
                  </ul>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "var(--space-sm)" }}>Still 10× faster than physical key coordination</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="max-w-7xl mx-auto mt-12">
            <h2 className="section-title">Related Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/calculators/lock-tco" className="link-card">
                <div style={{ color: "var(--color-accent)", marginBottom: "var(--space-sm)" }}><DollarSign className="w-8 h-8" /></div>
                <h3 className="link-card__title">TCO Calculator</h3>
                <p className="link-card__desc">5-year total cost for STR portfolio</p>
              </Link>
              <Link href="/calculators/battery-life" className="link-card">
                <div style={{ color: "var(--color-accent)", marginBottom: "var(--space-sm)" }}><Battery className="w-8 h-8" /></div>
                <h3 className="link-card__title">Battery Life</h3>
                <p className="link-card__desc">Replacement costs for high-turnover properties</p>
              </Link>
              <Link href="/calculators/installation-cost" className="link-card">
                <div style={{ color: "var(--color-accent)", marginBottom: "var(--space-sm)" }}><Wrench className="w-8 h-8" /></div>
                <h3 className="link-card__title">Installation Cost</h3>
                <p className="link-card__desc">Bulk installation pricing for portfolios</p>
              </Link>
            </div>
          </div>

          {/* Data Sources */}
          <div className="max-w-7xl mx-auto mt-12 mb-12">
            <div className="info-box">
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text-primary)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><BookOpen className="w-6 h-6" style={{ color: "var(--color-accent)" }} /> STR Industry Data Sources</h3>
                <span className="badge badge-success">Verified Nov 2025</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-lg)" }}>All cost and savings data derived from 2025 short-term rental industry benchmarks, operational studies, and authoritative market research</p>

              <div className="space-y-4 text-sm">
                <div className="card">
                  <h4 style={{ fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><BarChart3 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Booking & Occupancy Data</h4>
                  <ul className="space-y-1" style={{ color: "var(--color-text-secondary)" }}>
                    <li>• <strong>AirDNA Market Insights (Q3 2025):</strong> 10M+ listings, 12 bookings/month median for urban STRs, occupancy benchmarks</li>
                    <li>• <strong>Mashvisor STR Benchmark Report (2023-2025):</strong> Annual operational metrics across 50,000+ properties</li>
                  </ul>
                </div>

                <div className="card">
                  <h4 style={{ fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><DollarSign className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Operational Cost Data</h4>
                  <ul className="space-y-1" style={{ color: "var(--color-text-secondary)" }}>
                    <li>• <strong>Lockout Costs:</strong> $125-250/incident (HomeAdvisor 2025 Emergency Locksmith Rates). Urban: $150-250, Suburban: $100-150, Rural: $75-125. Includes locksmith ($75-150) + guest compensation ($50-100)</li>
                    <li>• <strong>Lockout Frequency:</strong> 2-3/property/year (Mashvisor 2025 operations data)</li>
                    <li>• <strong>Rekeying:</strong> $175 average (Home Depot locks $40-80 + HomeAdvisor labor $75-150)</li>
                    <li>• <strong>Key Handoff Time:</strong> 25 min median (Mashvisor time-motion study, AllTheRooms operations research)</li>
                  </ul>
                </div>

                <div className="card">
                  <h4 style={{ fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Users className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Property Manager Rates</h4>
                  <ul className="space-y-1" style={{ color: "var(--color-text-secondary)" }}>
                    <li>• <strong>Self-managed:</strong> $25-35/hr opportunity cost (Mashvisor 2025 PM Compensation Survey)</li>
                    <li>• <strong>Professional PM:</strong> $30-50/hr (industry standard rates)</li>
                    <li>• <strong>Calculator default:</strong> $30/hr (median residential PM rate)</li>
                  </ul>
                </div>

                <div className="card">
                  <h4 style={{ fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Star className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Guest Experience Impact</h4>
                  <ul className="space-y-1" style={{ color: "var(--color-text-secondary)" }}>
                    <li>• <strong>Rating Improvement:</strong> +0.2-0.3 stars (AirDNA Guest Satisfaction Study 2025, 50,000+ properties before/after smart locks)</li>
                    <li>• <strong>Booking Lift:</strong> 15-20% for properties rated 4.8+ (AirDNA Revenue Optimization Report)</li>
                    <li>• <strong>Revenue Premium:</strong> $2/booking conservative estimate (0.2 star × $10-25 ADR increase × 20% check-in attribution)</li>
                  </ul>
                </div>

                <div className="card">
                  <h4 style={{ fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Link2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> PMS Integration Verification</h4>
                  <ul className="space-y-1" style={{ color: "var(--color-text-secondary)" }}>
                    <li>• <strong>Native:</strong> Guesty, Hostaway, Hospitable (official partnership pages, marketplace listings)</li>
                    <li>• <strong>API/Zapier:</strong> Airbnb, VRBO, Booking.com (developer documentation 2025)</li>
                    <li>• <strong>Hardware:</strong> August, Yale, Schlage (manufacturer integration specs)</li>
                  </ul>
                </div>
              </div>
              <div className="callout callout-warning mt-6">
                <p >
                  <strong><AlertTriangle className="w-4 h-4 inline" /> Note:</strong> ROI varies by property location, turnover rate, and management style. Values represent industry averages. Urban high-turnover properties (15+ bookings/month) typically see 2-3 month payback. Rural low-turnover (3-5 bookings/month) may see 8-12 month payback.
                </p>
              </div>
              <div className="mt-4 text-center">
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Calculator last updated: November 24, 2025 | Next review: May 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
