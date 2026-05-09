import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Smart Lock Security Compliance Checker | ANSI, UL, ADA & Audit',
    description: 'Check smart lock security compliance by ANSI/BHMA grade, UL requirements, ADA access, audit logs, PIN policy, encryption, and backup access.',
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
                description: 'Check smart lock security compliance by ANSI/BHMA grade, UL, ADA, audit logs, PIN policy, and encryption.',
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
