import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Smart Lock Warranty & Lifecycle Calculator | Replacement Cost Tool',
    description: 'Calculate smart lock warranty coverage, expected lifespan, replacement timing, lifecycle cost, failure risk, and brand support tradeoffs.',
    canonical: '/calculators/warranty-lifecycle',
})

export default function WarrantyLifecycleLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Warranty & Lifecycle Calculator',
                url: 'https://www.slockhub.com/calculators/warranty-lifecycle',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Calculate smart lock warranty coverage, lifespan, replacement timing, lifecycle cost, and failure risk.',
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'Warranty & Lifecycle', item: 'https://www.slockhub.com/calculators/warranty-lifecycle' },
                ],
            }} />
            {children}
        </>
    )
}
