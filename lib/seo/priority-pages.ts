export interface SeoLink {
    href: string
    title: string
    description: string
}

export const coreHubLinks: SeoLink[] = [
    {
        href: '/calculators',
        title: 'All Calculators',
        description: 'Run cost, fit, signal, battery, protocol, security, and fleet planning tools before buying.',
    },
    {
        href: '/compare',
        title: 'Brand Compare Hub',
        description: 'Compare brands by price, protocol, product depth, access features, battery data, and door fit.',
    },
    {
        href: '/protocols',
        title: 'Smart Lock Protocols',
        description: 'Choose between Wi-Fi, Z-Wave, Zigbee, Thread, Matter, Bluetooth, and hub-based setups.',
    },
    {
        href: '/resources',
        title: 'Research Resources',
        description: 'Use glossary terms, reference tables, buying guides, and installation diagrams to validate decisions.',
    },
    {
        href: '/resources/buying-guide',
        title: 'Buying Resources',
        description: 'Follow buying paths for homes, rentals, managed properties, and protocol-specific shortlists.',
    },
    {
        href: '/resources/reference-tables',
        title: 'Reference Tables',
        description: 'Check protocol, security, battery, grade, and installation reference material.',
    },
    {
        href: '/resources/installation-guides',
        title: 'Installation Guides',
        description: 'Review door anatomy, measurements, prep diagrams, and setup references before installation.',
    },
]

export const protocolPageLinks: SeoLink[] = [
    { href: '/protocols/matter', title: 'Matter', description: 'Cross-platform smart home control over Thread, Wi-Fi, or Ethernet transports.' },
    { href: '/protocols/thread', title: 'Thread', description: 'Low-power IPv6 mesh planning for Matter-forward smart lock homes.' },
    { href: '/protocols/z-wave', title: 'Z-Wave', description: 'Sub-GHz mesh planning for range, reliability, and hub-managed lock deployments.' },
    { href: '/protocols/zigbee', title: 'Zigbee', description: 'Low-power 2.4 GHz mesh planning for supported hubs and Home Assistant setups.' },
    { href: '/protocols/wifi', title: 'Wi-Fi', description: 'No-hub remote access tradeoffs for signal quality, battery life, and router setup.' },
    { href: '/protocols/bluetooth', title: 'Bluetooth', description: 'Phone-proximity access, local setup, BLE range, and bridge tradeoffs.' },
]

export const priorityBestPageLinks: SeoLink[] = [
    { href: '/best/smart-locks-2026', title: 'Best Smart Locks 2026', description: 'Broad shortlist across door fit, protocol, access method, security, and ownership cost.' },
    { href: '/best/matter-smart-locks', title: 'Best Matter Smart Locks', description: 'Cross-platform Matter shortlists with Thread, Wi-Fi, fallback access, and door checks.' },
    { href: '/best/z-wave-smart-locks', title: 'Best Z-Wave Smart Locks', description: 'Range-first locks for hub-managed homes, apartments, and rental portfolios.' },
    { href: '/best/homekit-smart-locks', title: 'Best HomeKit Smart Locks', description: 'Apple Home, Home Key, Matter, Thread, keypad fallback, and guest-access checks.' },
    { href: '/best/zigbee-smart-locks', title: 'Best Zigbee Smart Locks', description: 'Zigbee hub and mesh shortlists for low-power smart lock deployments.' },
    { href: '/best/wifi-smart-locks', title: 'Best Wi-Fi Smart Locks', description: 'No-hub smart lock shortlists with signal, battery, and remote-access tradeoffs.' },
    { href: '/best/thread-smart-locks', title: 'Best Thread Smart Locks', description: 'Thread and Matter-ready shortlists for low-power mesh smart homes.' },
    { href: '/best/fingerprint-smart-locks', title: 'Best Fingerprint Smart Locks', description: 'Biometric access shortlists with keypad fallback, credential capacity, and door checks.' },
    { href: '/best/keypad-smart-locks', title: 'Best Keypad Smart Locks', description: 'PIN and guest-code shortlists for homes, rentals, and access management.' },
    { href: '/best/budget-smart-locks', title: 'Best Budget Smart Locks', description: 'Lower-cost smart lock shortlists with support, install, and replacement-risk checks.' },
    { href: '/best/mid-range-smart-locks', title: 'Best Mid-Range Smart Locks', description: 'Balanced price, feature, security, and support shortlists for mainstream buyers.' },
    { href: '/best/premium-smart-locks', title: 'Best Premium Smart Locks', description: 'Higher-end shortlists for security, ecosystem support, access methods, and design.' },
    { href: '/best/auto-unlock-smart-locks', title: 'Best Auto-Unlock Smart Locks', description: 'Convenience-led shortlists with fallback access and reliability checks.' },
    { href: '/best/smart-locks-for-airbnb', title: 'Best Smart Locks for Airbnb', description: 'Short-term rental shortlists for guest codes, battery maintenance, and backup access.' },
    { href: '/best/smart-locks-for-apartments', title: 'Best Smart Locks for Apartments', description: 'Apartment-friendly shortlists for fit, reversibility, range, and renter constraints.' },
    { href: '/best/smart-locks-for-rental-properties', title: 'Best Smart Locks for Rental Properties', description: 'Landlord and property-management shortlists for credentials, maintenance, and support.' },
    { href: '/best/smart-locks-for-commercial', title: 'Best Smart Locks for Commercial', description: 'Commercial-door shortlists for access control, auditability, compliance, and fleet planning.' },
    { href: '/best/smart-locks-for-families', title: 'Best Smart Locks for Families', description: 'Family access shortlists for keypad, fingerprints, guest access, and backup entry.' },
    { href: '/best/smart-locks-for-home-security', title: 'Best Smart Locks for Home Security', description: 'Security-led shortlists with grade, access, encryption, and door reinforcement signals.' },
    { href: '/best/smart-locks-with-longest-battery-life', title: 'Longest Battery Life Smart Locks', description: 'Battery-focused shortlists for low-maintenance homes, rentals, and multi-door deployments.' },
]

export const strategicSeoPathwayLinks: SeoLink[] = [
    {
        href: '/calculators',
        title: 'Calculator Hub',
        description: 'Start with fit, cost, signal, battery, protocol, and security tools before choosing a model.',
    },
    {
        href: '/protocols',
        title: 'Protocol Hub',
        description: 'Validate Wi-Fi, Z-Wave, Zigbee, Thread, Matter, and Bluetooth tradeoffs for the door.',
    },
    {
        href: '/resources',
        title: 'Reference Library',
        description: 'Use definitions, tables, diagrams, and buying guides when a spec or claim needs context.',
    },
    {
        href: '/articles/security/smart-lock-security-complete-analysis',
        title: 'Security Analysis',
        description: 'Review physical security, PIN policy, wireless setup, privacy, and update boundaries.',
    },
    {
        href: '/best/smart-locks-with-longest-battery-life',
        title: 'Longest Battery Life Picks',
        description: 'Compare low-maintenance lock choices after checking signal quality and door alignment.',
    },
    {
        href: '/articles/guides/door-compatibility-guide',
        title: 'Door Compatibility Guide',
        description: 'Measure thickness, bore, backset, lock type, and trim clearance before ordering hardware.',
    },
]
