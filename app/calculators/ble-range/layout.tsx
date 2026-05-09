import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'BLE Range Calculator | Smart Lock Proximity, RSSI & Signal Coverage',
    description: 'Estimate Bluetooth smart lock range by RSSI, distance, obstacles, transmit power, and proximity-unlock reliability before installation.',
    canonical: '/calculators/ble-range',
})

export default function BleRangeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'BLE Range & Proximity Calculator',
                url: 'https://www.slockhub.com/calculators/ble-range',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Estimate Bluetooth smart lock range, RSSI, obstacles, and proximity-unlock reliability.',
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'BLE Range Calculator', item: 'https://www.slockhub.com/calculators/ble-range' },
                ],
            }} />
            {children}
        </>
    )
}
