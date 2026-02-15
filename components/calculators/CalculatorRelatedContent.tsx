'use client'

import { usePathname } from 'next/navigation'
import RelatedContent from '@/components/calculators/RelatedContent'

/**
 * 自动根据当前 URL 提取计算器 slug 并渲染推荐内容
 * 放在计算器父级 layout 中，对所有计算器页面生效
 */
export default function CalculatorRelatedContent() {
    const pathname = usePathname()
    // Extract slug from /calculators/[slug]
    const segments = pathname.split('/')
    const slug = segments[2]

    // Don't render on the calculators index page
    if (!slug) return null

    return <RelatedContent slug={slug} />
}
