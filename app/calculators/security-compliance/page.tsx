'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, AlertTriangle, Check, Lightbulb } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'
import { CalculatorAnswerBlock } from '@/components/seo/CalculatorAnswerBlock'
import { CalculatorFaqBlock } from '@/components/seo/CalculatorFaqBlock'

interface Inputs {
    application: string
    grade: string
    fireRating: string
    ulListed: boolean
    electronicAudit: boolean
    antiTamper: boolean
    encryptedComm: boolean
    twoFactorAuth: boolean
    autoRelock: boolean
    duressCode: boolean
    jurisdiction: string
}

const gradeRequirements: Record<string, { label: string; minScore: number; mandatory: string[] }> = {
    'ansi-3': { label: 'ANSI/BHMA Grade 3 — Residential', minScore: 40, mandatory: ['autoRelock'] },
    'ansi-2': { label: 'ANSI/BHMA Grade 2 — Light Commercial', minScore: 55, mandatory: ['autoRelock', 'antiTamper'] },
    'ansi-1': { label: 'ANSI/BHMA Grade 1 — Heavy Commercial', minScore: 70, mandatory: ['autoRelock', 'antiTamper', 'electronicAudit'] },
    'ul-437': { label: 'UL 437 — High Security', minScore: 85, mandatory: ['autoRelock', 'antiTamper', 'electronicAudit', 'encryptedComm'] },
    'en-12209': { label: 'EN 12209 — European Standard', minScore: 60, mandatory: ['autoRelock', 'antiTamper'] },
}

export default function SecurityComplianceChecker() {
    const faqs = [
        {
            question: 'What smart lock security features are required?',
            answer: 'Most security reviews look for appropriate ANSI/BHMA grade, automatic relock, tamper detection, encrypted communication, administrative controls, and audit logs. Commercial, healthcare, government, and multifamily deployments usually need stricter documentation than a single residential door.',
        },
        {
            question: 'Is ANSI Grade 1 necessary?',
            answer: 'ANSI Grade 1 is usually reserved for heavy commercial or high-traffic doors. Residential and light commercial doors may be adequately served by Grade 2 or Grade 3 hardware, but the right grade depends on traffic, threat model, insurance requirements, and local policy.',
        },
        {
            question: 'Do smart locks need audit logs?',
            answer: 'Audit logs are strongly recommended for commercial, hospitality, healthcare, and managed rental use because they show who accessed a door and when. They also support incident review, credential cleanup, and compliance documentation.',
        },
        {
            question: 'What encryption should access systems use?',
            answer: 'Modern smart lock systems should use encrypted communication between the lock, hub, mobile app, and cloud service. Look for documented encryption, secure credential storage, signed firmware updates, and access controls for administrator accounts.',
        },
        {
            question: 'How often should codes be rotated?',
            answer: 'Codes should be changed when a user leaves, a guest stay ends, a code is shared, or compromise is suspected. Routine forced rotation is less important than unique credentials, automatic expiration, lockout thresholds, and complete removal of old access.',
        },
    ]

    const [inputs, setInputs] = useState<Inputs>({
        application: 'residential',
        grade: 'ansi-3',
        fireRating: 'none',
        ulListed: false,
        electronicAudit: false,
        antiTamper: false,
        encryptedComm: false,
        twoFactorAuth: false,
        autoRelock: true,
        duressCode: false,
        jurisdiction: 'us',
    })

    const calculate = () => {
        const issues: string[] = []
        const recommendations: string[] = []
        const passed: string[] = []
        let score = 0

        // Base score from features
        if (inputs.autoRelock) { score += 15; passed.push('Auto-relock enabled') }
        else issues.push('Auto-relock not enabled — required for all grades')

        if (inputs.antiTamper) { score += 15; passed.push('Anti-tamper detection') }
        if (inputs.electronicAudit) { score += 15; passed.push('Electronic audit trail') }
        if (inputs.encryptedComm) { score += 15; passed.push('Encrypted communication (AES-128+)') }
        if (inputs.twoFactorAuth) { score += 10; passed.push('Two-factor authentication') }
        if (inputs.duressCode) { score += 10; passed.push('Duress code support') }
        if (inputs.ulListed) { score += 10; passed.push('UL listed product') }

        // Fire rating bonus
        const fireScores: Record<string, number> = { 'none': 0, '20-min': 3, '45-min': 5, '60-min': 7, '90-min': 10 }
        score += fireScores[inputs.fireRating] || 0
        if (inputs.fireRating !== 'none') passed.push(`Fire rating: ${inputs.fireRating}`)

        // Check mandatory requirements
        const req = gradeRequirements[inputs.grade]
        if (req) {
            for (const field of req.mandatory) {
                if (!inputs[field as keyof Inputs]) {
                    issues.push(`${field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} is MANDATORY for ${req.label}`)
                }
            }
        }

        // Application-specific requirements
        if (inputs.application === 'commercial' || inputs.application === 'healthcare') {
            if (!inputs.electronicAudit) {
                issues.push('Electronic audit trail required for commercial/healthcare applications')
                recommendations.push('Enable audit logging for compliance')
            }
        }
        if (inputs.application === 'healthcare') {
            if (!inputs.twoFactorAuth) {
                issues.push('Two-factor authentication recommended for healthcare (HIPAA)')
                recommendations.push('Enable 2FA for HIPAA compliance')
            }
        }
        if (inputs.application === 'government') {
            if (!inputs.encryptedComm) {
                issues.push('Encrypted communication required for government facilities')
            }
            if (!inputs.twoFactorAuth) {
                issues.push('Two-factor auth required for government facilities')
            }
            recommendations.push('Verify FIPS 140-2 certification for government use')
        }

        // Fire code checks
        if ((inputs.application === 'commercial' || inputs.application === 'healthcare' || inputs.application === 'government') && inputs.fireRating === 'none') {
            issues.push('Fire-rated hardware typically required for commercial occupancies')
            recommendations.push('Consult local AHJ (Authority Having Jurisdiction) for fire rating requirements')
        }

        if (issues.length === 0) {
            recommendations.push('Configuration meets compliance requirements for selected grade')
        }

        const compliant = req ? score >= req.minScore && issues.length === 0 : score >= 40
        const grade = score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : score >= 40 ? 'D' : 'F'
        const status = compliant ? 'Compliant' : 'Non-Compliant'

        return { score, grade, status, compliant, issues, recommendations, passed }
    }

    const result = calculate()

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link" prefetch={false}>← Back</Link>

                <div className="page-header">
                    <div className="page-header__icon"><ShieldCheck className="w-14 h-14" /></div>
                    <h1 className="page-header__title">Security Compliance Checker</h1>
                    <p className="page-header__subtitle">
                        Evaluate ANSI/BHMA grade compliance, UL 437, and EN 12209 requirements
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <CalculatorAnswerBlock
                        title="What does a smart lock security compliance checker review?"
                        answer="A smart lock security compliance checker compares the lock configuration against the security controls that matter in managed deployments: hardware grade, tamper resistance, audit logs, encryption, relock behavior, emergency override, and administrative access. It does not replace a formal certification review, but it helps property managers, IT teams, and consultants identify obvious gaps before procurement or rollout."
                    />
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="content-card">
                        <h2 className="section-title">Configuration</h2>
                        <div className="space-y-6">
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Application Type
                                </label>
                                <select value={inputs.application} onChange={e => setInputs({ ...inputs, application: e.target.value })} className="form-input">
                                    <option value="residential">Residential</option>
                                    <option value="commercial">Commercial / Office</option>
                                    <option value="healthcare">Healthcare (HIPAA)</option>
                                    <option value="government">Government / Military</option>
                                    <option value="education">Education</option>
                                    <option value="hospitality">Hospitality</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Target Grade / Standard
                                </label>
                                <select value={inputs.grade} onChange={e => setInputs({ ...inputs, grade: e.target.value })} className="form-input">
                                    {Object.entries(gradeRequirements).map(([key, val]) => (
                                        <option key={key} value={key}>{val.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Jurisdiction
                                </label>
                                <select value={inputs.jurisdiction} onChange={e => setInputs({ ...inputs, jurisdiction: e.target.value })} className="form-input">
                                    <option value="us">United States (IBC/NFPA)</option>
                                    <option value="eu">European Union (EN Standards)</option>
                                    <option value="uk">United Kingdom (BS EN)</option>
                                    <option value="au">Australia (BCA/AS)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Fire Rating
                                </label>
                                <select value={inputs.fireRating} onChange={e => setInputs({ ...inputs, fireRating: e.target.value })} className="form-input">
                                    <option value="none">None</option>
                                    <option value="20-min">20 Minutes</option>
                                    <option value="45-min">45 Minutes</option>
                                    <option value="60-min">60 Minutes</option>
                                    <option value="90-min">90 Minutes</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Security Features
                                </label>
                                <div className="space-y-2">
                                    {[
                                        { key: 'ulListed', label: 'UL Listed Product' },
                                        { key: 'autoRelock', label: 'Auto-Relock Function' },
                                        { key: 'antiTamper', label: 'Anti-Tamper Detection' },
                                        { key: 'electronicAudit', label: 'Electronic Audit Trail' },
                                        { key: 'encryptedComm', label: 'Encrypted Communication (AES-128+)' },
                                        { key: 'twoFactorAuth', label: 'Two-Factor Authentication' },
                                        { key: 'duressCode', label: 'Duress Code Support' },
                                    ].map(({ key, label }) => (
                                        <label key={key} className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                                            <input type="checkbox" checked={inputs[key as keyof Inputs] as boolean}
                                                onChange={e => setInputs({ ...inputs, [key]: e.target.checked })} className="w-4 h-4"
                                            />
                                            <span>{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div>
                        <div className={`result-panel ${result.compliant ? 'result-panel--grade-a' : 'result-panel--grade-f'}`}>
                            <h2 className="text-xl font-bold mb-6">Compliance Assessment</h2>
                            <div className="text-center mb-8">
                                <div className="text-5xl font-bold mb-2">{result.status}</div>
                                <div className="text-2xl mb-2">{result.score}/100</div>
                                <div className="text-lg opacity-90">Grade: {result.grade}</div>
                            </div>

                            <div className="mb-6">
                                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white transition-all" style={{ width: `${result.score}%` }} />
                                </div>
                            </div>

                            {result.passed.length > 0 && (
                                <div className="space-y-2 text-sm bg-white/10 rounded-lg p-4">
                                    <div className="font-semibold mb-2">Features Verified:</div>
                                    {result.passed.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Issues & Recommendations */}
                {(result.issues.length > 0 || result.recommendations.length > 0) && (
                    <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
                        {result.issues.length > 0 && (
                            <div className="callout callout-danger">
                                <h3 className="text-lg font-bold mb-3 inline-flex items-center gap-2" style={{ color: 'var(--color-danger)' }}>
                                    <AlertTriangle className="w-5 h-5" /> Compliance Gaps
                                </h3>
                                <ul className="space-y-2">
                                    {result.issues.map((issue, i) => (
                                        <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                                            <span className="mt-1">•</span><span>{issue}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="callout callout-info">
                            <h3 className="text-lg font-bold mb-3 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                                <Lightbulb className="w-5 h-5" /> Recommendations
                            </h3>
                            <ul className="space-y-2">
                                {result.recommendations.map((rec, i) => (
                                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} /><span>{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Standards Reference */}
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="content-card">
                        <h2 className="section-title">Security Standards Reference</h2>
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Standard</th>
                                        <th>Region</th>
                                        <th>Application</th>
                                        <th>Key Requirements</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: 600 }}>ANSI Grade 3</td>
                                        <td>US/Canada</td>
                                        <td>Residential</td>
                                        <td style={{ fontSize: '0.875rem' }}>200K cycles, basic security</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 600 }}>ANSI Grade 2</td>
                                        <td>US/Canada</td>
                                        <td>Light Commercial</td>
                                        <td style={{ fontSize: '0.875rem' }}>400K cycles, medium security</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 600 }}>ANSI Grade 1</td>
                                        <td>US/Canada</td>
                                        <td>Heavy Commercial</td>
                                        <td style={{ fontSize: '0.875rem' }}>800K cycles, audit trail, anti-tamper</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 600 }}>UL 437</td>
                                        <td>US/Canada</td>
                                        <td>High Security</td>
                                        <td style={{ fontSize: '0.875rem' }}>Pick/drill resistance, encrypted comms</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 600 }}>EN 12209</td>
                                        <td>European Union</td>
                                        <td>All</td>
                                        <td style={{ fontSize: '0.875rem' }}>8-grade system, durability + security</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <ToolRating toolSlug="security-compliance" />
                <RelatedResources calculatorSlug="security-compliance" />
                <div className="max-w-6xl mx-auto">
                    <CalculatorFaqBlock faqs={faqs} />
                </div>
                <BeTechCalculatorRecommendation
                    description="Be-Tech locks meet ANSI Grade 1 and Grade 2 standards with UL-listed models available. Features include AES-256 encryption, anti-tamper alerts, and full electronic audit trails."
                    badge="ANSI Certified"
                />

                <div className="max-w-6xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>← Back to All Calculators</Link>
                </div>
            </div>
        </div>
    )
}
