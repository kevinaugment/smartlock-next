'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Shield, AlertTriangle, Check, X, Info, FileText } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

interface ComplianceResult {
    score: number
    grade: string
    gradeClass: string
    dpiaRequired: boolean
    applicableLaws: string[]
    risks: { level: 'high' | 'medium' | 'low'; text: string }[]
    recommendations: string[]
}

export default function PrivacyComplianceEvaluator() {
    const [collectsBiometric, setCollectsBiometric] = useState(false)
    const [biometricType, setBiometricType] = useState<'fingerprint' | 'face' | 'voice' | 'none'>('none')
    const [cloudStorage, setCloudStorage] = useState<'us' | 'eu' | 'china' | 'local' | 'unknown'>('us')
    const [dataRetention, setDataRetention] = useState<'30d' | '90d' | '1y' | '3y' | 'forever' | 'customizable'>('90d')
    const [auditTrailAccess, setAuditTrailAccess] = useState<'admin' | 'all-users' | 'none'>('admin')
    const [userConsent, setUserConsent] = useState<'explicit' | 'implied' | 'none'>('implied')
    const [operatingRegion, setOperatingRegion] = useState<'us' | 'eu' | 'california' | 'illinois' | 'global'>('us')
    const [propertyType, setPropertyType] = useState<'residential' | 'commercial' | 'hospitality' | 'education'>('commercial')
    const [sharesWithThirdParty, setSharesWithThirdParty] = useState(false)
    const [encryptsAtRest, setEncryptsAtRest] = useState(true)
    const [encryptsInTransit, setEncryptsInTransit] = useState(true)
    const [hasPrivacyPolicy, setHasPrivacyPolicy] = useState(true)

    const result = useMemo((): ComplianceResult => {
        let score = 100
        const risks: ComplianceResult['risks'] = []
        const recommendations: string[] = []
        const applicableLaws: string[] = []

        // Determine applicable laws
        if (operatingRegion === 'eu' || operatingRegion === 'global') applicableLaws.push('GDPR (EU)')
        if (operatingRegion === 'california' || operatingRegion === 'global') applicableLaws.push('CCPA / CPRA (California)')
        if (operatingRegion === 'illinois' || operatingRegion === 'global') applicableLaws.push('BIPA (Illinois Biometric)')
        if (operatingRegion === 'us' || operatingRegion === 'global') applicableLaws.push('FTC Act (US Federal)')
        if (collectsBiometric) applicableLaws.push('State Biometric Privacy Laws')
        if (propertyType === 'education') applicableLaws.push('FERPA (Education)')
        if (propertyType === 'hospitality') applicableLaws.push('PCI DSS (if payment data)')

        // DPIA required?
        const dpiaRequired = collectsBiometric || (operatingRegion === 'eu' && (sharesWithThirdParty || dataRetention === 'forever'))

        // Biometric risks
        if (collectsBiometric) {
            score -= 15
            risks.push({ level: 'high', text: 'Biometric data collection triggers strict privacy obligations in most jurisdictions' })
            if (biometricType === 'face') {
                score -= 10
                risks.push({ level: 'high', text: 'Facial recognition has the highest regulatory scrutiny and ban risk' })
            }
            if (userConsent !== 'explicit') {
                score -= 20
                risks.push({ level: 'high', text: 'Biometric data collection without explicit consent violates GDPR and BIPA' })
                recommendations.push('Implement explicit opt-in consent for biometric data collection')
            }
            if (cloudStorage !== 'local') {
                score -= 10
                risks.push({ level: 'medium', text: 'Biometric data stored in cloud increases breach exposure' })
                recommendations.push('Consider on-device biometric processing (template stored on lock, not cloud)')
            }
        }

        // Cloud storage risks
        if (cloudStorage === 'unknown') {
            score -= 15
            risks.push({ level: 'high', text: 'Unknown data storage location makes compliance verification impossible' })
            recommendations.push('Verify data storage location with your smart lock vendor')
        }
        if (cloudStorage === 'china' && (operatingRegion === 'eu' || operatingRegion === 'global')) {
            score -= 20
            risks.push({ level: 'high', text: 'Data storage in China likely violates GDPR adequacy requirements' })
            recommendations.push('Request data processing agreements and Standard Contractual Clauses')
        }
        if (cloudStorage === 'us' && operatingRegion === 'eu') {
            score -= 10
            risks.push({ level: 'medium', text: 'US storage requires EU-US Data Privacy Framework certification' })
        }

        // Data retention risks
        if (dataRetention === 'forever') {
            score -= 15
            risks.push({ level: 'high', text: 'Indefinite data retention violates GDPR data minimization principle' })
            recommendations.push('Set a maximum retention period that matches your legitimate business need')
        } else if (dataRetention === '3y') {
            score -= 5
            risks.push({ level: 'medium', text: '3-year retention may exceed necessity for access logs' })
        }

        // Consent
        if (userConsent === 'none') {
            score -= 25
            risks.push({ level: 'high', text: 'No user consent mechanism — violates GDPR, CCPA, and most privacy laws' })
            recommendations.push('Implement a clear consent mechanism before data collection begins')
        } else if (userConsent === 'implied') {
            score -= 5
            if (operatingRegion === 'eu') {
                score -= 10
                risks.push({ level: 'medium', text: 'Implied consent may not meet GDPR standards — explicit consent preferred' })
            }
        }

        // Third party sharing
        if (sharesWithThirdParty) {
            score -= 10
            risks.push({ level: 'medium', text: 'Third-party data sharing requires disclosure and potentially separate consent' })
            recommendations.push('Audit all third-party data recipients and document processing agreements')
        }

        // Encryption
        if (!encryptsAtRest) {
            score -= 15
            risks.push({ level: 'high', text: 'No encryption at rest — data breach impact is amplified' })
            recommendations.push('Enable AES-256 encryption for all stored access control data')
        }
        if (!encryptsInTransit) {
            score -= 15
            risks.push({ level: 'high', text: 'No encryption in transit — data vulnerable to interception' })
            recommendations.push('Enforce TLS 1.2+ for all data transmissions')
        }

        // Privacy policy
        if (!hasPrivacyPolicy) {
            score -= 20
            risks.push({ level: 'high', text: 'Missing privacy policy — legally required in nearly all jurisdictions' })
            recommendations.push('Create and publish a privacy policy covering access control data practices')
        }

        // Audit trail access
        if (auditTrailAccess === 'none') {
            score -= 10
            risks.push({ level: 'medium', text: 'No audit trail — impossible to demonstrate compliance or investigate incidents' })
            recommendations.push('Enable access logging with appropriate access controls')
        }

        // Property type specifics
        if (propertyType === 'education') {
            recommendations.push('Review FERPA requirements for student access records')
        }
        if (propertyType === 'hospitality') {
            recommendations.push('Ensure guest access logs are purged within 30 days of checkout')
        }

        // Tips for good scores
        if (risks.length === 0) {
            recommendations.push('Your setup looks compliant — consider periodic privacy audits to maintain standards')
        }

        // Normalize
        score = Math.max(0, Math.min(100, score))
        const grade = score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : score >= 40 ? 'D' : 'F'
        const gradeClass = score >= 85 ? 'result-panel--grade-a' : score >= 70 ? 'result-panel--grade-b' : score >= 55 ? 'result-panel--grade-c' : score >= 40 ? 'result-panel--grade-d' : 'result-panel--grade-f'

        return { score, grade, gradeClass, dpiaRequired, applicableLaws, risks, recommendations }
    }, [collectsBiometric, biometricType, cloudStorage, dataRetention, auditTrailAccess, userConsent, operatingRegion, propertyType, sharesWithThirdParty, encryptsAtRest, encryptsInTransit, hasPrivacyPolicy])

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back to Calculators</Link>

                <div className="text-center mb-12">
                    <div className="page-header__icon"><Shield className="w-14 h-14 mx-auto" /></div>
                    <h1 className="text-4xl font-bold mb-4">Privacy & Data Compliance Evaluator</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>
                        Assess GDPR, CCPA, and biometric privacy compliance for your smart lock system
                    </p>
                </div>

                <div className="max-w-4xl mx-auto" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="callout callout-warning">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-warning)' }} />
                            <div>
                                <h2 className="font-bold mb-1" style={{ fontSize: '1rem' }}>Disclaimer</h2>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    This tool provides <strong>educational guidance only</strong> and is not legal advice. Consult a qualified privacy attorney
                                    for compliance decisions in your jurisdiction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
                            <h2 className="text-2xl font-bold mb-6">System Configuration</h2>
                            <div className="space-y-6">
                                {/* Operating Region */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Operating Region
                                    </label>
                                    <select value={operatingRegion} onChange={(e) => setOperatingRegion(e.target.value as typeof operatingRegion)}
                                        className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                        <option value="us">United States (General)</option>
                                        <option value="california">California (CCPA/CPRA)</option>
                                        <option value="illinois">Illinois (BIPA)</option>
                                        <option value="eu">European Union (GDPR)</option>
                                        <option value="global">Global / Multi-Region</option>
                                    </select>
                                </div>

                                {/* Property Type */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Property Type
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {([
                                            { value: 'residential', label: 'Residential' },
                                            { value: 'commercial', label: 'Commercial' },
                                            { value: 'hospitality', label: 'Hospitality' },
                                            { value: 'education', label: 'Education' },
                                        ] as const).map(opt => (
                                            <button key={opt.value} onClick={() => setPropertyType(opt.value)} type="button"
                                                className="p-3 rounded-lg border-2 text-sm font-medium transition-all text-center"
                                                style={{
                                                    borderColor: propertyType === opt.value ? 'var(--color-accent)' : 'var(--color-border)',
                                                    background: propertyType === opt.value ? 'var(--color-accent-subtle)' : 'var(--color-surface)',
                                                    color: propertyType === opt.value ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                }}>
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Biometric */}
                                <div>
                                    <label className="flex items-center gap-3 p-3 rounded-lg cursor-pointer border-2 transition-all" style={{ borderColor: collectsBiometric ? 'var(--color-accent)' : 'var(--color-border)' }}>
                                        <input type="checkbox" checked={collectsBiometric} onChange={(e) => { setCollectsBiometric(e.target.checked); if (!e.target.checked) setBiometricType('none') }} className="w-5 h-5" />
                                        <span className="font-medium">Collects Biometric Data</span>
                                    </label>
                                    {collectsBiometric && (
                                        <div className="mt-3 grid grid-cols-3 gap-3">
                                            {(['fingerprint', 'face', 'voice'] as const).map(t => (
                                                <button key={t} onClick={() => setBiometricType(t)} type="button"
                                                    className="p-2 rounded-lg border-2 text-sm capitalize"
                                                    style={{
                                                        borderColor: biometricType === t ? 'var(--color-accent)' : 'var(--color-border)',
                                                        background: biometricType === t ? 'var(--color-accent-subtle)' : 'var(--color-surface)',
                                                    }}>
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Cloud + Retention */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Data Storage Location
                                        </label>
                                        <select value={cloudStorage} onChange={(e) => setCloudStorage(e.target.value as typeof cloudStorage)}
                                            className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                            <option value="local">On-Premise / Local</option>
                                            <option value="us">Cloud — US</option>
                                            <option value="eu">Cloud — EU</option>
                                            <option value="china">Cloud — China</option>
                                            <option value="unknown">Unknown / Not Specified</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Data Retention Policy
                                        </label>
                                        <select value={dataRetention} onChange={(e) => setDataRetention(e.target.value as typeof dataRetention)}
                                            className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                            <option value="30d">30 Days</option>
                                            <option value="90d">90 Days</option>
                                            <option value="1y">1 Year</option>
                                            <option value="3y">3 Years</option>
                                            <option value="forever">Indefinite / No Limit</option>
                                            <option value="customizable">Customizable by Admin</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Consent + Audit */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            User Consent Mechanism
                                        </label>
                                        <select value={userConsent} onChange={(e) => setUserConsent(e.target.value as typeof userConsent)}
                                            className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                            <option value="explicit">Explicit Opt-In</option>
                                            <option value="implied">Implied / Terms of Service</option>
                                            <option value="none">None / Not Implemented</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Audit Trail Access
                                        </label>
                                        <select value={auditTrailAccess} onChange={(e) => setAuditTrailAccess(e.target.value as typeof auditTrailAccess)}
                                            className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                            <option value="admin">Admin Only</option>
                                            <option value="all-users">All Users</option>
                                            <option value="none">No Audit Trail</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Security Checkboxes */}
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { state: encryptsAtRest, setter: setEncryptsAtRest, label: 'Encryption at Rest' },
                                        { state: encryptsInTransit, setter: setEncryptsInTransit, label: 'Encryption in Transit' },
                                        { state: hasPrivacyPolicy, setter: setHasPrivacyPolicy, label: 'Privacy Policy Published' },
                                        { state: sharesWithThirdParty, setter: setSharesWithThirdParty, label: 'Shares Data with Third Parties' },
                                    ].map(({ state, setter, label }) => (
                                        <label key={label} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer border-2" style={{ borderColor: 'var(--color-border)' }}>
                                            <input type="checkbox" checked={state} onChange={(e) => setter(e.target.checked)} className="w-4 h-4" />
                                            <span className="text-sm font-medium">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-1">
                        <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${result.gradeClass}`}>
                            <h2 className="text-xl font-bold mb-4">Compliance Score</h2>
                            <div className="text-center mb-6">
                                <div className="text-7xl font-bold mb-1">{result.grade}</div>
                                <div className="text-2xl mb-1">{result.score}/100</div>
                                <div className="text-sm opacity-90">{result.dpiaRequired ? '⚠️ DPIA Required' : '✓ No DPIA Required'}</div>
                            </div>

                            <div className="mb-6">
                                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white transition-all" style={{ width: `${result.score}%` }} />
                                </div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="font-semibold mb-2 flex items-center gap-1"><FileText className="w-4 h-4" /> Applicable Laws</div>
                                <ul className="space-y-1 text-sm">
                                    {result.applicableLaws.map((law, i) => <li key={i}>• {law}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risks */}
                {result.risks.length > 0 && (
                    <div className="max-w-7xl mx-auto mt-8">
                        <h2 className="text-2xl font-bold mb-6">Identified Risks</h2>
                        <div className="space-y-3">
                            {result.risks.map((risk, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-lg shadow" style={{ background: risk.level === 'high' ? 'var(--color-danger-subtle)' : risk.level === 'medium' ? 'var(--color-warning-subtle)' : 'var(--color-success-subtle)' }}>
                                    {risk.level === 'high' ? <X className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-danger)' }} /> :
                                        risk.level === 'medium' ? <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-warning)' }} /> :
                                            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success)' }} />}
                                    <div>
                                        <span className="text-xs font-bold uppercase" style={{ color: risk.level === 'high' ? 'var(--color-danger)' : risk.level === 'medium' ? 'var(--color-warning)' : 'var(--color-success)' }}>
                                            {risk.level} risk
                                        </span>
                                        <p className="text-sm mt-1">{risk.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                    <div className="max-w-7xl mx-auto mt-8">
                        <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
                        <div className="rounded-lg shadow-lg p-6" style={{ background: 'var(--color-surface)' }}>
                            <ul className="space-y-3">
                                {result.recommendations.map((rec, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                                        <span className="text-sm">{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <ToolRating toolSlug="privacy-compliance" />

                <BeTechCalculatorRecommendation
                    description="Be-Tech processes fingerprint templates on-device (never in the cloud), supports customizable audit trail retention, and provides GDPR-ready privacy documentation for enterprise deployments."
                    badge="Privacy-First"
                />

                <RelatedResources calculatorSlug="privacy-data-compliance-evaluator" />

                <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
                    <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/calculators/security-compliance" className="link-card">
                            <h3 className="link-card__title">Security Compliance</h3>
                            <p className="link-card__desc">ANSI/BHMA/UL physical security standards</p>
                        </Link>
                        <Link href="/calculators/cyber-risk" className="link-card">
                            <h3 className="link-card__title">Cyber Risk Scorecard</h3>
                            <p className="link-card__desc">Digital attack surface assessment</p>
                        </Link>
                        <Link href="/calculators/credential-planner" className="link-card">
                            <h3 className="link-card__title">Credential Planner</h3>
                            <p className="link-card__desc">Plan credential capacity and access</p>
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>← Back to All Calculators</Link>
                </div>
            </div>
        </div>
    )
}
