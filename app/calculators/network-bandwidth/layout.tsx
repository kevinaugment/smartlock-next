import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Smart Lock Network Bandwidth Calculator | Wi-Fi, Cloud & Fleet Data',
    description: 'Estimate smart lock network bandwidth by Wi-Fi locks, cloud sync, access events, firmware updates, video integrations, and fleet size.',
    canonical: '/calculators/network-bandwidth',
})

export default function NetworkBandwidthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Network Bandwidth Calculator',
                url: 'https://www.slockhub.com/calculators/network-bandwidth',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Estimate smart lock network bandwidth by Wi-Fi locks, cloud sync, access events, updates, and fleet size.',
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'Network Bandwidth', item: 'https://www.slockhub.com/calculators/network-bandwidth' },
                ],
            }} />
            {children}
        </>
    )
}
