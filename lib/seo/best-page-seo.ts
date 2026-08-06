const CURRENT_YEAR = '2026'
const BEST_PAGE_LAST_REVIEWED = 'August 2026'

export interface CommercialIntentBlock {
    label: 'Best for' | 'Avoid if' | 'Decision factor' | 'Evidence needed'
    detail: string
}

export interface CalculatorPathway {
    href: string
    label: string
    detail: string
}

export interface BestPageFaq {
    question: string
    answer: string
}

export interface BestPageEvidence {
    lastVerified: string
    inclusionRule: string
    exclusionRule: string
    sourceBoundary: string
    dataLimitations: string
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
    faqs?: BestPageFaq[]
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

const accessCalculatorPathways: CalculatorPathway[] = [
    { href: '/calculators/credential-planner', label: 'Credential planner', detail: 'Estimate PIN, RFID, NFC, fingerprint, and backup credential needs before choosing an access style.' },
    { href: '/calculators/access-capacity', label: 'Access capacity calculator', detail: 'Check whether a lock can hold enough users, family members, staff, guests, or temporary codes.' },
    { href: '/calculators/compatibility', label: 'Door compatibility checker', detail: 'Validate door prep and hardware fit before prioritizing keypad, fingerprint, or auto-unlock features.' },
]

const priceCalculatorPathways: CalculatorPathway[] = [
    { href: '/calculators/lock-tco', label: 'Lock TCO calculator', detail: 'Compare hardware price with batteries, hubs, subscriptions, installation, and maintenance cost.' },
    { href: '/calculators/installation-cost', label: 'Installation cost calculator', detail: 'Estimate labor, drilling, adapter, and locksmith assumptions before judging value.' },
    { href: '/calculators/battery-life', label: 'Battery life calculator', detail: 'Convert protocol and usage assumptions into replacement intervals and maintenance burden.' },
]

const securityCalculatorPathways: CalculatorPathway[] = [
    { href: '/calculators/security-compliance', label: 'Security compliance checker', detail: 'Map ANSI/BHMA grade, UL listing, encryption, and access-control needs to the door use case.' },
    { href: '/calculators/pin-strength', label: 'PIN strength checker', detail: 'Check whether keypad rules and code length reduce shared-code and guessability risk.' },
    { href: '/calculators/emergency-backup', label: 'Emergency backup planner', detail: 'Plan physical key, emergency power, or manager override before relying on smart access.' },
]

function getCategoryName(profile: BestPageSeoProfile): string {
    return profile.h1
        .replace(new RegExp(`\\s*${CURRENT_YEAR}.*$`), '')
        .replace(/^Best\s+/, '')
        .trim()
}

function buildProfileFaqs(profile: BestPageSeoProfile): BestPageFaq[] {
    const category = getCategoryName(profile)
    const bestFor = profile.commercialIntent.find((block) => block.label === 'Best for')?.detail
    const avoidIf = profile.commercialIntent.find((block) => block.label === 'Avoid if')?.detail
    const decisionFactor = profile.commercialIntent.find((block) => block.label === 'Decision factor')?.detail
    const evidenceNeeded = profile.commercialIntent.find((block) => block.label === 'Evidence needed')?.detail
    const firstTool = profile.calculatorPathways[0]

    return [
        {
            question: `Who are ${category} best for?`,
            answer: bestFor || 'They are best for buyers whose door, protocol, access workflow, and maintenance target match the ranking criteria on this page.',
        },
        {
            question: `When should I avoid ${category}?`,
            answer: avoidIf || 'Avoid this shortlist when the door, ecosystem, access method, or maintenance model does not match your installation constraints.',
        },
        {
            question: `What should I verify before buying ${category}?`,
            answer: evidenceNeeded || 'Verify door fit, protocol support, battery estimate, security signals, access method, and backup entry before buying.',
        },
        {
            question: `Which SLockHub tool should I use first for ${category}?`,
            answer: firstTool ? `Start with the ${firstTool.label}. ${firstTool.detail}` : 'Start with the door compatibility checker, then validate protocol, battery life, and ownership cost.',
        },
        {
            question: `How does SLockHub rank ${category}?`,
            answer: `${profile.methodology[0]} ${decisionFactor || 'Final ranking depends on whether the lock matches the door, workflow, protocol, and evidence available in the dataset.'}`,
        },
    ]
}

const profiles: Record<string, BestPageSeoProfile> = {
    'smart-locks-2026': {
        title: `Best Smart Locks ${CURRENT_YEAR}: Tool-Checked Picks by Door, Protocol & Cost`,
        description: 'Compare smart locks by door compatibility, protocol, battery life, access method, security signals, price, and tool-backed ownership tradeoffs.',
        h1: `Best Smart Locks ${CURRENT_YEAR}: Tool-Checked Door, Protocol & Cost Picks`,
        intro: 'A best smart lock shortlist should start with the door and workflow, not only the brand name. Use this page to compare protocol fit, battery planning, security grade, access method, and total ownership cost before drilling into individual models.',
        methodology: [
            'We rank active catalog models by dataset fit, then check whether protocol, battery, security, price, and door-fit fields support a real buying comparison.',
            'Models with clearer specs, fallback access, and calculator-ready assumptions are treated as more decision-ready than products with thin marketing claims.',
            'This hub is designed as the broad entry point before narrowing into protocol, feature, price, rental, or security-specific pages.',
        ],
        intentSignals: [
            { label: 'Door fit first', detail: 'Bore, backset, thickness, and replacement style can eliminate a lock before brand preference matters.' },
            { label: 'Protocol tradeoff', detail: 'Wi-Fi, Z-Wave, Zigbee, Thread, Bluetooth, and Matter change hub needs, range, and battery planning.' },
            { label: 'Ownership cost', detail: 'Hardware price is only one signal; batteries, hubs, subscriptions, and installation can change the best value.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Buyers who want one decision hub before narrowing by protocol, access method, budget, rental use, or security requirement.' },
            { label: 'Avoid if', detail: 'You already know your exact protocol, door constraints, and access workflow and need a specialized shortlist instead.' },
            { label: 'Decision factor', detail: 'The strongest pick is the one that fits the door, works with the ecosystem, and keeps maintenance predictable.' },
            { label: 'Evidence needed', detail: 'Confirm door-prep dimensions, protocol support, listed battery life, security grade, price, and backup entry before buying.' },
        ],
        calculatorPathways: [
            { href: '/calculators/compatibility', label: 'Door compatibility checker', detail: 'Start with physical fit so incompatible locks do not enter the shortlist.' },
            { href: '/calculators/protocol-wizard', label: 'Protocol wizard', detail: 'Choose the radio and ecosystem path before comparing similar-looking models.' },
            { href: '/calculators/lock-tco', label: 'Lock TCO calculator', detail: 'Translate price, batteries, subscriptions, hubs, and installation into ownership cost.' },
        ],
    },
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
    'thread-smart-locks': {
        title: `Best Thread Smart Locks ${CURRENT_YEAR}: Matter, Border Routers & Battery Fit`,
        description: 'Compare Thread smart locks by Matter support, border-router needs, Apple Home and Google fit, mesh range, battery planning, and backup access.',
        h1: `Best Thread Smart Locks ${CURRENT_YEAR}: Matter-Ready Mesh Picks`,
        intro: 'Thread smart locks are most useful when Matter readiness, low-power mesh networking, and future ecosystem flexibility matter. The practical questions are whether the home has a border router, whether the exact model exposes the features you need, and whether the radio path is strong at the door.',
        methodology: [
            'We separate Thread transport from Matter control because a Thread radio still needs the right controller and feature support.',
            'Models with clearer border-router requirements, battery assumptions, fallback access, and ecosystem notes rank ahead of generic future-proof claims.',
            'This page is for buyers building a Matter-forward home who still need to validate range, door fit, and backup entry.',
        ],
        intentSignals: [
            { label: 'Border router', detail: 'Thread locks need a working border router and a compatible controller before smart features are reliable.' },
            { label: 'Matter feature limits', detail: 'Matter support may not expose every guest-code, log, schedule, or admin feature in every ecosystem.' },
            { label: 'Mesh placement', detail: 'Thread is low power, but walls, metal doors, and weak router placement can still cause retries.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Matter-forward homes with Apple, Google, or mixed ecosystems and a supported Thread border-router plan.' },
            { label: 'Avoid if', detail: 'You need mature hub workflows, known device support, or advanced rental-code management today.' },
            { label: 'Decision factor', detail: 'Thread is attractive only when controller ownership, feature exposure, signal path, and fallback access all work.' },
            { label: 'Evidence needed', detail: 'Check exact model Matter support, Thread transport, border-router compatibility, battery estimate, keypad support, and backup entry.' },
        ],
        calculatorPathways: protocolCalculatorPathways,
    },
    'homekit-smart-locks': {
        title: `Best HomeKit Smart Locks ${CURRENT_YEAR}: Apple Home, Home Key & Matter Checks`,
        description: 'Compare HomeKit smart locks by Apple Home Key, Matter or Thread support, Home Hub needs, keypad fallback, door fit, battery life, and rental limits.',
        h1: `Best HomeKit Smart Locks ${CURRENT_YEAR}: Apple Home & Home Key Picks`,
        intro: 'HomeKit smart locks should be evaluated by the exact Apple access path they support: Apple Home, Home Key, Matter, Thread, or a vendor bridge. The best Apple-friendly lock still needs a reliable keypad or physical fallback for guests, cleaners, and outages.',
        methodology: [
            'We separate general Apple Home compatibility from Apple Home Key, Matter, Thread, and vendor-app requirements.',
            'Models with clearer Home Hub needs, fallback access, door-fit data, and battery evidence rank ahead of broad Apple-friendly claims.',
            'This shortlist is designed for Apple-first homes, condos, and rentals where non-Apple backup access still matters.',
        ],
        intentSignals: [
            { label: 'Apple access path', detail: 'HomeKit, Home Key, Matter, and Thread are different buying filters with different setup requirements.' },
            { label: 'Home Hub requirement', detail: 'Remote control and automations may depend on a HomePod or Apple TV that stays online.' },
            { label: 'Guest fallback', detail: 'PIN, physical key, card, or manager-controlled access matters when visitors do not use Apple devices.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Apple-first households that want Apple Home control while keeping keypad or key fallback for non-Apple users.' },
            { label: 'Avoid if', detail: 'Guests, tenants, cleaners, or staff must rely on Apple Wallet or app setup just to enter.' },
            { label: 'Decision factor', detail: 'Choose based on the exact Apple feature you need, then validate fallback access and door compatibility.' },
            { label: 'Evidence needed', detail: 'Confirm HomeKit or Matter pairing path, Home Key support, Home Hub needs, keypad availability, battery estimate, and door fit.' },
        ],
        calculatorPathways: [
            { href: '/calculators/protocol-wizard', label: 'Protocol wizard', detail: 'Separate HomeKit, Matter, Thread, Wi-Fi, Bluetooth, and bridge-based setups before buying.' },
            { href: '/calculators/compatibility', label: 'Door compatibility checker', detail: 'Validate bore, backset, thickness, and retrofit fit for Apple-friendly locks.' },
            { href: '/calculators/guest-code', label: 'Guest code planner', detail: 'Plan non-Apple entry for guests, cleaners, family members, and emergency users.' },
        ],
    },
    'wifi-smart-locks': {
        title: `Best Wi-Fi Smart Locks ${CURRENT_YEAR}: No-Hub Remote Access & Battery Tradeoffs`,
        description: 'Compare Wi-Fi smart locks by no-hub setup, remote access, 2.4 GHz signal quality, battery drain, keypad fallback, door fit, and ownership cost.',
        h1: `Best Wi-Fi Smart Locks ${CURRENT_YEAR}: No-Hub Picks With Battery Checks`,
        intro: 'Wi-Fi smart locks are convenient because they can provide remote access without a separate hub, but that convenience changes battery and signal requirements. Compare Wi-Fi models only after checking 2.4 GHz coverage, door placement, and fallback entry.',
        methodology: [
            'We prioritize Wi-Fi locks with clear remote-access behavior, battery expectations, keypad or key fallback, and 2.4 GHz setup requirements.',
            'Signal risk is treated as a ranking factor because weak Wi-Fi can shorten battery life and create offline lock support issues.',
            'This shortlist is for buyers who value no-hub convenience but still want realistic maintenance and signal planning.',
        ],
        intentSignals: [
            { label: 'No hub setup', detail: 'Direct Wi-Fi can simplify remote access for one door, but router quality becomes part of the lock system.' },
            { label: 'Battery drain', detail: 'Wi-Fi locks usually need more frequent battery planning than low-power mesh protocols.' },
            { label: '2.4 GHz coverage', detail: 'Most smart locks use 2.4 GHz Wi-Fi, so band steering, walls, and router placement matter.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Single-door homes, nearby rentals, and users who want remote access without maintaining a separate hub.' },
            { label: 'Avoid if', detail: 'The door has weak 2.4 GHz coverage or battery visits are expensive and hard to schedule.' },
            { label: 'Decision factor', detail: 'The best Wi-Fi lock is the one with enough signal margin and a realistic battery replacement plan.' },
            { label: 'Evidence needed', detail: 'Check 2.4 GHz signal strength, listed battery months, remote-access behavior, keypad fallback, and router placement before buying.' },
        ],
        calculatorPathways: [
            { href: '/calculators/signal-strength', label: 'Signal strength calculator', detail: 'Check whether the installed door has enough Wi-Fi margin for reliable operation.' },
            { href: '/calculators/battery-life', label: 'Battery life calculator', detail: 'Model Wi-Fi battery replacement intervals with your daily usage and temperature assumptions.' },
            { href: '/calculators/lock-tco', label: 'Lock TCO calculator', detail: 'Include batteries, subscriptions, and support visits when comparing no-hub convenience.' },
        ],
    },
    'zigbee-smart-locks': {
        title: `Best Zigbee Smart Locks ${CURRENT_YEAR}: Hub Fit, Mesh Range & Battery Picks`,
        description: 'Compare Zigbee smart locks by hub support, repeater planning, 2.4 GHz mesh reliability, battery life, door fit, keypad access, and Matter alternatives.',
        h1: `Best Zigbee Smart Locks ${CURRENT_YEAR}: Mesh and Hub-Ready Picks`,
        intro: 'Zigbee smart locks can be strong choices when the home already has a supported hub and powered repeaters. The buying decision should focus on controller compatibility, mesh path quality, battery planning, and whether Thread or Matter would be a better future path.',
        methodology: [
            'We prioritize Zigbee models with clear hub support, battery data, door-fit fields, and access fallback information.',
            'Mesh quality is weighted because Zigbee locks depend on powered repeaters and a healthy 2.4 GHz route to the door.',
            'This page is for existing Zigbee homes, Home Assistant users, and buyers comparing Zigbee against Z-Wave or Thread.',
        ],
        intentSignals: [
            { label: 'Hub compatibility', detail: 'Zigbee lock support varies by controller, so exact hub fit is the first validation step.' },
            { label: 'Repeater route', detail: 'Battery locks usually do not repeat traffic, so powered nodes need to sit between hub and door.' },
            { label: '2.4 GHz environment', detail: 'Wi-Fi congestion, metal doors, appliances, and walls can affect Zigbee range.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Homes with an existing Zigbee hub, powered repeater network, and a need for low-power local control.' },
            { label: 'Avoid if', detail: 'Your controller does not fully support the exact lock model or the door has a weak 2.4 GHz path.' },
            { label: 'Decision factor', detail: 'Zigbee is a good fit only when hub support and mesh placement are already planned.' },
            { label: 'Evidence needed', detail: 'Confirm hub compatibility, repeater path, protocol generation, battery estimate, door fit, and fallback access.' },
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
    'smart-locks-for-apartments': {
        title: `Best Smart Locks for Apartments ${CURRENT_YEAR}: Renter Fit, Retrofit & No-Drill Picks`,
        description: 'Compare apartment smart locks by no-drill retrofit fit, lease risk, landlord key access, door prep, keypad options, battery life, and move-out reset.',
        h1: `Best Smart Locks for Apartments ${CURRENT_YEAR}: Retrofit and Renter-Friendly Picks`,
        intro: 'Apartment smart locks should be chosen around reversibility, lease risk, existing deadbolt shape, and backup access. The best apartment pick is the one you can install, maintain, and remove cleanly without creating a door or landlord problem.',
        methodology: [
            'We favor retrofit and reversible options that preserve exterior key access and reduce permanent door modification.',
            'Door-fit risk, landlord access, battery maintenance, and backup entry are weighted before advanced smart-home features.',
            'This page is intended for renters, condo residents, roommates, and apartment owners comparing practical install constraints.',
        ],
        intentSignals: [
            { label: 'No-drill fit', detail: 'Retrofit hardware and original keyway preservation reduce lease and move-out risk.' },
            { label: 'Apartment hardware', detail: 'Mortise, interconnected, narrow-stile, or non-standard doors can block common smart locks.' },
            { label: 'Access sharing', detail: 'Roommates, family, cleaners, and landlord emergency access need a controlled fallback plan.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Renters and apartment residents who need reversible smart access without changing the exterior lock path.' },
            { label: 'Avoid if', detail: 'The lock requires drilling, exterior replacement, or a lease approval path you do not have.' },
            { label: 'Decision factor', detail: 'Reversibility and landlord-compatible fallback access matter more than advanced automation depth.' },
            { label: 'Evidence needed', detail: 'Check lease terms, existing deadbolt style, interior clearance, exterior key access, batteries, and move-out restoration.' },
        ],
        calculatorPathways: [
            { href: '/calculators/compatibility', label: 'Door compatibility checker', detail: 'Confirm whether the apartment door can accept a retrofit or replacement lock.' },
            { href: '/calculators/retrofit-advisor', label: 'Retrofit advisor', detail: 'Decide whether a no-drill interior retrofit or full replacement is the lower-risk path.' },
            { href: '/calculators/battery-life', label: 'Battery life calculator', detail: 'Plan replacement intervals for a lock you maintain yourself.' },
        ],
    },
    'smart-locks-for-rental-properties': {
        title: `Best Smart Locks for Rental Properties ${CURRENT_YEAR}: Codes, Battery & Support Cost`,
        description: 'Compare rental property smart locks by master codes, tenant turnover, battery visits, backup entry, durability, protocol support, and lifecycle cost.',
        h1: `Best Smart Locks for Rental Properties ${CURRENT_YEAR}: Manager-Ready Picks`,
        intro: 'Rental property locks need repeatable code management, predictable battery visits, backup access, and durable hardware. The right model is the one a manager can support across tenant turnover without making every issue an emergency visit.',
        methodology: [
            'We prioritize keypad capacity, access-code workflow, battery planning, security grade, and maintenance cost over novelty features.',
            'Models with better fallback access and clearer lifecycle assumptions rank higher for rental operations.',
            'This page is built for landlords, small portfolio managers, and operators standardizing hardware across multiple doors.',
        ],
        intentSignals: [
            { label: 'Turnover workflow', detail: 'Tenant, cleaner, contractor, and emergency codes need easy creation, deletion, and audit discipline.' },
            { label: 'Maintenance visits', detail: 'Battery life, signal quality, and backup entry determine how often someone must go to the property.' },
            { label: 'Hardware durability', detail: 'Grade, keypad wear, weather exposure, and physical backup all matter on high-use rental doors.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Landlords and property managers who need reliable keypad workflows and lower support burden across units.' },
            { label: 'Avoid if', detail: 'The model depends on tenant-owned hubs, shared unmanaged codes, or app-only entry for core access.' },
            { label: 'Decision factor', detail: 'Choose the lock that minimizes support visits while keeping turnover and emergency access controlled.' },
            { label: 'Evidence needed', detail: 'Verify code capacity, master-code workflow, battery alerts, backup entry, protocol ownership, security grade, and install cost.' },
        ],
        calculatorPathways: [
            { href: '/calculators/guest-code', label: 'Guest code planner', detail: 'Plan tenant, cleaner, contractor, and emergency code capacity across doors.' },
            { href: '/calculators/lock-tco', label: 'Lock TCO calculator', detail: 'Compare hardware, batteries, support visits, subscriptions, and replacement cost.' },
            { href: '/calculators/fleet-planner', label: 'Fleet planner', detail: 'Estimate multi-door standardization needs before buying across properties.' },
        ],
    },
    'smart-locks-for-commercial': {
        title: `Best Commercial Smart Locks ${CURRENT_YEAR}: Grade, Audit Trails & Code Checks`,
        description: 'Compare commercial smart locks by ANSI/BHMA grade, audit trails, credential capacity, fire and ADA considerations, backup access, and fleet cost.',
        h1: `Best Commercial Smart Locks ${CURRENT_YEAR}: Access-Control and Compliance Picks`,
        intro: 'Commercial smart locks should be evaluated as access-control equipment, not just residential gadgets. Grade, audit trail needs, credential capacity, emergency egress, fire considerations, and administrator workflow decide whether a lock belongs on a business door.',
        methodology: [
            'We prioritize security grade, credential capacity, audit trail readiness, backup entry, and compliance signals where the data is available.',
            'Commercial use cases are separated from home convenience because traffic, liability, and administrator workflows are different.',
            'This shortlist is for offices, clinics, small businesses, and managed buildings that need more than a consumer keypad.',
        ],
        intentSignals: [
            { label: 'Grade and listing', detail: 'ANSI/BHMA grade, UL listing, and door type determine whether a lock is appropriate for the opening.' },
            { label: 'Audit workflow', detail: 'Commercial users often need logs, role separation, revocation, and administrator control.' },
            { label: 'Code capacity', detail: 'Staff, vendors, cleaners, and temporary users can outgrow residential PIN limits quickly.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Small commercial doors where access logs, credential control, durability, and admin workflow matter.' },
            { label: 'Avoid if', detail: 'The opening requires certified panic hardware, fire-rated hardware, or a locksmith-specified commercial system not represented in the dataset.' },
            { label: 'Decision factor', detail: 'Compliance and administrator workflow should override consumer convenience features.' },
            { label: 'Evidence needed', detail: 'Confirm ANSI/BHMA grade, UL/fire requirements, ADA and egress rules, credential capacity, audit logs, and backup access.' },
        ],
        calculatorPathways: securityCalculatorPathways,
    },
    'smart-locks-for-families': {
        title: `Best Smart Locks for Families ${CURRENT_YEAR}: Kid Codes, Auto-Lock & Backup Entry`,
        description: 'Compare family smart locks by keypad codes, activity logs, auto-lock, fingerprint access, backup keys, battery life, door fit, and child-friendly use.',
        h1: `Best Smart Locks for Families ${CURRENT_YEAR}: Codes, Auto-Lock and Backup Picks`,
        intro: 'Family smart locks need to work for kids, parents, grandparents, caregivers, and guests without turning the door into a support problem. Compare code capacity, auto-lock behavior, backup entry, battery life, and whether every household member has a realistic access path.',
        methodology: [
            'We prioritize access methods that can serve multiple family members without forcing phone-only entry.',
            'Auto-lock, activity visibility, backup access, and battery planning are weighted as household reliability signals.',
            'This page is for families comparing daily convenience with safety, access sharing, and low-maintenance ownership.',
        ],
        intentSignals: [
            { label: 'Multiple users', detail: 'Each resident or caregiver may need a unique code, fingerprint, phone access, or backup key path.' },
            { label: 'Auto-lock behavior', detail: 'Auto-lock can help with forgotten doors, but timing and escape routines must fit the household.' },
            { label: 'Backup access', detail: 'A family lock should still work when a phone is lost, a battery is low, or a child forgets a code.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Households that need simple shared access, child-friendly entry, auto-lock support, and dependable backup options.' },
            { label: 'Avoid if', detail: 'The lock depends on app-only entry or does not support enough independent users for the household.' },
            { label: 'Decision factor', detail: 'Choose the access method every household member can use reliably, then compare protocol and battery tradeoffs.' },
            { label: 'Evidence needed', detail: 'Check code capacity, fingerprint capacity, auto-lock settings, backup key or power path, battery estimate, and door fit.' },
        ],
        calculatorPathways: accessCalculatorPathways,
    },
    'smart-locks-for-home-security': {
        title: `Best Smart Locks for Home Security ${CURRENT_YEAR}: Grade, Encryption & Backup Checks`,
        description: 'Compare secure smart locks by ANSI/BHMA grade, encryption signals, tamper alerts, backup entry, keypad hygiene, door fit, and protocol risk.',
        h1: `Best Smart Locks for Home Security ${CURRENT_YEAR}: Grade and Backup-Checked Picks`,
        intro: 'A secure smart lock is not just the lock with the strongest marketing claim. Physical grade, door fit, credential hygiene, backup access, encryption signals, and household workflow all affect real security.',
        methodology: [
            'We rank security-oriented pages around ANSI/BHMA grade, fallback access, protocol evidence, and data completeness where available.',
            'Claims about encryption, tamper alerts, and grade are treated as evidence signals only when the dataset has explicit fields.',
            'This shortlist is for buyers who want to reduce practical access risk without ignoring installation and maintenance constraints.',
        ],
        intentSignals: [
            { label: 'Physical grade', detail: 'ANSI/BHMA grade and door hardware fit usually matter more than app feature lists.' },
            { label: 'Credential hygiene', detail: 'Unique codes, deletion discipline, and strong PIN practices reduce everyday security failures.' },
            { label: 'Backup plan', detail: 'Emergency entry should be controlled, documented, and available before the lock fails.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Homeowners prioritizing physical security, controlled credentials, and reliable backup entry over novelty features.' },
            { label: 'Avoid if', detail: 'The door, strike, frame, or installation quality is weak enough that the lock cannot compensate.' },
            { label: 'Decision factor', detail: 'Security comes from the door system and workflow, not only from the smart lock electronics.' },
            { label: 'Evidence needed', detail: 'Verify ANSI/BHMA grade, encryption or security-class data, tamper alerts, backup entry, code policy, and door fit.' },
        ],
        calculatorPathways: securityCalculatorPathways,
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
    'fingerprint-smart-locks': {
        title: `Best Fingerprint Smart Locks ${CURRENT_YEAR}: Sensor Capacity, Fallback & Weather Checks`,
        description: 'Compare fingerprint smart locks by biometric capacity, keypad backup, false-reject risk, weather exposure, battery life, door fit, and family use.',
        h1: `Best Fingerprint Smart Locks ${CURRENT_YEAR}: Fast Access With Backup Checks`,
        intro: 'Fingerprint locks are convenient only when the sensor, backup entry, user capacity, and weather exposure fit the door. Compare biometric access as one credential path, not as a replacement for keypad, key, or emergency entry planning.',
        methodology: [
            'We require fingerprint support for this shortlist and then evaluate capacity, keypad fallback, battery data, and security signals.',
            'Models with multiple access methods rank ahead of fingerprint-only convenience claims because biometrics can fail for wet, cold, dirty, or injured fingers.',
            'This page is for families, small teams, and users who want fast entry while keeping fallback access practical.',
        ],
        intentSignals: [
            { label: 'Biometric capacity', detail: 'Fingerprint slots must cover residents, trusted users, and any backup administrators.' },
            { label: 'Fallback entry', detail: 'PIN, physical key, NFC, or app access protects the door when a scan is rejected.' },
            { label: 'Environment risk', detail: 'Cold, rain, gloves, dirt, and exterior placement can affect fingerprint reliability.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Families and small teams that want fast daily entry with keypad or key backup still available.' },
            { label: 'Avoid if', detail: 'The door is exposed to conditions that make biometric scans unreliable and there is no strong fallback path.' },
            { label: 'Decision factor', detail: 'Fingerprint convenience is valuable only when capacity and backup access cover every regular user.' },
            { label: 'Evidence needed', detail: 'Check fingerprint capacity, sensor type, keypad backup, weather rating, battery estimate, and door compatibility.' },
        ],
        calculatorPathways: accessCalculatorPathways,
    },
    'keypad-smart-locks': {
        title: `Best Keypad Smart Locks ${CURRENT_YEAR}: PIN Capacity, Guest Codes & Backup Picks`,
        description: 'Compare keypad smart locks by PIN capacity, code scheduling, touchscreen vs buttons, security hygiene, battery life, guest access, and door fit.',
        h1: `Best Keypad Smart Locks ${CURRENT_YEAR}: PIN Code and Guest Access Picks`,
        intro: 'Keypad locks are often the most practical smart lock category because they do not require every user to install an app. The key questions are code capacity, scheduling, keypad usability, PIN hygiene, battery life, and backup entry.',
        methodology: [
            'We prioritize models with keypad access, clear code capacity, guest-code support, battery data, and door-fit fields.',
            'Touchscreen and button keypads are evaluated by practical access tradeoffs such as gloves, weather, wear patterns, and visibility.',
            'This page is built for homeowners, families, rentals, and small offices that need shareable access without phone-only entry.',
        ],
        intentSignals: [
            { label: 'PIN capacity', detail: 'The lock needs enough unique codes for residents, guests, cleaners, vendors, and emergency users.' },
            { label: 'Scheduling workflow', detail: 'Temporary and recurring codes matter for rentals, cleaners, and service access.' },
            { label: 'Keypad usability', detail: 'Button and touchscreen keypads behave differently in gloves, rain, darkness, and heavy use.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Homes, rentals, and shared spaces where PIN access is simpler than app-based entry.' },
            { label: 'Avoid if', detail: 'Users share one permanent code or the lock cannot support the number of credentials you need.' },
            { label: 'Decision factor', detail: 'The best keypad lock is the one with enough controlled codes and a backup plan for battery or keypad failure.' },
            { label: 'Evidence needed', detail: 'Confirm PIN capacity, scheduling features, keypad style, weather exposure, battery estimate, and backup access.' },
        ],
        calculatorPathways: accessCalculatorPathways,
    },
    'auto-unlock-smart-locks': {
        title: `Best Auto-Unlock Smart Locks ${CURRENT_YEAR}: BLE Range, Geofence & Backup Checks`,
        description: 'Compare auto-unlock smart locks by Bluetooth range, geofence behavior, phone dependency, keypad fallback, battery life, privacy risk, and door fit.',
        h1: `Best Auto-Unlock Smart Locks ${CURRENT_YEAR}: Hands-Free Entry With Backup Checks`,
        intro: 'Auto-unlock is useful when it saves a regular user from reaching for keys, but it should not be the only way into the home. Compare Bluetooth range, geofence behavior, phone dependency, keypad fallback, and privacy tradeoffs before choosing a hands-free lock.',
        methodology: [
            'We evaluate auto-unlock models by local-range assumptions, phone dependency, fallback access, battery data, and door-fit risk.',
            'Locks with keypad or physical backup are more decision-ready than app-only hands-free claims.',
            'This page is for owner-occupied homes and residents who want convenience without weakening guest or emergency access.',
        ],
        intentSignals: [
            { label: 'BLE range', detail: 'Bluetooth proximity can vary with hallway layout, phone state, bodies, doors, and nearby interference.' },
            { label: 'Geofence behavior', detail: 'Auto-unlock usually depends on phone location rules and vendor app permissions.' },
            { label: 'Fallback access', detail: 'A keypad, key, or emergency entry path is still needed when the phone is dead or missing.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Residents who want hands-free daily entry and still keep keypad or key backup for failures.' },
            { label: 'Avoid if', detail: 'Guests, rentals, or shared users would depend on phone pairing to enter reliably.' },
            { label: 'Decision factor', detail: 'Auto-unlock should be a convenience layer, not the primary access-control workflow.' },
            { label: 'Evidence needed', detail: 'Check Bluetooth range, geofence settings, app permissions, fallback access, battery estimate, and privacy controls.' },
        ],
        calculatorPathways: [
            { href: '/calculators/ble-range', label: 'BLE range calculator', detail: 'Estimate whether Bluetooth proximity can work reliably at the door.' },
            { href: '/calculators/privacy-compliance', label: 'Privacy compliance evaluator', detail: 'Review phone location and app-permission tradeoffs for auto-unlock workflows.' },
            { href: '/calculators/emergency-backup', label: 'Emergency backup planner', detail: 'Plan entry when the phone is dead, missing, or not paired.' },
        ],
    },
    'budget-smart-locks': {
        title: `Best Budget Smart Locks ${CURRENT_YEAR}: Under-$180 Value With Fit Checks`,
        description: 'Compare budget smart locks under $180 by keypad access, hub requirements, battery life, door fit, security grade, missing features, and total cost.',
        h1: `Best Budget Smart Locks ${CURRENT_YEAR}: Under-$180 Value Picks`,
        intro: 'Budget smart locks should be judged by the access workflow they can reliably support, not just by low hardware price. Compare hub requirements, keypad access, door fit, battery life, security grade, and install cost before calling a lock the cheapest useful option.',
        methodology: [
            'We prioritize models in the budget price tier that still have enough specs to evaluate fit, access, battery, and security tradeoffs.',
            'The page treats missing Wi-Fi, HomeKit, fingerprint, or premium materials as tradeoffs rather than automatic failures.',
            'This shortlist is for buyers who want the lowest practical ownership cost, not only the lowest shelf price.',
        ],
        intentSignals: [
            { label: 'Hardware price', detail: 'The visible lock price must be weighed against hubs, batteries, adapters, and installation.' },
            { label: 'Feature tradeoff', detail: 'Budget locks often give up direct Wi-Fi, premium biometrics, or advanced ecosystem support.' },
            { label: 'Core reliability', detail: 'Keypad, physical security, battery life, and door fit matter more than premium extras.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Buyers who need reliable keypad or basic smart access while keeping upfront cost low.' },
            { label: 'Avoid if', detail: 'You need direct Wi-Fi, Apple Home Key, fingerprint access, premium materials, or advanced rental workflows.' },
            { label: 'Decision factor', detail: 'A budget lock is a good value only if hub, battery, and install assumptions do not erase the savings.' },
            { label: 'Evidence needed', detail: 'Check price, required hub, battery estimate, keypad support, ANSI/BHMA grade, door fit, and installation cost.' },
        ],
        calculatorPathways: priceCalculatorPathways,
    },
    'mid-range-smart-locks': {
        title: `Best Mid-Range Smart Locks ${CURRENT_YEAR}: $180-$280 Feature and Cost Checks`,
        description: 'Compare mid-range smart locks from $180 to $280 by Wi-Fi, HomeKit, keypad, fingerprint, battery life, door fit, security, and ownership cost.',
        h1: `Best Mid-Range Smart Locks ${CURRENT_YEAR}: $180-$280 Balanced Picks`,
        intro: 'Mid-range smart locks often hold the best balance of access methods, ecosystem support, and price. The right pick still depends on whether the added features reduce friction without creating battery, signal, or install costs.',
        methodology: [
            'We prioritize mid-tier models with strong specification coverage across protocol, battery, access methods, security, and price.',
            'Convenience features are weighted only when fallback access and door compatibility remain clear.',
            'This page is for buyers comparing value against premium upgrades and budget compromises.',
        ],
        intentSignals: [
            { label: 'Feature balance', detail: 'This tier often adds Wi-Fi, HomeKit, fingerprint, or stronger app workflows without flagship pricing.' },
            { label: 'Battery cost', detail: 'More features can increase battery and support burden, especially for Wi-Fi models.' },
            { label: 'Upgrade threshold', detail: 'Premium pricing should be justified by security grade, Home Key, Thread, materials, or workflow needs.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Most homeowners who want better access features without paying for every premium lock capability.' },
            { label: 'Avoid if', detail: 'You only need basic keypad access or you require commercial-grade durability and audit workflows.' },
            { label: 'Decision factor', detail: 'Choose the model whose added features solve your access problem without adding hidden maintenance cost.' },
            { label: 'Evidence needed', detail: 'Confirm protocol, access methods, listed battery life, security grade, price, install needs, and subscription assumptions.' },
        ],
        calculatorPathways: priceCalculatorPathways,
    },
    'premium-smart-locks': {
        title: `Best Premium Smart Locks ${CURRENT_YEAR}: Grade 1, Home Key & Matter Value Checks`,
        description: 'Compare premium smart locks over $280 by ANSI Grade 1 claims, Apple Home Key, Matter or Thread, materials, battery life, door fit, and ROI.',
        h1: `Best Premium Smart Locks ${CURRENT_YEAR}: Flagship Picks With Value Checks`,
        intro: 'Premium smart locks can justify their price when they add stronger physical grade, better materials, Apple Home Key, Thread or Matter support, cleaner design, or lower support burden. The premium label alone is not enough; the added value needs to match the door and workflow.',
        methodology: [
            'We prioritize premium-tier models with clear security, ecosystem, access, battery, and door-fit evidence.',
            'Flagship features are treated as useful only when they solve a specific buyer problem such as Apple Home Key, Grade 1 security, or design constraints.',
            'This page is for buyers deciding whether a premium lock produces enough practical value over mid-range alternatives.',
        ],
        intentSignals: [
            { label: 'Premium feature', detail: 'Grade 1, Apple Home Key, Matter or Thread, invisible design, and materials should be tied to a real need.' },
            { label: 'Lifecycle value', detail: 'Higher hardware price can make sense if it reduces support, improves fit, or extends service life.' },
            { label: 'Evidence quality', detail: 'Premium claims need clear specs, fallback access, and compatibility data before they affect the ranking.' },
        ],
        commercialIntent: [
            { label: 'Best for', detail: 'Buyers who need a flagship feature such as Grade 1 security, Home Key, Matter/Thread, premium design, or lower support burden.' },
            { label: 'Avoid if', detail: 'A mid-range keypad or Wi-Fi lock solves the same access problem with lower lifecycle cost.' },
            { label: 'Decision factor', detail: 'The upgrade is worth it only when the premium feature changes security, usability, ecosystem fit, or maintenance.' },
            { label: 'Evidence needed', detail: 'Confirm grade, Home Key or Matter support, battery estimate, materials, door fit, warranty, and total cost.' },
        ],
        calculatorPathways: priceCalculatorPathways,
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

export function getBestPageFaqs(slug: string, fallbackFaqs: BestPageFaq[] = []): BestPageFaq[] {
    const profile = profiles[slug]
    if (!profile) return fallbackFaqs
    return profile.faqs || buildProfileFaqs(profile)
}

export function getBestPageEvidence(slug: string): BestPageEvidence {
    const profile = profiles[slug]
    const category = profile ? getCategoryName(profile) : slug.replace(/-/g, ' ')

    return {
        lastVerified: BEST_PAGE_LAST_REVIEWED,
        inclusionRule: `Included models must match the published ${category} page intent and have enough catalog data to compare protocol, access, battery, price, security, or door-fit signals.`,
        exclusionRule: `Models are treated as lower-confidence or excluded from recommendations when the category fit, availability, required hub, door compatibility, or evidence fields are too thin for a buying decision.`,
        sourceBoundary: 'Rankings use SLockHub catalog fields, page rules, active product status, listed prices, battery estimates, protocol fields, access features, and security or door-fit data where available.',
        dataLimitations: 'Retail price, firmware support, ecosystem behavior, installer requirements, warranty terms, and regional SKU availability can change after publication and should be verified before purchase.',
    }
}
