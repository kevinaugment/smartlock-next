import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Protocol Comparison - Smart Lock Hub',
  description: 'Side-by-side comparison of Z-Wave, Zigbee, Wi-Fi, Thread, and Matter smart lock protocols.',
}

const protocols = [
  {
    name: 'Z-Wave',
    frequency: '908 MHz',
    range: '40m',
    batteryLife: '12 months',
    latency: '100-200ms',
    hubRequired: 'Yes',
    hubCost: '$120',
    interference: 'Very Low',
    meshSupport: 'Yes',
    deviceLimit: '232',
    security: 'AES-128',
    pros: ['Excellent range', 'No 2.4GHz interference', 'Reliable mesh', 'Low power'],
    cons: ['Requires hub', 'Higher hub cost', 'Fewer devices'],
    bestFor: 'Large homes, commercial',
    color: 'blue',
  },
  {
    name: 'Zigbee',
    frequency: '2.4 GHz',
    range: '30m',
    batteryLife: '12 months',
    latency: '80-150ms',
    hubRequired: 'Yes',
    hubCost: '$80',
    interference: 'Low',
    meshSupport: 'Yes',
    deviceLimit: '65,000',
    security: 'AES-128',
    pros: ['Low cost hub', 'Massive device support', 'Great battery life', 'Wide adoption'],
    cons: ['2.4GHz interference', 'Requires hub'],
    bestFor: 'Smart home ecosystems',
    color: 'green',
  },
  {
    name: 'Wi-Fi',
    frequency: '2.4/5 GHz',
    range: '50m',
    batteryLife: '3-6 months',
    latency: '50-100ms',
    hubRequired: 'No',
    hubCost: '$0',
    interference: 'High',
    meshSupport: 'No',
    deviceLimit: 'Router limited',
    security: 'WPA2/WPA3',
    pros: ['No hub needed', 'Fast response', 'Easy setup', 'Remote access built-in'],
    cons: ['Poor battery life', 'Cloud dependent', 'Higher power consumption'],
    bestFor: 'Tech-savvy users, small deployments',
    color: 'purple',
  },
  {
    name: 'Thread',
    frequency: '2.4 GHz',
    range: '28m',
    batteryLife: '10 months',
    latency: '60-120ms',
    hubRequired: 'Yes',
    hubCost: '$150',
    interference: 'Low',
    meshSupport: 'Yes',
    deviceLimit: '500+',
    security: 'AES-128',
    pros: ['Low latency', 'IPv6 native', 'Matter compatible', 'Self-healing mesh'],
    cons: ['Expensive hub', 'Limited lock options', 'Newer technology'],
    bestFor: 'Future-proof installations',
    color: 'orange',
  },
]

export default function Compare() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Protocol Comparison</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Side-by-side comparison of major smart lock protocols to help you choose
            </p>
          </div>

          {/* Quick Decision Guide */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-12">
            <h2 className="text-2xl font-bold mb-6">Quick Decision Guide</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Choose Z-Wave if:</h3>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• You need maximum range and reliability</li>
                  <li>• You have thick walls or metal obstacles</li>
                  <li>• You're deploying in a large building</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Choose Zigbee if:</h3>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• You want lower initial cost</li>
                  <li>• You have existing smart home devices</li>
                  <li>• You need many devices in ecosystem</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Choose Wi-Fi if:</h3>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• You want no additional hub</li>
                  <li>• Battery replacement is not a concern</li>
                  <li>• You need fastest response time</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Choose Thread if:</h3>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• You want future-proof technology</li>
                  <li>• Matter compatibility is important</li>
                  <li>• You can invest in newer ecosystem</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    {protocols.map(p => (
                      <th key={p.name} className={`px-6 py-4 text-center text-sm font-semibold text-${p.color}-700`}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Frequency</td>
                    {protocols.map(p => (
                      <td key={p.name} className="px-6 py-4 text-sm text-gray-700 text-center">{p.frequency}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Typical Range</td>
                    {protocols.map(p => (
                      <td key={p.name} className="px-6 py-4 text-sm text-gray-700 text-center">{p.range}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Battery Life</td>
                    {protocols.map(p => (
                      <td key={p.name} className="px-6 py-4 text-sm text-gray-700 text-center font-semibold">{p.batteryLife}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Latency</td>
                    {protocols.map(p => (
                      <td key={p.name} className="px-6 py-4 text-sm text-gray-700 text-center">{p.latency}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Hub Required</td>
                    {protocols.map(p => (
                      <td key={p.name} className="px-6 py-4 text-sm text-gray-700 text-center">{p.hubRequired}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Hub Cost</td>
                    {protocols.map(p => (
                      <td key={p.name} className="px-6 py-4 text-sm text-gray-700 text-center font-semibold">{p.hubCost}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Interference</td>
                    {protocols.map(p => (
                      <td key={p.name} className="px-6 py-4 text-sm text-gray-700 text-center">{p.interference}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Mesh Network</td>
                    {protocols.map(p => (
                      <td key={p.name} className="px-6 py-4 text-sm text-gray-700 text-center">{p.meshSupport}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Device Limit</td>
                    {protocols.map(p => (
                      <td key={p.name} className="px-6 py-4 text-sm text-gray-700 text-center">{p.deviceLimit}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Security</td>
                    {protocols.map(p => (
                      <td key={p.name} className="px-6 py-4 text-sm text-gray-700 text-center">{p.security}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {protocols.map(protocol => (
              <div key={protocol.name} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
                <h3 className={`text-2xl font-bold text-${protocol.color}-700 mb-4`}>{protocol.name}</h3>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Pros:</h4>
                  <ul className="space-y-2">
                    {protocol.pros.map((pro, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Cons:</h4>
                  <ul className="space-y-2">
                    {protocol.cons.map((con, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`p-4 bg-${protocol.color}-50 rounded-lg`}>
                  <div className="font-semibold text-gray-900 mb-1">Best For:</div>
                  <div className="text-sm text-gray-700">{protocol.bestFor}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Deciding?</h2>
            <p className="text-gray-600 mb-6">
              Use our interactive wizard to get personalized recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculators/protocol-wizard"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Try Protocol Wizard
              </Link>
              <Link
                href="/calculators/lock-tco"
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Compare Costs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
