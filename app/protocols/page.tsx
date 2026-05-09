import type { Metadata } from 'next'
import Link from 'next/link'
import { Wifi, Radio, Bluetooth, Cpu, ArrowRight, Building2, Home, KeyRound } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Smart Lock Protocols | Z-Wave, Zigbee, Wi-Fi, Thread, Matter & BLE',
    description: 'Compare smart lock protocols by range, battery life, hub requirement, ecosystem fit, security, and product compatibility.',
    alternates: { canonical: '/protocols' },
    openGraph: {
        title: 'Smart Lock Protocols',
        description: 'Compare smart lock protocols by range, battery life, ecosystem fit, and hub requirement.',
        siteName: 'SLockHub.com',
        type: 'website',
        url: 'https://www.slockhub.com/protocols',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Smart Lock Protocols',
        description: 'Start with protocol guides, then validate signal, battery, and product fit.',
    },
}

const protocols = [
    {
        slug: 'z-wave',
        name: 'Z-Wave',
        description: 'Dedicated 908 MHz mesh protocol with S2 AES-128 encryption. Excellent for whole-home smart lock deployments with reliable, low-interference communication.',
        frequency: '908 MHz (US) / 868 MHz (EU)',
        range: '40m indoor',
        maxNodes: '232',
        batteryImpact: 'Low',
        hubRequired: true,
        icon: Radio,
        highlights: ['No WiFi interference', 'Long range', 'Low power', 'Mature ecosystem'],
    },
    {
        slug: 'zigbee',
        name: 'Zigbee',
        description: 'IEEE 802.15.4 mesh protocol supporting up to 65,000 nodes. Ultra-low power consumption makes it ideal for battery-powered smart locks.',
        frequency: '2.4 GHz',
        range: '20m indoor',
        maxNodes: '65,000',
        batteryImpact: 'Very Low',
        hubRequired: true,
        icon: Radio,
        highlights: ['Massive node support', 'Ultra-low power', 'Fast response', 'Cost-effective'],
    },
    {
        slug: 'wifi',
        name: 'Wi-Fi',
        description: 'Direct IP connectivity using existing home networks. No hub required — control your smart lock from anywhere with just your router.',
        frequency: '2.4 / 5 GHz',
        range: '30m indoor',
        maxNodes: 'Router dependent',
        batteryImpact: 'High',
        hubRequired: false,
        icon: Wifi,
        highlights: ['No hub needed', 'Easy setup', 'Remote access', 'Wide compatibility'],
    },
    {
        slug: 'bluetooth',
        name: 'Bluetooth',
        description: 'Short-range direct connection from your smartphone. BLE 5.0 offers improved range and energy efficiency for proximity-based lock control.',
        frequency: '2.4 GHz (BLE)',
        range: '10m indoor',
        maxNodes: '7 (classic) / many (BLE)',
        batteryImpact: 'Very Low',
        hubRequired: false,
        icon: Bluetooth,
        highlights: ['Smartphone direct', 'No hub needed', 'Ultra-low power', 'Proximity unlock'],
    },
    {
        slug: 'thread',
        name: 'Thread',
        description: 'IPv6-based mesh protocol designed for IoT. Matter-compatible and self-healing, Thread represents the future of smart lock connectivity.',
        frequency: '2.4 GHz',
        range: '30m indoor',
        maxNodes: '250+',
        batteryImpact: 'Low',
        hubRequired: true,
        icon: Cpu,
        highlights: ['Matter compatible', 'Self-healing mesh', 'IP-based', 'Future-proof'],
    },
    {
        slug: 'matter',
        name: 'Matter',
        description: 'Unified smart home standard backed by Apple, Google, Amazon, and Samsung. Works over Thread, Wi-Fi, and Ethernet for universal compatibility.',
        frequency: 'Multi-protocol',
        range: 'Varies by transport',
        maxNodes: 'Varies',
        batteryImpact: 'Varies',
        hubRequired: false,
        icon: Cpu,
        highlights: ['Universal standard', 'Cross-platform', 'Major backing', 'Interoperable'],
    },
]

const protocolActions = [
    { href: '/calculators/protocol-wizard', title: 'Protocol Selection Wizard', description: 'Turn ecosystem, range, door count, and rental requirements into a protocol recommendation.' },
    { href: '/calculators/signal-strength', title: 'Signal Strength Calculator', description: 'Validate wall penetration and repeater needs before locking into a protocol.' },
    { href: '/calculators/ble-range', title: 'BLE Range Calculator', description: 'Plan phone proximity, hallway distance, and local Bluetooth unlock limits.' },
    { href: '/calculators/network-bandwidth', title: 'Network Bandwidth Calculator', description: 'Estimate lock, camera, hub, and cloud traffic before enterprise rollout.' },
]

const deploymentRows = [
    { scenario: 'Single home with one or two doors', best: 'Wi-Fi or Matter', reason: 'Simple setup matters more than fleet maintenance unless battery changes are painful.' },
    { scenario: 'Apple-first home or premium condo', best: 'HomeKit, Home Key, or Matter over Thread', reason: 'Apple UX and Wallet access can matter more than protocol purity.' },
    { scenario: 'Airbnb or short-term rental', best: 'Wi-Fi for simple units; Z-Wave for larger portfolios', reason: 'Guest-code reliability, battery visits, and remote recovery drive the choice.' },
    { scenario: 'Long-term rental portfolio', best: 'Z-Wave or managed Matter/Thread', reason: 'Hub workflows, offline resilience, and repeatable troubleshooting matter at scale.' },
    { scenario: 'Multifamily or thick-wall building', best: 'Z-Wave', reason: 'Sub-GHz range and lower 2.4 GHz congestion reduce lock offline incidents.' },
    { scenario: 'Enterprise or multi-site deployment', best: 'Z-Wave, wired access control, or managed Matter', reason: 'Standardize on monitoring, credential operations, and network capacity instead of consumer convenience.' },
]

const comparisonRows = [
    { protocol: 'Wi-Fi', battery: '3-6 months typical', hub: 'No', range: 'Router coverage', ecosystem: 'Brand app and cloud', best: 'Simple remote control, one-off rentals' },
    { protocol: 'Zigbee', battery: '12-15 months', hub: 'Yes', range: '30-75 ft per hop', ecosystem: 'Echo, SmartThings, Hubitat, Home Assistant', best: 'Existing Zigbee homes and low-cost mesh' },
    { protocol: 'Z-Wave', battery: '12-15 months', hub: 'Yes', range: '100-300 ft per hop', ecosystem: 'SmartThings, Hubitat, Home Assistant, security hubs', best: 'Apartments, thick walls, lock-first reliability' },
    { protocol: 'Thread', battery: '12-18 months', hub: 'Border router', range: '30-75 ft per hop', ecosystem: 'Matter-ready Apple, Google, Amazon, SmartThings', best: 'Future-facing smart homes' },
    { protocol: 'Matter', battery: 'Depends on transport', hub: 'Controller required', range: 'Thread or Wi-Fi dependent', ecosystem: 'Apple, Google, Amazon, SmartThings', best: 'Cross-platform interoperability' },
    { protocol: 'BLE', battery: '12+ months', hub: 'No for local use', range: 'Room to short hallway', ecosystem: 'Phone proximity and app access', best: 'Local unlock, setup, backup proximity access' },
]

const articleLinks = [
    { href: '/articles/protocols/smart-lock-protocols-overview', title: 'Wi-Fi vs Zigbee vs Z-Wave: Battery, Range & Hubs', description: 'Deep technical overview across Wi-Fi, Zigbee, Z-Wave, Thread, and Matter.' },
    { href: '/articles/protocols/zigbee-vs-zwave-comparison', title: 'Zigbee vs Z-Wave: Range & Reliability for Smart Locks', description: 'Best mesh protocol choice for locks, apartments, thick walls, and existing hubs.' },
    { href: '/articles/protocols/z-wave-vs-matter-smart-locks', title: 'Z-Wave vs Matter Smart Locks', description: 'Range, hub, battery, and rental tradeoffs between mature Z-Wave and cross-platform Matter.' },
    { href: '/articles/protocols/matter-over-thread-smart-locks', title: 'Matter over Thread Smart Locks', description: 'Controller, border-router, battery, and ecosystem requirements before buying a Thread lock.' },
    { href: '/articles/protocols/thread-vs-zigbee-smart-locks', title: 'Thread vs Zigbee Smart Locks', description: 'IP-native Matter mesh versus mature Zigbee hub ecosystems for low-power smart locks.' },
    { href: '/articles/protocols/wifi-vs-zigbee-smart-locks', title: 'Wi-Fi vs Zigbee Smart Locks', description: 'No-hub convenience versus low-power mesh planning for homes, hosts, and landlords.' },
    { href: '/articles/protocols/wifi-vs-z-wave-smart-locks', title: 'Wi-Fi vs Z-Wave Smart Locks', description: 'Simple remote access versus sub-GHz reliability for apartments, rentals, and larger homes.' },
    { href: '/articles/protocols/wifi-smart-lock-battery-drain', title: 'Wi-Fi Smart Lock Battery Drain', description: 'Diagnose weak signal, motor drag, cold weather, and heavy-use causes before replacing hardware.' },
    { href: '/articles/protocols/bluetooth-vs-wifi-smart-locks', title: 'Bluetooth vs Wi-Fi Smart Locks', description: 'Local proximity unlock versus remote app control, battery life, bridges, and guest access.' },
    { href: '/articles/protocols/best-smart-lock-protocol-rental-properties', title: 'Best Protocol for Rental Property Smart Locks', description: 'Protocol decisions for Airbnb hosts, landlords, multifamily teams, and staff-managed doors.' },
    { href: '/articles/protocols/zigbee-smart-locks-home-assistant', title: 'Zigbee Smart Locks for Home Assistant', description: 'Coordinator, ZHA, Zigbee2MQTT, repeater, security, and pairing planning for Home Assistant locks.' },
    { href: '/articles/protocols/smart-lock-mesh-network-planning', title: 'Smart Lock Mesh Network Planning', description: 'Repeater placement, hub location, wall loss, battery impact, and multi-door reliability planning.' },
    { href: '/articles/protocols/enterprise-smart-lock-protocol-selection', title: 'Enterprise Smart Lock Protocol Selection', description: 'Protocol choices for multi-site commercial deployments, identity, audit logs, power, and support.' },
    { href: '/articles/protocols/matter-vs-homekit-vs-zwave-smart-locks', title: 'Matter vs HomeKit vs Z-Wave for Property Managers', description: 'Ecosystem tradeoffs for rentals, portfolios, and mixed resident platforms.' },
    { href: '/articles/protocols/best-z-wave-smart-locks-hubs-apartments', title: 'Z-Wave Lock Planning for Hubs and Apartments', description: 'Range, hub compatibility, repeaters, and multi-property Z-Wave planning.' },
    { href: '/articles/protocols/connect-lock-to-homekit', title: 'HomeKit Smart Lock Setup and No Response Fixes', description: 'Pair locks with Apple Home, Matter, and Home hubs without setup churn.' },
    { href: '/articles/protocols/apple-home-key-smart-locks-guide', title: 'Apple Home Key vs Matter: Wallet Access & Ecosystem Fit', description: 'Compare Wallet tap-to-unlock, HomeKit, Thread, and Matter buying implications.' },
    { href: '/articles/protocols/aliro-smart-locks-explained', title: 'Aliro vs Matter: NFC, UWB & Wallet Key Standards', description: 'Understand emerging access credentials, phone keys, readers, and interoperability.' },
]

const buyerPaths = [
    {
        title: 'Enterprise Deployment',
        icon: Building2,
        description: 'Start with fleet control, uptime, audit trails, and network capacity. Protocol choice should support monitoring and repeatable recovery.',
        links: [
            { href: '/articles/use-cases/enterprise-commercial-deployment', label: 'Enterprise deployment guide' },
            { href: '/articles/integration/enterprise-system-integration', label: 'Enterprise integration' },
            { href: '/calculators/network-bandwidth', label: 'Network bandwidth calculator' },
        ],
    },
    {
        title: 'Home Automation',
        icon: Home,
        description: 'Match the lock to the household ecosystem first, then validate Thread border routers, HomeKit hubs, and automation latency.',
        links: [
            { href: '/articles/protocols/matter-vs-homekit-vs-zwave-smart-locks', label: 'Matter vs HomeKit vs Z-Wave' },
            { href: '/articles/protocols/connect-lock-to-homekit', label: 'HomeKit setup guide' },
            { href: '/calculators/protocol-wizard', label: 'Protocol wizard' },
        ],
    },
    {
        title: 'Rental Management',
        icon: KeyRound,
        description: 'Prioritize guest-code reliability, battery maintenance, offline fallback, and whether staff can troubleshoot locks without owner apps.',
        links: [
            { href: '/articles/use-cases/rental-property-smart-locks', label: 'Rental smart lock hub' },
            { href: '/articles/protocols/best-z-wave-smart-locks-hubs-apartments', label: 'Z-Wave portfolio planning' },
            { href: '/calculators/signal-strength', label: 'Signal strength calculator' },
        ],
    },
]

export default function ProtocolsPage() {
    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Smart Lock Protocols',
        description: 'Compare smart lock protocols by range, battery life, hub needs, mesh behavior, security, ecosystem fit, and planning tools.',
        url: 'https://www.slockhub.com/protocols',
        mainEntity: [
            {
                '@type': 'ItemList',
                name: 'Smart lock protocol details',
                numberOfItems: protocols.length,
                itemListElement: protocols.map((proto, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: proto.name,
                    url: `https://www.slockhub.com/protocols/${proto.slug}`,
                })),
            },
            {
                '@type': 'ItemList',
                name: 'Smart lock protocol articles',
                numberOfItems: articleLinks.length,
                itemListElement: articleLinks.map((article, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: article.title,
                    url: `https://www.slockhub.com${article.href}`,
                })),
            },
        ],
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
            <div className="page-wrapper-alt">
                <div className="container-main section">
                <div className="page-header">
                    <div className="page-header__icon">
                        <Radio className="w-10 h-10" />
                    </div>
                    <h1 className="page-header__title">Smart Lock Protocol Comparison</h1>
                    <p className="page-header__subtitle">
                        Compare Wi-Fi, Zigbee, Z-Wave, Thread, Matter, and BLE by battery life, range, hub requirements, ecosystem fit, and deployment risk.
                    </p>
                </div>

                <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Best Protocol by Deployment Type</h2>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Deployment</th>
                                    <th>Best protocol path</th>
                                    <th>Why it ranks first</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deploymentRows.map((row) => (
                                    <tr key={row.scenario}>
                                        <td><strong>{row.scenario}</strong></td>
                                        <td>{row.best}</td>
                                        <td>{row.reason}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Protocol Planning Calculators</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {protocolActions.map((item) => (
                            <Link key={item.href} href={item.href} className="link-card" prefetch={false}>
                                <h3 className="link-card__title">{item.title}</h3>
                                <p className="link-card__desc">{item.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Master Protocol Comparison</h2>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Protocol</th>
                                    <th>Battery</th>
                                    <th>Hub</th>
                                    <th>Range basis</th>
                                    <th>Ecosystem</th>
                                    <th>Best use</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map((row) => (
                                    <tr key={row.protocol}>
                                        <td><strong>{row.protocol}</strong></td>
                                        <td>{row.battery}</td>
                                        <td>{row.hub}</td>
                                        <td>{row.range}</td>
                                        <td>{row.ecosystem}</td>
                                        <td>{row.best}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginBottom: 'var(--space-3xl)' }}>
                    {protocols.map((proto) => {
                        const Icon = proto.icon
                        return (
                            <Link
                                key={proto.slug}
                                href={`/protocols/${proto.slug}`}
                                className="card"
                                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}
                             prefetch={false}>
                                <div className="flex items-center gap-3">
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--color-bg-alt)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                                    </div>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                        {proto.name}
                                    </h2>
                                </div>

                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, flex: 1 }}>
                                    {proto.description}
                                </p>

                                {/* Quick specs */}
                                <div className="grid grid-cols-2 gap-2" style={{ fontSize: '0.75rem' }}>
                                    <div style={{ padding: '4px 8px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Freq: </span>
                                        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{proto.frequency}</span>
                                    </div>
                                    <div style={{ padding: '4px 8px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Range: </span>
                                        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{proto.range}</span>
                                    </div>
                                    <div style={{ padding: '4px 8px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Battery: </span>
                                        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{proto.batteryImpact}</span>
                                    </div>
                                    <div style={{ padding: '4px 8px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Hub: </span>
                                        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{proto.hubRequired ? 'Required' : 'Not needed'}</span>
                                    </div>
                                </div>

                                <div style={{ color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 600 }}>
                                    View Compatible Locks →
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Protocol Article Library</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {articleLinks.map((article) => (
                            <Link key={article.href} href={article.href} className="link-card" prefetch={false}>
                                <h3 className="link-card__title">{article.title}</h3>
                                <p className="link-card__desc">{article.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ marginBottom: 'var(--space-3xl)' }}>
                    {buyerPaths.map((path) => {
                        const Icon = path.icon
                        return (
                            <div key={path.title} className="content-card">
                                <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-md)' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--color-bg-alt)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                                    </div>
                                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{path.title}</h2>
                                </div>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: 'var(--space-md)' }}>{path.description}</p>
                                <div className="flex flex-col gap-2">
                                    {path.links.map((link) => (
                                        <Link key={link.href} href={link.href} style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.9rem' }} prefetch={false}>
                                            {link.label} →
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </section>

                <div className="cta-section">
                    <h2 className="cta-section__title">Protocol, Signal, Battery Tools</h2>
                    <p className="cta-section__subtitle">
                        Start with the Protocol Selection Wizard, then verify signal strength, BLE range, and network bandwidth before rollout.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/calculators/protocol-wizard" className="btn btn-primary btn-lg" prefetch={false}>
                            Try Protocol Wizard <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/calculators/network-bandwidth" className="btn btn-secondary btn-lg" prefetch={false}>
                            Check Bandwidth
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
