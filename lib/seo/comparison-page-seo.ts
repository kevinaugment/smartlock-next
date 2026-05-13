import type { Brand, ProductWithBrand } from '@/lib/db/brand-models'
import type { CalculatorPathway, CommercialIntentBlock } from '@/lib/seo/best-page-seo'

const CURRENT_YEAR = '2026'

export interface ComparisonSeoProfile {
    title: string
    description: string
    subtitle: string
    verdict: string
    angle: string
    commercialIntent: CommercialIntentBlock[]
    calculatorPathways: CalculatorPathway[]
    faq: { question: string; answer: string }
}

type ComparisonSeoOverride = Partial<ComparisonSeoProfile>

function getComparisonPairKey(brand1: Brand, brand2: Brand): string {
    return [brand1.slug, brand2.slug].sort().join('-')
}

function getPriceRange(products: ProductWithBrand[]): string {
    const prices = products.filter(p => p.price_usd).map(p => p.price_usd!)
    if (prices.length === 0) return 'N/A'
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    if (min === max) return `$${min}`
    return `$${min} - $${max}`
}

function getProtocols(products: ProductWithBrand[]): string[] {
    const protocols = new Set<string>()
    for (const p of products) {
        if (p.protocol) protocols.add(p.protocol.toUpperCase())
        if (p.secondary_protocol) protocols.add(p.secondary_protocol.toUpperCase())
    }
    return Array.from(protocols)
}

function getSharedProtocols(products1: ProductWithBrand[], products2: ProductWithBrand[]): string[] {
    const protocols2 = new Set(getProtocols(products2))
    return getProtocols(products1).filter(protocol => protocols2.has(protocol))
}

function getAvgRating(products: ProductWithBrand[]): number {
    if (products.length === 0) return 0
    return products.reduce((sum, p) => sum + p.rating, 0) / products.length
}

function getLowerPricedBrand(brand1: Brand, brand2: Brand, products1: ProductWithBrand[], products2: ProductWithBrand[]): Brand | null {
    const prices1 = products1.filter(p => p.price_usd).map(p => p.price_usd!)
    const prices2 = products2.filter(p => p.price_usd).map(p => p.price_usd!)
    if (prices1.length === 0 || prices2.length === 0) return null
    const min1 = Math.min(...prices1)
    const min2 = Math.min(...prices2)
    if (min1 === min2) return null
    return min1 < min2 ? brand1 : brand2
}

function getBetterRatedBrand(brand1: Brand, brand2: Brand, products1: ProductWithBrand[], products2: ProductWithBrand[]): Brand | null {
    const avg1 = getAvgRating(products1)
    const avg2 = getAvgRating(products2)
    if (Math.abs(avg1 - avg2) < 0.1) return null
    return avg1 > avg2 ? brand1 : brand2
}

function getGenericProfile(
    brand1: Brand,
    brand2: Brand,
    products1: ProductWithBrand[],
    products2: ProductWithBrand[]
): ComparisonSeoProfile {
    const price1 = getPriceRange(products1)
    const price2 = getPriceRange(products2)
    const sharedProtocols = getSharedProtocols(products1, products2)
    const priceWinner = getLowerPricedBrand(brand1, brand2, products1, products2)
    const ratingWinner = getBetterRatedBrand(brand1, brand2, products1, products2)
    const protocolText = sharedProtocols.length > 0 ? sharedProtocols.join(', ') : 'smart-home protocol'
    const commercialIntent: CommercialIntentBlock[] = [
        { label: 'Best for', detail: `Buyers comparing ${brand1.name} and ${brand2.name} by price, protocol fit, battery planning, access features, and door compatibility before shortlisting exact models.` },
        { label: 'Avoid if', detail: `You need a one-model answer without checking whether the selected ${brand1.name} or ${brand2.name} lock fits your door, hub, and credential workflow.` },
        { label: 'Decision factor', detail: `Use brand-level differences only as a starting point; the final choice should come from model-level protocol, battery, security, door-fit, and price evidence.` },
        { label: 'Evidence needed', detail: `Confirm current retail price, supported protocols, battery-life claims, ANSI/BHMA or encryption signals, door-prep dimensions, and warranty/support expectations.` },
    ]
    const calculatorPathways: CalculatorPathway[] = [
        { href: '/calculators/compatibility', label: 'Door compatibility checker', detail: 'Check whether the shortlisted model fits your bore, backset, thickness, material, and lock type.' },
        { href: '/calculators/protocol-wizard', label: 'Protocol wizard', detail: 'Decide whether Wi-Fi, Z-Wave, Zigbee, Thread, Bluetooth, or Matter fits your hub and reliability needs.' },
        { href: '/calculators/lock-tco', label: 'Lock TCO calculator', detail: 'Compare hardware, batteries, subscriptions, hub cost, installation, and maintenance over the ownership period.' },
    ]

    const angle = ratingWinner && priceWinner && ratingWinner !== priceWinner
        ? `${ratingWinner.name} has stronger average catalog ratings, while ${priceWinner.name} has the lower visible entry price. Compare exact models when confidence and budget point in different directions.`
        : sharedProtocols.length > 0
            ? `Both brands have ${protocolText} coverage in this catalog, so the better choice depends on model-level battery life, door fit, security grade, access features, and price.`
            : `${brand1.name} and ${brand2.name} solve different smart lock needs. Use the comparison to check protocol fit, price, battery evidence, access features, and best-use cases before shortlisting.`

    const verdict = ratingWinner
        ? `${ratingWinner.name} is the stronger starting point by average catalog rating, but the final choice should still come down to protocol fit, door requirements, and the exact model you buy.`
        : `${brand1.name} and ${brand2.name} are close enough that the best pick depends on price, protocol fit, battery planning, door compatibility, and support expectations.`

    return {
        title: `${brand1.name} vs ${brand2.name}: Price, Protocol & Battery ${CURRENT_YEAR}`,
        description: `${brand1.name} vs ${brand2.name}: compare smart lock price (${price1} vs ${price2}), protocol support, battery life, security, door fit, and best use case.`,
        subtitle: `Compare ${brand1.name} and ${brand2.name} smart locks by price, protocol support, battery life, security signals, access features, door fit, and buying use case.`,
        verdict,
        angle,
        commercialIntent,
        calculatorPathways,
        faq: {
            question: `${brand1.name} vs ${brand2.name}: which smart lock brand is better?`,
            answer: angle,
        },
    }
}

const comparisonOverrides: Record<string, ComparisonSeoOverride> = {
    'nuki-tedee': {
        title: `Nuki vs Tedee: European Smart Lock Comparison ${CURRENT_YEAR}`,
        description: 'Nuki vs Tedee compared by retrofit fit, Euro cylinder support, app control, battery planning, price, and the best European smart lock use case.',
        subtitle: 'Compare two leading European retrofit smart lock brands by cylinder fit, local access, battery planning, app workflows, and model-level value.',
        verdict: 'Nuki vs Tedee is mainly a retrofit and European-cylinder decision: shortlist the model that fits your cylinder, app workflow, battery plan, and regional availability first.',
        angle: 'Both brands target European retrofit smart lock buyers. Compare protocol coverage, battery evidence, door-cylinder fit, pricing, and which app ecosystem is easier to support long term.',
        faq: {
            question: 'Is Nuki or Tedee the better European retrofit smart lock?',
            answer: 'Both can be strong European-door choices. Nuki is often shortlisted for broad retrofit familiarity, while Tedee is often considered for compact hardware and premium cylinder workflows. The better choice depends on your cylinder, bridge or hub requirements, battery expectations, and regional support.',
        },
    },
    'defiant-kwikset': {
        title: `Kwikset vs Defiant Smart Locks: Budget Door Lock Comparison ${CURRENT_YEAR}`,
        description: 'Kwikset vs Defiant compared for budget smart locks, deadbolts, knobs, rekeying, keypad access, price, security grade, and rental/home use.',
        subtitle: 'Compare Kwikset and Defiant for budget-conscious smart lock buyers choosing between everyday residential hardware, keypad convenience, and upgrade cost.',
        verdict: 'Kwikset is usually the safer shortlist when smart features, ecosystem support, and rekey options matter; Defiant is mainly a budget-hardware comparison point.',
        faq: {
            question: 'Is Kwikset or Defiant better for budget smart locks?',
            answer: 'Kwikset is usually easier to recommend for smart-lock buyers because it has broader smart deadbolt coverage, keypad options, and rekey-friendly residential hardware. Defiant can make sense for low-cost basic hardware, but verify smart features and support before choosing it over Kwikset.',
        },
    },
    'defiant-schlage': {
        title: `Schlage vs Defiant Locks: Security, Price & Smart Features ${CURRENT_YEAR}`,
        description: 'Schlage vs Defiant compared for deadbolt security, smart lock features, keypad access, price, ANSI grade signals, and home or rental use.',
        subtitle: 'Compare Schlage and Defiant when the decision is premium security and smart features versus lower-cost residential lock hardware.',
        verdict: 'Schlage is the stronger default pick when security rating, smart features, and long-term support matter; Defiant is primarily a low-cost hardware alternative.',
        faq: {
            question: 'Is Schlage better than Defiant for a front door?',
            answer: 'For a primary exterior door, Schlage is usually the stronger shortlist because it has deeper smart lock coverage, stronger brand confidence, and clearer security positioning. Defiant may fit budget interior or basic replacement needs, but verify grade, app support, and warranty before using it for a high-risk entry.',
        },
    },
    'schlage-veise': {
        title: `Veise vs Schlage Smart Locks: Budget vs Security Comparison ${CURRENT_YEAR}`,
        description: 'Veise vs Schlage compared by price, keypad features, battery planning, door fit, security evidence, and when to choose budget or premium.',
        subtitle: 'Compare Veise and Schlage for buyers weighing a lower-cost keypad smart lock against a more established security brand.',
        verdict: 'Schlage is usually the safer security-led choice; Veise can be a budget shortlist when keypad convenience and lower upfront price matter more than brand depth.',
        angle: 'This comparison separates budget keypad convenience from security-led brand confidence. If you meant Schlage vs Weiser, use the dedicated Schlage vs Weiser comparison instead of this Veise matchup.',
        faq: {
            question: 'Is Veise or Schlage better for a smart deadbolt?',
            answer: 'Schlage is usually better when security grade, app ecosystem, and long-term support matter most. Veise may be worth comparing for lower-cost keypad access, but confirm battery life, warranty, and door fit before using it on a primary exterior door.',
        },
    },
    'schlage-weiser': {
        title: `Schlage vs Weiser Smart Locks: Security, Price & Door Fit ${CURRENT_YEAR}`,
        description: 'Schlage vs Weiser compared for smart deadbolts, keypad access, security grade, rekeying, price, battery life, and Canada/US door fit.',
        subtitle: 'Compare Schlage and Weiser by smart deadbolt security, keypad convenience, door compatibility, price range, protocol support, and regional availability.',
        verdict: 'Schlage is usually the stronger security-led smart lock shortlist; Weiser can be compelling where regional availability, rekeying, or price fit better.',
        angle: 'Schlage and Weiser are separate lock brands with different model families and support ecosystems. This comparison focuses on smart lock fit, price, protocol, security, battery data, and regional buying context rather than treating them as interchangeable hardware lines.',
        faq: {
            question: 'Is Schlage or Weiser better for smart deadbolts and keypad locks?',
            answer: 'Schlage is usually the stronger pick for security-led smart deadbolts and broader premium smart lock recognition. Weiser can be a practical choice in regions where its models, rekeying options, or pricing fit better. Compare exact models before deciding.',
        },
    },
    'nuki-switchbot': {
        title: `SwitchBot vs Nuki Smart Locks: Retrofit Lock Comparison ${CURRENT_YEAR}`,
        description: 'SwitchBot vs Nuki compared for retrofit installation, app control, bridge needs, battery planning, renter-friendly fit, and regional support.',
        subtitle: 'Compare SwitchBot and Nuki for retrofit smart lock buyers who want minimal door changes, app access, and clear bridge or hub requirements.',
    },
    'august-nuki': {
        title: `August vs Nuki Smart Locks: Retrofit Lock Comparison ${CURRENT_YEAR}`,
        description: 'August vs Nuki compared for retrofit deadbolt fit, European cylinder support, remote access, battery planning, app workflows, and rental use.',
        subtitle: 'Compare August and Nuki when choosing between North American deadbolt retrofit workflows and European cylinder-focused retrofit hardware.',
    },
    'august-switchbot': {
        title: `August vs SwitchBot Smart Locks: Retrofit Fit, Battery & App Control ${CURRENT_YEAR}`,
        description: 'August vs SwitchBot compared for renter-friendly retrofit installation, remote access, battery life, app control, door fit, and guest access.',
        subtitle: 'Compare August and SwitchBot for retrofit smart lock installs where preserving existing exterior hardware and minimizing door changes matters.',
    },
    'eufy-philips': {
        title: `Eufy vs Philips Smart Locks: Fingerprint, Video & Keypad Comparison ${CURRENT_YEAR}`,
        description: 'Eufy vs Philips smart locks compared by fingerprint access, keypad features, battery life, price, security signals, and smart-home fit.',
        subtitle: 'Compare Eufy and Philips for buyers weighing fingerprint entry, keypad convenience, video or app features, price, and door fit.',
    },
    'schlage-philips': {
        title: `Schlage vs Philips Smart Locks: Security, Fingerprint & Price ${CURRENT_YEAR}`,
        description: 'Schlage vs Philips compared for smart deadbolt security, fingerprint access, keypad features, battery life, price, and door compatibility.',
        subtitle: 'Compare Schlage and Philips when choosing between security-led deadbolts and feature-rich keypad or fingerprint smart locks.',
    },
}

export function getComparisonSeoProfile(
    brand1: Brand,
    brand2: Brand,
    products1: ProductWithBrand[],
    products2: ProductWithBrand[]
): ComparisonSeoProfile {
    const genericProfile = getGenericProfile(brand1, brand2, products1, products2)
    const override = comparisonOverrides[getComparisonPairKey(brand1, brand2)]

    return {
        ...genericProfile,
        ...override,
        faq: override?.faq || genericProfile.faq,
    }
}
