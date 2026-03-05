import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, XCircle, ArrowRight, GitCompareArrows, Shield, Wifi, Battery, DollarSign, Fingerprint, Star } from 'lucide-react'
import { BrandModel, ProductModel, type Brand, type ProductWithBrand } from '@/lib/db/brand-models'

// ============================================
// 类型
// ============================================

interface ComparisonData {
    brand1: Brand
    brand2: Brand
    products1: ProductWithBrand[]
    products2: ProductWithBrand[]
}

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

    const [brand1, brand2] = await Promise.all([
        BrandModel.getBySlug(parsed.slug1),
        BrandModel.getBySlug(parsed.slug2),
    ])

    if (!brand1 || !brand2) return null

    const [products1, products2] = await Promise.all([
        ProductModel.getByBrandSlug(parsed.slug1),
        ProductModel.getByBrandSlug(parsed.slug2),
    ])

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
    const title = `${brand1.name} vs ${brand2.name} (2026): Which Smart Lock Is Better? — SLockHub.com`
    const description = `Side-by-side comparison of ${brand1.name} and ${brand2.name} smart locks. Compare prices (${price1} vs ${price2}), protocols, battery life, security features, and our expert verdict.`

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
    }
}

export async function generateStaticParams() {
    try {
        const brands = await BrandModel.getAll()
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

function getProtocols(products: ProductWithBrand[]): string[] {
    const protocols = new Set<string>()
    for (const p of products) {
        if (p.protocol) protocols.add(p.protocol.toUpperCase())
        if (p.secondary_protocol) protocols.add(p.secondary_protocol.toUpperCase())
    }
    return Array.from(protocols)
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

// ============================================
// 页面组件
// ============================================

export default async function BrandComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const data = await getComparisonData(slug)

    if (!data) notFound()

    const { brand1, brand2, products1, products2 } = data

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
                        Detailed smart lock comparison — protocols, features, pricing, and expert analysis
                    </p>
                </div>

                {/* Brand Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <BrandCard brand={brand1} productCount={products1.length} avgRating={getAvgRating(products1)} />
                    <BrandCard brand={brand2} productCount={products2.length} avgRating={getAvgRating(products2)} />
                </div>

                {/* Comparison Table */}
                <div style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 className="section-title">Side-by-Side Comparison</h2>
                    <div className="card overflow-hidden p-0">
                        <div className="overflow-x-auto">
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

                {/* FAQ Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'FAQPage',
                            mainEntity: faqs.map(faq => ({
                                '@type': 'Question',
                                name: faq.question,
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: faq.answer,
                                },
                            })),
                        }),
                    }}
                />
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
