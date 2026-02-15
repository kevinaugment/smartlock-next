import { NextRequest, NextResponse } from 'next/server'
import { getProductRating, getUserRating, submitRating } from '@/lib/services/rating-service'

function success(data: any) {
    return NextResponse.json({ success: true, data })
}

function error(message: string, status = 400) {
    return NextResponse.json({ success: false, error: message }, { status })
}

/**
 * GET /api/ratings?product_id=X&fingerprint=Y
 * 返回产品聚合评分 + 用户自己的评分
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const productId = Number(searchParams.get('product_id'))
        const fingerprint = searchParams.get('fingerprint') || ''

        if (!productId || isNaN(productId)) {
            return error('Missing or invalid product_id')
        }

        const aggregate = await getProductRating(productId)
        const userRating = fingerprint
            ? await getUserRating(productId, fingerprint)
            : null

        return success({
            average: aggregate.average,
            count: aggregate.count,
            userRating: userRating?.rating || null,
        })
    } catch (err: any) {
        console.error('[API] GET /api/ratings error:', err)
        return error('Internal server error', 500)
    }
}

/**
 * POST /api/ratings
 * Body: { product_id, rating, fingerprint }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { product_id, rating, fingerprint } = body

        if (!product_id || !rating || !fingerprint) {
            return error('Missing required fields: product_id, rating, fingerprint')
        }

        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            return error('Rating must be an integer between 1 and 5')
        }

        if (typeof fingerprint !== 'string' || fingerprint.length < 10) {
            return error('Invalid fingerprint')
        }

        const aggregate = await submitRating(product_id, rating, fingerprint)

        return success({
            average: aggregate.average,
            count: aggregate.count,
            userRating: rating,
        })
    } catch (err: any) {
        console.error('[API] POST /api/ratings error:', err)
        return error('Internal server error', 500)
    }
}
