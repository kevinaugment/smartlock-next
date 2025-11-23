import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Lock Brands - Smart Lock Hub',
  description: 'Overview of major smart lock brands and manufacturers with protocol support and best use cases.',
}

const brands = [
  {
    name: 'Yale',
    logo: '🔐',
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
    logo: '🏠',
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
    logo: '🔒',
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
    logo: '🚪',
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
    logo: '🔑',
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
    logo: '✨',
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Smart Lock Brands</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Overview of major smart lock manufacturers, their protocols, and best use cases
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-12">
            <h3 className="font-bold text-gray-900 mb-2">⚠️ Important Note</h3>
            <p className="text-sm text-gray-700">
              We are not affiliated with any manufacturers listed here. Information is provided for 
              educational purposes. Always verify specifications with official sources before purchasing. 
              Prices and features subject to change.
            </p>
          </div>

          {/* Brand Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {brands.map(brand => (
              <div key={brand.name} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden hover:border-blue-400 transition-all">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{brand.logo}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{brand.name}</h3>
                      <div className="text-sm opacity-90">{brand.priceRange}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(brand.rating) ? 'text-yellow-400' : 'text-gray-600'}`}>
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm">{brand.rating}/5</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Protocols:</h4>
                    <div className="flex flex-wrap gap-2">
                      {brand.protocols.map(p => (
                        <span key={p} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Pros:</h4>
                    <ul className="space-y-1">
                      {brand.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Cons:</h4>
                    <ul className="space-y-1">
                      {brand.cons.map((con, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-red-600 mt-0.5">✗</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="font-semibold text-gray-900 mb-1">Best For:</div>
                    <div className="text-sm text-gray-700">{brand.bestFor}</div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-600 mb-2">Works with:</div>
                    <div className="flex flex-wrap gap-1">
                      {brand.ecosystems.map(eco => (
                        <span key={eco} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {eco}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Common Features */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Features to Look For</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map(feature => (
                <div key={feature.name} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.name}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buying Guide */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-6">Buying Considerations</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-lg">Protocol</h3>
                <p className="text-sm opacity-90">
                  Choose based on your existing smart home ecosystem and future plans. 
                  Thread/Matter for future-proofing, Z-Wave for reliability.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-lg">Security Rating</h3>
                <p className="text-sm opacity-90">
                  Look for ANSI/BHMA Grade 1 (highest) or Grade 2 certification. 
                  Commercial applications should use Grade 1 only.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-lg">Battery Type</h3>
                <p className="text-sm opacity-90">
                  AA batteries are most common and convenient. Some use CR123A lithium. 
                  Consider battery life and replacement cost.
                </p>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="text-center bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing?</h2>
            <p className="text-gray-600 mb-6">
              Use our interactive tools to find the perfect smart lock for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculators/protocol-wizard"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Protocol Wizard
              </Link>
              <Link
                href="/calculators/lock-tco"
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cost Calculator
              </Link>
              <Link
                href="/compare"
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Compare Protocols
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
