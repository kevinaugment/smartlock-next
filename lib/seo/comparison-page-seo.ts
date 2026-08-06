import type { Brand, ProductWithBrand } from '@/lib/db/brand-models'
import type { CalculatorPathway, CommercialIntentBlock } from '@/lib/seo/best-page-seo'
import { formatUsdCents } from '@/lib/format/price'

const CURRENT_YEAR = '2026'
const COMPARISON_LAST_REVIEWED = 'August 2026'

export interface ComparisonCaveats {
    doorFit: string
    protocol: string
    price: string
    region: string
    model: string
}

export interface ComparisonEvidence {
    lastVerified: string
    sourceBoundary: string
    dataLimitations: string
}

export interface ComparisonSeoProfile {
    title: string
    description: string
    subtitle: string
    verdict: string
    angle: string
    commercialIntent: CommercialIntentBlock[]
    calculatorPathways: CalculatorPathway[]
    chooseReasons: {
        brand1: string[]
        brand2: string[]
    }
    caveats: ComparisonCaveats
    evidence: ComparisonEvidence
    faq: { question: string; answer: string }
}

type ComparisonSeoOverride = Partial<Omit<ComparisonSeoProfile, 'chooseReasons' | 'caveats' | 'evidence'>> & {
    choiceReasons?: Record<string, string[]>
    caveats?: Partial<ComparisonCaveats>
    evidence?: Partial<ComparisonEvidence>
}

function getComparisonPairKey(brand1: Brand, brand2: Brand): string {
    return [brand1.slug, brand2.slug].sort().join('-')
}

function getPriceRange(products: ProductWithBrand[]): string {
    const prices = products.filter(p => p.price_usd).map(p => p.price_usd!)
    if (prices.length === 0) return 'N/A'
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    if (min === max) return formatUsdCents(min)
    return `${formatUsdCents(min)} - ${formatUsdCents(max)}`
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

function getBrandChoiceReasons(brand: Brand, products: ProductWithBrand[]): string[] {
    const protocols = getProtocols(products)
    const protocolsText = protocols.length > 0 ? protocols.join(' or ') : 'model-specific protocol'
    const keypadCount = products.filter(product => product.has_keypad).length
    const fingerprintCount = products.filter(product => product.has_fingerprint).length
    const matterCount = products.filter(product => product.supports_matter).length
    const priceRange = getPriceRange(products)
    const reasons = [
        `You already need ${protocolsText} support and can validate the exact hub or bridge requirement on a model page.`,
        priceRange === 'N/A'
            ? `${brand.name} fits your shortlist only if current retailer pricing, availability, and warranty terms check out.`
            : `Your visible hardware budget fits the current ${priceRange} catalog range before batteries, hub, or installation cost.`,
        keypadCount + fingerprintCount + matterCount > 0
            ? `${brand.name} has catalog evidence for ${keypadCount} keypad model${keypadCount === 1 ? '' : 's'}, ${fingerprintCount} fingerprint model${fingerprintCount === 1 ? '' : 's'}, and ${matterCount} Matter model${matterCount === 1 ? '' : 's'}.`
            : `${brand.name} should be treated as a model-level shortlist because access features are limited or uneven in this catalog.`,
    ]

    return reasons
}

function getGenericCaveats(
    brand1: Brand,
    brand2: Brand,
    products1: ProductWithBrand[],
    products2: ProductWithBrand[]
): ComparisonCaveats {
    const sharedProtocols = getSharedProtocols(products1, products2)
    const price1 = getPriceRange(products1)
    const price2 = getPriceRange(products2)

    return {
        doorFit: `${brand1.name} and ${brand2.name} both need model-level checks for bore size, backset, door thickness, handing, and whether the lock is a deadbolt, lever, knob, or retrofit unit.`,
        protocol: sharedProtocols.length > 0
            ? `Both brands show ${sharedProtocols.join(', ')} coverage in this catalog, but hub, bridge, Matter, Thread, Z-Wave, Zigbee, Wi-Fi, and Bluetooth support still varies by exact model.`
            : `The current catalog does not show a shared protocol set for every model, so do not assume ${brand1.name} and ${brand2.name} will work on the same hub.`,
        price: `${brand1.name} is listed at ${price1}; ${brand2.name} is listed at ${price2}. Retail price, bundles, keypad add-ons, bridge cost, and installation can change the real ownership cost.`,
        region: `Regional availability, app support, warranty, lock cylinder format, and retailer inventory can change the better choice even when the catalog comparison looks close.`,
        model: `This is a brand-level comparison. Use the top model matchup and product pages before choosing a specific SKU for a primary exterior door.`,
    }
}

function getGenericEvidence(): ComparisonEvidence {
    return {
        lastVerified: COMPARISON_LAST_REVIEWED,
        sourceBoundary: 'Uses SLockHub catalog fields for active models, listed price, protocols, battery life, access features, security fields, and door-fit measurements where available.',
        dataLimitations: 'Missing catalog fields are treated as unknown, not negative. Verify retailer price, exact SKU, region, warranty, firmware support, and door dimensions before purchase.',
    }
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
        chooseReasons: {
            brand1: getBrandChoiceReasons(brand1, products1),
            brand2: getBrandChoiceReasons(brand2, products2),
        },
        caveats: getGenericCaveats(brand1, brand2, products1, products2),
        evidence: getGenericEvidence(),
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
        choiceReasons: {
            nuki: [
                'Choose Nuki when broad European retrofit familiarity, Matter or Thread options, and bridge-free or bridge-light setup are more important than the smallest lock body.',
                'Nuki is the better shortlist when your existing cylinder and door hardware match its retrofit installation path.',
                'Nuki fits buyers who want a larger ecosystem of accessories, integrations, and regional support checks before installation.',
            ],
            tedee: [
                'Choose Tedee when compact hardware, premium cylinder workflows, and a polished European retrofit experience matter most.',
                'Tedee is stronger if you are already planning a bridge-backed setup for remote access, guest management, or Matter exposure.',
                'Tedee fits buyers who will verify cylinder compatibility first and then optimize for quiet, compact daily use.',
            ],
        },
        caveats: {
            doorFit: 'Nuki and Tedee are both retrofit-first decisions, so cylinder type, thumb-turn clearance, escutcheon space, and regional door hardware matter more than generic smart-lock specs.',
            region: 'Both brands are strongest in European buying contexts; availability, cylinders, bridges, and support can differ sharply outside the primary supported regions.',
            model: 'Do not compare only the flagship devices. Check whether the chosen model needs a bridge, keypad, cylinder bundle, or separate accessory to match your workflow.',
        },
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
        choiceReasons: {
            kwikset: [
                'Choose Kwikset when you need mainstream smart deadbolt coverage, keypad options, and rekey-friendly residential hardware.',
                'Kwikset is the stronger shortlist when support confidence and model depth matter more than the lowest hardware-store price.',
                'Kwikset fits homeowners comparing budget and mid-range deadbolts before checking door prep and SmartKey expectations.',
            ],
            defiant: [
                'Choose Defiant when the project is price-sensitive and you can verify the exact Hubspace or keypad model before buying.',
                'Defiant can fit basic replacement or lower-risk doors where budget control is more important than deep smart-lock ecosystem support.',
                'Defiant needs a stricter model check for app support, security grade, warranty, and long-term availability.',
            ],
        },
        caveats: {
            price: 'Kwikset often wins on smart-lock depth, while Defiant can win on entry price. Include hub, keypad, batteries, installation, and replacement risk before deciding.',
            model: 'Some Defiant options are basic hardware or narrow smart-home fits; confirm the exact Hubspace, Wi-Fi, Bluetooth, keypad, and grade fields before comparing against Kwikset.',
        },
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
        choiceReasons: {
            schlage: [
                'Choose Schlage for a primary exterior door when security confidence, brand support, and smart deadbolt depth matter most.',
                'Schlage is the safer shortlist when you need clearer grade signals, keypad options, and long-term homeowner support.',
                'Schlage fits rental or family doors where durability and access control carry more weight than the lowest upfront price.',
            ],
            defiant: [
                'Choose Defiant only when budget control is the main constraint and the exact model meets your app, keypad, and door-fit needs.',
                'Defiant can fit secondary doors or basic replacement projects after verifying security grade and warranty expectations.',
                'Defiant needs a stricter retailer and SKU check because the brand-level comparison does not guarantee smart feature parity.',
            ],
        },
        caveats: {
            price: 'Defiant can look cheaper at checkout, but Schlage may reduce replacement risk on higher-traffic exterior doors. Model total cost before treating price as the winner.',
            model: 'Avoid treating all Defiant hardware as equivalent to a Schlage smart deadbolt; verify exact grade, app support, keypad workflow, and door prep.',
        },
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
        choiceReasons: {
            veise: [
                'Choose Veise when a lower-cost keypad or fingerprint lock is acceptable and you will verify app, battery, warranty, and door-fit details model by model.',
                'Veise is a practical shortlist for budget convenience doors where fingerprint and keypad access matter more than premium brand depth.',
                'Veise fits buyers willing to check exact SKU support and installation requirements before using it on a primary exterior door.',
            ],
            schlage: [
                'Choose Schlage when security confidence, established support, and long-term exterior-door use matter more than upfront savings.',
                'Schlage is the stronger shortlist for family, rental, or high-traffic doors where grade signals and app ecosystem maturity reduce risk.',
                'Schlage fits buyers who want a conservative deadbolt decision before comparing price, keypad, and protocol details.',
            ],
        },
        caveats: {
            price: 'Veise can win on visible entry price, but Schlage can be the lower-risk choice when replacement, support, and exterior-door reliability are included.',
            model: 'This pair is easy to confuse with Schlage vs Weiser. Confirm that the query is about Veise before applying budget-brand conclusions.',
        },
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
        choiceReasons: {
            schlage: [
                'Choose Schlage when premium deadbolt security, broad US availability, and established smart-lock support are the main requirements.',
                'Schlage is the stronger shortlist for exterior doors where grade confidence and long-term app or keypad support matter.',
                'Schlage fits buyers who want a conservative security-led decision before checking price, protocol, and door prep.',
            ],
            weiser: [
                'Choose Weiser when Canadian availability, SmartKey-style rekeying expectations, or local pricing make the exact model more practical.',
                'Weiser is a better shortlist when the model you can buy locally matches your door prep and access workflow.',
                'Weiser fits buyers who need to compare regional support and retailer inventory before treating Schlage as the default.',
            ],
        },
        caveats: {
            region: 'Schlage and Weiser availability can differ by US and Canadian retail channels. Compare local SKUs, warranty terms, and rekeying expectations before choosing.',
            model: 'Do not treat Weiser as a simple Schlage substitute. Compare exact Halo, Encode, keypad, fingerprint, and deadbolt models.',
        },
        faq: {
            question: 'Is Schlage or Weiser better for smart deadbolts and keypad locks?',
            answer: 'Schlage is usually the stronger pick for security-led smart deadbolts and broader premium smart lock recognition. Weiser can be a practical choice in regions where its models, rekeying options, or pricing fit better. Compare exact models before deciding.',
        },
    },
    'kwikset-schlage': {
        title: `Kwikset vs Schlage Smart Locks: Security, Rekeying & Price ${CURRENT_YEAR}`,
        description: 'Kwikset vs Schlage compared by deadbolt security, SmartKey/rekeying context, keypad access, protocol support, price, battery, and door fit.',
        subtitle: 'Compare two mainstream US smart lock brands by security confidence, rekeying needs, keypad workflows, price range, protocol support, and model-level fit.',
        verdict: 'Schlage is usually the security-led default; Kwikset can be the practical pick when rekeying convenience, price, and mainstream residential hardware matter more.',
        angle: 'This matchup is a mainstream residential deadbolt decision. Use Schlage as the conservative security benchmark and Kwikset as the rekeying/value benchmark, then validate the exact model, protocol, and door prep.',
        choiceReasons: {
            kwikset: [
                'Choose Kwikset when rekeying convenience, mainstream residential availability, and value-priced keypad deadbolts are central to the decision.',
                'Kwikset is a strong shortlist when SmartKey expectations and replacement-door practicality matter more than premium positioning.',
                'Kwikset fits buyers who will compare exact model support for Wi-Fi, Z-Wave, Matter, keypad, and battery requirements.',
            ],
            schlage: [
                'Choose Schlage when security confidence, exterior-door durability, and long-term app or keypad support are the higher priorities.',
                'Schlage is the stronger shortlist for primary entrances, rentals, or family homes where lock reputation reduces decision risk.',
                'Schlage fits buyers who want a conservative security-first pick before optimizing for price or rekeying convenience.',
            ],
        },
        caveats: {
            price: 'Kwikset can be more value-oriented, while Schlage can justify a higher price on high-risk doors. Compare total ownership cost, not only shelf price.',
            model: 'The winning brand changes by model family. Compare Encode, Encode Plus, Halo, SmartCode, Obsidian, or Matter variants before deciding.',
        },
        faq: {
            question: 'Is Kwikset or Schlage better for a smart deadbolt?',
            answer: 'Schlage is usually the safer security-led shortlist for a primary exterior door. Kwikset can be the better practical choice when rekeying convenience, local availability, and value pricing matter. The final answer depends on the exact model, protocol, door prep, and support expectations.',
        },
    },
    'august-tedee': {
        title: `Tedee vs August Smart Locks: Retrofit, Region & Battery ${CURRENT_YEAR}`,
        description: 'Tedee vs August compared for European cylinder retrofit, North American deadbolt retrofit, bridge needs, app access, guest codes, battery, and rental fit.',
        subtitle: 'Compare Tedee and August when the real decision is European cylinder retrofit versus North American deadbolt retrofit workflows.',
        verdict: 'Tedee is usually the better European-cylinder retrofit shortlist; August is usually the better North American deadbolt retrofit shortlist.',
        angle: 'Tedee vs August is less about one universal winner and more about door geography. Start with cylinder or deadbolt compatibility, then compare bridge needs, app workflows, battery, and guest-access support.',
        choiceReasons: {
            tedee: [
                'Choose Tedee when your door uses a compatible European cylinder and compact retrofit hardware is the main requirement.',
                'Tedee is stronger for buyers who want a premium cylinder workflow and will verify bridge, keypad, and Matter requirements before installing.',
                'Tedee fits European apartments and retrofits where exterior hardware changes are limited or undesirable.',
            ],
            august: [
                'Choose August when you have a compatible North American deadbolt and want to keep the outside hardware mostly unchanged.',
                'August is stronger for rental, guest-code, and app-access workflows where North American availability and accessories are easier to support.',
                'August fits buyers who prioritize retrofit installation over replacing the full lock body.',
            ],
        },
        caveats: {
            doorFit: 'Tedee and August solve different retrofit formats. Confirm European cylinder versus North American deadbolt compatibility before comparing price or apps.',
            region: 'Tedee is strongest in European-cylinder contexts; August is strongest in North American deadbolt contexts. Regional support can decide the winner.',
            model: 'Bridge, keypad, Matter, HomeKit, and remote-access requirements vary by accessory bundle, so compare the installed system instead of only the lock body.',
        },
        faq: {
            question: 'Is Tedee or August better for a retrofit smart lock?',
            answer: 'Tedee is usually better for compatible European-cylinder doors, while August is usually better for compatible North American deadbolts. Treat door format and regional support as the first decision, then compare app workflows, bridge needs, battery life, and guest access.',
        },
    },
    'samsung-xiaomi': {
        title: `Samsung vs Xiaomi Smart Locks: Fingerprint, Region & Ecosystem ${CURRENT_YEAR}`,
        description: 'Samsung vs Xiaomi smart locks compared by fingerprint access, push-pull hardware, app ecosystem, region, door prep, price, battery, and model availability.',
        subtitle: 'Compare Samsung and Xiaomi smart locks for buyers weighing fingerprint access, push-pull designs, Asian-market availability, ecosystem fit, and door compatibility.',
        verdict: 'Samsung is usually the safer shortlist when SmartThings-style ecosystem familiarity and premium push-pull hardware matter; Xiaomi is compelling when Mi Home, value pricing, and advanced fingerprint or camera features fit your region.',
        angle: 'Samsung vs Xiaomi is a region and ecosystem comparison first. Check local model availability, door thickness, push-pull prep, app region, fingerprint workflow, and support before treating either brand as a universal winner.',
        choiceReasons: {
            samsung: [
                'Choose Samsung when premium push-pull hardware, fingerprint entry, and SmartThings-style ecosystem familiarity fit your region.',
                'Samsung is stronger when local installer familiarity and a conservative premium shortlist matter more than lowest price.',
                'Samsung fits buyers who can verify exact SHP or regional model availability before comparing against Xiaomi.',
            ],
            xiaomi: [
                'Choose Xiaomi when Mi Home integration, value pricing, fingerprint access, NFC or camera-heavy models, and local availability are stronger.',
                'Xiaomi is compelling when the exact model supports your door thickness, app region, and preferred ecosystem.',
                'Xiaomi fits buyers who are comfortable validating regional firmware, retailer warranty, and model naming before purchase.',
            ],
        },
        caveats: {
            doorFit: 'Samsung and Xiaomi push-pull and fingerprint locks can require different door prep than a North American deadbolt. Check thickness, mortise format, handing, and installer requirements.',
            protocol: 'Ecosystem support is region-sensitive. Verify SmartThings, Mi Home, Apple Home, Matter, Wi-Fi, Bluetooth, and local app-region behavior on the exact model.',
            region: 'Regional availability is a primary decision factor for Samsung and Xiaomi. Imported models can create warranty, app-region, language, or installer support gaps.',
            model: 'Model names can vary by market. Compare the exact SKU, not just the brand, before relying on fingerprint, camera, NFC, or remote-access claims.',
        },
        faq: {
            question: 'Is Samsung or Xiaomi better for a fingerprint smart lock?',
            answer: 'Samsung is usually the more conservative premium shortlist where supported models and SmartThings-style workflows are available. Xiaomi can be stronger for value, Mi Home users, and feature-heavy fingerprint or camera models. The right answer depends on region, exact model, app support, and door prep.',
        },
    },
    'lockly-schlage': {
        title: `Lockly vs Schlage Smart Locks: Fingerprint, Security & Price ${CURRENT_YEAR}`,
        description: 'Lockly vs Schlage compared by fingerprint access, keypad design, security grade, app workflows, price, battery planning, and exterior-door fit.',
        subtitle: 'Compare Lockly and Schlage for buyers weighing biometric convenience, keypad design, security confidence, protocol support, and primary-door reliability.',
        verdict: 'Schlage is usually the safer security-led exterior-door shortlist; Lockly is compelling when fingerprint access, PIN shielding, and feature-rich convenience matter more.',
        angle: 'This pair is a security-confidence versus biometric-convenience decision. Use Schlage as the conservative deadbolt benchmark and Lockly as the advanced-access benchmark, then compare exact model grade, keypad, fingerprint, protocol, and door fit.',
        choiceReasons: {
            lockly: [
                'Choose Lockly when fingerprint access, PIN Genie-style keypad privacy, and feature-rich daily entry are central to the decision.',
                'Lockly is stronger when convenience and biometric access matter more than choosing the most conservative security brand.',
                'Lockly fits buyers who will verify exact model grade, battery, Wi-Fi or hub requirements, and door prep before using it on a primary entrance.',
            ],
            schlage: [
                'Choose Schlage when primary-door security confidence, established support, and conservative deadbolt selection matter most.',
                'Schlage is stronger for family, rental, or high-traffic exterior doors where long-term durability and grade signals reduce risk.',
                'Schlage fits buyers who prefer keypad and app maturity over biometric-heavy feature sets.',
            ],
        },
        caveats: {
            protocol: 'Lockly and Schlage model families vary by Wi-Fi, Bluetooth, Z-Wave, and ecosystem support. Confirm the exact hub or app path before comparing features.',
            price: 'Lockly convenience features can increase hardware cost; Schlage can cost more for premium security-led models. Include installation, batteries, accessories, and support risk.',
            model: 'Compare exact fingerprint, keypad, deadbolt, lever, and grade fields. Do not treat all Lockly or Schlage models as equivalent.',
        },
        faq: {
            question: 'Is Lockly or Schlage better for a smart front door lock?',
            answer: 'Schlage is usually the safer front-door shortlist when security confidence and established support matter most. Lockly can be better when fingerprint access, keypad privacy, and advanced convenience features are priorities. The final decision depends on exact model grade, protocol, door fit, and fallback access.',
        },
    },
    'eufy-simplisafe': {
        title: `Eufy vs SimpliSafe Smart Locks: Ecosystem, Security & Door Fit ${CURRENT_YEAR}`,
        description: 'Eufy vs SimpliSafe compared by smart lock ecosystem, security cameras or alarm fit, keypad access, app control, price, battery, and door compatibility.',
        subtitle: 'Compare Eufy and SimpliSafe when the real choice is camera-first smart-home hardware versus alarm-system integration and monitored-security workflows.',
        verdict: 'Eufy is usually the stronger shortlist for camera-first and device-rich smart-home buyers; SimpliSafe is mainly compelling when the lock must fit a SimpliSafe security-system workflow.',
        angle: 'This comparison is about ecosystem ownership more than one lock spec. Start with whether your home is built around Eufy cameras/devices or a SimpliSafe alarm plan, then compare keypad, battery, app, door fit, and backup access.',
        choiceReasons: {
            eufy: [
                'Choose Eufy when you already use Eufy cameras or want a device-rich smart-home ecosystem around the door.',
                'Eufy is stronger for buyers comparing fingerprint, keypad, video, and local-device convenience before choosing a lock.',
                'Eufy fits homes where smart-home features matter more than alarm-system standardization.',
            ],
            simplisafe: [
                'Choose SimpliSafe when the lock needs to work inside a SimpliSafe security-system workflow and account model.',
                'SimpliSafe is stronger when alarm integration, central app control, and security-system consistency matter more than feature breadth.',
                'SimpliSafe fits buyers who will verify subscription, monitoring, and exact lock compatibility before buying.',
            ],
        },
        caveats: {
            protocol: 'Treat ecosystem compatibility as the first filter. Eufy and SimpliSafe workflows can differ by app, account, monitoring, device pairing, and remote-control expectations.',
            price: 'Compare hardware price with any subscription, monitoring, camera, alarm, or accessory cost before calling one ecosystem cheaper.',
            model: 'Verify the exact lock, keypad, camera, hub, bridge, and account requirements. Brand ecosystem fit does not guarantee every access feature.',
        },
        faq: {
            question: 'Is Eufy or SimpliSafe better for smart lock security?',
            answer: 'Eufy is often better for buyers who want a camera-first smart-home device ecosystem. SimpliSafe is better when the lock needs to fit a SimpliSafe alarm or monitoring workflow. Check exact lock compatibility, subscription requirements, app behavior, backup access, and door fit before choosing.',
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
    const { choiceReasons, caveats, evidence, ...profileOverride } = override || {}

    return {
        ...genericProfile,
        ...profileOverride,
        chooseReasons: {
            brand1: choiceReasons?.[brand1.slug] || genericProfile.chooseReasons.brand1,
            brand2: choiceReasons?.[brand2.slug] || genericProfile.chooseReasons.brand2,
        },
        caveats: {
            ...genericProfile.caveats,
            ...caveats,
        },
        evidence: {
            ...genericProfile.evidence,
            ...evidence,
        },
        faq: profileOverride.faq || genericProfile.faq,
    }
}
