import Link from 'next/link'
import type { Metadata } from 'next'
import StarRating from '@/components/brands/StarRating'
import { notFound } from 'next/navigation'
import { getTopNPageData } from '@/lib/services/brand-service'
import { TopNPageModel } from '@/lib/db/brand-models'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const page = await TopNPageModel.getBySlug(slug)
    if (!page) return { title: 'Not Found' }

    return {
        title: page.meta_title || page.title,
        description: page.meta_description || '',
        alternates: { canonical: `/best/${slug}` },
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

    return (
        <div className="page-bg">
            {/* Structured Data: BreadcrumbList + ItemList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                                { '@type': 'ListItem', position: 2, name: 'Brands', item: 'https://www.slockhub.com/brands' },
                                { '@type': 'ListItem', position: 3, name: pageData.title },
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

                {/* FAQ Schema */}
                {pageData.faqs.length > 0 && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                '@context': 'https://schema.org',
                                '@type': 'FAQPage',
                                mainEntity: pageData.faqs.map(faq => ({
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
                )}
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
