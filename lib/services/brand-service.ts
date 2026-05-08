/**
 * Brand/Product 业务逻辑
 * 封装品牌页面、Top N 页面和计算器联动的查询
 */

import {
    BrandModel,
    ProductModel,
    ProductSeriesModel,
    TopNPageModel,
    type Brand,
    type Product,
    type ProductSeries,
    type ProductWithBrand,
    type TopNPage,
} from '@/lib/db/brand-models'

// ============================================
// 类型
// ============================================

export interface BrandWithCount extends Brand {
    product_count: number
}

export interface BrandDetail extends Brand {
    series: Array<ProductSeries & { products: Product[] }>
}

export interface ProductDetail extends ProductWithBrand {
    series_name: string
    ecosystems: string[]
}

export interface TopNPageData extends TopNPage {
    products: ProductWithBrand[]
    faqs: Array<{ question: string; answer: string }>
}

export interface CalculatorProduct {
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

// ============================================
// 品牌页面
// ============================================

/** 获取所有品牌（带产品数量） */
export async function getBrands(): Promise<BrandWithCount[]> {
    const brands = await BrandModel.getAll()
    const result: BrandWithCount[] = []

    for (const brand of brands) {
        const products = await ProductModel.getByBrandId(brand.id)
        result.push({ ...brand, product_count: products.length })
    }

    return result
}

/** 获取品牌详情（含系列和产品） */
export async function getBrandBySlug(slug: string): Promise<BrandDetail | null> {
    const brand = await BrandModel.getBySlug(slug)
    if (!brand) return null

    const seriesList = await ProductSeriesModel.getByBrandId(brand.id)
    const seriesWithProducts = await Promise.all(
        seriesList.map(async (s) => {
            const products = await ProductModel.getBySeriesId(s.id)
            return { ...s, products }
        })
    )

    return { ...brand, series: seriesWithProducts }
}

/** 获取产品详情 */
export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
    const product = await ProductModel.getBySlug(slug)
    if (!product) return null

    let seriesName = ''

    // 查找所属系列的名称
    const allSeries = await ProductSeriesModel.getByBrandId(product.brand_id)
    const matchedSeries = allSeries.find(s => s.id === product.series_id)
    if (matchedSeries) {
        seriesName = matchedSeries.name
    }

    let ecosystems: string[] = []
    if (product.ecosystems_json) {
        try {
            ecosystems = JSON.parse(product.ecosystems_json)
        } catch {
            ecosystems = []
        }
    }

    return { ...product, series_name: seriesName, ecosystems }
}

// ============================================
// Top N 页面
// ============================================

/** 获取 Top N 页面数据（含匹配产品和 FAQ） */
export async function getTopNPageData(slug: string): Promise<TopNPageData | null> {
    const page = await TopNPageModel.getBySlug(slug)
    if (!page) return null

    const products = await ProductModel.getByTag(
        page.filter_type,
        page.filter_value,
        page.sort_by,
        page.max_items
    )

    let faqs: Array<{ question: string; answer: string }> = []
    if (page.faq_json) {
        try {
            faqs = JSON.parse(page.faq_json)
        } catch {
            faqs = []
        }
    }

    return { ...page, products, faqs }
}

// ============================================
// 计算器联动
// ============================================

/** 获取计算器用的产品列表（精简字段，按品牌分组结构） */
export async function getProductsForCalculator(): Promise<CalculatorProduct[]> {
    return ProductModel.getForCalculator()
}

/** 根据计算参数推荐匹配产品 */
export async function getRecommendedProducts(params: {
    protocol?: string
    batteryType?: string
    priceMax?: number
    needsFingerprint?: boolean
    needsKeypad?: boolean
    limit?: number
}): Promise<ProductWithBrand[]> {
    const allProducts = await ProductModel.getAll(100, 0)

    let filtered = allProducts.filter(p => p.is_active)

    if (params.protocol) {
        filtered = filtered.filter(
            p => p.protocol === params.protocol || p.secondary_protocol === params.protocol
        )
    }

    if (params.batteryType) {
        filtered = filtered.filter(p => p.battery_type === params.batteryType)
    }

    if (params.priceMax) {
        filtered = filtered.filter(p => p.price_usd && p.price_usd <= params.priceMax!)
    }

    if (params.needsFingerprint) {
        filtered = filtered.filter(p => p.has_fingerprint)
    }

    if (params.needsKeypad) {
        filtered = filtered.filter(p => p.has_keypad)
    }

    // 按 rating 排序后取 top N
    filtered.sort((a, b) => b.rating - a.rating)

    return filtered.slice(0, params.limit || 5)
}
