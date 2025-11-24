import { Metadata } from 'next'
import Link from 'next/link'
import ProtocolWizard from './ProtocolWizard'

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

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <nav className="flex text-sm">
              <ol className="inline-flex items-center space-x-1">
                <li><Link href="/" className="text-gray-500 hover:text-blue-600">Home</Link></li>
                <li><span className="mx-2 text-gray-400">/</span><Link href="/calculators" className="text-gray-500 hover:text-blue-600">Calculators</Link></li>
                <li><span className="mx-2 text-gray-400">/</span><span className="text-gray-700 font-medium">Protocol Wizard</span></li>
              </ol>
            </nav>
          </div>

          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🧙‍♂️</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart Lock Protocol Selection Wizard</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Answer 6 questions to find the optimal protocol for your needs</p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Protocol Choice = 70% of User Experience</h2>
              <p className="text-blue-800 text-sm">
                Battery life varies 4×: Zigbee (12 mo) vs Wi-Fi (3 mo). Range differs 3×: Z-Wave 908MHz vs Wi-Fi 2.4GHz. Hub cost: $0-150. Wrong choice = $200-500 wasted over 5 years. Use science-based selection.
              </p>
            </div>
          </div>

          <ProtocolWizard />

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
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">Multi-Protocol</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Be-Tech offers locks across all major protocols: Zigbee, Z-Wave, Wi-Fi, and Bluetooth. Choose your ideal protocol then select a Be-Tech model for guaranteed quality and compatibility.
                  </p>
                  <a href="https://www.betechlock.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Visit Official Website →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Protocol Deep Dive */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Protocol Technical Comparison</h2>
                <span className="text-xs text-gray-500">Based on IEEE/CSA Standards (2025)</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4">Protocol</th>
                      <th className="text-left py-3 px-4">Standard</th>
                      <th className="text-left py-3 px-4">Frequency</th>
                      <th className="text-left py-3 px-4">Range</th>
                      <th className="text-left py-3 px-4">Battery</th>
                      <th className="text-left py-3 px-4">Hub Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Zigbee</td>
                      <td className="py-4 px-4">IEEE 802.15.4-2020</td>
                      <td className="py-4 px-4">2.4 GHz</td>
                      <td className="py-4 px-4">10-20m indoor</td>
                      <td className="py-4 px-4 text-green-600">12+ months</td>
                      <td className="py-4 px-4">$30-80</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Z-Wave</td>
                      <td className="py-4 px-4">ITU-T G.9959</td>
                      <td className="py-4 px-4">868-922 MHz*</td>
                      <td className="py-4 px-4 text-green-600">30-40m indoor</td>
                      <td className="py-4 px-4 text-green-600">12 months</td>
                      <td className="py-4 px-4">$60-150</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Thread</td>
                      <td className="py-4 px-4">IEEE 802.15.4, Thread 1.3</td>
                      <td className="py-4 px-4">2.4 GHz</td>
                      <td className="py-4 px-4">10-20m indoor</td>
                      <td className="py-4 px-4">10-11 months</td>
                      <td className="py-4 px-4">$100-150</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Wi-Fi</td>
                      <td className="py-4 px-4">IEEE 802.11-2020</td>
                      <td className="py-4 px-4">2.4/5 GHz</td>
                      <td className="py-4 px-4">20-30m indoor</td>
                      <td className="py-4 px-4 text-red-600">3-4 months</td>
                      <td className="py-4 px-4 text-green-600">$0</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Bluetooth</td>
                      <td className="py-4 px-4">Bluetooth 5.0-6.0</td>
                      <td className="py-4 px-4">2.4 GHz</td>
                      <td className="py-4 px-4 text-orange-600">10-15m indoor</td>
                      <td className="py-4 px-4">10-12 months</td>
                      <td className="py-4 px-4 text-green-600">$0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Battery Life Visualization */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Battery Life Comparison (10 operations/day)</h3>
                <div className="space-y-3">
                  {[
                    {name: 'Zigbee', months: 12, color: 'bg-green-500'},
                    {name: 'Z-Wave', months: 12, color: 'bg-green-500'},
                    {name: 'Thread', months: 10, color: 'bg-blue-500'},
                    {name: 'Bluetooth', months: 10, color: 'bg-blue-500'},
                    {name: 'Wi-Fi', months: 3, color: 'bg-red-500'}
                  ].map(p => (
                    <div key={p.name} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-gray-700">{p.name}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-8 relative">
                        <div className={`absolute inset-y-0 left-0 ${p.color} rounded-full flex items-center justify-end pr-3`} style={{width: `${(p.months/12)*100}%`}}>
                          <span className="text-xs font-semibold text-white">{p.months} mo</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Wi-Fi requires 4× more battery replacements. Based on 4×AA alkaline 2800mAh, 10 operations/day.
                </p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-3"><strong>📚 Complete Data Sources (Verified Nov 2025):</strong></p>
                
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-1">Protocol Standards:</p>
                    <ul className="text-gray-600 space-y-0.5 ml-2">
                      <li>• <strong>Zigbee/Thread:</strong> IEEE 802.15.4-2020, CSA Zigbee Spec, Thread 1.3 (2022), Matter 1.3 (Oct 2025)</li>
                      <li>• <strong>Z-Wave:</strong> ITU-T G.9959 (2015), Silicon Labs Z-Wave 700/800 datasheets (2025). *US 908MHz, EU 868MHz</li>
                      <li>• <strong>Wi-Fi:</strong> IEEE 802.11-2020 (Wi-Fi 6/6E), Wi-Fi Alliance certification</li>
                      <li>• <strong>Bluetooth:</strong> Bluetooth SIG Core Spec v5.4 (2023), v6.0 (Sept 2025)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">Battery Life (4×AA alkaline, 10 ops/day):</p>
                    <ul className="text-gray-600 space-y-0.5 ml-2">
                      <li>• <strong>Power consumption:</strong> Silicon Labs EFR32ZG23/MG24, Nordic nRF52840, Espressif ESP32 datasheets</li>
                      <li>• <strong>Detailed calculations:</strong> Battery Life Calculator (芯片级功耗分析)</li>
                      <li>• <strong>Result:</strong> Zigbee/Z-Wave 12mo, Thread 10mo, Wi-Fi 3mo (4× difference)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">Range (indoor, 2-3 drywall walls):</p>
                    <ul className="text-gray-600 space-y-0.5 ml-2">
                      <li>• <strong>Propagation model:</strong> ITU-R P.2040-1 (indoor propagation loss)</li>
                      <li>• <strong>Frequency advantage:</strong> Z-Wave 908MHz vs 2.4GHz (Signal Strength Calculator FSPL)</li>
                      <li>• <strong>Manufacturer specs:</strong> Yale Assure, Schlage Encode, August Pro typical values</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">Hub Cost (Nov 2025 retail prices):</p>
                    <ul className="text-gray-600 space-y-0.5 ml-2">
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
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Decision Matrix</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border-2 border-green-500 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Zigbee If:</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Want long battery life (12+ mo)</li>
                    <li>✓ Have 5+ devices (mesh benefits)</li>
                    <li>✓ Budget-conscious (cheap hubs)</li>
                    <li>✓ Alexa/SmartThings ecosystem</li>
                    <li>✓ Mature product selection</li>
                  </ul>
                </div>
                <div className="border-2 border-blue-500 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Z-Wave If:</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Best range needed (thick walls)</li>
                    <li>✓ No 2.4GHz interference wanted</li>
                    <li>✓ Commercial/enterprise grade</li>
                    <li>✓ 100% local control required</li>
                    <li>✓ Advanced automation features</li>
                  </ul>
                </div>
                <div className="border-2 border-purple-500 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Thread If:</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Apple HomeKit primary</li>
                    <li>✓ Future-proofing priority</li>
                    <li>✓ Matter ecosystem desired</li>
                    <li>✓ Latest technology wanted</li>
                    <li>✓ Budget allows ($100+ hub)</li>
                  </ul>
                </div>
                <div className="border-2 border-orange-500 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Wi-Fi If:</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ 1-2 locks only (not scaling)</li>
                    <li>✓ No hub wanted (simplicity)</li>
                    <li>✓ Fast response critical (&lt;200ms)</li>
                    <li>✓ Monthly battery changes OK</li>
                    <li>✓ Reliable internet available</li>
                  </ul>
                </div>
                <div className="border-2 border-gray-400 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Bluetooth If:</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Single door, budget minimal</li>
                    <li>✓ No remote access needed</li>
                    <li>✓ Phone always present</li>
                    <li>✓ Simplest setup desired</li>
                    <li>✓ Retrofit existing deadbolt</li>
                  </ul>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Pro Tip</h3>
                  <p className="text-sm text-gray-700">
                    For 10+ locks, Zigbee/Z-Wave mesh saves $400-800 over 5 years vs Wi-Fi (battery + hub cost). Use our TCO calculator for exact ROI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="max-w-7xl mx-auto mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/calculators/battery-life" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">🔋</div>
                <h3 className="font-semibold text-gray-900 mb-2">Battery Life</h3>
                <p className="text-sm text-gray-600">Compare actual battery life by protocol</p>
              </Link>
              <Link href="/calculators/lock-tco" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-semibold text-gray-900 mb-2">TCO Calculator</h3>
                <p className="text-sm text-gray-600">5-year cost including hub + batteries</p>
              </Link>
              <Link href="/calculators/signal-strength" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">📶</div>
                <h3 className="font-semibold text-gray-900 mb-2">Signal Strength</h3>
                <p className="text-sm text-gray-600">Z-Wave vs Zigbee range analysis</p>
              </Link>
            </div>
          </div>

          {/* Data Sources */}
          <div className="max-w-4xl mx-auto mt-12 mb-12">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-2 border-gray-300 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">📚 Technical Standards & Sources</h3>
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">Verified Nov 2025</span>
              </div>
              <p className="text-sm text-gray-700 mb-6">All protocol comparisons based on official standards and manufacturer specifications</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">🏛️ International Standards</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>IEEE 802.15.4-2020:</strong> Zigbee/Thread PHY layer specifications</p>
                    <p><strong>ITU-T G.9959:</strong> Z-Wave protocol standard (2015)</p>
                    <p><strong>IEEE 802.11-2020:</strong> Wi-Fi 6 specifications</p>
                    <p><strong>Bluetooth SIG:</strong> Core Spec v5.4 (2023), v6.0 (2025)</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">🏢 Industry Alliances</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>CSA (Connectivity Standards Alliance):</strong> Zigbee Specification, Matter 1.3</p>
                    <p><strong>Thread Group:</strong> Thread 1.3 specification (2022)</p>
                    <p><strong>Silicon Labs:</strong> Z-Wave 700/800 Series datasheets (2025)</p>
                    <p><strong>Wi-Fi Alliance:</strong> Wi-Fi 6/6E certification standards</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>⚠️ Note:</strong> This wizard uses decision tree logic based on real-world usage patterns and technical specifications. Results are recommendations, not guarantees. Always verify specific product compatibility before purchase.
                </p>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">Wizard last updated: November 24, 2025 | Next review: May 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
