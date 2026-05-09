import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Access Control Capacity Calculator | Users, Credentials & Doors',
    description: 'Plan smart lock capacity by user count, credential type, permission groups, door count, and platform limits for buildings and campuses.',
    canonical: '/calculators/access-capacity',
})

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
                description: 'Plan smart lock capacity by users, credentials, permission groups, doors, and platform limits.',
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
