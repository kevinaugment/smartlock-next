import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Hotel Smart Lock ROI Calculator | Keycard, Labor & Payback',
    description: 'Calculate hotel smart lock ROI from keycard savings, front desk labor, lockout reduction, mobile check-in, capex, and payback.',
    canonical: '/calculators/hotel-roi',
})

export default function HotelROILayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Hotel & Hospitality ROI Calculator',
                url: 'https://www.slockhub.com/calculators/hotel-roi',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Calculate hotel smart lock ROI from keycard savings, front desk labor, lockout reduction, mobile check-in, capex, and payback.',
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
                    { '@type': 'ListItem', position: 3, name: 'Hotel ROI Calculator', item: 'https://www.slockhub.com/calculators/hotel-roi' },
                ],
            }} />
            {children}
        </>
    )
}
