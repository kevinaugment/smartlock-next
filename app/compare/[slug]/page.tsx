import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { CheckCircle, ArrowRight, GitCompareArrows, Shield, Wifi, Battery, DollarSign, Fingerprint, Star } from 'lucide-react'
import { BrandModel, ProductModel, type Brand, type ProductWithBrand } from '@/lib/db/brand-models'
import { SeoPathways } from '@/components/seo/SeoPathways'
import { ReportLeadCapture } from '@/components/seo/ReportLeadCapture'

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

// ============================================
// 类型
// ============================================

interface ComparisonData {
    brand1: Brand
    brand2: Brand
    products1: ProductWithBrand[]
    products2: ProductWithBrand[]
}

const CURRENT_YEAR = '2026'
const getBrandsForComparison = cache(() => BrandModel.getAll())
const getProductsForComparison = cache(() => ProductModel.getAllForComparison())

// ============================================
// 数据获取
// ============================================

function parseBrandSlugs(slug: string): { slug1: string; slug2: string } | null {
    const match = slug.match(/^(.+)-vs-(.+)$/)
    if (!match) return null

    // 尝试不同的分割点（因为品牌 slug 可能包含连字符）
    const full = slug
    const vsIndex = full.indexOf('-vs-')
    if (vsIndex === -1) return null

    return {
        slug1: full.substring(0, vsIndex),
        slug2: full.substring(vsIndex + 4),
    }
}

async function getComparisonData(slug: string): Promise<ComparisonData | null> {
    const parsed = parseBrandSlugs(slug)
    if (!parsed) return null

    const [brands, products] = await Promise.all([
        getBrandsForComparison(),
        getProductsForComparison(),
    ])

    const brand1 = brands.find((brand) => brand.slug === parsed.slug1)
    const brand2 = brands.find((brand) => brand.slug === parsed.slug2)

    if (!brand1 || !brand2) return null

    const products1 = products.filter((product) => product.brand_slug === parsed.slug1)
    const products2 = products.filter((product) => product.brand_slug === parsed.slug2)

    return { brand1, brand2, products1, products2 }
}

// ============================================
// Metadata + Static Params
// ============================================

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const data = await getComparisonData(slug)
    if (!data) return { title: 'Smart Lock Comparison — SLockHub.com' }

    const { brand1, brand2, products1, products2 } = data
    const price1 = getPriceRange(products1)
    const price2 = getPriceRange(products2)
    const title = `${brand1.name} vs ${brand2.name} Smart Locks (${CURRENT_YEAR}) | SLockHub`
    const description = `Compare ${brand1.name} vs ${brand2.name} smart locks by price (${price1} vs ${price2}), protocol support, battery life, security features, and best-fit use case.`

    return {
        title,
        description,
        alternates: { canonical: `/compare/${slug}` },
        openGraph: {
            title,
            description,
            siteName: 'SLockHub.com',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    }
}

export async function generateStaticParams() {
    try {
        const brands = await getBrandsForComparison()
        const params: { slug: string }[] = []

        for (let i = 0; i < brands.length; i++) {
            for (let j = i + 1; j < brands.length; j++) {
                params.push({ slug: `${brands[i].slug}-vs-${brands[j].slug}` })
            }
        }

        return params
    } catch {
        return []
    }
}

// ============================================
// 辅助函数
// ============================================

function getAvgRating(products: ProductWithBrand[]): number {
    if (products.length === 0) return 0
    return products.reduce((sum, p) => sum + p.rating, 0) / products.length
}

function getPriceRange(products: ProductWithBrand[]): string {
    const prices = products.filter(p => p.price_usd).map(p => p.price_usd!)
    if (prices.length === 0) return 'N/A'
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    if (min === max) return `$${min}`
    return `$${min} – $${max}`
}

function getLowestPrice(products: ProductWithBrand[]): number | null {
    const prices = products.filter(p => p.price_usd).map(p => p.price_usd!)
    if (prices.length === 0) return null
    return Math.min(...prices)
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

function getSecuritySummary(products: ProductWithBrand[]): string {
    const ansiGrades = Array.from(new Set(products.map(p => p.ansi_grade).filter(Boolean)))
    const ulCount = products.filter(p => p.ul_listed).length
    const encryptedCount = products.filter(p => p.encryption_type).length
    const parts = [
        ansiGrades.length > 0 ? `ANSI/BHMA ${ansiGrades.map(grade => `Grade ${grade}`).join(', ')}` : null,
        ulCount > 0 ? `${ulCount} UL-listed model${ulCount === 1 ? '' : 's'}` : null,
        encryptedCount > 0 ? `${encryptedCount} model${encryptedCount === 1 ? '' : 's'} with encryption details` : null,
    ].filter(Boolean)
    return parts.join('; ') || 'Security certification data is limited in the current catalog.'
}

function getDoorFitCoverage(products: ProductWithBrand[]): string {
    const fitCount = products.filter(p => p.door_thickness_min_mm || p.bore_diameter_mm || p.backset_mm).length
    if (fitCount === 0) return 'Door-fit specs are limited; verify measurements on each model page.'
    return `${fitCount} model${fitCount === 1 ? '' : 's'} include door-fit measurements.`
}

function getAvgBatteryLife(products: ProductWithBrand[]): string {
    const months = products.filter(p => p.battery_life_months).map(p => p.battery_life_months!)
    if (months.length === 0) return 'N/A'
    const avg = Math.round(months.reduce((a, b) => a + b, 0) / months.length)
    return `${avg} months avg`
}

function hasFeature(products: ProductWithBrand[], feature: 'has_fingerprint' | 'has_keypad'): boolean {
    return products.some(p => p[feature])
}

function getBetterRatedBrand(brand1: Brand, brand2: Brand, products1: ProductWithBrand[], products2: ProductWithBrand[]): Brand | null {
    const avg1 = getAvgRating(products1)
    const avg2 = getAvgRating(products2)
    if (Math.abs(avg1 - avg2) < 0.1) return null
    return avg1 > avg2 ? brand1 : brand2
}

function getLowerPricedBrand(brand1: Brand, brand2: Brand, products1: ProductWithBrand[], products2: ProductWithBrand[]): Brand | null {
    const min1 = getLowestPrice(products1)
    const min2 = getLowestPrice(products2)
    if (min1 == null || min2 == null || min1 === min2) return null
    return min1 < min2 ? brand1 : brand2
}

function getBestModel(products: ProductWithBrand[]): ProductWithBrand | null {
    return [...products].sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating
        if (b.review_count !== a.review_count) return b.review_count - a.review_count
        return a.display_order - b.display_order
    })[0] || null
}

function getAverageBatteryMonths(products: ProductWithBrand[]): number | null {
    const months = products.filter(p => p.battery_life_months).map(p => p.battery_life_months!)
    if (months.length === 0) return null
    return Math.round(months.reduce((a, b) => a + b, 0) / months.length)
}

function getMatterCount(products: ProductWithBrand[]): number {
    return products.filter(p => p.supports_matter).length
}

function getAccessFeatureCount(products: ProductWithBrand[]): number {
    return products.reduce((sum, product) => {
        return sum + Number(product.has_fingerprint) + Number(product.has_keypad) + Number(product.has_guest_codes) + Number(product.has_remote_access)
    }, 0)
}

function getBrandCaveats(brand: Brand, products: ProductWithBrand[]): string[] {
    const caveats: string[] = []
    if (getMatterCount(products) === 0) caveats.push(`${brand.name} is weaker if Matter support is mandatory.`)
    if (!hasFeature(products, 'has_fingerprint')) caveats.push(`${brand.name} may not fit buyers who require fingerprint entry.`)
    if (getAverageBatteryMonths(products) == null) caveats.push(`${brand.name} has limited battery-life data in this catalog.`)
    if (products.filter(p => p.price_usd).length === 0) caveats.push(`${brand.name} has limited visible pricing data, so budget comparisons need retailer checks.`)
    if (caveats.length === 0) caveats.push(`${brand.name} has enough catalog data for a model-level shortlist; verify door measurements before buying.`)
    return caveats.slice(0, 3)
}

function pickWinner<T extends number | null>(
    brand1: Brand,
    brand2: Brand,
    value1: T,
    value2: T,
    higherIsBetter = true
): Brand | null {
    if (value1 == null || value2 == null || value1 === value2) return null
    return higherIsBetter ? (value1 > value2 ? brand1 : brand2) : (value1 < value2 ? brand1 : brand2)
}

function getPairVerdict(
    brand1: Brand,
    brand2: Brand,
    products1: ProductWithBrand[],
    products2: ProductWithBrand[]
): string {
    const ratingWinner = getBetterRatedBrand(brand1, brand2, products1, products2)
    const priceWinner = getLowerPricedBrand(brand1, brand2, products1, products2)
    const batteryWinner = pickWinner(brand1, brand2, getAverageBatteryMonths(products1), getAverageBatteryMonths(products2))
    const protocolWinner = pickWinner(brand1, brand2, getProtocols(products1).length + getMatterCount(products1), getProtocols(products2).length + getMatterCount(products2))

    if (ratingWinner && ratingWinner === protocolWinner) {
        return `${ratingWinner.name} is the stronger default pick when you want broader smart-home coverage and higher average model ratings.`
    }
    if (priceWinner && priceWinner === batteryWinner) {
        return `${priceWinner.name} is the value-led pick here, with a lower entry price and stronger average battery-life data.`
    }
    if (ratingWinner && priceWinner && ratingWinner !== priceWinner) {
        return `${ratingWinner.name} leads on average rating, while ${priceWinner.name} is easier to shortlist on price. Choose based on whether confidence or budget matters more.`
    }
    return `${brand1.name} and ${brand2.name} are close enough that the best choice depends on protocol fit, door requirements, and the specific model you shortlist.`
}

// ============================================
// 页面组件
// ============================================

export default async function BrandComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const data = await getComparisonData(slug)

    if (!data) notFound()

    const { brand1, brand2, products1, products2 } = data
    const betterRatedBrand = getBetterRatedBrand(brand1, brand2, products1, products2)
    const lowerPricedBrand = getLowerPricedBrand(brand1, brand2, products1, products2)
    const protocols1 = getProtocols(products1)
    const protocols2 = getProtocols(products2)
    const sharedProtocols = getSharedProtocols(products1, products2)
    const bestModel1 = getBestModel(products1)
    const bestModel2 = getBestModel(products2)
    const pageUrl = `https://www.slockhub.com/compare/${slug}`
    const winnerCards = [
        {
            label: 'Best overall fit',
            winner: getBetterRatedBrand(brand1, brand2, products1, products2),
            detail: `${brand1.name} averages ${getAvgRating(products1).toFixed(1)}/5; ${brand2.name} averages ${getAvgRating(products2).toFixed(1)}/5.`,
        },
        {
            label: 'Best for budget control',
            winner: getLowerPricedBrand(brand1, brand2, products1, products2),
            detail: `${brand1.name} starts at ${getPriceRange(products1)}; ${brand2.name} starts at ${getPriceRange(products2)}.`,
        },
        {
            label: 'Best for smart-home compatibility',
            winner: pickWinner(brand1, brand2, protocols1.length + getMatterCount(products1), protocols2.length + getMatterCount(products2)),
            detail: `${brand1.name}: ${protocols1.join(', ') || 'N/A'}${getMatterCount(products1) ? ' with Matter options' : ''}. ${brand2.name}: ${protocols2.join(', ') || 'N/A'}${getMatterCount(products2) ? ' with Matter options' : ''}.`,
        },
        {
            label: 'Best for battery planning',
            winner: pickWinner(brand1, brand2, getAverageBatteryMonths(products1), getAverageBatteryMonths(products2)),
            detail: `${brand1.name}: ${getAvgBatteryLife(products1)}; ${brand2.name}: ${getAvgBatteryLife(products2)}.`,
        },
        {
            label: 'Best for access features',
            winner: pickWinner(brand1, brand2, getAccessFeatureCount(products1), getAccessFeatureCount(products2)),
            detail: 'Compares fingerprint, keypad, guest code, and remote access availability across active models.',
        },
    ]

    const comparisonItems = [
        {
            label: 'Products Available',
            icon: <Star className="w-4 h-4" />,
            val1: `${products1.length} models`,
            val2: `${products2.length} models`,
        },
        {
            label: 'Rating',
            icon: <Star className="w-4 h-4" />,
            val1: getAvgRating(products1).toFixed(1),
            val2: getAvgRating(products2).toFixed(1),
        },
        {
            label: 'Price Range',
            icon: <DollarSign className="w-4 h-4" />,
            val1: getPriceRange(products1),
            val2: getPriceRange(products2),
        },
        {
            label: 'Protocols',
            icon: <Wifi className="w-4 h-4" />,
            val1: getProtocols(products1).join(', ') || 'N/A',
            val2: getProtocols(products2).join(', ') || 'N/A',
        },
        {
            label: 'Battery Life',
            icon: <Battery className="w-4 h-4" />,
            val1: getAvgBatteryLife(products1),
            val2: getAvgBatteryLife(products2),
        },
        {
            label: 'Fingerprint',
            icon: <Fingerprint className="w-4 h-4" />,
            val1: hasFeature(products1, 'has_fingerprint') ? 'Available' : 'Not available',
            val2: hasFeature(products2, 'has_fingerprint') ? 'Available' : 'Not available',
        },
        {
            label: 'Keypad',
            icon: <Shield className="w-4 h-4" />,
            val1: hasFeature(products1, 'has_keypad') ? 'Available' : 'Not available',
            val2: hasFeature(products2, 'has_keypad') ? 'Available' : 'Not available',
        },
        {
            label: 'Target Market',
            icon: <Shield className="w-4 h-4" />,
            val1: brand1.target_market || 'N/A',
            val2: brand2.target_market || 'N/A',
        },
        {
            label: 'Price Tier',
            icon: <DollarSign className="w-4 h-4" />,
            val1: brand1.price_tier || 'N/A',
            val2: brand2.price_tier || 'N/A',
        },
    ]

    // FAQ data
    const faqs = [
        {
            question: `Is ${brand1.name} or ${brand2.name} better for home security?`,
            answer: `Both ${brand1.name} and ${brand2.name} offer quality smart locks. ${brand1.name} targets the ${brand1.target_market || 'general'} market while ${brand2.name} focuses on ${brand2.target_market || 'general'}. Your best choice depends on your specific needs for protocol compatibility, budget, and security features.`,
        },
        {
            question: `Which is more affordable, ${brand1.name} or ${brand2.name}?`,
            answer: `${brand1.name} smart locks range from ${getPriceRange(products1)}, while ${brand2.name} ranges from ${getPriceRange(products2)}. Both brands offer options across different price tiers to match various budgets.`,
        },
        {
            question: `Can I use ${brand1.name} and ${brand2.name} locks together?`,
            answer: `If both brands support the same protocol (such as Z-Wave or Zigbee), they can coexist on the same smart home hub. Check the protocol compatibility for each specific model before purchasing.`,
        },
    ]

    return (
        <div className="page-wrapper-alt">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'WebPage',
                            name: `${brand1.name} vs ${brand2.name} Smart Locks (${CURRENT_YEAR})`,
                            description: `Compare ${brand1.name} and ${brand2.name} smart locks by price, protocol support, battery life, and security features.`,
                            url: pageUrl,
                            isPartOf: {
                                '@type': 'WebSite',
                                name: 'SLockHub.com',
                                url: 'https://www.slockhub.com',
                            },
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                                { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.slockhub.com/compare' },
                                { '@type': 'ListItem', position: 3, name: `${brand1.name} vs ${brand2.name}`, item: pageUrl },
                            ],
                        },
                        ...(bestModel1 || bestModel2 ? [{
                            '@context': 'https://schema.org',
                            '@type': 'ItemList',
                            name: `Best ${brand1.name} and ${brand2.name} smart lock models`,
                            itemListElement: [bestModel1, bestModel2].filter(Boolean).map((product, index) => ({
                                '@type': 'ListItem',
                                position: index + 1,
                                name: `${product!.brand_name} ${product!.name}`,
                                url: `https://www.slockhub.com/brands/${product!.brand_slug}/${product!.slug}`,
                            })),
                        }] : []),
                    ]),
                }}
            />
            <div className="container-main section">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
                    <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Home</Link>
                    <span>/</span>
                    <Link href="/compare" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Compare</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
                        {brand1.name} vs {brand2.name}
                    </span>
                </nav>

                {/* Header */}
                <div className="page-header" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="page-header__icon">
                        <GitCompareArrows className="w-10 h-10" />
                    </div>
                    <h1 className="page-header__title">
                        {brand1.name} vs {brand2.name}
                    </h1>
                    <p className="page-header__subtitle">
                        Compare price ranges, protocols, battery life, security features, and use-case fit before choosing a smart lock brand.
                    </p>
                </div>

                <div className="card" style={{ marginBottom: 'var(--space-3xl)', background: 'var(--color-bg-alt)' }}>
                    <h2 className="section-title">Quick Verdict</h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-lg)' }}>
                        {getPairVerdict(brand1, brand2, products1, products2)}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <VerdictItem
                            label="Best average rating"
                            value={betterRatedBrand ? betterRatedBrand.name : 'Too close to call'}
                            detail={`${brand1.name}: ${getAvgRating(products1).toFixed(1)} vs ${brand2.name}: ${getAvgRating(products2).toFixed(1)}`}
                        />
                        <VerdictItem
                            label="Lower starting price"
                            value={lowerPricedBrand ? lowerPricedBrand.name : 'Similar pricing'}
                            detail={`${brand1.name}: ${getPriceRange(products1)} vs ${brand2.name}: ${getPriceRange(products2)}`}
                        />
                        <VerdictItem
                            label="Protocol coverage"
                            value={`${protocols1.length} vs ${protocols2.length} protocols`}
                            detail={`${brand1.name}: ${protocols1.join(', ') || 'N/A'}; ${brand2.name}: ${protocols2.join(', ') || 'N/A'}`}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Winner Cards by Use Case</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {winnerCards.map((card) => (
                            <WinnerCard
                                key={card.label}
                                label={card.label}
                                winner={card.winner?.name || 'Tie / model-specific'}
                                detail={card.detail}
                            />
                        ))}
                    </div>
                </div>

                {/* Brand Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <BrandCard brand={brand1} productCount={products1.length} avgRating={getAvgRating(products1)} />
                    <BrandCard brand={brand2} productCount={products2.length} avgRating={getAvgRating(products2)} />
                </div>

                <div style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Best Model From Each Brand</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <BestModelCard brand={brand1} product={bestModel1} />
                        <BestModelCard brand={brand2} product={bestModel2} />
                    </div>
                </div>

                {(bestModel1 || bestModel2) && (
                    <div style={{ marginBottom: 'var(--space-3xl)' }}>
                        <h2 className="section-title">Top Model Matchup</h2>
                        <div className="card overflow-hidden p-0 comparison-table-desktop">
                            <div className="data-table-wrap">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Spec</th>
                                            <th>{bestModel1 ? `${brand1.name}: ${bestModel1.name}` : brand1.name}</th>
                                            <th>{bestModel2 ? `${brand2.name}: ${bestModel2.name}` : brand2.name}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {['Protocol', 'Matter', 'Battery', 'Security', 'Door Fit', 'Access'].map((label) => (
                                            <tr key={label}>
                                                <td className="font-medium text-color-primary">{label}</td>
                                                <td>{bestModel1 ? getModelSpec(bestModel1, label) : 'No active model data'}</td>
                                                <td>{bestModel2 ? getModelSpec(bestModel2, label) : 'No active model data'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="comparison-card-grid">
                            {[bestModel1, bestModel2].filter(Boolean).map((product) => (
                                <div key={product!.slug} className="comparison-card">
                                    <div className="comparison-card__eyebrow">{product!.brand_name}</div>
                                    <div className="comparison-card__title">{product!.name}</div>
                                    <div className="comparison-card__rows">
                                        {['Protocol', 'Matter', 'Battery', 'Security', 'Door Fit', 'Access'].map((label) => (
                                            <div key={label} className="comparison-card__row">
                                                <span className="comparison-card__label">{label}</span>
                                                <span className="comparison-card__value">{getModelSpec(product!, label)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Comparison Table */}
                <div style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Side-by-Side Comparison</h2>
                    <div className="card overflow-hidden p-0 comparison-table-desktop">
                        <div className="data-table-wrap">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th style={{ color: 'var(--color-accent)' }}>{brand1.name}</th>
                                        <th style={{ color: 'var(--color-accent)' }}>{brand2.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonItems.map((item) => (
                                        <tr key={item.label}>
                                            <td className="font-medium text-color-primary">
                                                <span className="flex items-center gap-2">
                                                    {item.icon}
                                                    {item.label}
                                                </span>
                                            </td>
                                            <td className="mono-value text-sm">{item.val1}</td>
                                            <td className="mono-value text-sm">{item.val2}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="comparison-card-grid">
                        {comparisonItems.map((item) => (
                            <div key={item.label} className="comparison-card">
                                <div className="comparison-card__title">{item.label}</div>
                                <div className="comparison-card__rows">
                                    <div className="comparison-card__row">
                                        <span className="comparison-card__label">{brand1.name}</span>
                                        <span className="comparison-card__value">{item.val1}</span>
                                    </div>
                                    <div className="comparison-card__row">
                                        <span className="comparison-card__label">{brand2.name}</span>
                                        <span className="comparison-card__value">{item.val2}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Listings */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <ProductList brand={brand1} products={products1} />
                    <ProductList brand={brand2} products={products2} />
                </div>

                {/* Recommendation */}
                <div className="card" style={{ marginBottom: 'var(--space-3xl)', background: 'var(--color-bg-alt)' }}>
                    <h2 className="section-title">Which Should You Choose?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-sm)', fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
                                Choose {brand1.name} if...
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                                    You need {getProtocols(products1).join(' or ')} protocol support
                                </li>
                                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                                    Your budget is around {getPriceRange(products1)}
                                </li>
                                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                                    You prioritize the {brand1.target_market || 'general'} market segment
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-sm)', fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
                                Choose {brand2.name} if...
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                                    You need {getProtocols(products2).join(' or ')} protocol support
                                </li>
                                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                                    Your budget is around {getPriceRange(products2)}
                                </li>
                                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                                    You prioritize the {brand2.target_market || 'general'} market segment
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">How We Compare These Brands</h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                        This page scores the active product catalog for each brand, not just one flagship lock. The comparison weighs average rating, price range, protocol coverage, Matter availability, battery-life data, access methods, and door-security specifications where those fields are available.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <VerdictItem label="Catalog depth" value={`${products1.length} vs ${products2.length}`} detail="Active models in the SLockHub product database." />
                        <VerdictItem label="Protocol breadth" value={`${protocols1.length} vs ${protocols2.length}`} detail="Primary and secondary protocols represented." />
                        <VerdictItem label="Matter models" value={`${getMatterCount(products1)} vs ${getMatterCount(products2)}`} detail="Models marked with Matter support." />
                        <VerdictItem label="Battery evidence" value={`${getAvgBatteryLife(products1)} vs ${getAvgBatteryLife(products2)}`} detail="Average from models with battery-life data." />
                    </div>
                </div>

                <ReportLeadCapture
                    reportType="product-comparison-report"
                    title={`${brand1.name} vs ${brand2.name} Comparison Report`}
                    description="Download a shortlist-ready PDF with the key differences in rating, protocol support, battery planning, and door-fit signals."
                    sourcePath={`/compare/${slug}`}
                    context={{
                        comparison: `${brand1.slug}-vs-${brand2.slug}`,
                        brand1: brand1.name,
                        brand2: brand2.name,
                        modelsCompared: products1.length + products2.length,
                        sharedProtocols: sharedProtocols.join(', ') || 'none',
                    }}
                    bullets={[
                        'Captures the current matchup so buyers can review it offline or share it internally.',
                        'Highlights where price, rating, and protocol coverage point to different winners.',
                        'Useful before moving into model-level product pages or installer conversations.',
                    ]}
                />

                <div className="mobile-action-bar">
                    <div className="mobile-action-bar__inner">
                        <Link href="/compare" className="btn btn-primary">More Comparisons</Link>
                        <Link href="/calculators/protocol-wizard" className="btn btn-secondary">Choose Protocol</Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="card">
                        <h2 className="section-title">Shared Compatibility</h2>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                            {sharedProtocols.length > 0
                                ? `${brand1.name} and ${brand2.name} both have catalog coverage for ${sharedProtocols.join(', ')}. That makes same-hub shortlisting easier, but each model still needs a door-fit check.`
                                : `${brand1.name} and ${brand2.name} do not currently show an overlapping protocol set in this catalog, so choose based on the hub or ecosystem you already use.`}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <VerdictItem label={`${brand1.name} security data`} value={getSecuritySummary(products1)} detail={getDoorFitCoverage(products1)} />
                            <VerdictItem label={`${brand2.name} security data`} value={getSecuritySummary(products2)} detail={getDoorFitCoverage(products2)} />
                        </div>
                    </div>
                    <div className="card">
                        <h2 className="section-title">When to Skip Each Brand</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CaveatList brand={brand1} caveats={getBrandCaveats(brand1, products1)} />
                            <CaveatList brand={brand2} caveats={getBrandCaveats(brand2, products2)} />
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="card" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
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

                {/* Related Comparisons CTA */}
                <div className="cta-section">
                    <h2 className="cta-section__title">More Comparisons</h2>
                    <p className="cta-section__subtitle">
                        Explore protocol comparisons and smart lock tools
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/compare" className="btn btn-primary btn-lg">
                            Protocol Comparison <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/brands" className="btn btn-secondary btn-lg">
                            Browse All Brands
                        </Link>
                    </div>
                </div>

                <SeoPathways topic="comparison" title="Turn This Comparison Into a Shortlist" />

            </div>
        </div>
    )
}

// ============================================
// 子组件
// ============================================

function BrandCard({ brand, productCount, avgRating }: { brand: Brand; productCount: number; avgRating: number }) {
    return (
        <div className="card">
            <Link href={`/brands/${brand.slug}`} style={{ textDecoration: 'none' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>
                    {brand.name}
                </h2>
            </Link>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 'var(--space-md)' }}>
                {brand.description || 'Leading smart lock manufacturer'}
            </p>
            <div className="flex flex-wrap gap-3">
                <span style={{
                    padding: 'var(--space-xs) var(--space-sm)',
                    background: 'var(--color-bg-alt)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Products: </span>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{productCount}</span>
                </span>
                <span style={{
                    padding: 'var(--space-xs) var(--space-sm)',
                    background: 'var(--color-bg-alt)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Rating: </span>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{avgRating.toFixed(1)}/5</span>
                </span>
                <span style={{
                    padding: 'var(--space-xs) var(--space-sm)',
                    background: 'var(--color-bg-alt)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Market: </span>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{brand.target_market || 'General'}</span>
                </span>
            </div>
        </div>
    )
}

function VerdictItem({ label, value, detail }: { label: string; value: string; detail: string }) {
    return (
        <div className="content-card" style={{ margin: 0 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>
                {label}
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                {value}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {detail}
            </p>
        </div>
    )
}

function WinnerCard({ label, winner, detail }: { label: string; winner: string; detail: string }) {
    return (
        <div className="content-card" style={{ margin: 0 }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>
                {label}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                {winner}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                {detail}
            </p>
        </div>
    )
}

function BestModelCard({ brand, product }: { brand: Brand; product: ProductWithBrand | null }) {
    if (!product) {
        return (
            <div className="card">
                <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>{brand.name}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No active product data available yet.</p>
            </div>
        )
    }

    return (
        <Link href={`/brands/${product.brand_slug}/${product.slug}`} className="card" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>
                Best current {brand.name} model
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>
                {product.name}
            </h3>
            <div className="flex flex-wrap gap-2" style={{ marginBottom: 'var(--space-sm)' }}>
                <span className="badge badge-default">{product.protocol.toUpperCase()}</span>
                {product.supports_matter && <span className="badge badge-success">Matter</span>}
                {product.battery_life_months && <span className="badge badge-default">{product.battery_life_months} mo battery</span>}
                {product.ansi_grade && <span className="badge badge-default">Grade {product.ansi_grade}</span>}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Rated {product.rating.toFixed(1)}/5 across {product.review_count || 0} reviews{product.price_usd ? `, with a listed price around $${product.price_usd}` : ''}.
            </p>
        </Link>
    )
}

function getModelSpec(product: ProductWithBrand, label: string): string {
    if (label === 'Protocol') return [product.protocol, product.secondary_protocol].filter(Boolean).map(value => value!.toUpperCase()).join(' + ')
    if (label === 'Matter') return product.supports_matter ? 'Yes' : 'No'
    if (label === 'Battery') return product.battery_life_months ? `${product.battery_life_months} months` : 'Not listed'
    if (label === 'Security') return product.ansi_grade ? `ANSI/BHMA Grade ${product.ansi_grade}` : product.encryption_type || 'Not listed'
    if (label === 'Door Fit') {
        if (product.door_thickness_min_mm && product.door_thickness_max_mm) return `${product.door_thickness_min_mm}-${product.door_thickness_max_mm} mm doors`
        if (product.bore_diameter_mm) return `${product.bore_diameter_mm} mm bore`
        return 'Verify model specs'
    }
    if (label === 'Access') {
        const access = [
            product.has_keypad ? 'keypad' : null,
            product.has_fingerprint ? 'fingerprint' : null,
            product.has_guest_codes ? 'guest codes' : null,
            product.has_remote_access ? 'remote access' : null,
        ].filter(Boolean)
        return access.join(', ') || 'Basic access data'
    }
    return 'Not listed'
}

function CaveatList({ brand, caveats }: { brand: Brand; caveats: string[] }) {
    return (
        <div>
            <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)', fontSize: '1rem' }}>
                Skip {brand.name} if...
            </h3>
            <ul className="space-y-2">
                {caveats.map((caveat) => (
                    <li key={caveat} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <span style={{ color: 'var(--color-warning)', marginTop: '1px', flexShrink: 0 }}>!</span>
                        {caveat}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function ProductList({ brand, products }: { brand: Brand; products: ProductWithBrand[] }) {
    return (
        <div>
            <h3 style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>
                {brand.name} Smart Locks ({products.length})
            </h3>
            <div className="space-y-3">
                {products.slice(0, 5).map((product) => (
                    <Link
                        key={product.slug}
                        href={`/brands/${product.brand_slug}/${product.slug}`}
                        className="card"
                        style={{ display: 'block', textDecoration: 'none', padding: 'var(--space-md)' }}
                    >
                        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                            {product.name}
                        </div>
                        <div className="flex flex-wrap gap-2" style={{ fontSize: '0.75rem' }}>
                            <span style={{ color: 'var(--color-text-muted)' }}>
                                {product.protocol?.toUpperCase()}
                            </span>
                            {product.price_usd && (
                                <span style={{ color: 'var(--color-text-muted)' }}>
                                    ${product.price_usd}
                                </span>
                            )}
                            {product.battery_life_months && (
                                <span style={{ color: 'var(--color-text-muted)' }}>
                                    {product.battery_life_months}mo battery
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
                {products.length > 5 && (
                    <Link
                        href={`/brands/${brand.slug}`}
                        style={{ display: 'block', textAlign: 'center', padding: 'var(--space-sm)', fontSize: '0.875rem', color: 'var(--color-accent)', fontWeight: 500, textDecoration: 'none' }}
                    >
                        View all {products.length} products →
                    </Link>
                )}
                {products.length === 0 && (
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', padding: 'var(--space-md)' }}>
                        No products found in our database yet.
                    </p>
                )}
            </div>
        </div>
    )
}
