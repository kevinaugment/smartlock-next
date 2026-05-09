import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Offline Resilience Scorecard | Smart Lock Outage, Hub & Backup',
    description: 'Score smart lock offline resilience by protocol, local hub, cloud dependency, backup power, physical keys, Bluetooth access, and outage behavior.',
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
                description: 'Score smart lock offline resilience by protocol, local hub, cloud dependency, backup power, keys, and outage behavior.',
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
