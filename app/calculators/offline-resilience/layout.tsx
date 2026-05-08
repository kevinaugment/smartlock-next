import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Offline Resilience Scorecard - SLockHub.com',
    description: 'Evaluate how well your smart lock system works during outages. Score your setup across protocol choice, local hub, backup power, physical keys, and cloud dependency.',
    canonical: '/calculators/offline-resilience',
})

export default function OfflineResilienceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Offline Resilience Scorecard',
                url: 'https://www.slockhub.com/calculators/offline-resilience',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Evaluate how well your smart lock system works during outages. Score your setup across protocol choice, local hub, backup power, physical keys, and cloud dependency.',
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
                    { '@type': 'ListItem', position: 3, name: 'Offline Resilience', item: 'https://www.slockhub.com/calculators/offline-resilience' },
                ],
            }} />
            {children}
        </>
    )
}
