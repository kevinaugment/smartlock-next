import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Emergency Backup Evaluator | Keys, PINs, App & Bluetooth Fallback',
    description: 'Score smart lock emergency access by backup keys, PIN codes, mobile app access, remote unlock, Bluetooth fallback, and outage readiness.',
    canonical: '/calculators/emergency-backup',
})

export default function EmergencyBackupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Emergency Backup Evaluator',
                url: 'https://www.slockhub.com/calculators/emergency-backup',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Score smart lock emergency access by backup keys, PIN codes, app access, remote unlock, Bluetooth fallback, and outage readiness.',
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
                    { '@type': 'ListItem', position: 3, name: 'Emergency Backup', item: 'https://www.slockhub.com/calculators/emergency-backup' },
                ],
            }} />
            {children}
        </>
    )
}
