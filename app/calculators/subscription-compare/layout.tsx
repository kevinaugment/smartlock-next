import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Subscription vs Purchase Comparison - SLockHub.com',
    description: 'Compare long-term costs of cloud subscription vs local smart lock solutions. Calculate break-even point, annual costs, and total cost of ownership over time.',
    canonical: '/calculators/subscription-compare',
})

export default function SubscriptionCompareLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Subscription vs Purchase Comparison',
                url: 'https://www.slockhub.com/calculators/subscription-compare',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Compare long-term costs of cloud subscription vs local smart lock solutions. Calculate break-even point, annual costs, and total cost of ownership over time.',
                softwareVersion: '1.0',
                datePublished: '2026-02-15',
                creator: { '@type': 'Organization', name: 'SLockHub.com', url: 'https://www.slockhub.com' },
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'Subscription Compare', item: 'https://www.slockhub.com/calculators/subscription-compare' },
                ],
            }} />
            {children}
        </>
    )
}
