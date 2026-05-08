import Link from 'next/link'
import type { Metadata } from 'next'
import StarRating from '@/components/brands/StarRating'
import { notFound } from 'next/navigation'
import { getTopNPageData } from '@/lib/services/brand-service'
import { TopNPageModel } from '@/lib/db/brand-models'
import { SeoPathways } from '@/components/seo/SeoPathways'

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

const CURRENT_YEAR = '2026'

function getSelectionMethodology(pageTitle: string, productCount: number): string[] {
    return [
        `We start with the active SLockHub dataset for ${pageTitle.toLowerCase()}, then rank only models that match this page's tag and publishing rules.`,
        `Primary sort order comes from the page configuration, with rating, review depth, battery-life data, protocol support, and security fields used as tie-breakers where available.`,
        `We prefer pages with enough specification coverage to support buyer comparisons, not just thin catalog mentions. ${productCount} products currently qualify on this page.`,
    ]
}

function getIntentSignals(slug: string): Array<{ label: string; detail: string }> {
    if (slug.includes('homekit')) {
        return [
            { label: 'Ecosystem fit', detail: 'Prioritize locks with Matter, Thread, Wi-Fi, or app ecosystems that can support Apple Home access paths.' },
            { label: 'Local reliability', detail: 'Prefer models that do not depend only on cloud access for everyday unlocking.' },
            { label: 'Door validation', detail: 'Confirm bore, backset, and thickness before choosing an Apple-friendly lock.' },
        ]
    }
    if (slug.includes('matter')) {
        return [
            { label: 'Matter support', detail: 'Matter-ready models get stronger consideration because they reduce platform lock-in.' },
            { label: 'Transport protocol', detail: 'Thread and Wi-Fi Matter locks have different battery and hub tradeoffs.' },
            { label: 'Fallback access', detail: 'Keypad, physical key, and local credentials still matter when smart-home control fails.' },
        ]
    }
    if (slug.includes('battery')) {
        return [
            { label: 'Battery months', detail: 'Listed battery-life months are the primary ranking signal for this page.' },
            { label: 'Power draw', detail: 'Standby and active power fields are used where available as supporting evidence.' },
            { label: 'Protocol impact', detail: 'Wi-Fi, Z-Wave, Zigbee, Thread, and Bluetooth have different battery profiles.' },
        ]
    }
    if (slug.includes('fingerprint')) {
        return [
            { label: 'Biometric access', detail: 'Fingerprint support is required for inclusion and is weighed with keypad fallback.' },
            { label: 'Credential capacity', detail: 'Fingerprint and PIN capacity matter for family, rental, and staff use.' },
            { label: 'Backup entry', detail: 'Physical key or keypad backup reduces lockout risk.' },
        ]
    }
    return [
        { label: 'Spec completeness', detail: 'Products with clearer protocol, battery, security, and price data are easier to recommend.' },
        { label: 'Buyer fit', detail: 'The list balances security, convenience, ecosystem compatibility, and installation constraints.' },
        { label: 'Evidence quality', detail: 'Ratings and review counts are treated as confidence signals, not the only ranking factor.' },
    ]
}

function getBestForBadges(product: NonNullable<Awaited<ReturnType<typeof getTopNPageData>>>['products'][number]): string[] {
    const badges: string[] = []
    if (product.supports_matter) badges.push('Matter ecosystems')
    if (product.has_fingerprint) badges.push('Fingerprint entry')
    if (product.battery_life_months && product.battery_life_months >= 12) badges.push('Longer battery planning')
    if (product.ansi_grade) badges.push(`Grade ${product.ansi_grade} security`)
    if (product.has_guest_codes || product.has_remote_access) badges.push('Guest access')
    if (product.price_usd && product.price_usd < 150) badges.push('Budget shortlist')
    return badges.slice(0, 3)
}

function getMissingDataNote(products: NonNullable<Awaited<ReturnType<typeof getTopNPageData>>>['products']): string {
    const missingPrice = products.filter(product => !product.price_usd).length
    const missingBattery = products.filter(product => !product.battery_life_months).length
    const missingSecurity = products.filter(product => !product.ansi_grade && !product.encryption_type).length
    const notes = [
        missingPrice > 0 ? `${missingPrice} model${missingPrice === 1 ? '' : 's'} need retailer price confirmation` : null,
        missingBattery > 0 ? `${missingBattery} model${missingBattery === 1 ? '' : 's'} have no listed battery-life value` : null,
        missingSecurity > 0 ? `${missingSecurity} model${missingSecurity === 1 ? '' : 's'} have limited security certification detail` : null,
    ].filter(Boolean)
    return notes.length > 0 ? notes.join('; ') + '.' : 'Core price, battery, and security fields are present for the ranked models.'
}

function getDecisionTree(products: NonNullable<Awaited<ReturnType<typeof getTopNPageData>>>['products']) {
    const hasBudget = products.some((product) => product.price_usd != null)
    const hasFingerprint = products.some((product) => product.has_fingerprint)
    const hasMatter = products.some((product) => product.supports_matter)
    const protocolLeaders = Array.from(new Set(products.map((product) => product.protocol.toUpperCase()))).slice(0, 3)

    return [
        {
            title: 'Start with protocol fit',
            detail: protocolLeaders.length > 0
                ? `Shortlist the locks that match your hub or ecosystem first: ${protocolLeaders.join(', ')} appear most often on this page.`
                : 'Shortlist the locks that match your hub or ecosystem first.',
        },
        {
            title: 'Then choose your access method',
            detail: hasFingerprint
                ? 'Decide whether you need keypad-only access or fingerprint plus keypad for faster entry management.'
                : 'Decide whether keypad access alone is enough or whether you need stronger app and remote-access workflows.',
        },
        {
            title: 'Balance battery vs convenience',
            detail: hasMatter
                ? 'Matter and multi-protocol options improve ecosystem flexibility, but battery-life differences still matter for maintenance planning.'
                : 'Convenience features are useful only if the lock still meets your battery-life and maintenance target.',
        },
        {
            title: 'Finish with price and install fit',
            detail: hasBudget
                ? 'Compare listed price bands, door specs, and security grade before buying the top-ranked model.'
                : 'Confirm door specs and security grade before buying the top-ranked model.',
        },
    ]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const page = await TopNPageModel.getBySlug(slug)
    if (!page) return { title: 'Not Found' }

    const title = page.meta_title || `${page.h1_title || page.title} (${CURRENT_YEAR}) | SLockHub`
    const description = page.meta_description || page.intro_text || `Compare the best ${page.title.toLowerCase()} with ranked picks, key specs, battery life, protocol support, and direct review links.`

    return {
        title,
        description,
        alternates: { canonical: `/best/${slug}` },
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
        const pages = await TopNPageModel.getAllSlugs()
        return pages.map(p => ({ slug: p.slug }))
    } catch {
        return []
    }
}



export default async function TopNPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const pageData = await getTopNPageData(slug)

    if (!pageData) notFound()

    const topProducts = pageData.products.slice(0, 3)
    const methodology = getSelectionMethodology(pageData.title, pageData.products.length)
    const decisionTree = getDecisionTree(pageData.products)
    const intentSignals = getIntentSignals(slug)
    const protocolCount = new Set(pageData.products.flatMap((product) => [product.protocol, product.secondary_protocol].filter(Boolean))).size
    const batteryValues = pageData.products.map((product) => product.battery_life_months).filter((value): value is number => value != null)
    const bestBatteryLife = batteryValues.length > 0 ? `${Math.max(...batteryValues)} months` : 'Varies by model'
    const pageUrl = `https://www.slockhub.com/best/${slug}`

    return (
        <div className="page-bg">
            {/* Structured Data: BreadcrumbList + ItemList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'WebPage',
                            name: pageData.h1_title || pageData.title,
                            description: pageData.intro_text || '',
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
                                { '@type': 'ListItem', position: 2, name: 'Brands', item: 'https://www.slockhub.com/brands' },
                                { '@type': 'ListItem', position: 3, name: pageData.title, item: pageUrl },
                            ],
                        },
                        ...(pageData.products.length > 0 ? [{
                            '@context': 'https://schema.org',
                            '@type': 'ItemList',
                            name: pageData.h1_title || pageData.title,
                            description: pageData.intro_text || '',
                            numberOfItems: pageData.products.length,
                            itemListElement: pageData.products.map((product, i) => ({
                                '@type': 'ListItem',
                                position: i + 1,
                                name: `${product.brand_name} ${product.name}`,
                                url: `https://www.slockhub.com/brands/${product.brand_slug}/${product.slug}`,
                            })),
                        }] : []),
                        ...topProducts.map((product) => ({
                            '@context': 'https://schema.org',
                            '@type': 'Product',
                            name: `${product.brand_name} ${product.name}`,
                            description: product.description || '',
                            category: pageData.title,
                            brand: {
                                '@type': 'Brand',
                                name: product.brand_name,
                            },
                            url: `https://www.slockhub.com/brands/${product.brand_slug}/${product.slug}`,
                            additionalProperty: [
                                { '@type': 'PropertyValue', name: 'Protocol', value: product.protocol.toUpperCase() },
                                ...(product.battery_life_months ? [{ '@type': 'PropertyValue', name: 'Battery Life', value: `${product.battery_life_months} months` }] : []),
                                ...(product.ansi_grade ? [{ '@type': 'PropertyValue', name: 'ANSI Grade', value: `Grade ${product.ansi_grade}` }] : []),
                            ],
                        })),
                    ]),
                }}
            />
            <div className="container-main section">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
                    <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Home</Link>
                    <span>/</span>
                    <Link href="/brands" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Brands</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{pageData.title}</span>
                </nav>

                {/* Header */}
                <div className="page-header" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <h1 className="page-header__title">{pageData.h1_title || pageData.title}</h1>
                    {pageData.intro_text && (
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '800px', fontSize: '1.05rem' }}>
                            {pageData.intro_text}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <SummaryStat label="Top picks reviewed" value={`${pageData.products.length}`} detail={`Updated shortlist for ${CURRENT_YEAR}`} />
                    <SummaryStat label="Protocol coverage" value={`${protocolCount || 1}`} detail="Distinct connectivity options represented" />
                    <SummaryStat label="Best battery life" value={bestBatteryLife} detail="Among ranked models on this page" />
                </div>

                <div className="content-card" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <h2 className="section-title">How This List Was Selected</h2>
                    <div className="space-y-3">
                        {methodology.map((item) => (
                            <p key={item} style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: 'var(--space-2xl)' }}>
                    {intentSignals.map((signal) => (
                        <SummaryStat key={signal.label} label="Ranking signal" value={signal.label} detail={signal.detail} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Product Rankings */}
                    <div className="lg:col-span-3 space-y-6">
                        {pageData.products.map((product, index) => (
                            <div key={product.slug} className="content-card" style={{ position: 'relative' }}>
                                {/* Rank badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: 'var(--space-md)',
                                    right: 'var(--space-md)',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: index < 3 ? 'var(--color-bg-dark)' : 'var(--color-bg-alt)',
                                    color: index < 3 ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '1.125rem',
                                }}>
                                    #{index + 1}
                                </div>

                                <div style={{ paddingRight: '60px' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>
                                        {product.brand_name}
                                    </div>
                                    <Link
                                        href={`/brands/${product.brand_slug}/${product.slug}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <h2 style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            color: 'var(--color-text-primary)',
                                            marginBottom: 'var(--space-sm)',
                                        }}>
                                            {product.name}
                                        </h2>
                                    </Link>

                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
                                        {product.description}
                                    </p>

                                    {/* Key Specs row */}
                                    <div className="flex flex-wrap gap-3" style={{ marginBottom: 'var(--space-md)' }}>
                                        <MiniSpec label="Protocol" value={product.protocol.toUpperCase()} />
                                        <MiniSpec label="Battery" value={product.battery_life_months ? `${product.battery_life_months} mo` : '—'} />
                                        {product.ansi_grade && <MiniSpec label="Security" value={`Grade ${product.ansi_grade}`} />}

                                        {product.has_fingerprint && <MiniSpec label="Fingerprint" value="Yes" />}
                                    </div>

                                    <div className="flex flex-wrap gap-2" style={{ marginBottom: 'var(--space-md)' }}>
                                        {getBestForBadges(product).map((badge) => (
                                            <span key={badge} className="badge badge-default">{badge}</span>
                                        ))}
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-3">
                                        <StarRating productId={product.id} size="sm" />
                                        <Link
                                            href={`/brands/${product.brand_slug}/${product.slug}`}
                                            style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}
                                        >
                                            Full Review →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {pageData.products.length === 0 && (
                            <div className="content-card" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
                                <p style={{ color: 'var(--color-text-muted)' }}>No products found for this category yet. Check back soon!</p>
                            </div>
                        )}

                        {pageData.products.length > 0 && (
                            <div className="content-card">
                                <h2 className="section-title">Full Comparison Matrix</h2>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                                    Missing-data note: {getMissingDataNote(pageData.products)}
                                </p>
                                <div className="data-table-wrap comparison-table-desktop">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Rank</th>
                                                <th>Model</th>
                                                <th>Protocol</th>
                                                <th>Battery</th>
                                                <th>Price</th>
                                                <th>Security</th>
                                                <th>Fingerprint</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pageData.products.map((product, index) => (
                                                <tr key={product.slug}>
                                                    <td>#{index + 1}</td>
                                                    <td>
                                                        <Link href={`/brands/${product.brand_slug}/${product.slug}`} style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontWeight: 600 }}>
                                                            {product.brand_name} {product.name}
                                                        </Link>
                                                    </td>
                                                    <td>{product.protocol.toUpperCase()}</td>
                                                    <td>{product.battery_life_months ? `${product.battery_life_months} mo` : '—'}</td>
                                                    <td>{product.price_usd ? `$${product.price_usd}` : '—'}</td>
                                                    <td>{product.ansi_grade ? `Grade ${product.ansi_grade}` : '—'}</td>
                                                    <td>{product.has_fingerprint ? 'Yes' : 'No'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="comparison-card-grid">
                                    {pageData.products.map((product, index) => (
                                        <Link
                                            key={product.slug}
                                            href={`/brands/${product.brand_slug}/${product.slug}`}
                                            className="comparison-card"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div className="comparison-card__eyebrow">#{index + 1} · {product.brand_name}</div>
                                            <div className="comparison-card__title">{product.name}</div>
                                            <div className="comparison-card__rows">
                                                <div className="comparison-card__row">
                                                    <span className="comparison-card__label">Protocol</span>
                                                    <span className="comparison-card__value">{product.protocol.toUpperCase()}</span>
                                                </div>
                                                <div className="comparison-card__row">
                                                    <span className="comparison-card__label">Battery</span>
                                                    <span className="comparison-card__value">{product.battery_life_months ? `${product.battery_life_months} mo` : '—'}</span>
                                                </div>
                                                <div className="comparison-card__row">
                                                    <span className="comparison-card__label">Price</span>
                                                    <span className="comparison-card__value">{product.price_usd ? `$${product.price_usd}` : '—'}</span>
                                                </div>
                                                <div className="comparison-card__row">
                                                    <span className="comparison-card__label">Security</span>
                                                    <span className="comparison-card__value">{product.ansi_grade ? `Grade ${product.ansi_grade}` : '—'}</span>
                                                </div>
                                                <div className="comparison-card__row">
                                                    <span className="comparison-card__label">Fingerprint</span>
                                                    <span className="comparison-card__value">{product.has_fingerprint ? 'Yes' : 'No'}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Comparison Table Mini */}
                        <div className="content-card">
                            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-md)', fontSize: '1rem' }}>Quick Comparison</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', fontSize: '0.75rem', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                                            <th style={{ textAlign: 'left', padding: '4px 2px', color: 'var(--color-text-muted)' }}>Lock</th>
                                            <th style={{ textAlign: 'right', padding: '4px 2px', color: 'var(--color-text-muted)' }}>Protocol</th>
                                            <th style={{ textAlign: 'right', padding: '4px 2px', color: 'var(--color-text-muted)' }}>Battery</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pageData.products.slice(0, 5).map((p, i) => (
                                            <tr key={p.slug} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <td style={{ padding: '6px 2px', fontWeight: 500 }}>
                                                    <span style={{ marginRight: '4px', color: 'var(--color-text-muted)' }}>{i + 1}.</span>
                                                    {p.brand_name}
                                                </td>
                                                <td style={{ textAlign: 'right', padding: '6px 2px' }}>{p.protocol.toUpperCase()}</td>
                                                <td style={{ textAlign: 'right', padding: '6px 2px' }}>{p.battery_life_months ? `${p.battery_life_months}mo` : '—'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Related Categories */}
                        <div className="content-card">
                            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-md)', fontSize: '1rem' }}>Related Categories</h3>
                            <div className="space-y-2">
                                {[
                                    { slug: 'smart-locks-2026', label: 'Best Overall 2026' },
                                    { slug: 'wifi-smart-locks', label: 'Best Wi-Fi Locks' },
                                    { slug: 'z-wave-smart-locks', label: 'Best Z-Wave Locks' },
                                    { slug: 'fingerprint-smart-locks', label: 'Best Fingerprint Locks' },
                                    { slug: 'budget-smart-locks', label: 'Best Budget Locks' },
                                ].filter(c => c.slug !== slug).slice(0, 4).map(cat => (
                                    <Link
                                        key={cat.slug}
                                        href={`/best/${cat.slug}`}
                                        style={{
                                            display: 'block',
                                            padding: 'var(--space-sm)',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: '0.875rem',
                                            color: 'var(--color-accent)',
                                            textDecoration: 'none',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {cat.label} →
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Calculator CTA */}
                        <div className="content-card">
                            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-md)', fontSize: '1rem' }}>Calculate Your Needs</h3>
                            <div className="space-y-2">
                                <Link href="/calculators/battery-life" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center', fontSize: '0.875rem' }}>
                                    Battery Life Calculator
                                </Link>
                                <Link href="/calculators/lock-tco" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center', fontSize: '0.875rem' }}>
                                    Total Cost Calculator
                                </Link>
                            </div>
                        </div>

                        <div className="content-card">
                            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-md)', fontSize: '1rem' }}>Buyer Decision Tree</h3>
                            <div className="space-y-4">
                                {decisionTree.map((step, index) => (
                                    <div key={step.title}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                                            Step {index + 1}
                                        </div>
                                        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                                            {step.title}
                                        </div>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                            {step.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                {pageData.faqs.length > 0 && (
                    <div className="content-card" style={{ marginTop: 'var(--space-3xl)' }}>
                        <h2 className="section-title">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {pageData.faqs.map((faq, i) => (
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
                )}

                <SeoPathways topic="comparison" title="Compare Before You Buy" />

                <div className="mobile-action-bar">
                    <div className="mobile-action-bar__inner">
                        <Link href="/calculators/lock-tco" className="btn btn-primary">Calculate TCO</Link>
                        <Link href="/compare" className="btn btn-secondary">Compare Brands</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

function MiniSpec({ label, value }: { label: string; value: string }) {
    return (
        <div style={{
            padding: 'var(--space-xs) var(--space-sm)',
            background: 'var(--color-bg-alt)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
        }}>
            <span style={{ color: 'var(--color-text-muted)' }}>{label}: </span>
            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{value}</span>
        </div>
    )
}

function SummaryStat({ label, value, detail }: { label: string; value: string; detail: string }) {
    return (
        <div className="content-card" style={{ margin: 0 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>
                {label}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                {value}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {detail}
            </p>
        </div>
    )
}
