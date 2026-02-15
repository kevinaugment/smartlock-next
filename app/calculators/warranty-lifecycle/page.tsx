'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Timer, AlertTriangle, Lightbulb, Check } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

interface Inputs {
    brand: string
    dailyUsage: number
    environment: string
    warrantyYears: number
    lockPrice: number
    doorCount: number
    yearsToProject: number
    maintenanceLevel: string
}

const brandLifespan: Record<string, { baseLifeYears: number; failureRate: number; warrantyDefault: number }> = {
    generic: { baseLifeYears: 7, failureRate: 0.04, warrantyDefault: 1 },
    yale: { baseLifeYears: 8, failureRate: 0.03, warrantyDefault: 2 },
    schlage: { baseLifeYears: 10, failureRate: 0.025, warrantyDefault: 3 },
    kwikset: { baseLifeYears: 7, failureRate: 0.035, warrantyDefault: 2 },
    august: { baseLifeYears: 6, failureRate: 0.045, warrantyDefault: 1 },
    ultraloq: { baseLifeYears: 7, failureRate: 0.04, warrantyDefault: 2 },
    level: { baseLifeYears: 8, failureRate: 0.03, warrantyDefault: 2 },
    betech: { baseLifeYears: 10, failureRate: 0.02, warrantyDefault: 3 },
    salto: { baseLifeYears: 12, failureRate: 0.015, warrantyDefault: 5 },
}

export default function WarrantyLifecycleCalculator() {
    const [inputs, setInputs] = useState<Inputs>({
        brand: 'generic',
        dailyUsage: 10,
        environment: 'indoor',
        warrantyYears: 2,
        lockPrice: 200,
        doorCount: 3,
        yearsToProject: 10,
        maintenanceLevel: 'basic',
    })

    const calculate = () => {
        const data = brandLifespan[inputs.brand] || brandLifespan.generic

        // Environment impact on lifespan
        const envMultiplier: Record<string, number> = { indoor: 1.0, outdoor_covered: 0.8, outdoor_exposed: 0.6 }
        const envFactor = envMultiplier[inputs.environment] || 1.0

        // Usage impact (baseline is 10 uses/day)
        const usageFactor = inputs.dailyUsage <= 10 ? 1.0 : inputs.dailyUsage <= 30 ? 0.85 : inputs.dailyUsage <= 60 ? 0.7 : 0.55

        // Maintenance impact
        const maintMultiplier: Record<string, number> = { none: 0.85, basic: 1.0, premium: 1.15 }
        const maintFactor = maintMultiplier[inputs.maintenanceLevel] || 1.0

        const expectedLifespan = data.baseLifeYears * envFactor * usageFactor * maintFactor
        const adjustedFailureRate = data.failureRate / (envFactor * usageFactor * maintFactor)

        // Replacement cost calculation
        const replacementsNeeded = inputs.yearsToProject > expectedLifespan
            ? Math.floor(inputs.yearsToProject / expectedLifespan)
            : 0

        const warrantyCoveredReplacements = inputs.warrantyYears >= expectedLifespan ? 1 : 0
        const outOfPocketReplacements = Math.max(0, replacementsNeeded - warrantyCoveredReplacements)
        const replacementCost = outOfPocketReplacements * inputs.lockPrice * inputs.doorCount

        // Annual failure risk cost (out-of-warranty)
        const yearsOutOfWarranty = Math.max(0, inputs.yearsToProject - inputs.warrantyYears)
        const annualFailureCost = adjustedFailureRate * inputs.lockPrice * inputs.doorCount
        const totalFailureCost = annualFailureCost * yearsOutOfWarranty

        const totalLifecycleCost = (inputs.lockPrice * inputs.doorCount) + replacementCost + totalFailureCost
        const annualLifecycleCost = totalLifecycleCost / inputs.yearsToProject

        // Lifecycle phase
        const currentPhase = inputs.yearsToProject <= inputs.warrantyYears ? 'Under Warranty'
            : inputs.yearsToProject <= expectedLifespan * 0.7 ? 'Prime Performance'
                : inputs.yearsToProject <= expectedLifespan ? 'Aging — Plan Replacement'
                    : 'Past Expected Lifespan'

        return {
            expectedLifespan: Math.round(expectedLifespan * 10) / 10,
            adjustedFailureRate: Math.round(adjustedFailureRate * 1000) / 10,
            replacementsNeeded,
            replacementCost,
            totalFailureCost: Math.round(totalFailureCost),
            totalLifecycleCost: Math.round(totalLifecycleCost),
            annualLifecycleCost: Math.round(annualLifecycleCost),
            currentPhase,
            warrantyExpiresYear: inputs.warrantyYears,
            yearsOutOfWarranty,
        }
    }

    const result = calculate()

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back</Link>

                <div className="text-center mb-12">
                    <div className="page-header__icon"><Timer className="w-14 h-14 mx-auto" /></div>
                    <h1 className="page-header__title">Warranty & Lifecycle Calculator</h1>
                    <p className="page-header__subtitle">
                        Predict product lifespan, warranty coverage gaps, and replacement costs
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="content-card">
                        <h2 className="section-title">Lock Configuration</h2>
                        <div className="space-y-6">
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Brand</label>
                                <select value={inputs.brand} onChange={e => setInputs({ ...inputs, brand: e.target.value })} className="form-input">
                                    <option value="generic">Generic</option>
                                    <option value="yale">Yale</option>
                                    <option value="schlage">Schlage</option>
                                    <option value="kwikset">Kwikset</option>
                                    <option value="august">August</option>
                                    <option value="ultraloq">Ultraloq</option>
                                    <option value="level">Level</option>
                                    <option value="betech">Be-Tech</option>
                                    <option value="salto">SALTO</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Lock Price per Unit: ${inputs.lockPrice}
                                </label>
                                <input type="range" min="50" max="800" step="25" value={inputs.lockPrice}
                                    onChange={e => setInputs({ ...inputs, lockPrice: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                                <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}><span>$50</span><span>$800</span></div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Number of Doors: {inputs.doorCount}
                                </label>
                                <input type="range" min="1" max="100" value={inputs.doorCount}
                                    onChange={e => setInputs({ ...inputs, doorCount: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Daily Usage: {inputs.dailyUsage} operations
                                </label>
                                <input type="range" min="1" max="100" value={inputs.dailyUsage}
                                    onChange={e => setInputs({ ...inputs, dailyUsage: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Environment</label>
                                <select value={inputs.environment} onChange={e => setInputs({ ...inputs, environment: e.target.value })} className="form-input">
                                    <option value="indoor">Indoor (Climate Controlled)</option>
                                    <option value="outdoor_covered">Outdoor — Covered</option>
                                    <option value="outdoor_exposed">Outdoor — Exposed</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Warranty: {inputs.warrantyYears} years
                                </label>
                                <input type="range" min="1" max="7" value={inputs.warrantyYears}
                                    onChange={e => setInputs({ ...inputs, warrantyYears: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Projection: {inputs.yearsToProject} years
                                </label>
                                <input type="range" min="1" max="20" value={inputs.yearsToProject}
                                    onChange={e => setInputs({ ...inputs, yearsToProject: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Maintenance</label>
                                <select value={inputs.maintenanceLevel} onChange={e => setInputs({ ...inputs, maintenanceLevel: e.target.value })} className="form-input">
                                    <option value="none">None</option>
                                    <option value="basic">Basic — Annual checkup</option>
                                    <option value="premium">Premium — Quarterly service</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-lg shadow-lg text-white sticky top-4">
                            <h2 className="text-xl font-bold mb-6">Lifecycle Analysis</h2>
                            <div className="text-center mb-8">
                                <div className="text-5xl font-bold mb-2">{result.expectedLifespan} yr</div>
                                <div className="text-lg opacity-90">Expected Lifespan</div>
                                <div className="mt-2 text-sm opacity-80">{result.currentPhase}</div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-sm opacity-90">Annual Failure Rate</span>
                                    <span className="font-semibold">{result.adjustedFailureRate}%</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-sm opacity-90">Replacements Needed</span>
                                    <span className="font-semibold">{result.replacementsNeeded}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-sm opacity-90">Replacement Cost</span>
                                    <span className="font-semibold">${result.replacementCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-sm opacity-90">Failure Risk Cost</span>
                                    <span className="font-semibold">${result.totalFailureCost.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Total Lifecycle Cost:</span>
                                    <span className="font-bold text-lg">${result.totalLifecycleCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Annual Cost:</span>
                                    <span className="font-semibold">${result.annualLifecycleCost}/yr</span>
                                </div>
                            </div>

                            {result.yearsOutOfWarranty > 0 && (
                                <div className="mt-4 p-3 bg-white/10 rounded-lg text-xs">
                                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                                    {result.yearsOutOfWarranty} years of unwarrantied exposure
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Brand Lifespan Comparison */}
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="content-card">
                        <h2 className="section-title">Brand Lifespan Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr><th>Brand</th><th>Base Lifespan</th><th>Failure Rate</th><th>Default Warranty</th></tr>
                                </thead>
                                <tbody>
                                    {Object.entries(brandLifespan).filter(([k]) => k !== 'generic').map(([key, data]) => (
                                        <tr key={key}>
                                            <td style={{ fontWeight: 600, textTransform: 'capitalize' }}>{key === 'betech' ? 'Be-Tech' : key.charAt(0).toUpperCase() + key.slice(1)}</td>
                                            <td>{data.baseLifeYears} years</td>
                                            <td>{(data.failureRate * 100).toFixed(1)}%/yr</td>
                                            <td>{data.warrantyDefault} years</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <ToolRating toolSlug="warranty-lifecycle" />
                <RelatedResources calculatorSlug="warranty-lifecycle" />
                <BeTechCalculatorRecommendation
                    description="Be-Tech smart locks are engineered for 10+ year lifespans with industry-low 2% annual failure rates and 3-year standard warranty coverage."
                    badge="Long Lifecycle"
                />

                <div className="max-w-6xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>← Back to All Calculators</Link>
                </div>
            </div>
        </div>
    )
}
