import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Access Control Capacity Calculator - SLockHub.com',
    description: 'Calculate access control system capacity for buildings and campuses. Plan user counts, credential types, and throughput for smart lock deployments.',
    alternates: { canonical: '/calculators/access-capacity' },
    openGraph: {
        title: 'Access Control Capacity Calculator - SLockHub.com',
        description: 'Calculate access control system capacity for buildings and campuses.',
        siteName: 'SLockHub.com',
        type: 'website',
    },
}

export default function AccessCapacityLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Access Control Capacity Calculator',
                url: 'https://www.slockhub.com/calculators/access-capacity',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Calculate access control system capacity for buildings and campuses.',
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'Access Capacity', item: 'https://www.slockhub.com/calculators/access-capacity' },
                ],
            }} />
            {children}
        </>
    )
}
