import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { ExternalLink } from 'lucide-react'
import StarRating from '@/components/brands/StarRating'
import type { ProductDetail } from '@/lib/services/brand-service'
import { ProductModel, ProductSeriesModel, type ProductWithBrand } from '@/lib/db/brand-models'
import { SeoPathways } from '@/components/seo/SeoPathways'
import { ReportLeadCapture } from '@/components/seo/ReportLeadCapture'
import { formatUsdCents, formatUsdCentsForSchema, isUsdCentsBelow, usdCentsToDollars } from '@/lib/format/price'
import {
    brandFactLastVerified,
    brandFactReviewCadence,
    buildProductFactDisplays,
    getFactDisplay,
    getProductProtocolFacts,
    getProtocolFact,
    getProtocolClaimText,
} from '@/lib/brands/fact-policy'

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

const getSeoProducts = cache(() => ProductModel.getAllForSeo())

async function getProductDetail(brandSlug: string, productSlug: string): Promise<ProductDetail | null> {
    const product = await ProductModel.getByBrandAndSlug(brandSlug, productSlug)
    if (!product) return null

    const series = await ProductSeriesModel.getById(product.series_id)
    let ecosystems: string[] = []
    if (product.ecosystems_json) {
        try {
            ecosystems = JSON.parse(product.ecosystems_json)
        } catch {
            ecosystems = []
        }
    }

    return { ...product, series_name: series?.name || '', ecosystems }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; product: string }> }): Promise<Metadata> {
    const { slug: brandSlug, product: productSlug } = await params
    const product = await getProductDetail(brandSlug, productSlug)
    if (!product) return { title: 'Product Not Found' }

    const title = product.meta_title || `${product.name} Smart Lock | Specs, Protocol & Door Fit`
    const description = product.meta_description || product.description || `Review ${product.name} smart lock specs, protocol support, battery expectations, access features, installation requirements, and related buying paths.`

    return {
        title,
        description,
        alternates: { canonical: `/brands/${product.brand_slug}/${product.slug}` },
        openGraph: {
            title,
            description,
            siteName: 'SLockHub.com',
            type: 'website',
            url: `https://www.slockhub.com/brands/${product.brand_slug}/${product.slug}`,
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
        const products = await getSeoProducts()
        return products.map(p => ({ slug: p.brand_slug, product: p.slug }))
    } catch {
        return []
    }
}

function getPriceTier(priceUsd: number | undefined): string {
    if (!priceUsd) return 'Contact Manufacturer'
    if (isUsdCentsBelow(priceUsd, 150)) return 'Budget-Friendly'
    if (isUsdCentsBelow(priceUsd, 300)) return 'Mid-Range'
    return 'Premium'
}

function formatUsd(price: number | null | undefined): string {
    if (price == null) return 'Contact manufacturer'
    return formatUsdCents(price)
}

function getDoorFitVerdict(product: ProductDetail): string {
    if (product.door_thickness_min_mm && product.door_thickness_max_mm) {
        return `Fits doors from ${product.door_thickness_min_mm} to ${product.door_thickness_max_mm} mm`
    }
    if (product.bore_diameter_mm) {
        return `Requires a ${product.bore_diameter_mm} mm bore opening`
    }
    return 'Verify thickness, bore, and backset before ordering'
}

function getBatteryCostVerdict(product: ProductDetail): string {
    const battery = product.battery_life_months ? `${product.battery_life_months} months per battery cycle` : 'battery life varies by usage'
    const price = product.price_usd ? `${formatUsd(product.price_usd)} list price band` : 'pricing depends on retailer'
    return `${battery}; ${price}.`
}

function getQuickVerdict(product: ProductDetail): string {
    const strengths: string[] = []
    const protocolFacts = getProductProtocolFacts(product)
    const matterFact = getProtocolFact(protocolFacts, 'Matter')
    const productFacts = buildProductFactDisplays(product)
    const ansiFact = getFactDisplay(productFacts, 'ANSI grade')
    strengths.push(getProtocolClaimText(protocolFacts))
    if (matterFact?.supported) strengths.push('Matter-ready')
    if (product.has_fingerprint) strengths.push('fingerprint access')
    if (product.has_keypad) strengths.push('keypad access')
    if (ansiFact?.status === 'Catalog field') strengths.push(ansiFact.value)
    return `${product.name} is a ${getPriceTier(product.price_usd)} ${product.brand_name} lock positioned around ${strengths.slice(0, 3).join(', ') || 'core smart-lock basics'}.`
}

function getSkipIfVerdict(product: ProductDetail): string {
    const reasons: string[] = []
    const matterFact = getProtocolFact(getProductProtocolFacts(product), 'Matter')
    if (!matterFact?.supported) reasons.push('you need vendor-confirmed Matter support')
    if (!product.has_fingerprint) reasons.push('fingerprint access is required')
    if (!product.has_remote_access) reasons.push('remote access is a must-have')
    if (!product.door_thickness_min_mm && !product.bore_diameter_mm) reasons.push('you need fully listed door-fit specs before shortlisting')
    if (reasons.length === 0) return 'Skip only if your door measurements or ecosystem requirements do not match the model specs.'
    return `Skip this model if ${reasons.slice(0, 3).join(', ')}.`
}

function getProtocolReliabilityVerdict(product: ProductDetail): string {
    const protocol = getProtocolClaimText(getProductProtocolFacts(product))
    if (product.rf_range_meters) {
        return `${protocol} model with listed RF range of ${product.rf_range_meters}m${product.rf_frequency ? ` at ${product.rf_frequency}` : ''}.`
    }
    if (product.secondary_protocol) {
        return `${protocol} primary connectivity with ${product.secondary_protocol.toUpperCase()} as a secondary protocol.`
    }
    if (getProtocolFact(getProductProtocolFacts(product), 'Matter')?.supported) {
        return `${protocol} connectivity with Matter support for stronger ecosystem portability.`
    }
    return `${protocol} connectivity; verify hub, bridge, and range requirements for your installation.`
}

function getCredentialCapacityVerdict(product: ProductDetail): string {
    const capacities = [
        product.max_pin_codes ? `${product.max_pin_codes} PIN codes` : null,
        product.max_fingerprints ? `${product.max_fingerprints} fingerprints` : null,
        product.max_cards ? `${product.max_cards} cards/NFC credentials` : null,
        product.max_app_users ? `${product.max_app_users} app users` : null,
    ].filter(Boolean)
    if (capacities.length === 0) return 'Credential capacity is not listed; verify limits before using this lock for shared access.'
    return capacities.join(', ')
}

function getBestPageLinks(product: ProductDetail): Array<{ href: string; label: string }> {
    const links: Array<{ href: string; label: string }> = []
    const protocolFacts = getProductProtocolFacts(product)
    if (getProtocolFact(protocolFacts, 'Matter')?.supported) links.push({ href: '/best/matter-smart-locks', label: 'Best Matter Smart Locks' })
    if (getProtocolFact(protocolFacts, 'Z-Wave')?.supported) links.push({ href: '/best/z-wave-smart-locks', label: 'Best Z-Wave Smart Locks' })
    if (getProtocolFact(protocolFacts, 'Zigbee')?.supported) links.push({ href: '/best/zigbee-smart-locks', label: 'Best Zigbee Smart Locks' })
    if (getProtocolFact(protocolFacts, 'Wi-Fi')?.supported) links.push({ href: '/best/wifi-smart-locks', label: 'Best Wi-Fi Smart Locks' })
    if (product.has_fingerprint) links.push({ href: '/best/fingerprint-smart-locks', label: 'Best Fingerprint Smart Locks' })
    if (product.battery_life_months && product.battery_life_months >= 12) links.push({ href: '/best/smart-locks-with-longest-battery-life', label: 'Longest Battery Life Smart Locks' })
    return links.slice(0, 3)
}

function getProtocolHref(product: ProductDetail): string {
    const primaryProtocol = getProductProtocolFacts(product).find(fact => fact.supported)
    const protocol = primaryProtocol?.slug || product.protocol.toLowerCase().replace(/\s+/g, '-').replace('zwave', 'z-wave').replace('wi-fi', 'wifi')
    return `/protocols/${protocol}`
}

function getCompareHref(product: ProductDetail): { href: string; label: string } {
    const candidates = ['yale', 'schlage', 'august', 'kwikset']
    const competitor = candidates.find(candidate => candidate !== product.brand_slug) || 'yale'
    const titleName = competitor.charAt(0).toUpperCase() + competitor.slice(1)
    return {
        href: `/compare/${product.brand_slug}-vs-${competitor}`,
        label: `${product.brand_name} vs ${titleName}`,
    }
}

function getSiblingProducts(products: ProductWithBrand[], currentSlug: string): ProductWithBrand[] {
    return products
        .filter(product => product.slug !== currentSlug)
        .sort((a, b) => {
            if (b.rating !== a.rating) return b.rating - a.rating
            if (b.review_count !== a.review_count) return b.review_count - a.review_count
            return a.display_order - b.display_order
        })
        .slice(0, 3)
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string; product: string }> }) {
    const { slug: brandSlug, product: productSlug } = await params
    const [product, allProducts] = await Promise.all([
        getProductDetail(brandSlug, productSlug),
        ProductModel.getByBrandSlug(brandSlug),
    ])

    if (!product) notFound()

    const ecosystems = product.ecosystems
    const productFactDisplays = buildProductFactDisplays(product)
    const productProtocolFacts = getProductProtocolFacts(product)
    const batteryFact = getFactDisplay(productFactDisplays, 'Battery')
    const ansiFact = getFactDisplay(productFactDisplays, 'ANSI grade')
    const matterFact = getProtocolFact(productProtocolFacts, 'Matter')
    const protocolFactText = getProtocolClaimText(productProtocolFacts)
    const siblingProducts = getSiblingProducts(
        allProducts,
        product.slug
    )
    const compareLink = getCompareHref(product)
    const bestPageLinks = getBestPageLinks(product)
    const productUrl = `https://www.slockhub.com/brands/${product.brand_slug}/${product.slug}`
    const additionalProperty = [
        { name: 'Primary protocol', value: product.protocol.toUpperCase() },
        ...(product.secondary_protocol ? [{ name: 'Secondary protocol', value: product.secondary_protocol.toUpperCase() }] : []),
        ...(matterFact?.supported ? [{ name: 'Matter support', value: 'Yes' }] : []),
        ...(batteryFact?.status === 'Catalog field' ? [{ name: 'Battery life', value: batteryFact.value }] : []),
        ...(ansiFact?.status === 'Catalog field' ? [{ name: 'ANSI grade', value: ansiFact.value }] : []),
        ...(product.encryption_type ? [{ name: 'Encryption', value: product.encryption_type }] : []),
        ...(product.door_thickness_min_mm && product.door_thickness_max_mm
            ? [{ name: 'Door thickness', value: `${product.door_thickness_min_mm}-${product.door_thickness_max_mm} mm` }]
            : []),
        ...(product.bore_diameter_mm ? [{ name: 'Bore diameter', value: `${product.bore_diameter_mm} mm` }] : []),
    ]

    return (
        <div className="page-bg">
            <div className="container-main section">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Product',
                            name: product.name,
                            description: product.description,
                            url: productUrl,
                            sku: product.slug,
                            brand: { '@type': 'Brand', name: product.brand_name },
                            ...(product.model_number && { model: product.model_number }),
                            ...(product.review_count > 0 && {
                                aggregateRating: {
                                    '@type': 'AggregateRating',
                                    ratingValue: product.rating.toFixed(1),
                                    reviewCount: product.review_count,
                                },
                            }),
                            ...(product.price_usd && {
                                offers: {
                                    '@type': 'Offer',
                                    url: product.buy_url || productUrl,
                                    priceCurrency: 'USD',
                                    price: formatUsdCentsForSchema(product.price_usd),
                                    availability: 'https://schema.org/InStock',
                                },
                            }),
                            additionalProperty: additionalProperty.map((item) => ({
                                '@type': 'PropertyValue',
                                name: item.name,
                                value: item.value,
                            })),
                        }),
                    }}
                />
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
                    <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }} prefetch={false}>Home</Link>
                    <span>/</span>
                    <Link href="/brands" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }} prefetch={false}>Brands</Link>
                    <span>/</span>
                    <Link href={`/brands/${product.brand_slug}`} style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }} prefetch={false}>{product.brand_name}</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Product Header */}
                        <div className="content-card">
                            <div style={{ marginBottom: 'var(--space-sm)' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                    {product.brand_name} · {product.series_name}
                                </span>
                            </div>
                            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>
                                {product.name}
                            </h1>
                            {product.model_number && (
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
                                    Model: {product.model_number}
                                </div>
                            )}
                            <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-lg)' }}>
                                <StarRating productId={product.id} />
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                                {product.description}
                            </p>
                        </div>

                        <div className="content-card" style={{ background: 'var(--color-bg-alt)' }}>
                            <h2 className="section-title">Quick Verdict</h2>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-lg)' }}>
                                {getQuickVerdict(product)}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <SpecItem label="Door fit" value={getDoorFitVerdict(product)} />
                                <SpecItem label="Battery / cost" value={getBatteryCostVerdict(product)} />
                                <SpecItem label="Best for" value={product.series_name || `${protocolFactText} buyers`} />
                            </div>
                        </div>

                        <div className="content-card">
                            <h2 className="section-title">Buy, Skip, Compare</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <SpecItem label="Choose it when" value={getQuickVerdict(product)} />
                                <SpecItem label="Skip it when" value={getSkipIfVerdict(product)} />
                                <SpecItem label="Credential fit" value={getCredentialCapacityVerdict(product)} />
                            </div>
                        </div>

                        <ReportLeadCapture
                            reportType="product-comparison-report"
                            title={`${product.name} Shortlist Report`}
                            description="Download a buyer-ready PDF with the model context, door-fit signals, protocol choice, and cost checkpoints for this lock."
                            sourcePath={`/brands/${product.brand_slug}/${product.slug}`}
                            context={{
                                product: product.slug,
                                brand: product.brand_name,
                                protocol: product.protocol,
                                matter: Boolean(matterFact?.supported),
                                batteryMonths: product.battery_life_months || null,
                                priceUsd: usdCentsToDollars(product.price_usd),
                                priceCents: product.price_usd || null,
                            }}
                            bullets={[
                                'Captures model-level protocol, battery, price, and door-fit context.',
                                'Useful when comparing this lock against sibling models or brand alternatives.',
                                'Gives product pages a conversion path beyond retailer clicks.',
                            ]}
                        />

                        {/* Connectivity Specs */}
                        <div className="content-card">
                            <h2 className="section-title">Protocol and Connectivity</h2>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                                {getProtocolReliabilityVerdict(product)}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {productProtocolFacts.map(fact => (
                                    <SpecItem key={fact.label} label={fact.label} value={`${fact.supported ? 'Supported' : 'Unknown'} · ${fact.status}`} />
                                ))}
                                {product.rf_frequency && <SpecItem label="RF Frequency" value={product.rf_frequency} />}
                                {product.rf_range_meters && <SpecItem label="RF Range" value={`${product.rf_range_meters}m`} />}
                                {product.encryption_type && <SpecItem label="Encryption" value={product.encryption_type} />}
                            </div>
                        </div>

                        {/* Battery & Power */}
                        <div className="content-card">
                            <h2 className="section-title">Battery and Power</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {product.battery_type && <SpecItem label="Battery Type" value={product.battery_type} />}
                                {product.battery_count && <SpecItem label="Battery Count" value={`${product.battery_count}×`} />}
                                <SpecItem label="Battery Life" value={`${batteryFact?.value} · ${batteryFact?.status}`} />
                                {product.standby_power_mw != null && <SpecItem label="Standby Power" value={`${product.standby_power_mw} mW`} />}
                                {product.active_power_mw != null && <SpecItem label="Active Power" value={`${product.active_power_mw} mW`} />}
                            </div>
                        </div>

                        {/* Security */}
                        <div className="content-card">
                            <h2 className="section-title">Security and Access</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <SpecItem label="ANSI/BHMA Grade" value={`${ansiFact?.value} · ${ansiFact?.status}`} />
                                <SpecItem label="UL Listed" value={product.ul_listed ? 'Yes ✓' : 'No'} />
                                {product.encryption_type && <SpecItem label="Encryption" value={product.encryption_type} />}
                            </div>
                        </div>

                        <div className="content-card">
                            <h2 className="section-title">Product Fact Evidence</h2>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                                Last verified: {brandFactLastVerified}. {brandFactReviewCadence}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {productFactDisplays.map(fact => (
                                    <div key={fact.label} className="card" style={{ background: 'var(--color-bg-alt)', margin: 0 }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>
                                            {fact.label} · {fact.status}
                                        </div>
                                        <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                                            {fact.value}
                                        </div>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                            {fact.caveat}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="content-card">
                            <h2 className="section-title">Key Features</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <FeatureItem label="Fingerprint" enabled={product.has_fingerprint} />
                                <FeatureItem label="Keypad" enabled={product.has_keypad} />
                                <FeatureItem label="Auto-Lock" enabled={product.has_auto_lock} />
                                <FeatureItem label="Auto-Unlock" enabled={product.has_auto_unlock} />
                                <FeatureItem label="Voice Control" enabled={product.has_voice_control} />
                                <FeatureItem label="Remote Access" enabled={product.has_remote_access} />
                                <FeatureItem label="Guest Codes" enabled={product.has_guest_codes} />
                                <FeatureItem label="Activity Log" enabled={product.has_activity_log} />
                                <FeatureItem label="Physical Key" enabled={product.has_physical_key} />
                            </div>
                        </div>

                        {/* Capacity */}
                        {(product.max_pin_codes || product.max_fingerprints || product.max_cards || product.max_app_users) && (
                            <div className="content-card">
                                <h2 className="section-title">Credential Capacity</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {product.max_pin_codes != null && product.max_pin_codes > 0 && <SpecItem label="PIN Codes" value={`${product.max_pin_codes}`} />}
                                    {product.max_fingerprints != null && product.max_fingerprints > 0 && <SpecItem label="Fingerprints" value={`${product.max_fingerprints}`} />}
                                    {product.max_cards != null && product.max_cards > 0 && <SpecItem label="Cards / NFC" value={`${product.max_cards}`} />}
                                    {product.max_app_users != null && product.max_app_users > 0 && <SpecItem label="App Users" value={`${product.max_app_users}`} />}
                                </div>
                            </div>
                        )}

                        {/* Installation */}
                        {(product.door_thickness_min_mm || product.bore_diameter_mm) && (
                            <div className="content-card">
                                <h2 className="section-title">Door Fit Requirements</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {product.door_thickness_min_mm && product.door_thickness_max_mm && (
                                        <SpecItem label="Door Thickness" value={`${product.door_thickness_min_mm}–${product.door_thickness_max_mm} mm`} />
                                    )}
                                    {product.bore_diameter_mm && <SpecItem label="Bore Diameter" value={`${product.bore_diameter_mm} mm`} />}
                                    {product.backset_mm && <SpecItem label="Backset" value={`${product.backset_mm} mm`} />}
                                    {product.weight_grams && <SpecItem label="Weight" value={`${product.weight_grams}g`} />}
                                </div>
                            </div>
                        )}

                        {siblingProducts.length > 0 && (
                            <div className="content-card">
                                <h2 className="section-title">Compare With Other {product.brand_name} Models</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {siblingProducts.map((sibling) => (
                                        <Link
                                            key={sibling.slug}
                                            href={`/brands/${sibling.brand_slug}/${sibling.slug}`}
                                            className="card"
                                            style={{ textDecoration: 'none', display: 'block', margin: 0 }}
                                         prefetch={false}>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>
                                                Same-brand alternative
                                            </div>
                                            <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>
                                                {sibling.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-2" style={{ marginBottom: 'var(--space-sm)' }}>
                                                <span className="badge badge-default">{getProtocolClaimText(getProductProtocolFacts(sibling))}</span>
                                                <span className="badge badge-default">{getFactDisplay(buildProductFactDisplays(sibling), 'Battery')?.value}</span>
                                                {sibling.price_usd && <span className="badge badge-default">{formatUsd(sibling.price_usd)}</span>}
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                                Rated {sibling.rating.toFixed(1)}/5 with {sibling.review_count} reviews.
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="content-card">
                            <h2 className="section-title">Protocols, Brands, Tools</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Link href={getProtocolHref(product)} className="link-card" prefetch={false}>
                                    <h3 className="link-card__title">{protocolFactText} Protocol Guide</h3>
                                    <p className="link-card__desc">Check hub, range, and ecosystem tradeoffs before buying.</p>
                                </Link>
                                <Link href={compareLink.href} className="link-card" prefetch={false}>
                                    <h3 className="link-card__title">{compareLink.label}</h3>
                                    <p className="link-card__desc">See how this brand compares with a major smart lock alternative.</p>
                                </Link>
                                {(bestPageLinks[0] ? (
                                    <Link href={bestPageLinks[0].href} className="link-card" prefetch={false}>
                                        <h3 className="link-card__title">{bestPageLinks[0].label}</h3>
                                        <p className="link-card__desc">Find ranked alternatives with matching buyer intent.</p>
                                    </Link>
                                ) : (
                                    <Link href="/best/smart-locks-2026" className="link-card" prefetch={false}>
                                        <h3 className="link-card__title">Best Smart Locks 2026</h3>
                                        <p className="link-card__desc">Compare this model against broader ranked picks.</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Price Tier & Purchase */}
                        <div className="content-card sticky-action-card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                                {getPriceTier(product.price_usd)}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
                                Check retailer for current pricing
                            </div>
                            {product.buy_url && (
                                <a
                                    href={product.buy_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-lg"
                                    style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-xs)' }}
                                >
                                    Check Price <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            <div className="grid grid-cols-1 gap-2" style={{ marginTop: 'var(--space-sm)' }}>
                                <Link href="/calculators/compatibility" className="btn btn-secondary" prefetch={false}>
                                    Check Door Fit
                                </Link>
                                <Link href={compareLink.href} className="btn btn-ghost" prefetch={false}>
                                    Compare Alternatives
                                </Link>
                            </div>
                        </div>

                        {/* Ecosystems */}
                        {ecosystems.length > 0 && (
                            <div className="content-card">
                                <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-md)', fontSize: '1rem' }}>Compatible Ecosystems</h3>
                                <div className="flex flex-wrap gap-2">
                                    {ecosystems.map(eco => (
                                        <span key={eco} className="badge badge-default">{eco}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick Specs Summary */}
                        <div className="content-card" style={{ background: 'var(--color-bg-dark)', color: 'var(--color-text-inverse)' }}>
                            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-md)', fontSize: '1rem' }}>Quick Specs</h3>
                            <div className="space-y-3" style={{ fontSize: '0.875rem' }}>
                                <div className="flex justify-between">
                                    <span style={{ opacity: 0.8 }}>Protocol</span>
                                    <span style={{ fontWeight: 600 }}>{protocolFactText}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ opacity: 0.8 }}>Battery Life</span>
                                    <span style={{ fontWeight: 600 }}>{batteryFact?.value}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ opacity: 0.8 }}>Security</span>
                                    <span style={{ fontWeight: 600 }}>{ansiFact?.value}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ opacity: 0.8 }}>Fingerprint</span>
                                    <span style={{ fontWeight: 600 }}>{product.has_fingerprint ? 'Yes' : 'No'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ opacity: 0.8 }}>Keypad</span>
                                    <span style={{ fontWeight: 600 }}>{product.has_keypad ? 'Yes' : 'No'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Calculator Links */}
                        <div className="content-card">
                            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-md)', fontSize: '1rem' }}>Try Our Calculators</h3>
                            <div className="space-y-2">
                                <Link href="/calculators/battery-life" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }} prefetch={false}>
                                    Battery Life Calculator
                                </Link>
                                <Link href="/calculators/lock-tco" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }} prefetch={false}>
                                    Total Cost of Ownership
                                </Link>
                                <Link href="/calculators/compatibility" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }} prefetch={false}>
                                    Door Compatibility
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <SeoPathways topic="product" title="Validate This Lock for Your Door" />

                <div className="mobile-action-bar">
                    <div className="mobile-action-bar__inner">
                        {product.buy_url ? (
                            <a href={product.buy_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                Check Price
                            </a>
                        ) : (
                            <Link href={compareLink.href} className="btn btn-primary" prefetch={false}>
                                Compare
                            </Link>
                        )}
                        <Link href="/calculators/compatibility" className="btn btn-secondary" prefetch={false}>Door Fit</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SpecItem({ label, value }: { label: string; value: string }) {
    return (
        <div style={{ padding: 'var(--space-sm)', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}>{label}</div>
            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.9rem' }}>{value}</div>
        </div>
    )
}

function FeatureItem({ label, enabled }: { label: string; enabled: boolean }) {
    return (
        <div className="flex items-center gap-2" style={{ padding: 'var(--space-xs) var(--space-sm)', fontSize: '0.875rem' }}>
            <span style={{ color: enabled ? 'var(--color-success)' : 'var(--color-text-muted)', fontSize: '1rem' }}>
                {enabled ? '✓' : '✗'}
            </span>
            <span style={{ color: enabled ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{label}</span>
        </div>
    )
}
