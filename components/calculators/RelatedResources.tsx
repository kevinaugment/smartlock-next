'use client'

import RelatedContent from '@/components/calculators/RelatedContent'

interface RelatedResourcesProps {
    calculatorSlug: string
}

export function RelatedResources({ calculatorSlug }: RelatedResourcesProps) {
    return <RelatedContent slug={calculatorSlug} />
}
