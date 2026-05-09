import Link from 'next/link'
import type { Metadata } from 'next'
import { Table2, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Smart Lock Reference Tables | Protocol, Grade, Battery & Encryption',
    description: 'Compare smart lock protocols, ANSI/BHMA grades, battery life, lock types, and encryption standards in quick reference tables.',
    alternates: { canonical: '/resources/reference-tables' },
}

/* ──────────────── check / x helpers ──────────────── */
function Check() {
    return (
        <svg className="inline w-5 h-5" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" fill="var(--color-success-subtle)" stroke="var(--color-success)" strokeWidth="1.5" />
            <path d="M6 10l3 3 5-5" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function Cross() {
    return (
        <svg className="inline w-5 h-5" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" fill="var(--color-danger-subtle)" stroke="var(--color-danger)" strokeWidth="1.5" />
            <path d="M7 7l6 6M13 7l-6 6" stroke="var(--color-danger)" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

function Partial() {
    return (
        <svg className="inline w-5 h-5" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" fill="var(--color-warning-subtle)" stroke="var(--color-warning)" strokeWidth="1.5" />
            <path d="M6 10h8" stroke="var(--color-warning)" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

/* ───────────── star rating ──────────────── */
function Stars({ count }: { count: number }) {
    return (
        <span className="inline-flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-4 h-4" viewBox="0 0 16 16" fill={i < count ? 'var(--color-accent)' : 'var(--color-border)'}>
                    <path d="M8 1l2.2 4.5 5 .7-3.6 3.5.8 5L8 12.4 3.6 14.7l.8-5-3.6-3.5 5-.7L8 1z" />
                </svg>
            ))}
        </span>
    )
}

/* ───────────── section component ──────────────── */
function TableSection({
    title,
    id,
    description,
    children,
}: {
    title: string
    id: string
    description: string
    children: React.ReactNode
}) {
    return (
        <section id={id} className="mb-16">
            <h2 className="section-title">{title}</h2>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', maxWidth: '65ch' }}>
                {description}
            </p>
            <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--color-border)' }}>
                {children}
            </div>
        </section>
    )
}

export default function ReferenceTablesPage() {
    return (
        <div className="page-wrapper-alt">
            <div className="container-main section">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link href="/resources" prefetch={false}>Resources</Link>
                    <span className="breadcrumb__separator">/</span>
                    <span className="breadcrumb__current">Reference Tables</span>
                </nav>

                {/* Header */}
                <div className="page-header">
                    <div className="page-header__icon">
                        <Table2 className="w-10 h-10" />
                    </div>
                    <h1 className="page-header__title">Smart Lock Reference Tables</h1>
                    <p className="page-header__subtitle">
                        Side-by-side comparison data for smart lock protocols, security grades, battery life, and lock types
                    </p>
                </div>

                {/* Jump Links */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            { id: 'protocols', label: 'Protocol Comparison' },
                            { id: 'grades', label: 'ANSI/BHMA Grades' },
                            { id: 'battery', label: 'Battery Life' },
                            { id: 'lock-types', label: 'Lock Types' },
                            { id: 'encryption', label: 'Encryption Standards' },
                        ].map(item => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="badge badge-default text-sm px-4 py-2 transition-colors hover:border-current"
                                style={{ textDecoration: 'none' }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="max-w-6xl mx-auto">

                    {/* ────────── 1. Protocol Comparison ────────── */}
                    <TableSection
                        id="protocols"
                        title="Protocol Comparison"
                        description="Compare the five major smart lock communication protocols across key technical parameters including frequency, range, power usage, and ecosystem requirements."
                    >
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th className="text-protocol-zwave">Z-Wave</th>
                                    <th className="text-protocol-zigbee">Zigbee 3.0</th>
                                    <th className="text-protocol-wifi">Wi-Fi</th>
                                    <th className="text-protocol-thread">Thread</th>
                                    <th className="text-protocol-ble">BLE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Frequency</td>
                                    <td>908.42 MHz (US)</td>
                                    <td>2.4 GHz</td>
                                    <td>2.4 / 5 GHz</td>
                                    <td>2.4 GHz</td>
                                    <td>2.4 GHz</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Range (Indoor)</td>
                                    <td>30-40 m</td>
                                    <td>10-20 m</td>
                                    <td>30-50 m</td>
                                    <td>10-20 m</td>
                                    <td>10-30 m</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Mesh Network</td>
                                    <td><Check /></td>
                                    <td><Check /></td>
                                    <td><Cross /></td>
                                    <td><Check /></td>
                                    <td><Cross /></td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Max Nodes</td>
                                    <td>232</td>
                                    <td>65,000+</td>
                                    <td>Varies</td>
                                    <td>250+</td>
                                    <td>Point-to-point</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Hub Required</td>
                                    <td><Check /></td>
                                    <td><Check /></td>
                                    <td><Cross /></td>
                                    <td>Border Router</td>
                                    <td><Cross /></td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Battery Life</td>
                                    <td><Stars count={4} /></td>
                                    <td><Stars count={5} /></td>
                                    <td><Stars count={2} /></td>
                                    <td><Stars count={4} /></td>
                                    <td><Stars count={5} /></td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Matter Compatible</td>
                                    <td><Cross /></td>
                                    <td><Partial /></td>
                                    <td><Check /></td>
                                    <td><Check /></td>
                                    <td><Cross /></td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Encryption</td>
                                    <td>AES-128 (S2)</td>
                                    <td>AES-128</td>
                                    <td>WPA3/TLS</td>
                                    <td>AES-128</td>
                                    <td>AES-128</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Best For</td>
                                    <td>Reliable automation</td>
                                    <td>Large deployments</td>
                                    <td>Simple setup</td>
                                    <td>Future-proof</td>
                                    <td>Phone-to-lock</td>
                                </tr>
                            </tbody>
                        </table>
                    </TableSection>

                    {/* ────────── 2. ANSI/BHMA Grades ────────── */}
                    <TableSection
                        id="grades"
                        title="ANSI/BHMA Security Grades"
                        description="The American National Standards Institute (ANSI) and Builders Hardware Manufacturers Association (BHMA) define three grades of lock quality and durability. Higher grades indicate better resistance to forced entry and longer operational lifespan."
                    >
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Criterion</th>
                                    <th><span className="badge badge-success">Grade 1</span></th>
                                    <th><span className="badge badge-accent">Grade 2</span></th>
                                    <th><span className="badge badge-warning">Grade 3</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Application</td>
                                    <td>Commercial / High-security Residential</td>
                                    <td>Residential / Light Commercial</td>
                                    <td>Basic Residential</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Cycle Endurance</td>
                                    <td>800,000 cycles</td>
                                    <td>400,000 cycles</td>
                                    <td>200,000 cycles</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Door Strikes (75 lbs)</td>
                                    <td>10 strikes</td>
                                    <td>5 strikes</td>
                                    <td>2 strikes</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Min Bolt Throw</td>
                                    <td>1 inch (25mm)</td>
                                    <td>1 inch (25mm)</td>
                                    <td>5/8 inch (16mm)</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Pick Resistance</td>
                                    <td><Stars count={5} /></td>
                                    <td><Stars count={3} /></td>
                                    <td><Stars count={1} /></td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Drill Resistance</td>
                                    <td><Stars count={5} /></td>
                                    <td><Stars count={3} /></td>
                                    <td><Stars count={1} /></td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Typical Price Range</td>
                                    <td>$200 – $500+</td>
                                    <td>$100 – $300</td>
                                    <td>$30 – $100</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Notable Smart Locks</td>
                                    <td>Schlage Encode Plus, Yale Assure Lock 2</td>
                                    <td>August Wi-Fi, Kwikset Halo</td>
                                    <td>Basic electronic deadbolts</td>
                                </tr>
                            </tbody>
                        </table>
                    </TableSection>

                    {/* ────────── 3. Battery Life ────────── */}
                    <TableSection
                        id="battery"
                        title="Battery Life by Protocol"
                        description="Expected battery life varies significantly by wireless protocol, usage patterns, and lock features. These figures represent typical residential use (8-10 operations per day) with standard AA or CR123A batteries."
                    >
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Protocol</th>
                                    <th>Avg Battery Life</th>
                                    <th>Power Draw</th>
                                    <th>Common Battery</th>
                                    <th>Replacement Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium text-protocol-zigbee">Zigbee</td>
                                    <td>12-18 months</td>
                                    <td className="font-mono text-sm">~15 mW (active)</td>
                                    <td>4× AA</td>
                                    <td>$3-5 / year</td>
                                </tr>
                                <tr>
                                    <td className="font-medium text-protocol-zwave">Z-Wave</td>
                                    <td>10-14 months</td>
                                    <td className="font-mono text-sm">~25 mW (active)</td>
                                    <td>4× AA</td>
                                    <td>$4-6 / year</td>
                                </tr>
                                <tr>
                                    <td className="font-medium text-protocol-thread">Thread</td>
                                    <td>10-14 months</td>
                                    <td className="font-mono text-sm">~20 mW (active)</td>
                                    <td>4× AA / CR123A</td>
                                    <td>$4-8 / year</td>
                                </tr>
                                <tr>
                                    <td className="font-medium text-protocol-ble">BLE Only</td>
                                    <td>12-24 months</td>
                                    <td className="font-mono text-sm">~10 mW (active)</td>
                                    <td>CR2032 / AA</td>
                                    <td>$2-5 / year</td>
                                </tr>
                                <tr>
                                    <td className="font-medium text-protocol-wifi">Wi-Fi</td>
                                    <td>3-6 months</td>
                                    <td className="font-mono text-sm">~200 mW (active)</td>
                                    <td>4× AA / Li-ion</td>
                                    <td>$8-15 / year</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Hardwired (PoE)</td>
                                    <td>N/A — continuous</td>
                                    <td className="font-mono text-sm">3-12 W</td>
                                    <td>PoE (IEEE 802.3af)</td>
                                    <td>$0 (electricity)</td>
                                </tr>
                            </tbody>
                        </table>
                    </TableSection>

                    {/* ────────── 4. Lock Types ────────── */}
                    <TableSection
                        id="lock-types"
                        title="Lock Type Comparison"
                        description="Smart locks come in several mechanical configurations, each suited to different door types, security requirements, and use cases."
                    >
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Lock Type</th>
                                    <th>Best For</th>
                                    <th>Security</th>
                                    <th>Smart Available</th>
                                    <th>DIY Install</th>
                                    <th>Price Range</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Deadbolt</td>
                                    <td>Residential exterior</td>
                                    <td><Stars count={4} /></td>
                                    <td><Check /></td>
                                    <td><Check /></td>
                                    <td>$100-400</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Lever Handle</td>
                                    <td>Interior / ADA</td>
                                    <td><Stars count={3} /></td>
                                    <td><Check /></td>
                                    <td><Check /></td>
                                    <td>$80-350</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Mortise Lock</td>
                                    <td>Commercial / Multi-family</td>
                                    <td><Stars count={5} /></td>
                                    <td><Check /></td>
                                    <td><Cross /></td>
                                    <td>$300-800+</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Knob Lock</td>
                                    <td>Interior rooms</td>
                                    <td><Stars count={2} /></td>
                                    <td><Partial /></td>
                                    <td><Check /></td>
                                    <td>$50-200</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Retrofit Module</td>
                                    <td>Existing deadbolt upgrade</td>
                                    <td><Stars count={4} /></td>
                                    <td><Check /></td>
                                    <td><Check /></td>
                                    <td>$80-250</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Padlock (Smart)</td>
                                    <td>Gates, sheds, storage</td>
                                    <td><Stars count={3} /></td>
                                    <td><Check /></td>
                                    <td>N/A</td>
                                    <td>$30-150</td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Cabinet Lock</td>
                                    <td>Cabinets, server racks</td>
                                    <td><Stars count={2} /></td>
                                    <td><Check /></td>
                                    <td><Check /></td>
                                    <td>$20-100</td>
                                </tr>
                            </tbody>
                        </table>
                    </TableSection>

                    {/* ────────── 5. Encryption Standards ────────── */}
                    <TableSection
                        id="encryption"
                        title="Encryption & Security Standards"
                        description="Security protocols and encryption standards used across smart lock communication protocols. Higher-tier encryption ensures better protection against interception and replay attacks."
                    >
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Standard</th>
                                    <th>Used By</th>
                                    <th>Key Length</th>
                                    <th>Key Exchange</th>
                                    <th>Security Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Z-Wave S2</td>
                                    <td>Z-Wave Plus V2</td>
                                    <td>128-bit AES</td>
                                    <td>ECDH (Curve25519)</td>
                                    <td><Stars count={5} /></td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Z-Wave S0</td>
                                    <td>Legacy Z-Wave</td>
                                    <td>128-bit AES</td>
                                    <td>Plain-text exchange</td>
                                    <td><Stars count={2} /></td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Zigbee 3.0</td>
                                    <td>Zigbee devices</td>
                                    <td>128-bit AES</td>
                                    <td>Install Code / Link Key</td>
                                    <td><Stars count={4} /></td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Thread / DTLS</td>
                                    <td>Thread devices</td>
                                    <td>128-bit AES</td>
                                    <td>DTLS 1.2</td>
                                    <td><Stars count={5} /></td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>WPA3 / TLS 1.3</td>
                                    <td>Wi-Fi locks</td>
                                    <td>192-256 bit</td>
                                    <td>SAE / ECDHE</td>
                                    <td><Stars count={5} /></td>
                                </tr>
                                <tr>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>BLE LESC</td>
                                    <td>BLE 4.2+</td>
                                    <td>128-bit AES</td>
                                    <td>ECDH (P-256)</td>
                                    <td><Stars count={4} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </TableSection>
                </div>

                {/* CTA Section */}
                <div className="max-w-6xl mx-auto mt-8">
                    <div className="cta-section">
                        <h2 className="cta-section__title">Specs, Fit, Protocols</h2>
                        <p className="cta-section__subtitle">
                            Use our interactive calculators and decision tools to find the perfect smart lock
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/calculators/protocol-wizard" className="btn btn-primary btn-lg" prefetch={false}>Protocol Wizard</Link>
                            <Link href="/resources" className="btn btn-secondary btn-lg" prefetch={false}>
                                <ArrowLeft className="w-4 h-4" /> All Resources
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
