import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import StarRating from '@/components/brands/StarRating'
import { getBrandBySlug } from '@/lib/services/brand-service'
import { BrandModel, type Brand, type Product } from '@/lib/db/brand-models'

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const brand = await BrandModel.getBySlug(slug)
    if (!brand) return { title: 'Brand Not Found' }

    const title = brand.meta_title || `${brand.name} Smart Locks — SLockHub.com`
    const description = brand.meta_description || brand.description || ''
    const canonical = `/brands/${slug}`

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
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
        const brands = await BrandModel.getAll()
        return brands.map(b => ({ slug: b.slug }))
    } catch {
        return []
    }
}

function getProtocols(brand: { supports_wifi: boolean; supports_zigbee: boolean; supports_zwave: boolean; supports_thread: boolean; supports_matter: boolean; supports_bluetooth: boolean }) {
    const protocols: string[] = []
    if (brand.supports_wifi) protocols.push('Wi-Fi')
    if (brand.supports_zigbee) protocols.push('Zigbee')
    if (brand.supports_zwave) protocols.push('Z-Wave')
    if (brand.supports_thread) protocols.push('Thread')
    if (brand.supports_matter) protocols.push('Matter')
    if (brand.supports_bluetooth) protocols.push('Bluetooth')
    return protocols
}

const PROTOCOL_MATRIX = [
    { label: 'Wi-Fi', slug: 'wifi', field: 'supports_wifi', match: ['wifi', 'wi-fi'] },
    { label: 'Zigbee', slug: 'zigbee', field: 'supports_zigbee', match: ['zigbee'] },
    { label: 'Z-Wave', slug: 'z-wave', field: 'supports_zwave', match: ['zwave', 'z-wave'] },
    { label: 'Thread', slug: 'thread', field: 'supports_thread', match: ['thread'] },
    { label: 'Matter', slug: 'matter', field: 'supports_matter', match: ['matter'] },
    { label: 'Bluetooth', slug: 'bluetooth', field: 'supports_bluetooth', match: ['bluetooth', 'ble'] },
] as const

function normalizeProtocol(value: string | undefined): string {
    return (value || '').toLowerCase().replace(/\s+/g, '-')
}

function productMatchesProtocol(product: Product, matches: readonly string[]): boolean {
    const primary = normalizeProtocol(product.protocol)
    const secondary = normalizeProtocol(product.secondary_protocol)
    return matches.some(match => primary.includes(match) || secondary.includes(match)) || (matches.includes('matter') && product.supports_matter)
}

function getTopProducts(products: Product[]): Product[] {
    return [...products].sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating
        if (b.review_count !== a.review_count) return b.review_count - a.review_count
        return a.display_order - b.display_order
    }).slice(0, 3)
}

function getPriceRange(products: Product[]): string {
    const prices = products.map(product => product.price_usd).filter((price): price is number => price != null)
    if (prices.length === 0) return 'Retailer pricing varies'
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    return min === max ? formatPrice(min) : `${formatPrice(min)}-${formatPrice(max)}`
}

function formatPrice(price: number): string {
    const normalized = price >= 1000 ? price / 100 : price
    return `$${Math.round(normalized)}`
}

function getAvgBattery(products: Product[]): string {
    const months = products.map(product => product.battery_life_months).filter((value): value is number => value != null)
    if (months.length === 0) return 'Battery data varies'
    return `${Math.round(months.reduce((sum, value) => sum + value, 0) / months.length)} months avg`
}

function getBrandVerdict(brand: Brand, products: Product[], protocols: string[]): string {
    const matterCount = products.filter(product => product.supports_matter).length
    const fingerprintCount = products.filter(product => product.has_fingerprint).length
    const remoteCount = products.filter(product => product.has_remote_access || product.has_guest_codes).length
    const protocolText = protocols.length > 0 ? protocols.join(', ') : 'core smart-lock protocols'

    if (brand.target_market?.toLowerCase().includes('commercial') || remoteCount >= Math.max(2, products.length / 2)) {
        return `${brand.name} is strongest as a managed-access shortlist: ${products.length} active model${products.length === 1 ? '' : 's'}, ${remoteCount} with remote or guest-code workflows, and protocol coverage across ${protocolText}.`
    }
    if (matterCount > 0) {
        return `${brand.name} is a good fit when ecosystem flexibility matters: ${matterCount} model${matterCount === 1 ? '' : 's'} in this catalog support Matter, with ${protocolText} coverage for different hub setups.`
    }
    if (fingerprintCount > 0) {
        return `${brand.name} is worth shortlisting for convenience-led entry: ${fingerprintCount} model${fingerprintCount === 1 ? '' : 's'} include fingerprint access, backed by ${getAvgBattery(products)} battery data where available.`
    }
    return `${brand.name} is best treated as a protocol-and-door-fit shortlist. Use the matrix below to choose a model by hub compatibility, battery expectations, and available installation specs.`
}

function getUseCaseFit(brand: Brand, products: Product[], protocols: string[]) {
    const lowerMarket = brand.target_market?.toLowerCase() || ''
    return [
        {
            label: 'Homeowners',
            verdict: protocols.some(protocol => ['Wi-Fi', 'Matter', 'Thread', 'Bluetooth'].includes(protocol)) ? 'Strong fit' : 'Check hub needs',
            detail: `${protocols.join(', ') || 'Protocol'} support plus ${getPriceRange(products)} pricing gives homeowners a practical shortlist.`,
        },
        {
            label: 'Rentals and Airbnb',
            verdict: products.some(product => product.has_guest_codes || product.has_remote_access) ? 'Good candidate' : 'Verify access tools',
            detail: `${products.filter(product => product.has_guest_codes || product.has_remote_access).length} model${products.filter(product => product.has_guest_codes || product.has_remote_access).length === 1 ? '' : 's'} expose guest-code or remote-access fields in the catalog.`,
        },
        {
            label: 'Commercial doors',
            verdict: lowerMarket.includes('commercial') || products.some(product => product.ansi_grade === '1' || product.ul_listed) ? 'Shortlist-worthy' : 'Secondary fit',
            detail: `${products.filter(product => product.ansi_grade || product.ul_listed).length} model${products.filter(product => product.ansi_grade || product.ul_listed).length === 1 ? '' : 's'} include ANSI or UL evidence.`,
        },
        {
            label: 'Matter-first homes',
            verdict: products.some(product => product.supports_matter) ? 'Supported' : 'Limited support',
            detail: products.some(product => product.supports_matter) ? `${products.filter(product => product.supports_matter).length} Matter-capable model${products.filter(product => product.supports_matter).length === 1 ? '' : 's'} are available.` : 'Choose a Matter-first brand or compare against Yale, Aqara, or Level before buying.',
        },
    ]
}

function getCompareLinks(brandSlug: string, brandName: string) {
    return ['yale', 'schlage', 'august', 'kwikset', 'eufy']
        .filter(candidate => candidate !== brandSlug)
        .slice(0, 3)
        .map(candidate => ({
            href: `/compare/${brandSlug}-vs-${candidate}`,
            label: `${brandName} vs ${candidate.charAt(0).toUpperCase()}${candidate.slice(1)}`,
        }))
}

function getBestLinks(products: Product[]) {
    const links: Array<{ href: string; label: string }> = []
    if (products.some(product => product.supports_matter)) links.push({ href: '/best/matter-smart-locks', label: 'Best Matter smart locks' })
    if (products.some(product => productMatchesProtocol(product, ['z-wave', 'zwave']))) links.push({ href: '/best/z-wave-smart-locks', label: 'Best Z-Wave smart locks' })
    if (products.some(product => productMatchesProtocol(product, ['zigbee']))) links.push({ href: '/best/zigbee-smart-locks', label: 'Best Zigbee smart locks' })
    if (products.some(product => productMatchesProtocol(product, ['wifi', 'wi-fi']))) links.push({ href: '/best/wifi-smart-locks', label: 'Best Wi-Fi smart locks' })
    if (links.length === 0) links.push({ href: '/best/smart-locks-2026', label: 'Best smart locks 2026' })
    return links.slice(0, 3)
}



export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const brand = await getBrandBySlug(slug)
    if (!brand) notFound()

    const protocols = getProtocols(brand)

    const allProducts = brand.series.flatMap(s => s.products)
    const topProducts = getTopProducts(allProducts)
    const compareLinks = getCompareLinks(brand.slug, brand.name)
    const bestLinks = getBestLinks(allProducts)
    const useCaseFit = getUseCaseFit(brand, allProducts, protocols)
    const pageUrl = `https://www.slockhub.com/brands/${brand.slug}`

    return (
        <div className="page-bg">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'WebPage',
                            name: `${brand.name} Smart Locks`,
                            description: brand.meta_description || brand.description || '',
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
                                { '@type': 'ListItem', position: 3, name: brand.name, item: pageUrl },
                            ],
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'Brand',
                            name: brand.name,
                            description: brand.description || brand.long_description || '',
                            url: pageUrl,
                            ...(brand.website_url && { sameAs: brand.website_url }),
                        },
                        ...(topProducts.length > 0 ? [{
                            '@context': 'https://schema.org',
                            '@type': 'ItemList',
                            name: `${brand.name} smart lock models`,
                            numberOfItems: topProducts.length,
                            itemListElement: topProducts.map((product, index) => ({
                                '@type': 'ListItem',
                                position: index + 1,
                                name: product.name,
                                url: `https://www.slockhub.com/brands/${brand.slug}/${product.slug}`,
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
                    <Link href="/brands" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Brands</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{brand.name}</span>
                </nav>

                {/* Brand Header */}
                <div className="content-card" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div style={{ flex: 1 }}>
                            <h1 className="page-header__title" style={{ marginBottom: 'var(--space-sm)' }}>{brand.name}</h1>
                            <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-md)' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    {brand.country} · Est. {brand.founded_year}
                                </span>

                            </div>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-lg)' }}>
                                {brand.long_description || brand.description}
                            </p>

                            <div className="flex flex-wrap gap-2" style={{ marginBottom: 'var(--space-md)' }}>
                                {protocols.map(p => (
                                    <span key={p} className="badge badge-accent">{p}</span>
                                ))}
                                <span className="badge badge-default" style={{ textTransform: 'capitalize' }}>{brand.price_tier}</span>
                                <span className="badge badge-default" style={{ textTransform: 'capitalize' }}>{brand.target_market}</span>
                            </div>

                            {brand.website_url && (
                                <a
                                    href={brand.website_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)' }}
                                >
                                    Visit {brand.name} <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <section className="content-card" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <h2 className="section-title">{brand.name} Verdict</h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: 'var(--space-lg)' }}>
                        {getBrandVerdict(brand, allProducts, protocols)}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <SummaryStat label="Active models" value={`${allProducts.length}`} detail={`${brand.series.length} product line${brand.series.length === 1 ? '' : 's'}`} />
                        <SummaryStat label="Protocol coverage" value={`${protocols.length}`} detail={protocols.join(', ') || 'Verify model specs'} />
                        <SummaryStat label="Price band" value={getPriceRange(allProducts)} detail="Based on listed product prices" />
                        <SummaryStat label="Battery planning" value={getAvgBattery(allProducts)} detail="Average where listed" />
                    </div>
                </section>

                <section style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Protocol Support Matrix</h2>
                    <div className="card overflow-hidden p-0">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Protocol</th>
                                    <th>Brand support</th>
                                    <th>Catalog evidence</th>
                                    <th>Next step</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PROTOCOL_MATRIX.map(item => {
                                    const supported = Boolean(brand[item.field as keyof typeof brand])
                                    const count = allProducts.filter(product => productMatchesProtocol(product, item.match)).length
                                    return (
                                        <tr key={item.label}>
                                            <td className="font-medium text-color-primary">{item.label}</td>
                                            <td>{supported ? 'Supported' : 'Not listed'}</td>
                                            <td>{count > 0 ? `${count} matching model${count === 1 ? '' : 's'}` : 'No matching product field yet'}</td>
                                            <td>
                                                <Link href={`/protocols/${item.slug}`} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                                                    View {item.label} guide
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>

                {topProducts.length > 0 && (
                    <section style={{ marginBottom: 'var(--space-3xl)' }}>
                        <h2 className="section-title">Best {brand.name} Models to Compare First</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {topProducts.map(product => (
                                <Link
                                    key={product.slug}
                                    href={`/brands/${brand.slug}/${product.slug}`}
                                    className="link-card"
                                >
                                    <h3 className="link-card__title">{product.name}</h3>
                                    <p className="link-card__desc">
                                        {product.protocol.toUpperCase()}{product.supports_matter ? ' · Matter' : ''}{product.battery_life_months ? ` · ${product.battery_life_months} mo battery` : ''}{product.ansi_grade ? ` · Grade ${product.ansi_grade}` : ''}
                                    </p>
                                    <div style={{ marginTop: 'var(--space-sm)' }}>
                                        <StarRating productId={product.id} size="sm" showCount={false} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Use-Case Fit</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {useCaseFit.map(item => (
                            <div key={item.label} className="card" style={{ background: 'var(--color-bg-alt)' }}>
                                <div className="flex items-center justify-between gap-3" style={{ marginBottom: 'var(--space-sm)' }}>
                                    <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{item.label}</h3>
                                    <span className="badge badge-accent">{item.verdict}</span>
                                </div>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Alternatives and Buying Paths</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {compareLinks.map(link => (
                            <Link key={link.href} href={link.href} className="link-card">
                                <h3 className="link-card__title">{link.label}</h3>
                                <p className="link-card__desc">Compare protocol coverage, price bands, access features, and battery evidence.</p>
                            </Link>
                        ))}
                        {bestLinks.map(link => (
                            <Link key={link.href} href={link.href} className="link-card">
                                <h3 className="link-card__title">{link.label}</h3>
                                <p className="link-card__desc">Move from brand research to ranked models with methodology and spec tables.</p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Product Series */}
                <h2 className="section-title" style={{ marginBottom: 'var(--space-xl)' }}>
                    {brand.name} Product Lines ({allProducts.length} products)
                </h2>

                {brand.series.map(series => (
                    <div key={series.slug} className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
                        <div style={{ marginBottom: 'var(--space-lg)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                                {series.name}
                            </h3>
                            {series.description && (
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{series.description}</p>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {series.products.map(product => (
                                <Link
                                    key={product.slug}
                                    href={`/brands/${brand.slug}/${product.slug}`}
                                    className="card card-hover"
                                    style={{ padding: 'var(--space-lg)', textDecoration: 'none', color: 'inherit' }}
                                >
                                    <h4 style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)', fontSize: '1rem' }}>
                                        {product.name}
                                    </h4>

                                    <div className="flex flex-wrap gap-1" style={{ marginBottom: 'var(--space-sm)' }}>
                                        <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>{product.protocol.toUpperCase()}</span>
                                        {product.ansi_grade && (
                                            <span className="badge badge-default" style={{ fontSize: '0.7rem' }}>Grade {product.ansi_grade}</span>
                                        )}
                                        {product.has_fingerprint && (
                                            <span className="badge badge-default" style={{ fontSize: '0.7rem' }}>Fingerprint</span>
                                        )}
                                    </div>

                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                        <div className="flex justify-between" style={{ marginBottom: '2px' }}>
                                            <span>Battery</span>
                                            <span style={{ fontWeight: 500 }}>
                                                {product.battery_count}× {product.battery_type} · {product.battery_life_months} mo
                                            </span>
                                        </div>

                                        <div style={{ marginTop: '4px' }}>
                                            <StarRating productId={product.id} size="sm" showCount={false} />
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 'var(--space-sm)', paddingTop: 'var(--space-sm)', borderTop: '1px solid var(--color-border)', textAlign: 'right' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600 }}>View Details →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                {/* CTA to calculators */}
                <div className="cta-section">
                    <h2 className="cta-section__title" style={{ fontSize: '1.5rem' }}>Calculate with {brand.name} Products</h2>
                    <p style={{ opacity: 0.9, marginBottom: 'var(--space-lg)' }}>
                        Use our calculators to estimate battery life, total cost of ownership, and more for {brand.name} smart locks.
                    </p>
                    <div className="grid-actions">
                        <Link href="/calculators/battery-life" className="btn btn-primary btn-lg">
                            Battery Life Calculator
                        </Link>
                        <Link href="/calculators/lock-tco" className="btn btn-secondary btn-lg">
                            Cost Calculator
                        </Link>
                        <Link href="/calculators/protocol-wizard" className="btn btn-secondary btn-lg">
                            Protocol Wizard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SummaryStat({ label, value, detail }: { label: string; value: string; detail: string }) {
    return (
        <div className="card" style={{ background: 'var(--color-bg-alt)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>{label}</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>{value}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{detail}</div>
        </div>
    )
}
