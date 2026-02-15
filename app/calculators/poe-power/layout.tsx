import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'PoE Power Budget Calculator - SLockHub.com',
    description: 'Calculate Power over Ethernet budget for smart lock and access control installations. Plan PoE switch capacity and power allocation.',
    alternates: { canonical: '/calculators/poe-power' },
    openGraph: {
        title: 'PoE Power Budget Calculator - SLockHub.com',
        description: 'Calculate Power over Ethernet budget for smart lock and access control installations.',
        siteName: 'SLockHub.com',
        type: 'website',
    },
}

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
                description: 'Calculate Power over Ethernet budget for smart lock and access control installations.',
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
