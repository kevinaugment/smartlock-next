import { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import Image from 'next/image'
import Link from 'next/link'
import CredentialPlanner from './CredentialPlanner'
import {
  Key, Hash, CreditCard, User, Smartphone, RefreshCw,
  ClipboardList, Trash2, Wand2, Battery, DollarSign,
  BookOpen, Landmark, Building2, AlertTriangle
} from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { CalculatorAnswerBlock } from '@/components/seo/CalculatorAnswerBlock'
import { CalculatorFaqBlock } from '@/components/seo/CalculatorFaqBlock'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Smart Lock Credential Capacity Planner | PIN/RFID/NFC Management Calculator',
    description: 'Calculate credential capacity for smart lock deployments. Plan PIN codes, RFID cards, NFC, biometric slots. Based on NIST SP 800-63B authentication guidelines and manufacturer specs.',
    canonical: '/calculators/credential-planner',
    keywords: 'credential capacity planner, smart lock user management, PIN code calculator, RFID capacity, access control planning, NIST authentication',
})

export default function CredentialPlannerPage() {
  const faqs = [
    {
      question: 'How many codes should each property support?',
      answer: 'Each property should support current residents or staff, administrators, vendors, guests, emergency users, and a growth buffer. For managed properties, plan at least 15% to 25% extra credential capacity so turnover and temporary access do not block new users.',
    },
    {
      question: 'When should credentials expire?',
      answer: 'Guest, vendor, contractor, and temporary staff credentials should expire automatically at the end of the approved access window. Permanent staff and resident credentials should be revoked immediately when access is no longer authorized.',
    },
    {
      question: 'How many admin users are safe?',
      answer: 'Admin access should be limited to the smallest practical group, usually property leadership, IT, security, or trusted operations staff. Each admin should have a unique login, MFA where available, and documented authority to issue or revoke credentials.',
    },
    {
      question: 'Should staff use shared codes?',
      answer: 'Shared staff codes should be avoided because they make revocation and incident review difficult. Give each staff member or vendor a unique credential with role-based permissions and remove it when their access no longer applies.',
    },
    {
      question: 'How do I plan card vs PIN access?',
      answer: 'Use PINs for low-friction temporary access and RFID, NFC, mobile, or biometric credentials when identity assurance and faster entry matter. Many commercial deployments combine cards or mobile credentials for staff with expiring PINs for visitors and contractors.',
    },
  ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
      { '@type': 'ListItem', position: 3, name: 'Credential Planner', item: 'https://www.slockhub.com/calculators/credential-planner' }
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

      <div className="page-bg">
        <div className="container-main section">
          <div className="mb-8">
            <nav className="flex text-sm">
              <ol className="inline-flex items-center space-x-1">
                <li><Link href="/" style={{ color: "var(--color-text-muted)" }} prefetch={false}>Home</Link></li>
                <li><span className="breadcrumb__separator">/</span><Link href="/calculators" style={{ color: "var(--color-text-muted)" }} prefetch={false}>Calculators</Link></li>
                <li><span className="breadcrumb__separator">/</span><span className="breadcrumb__current">Credential Planner</span></li>
              </ol>
            </nav>
          </div>

          <div className="page-header">
            <div className="page-header__icon"><Key className="w-14 h-14" /></div>
            <h1 className="page-header__title">Smart Lock Credential Capacity Planner</h1>
            <p className="page-header__subtitle">Calculate optimal credential allocation for employees, contractors, guests across PIN, RFID, NFC, biometric systems</p>
          </div>

          <div className="max-w-7xl mx-auto">
            <CalculatorAnswerBlock
              title="How do you plan smart lock credentials?"
              answer="Smart lock credential planning maps every person and access method to the lock or platform limits: PINs, RFID cards, NFC/mobile credentials, biometrics, schedules, groups, administrators, and temporary users. The goal is to prevent capacity exhaustion while keeping every credential unique, revocable, and tied to the right access window."
            />
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="callout callout-info">
              <h2 className="callout-title">Users, PINs, RFID Slots</h2>
              <p >
                <strong>Capacity exhaustion:</strong> 30% of deployments exceed lock capacity within 12 months (growth underestimated). <strong>Management overhead:</strong> 5-10% monthly turnover = 60-120 credential changes/year per 100 users. <strong>Security risk:</strong> Reusing deleted codes without proper rotation violates NIST SP 800-63B. <strong>Optimal planning:</strong> 20% buffer + turnover tracking prevents credential failures. Data: NIST Digital Identity Guidelines, Allegion Access Control Study 2026.
              </p>
            </div>
          </div>

          <CredentialPlanner />

          <ToolRating toolSlug="credential-planner" />

          {/* Be-Tech Brand */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="content-card">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="card" style={{ width: "5rem", height: "5rem", padding: "var(--space-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Image src="/images/brands/be-tech-logo.png" alt="Be-Tech Logo" width={64} height={64} className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)" }}>Brand reference: Be-Tech</h3>
                    <span className="badge badge-featured">High Capacity</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}>
                    Be-Tech commercial locks support 250-500 credentials with advanced management: PIN (4-12 digits), RFID, NFC, biometric. Cloud-based credential lifecycle management, automatic expiration, audit logs. Ideal for offices, hotels, multifamily properties.
                  </p>
                  <a href="https://www.betechlock.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: "var(--color-accent)", fontWeight: 500 }}>
                    Visit Official Website →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Credential Types Guide */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="content-card">
              <div className="flex justify-between items-center mb-6">
                <h2 style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--color-text-primary)" }}>Credential Types & Characteristics</h2>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Based on ISO/IEC 9798 & NIST SP 800-63B</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-md)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Hash className="w-5 h-5" style={{ color: "var(--color-accent)" }} /> PIN/Password Codes</h3>
                  <ul className="space-y-3" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-accent)" }}>•</span>
                      <div>
                        <strong>Length:</strong> 4-12 digits (NIST SP 800-63B recommends ≥6 for memorized secrets). Longer = better entropy (4-digit: 10,000 combinations, 6-digit: 1,000,000).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-accent)" }}>•</span>
                      <div>
                        <strong>Storage:</strong> Hashed/encrypted in lock firmware (AES-128+). Never plaintext. Verify manufacturer security practices.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-accent)" }}>•</span>
                      <div>
                        <strong>Lifecycle:</strong> Change only on suspected compromise (NIST SP 800-63B Section 5.1.1.2). Automatic expiration for guests (1-hour to 365-day windows).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-accent)" }}>•</span>
                      <div>
                        <strong>Capacity:</strong> 50 (basic) to 500 (enterprise). Most mid-range locks: 100-250 codes.
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-md)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><CreditCard className="w-5 h-5" style={{ color: "var(--color-accent)" }} /> RFID/NFC Cards & Tags</h3>
                  <ul className="space-y-3" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-accent)" }}>•</span>
                      <div>
                        <strong>Protocols:</strong> RFID (125kHz, 13.56MHz HID), NFC (ISO 14443A/B, ISO 15693). NFC compatible with smartphones.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-accent)" }}>•</span>
                      <div>
                        <strong>Security:</strong> Encrypted chip IDs (Mifare DESFire EV3, HID iCLASS SE). Cloning-resistant. Disable lost cards remotely.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-accent)" }}>•</span>
                      <div>
                        <strong>Advantages:</strong> No memorization needed. Faster entry (0.5-1 sec vs 3-5 sec PIN). Durability (5-10 year lifespan).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-accent)" }}>•</span>
                      <div>
                        <strong>Capacity:</strong> Same as PIN (share credential slots). Card cost: $2-10 (RFID), $5-15 (NFC).
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-md)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><User className="w-5 h-5" style={{ color: "var(--color-success)" }} /> Biometric (Fingerprint/Face)</h3>
                  <ul className="space-y-3" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-success)" }}>•</span>
                      <div>
                        <strong>Technology:</strong> Capacitive fingerprint (99%+ accuracy), 3D facial recognition (IR depth sensors). Template-based (not storing actual biometric).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-success)" }}>•</span>
                      <div>
                        <strong>Privacy:</strong> Local template storage only (never cloud). Irreversible hashing. GDPR/CCPA compliant enrollment.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-success)" }}>•</span>
                      <div>
                        <strong>Speed:</strong> 0.3-1 sec authentication. No hands-free for fingerprint. Face recognition contactless.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-success)" }}>•</span>
                      <div>
                        <strong>Capacity:</strong> 100-500 fingerprints (enterprise only). Multiple fingers per user (2-5) for redundancy.
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-md)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Smartphone className="w-5 h-5" style={{ color: "var(--color-warning)" }} /> Mobile/Bluetooth Credentials</h3>
                  <ul className="space-y-3" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-warning)" }}>•</span>
                      <div>
                        <strong>Technology:</strong> BLE (Bluetooth 4.0+) with encrypted challenge-response. Apple Wallet, Google Wallet integration.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-warning)" }}>•</span>
                      <div>
                        <strong>Range:</strong> 1-10m (configurable). Touch-to-unlock or proximity unlock. Battery-dependent (phone must be charged).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-warning)" }}>•</span>
                      <div>
                        <strong>Security:</strong> AES-256 encryption, time-limited tokens (30-60 sec validity). Remote revocation instant.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "var(--color-warning)" }}>•</span>
                      <div>
                        <strong>Capacity:</strong> Unlimited (cloud-managed). Lock stores active sessions only (10-50). Ideal for scaling.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Credential Lifecycle Flowchart */}
              <div className="callout callout-info">
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-md)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><RefreshCw className="w-5 h-5" style={{ color: "var(--color-accent)" }} /> Credential Lifecycle Workflow</h3>
                <svg viewBox="0 0 800 200" className="w-full">
                  {/* Provisioning Box */}
                  <rect x="20" y="50" width="200" height="100" rx="10" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" />
                  <text x="120" y="85" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">1. Provisioning</text>
                  <text x="120" y="105" textAnchor="middle" fontSize="11" fill="white">• Secure enrollment</text>
                  <text x="120" y="120" textAnchor="middle" fontSize="11" fill="white">• Assign PIN/RFID/NFC</text>
                  <text x="120" y="135" textAnchor="middle" fontSize="11" fill="white">• Identity verification</text>

                  {/* Arrow 1 */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#6B7280" />
                    </marker>
                  </defs>
                  <line x1="220" y1="100" x2="280" y2="100" stroke="#6B7280" strokeWidth="3" markerEnd="url(#arrowhead)" />

                  {/* Maintenance Box */}
                  <rect x="290" y="50" width="200" height="100" rx="10" fill="#10B981" stroke="#059669" strokeWidth="2" />
                  <text x="390" y="85" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">2. Maintenance</text>
                  <text x="390" y="105" textAnchor="middle" fontSize="11" fill="white">• Monitor access logs</text>
                  <text x="390" y="120" textAnchor="middle" fontSize="11" fill="white">• Quarterly audits</text>
                  <text x="390" y="135" textAnchor="middle" fontSize="11" fill="white">• Update on breach</text>

                  {/* Arrow 2 */}
                  <line x1="490" y1="100" x2="550" y2="100" stroke="#6B7280" strokeWidth="3" markerEnd="url(#arrowhead)" />

                  {/* Deprovisioning Box */}
                  <rect x="560" y="50" width="200" height="100" rx="10" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
                  <text x="660" y="85" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">3. Deprovisioning</text>
                  <text x="660" y="105" textAnchor="middle" fontSize="11" fill="white">• Immediate revocation</text>
                  <text x="660" y="120" textAnchor="middle" fontSize="11" fill="white">• Secure deletion</text>
                  <text x="660" y="135" textAnchor="middle" fontSize="11" fill="white">• Collect physical IDs</text>
                </svg>
                <div className="mt-4 text-center">
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ background: "var(--color-accent)" }}></span> Enrollment
                    <span className="inline-block w-3 h-3 rounded-full ml-3 mr-1" style={{ background: "var(--color-success)" }}></span> Active monitoring
                    <span className="inline-block w-3 h-3 rounded-full ml-3 mr-1" style={{ background: "var(--color-warning)" }}></span> Secure removal
                  </p>
                  <p className="text-xs text-gray-600 mt-2">Full lifecycle: NIST SP 800-63B compliant enrollment → Event-driven updates → Verified deletion</p>
                </div>
              </div>
            </div>
          </div>

          {/* Capacity Planning Table */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="content-card">
              <h2 className="section-title">Manufacturer Credential Capacities</h2>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr >
                      <th >Lock Tier</th>
                      <th >Capacity</th>
                      <th >Credential Types</th>
                      <th >PIN Length</th>
                      <th >Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Basic/Entry</td>
                      <td>50 codes</td>
                      <td>PIN only</td>
                      <td>4-6 digits</td>
                      <td>Wyze Lock, August Wi-Fi</td>
                    </tr>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Standard/Mid-Range</td>
                      <td style={{ color: "var(--color-accent)" }}>100 codes</td>
                      <td>PIN, RFID</td>
                      <td>4-8 digits</td>
                      <td>Schlage Encode, Yale Assure</td>
                    </tr>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Premium/Pro</td>
                      <td style={{ color: "var(--color-success)" }}>250 codes</td>
                      <td>PIN, RFID, NFC</td>
                      <td>4-10 digits</td>
                      <td>August Pro, Schlage Connect</td>
                    </tr>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Enterprise/Commercial</td>
                      <td className="py-4 px-4 text-purple-600">500+ codes</td>
                      <td>PIN, RFID, NFC, Biometric</td>
                      <td>4-12 digits</td>
                      <td>Allegion NDE, Assa Abloy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="callout callout-info">
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}><strong>Data Sources:</strong></p>
                <ul className="space-y-1" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  <li>• <strong>Schlage:</strong> Encode/Connect specifications (2026 product datasheets)</li>
                  <li>• <strong>Yale:</strong> Assure series documentation (100-250 user capacity)</li>
                  <li>• <strong>August:</strong> Wi-Fi/Pro model specs (50-250 users, manufacturer website)</li>
                  <li>• <strong>Allegion:</strong> NDE series commercial locks (500+ enterprise credentials)</li>
                  <li>• Capacities verified from manufacturer datasheets and product documentation (Feb 2026)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Lifecycle Management */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="content-card">
              <h2 className="section-title">Credential Lifecycle Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                  <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><ClipboardList className="w-5 h-5" style={{ color: "var(--color-accent)" }} /> Provisioning</h3>
                  <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li>• Secure enrollment process (in-person or MFA-verified remote)</li>
                    <li>• Unique IDs (avoid sequential PINs like 1234, 5678)</li>
                    <li>• Role-based access (admin, user, guest tiers)</li>
                    <li>• Document credential issuance (audit trail)</li>
                    <li>• NIST SP 800-63B identity proofing</li>
                  </ul>
                </div>
                <div className="card">
                  <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><RefreshCw className="w-5 h-5" style={{ color: "var(--color-success)" }} /> Maintenance</h3>
                  <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <li>• Regular audits (quarterly recommended)</li>
                    <li>• Automatic expiration for temporary credentials</li>
                    <li>• Change credentials ONLY on suspected compromise (NIST SP 800-63B)</li>
                    <li>• Monitor failed access attempts (&gt;5 = investigate)</li>
                    <li>• Maintain 20% capacity buffer for growth</li>
                  </ul>
                </div>
                <div className="card">
                  <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Trash2 className="w-5 h-5" style={{ color: "var(--color-warning)" }} /> Deprovisioning</h3>
                  <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
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


          <RelatedResources calculatorSlug="credential-capacity-planner" />
          <div className="max-w-7xl mx-auto">
            <CalculatorFaqBlock faqs={faqs} />
          </div>

          {/* Credentials, Protocol, Battery */}
          <div className="max-w-7xl mx-auto mt-12">
            <h2 className="section-title">Credentials, Protocol, Battery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/calculators/protocol-wizard" className="link-card" prefetch={false}>
                <div style={{ color: "var(--color-accent)", marginBottom: "var(--space-sm)" }}><Wand2 className="w-8 h-8" /></div>
                <h3 className="link-card__title">Protocol Wizard</h3>
                <p className="link-card__desc">Choose access control protocol (Zigbee, Z-Wave, BLE)</p>
              </Link>
              <Link href="/calculators/battery-life" className="link-card" prefetch={false}>
                <div style={{ color: "var(--color-accent)", marginBottom: "var(--space-sm)" }}><Battery className="w-8 h-8" /></div>
                <h3 className="link-card__title">Battery Life</h3>
                <p className="link-card__desc">High user count impact on battery</p>
              </Link>
              <Link href="/calculators/lock-tco" className="link-card" prefetch={false}>
                <div style={{ color: "var(--color-accent)", marginBottom: "var(--space-sm)" }}><DollarSign className="w-8 h-8" /></div>
                <h3 className="link-card__title">TCO Calculator</h3>
                <p className="link-card__desc">Total cost including credential management</p>
              </Link>
            </div>
          </div>

          {/* Data Sources */}
          <div className="max-w-7xl mx-auto mt-12 mb-12">
            <div className="info-box">
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text-primary)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><BookOpen className="w-6 h-6" style={{ color: "var(--color-accent)" }} /> Standards & Data Sources</h3>
                <span className="badge badge-success">Verified Feb 2026</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-lg)" }}>All credential capacity and security recommendations based on industry standards and manufacturer specifications</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h4 style={{ fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Landmark className="w-5 h-5" style={{ color: "var(--color-accent)" }} /> Security Standards</h4>
                  <div className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <p><strong>NIST SP 800-63B Revision 3 (2017, reaffirmed 2020):</strong> Section 5.1.1.2 Memorized Secret Verifiers (≥6 digit recommendation, change only on compromise, not periodic rotation), Section 5.2.2 Physical Authenticators</p>
                    <p><strong>ISO/IEC 9798:</strong> Entity authentication mechanisms (parts 1-6), credential verification protocols</p>
                    <p><strong>ISO/IEC 14443:</strong> RFID contactless card standards (Type A/B proximity cards)</p>
                    <p><strong>ISO 15693:</strong> Vicinity cards specification (NFC long-range)</p>
                  </div>
                </div>
                <div className="card">
                  <h4 style={{ fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Building2 className="w-5 h-5" style={{ color: "var(--color-accent)" }} /> Manufacturer Data</h4>
                  <div className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <p><strong>Schlage:</strong> Encode WiFi (100 codes, Manual P/N 23-032), Connect (30 codes, BE469)</p>
                    <p><strong>Yale:</strong> Assure Lock 2 (250 codes, YRD256 Rev. C), Real Living (250 codes)</p>
                    <p><strong>August:</strong> Wi-Fi Smart Lock 4th Gen (50 virtual keys), Pro (500 cloud users)</p>
                    <p><strong>Allegion:</strong> NDE Wireless (2,000 users networked), Schlage AD-400 (3,000 users)</p>
                    <p><strong>Turnover data:</strong> U.S. Bureau of Labor Statistics JOLTS Report (3.5% national avg, 2-8% by industry, Feb 2026)</p>
                  </div>
                </div>
              </div>
              <div className="callout callout-warning mt-6">
                <p >
                  <strong><AlertTriangle className="w-4 h-4 inline" /> Note:</strong> Credential capacities vary by lock model and firmware version. Always verify manufacturer specifications for your specific hardware. Maintain 20% buffer for reliability and growth. High turnover environments (hotels, coworking) should consider cloud-managed mobile credentials for unlimited scaling.
                </p>
              </div>
              <div className="mt-4 text-center">
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Calculator last updated: February 15, 2026 | Next review: August 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
