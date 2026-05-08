import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'RF Coverage Estimator - SLockHub.com',
    description: 'Plan mesh network topology and signal coverage for smart lock deployments. Calculate required hubs, effective range, and signal quality based on building specs and protocol.',
    canonical: '/calculators/rf-coverage',
})

export default function RFCoverageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'RF Coverage Estimator',
                url: 'https://www.slockhub.com/calculators/rf-coverage',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Plan mesh network topology and signal coverage for smart lock deployments. Calculate required hubs, effective range, and signal quality based on building specs and protocol.',
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
                    { '@type': 'ListItem', position: 3, name: 'RF Coverage', item: 'https://www.slockhub.com/calculators/rf-coverage' },
                ],
            }} />
            {children}
        </>
    )
}
