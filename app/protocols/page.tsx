import type { Metadata } from 'next'
import Link from 'next/link'
import { Wifi, Radio, Bluetooth, Cpu, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Smart Lock Protocols — Compatibility & Product Matrix — SLockHub.com',
    description: 'Browse smart lock products by communication protocol. Z-Wave, Zigbee, Wi-Fi, Bluetooth, Thread, and Matter compatibility guides.',
    alternates: { canonical: '/protocols' },
    openGraph: {
        title: 'Smart Lock Protocols — SLockHub.com',
        description: 'Browse smart lock products by communication protocol.',
        siteName: 'SLockHub.com',
        type: 'website',
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

export default function ProtocolsPage() {
    return (
        <div className="page-wrapper-alt">
            <div className="container-main section">
                {/* Header */}
                <div className="page-header">
                    <div className="page-header__icon">
                        <Radio className="w-10 h-10" />
                    </div>
                    <h1 className="page-header__title">Smart Lock Protocols</h1>
                    <p className="page-header__subtitle">
                        Browse compatible smart locks by communication protocol. Find the right technology for your home or business.
                    </p>
                </div>

                {/* Protocol Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginBottom: 'var(--space-3xl)' }}>
                    {protocols.map((proto) => {
                        const Icon = proto.icon
                        return (
                            <Link
                                key={proto.slug}
                                href={`/protocols/${proto.slug}`}
                                className="card"
                                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}
                            >
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

                {/* CTA */}
                <div className="cta-section">
                    <h2 className="cta-section__title">Not Sure Which Protocol?</h2>
                    <p className="cta-section__subtitle">
                        Use our Protocol Selection Wizard for a personalized recommendation
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/calculators/protocol-wizard" className="btn btn-primary btn-lg">
                            Try Protocol Wizard <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/compare" className="btn btn-secondary btn-lg">
                            Protocol Comparison Table
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
