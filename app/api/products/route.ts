import { getProductsForCalculator, getRecommendedProducts } from '@/lib/services/brand-service'
import { ProductModel } from '@/lib/db/brand-models'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const brand = searchParams.get('brand')
        const tagType = searchParams.get('tag_type')
        const tagValue = searchParams.get('tag_value')
        const forCalculator = searchParams.get('for_calculator')
        const limit = parseInt(searchParams.get('limit') || '50', 10)

        let data

        if (forCalculator === '1') {
            // 计算器用精简列表
            data = await getProductsForCalculator()
        } else if (brand) {
            // 按品牌过滤
            data = await ProductModel.getByBrandSlug(brand)
        } else if (tagType && tagValue) {
            // 按标签过滤
            const sortBy = searchParams.get('sort_by') || 'rating'
            data = await ProductModel.getByTag(tagType, tagValue, sortBy, limit)
        } else {
            // 返回所有产品
            const offset = parseInt(searchParams.get('offset') || '0', 10)
            data = await ProductModel.getAll(limit, offset)
        }

        return new Response(
            JSON.stringify({ success: true, data }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
                },
            }
        )
    } catch (error) {
        console.error('Error fetching products:', error)
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to fetch products' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
}
