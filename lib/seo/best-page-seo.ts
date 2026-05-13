const CURRENT_YEAR = '2026'

export interface CommercialIntentBlock {
    label: 'Best for' | 'Avoid if' | 'Decision factor' | 'Evidence needed'
    detail: string
}

export interface CalculatorPathway {
    href: string
    label: string
    detail: string
}

export interface BestPageSeoProfile {
    title: string
    description: string
    h1: string
    intro: string
    methodology: string[]
    intentSignals: Array<{ label: string; detail: string }>
    commercialIntent: CommercialIntentBlock[]
    calculatorPathways: CalculatorPathway[]
}

const protocolCalculatorPathways: CalculatorPathway[] = [
    { href: '/calculators/protocol-wizard', label: 'Protocol wizard', detail: 'Choose Wi-Fi, Z-Wave, Zigbee, Thread, Bluetooth, or Matter based on your home and maintenance target.' },
    { href: '/calculators/signal-strength', label: 'Signal strength calculator', detail: 'Check whether the radio path has enough range and wall margin before buying.' },
    { href: '/calculators/battery-life', label: 'Battery life calculator', detail: 'Estimate how protocol choice and usage affect replacement intervals.' },
]

const rentalCalculatorPathways: CalculatorPathway[] = [
    { href: '/calculators/guest-code', label: 'Guest code planner', detail: 'Plan PIN capacity for guests, cleaners, vendors, and emergency users.' },
    { href: '/calculators/lock-tco', label: 'Lock TCO calculator', detail: 'Compare hardware, battery, subscription, installation, and support cost across the ownership period.' },
    { href: '/calculators/compatibility', label: 'Door compatibility checker', detail: 'Confirm door thickness, bore, backset, material, and install risk before ordering.' },
]

const profiles: Record<string, BestPageSeoProfile> = {
    'matter-smart-locks': {
        title: `Best Matter Smart Locks ${CURRENT_YEAR}: Thread, Wi-Fi & HomeKit Picks`,
        description: 'Compare Matter smart locks by Thread vs Wi-Fi setup, Apple Home, Google Home, Alexa, SmartThings, battery life, door fit, and fallback access.',
        h1: `Best Matter Smart Locks ${CURRENT_YEAR}: Thread, Wi-Fi & Cross-Platform Picks`,
        intro: 'Matter smart lock buyers need more than a badge on the box. Compare which models use Thread or Wi-Fi, which ecosystems they can join, how battery life changes by transport, and whether keypad or key backup still covers lockouts.',
        methodology: [
            'We first separate Matter support from the transport layer, because Matter-over-Thread and Matter-over-Wi-Fi create different hub, range, and battery requirements.',
            'Models with clearer fallback access, door-fit data, battery evidence, and cross-platform ecosystem support rank ahead of thin Matter mentions.',
            'This shortlist is built for buyers comparing Apple Home, Google Home, Alexa, SmartThings, and mixed-household support before choosing a lock.',
        ],
        intentSignals: [
            { label: 'Matter transport', detail: 'Thread and Wi-Fi Matter locks are evaluated separately because setup, border-router needs, and battery drain differ.' },
            { label: 'Ecosystem sharing', detail: 'Multi-admin support matters when the same lock must work across Apple, Google, Alexa, or SmartThings homes.' },
            { label: 'Fallback access', detail: 'Keypad, physical key, and local credentials protect the door when smart-home control or cloud access fails.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Mixed Apple Home, Google Home, Alexa, or SmartThings households that want cross-platform control.' },
            { label: 'Avoid if', detail: 'You need guaranteed advanced guest-code automation in every ecosystem before checking the exact lock and platform.' },
            { label: 'Decision factor', detail: 'Separate Matter support from the transport layer: Thread and Wi-Fi have different hub, range, and battery tradeoffs.' },
            { label: 'Evidence needed', detail: 'Confirm the exact Matter version, Thread or Wi-Fi transport, border-router requirement, keypad support, and backup entry path.' },
        ],
        calculatorPathways: protocolCalculatorPathways,
    },
    'smart-locks-for-airbnb': {
        title: `Best Smart Locks for Airbnb ${CURRENT_YEAR}: Guest Codes, PMS & Backup Access`,
        description: 'Compare Airbnb smart locks by guest-code scheduling, remote access, auto-lock, battery alerts, backup entry, PMS fit, and host maintenance cost.',
        h1: `Best Smart Locks for Airbnb & Vacation Rentals ${CURRENT_YEAR}`,
        intro: 'Airbnb and vacation-rental locks should be chosen around guest-code workflow, battery maintenance, backup access, cleaner codes, and remote support. The best model is the one that reduces check-in failures, not just the one with the highest app rating.',
        methodology: [
            'We prioritize locks with time-limited guest codes, remote management, auto-lock, battery alerts, and clear backup-entry options.',
            'Battery life, keypad reliability, door fit, and protocol support are weighted as host operations signals because one lockout can erase the savings from a cheaper lock.',
            'The ranking favors models that make sense for single-unit hosts and small portfolios before moving to PMS or access-control integrations.',
        ],
        intentSignals: [
            { label: 'Guest-code workflow', detail: 'Scheduled PINs, cleaner codes, and easy code deletion matter more than novelty features for short-term rentals.' },
            { label: 'Backup access', detail: 'Physical key, 9V jump-start, or emergency entry planning reduces guest lockout risk.' },
            { label: 'Host maintenance', detail: 'Battery alerts, protocol choice, and remote troubleshooting determine how often the host must visit the property.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Hosts who need reliable guest PINs, cleaner access, low-battery planning, and remote troubleshooting.' },
            { label: 'Avoid if', detail: 'Guests must install an app, pair Bluetooth, or depend on a phone-only unlock path to enter the listing.' },
            { label: 'Decision factor', detail: 'The winning lock is the one that reduces failed check-ins and support calls, not just the one with the most app features.' },
            { label: 'Evidence needed', detail: 'Verify guest-code scheduling, code expiration, backup access, battery alerts, and PMS or channel-manager fit before standardizing.' },
        ],
        calculatorPathways: rentalCalculatorPathways,
    },
    'smart-locks-with-longest-battery-life': {
        title: `Smart Locks with the Longest Battery Life ${CURRENT_YEAR}: 12+ Month Picks`,
        description: 'Rank smart locks by battery life, protocol efficiency, Schlage/Yale/Kwikset battery expectations, Wi-Fi drain risk, and replacement planning.',
        h1: `Smart Locks with the Longest Battery Life ${CURRENT_YEAR}`,
        intro: 'Battery life depends on protocol, signal quality, motor load, weather, and daily unlock volume. This page ranks long-life smart locks and shows why Z-Wave, Zigbee, Thread, Bluetooth, and Wi-Fi models behave differently in real doors.',
        methodology: [
            'We treat listed battery-life months as the main ranking signal, then check protocol, standby power, active power, and missing-data risk.',
            'Models with low-power mesh or local radios receive stronger battery-planning confidence than direct Wi-Fi models with similar ratings.',
            'The shortlist is designed for homeowners, rental hosts, and property managers who want fewer battery visits and fewer dead-lock incidents.',
        ],
        intentSignals: [
            { label: 'Protocol efficiency', detail: 'Z-Wave, Zigbee, Thread, Bluetooth, and Wi-Fi locks draw power differently even with similar batteries.' },
            { label: 'Signal quality', detail: 'Weak Wi-Fi or mesh placement can shorten battery life through retries and reconnects.' },
            { label: 'Replacement planning', detail: 'Longer battery life matters most for rentals, second homes, and any door that is hard to service quickly.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Remote properties, rentals, second homes, and high-traffic doors where battery visits are costly.' },
            { label: 'Avoid if', detail: 'You want direct Wi-Fi convenience and are comfortable replacing batteries more often.' },
            { label: 'Decision factor', detail: 'Battery life is controlled by protocol, signal quality, motor load, weather, and daily unlock volume.' },
            { label: 'Evidence needed', detail: 'Check listed battery months, protocol, battery chemistry, signal margin, door alignment, and whether Wi-Fi keep-alive is required.' },
        ],
        calculatorPathways: [
            { href: '/calculators/battery-life', label: 'Battery life calculator', detail: 'Model replacement intervals by protocol, battery type, usage, temperature, and features.' },
            { href: '/calculators/signal-strength', label: 'Signal strength calculator', detail: 'Find weak radio paths that can shorten battery life through retries.' },
            { href: '/calculators/lock-tco', label: 'Lock TCO calculator', detail: 'Translate battery visits and replacement cycles into ownership cost.' },
        ],
    },
    'z-wave-smart-locks': {
        title: `Best Z-Wave Smart Locks ${CURRENT_YEAR}: Range, Hubs & Battery Picks`,
        description: 'Compare Z-Wave smart locks by hub compatibility, sub-GHz range, battery life, door fit, security grade, repeater needs, and rental readiness.',
        h1: `Best Z-Wave Smart Locks ${CURRENT_YEAR}: Range-First Picks`,
        intro: 'Z-Wave smart locks are strongest when range, battery life, and hub-managed reliability matter more than direct Wi-Fi convenience. Compare models by hub fit, repeater planning, door compatibility, and battery evidence.',
        methodology: [
            'We prioritize Z-Wave models with clear hub compatibility, battery-life data, door-fit specs, and security-grade signals.',
            'Range and mesh reliability are treated as buying criteria because sub-GHz performance is the main reason to choose Z-Wave.',
            'The shortlist favors homes, apartments, and rentals where dependable local automation matters more than avoiding a hub.',
        ],
        intentSignals: [
            { label: 'Hub fit', detail: 'Z-Wave locks need a compatible hub or controller, so ecosystem fit is the first filter.' },
            { label: 'Range margin', detail: 'Sub-GHz range helps through walls, but repeaters and placement still decide reliability.' },
            { label: 'Battery planning', detail: 'Z-Wave can reduce battery visits compared with Wi-Fi when the mesh is healthy.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Homes, apartments, rentals, and portfolios that already use a Z-Wave hub or want sub-GHz reliability.' },
            { label: 'Avoid if', detail: 'You do not want to maintain a hub, repeater plan, or Z-Wave controller.' },
            { label: 'Decision factor', detail: 'The best Z-Wave lock is the one that fits your hub and door while keeping enough signal margin at the installed location.' },
            { label: 'Evidence needed', detail: 'Confirm Z-Wave generation, security class, hub compatibility, signal path, battery estimate, and door-prep dimensions.' },
        ],
        calculatorPathways: protocolCalculatorPathways,
    },
    'best-z-wave-smart-locks': {
        title: `Best Z-Wave Smart Locks ${CURRENT_YEAR}: Range, Hubs & Battery Picks`,
        description: 'Compare Z-Wave smart locks by hub compatibility, sub-GHz range, battery life, door fit, security grade, repeater needs, and rental readiness.',
        h1: `Best Z-Wave Smart Locks ${CURRENT_YEAR}: Range-First Picks`,
        intro: 'Z-Wave smart lock buyers should compare hub compatibility, signal margin, repeater planning, door fit, and battery evidence before choosing a model.',
        methodology: [
            'We prioritize Z-Wave models with clear hub compatibility, battery-life data, door-fit specs, and security-grade signals.',
            'Range and mesh reliability are treated as buying criteria because sub-GHz performance is the main reason to choose Z-Wave.',
            'The shortlist favors homes, apartments, and rentals where dependable local automation matters more than avoiding a hub.',
        ],
        intentSignals: [
            { label: 'Hub fit', detail: 'Z-Wave locks need a compatible hub or controller, so ecosystem fit is the first filter.' },
            { label: 'Range margin', detail: 'Sub-GHz range helps through walls, but repeaters and placement still decide reliability.' },
            { label: 'Battery planning', detail: 'Z-Wave can reduce battery visits compared with Wi-Fi when the mesh is healthy.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Homes, apartments, rentals, and portfolios that already use a Z-Wave hub or want sub-GHz reliability.' },
            { label: 'Avoid if', detail: 'You do not want to maintain a hub, repeater plan, or Z-Wave controller.' },
            { label: 'Decision factor', detail: 'The best Z-Wave lock is the one that fits your hub and door while keeping enough signal margin at the installed location.' },
            { label: 'Evidence needed', detail: 'Confirm Z-Wave generation, security class, hub compatibility, signal path, battery estimate, and door-prep dimensions.' },
        ],
        calculatorPathways: protocolCalculatorPathways,
    },
    'renter-friendly-smart-locks': {
        title: `Best Renter-Friendly Smart Locks ${CURRENT_YEAR}: No-Drill & Retrofit Picks`,
        description: 'Compare renter-friendly smart locks by no-drill retrofit fit, lease risk, exterior keyway preservation, keypad options, battery life, and move-out restoration.',
        h1: `Best Renter-Friendly Smart Locks ${CURRENT_YEAR}: No-Drill Retrofit Picks`,
        intro: 'Renter-friendly smart locks should improve daily access without creating lease, key-control, or move-out problems. Prioritize reversible retrofit fit, landlord key access, door compatibility, and backup entry.',
        methodology: [
            'We favor interior retrofit and no-drill options that preserve the exterior keyway and can be removed at move-out.',
            'Door-fit risk, backup access, battery maintenance, and keypad availability are weighted ahead of advanced automation claims.',
            'The shortlist is designed for apartment renters, roommates, and approved landlord upgrades where reversibility matters.',
        ],
        intentSignals: [
            { label: 'Reversibility', detail: 'No-drill installation and original hardware preservation reduce lease and deposit risk.' },
            { label: 'Door compatibility', detail: 'Apartment mortise, interconnected, and non-standard doors often block common consumer locks.' },
            { label: 'Backup access', detail: 'Renters need a physical or approved fallback path that does not remove landlord emergency access.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Renters who want app or keypad convenience while keeping the door easy to restore.' },
            { label: 'Avoid if', detail: 'The lock requires drilling, exterior hardware changes, keyway replacement, or lease approval you do not have.' },
            { label: 'Decision factor', detail: 'Reversibility and door fit matter more than automation depth for renter-owned hardware.' },
            { label: 'Evidence needed', detail: 'Check lease terms, deadbolt shape, interior clearance, exterior key access, battery replacement, and move-out reset steps.' },
        ],
        calculatorPathways: [
            { href: '/calculators/compatibility', label: 'Door compatibility checker', detail: 'Confirm whether the existing apartment hardware can accept a retrofit or replacement lock.' },
            { href: '/calculators/installation-cost', label: 'Installation cost calculator', detail: 'Estimate labor and modification risk when landlord-approved installation is required.' },
            { href: '/calculators/battery-life', label: 'Battery life calculator', detail: 'Plan replacement intervals for a lock you may need to maintain yourself.' },
        ],
    },
}

profiles['best-smart-locks-for-airbnb'] = profiles['smart-locks-for-airbnb']
profiles['renter-friendly-smart-locks-no-drill-apartments'] = profiles['renter-friendly-smart-locks']

export function getBestPageSeoProfile(slug: string): BestPageSeoProfile | null {
    return profiles[slug] || null
}

export function getBestPageCommercialIntent(slug: string): CommercialIntentBlock[] {
    return profiles[slug]?.commercialIntent || [
        { label: 'Best for', detail: 'Buyers who need a shortlist that balances protocol, battery life, security, access features, price, and door fit.' },
        { label: 'Avoid if', detail: 'The exact model lacks enough battery, protocol, door-fit, or security data to support a confident purchase.' },
        { label: 'Decision factor', detail: 'Choose the lock that fits the door and workflow first; ratings and price are tie-breakers after compatibility.' },
        { label: 'Evidence needed', detail: 'Confirm price, battery-life estimate, protocol support, ANSI/BHMA or security signals, and installation requirements before buying.' },
    ]
}

export function getBestPageCalculatorPathways(slug: string): CalculatorPathway[] {
    return profiles[slug]?.calculatorPathways || [
        { href: '/calculators/compatibility', label: 'Door compatibility checker', detail: 'Validate door measurements and installation risk before buying.' },
        { href: '/calculators/battery-life', label: 'Battery life calculator', detail: 'Estimate replacement intervals for your protocol, usage, and environment.' },
        { href: '/calculators/lock-tco', label: 'Lock TCO calculator', detail: 'Compare hardware, batteries, subscriptions, hubs, and maintenance over time.' },
    ]
}
