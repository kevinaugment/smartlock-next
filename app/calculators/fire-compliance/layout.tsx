import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Fire Code Compliance Checker - SLockHub.com',
    description: 'Check if your smart lock installation meets fire code and NFPA requirements. Verify egress, ADA, and emergency exit compliance.',
    canonical: '/calculators/fire-compliance',
})

export default function FireComplianceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Fire Code Compliance Checker',
                url: 'https://www.slockhub.com/calculators/fire-compliance',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Check if your smart lock installation meets fire code and NFPA requirements.',
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'Fire Compliance', item: 'https://www.slockhub.com/calculators/fire-compliance' },
                ],
            }} />
            {children}
        </>
    )
}
