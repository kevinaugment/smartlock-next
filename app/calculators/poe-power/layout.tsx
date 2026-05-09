import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'PoE Smart Lock Power Budget Calculator - Size Switches, Runs & Wattage',
    description: 'Size PoE switch capacity, port class, cable runs, device wattage, and expansion headroom for smart lock and access control doors.',
    canonical: '/calculators/poe-power',
})

export default function PoePowerLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'PoE Power Budget Calculator',
                url: 'https://www.slockhub.com/calculators/poe-power',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Calculate PoE power budget by switch capacity, port class, cable loss, device draw, and expansion headroom.',
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'PoE Power Budget', item: 'https://www.slockhub.com/calculators/poe-power' },
                ],
            }} />
            {children}
        </>
    )
}
