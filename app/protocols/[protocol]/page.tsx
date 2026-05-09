import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Radio, ArrowRight, Shield } from 'lucide-react'

export const dynamic = 'force-static'

// ============================================
// 协议数据
// ============================================

const protocolData: Record<string, {
    name: string
    fullName: string
    description: string
    frequency: string
    range: string
    maxNodes: string
    security: string
    batteryImpact: string
    hubRequired: boolean
    pros: string[]
    cons: string[]
    bestFor: string[]
    faqs: { question: string; answer: string }[]
}> = {
    'z-wave': {
        name: 'Z-Wave',
        fullName: 'Z-Wave Plus (700/800 Series)',
        description: 'Z-Wave operates on the 908 MHz frequency band in the US, separate from crowded 2.4 GHz Wi-Fi networks. This dedicated frequency improves reliability, wall penetration, and range for whole-home smart lock installations.',
        frequency: '908 MHz (US) / 868 MHz (EU)',
        range: '40m indoor / 100m outdoor',
        maxNodes: '232 devices per network',
        security: 'S2 Framework with AES-128 encryption',
        batteryImpact: 'Low — 12+ months typical',
        hubRequired: true,
        pros: ['Dedicated frequency eliminates WiFi interference', 'Excellent range (40m indoor)', 'Low power consumption extends battery life', 'Self-healing mesh network', 'Backward compatible across generations', 'Robust S2 security framework'],
        cons: ['Hub/controller required', 'Limited to 232 devices per network', 'Lower bandwidth than WiFi', 'Proprietary protocol with certification costs'],
        bestFor: ['Whole-home smart lock deployments', 'Properties with WiFi congestion', 'Professional installations', 'Security-focused applications'],
        faqs: [
            { question: 'Do all Z-Wave smart locks need a hub?', answer: 'Yes, Z-Wave locks require a compatible hub or controller (such as SmartThings, Hubitat, or a Z-Wave USB stick). The hub acts as the central coordinator for the Z-Wave mesh network.' },
            { question: 'What is the range of Z-Wave smart locks?', answer: 'Z-Wave locks typically achieve 40 meters indoors and up to 100 meters outdoors in clear line of sight. The mesh network feature means each Z-Wave device acts as a repeater, extending total coverage.' },
            { question: 'Is Z-Wave secure enough for door locks?', answer: 'Z-Wave uses the S2 security framework with AES-128 encryption, which is considered highly secure for residential and commercial applications. All certified Z-Wave locks must implement S2 security.' },
        ],
    },
    'zigbee': {
        name: 'Zigbee',
        fullName: 'Zigbee 3.0 (IEEE 802.15.4)',
        description: 'Zigbee 3.0 is an ultra-low-power mesh protocol that supports networks of up to 65,000 devices. Its efficiency makes it ideal for battery-powered smart locks in large-scale deployments like hotels and commercial buildings.',
        frequency: '2.4 GHz (ISM band)',
        range: '20m indoor / 75m outdoor',
        maxNodes: '65,000 devices per network',
        security: 'AES-128 encryption with network keys',
        batteryImpact: 'Very Low — 18+ months typical',
        hubRequired: true,
        pros: ['Massive network capacity (65,000 nodes)', 'Ultra-low power consumption', 'Fast response time (<50ms)', 'Zigbee 3.0 unifies all profiles', 'Cost-effective chipsets', 'Strong in commercial/hospitality'],
        cons: ['Operates on crowded 2.4 GHz band', 'Shorter range than Z-Wave', 'Hub required', 'Complex mesh management at scale'],
        bestFor: ['Large-scale deployments (hotels, offices)', 'Battery-critical installations', 'Budget-conscious projects', 'High-density environments'],
        faqs: [
            { question: 'Can Zigbee smart locks interfere with WiFi?', answer: 'Zigbee and WiFi both use the 2.4 GHz band but on different channels. Properly configured, they coexist well. Choose Zigbee channels 15, 20, or 25 to avoid WiFi overlap.' },
            { question: 'How long do Zigbee lock batteries last?', answer: 'Zigbee\'s ultra-low power consumption typically yields 18+ months of battery life, making it one of the most efficient protocols for smart locks.' },
            { question: 'What hubs work with Zigbee smart locks?', answer: 'Popular options include Amazon Echo (4th gen), SmartThings, Hubitat, and Home Assistant with a Zigbee coordinator. Many Apple HomePod devices also include Zigbee/Thread radios.' },
        ],
    },
    'wifi': {
        name: 'Wi-Fi',
        fullName: 'Wi-Fi (802.11 b/g/n/ac)',
        description: 'Wi-Fi smart locks connect directly to your home router — no hub needed. This makes them the easiest to set up and provides immediate remote access from anywhere. However, higher power consumption means shorter battery life.',
        frequency: '2.4 GHz / 5 GHz dual-band',
        range: '30m indoor (router dependent)',
        maxNodes: 'Limited by router capacity',
        security: 'WPA3 / TLS encryption',
        batteryImpact: 'High — 6 months typical',
        hubRequired: false,
        pros: ['No hub or bridge required', 'Instant remote access from anywhere', 'Easy setup with smartphone app', 'Works with most smart home platforms', 'High bandwidth for firmware updates', 'Direct cloud connectivity'],
        cons: ['Highest power consumption of all protocols', 'Depends on router reliability', 'Can contribute to WiFi congestion', 'Shorter battery life (typically 6 months)', 'Security depends on WiFi configuration'],
        bestFor: ['Simple single-lock installations', 'Renters who cannot install a hub', 'Users who want immediate remote access', 'Vacation properties with existing WiFi'],
        faqs: [
            { question: 'How often do WiFi smart lock batteries need replacing?', answer: 'WiFi locks typically need battery replacement every 4-6 months due to the higher power demands of maintaining a Wi-Fi connection. Some models support USB-C backup charging.' },
            { question: 'Do WiFi locks work if my internet goes down?', answer: 'Yes, most WiFi locks store PIN codes locally and will continue to work for keypad/manual entry. However, remote access and notifications require an active internet connection.' },
            { question: 'Will a WiFi lock slow down my internet?', answer: 'Smart locks use very little bandwidth. However, if you have many WiFi IoT devices, consider a router with IoT network segmentation or upgrade to a mesh router system.' },
        ],
    },
    'bluetooth': {
        name: 'Bluetooth',
        fullName: 'Bluetooth Low Energy (BLE 5.0+)',
        description: 'Bluetooth smart locks connect directly to your smartphone for proximity-based access. BLE 5.0 offers improved range and energy efficiency, making it perfect for simple, phone-centric lock control without any hub or WiFi dependency.',
        frequency: '2.4 GHz (BLE)',
        range: '10m indoor / 30m outdoor',
        maxNodes: 'Point-to-point',
        security: 'AES-128-CCM encryption',
        batteryImpact: 'Very Low — 12+ months typical',
        hubRequired: false,
        pros: ['Direct smartphone connection', 'No hub or WiFi required', 'Ultra-low power consumption', 'Proximity auto-unlock feature', 'Simple pairing process', 'Works offline'],
        cons: ['Limited range (10m typical)', 'No native remote access without bridge', 'Point-to-point only (no mesh)', 'Requires phone for smart features', 'No automation without gateway'],
        bestFor: ['Single door installations', 'Users with basic smart lock needs', 'Offline environments', 'Budget-friendly setups'],
        faqs: [
            { question: 'Can I unlock a Bluetooth lock remotely?', answer: 'Bluetooth alone doesn\'t support remote access. Some manufacturers offer optional WiFi bridges that enable remote control by connecting your Bluetooth lock to the internet.' },
            { question: 'How close do I need to be to unlock?', answer: 'BLE 5.0 smart locks typically work within 10 meters. Many models support auto-unlock when your phone enters this proximity range.' },
            { question: 'Do Bluetooth locks work with voice assistants?', answer: 'Most Bluetooth-only locks require an optional bridge or hub to integrate with Alexa, Google Assistant, or Siri. Some newer models include WiFi or Thread as secondary protocols.' },
        ],
    },
    'thread': {
        name: 'Thread',
        fullName: 'Thread 1.3 (IEEE 802.15.4)',
        description: 'Thread is an IPv6-based mesh networking protocol purpose-built for IoT devices. It\'s the transport layer for Matter, making Thread locks inherently future-proof. Self-healing mesh with no single point of failure.',
        frequency: '2.4 GHz (IEEE 802.15.4)',
        range: '30m indoor / 100m outdoor',
        maxNodes: '250+ per network',
        security: 'DTLS (Datagram TLS) encryption',
        batteryImpact: 'Low — 12+ months typical',
        hubRequired: true,
        pros: ['Native Matter/IP support', 'Self-healing mesh network', 'Low power consumption', 'No single point of failure', 'Direct IP addressing', 'Future-proof technology'],
        cons: ['Newer technology with smaller ecosystem', 'Border Router required', 'Fewer available devices currently', 'Still evolving standard', 'Limited backward compatibility'],
        bestFor: ['Future-proof installations', 'Apple HomeKit users (HomePod as Border Router)', 'New construction projects', 'Tech-forward smart homes'],
        faqs: [
            { question: 'What is a Thread Border Router?', answer: 'A Thread Border Router connects the Thread mesh network to your home network (WiFi/Ethernet). Apple HomePod Mini, Google Nest Hub, and Amazon Echo 4th gen can all serve as Thread Border Routers.' },
            { question: 'Is Thread the same as Matter?', answer: 'No, Thread is a networking protocol (like WiFi or Bluetooth) while Matter is an application layer standard. Thread is one of Matter\'s supported transport layers, along with WiFi and Ethernet.' },
            { question: 'Can Thread locks work with Z-Wave or Zigbee hubs?', answer: 'Thread devices require a Thread Border Router and cannot connect directly to Z-Wave or Zigbee hubs. However, many modern hubs (like SmartThings) support multiple protocols including Thread.' },
        ],
    },
    'matter': {
        name: 'Matter',
        fullName: 'Matter 1.0+ (by CSA)',
        description: 'Matter is the unified smart home standard developed by Apple, Google, Amazon, Samsung, and hundreds of other companies. It ensures seamless interoperability across ecosystems, removing vendor lock-in for smart lock buyers.',
        frequency: 'Multi-protocol (Thread, WiFi, Ethernet)',
        range: 'Depends on underlying transport',
        maxNodes: 'Fabric-based (virtually unlimited)',
        security: 'Certificate-based authentication + encryption',
        batteryImpact: 'Depends on transport protocol',
        hubRequired: false,
        pros: ['Universal cross-platform compatibility', 'Backed by all major platforms', 'Eliminates vendor lock-in', 'Strong certificate-based security', 'Local-first (works without cloud)', 'Open standard with no licensing fees'],
        cons: ['Newer standard — limited lock options currently', 'Feature set still expanding', 'May require firmware updates on older devices', 'Performance varies by transport layer', 'Ecosystem still maturing'],
        bestFor: ['Multi-platform households', 'Users switching between ecosystems', 'New purchases for long-term compatibility', 'Commercial properties needing flexibility'],
        faqs: [
            { question: 'Do I need a Matter hub?', answer: 'Matter controllers are needed — Apple TV, HomePod, Google Nest Hub, Amazon Echo, or SmartThings Hub can all serve as Matter controllers. Most modern smart home devices can act as one.' },
            { question: 'Can older smart locks get Matter support?', answer: 'Some manufacturers offer firmware updates to add Matter support, but it depends on the hardware capabilities. Check with your lock manufacturer for Matter upgrade availability.' },
            { question: 'Is Matter more secure than other protocols?', answer: 'Matter uses certificate-based authentication and encrypted communication, which is considered very secure. It also operates locally first, reducing cloud dependency and associated security risks.' },
        ],
    },
}

// ============================================
// Metadata + Static Params
// ============================================

export async function generateMetadata({ params }: { params: Promise<{ protocol: string }> }): Promise<Metadata> {
    const { protocol } = await params
    const proto = protocolData[protocol]
    if (!proto) return { title: 'Smart Lock Protocols | Range, Battery, Hubs | SLockHub' }

    const title = `${proto.name} Smart Locks | Range, Battery, Hubs & Compatible Products`
    const description = `Compare ${proto.name} smart locks by range, battery impact, hub requirement, ecosystem fit, security, and compatible products.`
    const canonical = `/protocols/${protocol}`

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: { title, description, url: canonical, siteName: 'SLockHub.com', type: 'website' },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    }
}

export function generateStaticParams() {
    return Object.keys(protocolData).map(protocol => ({ protocol }))
}

function getAlternativeProtocols(protocol: string) {
    const order = ['wifi', 'z-wave', 'zigbee', 'thread', 'matter', 'bluetooth']
    return order.filter(item => item !== protocol).slice(0, 3).map(item => ({
        slug: item,
        name: protocolData[item].name,
        range: protocolData[item].range,
        batteryImpact: protocolData[item].batteryImpact,
        hub: protocolData[item].hubRequired ? 'Hub needed' : 'No hub by default',
    }))
}

function getBestPageHref(protocol: string): { href: string; label: string } {
    const map: Record<string, { href: string; label: string }> = {
        wifi: { href: '/best/wifi-smart-locks', label: 'Best Wi-Fi smart locks' },
        'z-wave': { href: '/best/z-wave-smart-locks', label: 'Best Z-Wave smart locks' },
        zigbee: { href: '/best/zigbee-smart-locks', label: 'Best Zigbee smart locks' },
        thread: { href: '/best/thread-smart-locks', label: 'Best Thread smart locks' },
        matter: { href: '/best/matter-smart-locks', label: 'Best Matter smart locks' },
        bluetooth: { href: '/best/smart-locks-2026', label: 'Best smart locks 2026' },
    }
    return map[protocol] || { href: '/best/smart-locks-2026', label: 'Best smart locks 2026' }
}

function getPlanningLinks(protocol: string) {
    const links = [
        { href: '/calculators/protocol-wizard', label: 'Protocol Wizard', detail: 'Choose by hub, range, and battery tradeoffs.' },
        { href: '/calculators/signal-strength', label: 'Signal Strength Calculator', detail: 'Estimate range and wall-penetration risk before installing.' },
        { href: '/calculators/battery-life', label: 'Battery Life Calculator', detail: 'Model maintenance intervals by protocol and usage frequency.' },
    ]
    if (protocol === 'zigbee' || protocol === 'z-wave' || protocol === 'thread') {
        links.push({ href: '/calculators/mesh-planner', label: 'Mesh Planner', detail: 'Plan repeater spacing and mesh reliability.' })
    }
    if (protocol === 'bluetooth') {
        links[1] = { href: '/calculators/ble-range', label: 'BLE Range Calculator', detail: 'Validate phone-to-lock proximity before choosing Bluetooth.' }
    }
    return links.slice(0, 4)
}

function getProtocolScorecards(protocol: string, proto: (typeof protocolData)[string]) {
    const map: Record<string, { label: string; value: string; detail: string }[]> = {
        wifi: [
            { label: 'Best fit', value: 'Single-site remote access', detail: 'Best when you want app control without a hub rollout.' },
            { label: 'Battery planning', value: 'High maintenance', detail: 'Expect shorter service intervals and plan spare batteries.' },
            { label: 'Controller path', value: 'Router + cloud', detail: 'Performance depends on Wi-Fi quality, ISP uptime, and vendor app resilience.' },
            { label: 'Security posture', value: proto.security, detail: 'Segment IoT devices and keep firmware current.' },
        ],
        'z-wave': [
            { label: 'Best fit', value: 'Reliability-first deployments', detail: 'Strong choice for apartments, rentals, and thick-wall properties.' },
            { label: 'Battery planning', value: proto.batteryImpact, detail: 'Sub-GHz radios usually reduce service visits versus Wi-Fi locks.' },
            { label: 'Controller path', value: 'Hub-centered', detail: 'Pair with SmartThings, Hubitat, Home Assistant, or security hubs.' },
            { label: 'Security posture', value: proto.security, detail: 'Use S2 inclusion and document recovery steps for controller failure.' },
        ],
        zigbee: [
            { label: 'Best fit', value: 'Large low-power meshes', detail: 'Good when you already run Echo, SmartThings, Hubitat, ZHA, or Zigbee2MQTT.' },
            { label: 'Battery planning', value: proto.batteryImpact, detail: 'Mesh repeaters and clean channels usually extend lock battery life.' },
            { label: 'Controller path', value: 'Coordinator + repeaters', detail: 'Channel planning and router placement matter more than raw spec sheets.' },
            { label: 'Security posture', value: proto.security, detail: 'Use modern coordinators and verify secure pairing before rollout.' },
        ],
        bluetooth: [
            { label: 'Best fit', value: 'Phone-first local access', detail: 'Strong for owner-occupied doors and proximity unlock, weak for fleet remote control.' },
            { label: 'Battery planning', value: proto.batteryImpact, detail: 'BLE is efficient, but phone scanning settings still affect experience.' },
            { label: 'Controller path', value: 'No hub by default', detail: 'Add a bridge only if you truly need remote guest management.' },
            { label: 'Security posture', value: proto.security, detail: 'Validate phone credential recovery and backup entry before relying on auto-unlock.' },
        ],
        thread: [
            { label: 'Best fit', value: 'Future-facing Matter homes', detail: 'Best when the property already has stable border routers and modern ecosystems.' },
            { label: 'Battery planning', value: proto.batteryImpact, detail: 'Thread is efficient, but border-router placement still controls real-world reliability.' },
            { label: 'Controller path', value: 'Border router required', detail: 'Treat Apple, Google, Amazon, or SmartThings controllers as infrastructure, not accessories.' },
            { label: 'Security posture', value: proto.security, detail: 'Keep controllers updated and avoid mixing unsupported legacy expectations into the rollout.' },
        ],
        matter: [
            { label: 'Best fit', value: 'Cross-platform households', detail: 'Best when Apple, Google, Alexa, or SmartThings all need first-class support.' },
            { label: 'Battery planning', value: proto.batteryImpact, detail: 'Battery depends on whether the lock runs over Thread or Wi-Fi.' },
            { label: 'Controller path', value: 'Controller-led', detail: 'Matter simplifies interoperability but still needs the right controller and transport.' },
            { label: 'Security posture', value: proto.security, detail: 'Use vendor firmware that is current with recent Matter controller behavior.' },
        ],
    }

    return map[protocol] || [
        { label: 'Best fit', value: proto.name, detail: proto.description },
        { label: 'Battery planning', value: proto.batteryImpact, detail: 'Match battery maintenance to site access constraints.' },
        { label: 'Controller path', value: proto.hubRequired ? 'Hub or bridge' : 'Direct connection', detail: 'Confirm the controller path before you buy hardware.' },
        { label: 'Security posture', value: proto.security, detail: 'Review encryption, pairing, and firmware expectations before deployment.' },
    ]
}

function getProtocolChecklist(protocol: string) {
    const map: Record<string, string[]> = {
        wifi: [
            'Verify 2.4 GHz coverage at the door, not just in the hallway.',
            'Plan battery service intervals before choosing Wi-Fi for rentals or remote sites.',
            'Confirm the lock stores local codes when internet service is down.',
            'Segment IoT traffic if the property also runs cameras or guest Wi-Fi.',
        ],
        'z-wave': [
            'Choose the hub first, then confirm the lock supports its inclusion and backup workflow.',
            'Place powered repeaters between hub and door before blaming the lock radio.',
            'Document S2 inclusion, exclusion, and controller recovery procedures.',
            'Use Z-Wave when wall penetration and repeatable battery behavior matter more than no-hub convenience.',
        ],
        zigbee: [
            'Pick a coordinator and Zigbee channel that avoids major Wi-Fi overlap.',
            'Add powered routers near metal or exterior doors before rollout.',
            'Standardize on one stack such as SmartThings, Hubitat, ZHA, or Zigbee2MQTT.',
            'Validate battery and routing behavior after pairing, not just during bench testing.',
        ],
        bluetooth: [
            'Treat Bluetooth as local access first; add a bridge only if remote control is justified.',
            'Check phone wake-up behavior, wallet key support, and backup entry options.',
            'Test unlock distance from the actual approach path, not beside the door.',
            'Avoid BLE-only assumptions for staff-managed rentals that need remote recovery.',
        ],
        thread: [
            'Confirm a stable border router exists before buying a Thread-only lock.',
            'Keep router placement close enough to the entry path for first-pair reliability.',
            'Validate the Matter controller, Thread transport, and mobile ecosystem together.',
            'Use Thread when you want local-first automation without inheriting old hub lock-in.',
        ],
        matter: [
            'Identify whether the specific lock uses Matter over Thread or Matter over Wi-Fi.',
            'Confirm the chosen controller supports the lock features you actually need today.',
            'Test multi-admin and household sharing flows before deploying across families or staff.',
            'Prefer Matter where ecosystem flexibility matters more than one vendor’s app workflow.',
        ],
    }

    return map[protocol] || []
}

function getProtocolReadingList(protocol: string) {
    const map: Record<string, { href: string; title: string; description: string }[]> = {
        wifi: [
            { href: '/articles/protocols/wifi-vs-z-wave-smart-locks', title: 'Wi-Fi vs Z-Wave Smart Locks', description: 'Remote convenience versus range-first reliability.' },
            { href: '/articles/protocols/wifi-vs-zigbee-smart-locks', title: 'Wi-Fi vs Zigbee Smart Locks', description: 'No-hub setup versus low-power mesh planning.' },
            { href: '/articles/protocols/wifi-smart-lock-battery-drain', title: 'Wi-Fi Smart Lock Battery Drain', description: 'Diagnose signal, motor, and battery drain before replacing hardware.' },
        ],
        'z-wave': [
            { href: '/articles/protocols/z-wave-vs-matter-smart-locks', title: 'Z-Wave vs Matter Smart Locks', description: 'Protocol tradeoffs for rentals, apartments, and mixed ecosystems.' },
            { href: '/articles/protocols/best-z-wave-smart-locks-hubs-apartments', title: 'Z-Wave Lock Planning for Hubs and Apartments', description: 'Hub compatibility, repeater placement, and apartment reliability.' },
            { href: '/articles/protocols/zigbee-vs-zwave-comparison', title: 'Zigbee vs Z-Wave Comparison', description: 'Detailed mesh comparison for wall loss, battery, and ecosystem fit.' },
        ],
        zigbee: [
            { href: '/articles/protocols/zigbee-vs-zwave-comparison', title: 'Zigbee vs Z-Wave Comparison', description: 'Mesh planning, interference, and deployment tradeoffs.' },
            { href: '/articles/protocols/zigbee-smart-locks-home-assistant', title: 'Zigbee Smart Locks for Home Assistant', description: 'Coordinator, channel, and router decisions for Home Assistant.' },
            { href: '/articles/protocols/thread-vs-zigbee-smart-locks', title: 'Thread vs Zigbee Smart Locks', description: 'Mature Zigbee mesh versus Thread and Matter paths.' },
        ],
        bluetooth: [
            { href: '/articles/protocols/bluetooth-vs-wifi-smart-locks', title: 'Bluetooth vs Wi-Fi Smart Locks', description: 'Local phone unlock versus remote cloud access.' },
            { href: '/articles/protocols/apple-home-key-smart-locks-guide', title: 'Apple Home Key vs Matter', description: 'Wallet access, NFC, and ecosystem fit for phone-based unlock.' },
            { href: '/articles/protocols/smart-lock-protocols-overview', title: 'Smart Lock Protocols Overview', description: 'Battery, range, hub, and deployment context across all protocols.' },
        ],
        thread: [
            { href: '/articles/protocols/matter-over-thread-smart-locks', title: 'Matter over Thread Smart Locks', description: 'Border routers, controller requirements, and buying implications.' },
            { href: '/articles/protocols/thread-vs-zigbee-smart-locks', title: 'Thread vs Zigbee Smart Locks', description: 'Future-ready IP mesh versus mature Zigbee networks.' },
            { href: '/articles/protocols/matter-vs-homekit-vs-zwave-smart-locks', title: 'Matter vs HomeKit vs Z-Wave', description: 'Platform and protocol decisions for mixed-device properties.' },
        ],
        matter: [
            { href: '/articles/protocols/matter-over-thread-smart-locks', title: 'Matter over Thread Smart Locks', description: 'Understand controllers, border routers, and rollout limits.' },
            { href: '/articles/protocols/matter-vs-homekit-vs-zwave-smart-locks', title: 'Matter vs HomeKit vs Z-Wave', description: 'Cross-platform flexibility versus mature lock ecosystems.' },
            { href: '/articles/protocols/aliro-smart-locks-explained', title: 'Aliro vs Matter', description: 'Emerging wallet-key and credential standards beyond Matter alone.' },
        ],
    }

    return map[protocol] || []
}

// ============================================
// 页面组件
// ============================================

export default async function ProtocolDetailPage({ params }: { params: Promise<{ protocol: string }> }) {
    const { protocol } = await params
    const proto = protocolData[protocol]

    if (!proto) notFound()

    const bestPageLink = getBestPageHref(protocol)
    const alternativeProtocols = getAlternativeProtocols(protocol)
    const planningLinks = getPlanningLinks(protocol)
    const scorecards = getProtocolScorecards(protocol, proto)
    const checklist = getProtocolChecklist(protocol)
    const readingList = getProtocolReadingList(protocol)
    const pageUrl = `https://www.slockhub.com/protocols/${protocol}`

    return (
        <div className="page-wrapper-alt">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'WebPage',
                            name: `${proto.name} Smart Locks`,
                            description: proto.description,
                            url: pageUrl,
                            isPartOf: {
                                '@type': 'WebSite',
                                name: 'SLockHub.com',
                                url: 'https://www.slockhub.com',
                            },
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                                { '@type': 'ListItem', position: 2, name: 'Protocols', item: 'https://www.slockhub.com/protocols' },
                                { '@type': 'ListItem', position: 3, name: proto.name, item: pageUrl },
                            ],
                        },
                    ]),
                }}
            />
            <div className="container-main section">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
                    <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Home</Link>
                    <span>/</span>
                    <Link href="/protocols" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Protocols</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{proto.name}</span>
                </nav>

                {/* Header */}
                <div className="page-header" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="page-header__icon">
                        <Radio className="w-10 h-10" />
                    </div>
                    <h1 className="page-header__title">{proto.name} Smart Locks</h1>
                    <p className="page-header__subtitle">{proto.fullName}</p>
                </div>

                {/* Protocol Overview */}
                <div className="card" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>
                        {proto.description}
                    </p>
                </div>

                <section className="content-card" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <h2 className="section-title">Range, Battery, Hub Score</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {scorecards.map((card) => (
                            <ScorecardStat key={card.label} label={card.label} value={card.value} detail={card.detail} />
                        ))}
                    </div>
                </section>

                {/* Technical Specs */}
                <div style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Frequency, Range, Battery Specs</h2>
                    <div className="card overflow-hidden p-0 comparison-table-desktop">
                        <table className="data-table">
                            <tbody>
                                {[
                                    { label: 'Frequency', value: proto.frequency },
                                    { label: 'Indoor Range', value: proto.range },
                                    { label: 'Max Devices', value: proto.maxNodes },
                                    { label: 'Security', value: proto.security },
                                    { label: 'Battery Impact', value: proto.batteryImpact },
                                    { label: 'Hub Required', value: proto.hubRequired ? 'Yes — hub or bridge needed' : 'No — connects directly' },
                                ].map(spec => (
                                    <tr key={spec.label}>
                                        <td className="font-medium text-color-primary" style={{ width: '40%' }}>{spec.label}</td>
                                        <td className="mono-value text-sm">{spec.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="comparison-card-grid">
                        {[
                            { label: 'Frequency', value: proto.frequency },
                            { label: 'Indoor Range', value: proto.range },
                            { label: 'Max Devices', value: proto.maxNodes },
                            { label: 'Security', value: proto.security },
                            { label: 'Battery Impact', value: proto.batteryImpact },
                            { label: 'Hub Required', value: proto.hubRequired ? 'Yes — hub or bridge needed' : 'No — connects directly' },
                        ].map((spec) => (
                            <div key={spec.label} className="comparison-card">
                                <div className="comparison-card__title">{spec.label}</div>
                                <div className="comparison-card__value" style={{ textAlign: 'left' }}>{spec.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <section style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">{proto.name} vs Alternatives</h2>
                    <div className="card overflow-hidden p-0 comparison-table-desktop">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Protocol</th>
                                    <th>Range</th>
                                    <th>Battery profile</th>
                                    <th>Hub requirement</th>
                                    <th>Compare</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium text-color-primary">{proto.name}</td>
                                    <td>{proto.range}</td>
                                    <td>{proto.batteryImpact}</td>
                                    <td>{proto.hubRequired ? 'Hub or bridge' : 'Direct or controller-led'}</td>
                                    <td>
                                        <Link href={bestPageLink.href} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                                            {bestPageLink.label}
                                        </Link>
                                    </td>
                                </tr>
                                {alternativeProtocols.map(item => (
                                    <tr key={item.slug}>
                                        <td className="font-medium text-color-primary">{item.name}</td>
                                        <td>{item.range}</td>
                                        <td>{item.batteryImpact}</td>
                                        <td>{item.hub}</td>
                                        <td>
                                            <Link href={`/protocols/${item.slug}`} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                                                View guide
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="comparison-card-grid">
                        {[{
                            protocol: proto.name,
                            range: proto.range,
                            batteryImpact: proto.batteryImpact,
                            hub: proto.hubRequired ? 'Hub or bridge' : 'Direct or controller-led',
                            href: bestPageLink.href,
                            label: bestPageLink.label,
                        }, ...alternativeProtocols.map((item) => ({
                            protocol: item.name,
                            range: item.range,
                            batteryImpact: item.batteryImpact,
                            hub: item.hub,
                            href: `/protocols/${item.slug}`,
                            label: 'View guide',
                        }))].map((item) => (
                            <div key={item.protocol} className="comparison-card">
                                <div className="comparison-card__title">{item.protocol}</div>
                                <div className="comparison-card__rows">
                                    <div className="comparison-card__row">
                                        <span className="comparison-card__label">Range</span>
                                        <span className="comparison-card__value">{item.range}</span>
                                    </div>
                                    <div className="comparison-card__row">
                                        <span className="comparison-card__label">Battery</span>
                                        <span className="comparison-card__value">{item.batteryImpact}</span>
                                    </div>
                                    <div className="comparison-card__row">
                                        <span className="comparison-card__label">Hub</span>
                                        <span className="comparison-card__value">{item.hub}</span>
                                    </div>
                                </div>
                                <Link href={item.href} style={{ color: 'var(--color-accent)', fontWeight: 600, marginTop: 'var(--space-sm)' }}>
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="mobile-action-bar">
                    <div className="mobile-action-bar__inner">
                        <Link href="/calculators/protocol-wizard" className="btn btn-primary">Protocol Wizard</Link>
                        <Link href="/calculators/rf-coverage" className="btn btn-secondary">RF Coverage</Link>
                    </div>
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="card">
                        <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-md)', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
                            Advantages
                        </h3>
                        <ul className="space-y-2">
                            {proto.pros.map(pro => (
                                <li key={pro} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    <span style={{ color: 'var(--color-success)', marginTop: '2px', flexShrink: 0 }}>✓</span>
                                    {pro}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card">
                        <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-md)', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
                            Limitations
                        </h3>
                        <ul className="space-y-2">
                            {proto.cons.map(con => (
                                <li key={con} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    <span style={{ color: 'var(--color-danger)', marginTop: '2px', flexShrink: 0 }}>✕</span>
                                    {con}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Best For */}
                <div className="card" style={{ marginBottom: 'var(--space-3xl)', background: 'var(--color-bg-alt)' }}>
                    <h2 className="section-title">Best Use Cases</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {proto.bestFor.map(use => (
                            <div key={use} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                <Shield className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                                {use}
                            </div>
                        ))}
                    </div>
                </div>

                <section style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="flex items-center justify-between gap-4" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>Best Next Steps for {proto.name}</h2>
                        <Link href={bestPageLink.href} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                            {bestPageLink.label}
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href={bestPageLink.href} className="link-card">
                            <h3 className="link-card__title">{bestPageLink.label}</h3>
                            <p className="link-card__desc">Move from protocol research into an actual product shortlist for this transport path.</p>
                        </Link>
                        <Link href="/brands" className="link-card">
                            <h3 className="link-card__title">Browse All Brands</h3>
                            <p className="link-card__desc">Compare lock ecosystems, app behavior, and door-format coverage before narrowing to one protocol.</p>
                        </Link>
                        {readingList.slice(0, 2).map((item) => (
                            <Link key={item.href} href={item.href} className="link-card">
                                <h3 className="link-card__title">{item.title}</h3>
                                <p className="link-card__desc">{item.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Deployment Checklist</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {checklist.map((item) => (
                            <div key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                <span style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0 }}>•</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Signal, Battery, Protocol Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {planningLinks.map(link => (
                            <Link key={link.href} href={link.href} className="link-card">
                                <h3 className="link-card__title">{link.label}</h3>
                                <p className="link-card__desc">{link.detail}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                {readingList.length > 0 && (
                    <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
                        <h2 className="section-title">Deeper Reading</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {readingList.map((item) => (
                                <Link key={item.href} href={item.href} className="link-card">
                                    <h3 className="link-card__title">{item.title}</h3>
                                    <p className="link-card__desc">{item.description}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* FAQ */}
                <div className="card" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {proto.faqs.map((faq, i) => (
                            <div key={i}>
                                <h3 style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)', fontSize: '1rem' }}>
                                    {faq.question}
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="cta-section">
                    <h2 className="cta-section__title">Plan Your {proto.name} Setup</h2>
                    <p className="cta-section__subtitle">
                        Use our calculators to plan your smart lock installation
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/calculators/protocol-wizard" className="btn btn-primary btn-lg">
                            Protocol Wizard <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/calculators/rf-coverage" className="btn btn-secondary btn-lg">
                            RF Coverage Calculator
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

function ScorecardStat({ label, value, detail }: { label: string; value: string; detail: string }) {
    return (
        <div className="card" style={{ background: 'var(--color-bg-alt)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>{label}</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>{value}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{detail}</div>
        </div>
    )
}
