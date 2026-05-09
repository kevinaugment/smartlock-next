const CURRENT_YEAR = '2026'

export interface BestPageSeoProfile {
    title: string
    description: string
    h1: string
    intro: string
    methodology: string[]
    intentSignals: Array<{ label: string; detail: string }>
}

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
    },
}

export function getBestPageSeoProfile(slug: string): BestPageSeoProfile | null {
    return profiles[slug] || null
}
