/**
 * Brand/Product 数据模型
 * 品牌 → 产品系列 → 产品（SKU）
 */

import { query, queryOne } from '@/lib/db'

// ============================================
// 品牌模型
// ============================================
export interface Brand {
    id: number
    name: string
    slug: string
    description?: string
    long_description?: string
    logo_url?: string
    website_url?: string
    country?: string
    founded_year?: number
    supports_wifi: boolean
    supports_zigbee: boolean
    supports_zwave: boolean
    supports_thread: boolean
    supports_matter: boolean
    supports_bluetooth: boolean
    target_market: string
    price_tier: string
    rating: number
    featured: boolean
    display_order: number
    status: string
    meta_title?: string
    meta_description?: string
    og_image_url?: string
    created_at: string
    updated_at: string
}

export const BrandModel = {
    async getAll(): Promise<Brand[]> {
        return query<Brand>(
            `SELECT * FROM brands WHERE status = 'published' ORDER BY display_order ASC`
        )
    },

    async getBySlug(slug: string): Promise<Brand | null> {
        return queryOne<Brand>(
            `SELECT * FROM brands WHERE slug = ? AND status = 'published'`,
            [slug]
        )
    },

    async getFeatured(): Promise<Brand[]> {
        return query<Brand>(
            `SELECT * FROM brands WHERE featured = 1 AND status = 'published' ORDER BY display_order ASC`
        )
    },
}

// ============================================
// 产品系列模型
// ============================================
export interface ProductSeries {
    id: number
    brand_id: number
    name: string
    slug: string
    description?: string
    image_url?: string
    release_year?: number
    price_range_min?: number
    price_range_max?: number
    is_active: boolean
    display_order: number
    created_at: string
    updated_at: string
}

export interface ProductSeriesSeoEntry {
    id: number
    brand_id: number
    name: string
}

export const ProductSeriesModel = {
    async getByBrandId(brandId: number): Promise<ProductSeries[]> {
        return query<ProductSeries>(
            `SELECT * FROM product_series WHERE brand_id = ? AND is_active = 1 ORDER BY display_order ASC`,
            [brandId]
        )
    },

    async getBySlug(slug: string): Promise<ProductSeries | null> {
        return queryOne<ProductSeries>(
            `SELECT * FROM product_series WHERE slug = ? AND is_active = 1`,
            [slug]
        )
    },

    async getAllForSeo(): Promise<ProductSeriesSeoEntry[]> {
        return query<ProductSeriesSeoEntry>(
            `SELECT id, brand_id, name
             FROM product_series
             WHERE is_active = 1
             ORDER BY brand_id ASC, display_order ASC`
        )
    },
}

// ============================================
// 产品模型
// ============================================
export interface Product {
    id: number
    series_id: number
    brand_id: number
    name: string
    slug: string
    model_number?: string
    description?: string
    image_url?: string
    price_usd?: number
    buy_url?: string
    protocol: string
    secondary_protocol?: string
    supports_matter: boolean
    battery_type?: string
    battery_count?: number
    battery_life_months?: number
    weight_grams?: number
    dimensions_json?: string
    ansi_grade?: string
    ul_listed: boolean
    encryption_type?: string
    has_fingerprint: boolean
    has_keypad: boolean
    has_auto_lock: boolean
    has_auto_unlock: boolean
    has_voice_control: boolean
    has_remote_access: boolean
    has_guest_codes: boolean
    has_activity_log: boolean
    has_physical_key: boolean
    door_thickness_min_mm?: number
    door_thickness_max_mm?: number
    bore_diameter_mm?: number
    backset_mm?: string
    standby_power_mw?: number
    active_power_mw?: number
    operations_per_day: number
    max_pin_codes?: number
    max_fingerprints?: number
    max_cards?: number
    max_app_users?: number
    rf_frequency?: string
    rf_range_meters?: number
    antenna_type?: string
    ecosystems_json?: string
    rating: number
    review_count: number
    meta_title?: string
    meta_description?: string
    is_active: boolean
    display_order: number
    created_at: string
    updated_at: string
}

/** Product with brand name attached */
export interface ProductWithBrand extends Product {
    brand_name: string
    brand_slug: string
}

export interface ProductSeoEntry {
    slug: string
    brand_slug: string
    updated_at: string
}

export const ProductModel = {
    async getAll(limit = 50, offset = 0): Promise<ProductWithBrand[]> {
        return query<ProductWithBrand>(
            `SELECT p.*, b.name AS brand_name, b.slug AS brand_slug
             FROM products p
             JOIN brands b ON p.brand_id = b.id
             WHERE p.is_active = 1
             ORDER BY p.rating DESC
             LIMIT ? OFFSET ?`,
            [limit, offset]
        )
    },

    async getAllForSeo(): Promise<ProductSeoEntry[]> {
        return query<ProductSeoEntry>(
            `SELECT p.slug, b.slug AS brand_slug, p.updated_at
             FROM products p
             JOIN brands b ON p.brand_id = b.id
             WHERE p.is_active = 1
             ORDER BY b.display_order ASC, p.display_order ASC, p.rating DESC`
        )
    },

    async getAllForComparison(): Promise<ProductWithBrand[]> {
        return query<ProductWithBrand>(
            `SELECT p.*, b.name AS brand_name, b.slug AS brand_slug
             FROM products p
             JOIN brands b ON p.brand_id = b.id
             WHERE p.is_active = 1
             ORDER BY b.display_order ASC, p.display_order ASC, p.rating DESC`
        )
    },

    async getBySlug(slug: string): Promise<ProductWithBrand | null> {
        return queryOne<ProductWithBrand>(
            `SELECT p.*, b.name AS brand_name, b.slug AS brand_slug
             FROM products p
             JOIN brands b ON p.brand_id = b.id
             WHERE p.slug = ? AND p.is_active = 1`,
            [slug]
        )
    },

    async getByBrandId(brandId: number): Promise<Product[]> {
        return query<Product>(
            `SELECT * FROM products WHERE brand_id = ? AND is_active = 1 ORDER BY display_order ASC, rating DESC`,
            [brandId]
        )
    },

    async getByBrandSlug(brandSlug: string): Promise<ProductWithBrand[]> {
        return query<ProductWithBrand>(
            `SELECT p.*, b.name AS brand_name, b.slug AS brand_slug
             FROM products p
             JOIN brands b ON p.brand_id = b.id
             WHERE b.slug = ? AND p.is_active = 1
             ORDER BY p.display_order ASC, p.rating DESC`,
            [brandSlug]
        )
    },

    async getBySeriesId(seriesId: number): Promise<Product[]> {
        return query<Product>(
            `SELECT * FROM products WHERE series_id = ? AND is_active = 1 ORDER BY display_order ASC`,
            [seriesId]
        )
    },

    async getByTag(tagType: string, tagValue: string, sortBy = 'rating', limit = 10): Promise<ProductWithBrand[]> {
        const orderClause = sortBy === 'price_usd' ? 'p.price_usd ASC' :
            sortBy === 'battery_life_months' ? 'p.battery_life_months DESC' :
                'p.rating DESC'
        return query<ProductWithBrand>(
            `SELECT DISTINCT p.*, b.name AS brand_name, b.slug AS brand_slug
             FROM products p
             JOIN brands b ON p.brand_id = b.id
             JOIN product_tags pt ON p.id = pt.product_id
             WHERE pt.tag_type = ? AND pt.tag_value = ? AND p.is_active = 1
             ORDER BY ${orderClause}
             LIMIT ?`,
            [tagType, tagValue, limit]
        )
    },

    /** 获取计算器用精简列表 */
    async getForCalculator(): Promise<Array<{
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
    }>> {
        return query(
            `SELECT p.id, p.name, p.slug, b.name AS brand_name, b.slug AS brand_slug,
                    p.protocol, p.battery_type, p.battery_count, p.battery_life_months,
                    p.standby_power_mw, p.active_power_mw,
                    p.ansi_grade, p.has_fingerprint, p.has_keypad,
                    p.max_pin_codes, p.max_fingerprints,
                    p.door_thickness_min_mm, p.door_thickness_max_mm, p.bore_diameter_mm,
                    p.rf_frequency, p.rf_range_meters, p.price_usd
             FROM products p
             JOIN brands b ON p.brand_id = b.id
             WHERE p.is_active = 1
             ORDER BY b.display_order ASC, p.display_order ASC`
        )
    },
}

// ============================================
// Top N 页面模型
// ============================================
export interface TopNPage {
    id: number
    slug: string
    title: string
    h1_title?: string
    intro_text?: string
    filter_type: string
    filter_value: string
    sort_by: string
    max_items: number
    meta_title?: string
    meta_description?: string
    faq_json?: string
    status: string
    display_order: number
    created_at: string
    updated_at: string
}

export const TopNPageModel = {
    async getAll(): Promise<TopNPage[]> {
        return query<TopNPage>(
            `SELECT * FROM top_n_pages WHERE status = 'published' ORDER BY display_order ASC`
        )
    },

    async getBySlug(slug: string): Promise<TopNPage | null> {
        return queryOne<TopNPage>(
            `SELECT * FROM top_n_pages WHERE slug = ? AND status = 'published'`,
            [slug]
        )
    },

    async getAllSlugs(): Promise<Array<{ slug: string }>> {
        return query<{ slug: string }>(
            `SELECT slug FROM top_n_pages WHERE status = 'published'`
        )
    },
}
