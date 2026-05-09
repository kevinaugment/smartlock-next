import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Smart Lock TCO Calculator | Hardware, Battery, Subscription & Labor',
    description: 'Calculate 5-year smart lock TCO by hardware, installation, batteries, hubs, subscriptions, maintenance, and protocol choice.',
    canonical: '/calculators/lock-tco',
})

export default function LockTCOLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Smart Lock TCO Calculator',
                url: 'https://www.slockhub.com/calculators/lock-tco',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Calculate 5-year smart lock TCO by hardware, installation, batteries, hubs, subscriptions, maintenance, and protocol choice.',
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
                    { '@type': 'ListItem', position: 3, name: 'TCO Calculator', item: 'https://www.slockhub.com/calculators/lock-tco' },
                ],
            }} />
            {children}
        </>
    )
}
