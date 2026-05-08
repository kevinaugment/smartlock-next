import Link from 'next/link'

type PathwayTopic = 'compatibility' | 'homekit' | 'installation' | 'signal' | 'comparison' | 'product'

interface SeoPathwaysProps {
    topic: PathwayTopic
    title?: string
}

const PATHWAYS: Record<PathwayTopic, Array<{ href: string; title: string; description: string }>> = {
    compatibility: [
        { href: '/calculators/compatibility', title: 'Door Compatibility Checker', description: 'Validate thickness, backset, bore size, and lock type before buying.' },
        { href: '/calculators/installation-cost', title: 'Installation Cost Calculator', description: 'Estimate drilling, locksmith, and modification costs.' },
        { href: '/best/matter-smart-locks', title: 'Best Matter Smart Locks', description: 'Compare future-proof models after confirming door fit.' },
    ],
    homekit: [
        { href: '/best/homekit-smart-locks', title: 'Best HomeKit Smart Locks', description: 'Compare Apple Home-compatible locks and Matter options.' },
        { href: '/best/matter-smart-locks', title: 'Best Matter Smart Locks', description: 'Find locks that work across Apple, Google, Alexa, and SmartThings.' },
        { href: '/calculators/protocol-wizard', title: 'Protocol Selection Wizard', description: 'Decide between HomeKit, Matter, Thread, Wi-Fi, and Z-Wave.' },
    ],
    installation: [
        { href: '/articles/guides/door-compatibility-guide', title: 'Door Compatibility Guide', description: 'Check dimensions and door type before installation.' },
        { href: '/calculators/compatibility', title: 'Compatibility Checker', description: 'Get a quick pass/fail fit assessment.' },
        { href: '/calculators/lock-tco', title: 'Total Cost Calculator', description: 'Model hardware, labor, batteries, subscriptions, and lifecycle cost.' },
    ],
    signal: [
        { href: '/calculators/protocol-wizard', title: 'Protocol Selection Wizard', description: 'Choose a protocol based on range, battery, hubs, and ecosystem.' },
        { href: '/best/z-wave-smart-locks', title: 'Best Z-Wave Smart Locks', description: 'Prioritize sub-GHz range and better wall penetration.' },
        { href: '/articles/protocols/zigbee-vs-zwave-comparison', title: 'Zigbee vs Z-Wave', description: 'Understand range, interference, and mesh tradeoffs.' },
    ],
    comparison: [
        { href: '/best/homekit-smart-locks', title: 'Best HomeKit Smart Locks', description: 'Shortlist Apple-compatible options after comparing brands.' },
        { href: '/best/matter-smart-locks', title: 'Best Matter Smart Locks', description: 'Compare cross-platform options for long-term compatibility.' },
        { href: '/calculators/lock-tco', title: 'Total Cost Calculator', description: 'Compare brand choices by total ownership cost, not sticker price.' },
    ],
    product: [
        { href: '/calculators/compatibility', title: 'Check Door Fit', description: 'Confirm this lock matches your door dimensions.' },
        { href: '/calculators/battery-life', title: 'Estimate Battery Life', description: 'Model replacement intervals by protocol and usage.' },
        { href: '/calculators/signal-strength', title: 'Check Signal Strength', description: 'Verify range and wall penetration before installation.' },
    ],
}

export function SeoPathways({ topic, title = 'Recommended Next Steps' }: SeoPathwaysProps) {
    const links = PATHWAYS[topic]

    return (
        <section className="content-card" style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="section-title">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {links.map((link) => (
                    <Link key={link.href} href={link.href} className="link-card">
                        <h3 className="link-card__title">{link.title}</h3>
                        <p className="link-card__desc">{link.description}</p>
                        <span style={{ display: 'inline-block', marginTop: 'var(--space-sm)', color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 600 }}>
                            Open →
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    )
}
