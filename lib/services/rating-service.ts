import { query, queryOne, execute } from '@/lib/db'

export interface RatingAggregate {
    average: number
    count: number
}

export interface UserRating {
    rating: number
    created_at: string
}

/**
 * 获取产品的聚合评分
 */
export async function getProductRating(productId: number): Promise<RatingAggregate> {
    const result = await queryOne<{ avg_rating: number; count: number }>(
        `SELECT 
            COALESCE(AVG(CAST(rating AS REAL)), 0) as avg_rating,
            COUNT(*) as count
         FROM product_ratings 
         WHERE product_id = ?`,
        [productId]
    )

    return {
        average: result ? Math.round(result.avg_rating * 10) / 10 : 0,
        count: result?.count || 0,
    }
}

/**
 * 获取用户对某产品的评分
 */
export async function getUserRating(productId: number, fingerprint: string): Promise<UserRating | null> {
    return queryOne<UserRating>(
        `SELECT rating, created_at FROM product_ratings WHERE product_id = ? AND fingerprint = ?`,
        [productId, fingerprint]
    )
}

/**
 * 提交或更新评分 (upsert)
 */
export async function submitRating(productId: number, rating: number, fingerprint: string): Promise<RatingAggregate> {
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
        throw new Error('Rating must be an integer between 1 and 5')
    }

    if (!fingerprint || fingerprint.length < 10) {
        throw new Error('Invalid fingerprint')
    }

    // Upsert: INSERT OR REPLACE
    await execute(
        `INSERT INTO product_ratings (product_id, rating, fingerprint, updated_at)
         VALUES (?, ?, ?, datetime('now'))
         ON CONFLICT(product_id, fingerprint) 
         DO UPDATE SET rating = excluded.rating, updated_at = datetime('now')`,
        [productId, rating, fingerprint]
    )

    // 返回更新后的聚合评分
    return getProductRating(productId)
}

/**
 * 获取品牌下所有产品的平均评分
 */
export async function getBrandAverageRating(brandSlug: string): Promise<RatingAggregate> {
    const result = await queryOne<{ avg_rating: number; count: number }>(
        `SELECT 
            COALESCE(AVG(CAST(pr.rating AS REAL)), 0) as avg_rating,
            COUNT(*) as count
         FROM product_ratings pr
         JOIN products p ON p.id = pr.product_id
         JOIN brands b ON b.id = p.brand_id
         WHERE b.slug = ?`,
        [brandSlug]
    )

    return {
        average: result ? Math.round(result.avg_rating * 10) / 10 : 0,
        count: result?.count || 0,
    }
}
