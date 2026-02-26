import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Door Measurement Fit Checker - SLockHub.com',
    description: 'Check if your door dimensions are compatible with smart lock installation. Verify backset, thickness, bore hole size, and edge prep requirements.',
    alternates: { canonical: '/calculators/door-fit' },
    openGraph: {
        title: 'Door Measurement Fit Checker - SLockHub.com',
        description: 'Check if your door dimensions are compatible with smart lock installation. Verify backset, thickness, bore hole size, and edge prep requirements.',
        siteName: 'SLockHub.com',
        type: 'website',
    },
}

export default function DoorFitLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Door Measurement Fit Checker',
                url: 'https://www.slockhub.com/calculators/door-fit',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Check if your door dimensions are compatible with smart lock installation. Verify backset, thickness, bore hole size, and edge prep requirements.',
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
                    { '@type': 'ListItem', position: 3, name: 'Door Fit Checker', item: 'https://www.slockhub.com/calculators/door-fit' },
                ],
            }} />
            {children}
        </>
    )
}
