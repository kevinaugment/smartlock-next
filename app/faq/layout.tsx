import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Smart Lock FAQ | Battery, Security, Installation | SLockHub',
    description: 'Find direct answers about smart lock batteries, security, protocols, installation fit, app setup, and troubleshooting.',
    alternates: { canonical: '/faq' },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return children
}
