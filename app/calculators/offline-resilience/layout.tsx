import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Offline Resilience Scorecard - Smart Lock Hub',
    description: 'Evaluate how well your smart lock system works during outages. Score your setup across protocol choice, local hub, backup power, physical keys, and cloud dependency.',
    alternates: { canonical: '/calculators/offline-resilience' },
    openGraph: {
        title: 'Offline Resilience Scorecard - Smart Lock Hub',
        description: 'Evaluate how well your smart lock system works during outages. Score your setup across protocol choice, local hub, backup power, physical keys, and cloud dependency.',
        siteName: 'Smart Lock Hub',
        type: 'website',
    },
}

export default function OfflineResilienceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Offline Resilience Scorecard',
                url: 'https://smartlockhub.com/calculators/offline-resilience',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Evaluate how well your smart lock system works during outages. Score your setup across protocol choice, local hub, backup power, physical keys, and cloud dependency.',
                softwareVersion: '1.0',
                datePublished: '2025-11-24',
                creator: { '@type': 'Organization', name: 'Smart Lock Hub', url: 'https://smartlockhub.com' },
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smartlockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://smartlockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'Offline Resilience', item: 'https://smartlockhub.com/calculators/offline-resilience' },
                ],
            }} />
            {children}
        </>
    )
}
