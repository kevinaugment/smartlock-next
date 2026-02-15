import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExternalLink, ArrowLeft, Check, X } from 'lucide-react'
import StarRating from '@/components/brands/StarRating'
import { getBrandBySlug } from '@/lib/services/brand-service'
import { BrandModel } from '@/lib/db/brand-models'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const brand = await BrandModel.getBySlug(slug)
    if (!brand) return { title: 'Brand Not Found' }

    return {
        title: brand.meta_title || `${brand.name} Smart Locks — SLockHub.com`,
        description: brand.meta_description || brand.description || '',
        alternates: { canonical: `/brands/${slug}` },
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



export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const brand = await getBrandBySlug(slug)
    if (!brand) notFound()

    const protocols = getProtocols(brand)

    const allProducts = brand.series.flatMap(s => s.products)

    return (
        <div className="page-bg">
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
