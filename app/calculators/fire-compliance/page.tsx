'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Flame, AlertTriangle, Lightbulb, Check } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'
import { CalculatorAnswerBlock } from '@/components/seo/CalculatorAnswerBlock'
import { CalculatorFaqBlock } from '@/components/seo/CalculatorFaqBlock'

interface Inputs {
    buildingType: string
    occupancy: number
    egressPaths: number
    jurisdiction: string
    hasFireAlarm: boolean
    connectedToFACP: boolean
    failSafe: boolean
    adaCompliant: boolean
    hasKeyOverride: boolean
    batteryBackup: boolean
    annunciatorPanel: boolean
    lockType: string
}

export default function FireComplianceChecker() {
    const faqs = [
        {
            question: 'Are smart locks allowed on fire doors?',
            answer: 'Smart locks may be allowed on fire doors only when the full door assembly, latch, closer, egress function, listing, and installation method remain compliant. Final approval belongs to the local authority having jurisdiction, especially for commercial, hotel, school, and multifamily doors.',
        },
        {
            question: 'What does fail-safe mean?',
            answer: 'Fail-safe means the lock releases when power is lost, allowing egress. Electromagnetic locks commonly need fail-safe operation and fire alarm release. Fail-secure hardware stays locked on power loss and may be appropriate for some secure areas only when egress rules are still met.',
        },
        {
            question: 'Do access controlled doors need manual release?',
            answer: 'Many egress doors need a way to open from the inside without special knowledge, tools, tight grasping, or multiple actions. Depending on the hardware, that may mean lever operation, push hardware, request-to-exit devices, or fire alarm release.',
        },
        {
            question: 'Who approves egress hardware?',
            answer: 'The authority having jurisdiction, fire marshal, building inspector, or code consultant typically approves egress hardware. Manufacturers and installers can provide listings and diagrams, but local review decides whether the installed assembly is acceptable.',
        },
        {
            question: 'Can Airbnb locks violate fire code?',
            answer: 'Yes. A rental lock can create a code issue if it blocks emergency egress, removes required latching, disables a fire-rated assembly, lacks required override, or forces guests to use an app or code to exit. Short-term rentals should preserve simple inside egress.',
        },
    ]

    const [inputs, setInputs] = useState<Inputs>({
        buildingType: 'office',
        occupancy: 100,
        egressPaths: 2,
        jurisdiction: 'ibc',
        hasFireAlarm: true,
        connectedToFACP: false,
        failSafe: false,
        adaCompliant: true,
        hasKeyOverride: true,
        batteryBackup: true,
        annunciatorPanel: false,
        lockType: 'maglocks',
    })

    const calculate = () => {
        const issues: string[] = []
        const recommendations: string[] = []
        const passed: string[] = []
        let score = 0

        // Fail-safe requirement (IBC 1010.1.9.9)
        if (inputs.lockType === 'maglocks' && !inputs.failSafe) {
            issues.push('Electromagnetic locks MUST be fail-safe (unlock on power loss) per IBC 1010.1.9.9')
        }
        if (inputs.failSafe) { score += 20; passed.push('Fail-safe operation verified') }
        else if (inputs.lockType !== 'maglocks') score += 10

        // Fire alarm connection
        if (inputs.lockType === 'maglocks' && !inputs.connectedToFACP) {
            issues.push('Maglocks must release upon fire alarm activation — FACP connection required')
            recommendations.push('Wire electromagnetic locks to fire alarm control panel for automatic release')
        }
        if (inputs.connectedToFACP) { score += 15; passed.push('Connected to Fire Alarm Control Panel') }

        // Egress paths
        const minEgress = inputs.occupancy <= 49 ? 1 : inputs.occupancy <= 500 ? 2 : inputs.occupancy <= 1000 ? 3 : 4
        if (inputs.egressPaths < minEgress) {
            issues.push(`Minimum ${minEgress} egress paths required for occupancy of ${inputs.occupancy} — only ${inputs.egressPaths} provided`)
        } else {
            score += 15
            passed.push(`Egress paths meet minimum requirement (${inputs.egressPaths}/${minEgress})`)
        }

        // ADA compliance
        if (!inputs.adaCompliant) {
            issues.push('Hardware must be ADA-compliant (operable without tight grasping/twisting)')
            recommendations.push('Install lever-style handles or push/pull hardware per ADA/ANSI A117.1')
        } else {
            score += 10
            passed.push('ADA-compliant hardware')
        }

        // Key override
        if (!inputs.hasKeyOverride) {
            issues.push('Physical key override required for emergency access (fire department)')
            recommendations.push('Install key override cylinder compatible with local FD Knox Box system')
        } else {
            score += 10
            passed.push('Physical key override available')
        }

        // Battery backup
        if (!inputs.batteryBackup) {
            recommendations.push('Battery backup ensures locks function during power outages')
        } else {
            score += 10
            passed.push('Battery backup installed')
        }

        // Fire alarm system
        if (!inputs.hasFireAlarm && (inputs.buildingType === 'office' || inputs.buildingType === 'hotel' || inputs.buildingType === 'healthcare' || inputs.buildingType === 'school')) {
            issues.push('Fire alarm system required for this building type')
        }
        if (inputs.hasFireAlarm) { score += 5; passed.push('Fire alarm system present') }

        // Annunciator panel for hotels/healthcare
        if ((inputs.buildingType === 'hotel' || inputs.buildingType === 'healthcare') && !inputs.annunciatorPanel) {
            recommendations.push('Annunciator panel recommended for remote lock status monitoring')
        }
        if (inputs.annunciatorPanel) { score += 5; passed.push('Annunciator panel installed') }

        // Building-specific codes
        if (inputs.buildingType === 'healthcare') {
            if (!inputs.connectedToFACP) {
                issues.push('Healthcare facilities require all access-controlled doors to interface with FACP')
            }
            score += 5
        }
        if (inputs.buildingType === 'school') {
            recommendations.push('Classroom security locks must allow free egress from inside per NFPA 101 §14.2.2')
            if (inputs.failSafe) score += 5
        }

        if (issues.length === 0) recommendations.push('Configuration meets basic fire safety requirements')

        const compliant = issues.length === 0 && score >= 50
        const grade = score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'F'

        return { score, grade, compliant, issues, recommendations, passed }
    }

    const result = calculate()

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link" prefetch={false}>← Back</Link>

                <div className="page-header">
                    <div className="page-header__icon"><Flame className="w-14 h-14" /></div>
                    <h1 className="page-header__title">Fire Code Compliance Checker</h1>
                    <p className="page-header__subtitle">
                        Verify smart lock installations meet IBC, NFPA, and ADA fire safety requirements
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <CalculatorAnswerBlock
                        title="Are smart locks allowed on fire doors?"
                        answer="Smart locks can be used on some fire-rated and egress doors when the lock, latch, closer, release method, fire alarm interface, and door assembly remain code-compliant. The key test is whether occupants can exit safely and whether the installation preserves the listed fire door assembly. Always confirm with the AHJ before installing access control on required egress doors."
                    >
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <tbody>
                                    <tr><td style={{ fontWeight: 600 }}>Usually required</td><td>Free egress from inside, compliant latch, listed hardware, proper closer operation</td></tr>
                                    <tr><td style={{ fontWeight: 600 }}>Higher risk</td><td>Maglocks, delayed egress, modified fire doors, app-only exits, missing fire alarm release</td></tr>
                                    <tr><td style={{ fontWeight: 600 }}>Approval source</td><td>Local AHJ, fire marshal, building inspector, or qualified code consultant</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </CalculatorAnswerBlock>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="content-card">
                        <h2 className="section-title">Building Configuration</h2>
                        <div className="space-y-6">
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Building Type</label>
                                <select value={inputs.buildingType} onChange={e => setInputs({ ...inputs, buildingType: e.target.value })} className="form-input">
                                    <option value="residential">Residential</option>
                                    <option value="office">Office / Commercial</option>
                                    <option value="hotel">Hotel / Hospitality</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="school">School / Education</option>
                                    <option value="warehouse">Industrial / Warehouse</option>
                                    <option value="assembly">Assembly / Venue</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Occupancy: {inputs.occupancy} persons
                                </label>
                                <input type="range" min="1" max="2000" value={inputs.occupancy}
                                    onChange={e => setInputs({ ...inputs, occupancy: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Egress Paths: {inputs.egressPaths}
                                </label>
                                <input type="range" min="1" max="8" value={inputs.egressPaths}
                                    onChange={e => setInputs({ ...inputs, egressPaths: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Jurisdiction</label>
                                <select value={inputs.jurisdiction} onChange={e => setInputs({ ...inputs, jurisdiction: e.target.value })} className="form-input">
                                    <option value="ibc">International Building Code (IBC)</option>
                                    <option value="nfpa101">NFPA 101 Life Safety Code</option>
                                    <option value="en">European EN Standards</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Lock Type</label>
                                <select value={inputs.lockType} onChange={e => setInputs({ ...inputs, lockType: e.target.value })} className="form-input">
                                    <option value="smart-deadbolt">Smart Deadbolt</option>
                                    <option value="smart-lever">Smart Lever Lock</option>
                                    <option value="maglocks">Electromagnetic / Maglock</option>
                                    <option value="electric-strike">Electric Strike</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Safety Features</label>
                                <div className="space-y-2">
                                    {[
                                        { key: 'failSafe', label: 'Fail-Safe (Unlocks on power loss)' },
                                        { key: 'hasFireAlarm', label: 'Fire Alarm System Present' },
                                        { key: 'connectedToFACP', label: 'Connected to Fire Alarm Control Panel (FACP)' },
                                        { key: 'adaCompliant', label: 'ADA-Compliant Hardware' },
                                        { key: 'hasKeyOverride', label: 'Physical Key Override' },
                                        { key: 'batteryBackup', label: 'Battery Backup' },
                                        { key: 'annunciatorPanel', label: 'Annunciator Panel' },
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

                    <div>
                        <div className={`result-panel ${result.compliant ? 'result-panel--grade-a' : 'result-panel--grade-f'}`}>
                            <h2 className="text-xl font-bold mb-6">Compliance Status</h2>
                            <div className="text-center mb-8">
                                <div className="text-5xl font-bold mb-2">{result.compliant ? 'PASS' : 'FAIL'}</div>
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
                                    <div className="font-semibold mb-2">Verified Items:</div>
                                    {result.passed.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 flex-shrink-0" /><span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {(result.issues.length > 0 || result.recommendations.length > 0) && (
                    <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
                        {result.issues.length > 0 && (
                            <div className="callout callout-danger">
                                <h3 className="text-lg font-bold mb-3 inline-flex items-center gap-2" style={{ color: 'var(--color-danger)' }}>
                                    <AlertTriangle className="w-5 h-5" /> Code Violations
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

                {/* Code Reference Table */}
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="content-card">
                        <h2 className="section-title">Fire Safety Code Quick Reference</h2>
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr><th>Code Section</th><th>Requirement</th><th>Applies To</th></tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: 600 }}>IBC 1010.1.9.9</td>
                                        <td style={{ fontSize: '0.875rem' }}>Maglocks must unlock on power loss and fire alarm</td>
                                        <td>Electromagnetic locks</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 600 }}>IBC 1010.1.9.4</td>
                                        <td style={{ fontSize: '0.875rem' }}>Free egress required — single motion to open from inside</td>
                                        <td>All exit doors</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 600 }}>NFPA 101 §7.2.1</td>
                                        <td style={{ fontSize: '0.875rem' }}>Doors in means of egress must be readily operable</td>
                                        <td>All egress paths</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 600 }}>ADA/ANSI A117.1</td>
                                        <td style={{ fontSize: '0.875rem' }}>Hardware operable without tight grasping/twisting, max 5 lbf</td>
                                        <td>All accessible routes</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 600 }}>NFPA 80</td>
                                        <td style={{ fontSize: '0.875rem' }}>Fire door assemblies must self-close and latch</td>
                                        <td>Fire-rated doors</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <ToolRating toolSlug="fire-compliance" />
                <RelatedResources calculatorSlug="fire-compliance" />
                <div className="max-w-6xl mx-auto">
                    <CalculatorFaqBlock faqs={faqs} />
                </div>
                <BeTechCalculatorRecommendation
                    description="Be-Tech commercial locks include fail-safe modes, FACP integration, and ADA-compliant lever handles as standard. Fire-rated models available for 60 and 90-minute assemblies."
                    badge="Fire Safe"
                />

                <div className="max-w-6xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>← Back to All Calculators</Link>
                </div>
            </div>
        </div>
    )
}
