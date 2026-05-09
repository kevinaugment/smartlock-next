import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Smart Lock Comparison Tool | Price, Protocol, Battery & Features',
    description: 'Compare smart lock models side by side by price, protocol, battery life, security grade, door fit, access features, and best use case.',
    canonical: '/calculators/lock-compare',
})

export default function LockCompareLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Smart Lock Comparison Tool',
                url: 'https://www.slockhub.com/calculators/lock-compare',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Compare smart lock models by price, protocol, battery life, security grade, door fit, and access features.',
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'Lock Comparison', item: 'https://www.slockhub.com/calculators/lock-compare' },
                ],
            }} />
            {children}
        </>
    )
}
