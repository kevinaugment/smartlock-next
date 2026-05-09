import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Door Measurement Fit Checker | Backset, Bore, Thickness & Prep',
    description: 'Check smart lock door fit by backset, bore hole, door thickness, edge prep, material, and installation requirements.',
    canonical: '/calculators/door-fit',
})

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
                description: 'Check smart lock door fit by backset, bore hole, thickness, edge prep, material, and installation requirements.',
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
