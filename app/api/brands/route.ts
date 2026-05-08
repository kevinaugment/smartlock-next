import { getBrands } from '@/lib/services/brand-service'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const brands = await getBrands()

        return new Response(
            JSON.stringify({ success: true, data: brands }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
                },
            }
        )
    } catch (error) {
        console.error('Error fetching brands:', error)
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to fetch brands' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
}
