'use client'

import { useState, useEffect, useCallback } from 'react'

interface CalculatorProduct {
    id: number
    name: string
    slug: string
    brand_name: string
    brand_slug: string
    protocol: string
    battery_type: string | null
    battery_count: number | null
    battery_life_months: number | null
    standby_power_mw: number | null
    active_power_mw: number | null
    ansi_grade: string | null
    has_fingerprint: boolean
    has_keypad: boolean
    max_pin_codes: number | null
    max_fingerprints: number | null
    door_thickness_min_mm: number | null
    door_thickness_max_mm: number | null
    bore_diameter_mm: number | null
    rf_frequency: string | null
    rf_range_meters: number | null
    price_usd: number | null
}

interface LockModelSelectorProps {
    onSelect: (product: CalculatorProduct | null) => void
    selectedSlug?: string
}

export default function LockModelSelector({ onSelect, selectedSlug }: LockModelSelectorProps) {
    const [products, setProducts] = useState<CalculatorProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedBrand, setSelectedBrand] = useState('')
    const [selectedProduct, setSelectedProduct] = useState('')

    useEffect(() => {
        fetch('/api/products?for_calculator=1')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    setProducts(data.data)
                }
            })
            .catch(() => { /* API not available */ })
            .finally(() => setLoading(false))
    }, [])

    // Group products by brand
    const brands = Array.from(new Set(products.map(p => p.brand_slug)))
    const brandProducts = selectedBrand
        ? products.filter(p => p.brand_slug === selectedBrand)
        : []

    const handleBrandChange = useCallback((brandSlug: string) => {
        setSelectedBrand(brandSlug)
        setSelectedProduct('')
        onSelect(null)
    }, [onSelect])

    const handleProductChange = useCallback((productSlug: string) => {
        setSelectedProduct(productSlug)
        if (productSlug === '' || productSlug === 'custom') {
            onSelect(null)
            return
        }
        const product = products.find(p => p.slug === productSlug)
        if (product) {
            onSelect(product)
        }
    }, [products, onSelect])

    if (loading) {
        return (
            <div style={{ padding: 'var(--space-md)', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Loading lock models...</span>
            </div>
        )
    }

    if (products.length === 0) return null

    const labelStyle = { display: 'block' as const, fontSize: '0.875rem', fontWeight: 500 as const, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }

    return (
        <div style={{ padding: 'var(--space-lg)', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>
                Quick Fill — Select Lock Model
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label style={labelStyle}>Brand</label>
                    <select
                        value={selectedBrand}
                        onChange={(e) => handleBrandChange(e.target.value)}
                        className="form-input"
                    >
                        <option value="">Choose brand...</option>
                        {brands.map(slug => {
                            const brand = products.find(p => p.brand_slug === slug)
                            return (
                                <option key={slug} value={slug}>{brand?.brand_name || slug}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label style={labelStyle}>Model</label>
                    <select
                        value={selectedProduct}
                        onChange={(e) => handleProductChange(e.target.value)}
                        className="form-input"
                        disabled={!selectedBrand}
                    >
                        <option value="">Choose model...</option>
                        <option value="custom">Custom / Manual Entry</option>
                        {brandProducts.map(p => (
                            <option key={p.slug} value={p.slug}>
                                {p.name} ({p.protocol.toUpperCase()})
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {selectedProduct && selectedProduct !== 'custom' && (
                <div style={{ marginTop: 'var(--space-sm)', fontSize: '0.75rem', color: 'var(--color-accent)' }}>
                    ✓ Parameters auto-filled from {products.find(p => p.slug === selectedProduct)?.name}
                </div>
            )}
        </div>
    )
}
