/**
 * 评分业务逻辑 Service
 */
import { ToolRatingModel } from '@/lib/db/models'

// 有效的工具 slug 列表
const VALID_TOOL_SLUGS = [
    'lock-tco', 'battery-life', 'signal-strength', 'installation-cost',
    'protocol-wizard', 'str-roi', 'mesh-planner', 'compatibility',
    'credential-planner', 'fleet-planner', 'subscription-compare',
    'installation-time', 'rf-coverage', 'offline-resilience', 'emergency-backup',
]

export interface RatingResult {
    success: boolean
    error?: string
    data?: { total: number; helpful: number; ratingValue: number }
}

/**
 * 将 IP 地址哈希化（隐私保护）
 */
async function hashIP(ip: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(ip + '_smartlockhub_salt')
    const hash = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * 计算 ratingValue（1-5 映射）
 * 👍 = 5, 👎 = 1, 通过 helpful/total 加权计算
 */
function calculateRatingValue(total: number, helpful: number): number {
    if (total === 0) return 0
    const ratio = helpful / total
    return Math.round((ratio * 4 + 1) * 10) / 10  // 映射到 1-5, 保留 1 位小数
}

export async function submitRating(
    toolSlug: string,
    isHelpful: boolean,
    ip: string
): Promise<RatingResult> {
    if (!VALID_TOOL_SLUGS.includes(toolSlug)) {
        return { success: false, error: 'Invalid tool slug' }
    }

    const ipHash = await hashIP(ip)

    try {
        await ToolRatingModel.submit(toolSlug, isHelpful, ipHash)
        const aggregate = await ToolRatingModel.getAggregate(toolSlug)
        return {
            success: true,
            data: {
                total: aggregate.total,
                helpful: aggregate.helpful,
                ratingValue: calculateRatingValue(aggregate.total, aggregate.helpful),
            },
        }
    } catch (error) {
        return { success: false, error: 'Failed to submit rating' }
    }
}

export async function getRating(toolSlug: string): Promise<RatingResult> {
    try {
        const aggregate = await ToolRatingModel.getAggregate(toolSlug)
        return {
            success: true,
            data: {
                total: aggregate.total,
                helpful: aggregate.helpful,
                ratingValue: calculateRatingValue(aggregate.total, aggregate.helpful),
            },
        }
    } catch (error) {
        return { success: false, error: 'Failed to get rating' }
    }
}
