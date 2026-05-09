'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, AlertTriangle, Check, Lightbulb } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'
import { CalculatorAnswerBlock } from '@/components/seo/CalculatorAnswerBlock'
import { CalculatorFaqBlock } from '@/components/seo/CalculatorFaqBlock'

interface Inputs {
    brand: string
    totalUsers: number
    concurrentUsers: number
    permissionGroups: number
    timeZones: number
    credentialTypes: string[]
    accessSchedules: number
    doorCount: number
}

const brandLimits: Record<string, { maxUsers: number; maxGroups: number; maxSchedules: number; maxCredPerUser: number }> = {
    yale: { maxUsers: 250, maxGroups: 20, maxSchedules: 50, maxCredPerUser: 2 },
    schlage: { maxUsers: 500, maxGroups: 50, maxSchedules: 100, maxCredPerUser: 3 },
    kwikset: { maxUsers: 250, maxGroups: 25, maxSchedules: 30, maxCredPerUser: 2 },
    august: { maxUsers: 200, maxGroups: 10, maxSchedules: 20, maxCredPerUser: 1 },
    salto: { maxUsers: 2000, maxGroups: 200, maxSchedules: 500, maxCredPerUser: 4 },
    brivo: { maxUsers: 5000, maxGroups: 500, maxSchedules: 1000, maxCredPerUser: 5 },
    generic: { maxUsers: 300, maxGroups: 30, maxSchedules: 50, maxCredPerUser: 2 },
}

export default function AccessCapacityCalculator() {
    const faqs = [
        {
            question: 'How many users can a smart lock store?',
            answer: 'Smart lock user capacity varies widely by product tier. Basic residential locks may store dozens of users, while commercial and cloud-managed access systems can support hundreds or thousands. Always verify per-lock, per-door, and platform limits before rollout.',
        },
        {
            question: 'What happens when code capacity is full?',
            answer: 'When capacity is full, new users or credentials may fail to save, scheduled codes may not sync, and administrators may need to delete old users manually. A deployment should maintain a buffer for turnover, vendors, emergency users, and temporary access.',
        },
        {
            question: 'Do offline locks have lower capacity?',
            answer: 'Offline locks often have tighter local memory limits because users, schedules, and credentials must be stored on the device. Cloud-managed systems can manage larger directories, but each lock may still cache only the credentials it needs locally.',
        },
        {
            question: 'How many credentials do apartments need?',
            answer: 'A multifamily property should count residents, staff, maintenance vendors, leasing teams, emergency access, amenity doors, and expected turnover. A practical plan includes a 15% to 25% capacity buffer beyond the current user count.',
        },
        {
            question: 'Should every user get unique access?',
            answer: 'Yes. Unique access improves accountability, revocation, privacy, and incident response. Shared codes should be avoided for staff, contractors, tenants, and guests except as a temporary fallback with a defined expiration process.',
        },
    ]

    const [inputs, setInputs] = useState<Inputs>({
        brand: 'generic',
        totalUsers: 50,
        concurrentUsers: 10,
        permissionGroups: 5,
        timeZones: 1,
        credentialTypes: ['pin'],
        accessSchedules: 5,
        doorCount: 3,
    })

    const calculate = () => {
        const limits = brandLimits[inputs.brand] || brandLimits.generic
        const issues: string[] = []
        const recommendations: string[] = []

        const userUtilization = (inputs.totalUsers / limits.maxUsers) * 100
        const groupUtilization = (inputs.permissionGroups / limits.maxGroups) * 100
        const scheduleUtilization = (inputs.accessSchedules / limits.maxSchedules) * 100
        const totalCredentials = inputs.totalUsers * inputs.credentialTypes.length
        const maxCredentials = limits.maxUsers * limits.maxCredPerUser
        const credentialUtilization = (totalCredentials / maxCredentials) * 100

        if (userUtilization > 90) {
            issues.push(`User capacity at ${userUtilization.toFixed(0)}% — nearing limit of ${limits.maxUsers}`)
            recommendations.push('Consider upgrading to enterprise-grade access control (SALTO, Brivo)')
        }
        if (userUtilization > 100) {
            issues.push(`Exceeds max user capacity of ${limits.maxUsers} — system will reject new users`)
        }
        if (groupUtilization > 80) {
            issues.push(`Permission groups at ${groupUtilization.toFixed(0)}% capacity`)
            recommendations.push('Consolidate similar groups to free capacity')
        }
        if (scheduleUtilization > 80) {
            issues.push(`Access schedules at ${scheduleUtilization.toFixed(0)}% capacity`)
            recommendations.push('Use group-based schedules instead of per-user')
        }
        if (credentialUtilization > 90) {
            issues.push(`Credential storage at ${credentialUtilization.toFixed(0)}% capacity`)
            recommendations.push('Limit credential types per user or upgrade platform')
        }
        if (inputs.concurrentUsers > inputs.totalUsers * 0.5) {
            issues.push('High concurrent usage may cause authentication delays')
            recommendations.push('Ensure locks support offline credential caching')
        }
        if (inputs.timeZones > 3 && inputs.brand !== 'salto' && inputs.brand !== 'brivo') {
            issues.push('Multi-timezone management limited in residential platforms')
            recommendations.push('Use commercial-grade platform for multi-region deployments')
        }

        if (issues.length === 0) {
            recommendations.push('Current configuration is within safe capacity limits')
        }

        const overallScore = Math.max(0, Math.min(100,
            100 - (Math.max(0, userUtilization - 80) * 2)
            - (Math.max(0, groupUtilization - 80) * 1)
            - (Math.max(0, scheduleUtilization - 80) * 1)
            - (Math.max(0, credentialUtilization - 80) * 1.5)
        ))

        const grade = overallScore >= 80 ? 'A' : overallScore >= 60 ? 'B' : overallScore >= 40 ? 'C' : 'D'
        const status = overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : overallScore >= 40 ? 'At Risk' : 'Over Capacity'

        return {
            userUtilization, groupUtilization, scheduleUtilization, credentialUtilization,
            totalCredentials, maxCredentials, overallScore, grade, status,
            issues, recommendations, limits,
        }
    }

    const result = calculate()

    const toggleCredential = (type: string) => {
        setInputs(prev => ({
            ...prev,
            credentialTypes: prev.credentialTypes.includes(type)
                ? prev.credentialTypes.filter(t => t !== type)
                : [...prev.credentialTypes, type],
        }))
    }

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back</Link>

                <div className="page-header">
                    <div className="page-header__icon"><Users className="w-14 h-14" /></div>
                    <h1 className="page-header__title">Access Control Capacity Calculator</h1>
                    <p className="page-header__subtitle">
                        Verify your locks can handle all users, credentials, and permission groups
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <CalculatorAnswerBlock
                        title="How do you calculate smart lock user capacity?"
                        answer="Smart lock user capacity should include every resident, employee, vendor, guest, administrator, emergency user, credential type, permission group, and schedule the lock or platform must store. The safest deployment plan keeps at least 15% to 25% unused capacity so turnover, temporary access, and future doors do not push the system over its limit."
                    />
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="content-card">
                        <h2 className="section-title">System Parameters</h2>
                        <div className="space-y-6">
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Lock Brand / Platform
                                </label>
                                <select value={inputs.brand} onChange={e => setInputs({ ...inputs, brand: e.target.value })} className="form-input">
                                    <option value="generic">Generic Smart Lock</option>
                                    <option value="yale">Yale (250 users)</option>
                                    <option value="schlage">Schlage (500 users)</option>
                                    <option value="kwikset">Kwikset (250 users)</option>
                                    <option value="august">August (200 users)</option>
                                    <option value="salto">SALTO KS — Commercial (2,000 users)</option>
                                    <option value="brivo">Brivo — Enterprise (5,000 users)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Total Users: {inputs.totalUsers}
                                </label>
                                <input type="range" min="1" max="5000" value={inputs.totalUsers}
                                    onChange={e => setInputs({ ...inputs, totalUsers: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                                <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                                    <span>1</span><span>5,000</span>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Peak Concurrent Users: {inputs.concurrentUsers}
                                </label>
                                <input type="range" min="1" max="500" value={inputs.concurrentUsers}
                                    onChange={e => setInputs({ ...inputs, concurrentUsers: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                                <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                                    <span>1</span><span>500</span>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Permission Groups: {inputs.permissionGroups}
                                </label>
                                <input type="range" min="1" max="200" value={inputs.permissionGroups}
                                    onChange={e => setInputs({ ...inputs, permissionGroups: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                                <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                                    <span>1</span><span>200</span>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Access Schedules: {inputs.accessSchedules}
                                </label>
                                <input type="range" min="1" max="500" value={inputs.accessSchedules}
                                    onChange={e => setInputs({ ...inputs, accessSchedules: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Timezones: {inputs.timeZones}
                                </label>
                                <input type="range" min="1" max="10" value={inputs.timeZones}
                                    onChange={e => setInputs({ ...inputs, timeZones: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Credential Types
                                </label>
                                <div className="space-y-2">
                                    {['pin', 'card', 'ble', 'fingerprint', 'face'].map(type => (
                                        <label key={type} className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                                            <input type="checkbox" checked={inputs.credentialTypes.includes(type)}
                                                onChange={() => toggleCredential(type)} className="w-4 h-4"
                                            />
                                            <span className="capitalize">{type === 'ble' ? 'BLE / Mobile' : type === 'pin' ? 'PIN Code' : type === 'card' ? 'RFID Card' : type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div>
                        <div className={`result-panel result-panel--grade-${result.grade.toLowerCase()}`}>
                            <h2 className="text-xl font-bold mb-6">Capacity Assessment</h2>
                            <div className="text-center mb-8">
                                <div className="text-7xl font-bold mb-2">{result.grade}</div>
                                <div className="text-2xl mb-2">{result.overallScore.toFixed(0)}/100</div>
                                <div className="text-lg opacity-90">{result.status}</div>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div>
                                    <div className="flex justify-between mb-1"><span>Users</span><span>{result.userUtilization.toFixed(0)}%</span></div>
                                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white transition-all" style={{ width: `${Math.min(100, result.userUtilization)}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1"><span>Groups</span><span>{result.groupUtilization.toFixed(0)}%</span></div>
                                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white transition-all" style={{ width: `${Math.min(100, result.groupUtilization)}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1"><span>Schedules</span><span>{result.scheduleUtilization.toFixed(0)}%</span></div>
                                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white transition-all" style={{ width: `${Math.min(100, result.scheduleUtilization)}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1"><span>Credentials</span><span>{result.credentialUtilization.toFixed(0)}%</span></div>
                                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white transition-all" style={{ width: `${Math.min(100, result.credentialUtilization)}%` }} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-white/10 rounded-lg text-sm">
                                <div className="flex justify-between"><span>Total credentials:</span><span className="font-semibold">{result.totalCredentials}</span></div>
                                <div className="flex justify-between"><span>Max supported:</span><span className="font-semibold">{result.maxCredentials}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Issues & Recommendations */}
                {result.issues.length > 0 && (
                    <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
                        <div className="callout callout-danger">
                            <h3 className="text-lg font-bold mb-3 inline-flex items-center gap-2" style={{ color: 'var(--color-danger)' }}>
                                <AlertTriangle className="w-5 h-5" /> Capacity Issues
                            </h3>
                            <ul className="space-y-2">
                                {result.issues.map((issue, i) => (
                                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        <span className="mt-1">•</span><span>{issue}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
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

                {/* Platform Comparison Table */}
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="content-card">
                        <h2 className="section-title">Platform Capacity Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Platform</th>
                                        <th>Max Users</th>
                                        <th>Max Groups</th>
                                        <th>Max Schedules</th>
                                        <th>Cred/User</th>
                                        <th>Segment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'August', ...brandLimits.august, segment: 'Residential' },
                                        { name: 'Yale', ...brandLimits.yale, segment: 'Residential' },
                                        { name: 'Kwikset', ...brandLimits.kwikset, segment: 'Residential' },
                                        { name: 'Schlage', ...brandLimits.schlage, segment: 'Light Commercial' },
                                        { name: 'SALTO KS', ...brandLimits.salto, segment: 'Commercial' },
                                        { name: 'Brivo', ...brandLimits.brivo, segment: 'Enterprise' },
                                    ].map(p => (
                                        <tr key={p.name}>
                                            <td style={{ fontWeight: 600 }}>{p.name}</td>
                                            <td>{p.maxUsers.toLocaleString()}</td>
                                            <td>{p.maxGroups}</td>
                                            <td>{p.maxSchedules}</td>
                                            <td>{p.maxCredPerUser}</td>
                                            <td><span className="badge badge-accent">{p.segment}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <ToolRating toolSlug="access-capacity" />
                <RelatedResources calculatorSlug="access-capacity" />
                <div className="max-w-6xl mx-auto">
                    <CalculatorFaqBlock faqs={faqs} />
                </div>
                <BeTechCalculatorRecommendation
                    description="Be-Tech commercial access control systems support up to 3,000 users per lock with multi-credential management, making them ideal for medium to large deployments."
                    badge="High Capacity"
                />

                <div className="max-w-6xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>← Back to All Calculators</Link>
                </div>
            </div>
        </div>
    )
}
