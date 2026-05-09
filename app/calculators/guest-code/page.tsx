'use client'

import { useState } from 'react'
import Link from 'next/link'
import { KeyRound, AlertTriangle, Lightbulb, Check } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'
import { CalculatorAnswerBlock } from '@/components/seo/CalculatorAnswerBlock'
import { CalculatorFaqBlock } from '@/components/seo/CalculatorFaqBlock'

interface Inputs {
    brand: string
    guestsPerWeek: number
    avgStayDays: number
    codeRotation: string
    codeLength: number
    simultaneousCodes: number
    useCase: string
    doorCount: number
}

const brandCodeLimits: Record<string, { maxCodes: number; maxLength: number; supportsScheduled: boolean; supportsOneTime: boolean }> = {
    yale: { maxCodes: 250, maxLength: 8, supportsScheduled: true, supportsOneTime: true },
    schlage: { maxCodes: 100, maxLength: 8, supportsScheduled: true, supportsOneTime: false },
    kwikset: { maxCodes: 250, maxLength: 8, supportsScheduled: true, supportsOneTime: true },
    august: { maxCodes: 200, maxLength: 6, supportsScheduled: true, supportsOneTime: true },
    ultraloq: { maxCodes: 200, maxLength: 10, supportsScheduled: true, supportsOneTime: true },
    betech: { maxCodes: 500, maxLength: 10, supportsScheduled: true, supportsOneTime: true },
    salto: { maxCodes: 2000, maxLength: 12, supportsScheduled: true, supportsOneTime: true },
    generic: { maxCodes: 100, maxLength: 6, supportsScheduled: false, supportsOneTime: false },
}

export default function GuestCodeCapacityPlanner() {
    const faqs = [
        {
            question: 'How long should guest codes last?',
            answer: 'Guest codes should normally activate shortly before arrival and expire shortly after checkout. Short windows reduce code sharing and stale access, while still giving guests enough time for late arrivals, cleaning delays, and support issues.',
        },
        {
            question: 'Should Airbnb codes be unique?',
            answer: 'Yes. Each Airbnb or short-term rental reservation should receive a unique code when the lock and booking workflow support it. Unique codes make checkout expiration, incident review, and guest support much easier than shared permanent codes.',
        },
        {
            question: 'Can I reuse door codes?',
            answer: 'Reusing door codes increases risk because previous guests, contractors, or staff may still know them. If reuse is unavoidable, use longer codes, rotate them frequently, and avoid patterns connected to the property address or booking dates.',
        },
        {
            question: 'What is a safe checkout code policy?',
            answer: 'A safe checkout policy expires the guest code after the checkout buffer, keeps cleaner and owner codes separate, removes unused codes, and logs exceptions. Hosts with many turnovers should automate code creation through a PMS or lock management platform.',
        },
        {
            question: 'How do I prevent code sharing?',
            answer: 'Use unique expiring codes, avoid shared staff codes, monitor access logs, keep code windows narrow, and change credentials after incidents. For higher-risk properties, combine PINs with mobile credentials, identity checks, or staffed verification.',
        },
    ]

    const [inputs, setInputs] = useState<Inputs>({
        brand: 'generic',
        guestsPerWeek: 5,
        avgStayDays: 3,
        codeRotation: 'per-guest',
        codeLength: 6,
        simultaneousCodes: 10,
        useCase: 'str',
        doorCount: 1,
    })

    const calculate = () => {
        const limits = brandCodeLimits[inputs.brand] || brandCodeLimits.generic
        const issues: string[] = []
        const recommendations: string[] = []

        // Active codes at any time
        const avgActiveGuests = Math.ceil(inputs.guestsPerWeek * (inputs.avgStayDays / 7))
        const permanentCodes = inputs.useCase === 'str' ? 3 : inputs.useCase === 'office' ? 20 : 5
        const totalActiveCodes = (avgActiveGuests * inputs.doorCount) + permanentCodes + inputs.simultaneousCodes

        // Annual unique codes
        const annualGuests = inputs.guestsPerWeek * 52
        const annualCodes = inputs.codeRotation === 'per-guest' ? annualGuests : inputs.codeRotation === 'weekly' ? 52 : 12

        const codeUtilization = (totalActiveCodes / limits.maxCodes) * 100

        // Code collision probability (simplified birthday paradox)
        const possibleCodes = Math.pow(10, inputs.codeLength)
        const collisionRisk = 1 - Math.exp(-((totalActiveCodes * (totalActiveCodes - 1)) / (2 * possibleCodes)))
        const collisionPercent = collisionRisk * 100

        if (codeUtilization > 90) {
            issues.push(`Code storage at ${codeUtilization.toFixed(0)}% — approaching limit of ${limits.maxCodes}`)
            recommendations.push('Implement automatic code expiration and cleanup')
        }
        if (codeUtilization > 100) {
            issues.push(`Exceeds max code capacity (${limits.maxCodes}) — new codes will fail to save`)
        }

        if (collisionPercent > 1) {
            issues.push(`Code collision risk: ${collisionPercent.toFixed(2)}% — increase code length`)
            recommendations.push(`Increase code length to ${Math.min(limits.maxLength, inputs.codeLength + 2)} digits`)
        }

        if (inputs.codeLength > limits.maxLength) {
            issues.push(`Selected brand only supports up to ${limits.maxLength}-digit codes`)
        }

        if (inputs.codeRotation === 'per-guest' && !limits.supportsOneTime) {
            issues.push('Selected brand does not support one-time codes — use scheduled codes instead')
            recommendations.push('Use time-based scheduled codes with automatic expiration')
        }

        if (annualCodes > limits.maxCodes * 2) {
            recommendations.push('High code turnover — consider a commercial platform with API-based code management')
        }

        if (inputs.useCase === 'str' && !limits.supportsScheduled) {
            recommendations.push('For STR operations, use a platform with PMS integration for automated code management')
        }

        if (issues.length === 0) {
            recommendations.push('Code capacity is within safe limits for your usage pattern')
        }

        const grade = codeUtilization <= 50 ? 'A' : codeUtilization <= 75 ? 'B' : codeUtilization <= 90 ? 'C' : 'D'

        return {
            avgActiveGuests,
            totalActiveCodes,
            annualCodes,
            codeUtilization: Math.round(codeUtilization),
            collisionPercent: Math.round(collisionPercent * 100) / 100,
            possibleCodes,
            grade,
            issues,
            recommendations,
            limits,
        }
    }

    const result = calculate()

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link" prefetch={false}>← Back</Link>

                <div className="page-header">
                    <div className="page-header__icon"><KeyRound className="w-14 h-14" /></div>
                    <h1 className="page-header__title">Guest Code Capacity Planner</h1>
                    <p className="page-header__subtitle">
                        Plan guest code storage, rotation schedules, and collision risk for your smart locks
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <CalculatorAnswerBlock
                        title="How should rental operators plan guest smart lock codes?"
                        answer="Guest code planning starts with turnover volume, code length, code expiration, lock storage limits, and whether each reservation gets a unique PIN. Airbnb hosts, property managers, and hospitality teams should keep permanent owner and staff codes separate from temporary guest codes, maintain spare capacity, and avoid reusing codes across stays."
                    />
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="content-card">
                        <h2 className="section-title">Usage Parameters</h2>
                        <div className="space-y-6">
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Use Case</label>
                                <select value={inputs.useCase} onChange={e => setInputs({ ...inputs, useCase: e.target.value })} className="form-input">
                                    <option value="str">Short-Term Rental (Airbnb/VRBO)</option>
                                    <option value="office">Office / Coworking</option>
                                    <option value="property-mgmt">Property Management</option>
                                    <option value="residential">Residential (Guests)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Lock Brand</label>
                                <select value={inputs.brand} onChange={e => setInputs({ ...inputs, brand: e.target.value })} className="form-input">
                                    <option value="generic">Generic (100 codes max)</option>
                                    <option value="yale">Yale (250 codes)</option>
                                    <option value="schlage">Schlage (100 codes)</option>
                                    <option value="kwikset">Kwikset (250 codes)</option>
                                    <option value="august">August (200 codes)</option>
                                    <option value="ultraloq">Ultraloq (200 codes)</option>
                                    <option value="betech">Be-Tech (500 codes)</option>
                                    <option value="salto">SALTO (2,000 codes)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Guests per Week: {inputs.guestsPerWeek}
                                </label>
                                <input type="range" min="1" max="100" value={inputs.guestsPerWeek}
                                    onChange={e => setInputs({ ...inputs, guestsPerWeek: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Average Stay: {inputs.avgStayDays} days
                                </label>
                                <input type="range" min="1" max="30" value={inputs.avgStayDays}
                                    onChange={e => setInputs({ ...inputs, avgStayDays: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Code Rotation</label>
                                <select value={inputs.codeRotation} onChange={e => setInputs({ ...inputs, codeRotation: e.target.value })} className="form-input">
                                    <option value="per-guest">Unique per Guest</option>
                                    <option value="weekly">Weekly Rotation</option>
                                    <option value="monthly">Monthly Rotation</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Code Length: {inputs.codeLength} digits
                                </label>
                                <input type="range" min="4" max="12" value={inputs.codeLength}
                                    onChange={e => setInputs({ ...inputs, codeLength: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Doors per Property: {inputs.doorCount}
                                </label>
                                <input type="range" min="1" max="20" value={inputs.doorCount}
                                    onChange={e => setInputs({ ...inputs, doorCount: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={`result-panel result-panel--grade-${result.grade.toLowerCase()}`}>
                            <h2 className="text-xl font-bold mb-6">Code Capacity</h2>
                            <div className="text-center mb-8">
                                <div className="text-5xl font-bold mb-2">{result.codeUtilization}%</div>
                                <div className="text-lg opacity-90">Capacity Used</div>
                                <div className="mt-2 text-sm opacity-80">Grade: {result.grade}</div>
                            </div>

                            <div className="mb-6">
                                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white transition-all" style={{ width: `${Math.min(100, result.codeUtilization)}%` }} />
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between pb-2 border-b border-white/20">
                                    <span className="opacity-90">Active Codes Needed</span>
                                    <span className="font-semibold">{result.totalActiveCodes}</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-white/20">
                                    <span className="opacity-90">Max Code Slots</span>
                                    <span className="font-semibold">{result.limits.maxCodes}</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-white/20">
                                    <span className="opacity-90">Annual Unique Codes</span>
                                    <span className="font-semibold">{result.annualCodes}</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-white/20">
                                    <span className="opacity-90">Collision Risk</span>
                                    <span className="font-semibold">{result.collisionPercent}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-90">Possible Combinations</span>
                                    <span className="font-semibold">{result.possibleCodes.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {(result.issues.length > 0 || result.recommendations.length > 0) && (
                    <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
                        {result.issues.length > 0 && (
                            <div className="callout callout-danger">
                                <h3 className="text-lg font-bold mb-3 inline-flex items-center gap-2" style={{ color: 'var(--color-danger)' }}>
                                    <AlertTriangle className="w-5 h-5" /> Capacity Warnings
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

                <ToolRating toolSlug="guest-code" />
                <RelatedResources calculatorSlug="guest-code" />
                <div className="max-w-6xl mx-auto">
                    <CalculatorFaqBlock faqs={faqs} />
                </div>
                <BeTechCalculatorRecommendation
                    description="Be-Tech locks support up to 500 PIN codes with time-limited scheduling and one-time use options — ideal for high-turnover short-term rental operations."
                    badge="500 Codes"
                />

                <div className="max-w-6xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>← Back to All Calculators</Link>
                </div>
            </div>
        </div>
    )
}
