import { NextRequest, NextResponse } from 'next/server'
import { CalculatorModel } from '@/lib/db/models'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')

    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    try {
        const articles = await CalculatorModel.getRelatedArticlesBySlug(slug)
        return NextResponse.json(articles)
    } catch (error) {
        console.error('Error fetching related articles:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
