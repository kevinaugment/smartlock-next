import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources - Smart Lock Hub',
  description: 'Curated resources, tools, and references for smart lock technology.',
}

const sections = [
  {
    title: 'Industry Standards',
    icon: '📋',
    resources: [
      { name: 'Z-Wave Alliance', description: 'Official Z-Wave certification and standards', url: 'https://z-wavealliance.org' },
      { name: 'Zigbee Alliance (CSA)', description: 'Connectivity Standards Alliance resources', url: 'https://csa-iot.org' },
      { name: 'Thread Group', description: 'Thread protocol specifications', url: 'https://threadgroup.org' },
      { name: 'Matter', description: 'Matter smart home standard', url: 'https://buildwithmatter.com' },
    ],
  },
  {
    title: 'Security References',
    icon: '🔒',
    resources: [
      { name: 'NIST Cybersecurity', description: 'IoT security guidelines', url: 'https://www.nist.gov/cyberframework' },
      { name: 'OWASP IoT', description: 'IoT security best practices', url: 'https://owasp.org/www-project-internet-of-things/' },
      { name: 'Common Criteria', description: 'Security certification standards', url: 'https://commoncriteriaportal.org' },
    ],
  },
  {
    title: 'Testing & Certification',
    icon: '✓',
    resources: [
      { name: 'UL IoT Security', description: 'Product safety certification', url: 'https://ul.com' },
      { name: 'ANSI/BHMA', description: 'Door hardware standards', url: 'https://www.buildershardware.com' },
      { name: 'FCC Database', description: 'RF device certifications', url: 'https://fccid.io' },
    ],
  },
  {
    title: 'Developer Tools',
    icon: '🛠️',
    resources: [
      { name: 'Home Assistant', description: 'Open-source home automation', url: 'https://www.home-assistant.io' },
      { name: 'OpenHAB', description: 'Vendor-agnostic automation', url: 'https://www.openhab.org' },
      { name: 'MQTT', description: 'IoT messaging protocol', url: 'https://mqtt.org' },
    ],
  },
]

const tools = [
  {
    name: 'Protocol Analyzer',
    description: 'Wireshark for IoT protocol debugging',
    category: 'Development',
    url: 'https://www.wireshark.org',
  },
  {
    name: 'RF Signal Meter',
    description: 'Measure wireless signal strength',
    category: 'Installation',
    url: '/calculators/signal-strength',
  },
  {
    name: 'Battery Calculator',
    description: 'Estimate battery replacement schedules',
    category: 'Planning',
    url: '/calculators/battery-life',
  },
  {
    name: 'TCO Calculator',
    description: 'Total cost of ownership analysis',
    category: 'Planning',
    url: '/calculators/lock-tco',
  },
]

export default function Resources() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Resources</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Curated collection of standards, tools, and references for smart lock professionals
            </p>
          </div>

          {/* External Resources */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">External References</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {sections.map(section => (
                <div key={section.title} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{section.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {section.resources.map(resource => (
                      <li key={resource.name}>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                        >
                          <div className="font-semibold text-gray-900 mb-1">{resource.name}</div>
                          <div className="text-sm text-gray-600">{resource.description}</div>
                          <div className="text-xs text-blue-600 mt-2">Visit website →</div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Our Tools */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tools.map(tool => (
                <Link
                  key={tool.name}
                  href={tool.url}
                  className="block bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all p-6"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-gray-600">{tool.description}</p>
                  <div className="text-blue-600 font-semibold mt-3">
                    {tool.url.startsWith('/') ? 'Use Tool' : 'Visit'} →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Knowledge Base</h2>
            <p className="text-lg opacity-90 mb-6">
              49+ comprehensive articles covering all aspects of smart lock technology
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/articles/protocols" className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <div className="font-semibold mb-1">📡 Protocols</div>
                <div className="text-sm opacity-80">Z-Wave, Zigbee, Thread, Matter</div>
              </Link>
              <Link href="/articles/security" className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <div className="font-semibold mb-1">🔒 Security</div>
                <div className="text-sm opacity-80">Encryption, vulnerabilities, best practices</div>
              </Link>
              <Link href="/articles/installation" className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <div className="font-semibold mb-1">🔋 Installation</div>
                <div className="text-sm opacity-80">Setup guides and battery tips</div>
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">⚠️ Disclaimer</h3>
            <p className="text-sm text-gray-700">
              External links are provided for reference only. We are not affiliated with these organizations 
              and do not endorse specific products or services. Always verify information with official sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
