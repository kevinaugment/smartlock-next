'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface RecommendedProduct {
    name: string
    slug: string
    brand_name: string
    brand_slug: string
    protocol: string
    battery_life_months: number | null
    price_usd: number | null
    rating: number
    has_fingerprint: boolean
    has_keypad: boolean
    ansi_grade: string | null
}

interface ProductRecommendationProps {
    protocol?: string
    batteryType?: string
    maxPrice?: number
    needsFingerprint?: boolean
    needsKeypad?: boolean
}



export default function ProductRecommendation({
    protocol,
    batteryType,
    maxPrice,
    needsFingerprint,
    needsKeypad,
}: ProductRecommendationProps) {
    const [products, setProducts] = useState<RecommendedProduct[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!protocol) return

        setLoading(true)
        const params = new URLSearchParams()
        if (protocol) params.set('tag_type', 'protocol')
        if (protocol) params.set('tag_value', protocol)
        params.set('limit', '3')
        params.set('sort_by', 'rating')

        fetch(`/api/products?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    setProducts(data.data.slice(0, 3))
                }
            })
            .catch(() => { /* API not available */ })
            .finally(() => setLoading(false))
    }, [protocol, batteryType, maxPrice, needsFingerprint, needsKeypad])

    if (!protocol || loading || products.length === 0) return null

    return (
        <div style={{ marginTop: 'var(--space-xl)' }}>
            <div style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-md)',
            }}>
                Recommended {protocol.toUpperCase()} Locks
            </div>

            <div className="space-y-3">
                {products.map((p, i) => (
                    <Link
                        key={p.slug}
                        href={`/brands/${p.brand_slug}/${p.slug}`}
                        style={{
                            display: 'block',
                            padding: 'var(--space-md)',
                            background: 'var(--color-bg-alt)',
                            borderRadius: 'var(--radius-md)',
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                     prefetch={false}>
                        <div className="flex items-start justify-between">
                            <div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{p.brand_name}</div>
                                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>{p.name}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                {p.battery_life_months && (
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                        {p.battery_life_months}mo battery
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1" style={{ marginTop: 'var(--space-xs)' }}>
                            <span style={{ fontSize: '0.65rem', padding: '1px 6px', background: 'var(--color-bg-dark)', color: 'var(--color-text-inverse)', borderRadius: '3px' }}>
                                {p.protocol.toUpperCase()}
                            </span>
                            {p.battery_life_months && (
                                <span style={{ fontSize: '0.65rem', padding: '1px 6px', background: 'var(--color-border)', borderRadius: '3px' }}>
                                    {p.battery_life_months}mo battery
                                </span>
                            )}
                            {p.ansi_grade && (
                                <span style={{ fontSize: '0.65rem', padding: '1px 6px', background: 'var(--color-border)', borderRadius: '3px' }}>
                                    Grade {p.ansi_grade}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            <Link
                href={`/best/${protocol}-smart-locks`}
                style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: 'var(--space-sm)',
                    fontSize: '0.8rem',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    textDecoration: 'none',
                }}
             prefetch={false}>
                View All {protocol.toUpperCase()} Locks →
            </Link>
        </div>
    )
}
