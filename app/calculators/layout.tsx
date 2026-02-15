import CalculatorRelatedContent from '@/components/calculators/CalculatorRelatedContent'

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <div className="container-main" style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 var(--space-md)' }}>
                <CalculatorRelatedContent />
            </div>
        </>
    )
}
