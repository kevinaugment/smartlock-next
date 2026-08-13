import { NextRequest, NextResponse } from 'next/server'
import { getCanonicalComparisonHref } from '@/lib/seo/priority-comparisons'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname.replace(/\/+$/, '') || '/'
    const match = pathname.match(/^\/compare\/(.+)-vs-(.+)$/)
    if (!match) return NextResponse.next()

    const canonicalPath = getCanonicalComparisonHref(match[1], match[2])
    if (canonicalPath === pathname) return NextResponse.next()

    return NextResponse.redirect(new URL(canonicalPath, request.url), 301)
}

export const config = {
    matcher: ['/compare/:path*'],
}
