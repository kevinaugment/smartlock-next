import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Retrofit vs Replace Advisor - SLockHub.com',
    description: 'Determine whether to retrofit your existing door hardware or replace it entirely for smart lock installation. Compare costs, compatibility, and long-term value.',
    canonical: '/calculators/retrofit-advisor',
})

export default function RetrofitAdvisorLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Retrofit vs Replace Advisor',
                url: 'https://www.slockhub.com/calculators/retrofit-advisor',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Determine whether to retrofit your existing door hardware or replace it entirely for smart lock installation. Compare costs, compatibility, and long-term value.',
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
                    { '@type': 'ListItem', position: 3, name: 'Retrofit Advisor', item: 'https://www.slockhub.com/calculators/retrofit-advisor' },
                ],
            }} />
            {children}
        </>
    )
}
