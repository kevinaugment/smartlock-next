import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Warranty & Lifecycle Calculator - SLockHub.com',
    description: 'Calculate smart lock warranty coverage and lifecycle costs. Plan replacement schedules and compare warranty options across brands.',
    alternates: { canonical: '/calculators/warranty-lifecycle' },
    openGraph: {
        title: 'Warranty & Lifecycle Calculator - SLockHub.com',
        description: 'Calculate smart lock warranty coverage and lifecycle costs.',
        siteName: 'SLockHub.com',
        type: 'website',
    },
}

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
                description: 'Calculate smart lock warranty coverage and lifecycle costs.',
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
