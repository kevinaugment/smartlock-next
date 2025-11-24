import { Metadata } from 'next'
import Link from 'next/link'
import STRCalculator from './STRCalculator'

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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smartlockhub.com' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://smartlockhub.com/calculators' },
      { '@type': 'ListItem', position: 3, name: 'STR ROI Calculator', item: 'https://smartlockhub.com/calculators/str-roi' }
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

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <nav className="flex text-sm">
              <ol className="inline-flex items-center space-x-1">
                <li><Link href="/" className="text-gray-500 hover:text-blue-600">Home</Link></li>
                <li><span className="mx-2 text-gray-400">/</span><Link href="/calculators" className="text-gray-500 hover:text-blue-600">Calculators</Link></li>
                <li><span className="mx-2 text-gray-400">/</span><span className="text-gray-700 font-medium">STR ROI Calculator</span></li>
              </ol>
            </nav>
          </div>

          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🏠</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Short-Term Rental Smart Lock ROI Calculator</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Calculate labor savings, lockout costs, and payback period for your Airbnb/VRBO smart lock investment</p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">2025 STR Industry Reality</h2>
              <p className="text-blue-800 text-sm">
                <strong>Average STR:</strong> 12 bookings/month, 25min key handoff = 50 hours/year wasted. <strong>Lockouts:</strong> 2-3/year @ $125-175 each (emergency locksmith + guest comp). <strong>Lost keys:</strong> 1-2/year @ $175 rekeying. Smart locks eliminate 90% of these costs with 3-8 month payback typical. Data: AirDNA 2025, Mashvisor STR Benchmark Report.
              </p>
            </div>
          </div>

          <STRCalculator />

          {/* Be-Tech Brand */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 flex items-center justify-center border border-gray-200">
                    <img src="/images/brands/be-tech-logo.png" alt="Be-Tech Logo" className="w-full h-full object-contain"/>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">Recommended: Be-Tech</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">STR Optimized</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Be-Tech locks are ideal for high-turnover STR properties: remote management, temporary codes, activity logs, and 12+ month battery life reduce operational overhead. Compatible with major PMS systems (Guesty, Hostaway, Hospitable).
                  </p>
                  <a href="https://www.betechlock.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Visit Official Website →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">STR Smart Lock Cost-Benefit Analysis</h2>
                <span className="text-xs text-gray-500">Industry Data: 2025</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Quantifiable Savings</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <div>
                        <strong>Labor Elimination:</strong> Average 50 hours/year @ $30/hr = $1,500 savings for 5-property portfolio. No more coordinating key handoffs, late-night check-ins, or physical key management.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <div>
                        <strong>Lockout Prevention:</strong> $125-175/incident (emergency locksmith $75-100 + guest compensation $50-75). Industry avg: 2.3 lockouts/property/year = $287-402 saved.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <div>
                        <strong>Rekeying Elimination:</strong> $175/incident (lock replacement + labor). Smart locks use temporary codes - no physical key lost = no rekeying needed.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <div>
                        <strong>Guest Experience:</strong> Seamless check-in improves reviews 0.2-0.3 stars (AirDNA data). Higher rating = 15-20% booking increase = significant revenue impact.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <div>
                        <strong>Operational Scalability:</strong> Manage 50 properties as easily as 5. No linear cost increase with portfolio growth (unlike physical keys).
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">💸 Investment Costs</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <div>
                        <strong>Hardware:</strong> $120-350/lock depending on features. Basic Wi-Fi ($120), Standard Zigbee ($220), Premium Thread ($350). One-time cost.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <div>
                        <strong>Installation:</strong> $150-200/lock for professional install (or DIY 2-3 hours). See Installation Cost Calculator for detailed breakdown.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <div>
                        <strong>Hub (if needed):</strong> $50-150 for Zigbee/Z-Wave. Wi-Fi locks require no hub. Thread requires $100-150 border router.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <div>
                        <strong>Batteries:</strong> $10-15/year (12+ months for Zigbee/Z-Wave, 3-4 months for Wi-Fi). See Battery Life Calculator.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <div>
                        <strong>PMS Integration:</strong> $0-50/month depending on property management software. Many integrate free (Guesty, Hospitable).
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <h4 className="font-bold text-green-900 mb-3">📊 Typical ROI Scenarios (2025 Data)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-4 rounded">
                    <p className="font-semibold text-gray-900 mb-2">Single Property (12 bookings/mo)</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Hardware: $220</li>
                      <li>• Annual Savings: $600-800</li>
                      <li>• <strong>Payback: 3-4 months</strong></li>
                      <li>• Year 1 ROI: +175-265%</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded">
                    <p className="font-semibold text-gray-900 mb-2">Small Portfolio (5 properties)</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Hardware: $1,100</li>
                      <li>• Annual Savings: $3,000-4,000</li>
                      <li>• <strong>Payback: 3-5 months</strong></li>
                      <li>• Year 1 ROI: +180-265%</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded">
                    <p className="font-semibold text-gray-900 mb-2">Large Portfolio (20+ properties)</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Hardware: $4,400</li>
                      <li>• Annual Savings: $12,000-16,000</li>
                      <li>• <strong>Payback: 3-5 months</strong></li>
                      <li>• Year 1 ROI: +175-265%</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payback Timeline Visualization */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h4 className="font-bold text-blue-900 mb-4">⏱️ Payback Timeline Comparison</h4>
                <div className="space-y-4">
                  {[
                    // Single: base case
                    {label: 'Single Property (Conservative)', months: 4.9, savings: 905, hardware: 370, color: 'bg-green-500'},
                    // 5 Properties: 10% bulk discount on hardware, 20% installation savings, 10% better efficiency
                    {label: '5 Properties', months: 3.8, savings: 4980, hardware: 1590, color: 'bg-blue-500'},
                    // 20+ Properties: 15% bulk discount, 30% installation savings, 20% better efficiency  
                    {label: '20+ Properties', months: 3.2, savings: 21740, hardware: 5840, color: 'bg-purple-500'}
                  ].map(scenario => (
                    <div key={scenario.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-900">{scenario.label}</span>
                        <span className="text-gray-600">{scenario.months} month payback</span>
                      </div>
                      <div className="relative h-10 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`absolute inset-y-0 left-0 ${scenario.color} rounded-full flex items-center justify-end pr-4`} style={{width: `${(scenario.months/12)*100}%`}}>
                          <span className="text-xs font-semibold text-white">{scenario.months}mo</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="text-xs text-gray-500">← 12 months →</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">Annual savings: ${scenario.savings.toLocaleString()} | Investment: ${scenario.hardware.toLocaleString()}</p>
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
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Property Management System (PMS) Integration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">✓ Native Integrations</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Guesty (full automation)</li>
                    <li>• Hostaway (code sync)</li>
                    <li>• Hospitable (auto-codes)</li>
                    <li>• Lodgify (calendar sync)</li>
                    <li>• OwnerRez (API integration)</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">Automatic code generation + deletion on booking lifecycle</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">⚙️ Via Zapier/API</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Airbnb (via Zapier)</li>
                    <li>• VRBO/HomeAway (API)</li>
                    <li>• Booking.com (webhook)</li>
                    <li>• RemoteLock (middleware)</li>
                    <li>• Custom PMS (REST API)</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">Requires technical setup but fully automatable</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">📱 Manual Management</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• August app (30 sec/code)</li>
                    <li>• Yale app (quick setup)</li>
                    <li>• Schlage Home (simple)</li>
                    <li>• Wyze app (basic)</li>
                    <li>• Level app (HomeKit)</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">Still 10× faster than physical key coordination</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="max-w-7xl mx-auto mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/calculators/lock-tco" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-semibold text-gray-900 mb-2">TCO Calculator</h3>
                <p className="text-sm text-gray-600">5-year total cost for STR portfolio</p>
              </Link>
              <Link href="/calculators/battery-life" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">🔋</div>
                <h3 className="font-semibold text-gray-900 mb-2">Battery Life</h3>
                <p className="text-sm text-gray-600">Replacement costs for high-turnover properties</p>
              </Link>
              <Link href="/calculators/installation-cost" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">🔧</div>
                <h3 className="font-semibold text-gray-900 mb-2">Installation Cost</h3>
                <p className="text-sm text-gray-600">Bulk installation pricing for portfolios</p>
              </Link>
            </div>
          </div>

          {/* Data Sources */}
          <div className="max-w-4xl mx-auto mt-12 mb-12">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-2 border-gray-300 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">📚 STR Industry Data Sources</h3>
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">Verified Nov 2025</span>
              </div>
              <p className="text-sm text-gray-700 mb-6">All cost and savings data derived from 2025 short-term rental industry benchmarks, operational studies, and authoritative market research</p>
              
              <div className="space-y-4 text-sm">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">📊 Booking & Occupancy Data</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>AirDNA Market Insights (Q3 2025):</strong> 10M+ listings, 12 bookings/month median for urban STRs, occupancy benchmarks</li>
                    <li>• <strong>Mashvisor STR Benchmark Report (2023-2025):</strong> Annual operational metrics across 50,000+ properties</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">💰 Operational Cost Data</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>Lockout Costs:</strong> $125-250/incident (HomeAdvisor 2025 Emergency Locksmith Rates). Urban: $150-250, Suburban: $100-150, Rural: $75-125. Includes locksmith ($75-150) + guest compensation ($50-100)</li>
                    <li>• <strong>Lockout Frequency:</strong> 2-3/property/year (Mashvisor 2025 operations data)</li>
                    <li>• <strong>Rekeying:</strong> $175 average (Home Depot locks $40-80 + HomeAdvisor labor $75-150)</li>
                    <li>• <strong>Key Handoff Time:</strong> 25 min median (Mashvisor time-motion study, AllTheRooms operations research)</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">👥 Property Manager Rates</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>Self-managed:</strong> $25-35/hr opportunity cost (Mashvisor 2025 PM Compensation Survey)</li>
                    <li>• <strong>Professional PM:</strong> $30-50/hr (industry standard rates)</li>
                    <li>• <strong>Calculator default:</strong> $30/hr (median residential PM rate)</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">⭐ Guest Experience Impact</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>Rating Improvement:</strong> +0.2-0.3 stars (AirDNA Guest Satisfaction Study 2025, 50,000+ properties before/after smart locks)</li>
                    <li>• <strong>Booking Lift:</strong> 15-20% for properties rated 4.8+ (AirDNA Revenue Optimization Report)</li>
                    <li>• <strong>Revenue Premium:</strong> $2/booking conservative estimate (0.2 star × $10-25 ADR increase × 20% check-in attribution)</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">🔗 PMS Integration Verification</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>Native:</strong> Guesty, Hostaway, Hospitable (official partnership pages, marketplace listings)</li>
                    <li>• <strong>API/Zapier:</strong> Airbnb, VRBO, Booking.com (developer documentation 2025)</li>
                    <li>• <strong>Hardware:</strong> August, Yale, Schlage (manufacturer integration specs)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>⚠️ Note:</strong> ROI varies by property location, turnover rate, and management style. Values represent industry averages. Urban high-turnover properties (15+ bookings/month) typically see 2-3 month payback. Rural low-turnover (3-5 bookings/month) may see 8-12 month payback.
                </p>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">Calculator last updated: November 24, 2025 | Next review: May 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
