import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Smart Lock Glossary | Protocol, Hardware & Security Terms',
    description: 'Look up smart lock hardware, protocol, security, installation, and standards terms with concise definitions and related references.',
    alternates: { canonical: '/resources/glossary' },
}

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
    return children
}
