'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Building2, DollarSign, TrendingUp, Users, CreditCard, Info } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

interface HotelROIResult {
    totalInvestment: number
    annualSavings: number
    paybackMonths: number
    fiveYearROI: number
    fiveYearROIPercent: number
    perRoomAnnualSavings: number
    breakdown: {
        keycardSavings: number
        laborSavings: number
        lockoutSavings: number
        energySavings: number
        maintenanceSavings: number
        softwareCost: number
    }
}

export default function HotelROI() {
    const [roomCount, setRoomCount] = useState(100)
    const [avgOccupancy, setAvgOccupancy] = useState(70) // percent
    const [currentSystem, setCurrentSystem] = useState<'magnetic' | 'rfid' | 'mechanical' | 'mixed'>('magnetic')
    const [frontDeskStaff, setFrontDeskStaff] = useState(4)
    const [avgHourlyWage, setAvgHourlyWage] = useState(18)
    const [keycardReplacementRate, setKeycardReplacementRate] = useState(15) // % per month
    const [keycardCost, setKeycardCost] = useState(0.50) // per card
    const [lockoutsPerDay, setLockoutsPerDay] = useState(3)
    const [lockoutResolutionMin, setLockoutResolutionMin] = useState(10)
    const [smartLockCostPerDoor, setSmartLockCostPerDoor] = useState(350)
    const [installCostPerDoor, setInstallCostPerDoor] = useState(75)
    const [monthlySoftwareFee, setMonthlySoftwareFee] = useState(3) // per door

    const result = useMemo((): HotelROIResult => {
        const dailyOccupied = Math.round(roomCount * (avgOccupancy / 100))

        // Total investment
        const totalInvestment = roomCount * (smartLockCostPerDoor + installCostPerDoor)

        // Annual keycard savings
        const monthlyKeycards = dailyOccupied * 30 * (keycardReplacementRate / 100) // replacement cards
        const monthlyCheckins = dailyOccupied * 30 * 0.3 // ~30% turnover daily
        const totalMonthlyCards = monthlyKeycards + monthlyCheckins
        const keycardSavings = totalMonthlyCards * keycardCost * 12

        // Labor savings (mobile check-in reduces front desk workload)
        const checkInTimeReduction = 0.3 // 30% less front desk time per check-in
        const dailyCheckIns = dailyOccupied * 0.3
        const savedMinutesPerDay = dailyCheckIns * 5 * checkInTimeReduction // 5 min per check-in avg
        const laborSavings = (savedMinutesPerDay / 60) * avgHourlyWage * 365

        // Lockout savings
        const annualLockouts = lockoutsPerDay * 365
        const lockoutCostPerIncident = (lockoutResolutionMin / 60) * avgHourlyWage
        const lockoutReduction = 0.85 // smart locks eliminate 85% of lockouts
        const lockoutSavings = annualLockouts * lockoutCostPerIncident * lockoutReduction

        // Energy savings (auto-lock/HVAC integration)
        const energySavingsPerRoom = currentSystem === 'mechanical' ? 120 : currentSystem === 'magnetic' ? 60 : 40
        const energySavings = roomCount * energySavingsPerRoom * (avgOccupancy / 100)

        // Maintenance savings
        const currentMaintenanceCost = currentSystem === 'mechanical' ? 45 : currentSystem === 'magnetic' ? 30 : currentSystem === 'rfid' ? 15 : 35
        const smartLockMaintenanceCost = 10
        const maintenanceSavings = roomCount * (currentMaintenanceCost - smartLockMaintenanceCost)

        // Software cost
        const annualSoftwareCost = roomCount * monthlySoftwareFee * 12

        // Total
        const annualSavings = keycardSavings + laborSavings + lockoutSavings + energySavings + maintenanceSavings - annualSoftwareCost
        const paybackMonths = annualSavings > 0 ? Math.round((totalInvestment / annualSavings) * 12) : 999
        const fiveYearROI = (annualSavings * 5) - totalInvestment
        const fiveYearROIPercent = Math.round((fiveYearROI / totalInvestment) * 100)

        return {
            totalInvestment,
            annualSavings: Math.round(annualSavings),
            paybackMonths,
            fiveYearROI: Math.round(fiveYearROI),
            fiveYearROIPercent,
            perRoomAnnualSavings: Math.round(annualSavings / roomCount),
            breakdown: {
                keycardSavings: Math.round(keycardSavings),
                laborSavings: Math.round(laborSavings),
                lockoutSavings: Math.round(lockoutSavings),
                energySavings: Math.round(energySavings),
                maintenanceSavings: Math.round(maintenanceSavings),
                softwareCost: Math.round(annualSoftwareCost),
            },
        }
    }, [roomCount, avgOccupancy, currentSystem, frontDeskStaff, avgHourlyWage, keycardReplacementRate, keycardCost, lockoutsPerDay, lockoutResolutionMin, smartLockCostPerDoor, installCostPerDoor, monthlySoftwareFee])

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back to Calculators</Link>

                <div className="text-center mb-12">
                    <div className="page-header__icon"><Building2 className="w-14 h-14 mx-auto" /></div>
                    <h1 className="text-4xl font-bold mb-4">Hotel & Hospitality ROI Calculator</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>
                        Calculate the return on investment for smart lock deployment in hotels and hospitality properties
                    </p>
                </div>

                <div className="max-w-4xl mx-auto" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="callout callout-info">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                            <div>
                                <h2 className="font-bold mb-1" style={{ fontSize: '1rem' }}>Hotels ≠ Short-Term Rentals</h2>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    Hotel ROI differs from vacation rental ROI. Hotels benefit from <strong>keycard elimination</strong>,
                                    <strong> front-desk labor optimization</strong>, <strong>PMS integration</strong>, and <strong>energy management</strong> at scale —
                                    factors that don&apos;t apply to individual Airbnb properties.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Property Details</h2>
                            <div className="space-y-6">
                                {/* Room Count */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Number of Rooms: {roomCount}
                                    </label>
                                    <input type="range" min={10} max={500} step={5} value={roomCount}
                                        onChange={(e) => setRoomCount(Number(e.target.value))}
                                        className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        <span>10 rooms</span><span>500 rooms</span>
                                    </div>
                                </div>

                                {/* Occupancy */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Average Occupancy: {avgOccupancy}%
                                    </label>
                                    <input type="range" min={20} max={98} value={avgOccupancy}
                                        onChange={(e) => setAvgOccupancy(Number(e.target.value))}
                                        className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        <span>20%</span><span>98%</span>
                                    </div>
                                </div>

                                {/* Current System */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Current Key System
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {([
                                            { value: 'mechanical', label: 'Physical Keys' },
                                            { value: 'magnetic', label: 'Magnetic Stripe' },
                                            { value: 'rfid', label: 'RFID Cards' },
                                            { value: 'mixed', label: 'Mixed System' },
                                        ] as const).map(opt => (
                                            <button key={opt.value} onClick={() => setCurrentSystem(opt.value)} type="button"
                                                className="p-3 rounded-lg border-2 text-sm font-medium transition-all text-center"
                                                style={{
                                                    borderColor: currentSystem === opt.value ? 'var(--color-accent)' : 'var(--color-border)',
                                                    background: currentSystem === opt.value ? 'var(--color-accent-subtle)' : 'white',
                                                    color: currentSystem === opt.value ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                }}>
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Front Desk + Wage */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Front Desk Staff: {frontDeskStaff}
                                        </label>
                                        <input type="range" min={1} max={20} value={frontDeskStaff}
                                            onChange={(e) => setFrontDeskStaff(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Avg Hourly Wage: ${avgHourlyWage}
                                        </label>
                                        <input type="range" min={10} max={35} value={avgHourlyWage}
                                            onChange={(e) => setAvgHourlyWage(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                </div>

                                {/* Keycard Details */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Keycard Replacement Rate: {keycardReplacementRate}%/month
                                        </label>
                                        <input type="range" min={5} max={40} value={keycardReplacementRate}
                                            onChange={(e) => setKeycardReplacementRate(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Cost per Keycard: ${keycardCost.toFixed(2)}
                                        </label>
                                        <input type="range" min={0.10} max={3.00} step={0.10} value={keycardCost}
                                            onChange={(e) => setKeycardCost(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                </div>

                                {/* Lockout Details */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Lockouts per Day: {lockoutsPerDay}
                                        </label>
                                        <input type="range" min={0} max={20} value={lockoutsPerDay}
                                            onChange={(e) => setLockoutsPerDay(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Resolution Time: {lockoutResolutionMin} min
                                        </label>
                                        <input type="range" min={5} max={30} value={lockoutResolutionMin}
                                            onChange={(e) => setLockoutResolutionMin(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                </div>

                                {/* Investment Costs */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Lock Cost/Door: ${smartLockCostPerDoor}
                                        </label>
                                        <input type="range" min={150} max={800} step={25} value={smartLockCostPerDoor}
                                            onChange={(e) => setSmartLockCostPerDoor(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Install Cost/Door: ${installCostPerDoor}
                                        </label>
                                        <input type="range" min={0} max={200} step={5} value={installCostPerDoor}
                                            onChange={(e) => setInstallCostPerDoor(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Software Fee/Door: ${monthlySoftwareFee}/mo
                                        </label>
                                        <input type="range" min={0} max={15} step={0.5} value={monthlySoftwareFee}
                                            onChange={(e) => setMonthlySoftwareFee(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-lg shadow-lg text-white sticky top-4">
                            <h2 className="text-xl font-bold mb-6">ROI Summary</h2>
                            <div className="text-center mb-6">
                                <div className="text-5xl font-bold mb-1">{result.paybackMonths}</div>
                                <div className="text-lg opacity-90">months to payback</div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="flex justify-between mb-1">
                                        <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> Investment</span>
                                        <span className="font-bold">${result.totalInvestment.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> Annual Savings</span>
                                        <span className="font-bold">${result.annualSavings.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-white/20">
                                        <span>5-Year ROI</span>
                                        <span className="font-bold">${result.fiveYearROI.toLocaleString()} ({result.fiveYearROIPercent}%)</span>
                                    </div>
                                </div>

                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="flex justify-between">
                                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Per Room/Year</span>
                                        <span className="font-bold">${result.perRoomAnnualSavings}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Savings Breakdown */}
                <div className="max-w-7xl mx-auto mt-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <DollarSign className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                        Annual Savings Breakdown
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Annual Amount</th>
                                    <th>% of Total</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium flex items-center gap-2"><CreditCard className="w-4 h-4" /> Keycard Elimination</td>
                                    <td className="font-bold" style={{ color: 'var(--color-success)' }}>+${result.breakdown.keycardSavings.toLocaleString()}</td>
                                    <td>{result.annualSavings > 0 ? Math.round((result.breakdown.keycardSavings / (result.annualSavings + result.breakdown.softwareCost)) * 100) : 0}%</td>
                                    <td className="text-sm">No more card printing, encoding, or replacement costs</td>
                                </tr>
                                <tr>
                                    <td className="font-medium flex items-center gap-2"><Users className="w-4 h-4" /> Front Desk Labor</td>
                                    <td className="font-bold" style={{ color: 'var(--color-success)' }}>+${result.breakdown.laborSavings.toLocaleString()}</td>
                                    <td>{result.annualSavings > 0 ? Math.round((result.breakdown.laborSavings / (result.annualSavings + result.breakdown.softwareCost)) * 100) : 0}%</td>
                                    <td className="text-sm">Mobile check-in reduces front desk workload by ~30%</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Lockout Reduction</td>
                                    <td className="font-bold" style={{ color: 'var(--color-success)' }}>+${result.breakdown.lockoutSavings.toLocaleString()}</td>
                                    <td>{result.annualSavings > 0 ? Math.round((result.breakdown.lockoutSavings / (result.annualSavings + result.breakdown.softwareCost)) * 100) : 0}%</td>
                                    <td className="text-sm">Smart locks reduce lockout incidents by ~85%</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Energy Savings</td>
                                    <td className="font-bold" style={{ color: 'var(--color-success)' }}>+${result.breakdown.energySavings.toLocaleString()}</td>
                                    <td>{result.annualSavings > 0 ? Math.round((result.breakdown.energySavings / (result.annualSavings + result.breakdown.softwareCost)) * 100) : 0}%</td>
                                    <td className="text-sm">Auto-lock + HVAC integration reduces energy waste</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Maintenance Savings</td>
                                    <td className="font-bold" style={{ color: 'var(--color-success)' }}>+${result.breakdown.maintenanceSavings.toLocaleString()}</td>
                                    <td>{result.annualSavings > 0 ? Math.round((result.breakdown.maintenanceSavings / (result.annualSavings + result.breakdown.softwareCost)) * 100) : 0}%</td>
                                    <td className="text-sm">Lower maintenance cost vs. traditional lock hardware</td>
                                </tr>
                                <tr style={{ background: 'var(--color-danger-subtle, #fef2f2)' }}>
                                    <td className="font-medium">Software Subscription</td>
                                    <td className="font-bold" style={{ color: 'var(--color-danger)' }}>-${result.breakdown.softwareCost.toLocaleString()}</td>
                                    <td>—</td>
                                    <td className="text-sm">Cloud management platform fee ({roomCount} rooms × ${monthlySoftwareFee}/mo)</td>
                                </tr>
                                <tr className="font-bold" style={{ background: 'var(--color-accent-subtle)' }}>
                                    <td>Net Annual Savings</td>
                                    <td style={{ color: result.annualSavings >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                                        ${result.annualSavings.toLocaleString()}
                                    </td>
                                    <td>100%</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <ToolRating toolSlug="hotel-roi" />

                <BeTechCalculatorRecommendation
                    description="Be-Tech specializes in hotel-grade smart locks with PMS integration, RFID + mobile key support, and audit trail compliance — designed for high-turnover hospitality environments."
                    badge="Hotel Grade"
                />

                <RelatedResources calculatorSlug="hotel-hospitality-roi-calculator" />

                <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
                    <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/calculators/str-roi" className="link-card">
                            <h3 className="link-card__title">STR ROI Calculator</h3>
                            <p className="link-card__desc">ROI for short-term rental properties</p>
                        </Link>
                        <Link href="/calculators/lock-tco" className="link-card">
                            <h3 className="link-card__title">TCO Calculator</h3>
                            <p className="link-card__desc">Total cost of ownership analysis</p>
                        </Link>
                        <Link href="/calculators/fleet-planner" className="link-card">
                            <h3 className="link-card__title">Fleet Planner</h3>
                            <p className="link-card__desc">Multi-property fleet management</p>
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
