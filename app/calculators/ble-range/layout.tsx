import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'BLE Range & Proximity Calculator - SLockHub.com',
    description: 'Calculate Bluetooth Low Energy range and signal coverage for smart lock installations. Plan BLE proximity zones and optimize placement.',
    alternates: { canonical: '/calculators/ble-range' },
    openGraph: {
        title: 'BLE Range & Proximity Calculator - SLockHub.com',
        description: 'Calculate Bluetooth Low Energy range and signal coverage for smart lock installations.',
        siteName: 'SLockHub.com',
        type: 'website',
    },
}

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
                description: 'Calculate Bluetooth Low Energy range and signal coverage for smart lock installations.',
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
