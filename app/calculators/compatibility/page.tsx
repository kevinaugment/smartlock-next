import { Metadata } from 'next'
import Link from 'next/link'
import CompatibilityChecker from './CompatibilityChecker'

export const metadata: Metadata = {
  title: 'Smart Lock Door Compatibility Checker | ANSI A156.2 Standards',
  description: 'Verify smart lock compatibility using ANSI/BHMA A156.2 standards. Check door thickness (35-57mm), backset (60/70mm), material, and bore holes. Instant compatibility score.',
  keywords: 'smart lock compatibility, door thickness, backset measurement, ANSI A156.2, bore hole size, door compatibility checker',
}

export default function CompatibilityPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smartlockhub.com' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://smartlockhub.com/calculators' },
      { '@type': 'ListItem', position: 3, name: 'Compatibility Checker', item: 'https://smartlockhub.com/calculators/compatibility' }
    ]
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Smart Lock Compatibility Checker',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Check smart lock door compatibility using ANSI A156.2 standards for thickness, backset, and bore holes'
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
                <li><span className="mx-2 text-gray-400">/</span><span className="text-gray-700 font-medium">Compatibility Checker</span></li>
              </ol>
            </nav>
          </div>

          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart Lock Door Compatibility Checker</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Verify compatibility using ANSI/BHMA A156.2 industry standards</p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">ANSI A156.2-2019 Standards</h2>
              <p className="text-blue-800 text-sm">
                <strong>Thickness:</strong> 35-57mm (1-3/8" to 2-1/4") | <strong>Backset:</strong> 60mm or 70mm (2-3/8"/2-3/4") | <strong>Bore:</strong> 54mm (2-1/8") standard. Non-standard specs require adapters or modifications. Verify before purchase to avoid $150+ modification costs.
              </p>
            </div>
          </div>

          <CompatibilityChecker />

          {/* Be-Tech Brand */}
          <div className="max-w-7xl mx-auto mt-8">
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
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">Wide Compatibility</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Be-Tech locks support 35-57mm thickness, 60/70mm backset, and standard 54mm bores. Compatible with wood, metal, and composite doors. ANSI A156.2 compliant.
                  </p>
                  <a href="https://www.betechlock.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Visit Official Website →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ANSI Standards Table */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">ANSI/BHMA A156.2 Specifications</h2>
                <span className="text-xs text-gray-500">Updated: November 2025</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4">Parameter</th>
                      <th className="text-left py-3 px-4">Standard Value</th>
                      <th className="text-left py-3 px-4">Acceptable Range</th>
                      <th className="text-left py-3 px-4">Non-Standard Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Door Thickness</td>
                      <td className="py-4 px-4">44mm (1-3/4")</td>
                      <td className="py-4 px-4 text-green-600">35-57mm (1-3/8" to 2-1/4")</td>
                      <td className="py-4 px-4 text-gray-600">&lt;35mm: surface mount only. &gt;57mm: extension kit needed</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Backset</td>
                      <td className="py-4 px-4">60mm or 70mm</td>
                      <td className="py-4 px-4 text-green-600">60mm (2-3/8"), 70mm (2-3/4")</td>
                      <td className="py-4 px-4 text-gray-600">Non-standard requires re-drilling or adjustable lock</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Bore Hole (Cylinder)</td>
                      <td className="py-4 px-4">54mm (2-1/8")</td>
                      <td className="py-4 px-4 text-green-600">54mm standard</td>
                      <td className="py-4 px-4 text-gray-600">Smaller: drill out. Larger: use reducer ring</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Latch Bore</td>
                      <td className="py-4 px-4">25mm (1")</td>
                      <td className="py-4 px-4 text-green-600">25mm standard</td>
                      <td className="py-4 px-4 text-gray-600">Required for latch bolt installation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>ANSI/BHMA Standards Authority:</strong></p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>ANSI A156.2-2019:</strong> Bored Locks and Latches (American National Standards Institute)</li>
                  <li>• <strong>BHMA (Builders Hardware Manufacturers Association):</strong> Industry testing and certification body</li>
                  <li>• <strong>UL 10C:</strong> Fire door hardware standards (safety compliance)</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">All measurements are industry-standard minimums. Local building codes may impose stricter requirements.</p>
              </div>
            </div>
          </div>

          {/* Door Material Compatibility */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Door Material Compatibility Matrix</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border-2 border-green-500 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">✓</div>
                    <h3 className="font-semibold text-gray-900">Wood Doors</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3"><strong>Compatibility: 100%</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• All smart locks compatible</li>
                    <li>• Easiest installation (standard drill bits)</li>
                    <li>• Solid core &gt; hollow core (stability)</li>
                  </ul>
                </div>
                <div className="border-2 border-blue-500 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">⚙️</div>
                    <h3 className="font-semibold text-gray-900">Metal Doors</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3"><strong>Compatibility: 90%</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Requires cobalt/carbide drill bits</li>
                    <li>• Slower drill speed (300 RPM)</li>
                    <li>• Reinforced mounting plates recommended</li>
                  </ul>
                </div>
                <div className="border-2 border-yellow-500 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">⚠️</div>
                    <h3 className="font-semibold text-gray-900">Fiberglass</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3"><strong>Compatibility: 85%</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• May crack - use masking tape</li>
                    <li>• Verify lock weight &lt; 4 lbs</li>
                    <li>• Avoid over-tightening screws</li>
                  </ul>
                </div>
                <div className="border-2 border-orange-500 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">🔍</div>
                    <h3 className="font-semibold text-gray-900">Composite</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3"><strong>Compatibility: 80%</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Density varies by manufacturer</li>
                    <li>• Foam core may need reinforcement</li>
                    <li>• Verify with door manufacturer first</li>
                  </ul>
                </div>
                <div className="border-2 border-red-500 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">❌</div>
                    <h3 className="font-semibold text-gray-900">Glass Doors</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3"><strong>Compatibility: 30%</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• No deadbolt drilling possible</li>
                    <li>• Surface-mount rim locks only</li>
                    <li>• August retrofit, Yale Linus, Nuki</li>
                  </ul>
                </div>
                <div className="border-2 border-gray-400 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">📏</div>
                    <h3 className="font-semibold text-gray-900">Measurements</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3"><strong>How to Measure</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Thickness: Caliper or ruler on door edge</li>
                    <li>• Backset: Handle center to door edge</li>
                    <li>• Bore: Existing hole diameter</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="max-w-7xl mx-auto mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/calculators/installation-cost" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-semibold text-gray-900 mb-2">Installation Cost</h3>
                <p className="text-sm text-gray-600">Calculate costs if modifications needed</p>
              </Link>
              <Link href="/calculators/signal-strength" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">📶</div>
                <h3 className="font-semibold text-gray-900 mb-2">Signal Strength</h3>
                <p className="text-sm text-gray-600">Metal doors affect RF signal penetration</p>
              </Link>
              <Link href="/calculators" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">🔧</div>
                <h3 className="font-semibold text-gray-900 mb-2">All Calculators</h3>
                <p className="text-sm text-gray-600">TCO, battery life, and more tools</p>
              </Link>
            </div>
          </div>

          {/* Data Sources */}
          <div className="max-w-4xl mx-auto mt-12 mb-12">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-2 border-gray-300 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">📚 Industry Standards & Sources</h3>
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">Verified Nov 2025</span>
              </div>
              <p className="text-sm text-gray-700 mb-6">All compatibility criteria based on industry standards and manufacturer specifications</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">🏛️ Standards Organizations</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>ANSI (American National Standards Institute):</strong> A156.2-2019 Bored Locks and Latches</p>
                    <p><strong>BHMA (Builders Hardware Manufacturers Assoc):</strong> Testing and certification protocols</p>
                    <p><strong>UL (Underwriters Laboratories):</strong> UL 10C fire door hardware safety</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">🏭 Manufacturer Specs</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Installation Manuals:</strong> Schlage, Yale, August, Kwikset, Be-Tech (2025 editions)</p>
                    <p><strong>Compatibility Guides:</strong> Door prep specifications, extension kit requirements</p>
                    <p><strong>Material Testing:</strong> Drill bit requirements, torque specifications</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>⚠️ Important:</strong> This tool provides guidance based on industry standards. Always verify specific lock model compatibility with manufacturer documentation before purchase. Local building codes may have additional requirements.
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
