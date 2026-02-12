import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'RF Coverage Estimator - Smart Lock Hub',
    description: 'Plan mesh network topology and signal coverage for smart lock deployments. Calculate required hubs, effective range, and signal quality based on building specs and protocol.',
    alternates: { canonical: '/calculators/rf-coverage' },
    openGraph: {
        title: 'RF Coverage Estimator - Smart Lock Hub',
        description: 'Plan mesh network topology and signal coverage for smart lock deployments. Calculate required hubs, effective range, and signal quality based on building specs and protocol.',
        siteName: 'Smart Lock Hub',
        type: 'website',
    },
}

export default function RFCoverageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'RF Coverage Estimator',
                url: 'https://smartlockhub.com/calculators/rf-coverage',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Plan mesh network topology and signal coverage for smart lock deployments. Calculate required hubs, effective range, and signal quality based on building specs and protocol.',
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
                    { '@type': 'ListItem', position: 3, name: 'RF Coverage', item: 'https://smartlockhub.com/calculators/rf-coverage' },
                ],
            }} />
            {children}
        </>
    )
}
