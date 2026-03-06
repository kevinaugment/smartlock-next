import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Shield, Battery, Wifi, Key, Fingerprint } from 'lucide-react'
import StarRating from '@/components/brands/StarRating'
import { getProductBySlug } from '@/lib/services/brand-service'
import { ProductModel, BrandModel } from '@/lib/db/brand-models'

export async function generateMetadata({ params }: { params: Promise<{ slug: string; product: string }> }): Promise<Metadata> {
    const { product: productSlug } = await params
    const product = await ProductModel.getBySlug(productSlug)
    if (!product) return { title: 'Product Not Found' }

    return {
        title: product.meta_title || `${product.name} — SLockHub.com`,
        description: product.meta_description || product.description || '',
        alternates: { canonical: `/brands/${product.brand_slug}/${product.slug}` },
    }
}

export async function generateStaticParams() {
    try {
        const products = await ProductModel.getAll(200, 0)
        return products.map(p => ({ slug: p.brand_slug, product: p.slug }))
    } catch {
        return []
    }
}

function getPriceTier(cents: number | undefined): string {
    if (!cents) return 'Contact Manufacturer'
    const usd = cents / 100
    if (usd < 150) return 'Budget-Friendly'
    if (usd < 300) return 'Mid-Range'
    return 'Premium'
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string; product: string }> }) {
    const { slug: brandSlug, product: productSlug } = await params
    const product = await getProductBySlug(productSlug)

    if (!product || product.brand_slug !== brandSlug) notFound()

    const ecosystems = product.ecosystems

    return (
        <div className="page-bg">
            <div className="container-main section">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
                    <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Home</Link>
                    <span>/</span>
                    <Link href="/brands" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Brands</Link>
                    <span>/</span>
                    <Link href={`/brands/${product.brand_slug}`} style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>{product.brand_name}</Link>
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

                        {/* Connectivity Specs */}
                        <div className="content-card">
                            <h2 className="section-title">Connectivity</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <SpecItem label="Primary Protocol" value={product.protocol.toUpperCase()} />
                                {product.secondary_protocol && <SpecItem label="Secondary" value={product.secondary_protocol.toUpperCase()} />}
                                <SpecItem label="Matter Support" value={product.supports_matter ? 'Yes ✓' : 'No'} />
                                {product.rf_frequency && <SpecItem label="RF Frequency" value={product.rf_frequency} />}
                                {product.rf_range_meters && <SpecItem label="RF Range" value={`${product.rf_range_meters}m`} />}
                                {product.encryption_type && <SpecItem label="Encryption" value={product.encryption_type} />}
                            </div>
                        </div>

                        {/* Battery & Power */}
                        <div className="content-card">
                            <h2 className="section-title">Battery & Power</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {product.battery_type && <SpecItem label="Battery Type" value={product.battery_type} />}
                                {product.battery_count && <SpecItem label="Battery Count" value={`${product.battery_count}×`} />}
                                {product.battery_life_months && <SpecItem label="Battery Life" value={`${product.battery_life_months} months`} />}
                                {product.standby_power_mw != null && <SpecItem label="Standby Power" value={`${product.standby_power_mw} mW`} />}
                                {product.active_power_mw != null && <SpecItem label="Active Power" value={`${product.active_power_mw} mW`} />}
                            </div>
                        </div>

                        {/* Security */}
                        <div className="content-card">
                            <h2 className="section-title">Security</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {product.ansi_grade && <SpecItem label="ANSI/BHMA Grade" value={`Grade ${product.ansi_grade}`} />}
                                <SpecItem label="UL Listed" value={product.ul_listed ? 'Yes ✓' : 'No'} />
                                {product.encryption_type && <SpecItem label="Encryption" value={product.encryption_type} />}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="content-card">
                            <h2 className="section-title">Features</h2>
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
                                <h2 className="section-title">Installation Requirements</h2>
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
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Price Tier & Purchase */}
                        <div className="content-card" style={{ textAlign: 'center' }}>
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
                                    <span style={{ fontWeight: 600 }}>{product.protocol.toUpperCase()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ opacity: 0.8 }}>Battery Life</span>
                                    <span style={{ fontWeight: 600 }}>{product.battery_life_months} months</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ opacity: 0.8 }}>Security</span>
                                    <span style={{ fontWeight: 600 }}>Grade {product.ansi_grade || '—'}</span>
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
                                <Link href="/calculators/battery-life" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                                    Battery Life Calculator
                                </Link>
                                <Link href="/calculators/lock-tco" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                                    Total Cost of Ownership
                                </Link>
                                <Link href="/calculators/compatibility" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                                    Door Compatibility
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Product',
                            name: product.name,
                            description: product.description,
                            brand: { '@type': 'Brand', name: product.brand_name },
                            ...(product.model_number && { model: product.model_number }),
                            ...(product.price_usd && {
                                offers: {
                                    '@type': 'Offer',
                                    priceCurrency: 'USD',
                                    price: (product.price_usd / 100).toFixed(2),
                                    availability: 'https://schema.org/InStock',
                                },
                            }),

                        }),
                    }}
                />
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
