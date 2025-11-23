import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export const runtime = 'edge'

export async function GET() {
  try {
    const categories = await query(
      'SELECT id, name, slug, icon, description FROM categories ORDER BY display_order'
    )

    return NextResponse.json({
      success: true,
      categories: categories || [],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch categories',
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
