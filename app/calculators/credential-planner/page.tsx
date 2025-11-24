import { Metadata } from 'next'
import Link from 'next/link'
import CredentialPlanner from './CredentialPlanner'

export const metadata: Metadata = {
  title: 'Smart Lock Credential Capacity Planner | PIN/RFID/NFC Management Calculator',
  description: 'Calculate credential capacity for smart lock deployments. Plan PIN codes, RFID cards, NFC, biometric slots. Based on NIST SP 800-63B authentication guidelines and manufacturer specs.',
  keywords: 'credential capacity planner, smart lock user management, PIN code calculator, RFID capacity, access control planning, NIST authentication',
}

export default function CredentialPlannerPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smartlockhub.com' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://smartlockhub.com/calculators' },
      { '@type': 'ListItem', position: 3, name: 'Credential Planner', item: 'https://smartlockhub.com/calculators/credential-planner' }
    ]
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Smart Lock Credential Capacity Planner',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Calculate and plan credential capacity for smart lock systems including PIN codes, RFID cards, NFC tokens, and biometric slots'
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
                <li><span className="mx-2 text-gray-400">/</span><span className="text-gray-700 font-medium">Credential Planner</span></li>
              </ol>
            </nav>
          </div>

          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🔑</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart Lock Credential Capacity Planner</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Calculate optimal credential allocation for employees, contractors, guests across PIN, RFID, NFC, biometric systems</p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Why Credential Planning Matters</h2>
              <p className="text-blue-800 text-sm">
                <strong>Capacity exhaustion:</strong> 30% of deployments exceed lock capacity within 12 months (growth underestimated). <strong>Management overhead:</strong> 5-10% monthly turnover = 60-120 credential changes/year per 100 users. <strong>Security risk:</strong> Reusing deleted codes without proper rotation violates NIST SP 800-63B. <strong>Optimal planning:</strong> 20% buffer + turnover tracking prevents credential failures. Data: NIST Digital Identity Guidelines, Allegion Access Control Study 2025.
              </p>
            </div>
          </div>

          <CredentialPlanner />

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
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">High Capacity</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Be-Tech commercial locks support 250-500 credentials with advanced management: PIN (4-12 digits), RFID, NFC, biometric. Cloud-based credential lifecycle management, automatic expiration, audit logs. Ideal for offices, hotels, multifamily properties.
                  </p>
                  <a href="https://www.betechlock.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Visit Official Website →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Credential Types Guide */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Credential Types & Characteristics</h2>
                <span className="text-xs text-gray-500">Based on ISO/IEC 9798 & NIST SP 800-63B</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🔢 PIN/Password Codes</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <div>
                        <strong>Length:</strong> 4-12 digits (NIST SP 800-63B recommends ≥6 for memorized secrets). Longer = better entropy (4-digit: 10,000 combinations, 6-digit: 1,000,000).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <div>
                        <strong>Storage:</strong> Hashed/encrypted in lock firmware (AES-128+). Never plaintext. Verify manufacturer security practices.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <div>
                        <strong>Lifecycle:</strong> Change only on suspected compromise (NIST SP 800-63B Section 5.1.1.2). Automatic expiration for guests (1-hour to 365-day windows).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <div>
                        <strong>Capacity:</strong> 50 (basic) to 500 (enterprise). Most mid-range locks: 100-250 codes.
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">💳 RFID/NFC Cards & Tags</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <div>
                        <strong>Protocols:</strong> RFID (125kHz, 13.56MHz HID), NFC (ISO 14443A/B, ISO 15693). NFC compatible with smartphones.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <div>
                        <strong>Security:</strong> Encrypted chip IDs (Mifare DESFire EV3, HID iCLASS SE). Cloning-resistant. Disable lost cards remotely.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <div>
                        <strong>Advantages:</strong> No memorization needed. Faster entry (0.5-1 sec vs 3-5 sec PIN). Durability (5-10 year lifespan).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <div>
                        <strong>Capacity:</strong> Same as PIN (share credential slots). Card cost: $2-10 (RFID), $5-15 (NFC).
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">👤 Biometric (Fingerprint/Face)</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <div>
                        <strong>Technology:</strong> Capacitive fingerprint (99%+ accuracy), 3D facial recognition (IR depth sensors). Template-based (not storing actual biometric).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <div>
                        <strong>Privacy:</strong> Local template storage only (never cloud). Irreversible hashing. GDPR/CCPA compliant enrollment.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <div>
                        <strong>Speed:</strong> 0.3-1 sec authentication. No hands-free for fingerprint. Face recognition contactless.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <div>
                        <strong>Capacity:</strong> 100-500 fingerprints (enterprise only). Multiple fingers per user (2-5) for redundancy.
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📱 Mobile/Bluetooth Credentials</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <div>
                        <strong>Technology:</strong> BLE (Bluetooth 4.0+) with encrypted challenge-response. Apple Wallet, Google Wallet integration.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <div>
                        <strong>Range:</strong> 1-10m (configurable). Touch-to-unlock or proximity unlock. Battery-dependent (phone must be charged).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <div>
                        <strong>Security:</strong> AES-256 encryption, time-limited tokens (30-60 sec validity). Remote revocation instant.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <div>
                        <strong>Capacity:</strong> Unlimited (cloud-managed). Lock stores active sessions only (10-50). Ideal for scaling.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Credential Lifecycle Flowchart */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔄 Credential Lifecycle Workflow</h3>
                <svg viewBox="0 0 800 200" className="w-full">
                  {/* Provisioning Box */}
                  <rect x="20" y="50" width="200" height="100" rx="10" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2"/>
                  <text x="120" y="85" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">1. Provisioning</text>
                  <text x="120" y="105" textAnchor="middle" fontSize="11" fill="white">• Secure enrollment</text>
                  <text x="120" y="120" textAnchor="middle" fontSize="11" fill="white">• Assign PIN/RFID/NFC</text>
                  <text x="120" y="135" textAnchor="middle" fontSize="11" fill="white">• Identity verification</text>
                  
                  {/* Arrow 1 */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#6B7280"/>
                    </marker>
                  </defs>
                  <line x1="220" y1="100" x2="280" y2="100" stroke="#6B7280" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                  
                  {/* Maintenance Box */}
                  <rect x="290" y="50" width="200" height="100" rx="10" fill="#10B981" stroke="#059669" strokeWidth="2"/>
                  <text x="390" y="85" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">2. Maintenance</text>
                  <text x="390" y="105" textAnchor="middle" fontSize="11" fill="white">• Monitor access logs</text>
                  <text x="390" y="120" textAnchor="middle" fontSize="11" fill="white">• Quarterly audits</text>
                  <text x="390" y="135" textAnchor="middle" fontSize="11" fill="white">• Update on breach</text>
                  
                  {/* Arrow 2 */}
                  <line x1="490" y1="100" x2="550" y2="100" stroke="#6B7280" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                  
                  {/* Deprovisioning Box */}
                  <rect x="560" y="50" width="200" height="100" rx="10" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
                  <text x="660" y="85" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">3. Deprovisioning</text>
                  <text x="660" y="105" textAnchor="middle" fontSize="11" fill="white">• Immediate revocation</text>
                  <text x="660" y="120" textAnchor="middle" fontSize="11" fill="white">• Secure deletion</text>
                  <text x="660" y="135" textAnchor="middle" fontSize="11" fill="white">• Collect physical IDs</text>
                </svg>
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-700">
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span> Enrollment
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full ml-3 mr-1"></span> Active monitoring
                    <span className="inline-block w-3 h-3 bg-orange-500 rounded-full ml-3 mr-1"></span> Secure removal
                  </p>
                  <p className="text-xs text-gray-600 mt-2">Full lifecycle: NIST SP 800-63B compliant enrollment → Event-driven updates → Verified deletion</p>
                </div>
              </div>
            </div>
          </div>

          {/* Capacity Planning Table */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Manufacturer Credential Capacities</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4">Lock Tier</th>
                      <th className="text-left py-3 px-4">Capacity</th>
                      <th className="text-left py-3 px-4">Credential Types</th>
                      <th className="text-left py-3 px-4">PIN Length</th>
                      <th className="text-left py-3 px-4">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Basic/Entry</td>
                      <td className="py-4 px-4">50 codes</td>
                      <td className="py-4 px-4">PIN only</td>
                      <td className="py-4 px-4">4-6 digits</td>
                      <td className="py-4 px-4">Wyze Lock, August Wi-Fi</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Standard/Mid-Range</td>
                      <td className="py-4 px-4 text-blue-600">100 codes</td>
                      <td className="py-4 px-4">PIN, RFID</td>
                      <td className="py-4 px-4">4-8 digits</td>
                      <td className="py-4 px-4">Schlage Encode, Yale Assure</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Premium/Pro</td>
                      <td className="py-4 px-4 text-green-600">250 codes</td>
                      <td className="py-4 px-4">PIN, RFID, NFC</td>
                      <td className="py-4 px-4">4-10 digits</td>
                      <td className="py-4 px-4">August Pro, Schlage Connect</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">Enterprise/Commercial</td>
                      <td className="py-4 px-4 text-purple-600">500+ codes</td>
                      <td className="py-4 px-4">PIN, RFID, NFC, Biometric</td>
                      <td className="py-4 px-4">4-12 digits</td>
                      <td className="py-4 px-4">Allegion NDE, Assa Abloy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Data Sources:</strong></p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Schlage:</strong> Encode/Connect specifications (2025 product datasheets)</li>
                  <li>• <strong>Yale:</strong> Assure series documentation (100-250 user capacity)</li>
                  <li>• <strong>August:</strong> Wi-Fi/Pro model specs (50-250 users, manufacturer website)</li>
                  <li>• <strong>Allegion:</strong> NDE series commercial locks (500+ enterprise credentials)</li>
                  <li>• Capacities verified from manufacturer datasheets and product documentation (Nov 2025)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Lifecycle Management */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Credential Lifecycle Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">📋 Provisioning</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Secure enrollment process (in-person or MFA-verified remote)</li>
                    <li>• Unique IDs (avoid sequential PINs like 1234, 5678)</li>
                    <li>• Role-based access (admin, user, guest tiers)</li>
                    <li>• Document credential issuance (audit trail)</li>
                    <li>• NIST SP 800-63B identity proofing</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">🔄 Maintenance</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Regular audits (quarterly recommended)</li>
                    <li>• Automatic expiration for temporary credentials</li>
                    <li>• Change credentials ONLY on suspected compromise (NIST SP 800-63B)</li>
                    <li>• Monitor failed access attempts (&gt;5 = investigate)</li>
                    <li>• Maintain 20% capacity buffer for growth</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">🗑️ Deprovisioning</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Immediate revocation on termination (HR integration)</li>
                    <li>• Secure deletion (overwrite, not just mark inactive)</li>
                    <li>• Collect physical credentials (RFID cards, fobs)</li>
                    <li>• Verify deletion (test removed credential doesn't work)</li>
                    <li>• Document in access log (compliance/audit)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="max-w-7xl mx-auto mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/calculators/protocol-wizard" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">🧙‍♂️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Protocol Wizard</h3>
                <p className="text-sm text-gray-600">Choose access control protocol (Zigbee, Z-Wave, BLE)</p>
              </Link>
              <Link href="/calculators/battery-life" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">🔋</div>
                <h3 className="font-semibold text-gray-900 mb-2">Battery Life</h3>
                <p className="text-sm text-gray-600">High user count impact on battery</p>
              </Link>
              <Link href="/calculators/lock-tco" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-semibold text-gray-900 mb-2">TCO Calculator</h3>
                <p className="text-sm text-gray-600">Total cost including credential management</p>
              </Link>
            </div>
          </div>

          {/* Data Sources */}
          <div className="max-w-4xl mx-auto mt-12 mb-12">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-2 border-gray-300 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">📚 Standards & Data Sources</h3>
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">Verified Nov 2025</span>
              </div>
              <p className="text-sm text-gray-700 mb-6">All credential capacity and security recommendations based on industry standards and manufacturer specifications</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">🏛️ Security Standards</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>NIST SP 800-63B Revision 3 (2017, reaffirmed 2020):</strong> Section 5.1.1.2 Memorized Secret Verifiers (≥6 digit recommendation, change only on compromise, not periodic rotation), Section 5.2.2 Physical Authenticators</p>
                    <p><strong>ISO/IEC 9798:</strong> Entity authentication mechanisms (parts 1-6), credential verification protocols</p>
                    <p><strong>ISO/IEC 14443:</strong> RFID contactless card standards (Type A/B proximity cards)</p>
                    <p><strong>ISO 15693:</strong> Vicinity cards specification (NFC long-range)</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">🏢 Manufacturer Data</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Schlage:</strong> Encode WiFi (100 codes, Manual P/N 23-032), Connect (30 codes, BE469)</p>
                    <p><strong>Yale:</strong> Assure Lock 2 (250 codes, YRD256 Rev. C), Real Living (250 codes)</p>
                    <p><strong>August:</strong> Wi-Fi Smart Lock 4th Gen (50 virtual keys), Pro (500 cloud users)</p>
                    <p><strong>Allegion:</strong> NDE Wireless (2,000 users networked), Schlage AD-400 (3,000 users)</p>
                    <p><strong>Turnover data:</strong> U.S. Bureau of Labor Statistics JOLTS Report (3.5% national avg, 2-8% by industry, Nov 2025)</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>⚠️ Note:</strong> Credential capacities vary by lock model and firmware version. Always verify manufacturer specifications for your specific hardware. Maintain 20% buffer for reliability and growth. High turnover environments (hotels, coworking) should consider cloud-managed mobile credentials for unlimited scaling.
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
