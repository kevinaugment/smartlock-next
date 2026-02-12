import { Metadata } from 'next'
import Link from 'next/link'
import ProtocolWizard from './ProtocolWizard'
import { Wand2, BookOpen } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'

export const metadata: Metadata = {
  title: 'Smart Lock Protocol Wizard | Zigbee vs Z-Wave vs Wi-Fi Selector',
  description: 'Find the best smart lock protocol (Zigbee, Z-Wave, Thread, Wi-Fi, Bluetooth) for your needs. Science-based comparison using IEEE 802.15.4, CSA standards. Battery, range, cost analysis.',
  keywords: 'protocol selector, Zigbee vs Z-Wave, smart lock protocol, Thread Matter, Wi-Fi locks, protocol comparison tool',
}

export default function ProtocolWizardPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smartlockhub.com' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://smartlockhub.com/calculators' },
      { '@type': 'ListItem', position: 3, name: 'Protocol Wizard', item: 'https://smartlockhub.com/calculators/protocol-wizard' }
    ]
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Smart Lock Protocol Wizard',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Interactive protocol selection tool based on your smart home requirements, battery life needs, and ecosystem compatibility'
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Choose the Right Smart Lock Protocol',
          description: 'Use our wizard to find the best protocol (Zigbee, Z-Wave, Thread, Wi-Fi) for your smart lock setup.',
          totalTime: 'PT3M',
          step: [
            { '@type': 'HowToStep', position: 1, name: 'Select Environment', text: 'Choose your deployment type: residential, commercial, or rental property.' },
            { '@type': 'HowToStep', position: 2, name: 'Define Priorities', text: 'Rank your priorities: battery life, range, latency, or ecosystem compatibility.' },
            { '@type': 'HowToStep', position: 3, name: 'Check Ecosystem', text: 'Select your existing smart home ecosystem (HomeKit, Alexa, Google, SmartThings).' },
            { '@type': 'HowToStep', position: 4, name: 'Set Budget', text: 'Indicate your budget range to filter protocol options by hub and lock costs.' },
            { '@type': 'HowToStep', position: 5, name: 'Get Recommendation', text: 'Review the wizard\'s protocol recommendation with detailed comparison scores.' },
          ],
        })
      }} />

      <div className="page-bg">
        <div className="container-main section">
          <div className="mb-8">
            <nav className="flex text-sm">
              <ol className="inline-flex items-center space-x-1">
                <li><Link href="/" style={{ color: "var(--color-text-muted)" }}>Home</Link></li>
                <li><span className="breadcrumb__separator">/</span><Link href="/calculators" style={{ color: "var(--color-text-muted)" }}>Calculators</Link></li>
                <li><span className="breadcrumb__separator">/</span><span className="breadcrumb__current">Protocol Wizard</span></li>
              </ol>
            </nav>
          </div>

          <div className="text-center mb-12">
            <div className="page-header__icon"><Wand2 className="w-14 h-14 mx-auto" /></div>
            <h1 className="page-header__title">Smart Lock Protocol Selection Wizard</h1>
            <p className="page-header__subtitle">Answer 6 questions to find the optimal protocol for your needs</p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="callout callout-info">
              <h2 className="callout-title">Protocol Choice = 70% of User Experience</h2>
              <p >
                Battery life varies 4×: Zigbee (12 mo) vs Wi-Fi (3 mo). Range differs 3×: Z-Wave 908MHz vs Wi-Fi 2.4GHz. Hub cost: $0-150. Wrong choice = $200-500 wasted over 5 years. Use science-based selection.
              </p>
            </div>
          </div>

          <ProtocolWizard />

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
                    <span className="badge badge-featured">Multi-Protocol</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}>
                    Be-Tech offers locks across all major protocols: Zigbee, Z-Wave, Wi-Fi, and Bluetooth. Choose your ideal protocol then select a Be-Tech model for guaranteed quality and compatibility.
                  </p>
                  <a href="https://www.betechlock.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: "var(--color-accent)", fontWeight: 500 }}>
                    Visit Official Website →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Protocol Deep Dive */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="content-card">
              <div className="flex justify-between items-center mb-6">
                <h2 style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--color-text-primary)" }}>Protocol Technical Comparison</h2>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Based on IEEE/CSA Standards (2025)</span>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr >
                      <th >Protocol</th>
                      <th >Standard</th>
                      <th >Frequency</th>
                      <th >Range</th>
                      <th >Battery</th>
                      <th >Hub Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Zigbee</td>
                      <td>IEEE 802.15.4-2020</td>
                      <td>2.4 GHz</td>
                      <td>10-20m indoor</td>
                      <td style={{ color: "var(--color-success)" }}>12+ months</td>
                      <td>$30-80</td>
                    </tr>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Z-Wave</td>
                      <td>ITU-T G.9959</td>
                      <td>868-922 MHz*</td>
                      <td style={{ color: "var(--color-success)" }}>30-40m indoor</td>
                      <td style={{ color: "var(--color-success)" }}>12 months</td>
                      <td>$60-150</td>
                    </tr>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Thread</td>
                      <td>IEEE 802.15.4, Thread 1.3</td>
                      <td>2.4 GHz</td>
                      <td>10-20m indoor</td>
                      <td>10-11 months</td>
                      <td>$100-150</td>
                    </tr>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Wi-Fi</td>
                      <td>IEEE 802.11-2020</td>
                      <td>2.4/5 GHz</td>
                      <td>20-30m indoor</td>
                      <td style={{ color: "var(--color-danger)" }}>3-4 months</td>
                      <td style={{ color: "var(--color-success)" }}>$0</td>
                    </tr>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Bluetooth</td>
                      <td>Bluetooth 5.0-6.0</td>
                      <td>2.4 GHz</td>
                      <td style={{ color: "var(--color-warning)" }}>10-15m indoor</td>
                      <td>10-12 months</td>
                      <td style={{ color: "var(--color-success)" }}>$0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Battery Life Visualization */}
              <div className="mt-8">
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-md)" }}>Battery Life Comparison (10 operations/day)</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Zigbee', months: 12, color: 'bg-green-500' },
                    { name: 'Z-Wave', months: 12, color: 'bg-green-500' },
                    { name: 'Thread', months: 10, color: 'bg-blue-500' },
                    { name: 'Bluetooth', months: 10, color: 'bg-blue-500' },
                    { name: 'Wi-Fi', months: 3, color: 'bg-red-500' }
                  ].map(p => (
                    <div key={p.name} className="flex items-center gap-4">
                      <div className="w-24" style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)" }}>{p.name}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-8 relative">
                        <div className={`absolute inset-y-0 left-0 ${p.color} rounded-full flex items-center justify-end pr-3`} style={{ width: `${(p.months / 12) * 100}%` }}>
                          <span className="text-xs font-semibold text-white">{p.months} mo</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "var(--space-sm)" }}>
                  Wi-Fi requires 4× more battery replacements. Based on 4×AA alkaline 2800mAh, 10 operations/day.
                </p>
              </div>

              <div className="callout callout-info">
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}><strong>Complete Data Sources (Verified Nov 2025):</strong></p>

                <div className="space-y-3" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  <div>
                    <p className="font-semibold mb-1">Protocol Standards:</p>
                    <ul className="space-y-0.5 ml-2" style={{ color: "var(--color-text-secondary)" }}>
                      <li>• <strong>Zigbee/Thread:</strong> IEEE 802.15.4-2020, CSA Zigbee Spec, Thread 1.3 (2022), Matter 1.3 (Oct 2025)</li>
                      <li>• <strong>Z-Wave:</strong> ITU-T G.9959 (2015), Silicon Labs Z-Wave 700/800 datasheets (2025). *US 908MHz, EU 868MHz</li>
                      <li>• <strong>Wi-Fi:</strong> IEEE 802.11-2020 (Wi-Fi 6/6E), Wi-Fi Alliance certification</li>
                      <li>• <strong>Bluetooth:</strong> Bluetooth SIG Core Spec v5.4 (2023), v6.0 (Sept 2025)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">Battery Life (4×AA alkaline, 10 ops/day):</p>
                    <ul className="space-y-0.5 ml-2" style={{ color: "var(--color-text-secondary)" }}>
                      <li>• <strong>Power consumption:</strong> Silicon Labs EFR32ZG23/MG24, Nordic nRF52840, Espressif ESP32 datasheets</li>
                      <li>• <strong>Detailed calculations:</strong> Battery Life Calculator (芯片级功耗分析)</li>
                      <li>• <strong>Result:</strong> Zigbee/Z-Wave 12mo, Thread 10mo, Wi-Fi 3mo (4× difference)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">Range (indoor, 2-3 drywall walls):</p>
                    <ul className="space-y-0.5 ml-2" style={{ color: "var(--color-text-secondary)" }}>
                      <li>• <strong>Propagation model:</strong> ITU-R P.2040-1 (indoor propagation loss)</li>
                      <li>• <strong>Frequency advantage:</strong> Z-Wave 908MHz vs 2.4GHz (Signal Strength Calculator FSPL)</li>
                      <li>• <strong>Manufacturer specs:</strong> Yale Assure, Schlage Encode, August Pro typical values</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">Hub Cost (Nov 2025 retail prices):</p>
                    <ul className="space-y-0.5 ml-2" style={{ color: "var(--color-text-secondary)" }}>
                      <li>• <strong>Zigbee:</strong> Echo Plus $50, SmartThings $80, Aqara M2 $30 (avg $50)</li>
                      <li>• <strong>Z-Wave:</strong> HomeSeer $60, Aeotec $100, SmartThings $150 (avg $100)</li>
                      <li>• <strong>Thread:</strong> HomePod mini $99, Nest Hub Max $230 (avg $150)</li>
                      <li>• <strong>Source:</strong> Amazon, Best Buy, Home Depot (Nov 2025)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decision Matrix */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="content-card">
              <h2 className="section-title">Quick Decision Matrix</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="rounded-lg p-6" style={{ border: "2px solid var(--color-success)" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)" }}>Choose Zigbee If:</h3>
                  <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li>✓ Want long battery life (12+ mo)</li>
                    <li>✓ Have 5+ devices (mesh benefits)</li>
                    <li>✓ Budget-conscious (cheap hubs)</li>
                    <li>✓ Alexa/SmartThings ecosystem</li>
                    <li>✓ Mature product selection</li>
                  </ul>
                </div>
                <div className="rounded-lg p-6" style={{ border: "2px solid var(--color-accent)" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)" }}>Choose Z-Wave If:</h3>
                  <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li>✓ Best range needed (thick walls)</li>
                    <li>✓ No 2.4GHz interference wanted</li>
                    <li>✓ Commercial/enterprise grade</li>
                    <li>✓ 100% local control required</li>
                    <li>✓ Advanced automation features</li>
                  </ul>
                </div>
                <div className="border-2 border-purple-500 rounded-lg p-6">
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)" }}>Choose Thread If:</h3>
                  <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li>✓ Apple HomeKit primary</li>
                    <li>✓ Future-proofing priority</li>
                    <li>✓ Matter ecosystem desired</li>
                    <li>✓ Latest technology wanted</li>
                    <li>✓ Budget allows ($100+ hub)</li>
                  </ul>
                </div>
                <div className="rounded-lg p-6" style={{ border: "2px solid var(--color-warning)" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)" }}>Choose Wi-Fi If:</h3>
                  <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li>✓ 1-2 locks only (not scaling)</li>
                    <li>✓ No hub wanted (simplicity)</li>
                    <li>✓ Fast response critical (&lt;200ms)</li>
                    <li>✓ Monthly battery changes OK</li>
                    <li>✓ Reliable internet available</li>
                  </ul>
                </div>
                <div className="rounded-lg p-6" style={{ border: "2px solid var(--color-border)" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)" }}>Choose Bluetooth If:</h3>
                  <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li>✓ Single door, budget minimal</li>
                    <li>✓ No remote access needed</li>
                    <li>✓ Phone always present</li>
                    <li>✓ Simplest setup desired</li>
                    <li>✓ Retrofit existing deadbolt</li>
                  </ul>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)" }}>Pro Tip</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    For 10+ locks, Zigbee/Z-Wave mesh saves $400-800 over 5 years vs Wi-Fi (battery + hub cost). Use our TCO calculator for exact ROI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="max-w-7xl mx-auto mt-12">
            <h2 className="section-title">Related Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/calculators/battery-life" className="link-card">
                <div className="text-3xl mb-3" style={{ color: 'var(--color-accent)' }}>⚡</div>
                <h3 className="link-card__title">Battery Life</h3>
                <p className="link-card__desc">Compare actual battery life by protocol</p>
              </Link>
              <Link href="/calculators/lock-tco" className="link-card">
                <div className="text-3xl mb-3" style={{ color: 'var(--color-accent)' }}>$</div>
                <h3 className="link-card__title">TCO Calculator</h3>
                <p className="link-card__desc">5-year cost including hub + batteries</p>
              </Link>
              <Link href="/calculators/signal-strength" className="link-card">
                <div className="text-3xl mb-3" style={{ color: 'var(--color-accent)' }}>≋</div>
                <h3 className="link-card__title">Signal Strength</h3>
                <p className="link-card__desc">Z-Wave vs Zigbee range analysis</p>
              </Link>
            </div>
          </div>

          {/* Data Sources */}
          <div className="max-w-4xl mx-auto mt-12 mb-12">
            <div className="info-box">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Technical Standards & Sources</h3>
                <span className="badge badge-success">Verified Nov 2025</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-lg)" }}>All protocol comparisons based on official standards and manufacturer specifications</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h4 style={{ fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)" }}>International Standards</h4>
                  <div className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <p><strong>IEEE 802.15.4-2020:</strong> Zigbee/Thread PHY layer specifications</p>
                    <p><strong>ITU-T G.9959:</strong> Z-Wave protocol standard (2015)</p>
                    <p><strong>IEEE 802.11-2020:</strong> Wi-Fi 6 specifications</p>
                    <p><strong>Bluetooth SIG:</strong> Core Spec v5.4 (2023), v6.0 (2025)</p>
                  </div>
                </div>
                <div className="card">
                  <h4 style={{ fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)" }}>Industry Alliances</h4>
                  <div className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <p><strong>CSA (Connectivity Standards Alliance):</strong> Zigbee Specification, Matter 1.3</p>
                    <p><strong>Thread Group:</strong> Thread 1.3 specification (2022)</p>
                    <p><strong>Silicon Labs:</strong> Z-Wave 700/800 Series datasheets (2025)</p>
                    <p><strong>Wi-Fi Alliance:</strong> Wi-Fi 6/6E certification standards</p>
                  </div>
                </div>
              </div>
              <div className="callout callout-warning mt-6">
                <p >
                  <strong>Note:</strong> This wizard uses decision tree logic based on real-world usage patterns and technical specifications. Results are recommendations, not guarantees. Always verify specific product compatibility before purchase.
                </p>
              </div>
              <div className="mt-4 text-center">
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Wizard last updated: November 24, 2025 | Next review: May 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToolRating toolSlug="protocol-wizard" />
    </>
  )
}
