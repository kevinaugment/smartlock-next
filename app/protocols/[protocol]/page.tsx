import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Radio, ArrowRight, Star, Shield, Battery, DollarSign, Fingerprint } from 'lucide-react'
import { ProductModel, type ProductWithBrand } from '@/lib/db/brand-models'
import StarRating from '@/components/brands/StarRating'

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
        description: 'Z-Wave operates on the 908 MHz frequency band (in the US), keeping it completely separate from crowded 2.4 GHz Wi-Fi networks. This dedicated frequency provides superior reliability and range for smart lock installations, making it the professional\'s choice for whole-home automation.',
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
    if (!proto) return { title: 'Protocol Not Found — SLockHub.com' }

    const title = `${proto.name} Smart Locks: Compatible Products & Guide 2026 — SLockHub.com`
    const description = `Browse all ${proto.name}-compatible smart locks. ${proto.description.slice(0, 120)}...`

    return {
        title,
        description,
        alternates: { canonical: `/protocols/${protocol}` },
        openGraph: { title, description, siteName: 'SLockHub.com', type: 'website' },
    }
}

export function generateStaticParams() {
    return Object.keys(protocolData).map(protocol => ({ protocol }))
}

// ============================================
// 页面组件
// ============================================

export default async function ProtocolDetailPage({ params }: { params: Promise<{ protocol: string }> }) {
    const { protocol } = await params
    const proto = protocolData[protocol]

    if (!proto) notFound()

    // 从数据库获取该协议的产品
    let products: ProductWithBrand[] = []
    try {
        const allProducts = await ProductModel.getAll(200, 0)
        products = allProducts.filter(p =>
            p.protocol?.toLowerCase() === protocol.replace('-', '') ||
            p.protocol?.toLowerCase() === protocol ||
            p.secondary_protocol?.toLowerCase() === protocol.replace('-', '') ||
            p.secondary_protocol?.toLowerCase() === protocol
        )
    } catch {
        // 数据库不可用时优雅降级
    }

    return (
        <div className="page-wrapper-alt">
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

                {/* Technical Specs */}
                <div style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Technical Specifications</h2>
                    <div className="card overflow-hidden p-0">
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
                    <h2 className="section-title">Best For</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {proto.bestFor.map(use => (
                            <div key={use} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                <Shield className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                                {use}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compatible Products */}
                <div style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">
                        Compatible Smart Locks {products.length > 0 && `(${products.length})`}
                    </h2>
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <Link
                                    key={product.slug}
                                    href={`/brands/${product.brand_slug}/${product.slug}`}
                                    className="card"
                                    style={{ textDecoration: 'none', padding: 'var(--space-md)' }}
                                >
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                                        {product.brand_name}
                                    </div>
                                    <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>
                                        {product.name}
                                    </div>
                                    <div className="flex flex-wrap gap-2" style={{ marginBottom: 'var(--space-sm)' }}>
                                        {product.price_usd && (
                                            <span style={{
                                                padding: '2px 6px',
                                                background: 'var(--color-bg-alt)',
                                                borderRadius: 'var(--radius-sm)',
                                                fontSize: '0.7rem',
                                            }}>
                                                <DollarSign className="w-3 h-3 inline" />${product.price_usd}
                                            </span>
                                        )}
                                        {product.battery_life_months && (
                                            <span style={{
                                                padding: '2px 6px',
                                                background: 'var(--color-bg-alt)',
                                                borderRadius: 'var(--radius-sm)',
                                                fontSize: '0.7rem',
                                            }}>
                                                <Battery className="w-3 h-3 inline" /> {product.battery_life_months}mo
                                            </span>
                                        )}
                                        {product.has_fingerprint && (
                                            <span style={{
                                                padding: '2px 6px',
                                                background: 'var(--color-bg-alt)',
                                                borderRadius: 'var(--radius-sm)',
                                                fontSize: '0.7rem',
                                            }}>
                                                <Fingerprint className="w-3 h-3 inline" /> FP
                                            </span>
                                        )}
                                    </div>
                                    <StarRating productId={product.id} size="sm" />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
                                We&apos;re building our {proto.name} product database. Check back soon for compatible locks!
                            </p>
                            <Link href="/brands" className="btn btn-secondary">
                                Browse All Brands
                            </Link>
                        </div>
                    )}
                </div>

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
                    <h2 className="cta-section__title">Calculate Your {proto.name} Setup</h2>
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

                {/* FAQ Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'FAQPage',
                            mainEntity: proto.faqs.map(faq => ({
                                '@type': 'Question',
                                name: faq.question,
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: faq.answer,
                                },
                            })),
                        }),
                    }}
                />
            </div>
        </div>
    )
}
