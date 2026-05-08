import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'FAQ - SLockHub.com',
    description: 'Frequently asked questions about smart lock systems — protocols, battery life, security, installation, and more.',
    alternates: { canonical: '/faq' },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return children
}
