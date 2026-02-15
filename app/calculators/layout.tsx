import CalculatorRelatedContent from '@/components/calculators/CalculatorRelatedContent'

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <div className="max-w-6xl mx-auto" style={{ padding: '0 var(--space-md)' }}>
                <CalculatorRelatedContent />
            </div>
        </>
    )
}
