export interface PriorityComparisonLink {
    href: string
    title: string
    detail: string
    slugs: readonly [string, string]
    themes: readonly string[]
    source: 'gsc' | 'silo'
}

export const priorityComparisonLinks: PriorityComparisonLink[] = [
    {
        href: '/compare/schlage-vs-weiser',
        title: 'Schlage vs Weiser',
        detail: 'Security-led US and Canada deadbolt comparison with rekeying, keypad, price, and door-fit checks.',
        slugs: ['schlage', 'weiser'],
        themes: ['security', 'north-america', 'rekeying'],
        source: 'gsc',
    },
    {
        href: '/compare/schlage-vs-defiant',
        title: 'Schlage vs Defiant',
        detail: 'Premium security versus budget hardware-store locks for exterior doors, rentals, and replacement projects.',
        slugs: ['schlage', 'defiant'],
        themes: ['security', 'budget', 'residential'],
        source: 'gsc',
    },
    {
        href: '/compare/kwikset-vs-defiant',
        title: 'Kwikset vs Defiant',
        detail: 'Budget residential comparison for keypad access, rekeying, Hubspace, price, and basic smart features.',
        slugs: ['kwikset', 'defiant'],
        themes: ['budget', 'rekeying', 'residential'],
        source: 'gsc',
    },
    {
        href: '/compare/nuki-vs-tedee',
        title: 'Nuki vs Tedee',
        detail: 'European retrofit comparison for cylinder fit, compact hardware, app workflows, bridges, and battery planning.',
        slugs: ['nuki', 'tedee'],
        themes: ['retrofit', 'europe', 'rental'],
        source: 'gsc',
    },
    {
        href: '/compare/kwikset-vs-schlage',
        title: 'Kwikset vs Schlage',
        detail: 'Mainstream US deadbolt comparison for security grade, SmartKey, keypad models, price, and support confidence.',
        slugs: ['kwikset', 'schlage'],
        themes: ['security', 'rekeying', 'residential'],
        source: 'gsc',
    },
    {
        href: '/compare/samsung-vs-xiaomi',
        title: 'Samsung vs Xiaomi',
        detail: 'Asian-market push-pull and fingerprint lock comparison covering ecosystems, region, door prep, and model availability.',
        slugs: ['samsung', 'xiaomi'],
        themes: ['fingerprint', 'region', 'ecosystem'],
        source: 'gsc',
    },
    {
        href: '/compare/tedee-vs-august',
        title: 'Tedee vs August',
        detail: 'European cylinder retrofit versus North American deadbolt retrofit workflows, bridges, battery, and rental fit.',
        slugs: ['tedee', 'august'],
        themes: ['retrofit', 'rental', 'region'],
        source: 'gsc',
    },
    {
        href: '/compare/veise-vs-schlage',
        title: 'Veise vs Schlage',
        detail: 'Budget fingerprint/keypad locks versus established security-led deadbolts for primary exterior doors.',
        slugs: ['veise', 'schlage'],
        themes: ['budget', 'security', 'fingerprint'],
        source: 'gsc',
    },
    {
        href: '/compare/lockly-vs-schlage',
        title: 'Lockly vs Schlage',
        detail: 'Fingerprint, keypad, security-grade, app workflow, and exterior-door confidence comparison for premium buyers.',
        slugs: ['lockly', 'schlage'],
        themes: ['security', 'fingerprint', 'premium'],
        source: 'gsc',
    },
    {
        href: '/compare/eufy-vs-simplisafe',
        title: 'Eufy vs SimpliSafe',
        detail: 'Security-camera ecosystem versus alarm-system ecosystem comparison for smart lock and home-security buyers.',
        slugs: ['eufy', 'simplisafe'],
        themes: ['security', 'ecosystem', 'residential'],
        source: 'gsc',
    },
    {
        href: '/compare/schlage-vs-yale',
        title: 'Schlage vs Yale',
        detail: 'Premium keypad and rental-property comparison for buyers choosing a standard smart deadbolt platform.',
        slugs: ['schlage', 'yale'],
        themes: ['security', 'rental', 'residential'],
        source: 'silo',
    },
    {
        href: '/compare/yale-vs-august',
        title: 'Yale vs August',
        detail: 'Deadbolt replacement versus retrofit workflows for Wi-Fi, HomeKit, guest access, and host operations.',
        slugs: ['yale', 'august'],
        themes: ['retrofit', 'rental', 'homekit'],
        source: 'silo',
    },
    {
        href: '/compare/aqara-vs-yale',
        title: 'Aqara vs Yale',
        detail: 'Matter, Apple Home, fingerprint, and ecosystem comparison for smart-home buyers shortlisting connected locks.',
        slugs: ['aqara', 'yale'],
        themes: ['matter', 'homekit', 'fingerprint'],
        source: 'silo',
    },
    {
        href: '/compare/nuki-vs-switchbot',
        title: 'Nuki vs SwitchBot',
        detail: 'Retrofit smart lock comparison for renters, minimal door changes, bridges, Matter, and battery expectations.',
        slugs: ['nuki', 'switchbot'],
        themes: ['retrofit', 'rental', 'matter'],
        source: 'silo',
    },
]

const comparisonFallbackBrandOrder = [
    'yale',
    'august',
    'schlage',
    'kwikset',
    'aqara',
    'level',
    'ultraloq',
    'lockly',
    'eufy',
    'switchbot',
    'wyze',
    'nuki',
    'samsung',
    'simplisafe',
    'defiant',
    'weiser',
    'veise',
    'tedee',
    'xiaomi',
]

const comparisonFallbackBrandRank = new Map(
    comparisonFallbackBrandOrder.map((slug, index) => [slug, index])
)

const fallbackCompareCandidates = [
    'schlage',
    'yale',
    'august',
    'kwikset',
    'eufy',
]

function formatBrandName(slug: string): string {
    if (slug === 'eufy') return 'Eufy'
    return slug
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
}

function normalizeHref(href: string): string {
    return href.endsWith('/') && href !== '/' ? href.slice(0, -1) : href
}

function getCompareSlugsFromHref(href: string): readonly [string, string] | null {
    const normalized = normalizeHref(href).replace(/^https?:\/\/[^/]+/, '')
    const match = normalized.match(/^\/compare\/(.+)-vs-(.+)$/)
    if (!match) return null
    return [match[1], match[2]]
}

export function getComparisonPairKey(slugs: readonly string[]): string {
    return [...slugs].sort().join('::')
}

function orderComparisonSlugs(slug1: string, slug2: string): readonly [string, string] {
    const rank1 = comparisonFallbackBrandRank.get(slug1)
    const rank2 = comparisonFallbackBrandRank.get(slug2)

    if (rank1 != null && rank2 != null && rank1 !== rank2) {
        return rank1 < rank2 ? [slug1, slug2] : [slug2, slug1]
    }
    if (rank1 != null && rank2 == null) return [slug1, slug2]
    if (rank1 == null && rank2 != null) return [slug2, slug1]

    return slug1.localeCompare(slug2) <= 0 ? [slug1, slug2] : [slug2, slug1]
}

const priorityComparisonHrefByPair = new Map(
    priorityComparisonLinks.map(link => [getComparisonPairKey(link.slugs), normalizeHref(link.href)])
)

export function getCanonicalComparisonHref(slug1: string, slug2: string): string {
    const priorityHref = priorityComparisonHrefByPair.get(getComparisonPairKey([slug1, slug2]))
    if (priorityHref) return priorityHref

    const [first, second] = orderComparisonSlugs(slug1, slug2)
    return `/compare/${first}-vs-${second}`
}

function uniqueByComparisonPair(links: PriorityComparisonLink[]): PriorityComparisonLink[] {
    const seenPairs = new Set<string>()
    const seenHrefs = new Set<string>()
    return links.filter((link) => {
        const href = normalizeHref(link.href)
        const pairKey = getComparisonPairKey(link.slugs)
        if (seenPairs.has(pairKey) || seenHrefs.has(href)) return false
        seenPairs.add(pairKey)
        seenHrefs.add(href)
        return true
    })
}

export function getRelatedComparisonLinks(brandSlugs: string[], currentHref: string, limit = 8): PriorityComparisonLink[] {
    const current = normalizeHref(currentHref)
    const currentPair = getCompareSlugsFromHref(current)
    const currentPairKey = currentPair ? getComparisonPairKey(currentPair) : null
    const brandSet = new Set(brandSlugs)
    const currentThemes = new Set(
        priorityComparisonLinks
            .filter(link => normalizeHref(link.href) === current || (currentPairKey && getComparisonPairKey(link.slugs) === currentPairKey))
            .flatMap(link => link.themes)
    )

    const sameBrand = priorityComparisonLinks.filter(link => (
        normalizeHref(link.href) !== current
        && (!currentPairKey || getComparisonPairKey(link.slugs) !== currentPairKey)
        && link.slugs.some(slug => brandSet.has(slug))
    ))
    const sameTheme = priorityComparisonLinks.filter(link => (
        normalizeHref(link.href) !== current
        && (!currentPairKey || getComparisonPairKey(link.slugs) !== currentPairKey)
        && !link.slugs.some(slug => brandSet.has(slug))
        && link.themes.some(theme => currentThemes.has(theme))
    ))

    return uniqueByComparisonPair([...sameBrand, ...sameTheme]).slice(0, limit)
}

export function getBrandComparisonLinks(brandSlug: string, limit = 3): PriorityComparisonLink[] {
    const directLinks = priorityComparisonLinks.filter(link => link.slugs.includes(brandSlug))
    if (directLinks.length >= limit) return uniqueByComparisonPair(directLinks).slice(0, limit)

    const directPairKeys = new Set(directLinks.map(link => getComparisonPairKey(link.slugs)))
    const fallbackLinks = fallbackCompareCandidates
        .filter(candidate => candidate !== brandSlug && !directPairKeys.has(getComparisonPairKey([brandSlug, candidate])))
        .map((candidate) => {
            const href = getCanonicalComparisonHref(brandSlug, candidate)
            const slugs = getCompareSlugsFromHref(href) || [brandSlug, candidate]

            return {
                href,
                title: `${formatBrandName(slugs[0])} vs ${formatBrandName(slugs[1])}`,
                detail: 'Compare protocol coverage, price bands, access features, battery evidence, and door fit.',
                slugs,
                themes: ['fallback'],
                source: 'silo' as const,
            }
        })

    return uniqueByComparisonPair([...directLinks, ...fallbackLinks]).slice(0, limit)
}
