import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Guest Code Capacity Planner | Airbnb, Rental & Visitor PINs',
    description: 'Plan smart lock guest code capacity, PIN rotation, collision risk, expiration schedules, Airbnb access, rental properties, and visitor workflows.',
    canonical: '/calculators/guest-code',
})

export default function GuestCodeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Guest Code Capacity Planner',
                url: 'https://www.slockhub.com/calculators/guest-code',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Plan smart lock guest code capacity, PIN rotation, collision risk, expiration schedules, and rental access.',
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'Guest Code Planner', item: 'https://www.slockhub.com/calculators/guest-code' },
                ],
            }} />
            {children}
        </>
    )
}
