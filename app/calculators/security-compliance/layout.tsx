import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Security Compliance Checker - SLockHub.com',
    description: 'Verify your smart lock deployment meets security compliance requirements. Check ADA, fire code, NFPA, and building code standards.',
    canonical: '/calculators/security-compliance',
})

export default function SecurityComplianceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Security Compliance Checker',
                url: 'https://www.slockhub.com/calculators/security-compliance',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Verify your smart lock deployment meets security compliance requirements.',
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'Security Compliance', item: 'https://www.slockhub.com/calculators/security-compliance' },
                ],
            }} />
            {children}
        </>
    )
}
