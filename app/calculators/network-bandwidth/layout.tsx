import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Network Bandwidth Calculator - SLockHub.com',
    description: 'Calculate network bandwidth requirements for smart lock deployments. Plan your infrastructure for reliable cloud-connected access control.',
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
                description: 'Calculate network bandwidth requirements for smart lock deployments.',
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
