import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Energy Cost Calculator - SLockHub.com',
    description: 'Calculate annual electricity and battery costs for smart lock deployments. Compare energy consumption across Wi-Fi, Zigbee, Z-Wave, and Thread protocols.',
    alternates: { canonical: '/calculators/energy-cost' },
    openGraph: {
        title: 'Energy Cost Calculator - SLockHub.com',
        description: 'Calculate annual electricity and battery costs for smart lock deployments. Compare energy consumption across Wi-Fi, Zigbee, Z-Wave, and Thread protocols.',
        siteName: 'SLockHub.com',
        type: 'website',
    },
}

export default function EnergyCostLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Energy Cost Calculator',
                url: 'https://www.slockhub.com/calculators/energy-cost',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Calculate annual electricity and battery costs for smart lock deployments. Compare energy consumption across Wi-Fi, Zigbee, Z-Wave, and Thread protocols.',
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
                    { '@type': 'ListItem', position: 3, name: 'Energy Cost Calculator', item: 'https://www.slockhub.com/calculators/energy-cost' },
                ],
            }} />
            {children}
        </>
    )
}
