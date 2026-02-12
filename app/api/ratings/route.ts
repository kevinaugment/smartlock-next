export const runtime = 'edge'

import { submitRating, getRating } from '@/lib/services/rating-service'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { tool_slug, is_helpful } = body

        if (!tool_slug || typeof is_helpful !== 'boolean') {
            return new Response(
                JSON.stringify({ success: false, error: 'Missing required fields: tool_slug, is_helpful' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }

        const ip = request.headers.get('cf-connecting-ip')
            || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || '127.0.0.1'

        const result = await submitRating(tool_slug, is_helpful, ip)

        if (!result.success) {
            return new Response(
                JSON.stringify(result),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }

        return new Response(
            JSON.stringify(result),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const slug = searchParams.get('slug')

        if (!slug) {
            return new Response(
                JSON.stringify({ success: false, error: 'Missing slug parameter' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }

        const result = await getRating(slug)

        return new Response(
            JSON.stringify(result),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
                },
            }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
}
