'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'
import { Building2, Wrench, DollarSign, BarChart3 } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'

export default function FleetPlanner() {
  const [properties, setProperties] = useState(10)
  const [avgLocksPerProperty, setAvgLocksPerProperty] = useState(3)
  const [currentProtocols, setCurrentProtocols] = useState<string[]>(['zigbee', 'wifi'])
  const [budget, setBudget] = useState('medium')

  // New professional fields
  const [propertyType, setPropertyType] = useState('residential')
  const [avgLockAge, setAvgLockAge] = useState(3)
  const [managedByPM, setManagedByPM] = useState(false)
  const [region, setRegion] = useState('us')
  const [rolloutStrategy, setRolloutStrategy] = useState('phased')

  const toggleProtocol = (p: string) => {
    setCurrentProtocols(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  const calculate = () => {
    const totalLocks = properties * avgLocksPerProperty
    const protocolCount = currentProtocols.length
    const fragmentationScore = Math.min(100, protocolCount * 25)

    // Property type cost multiplier
    const typeCostMultiplier = { residential: 1.0, commercial: 1.35, mixed: 1.15 }[propertyType] || 1.0

    // Region multiplier
    const regionMultiplier: Record<string, number> = { us: 1.0, eu: 1.15, uk: 1.10, asia: 0.65, 'middle-east': 0.80, canada: 1.05, australia: 1.20 }
    const regMul = regionMultiplier[region] || 1.0

    const unificationCost = Math.round(totalLocks * 200 * typeCostMultiplier * regMul)
    const maintenanceSavings = protocolCount > 1 ? totalLocks * 50 : 0
    const trainingSavings = protocolCount > 1 ? properties * 100 : 0

    // PM management adds training overhead but also increases savings potential
    const pmOverhead = managedByPM ? properties * 75 : 0
    const pmSavingsBoost = managedByPM ? properties * 40 : 0

    const annualSavings = maintenanceSavings + trainingSavings + pmSavingsBoost
    const totalCost = unificationCost + pmOverhead
    const paybackYears = annualSavings > 0 ? totalCost / annualSavings : 0

    // Lock age urgency (older = more urgent)
    const urgencyLabel = avgLockAge >= 7 ? 'Critical — immediate replacement recommended' : avgLockAge >= 4 ? 'Moderate — plan replacement within 12 months' : 'Low — locks still within typical lifespan'

    // Rollout timeline
    const rolloutMonths = { 'all-at-once': Math.ceil(totalLocks / 20), phased: Math.ceil(totalLocks / 10) * 3, 'as-needed': Math.ceil(avgLockAge * 6) }[rolloutStrategy] || 12

    return {
      totalLocks,
      protocolCount,
      fragmentationScore,
      unificationCost,
      maintenanceSavings,
      trainingSavings,
      annualSavings,
      paybackYears: Math.round(paybackYears * 10) / 10,
      recommendation: protocolCount > 2 ? 'Highly recommend unification' : protocolCount > 1 ? 'Consider unification' : 'Already unified',
      urgencyLabel,
      rolloutMonths,
      pmOverhead
    }
  }

  const result = calculate()

  return (
    <div className="page-bg">
      <div className="container-main section">
        <Link href="/calculators" className="back-link">← Back</Link>

        <div className="page-header">
          <div className="page-header__icon"><Building2 className="w-14 h-14" /></div>
          <h1 className="text-4xl font-bold mb-4">Multi-Property Fleet Planner</h1>
          <p style={{ fontSize: "1.25rem", color: "var(--color-text-secondary)" }}>Analyze protocol fragmentation across your property portfolio</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
            <h2 className="text-2xl font-bold mb-6">Portfolio Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Number of Properties: {properties}</label>
                <input type="range" min="1" max="100" value={properties} onChange={(e) => setProperties(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Avg Locks per Property: {avgLocksPerProperty}</label>
                <input type="range" min="1" max="20" value={avgLocksPerProperty} onChange={(e) => setAvgLocksPerProperty(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Current Protocols in Use</label>
                <div className="space-y-2">
                  {['zigbee', 'zwave', 'wifi', 'thread'].map(p => (
                    <label key={p} className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "1px solid var(--color-border)" }}>
                      <input type="checkbox" checked={currentProtocols.includes(p)} onChange={() => toggleProtocol(p)} className="w-4 h-4" />
                      <span className="capitalize">{p}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium">Property Type</label>
                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="residential">Residential (standard cost)</option>
                  <option value="commercial">Commercial (×1.35 cost)</option>
                  <option value="mixed">Mixed Portfolio (×1.15 cost)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Average Lock Age: {avgLockAge} years</label>
                <input type="range" min="0" max="10" value={avgLockAge} onChange={(e) => setAvgLockAge(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span>New</span>
                  <span>10 years</span>
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium">Market Region</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="us">United States (×1.0)</option>
                  <option value="eu">European Union (×1.15)</option>
                  <option value="uk">United Kingdom (×1.10)</option>
                  <option value="canada">Canada (×1.05)</option>
                  <option value="australia">Australia / NZ (×1.20)</option>
                  <option value="asia">Asia Pacific (×0.65)</option>
                  <option value="middle-east">Middle East / Africa (×0.80)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Rollout Strategy</label>
                <select value={rolloutStrategy} onChange={(e) => setRolloutStrategy(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="all-at-once">All at Once (fastest, highest upfront cost)</option>
                  <option value="phased">Phased Quarterly (balanced approach)</option>
                  <option value="as-needed">As-Needed Replacement (lowest upfront cost)</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                  <input type="checkbox" checked={managedByPM} onChange={(e) => setManagedByPM(e.target.checked)} className="w-4 h-4" />
                  <span>Managed by External Property Manager (+$75/property training)</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className={`result-panel ${result.fragmentationScore < 30 ? 'result-panel--grade-a' :
                result.fragmentationScore < 60 ? 'result-panel--grade-c' :
                  'result-panel--grade-f'
              }`}>
              <h2 className="text-xl font-bold mb-6">Fragmentation Analysis</h2>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-2">{result.fragmentationScore}</div>
                <div className="text-lg">Fragmentation Score</div>
                <div className="text-sm opacity-90 mt-2">{result.recommendation}</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Total Locks</span>
                  <span className="font-semibold">{result.totalLocks}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Protocols</span>
                  <span className="font-semibold">{result.protocolCount}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Unification Cost</span>
                  <span className="font-semibold">${result.unificationCost}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Annual Savings</span>
                  <span className="font-semibold">${result.annualSavings}</span>
                </div>
              </div>
              {result.urgencyLabel && (
                <div className="p-3 bg-white/10 rounded-lg text-xs mb-4">
                  <p><strong>Lock Age Urgency:</strong> {result.urgencyLabel}</p>
                </div>
              )}
              <div className="p-3 bg-white/10 rounded-lg text-xs mb-4">
                <p><strong>Est. Rollout Timeline:</strong> {result.rolloutMonths} months</p>
                {result.pmOverhead > 0 && <p className="mt-1"><strong>PM Training Cost:</strong> ${result.pmOverhead}</p>}
              </div>
              <div className="pt-4 border-t-2 border-white/40">
                <div className="flex justify-between">
                  <span>Payback Period</span>
                  <span className="text-2xl font-bold">{result.paybackYears}yr</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
          <h2 className="text-2xl font-bold mb-6">Unification Benefits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg" style={{ background: "var(--color-accent-subtle)" }}>
              <div className="text-blue-600 mb-2"><Wrench className="w-8 h-8 mx-auto" /></div>
              <div className="font-semibold mb-2">Simpler Maintenance</div>
              <div className="link-card__desc">One protocol = one skill set</div>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: "var(--color-success-subtle)" }}>
              <div className="text-green-600 mb-2"><DollarSign className="w-8 h-8 mx-auto" /></div>
              <div className="font-semibold mb-2">Bulk Discounts</div>
              <div className="link-card__desc">Better pricing at scale</div>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: "var(--color-accent-subtle)" }}>
              <div className="text-purple-600 mb-2"><BarChart3 className="w-8 h-8 mx-auto" /></div>
              <div className="font-semibold mb-2">Unified Management</div>
              <div className="link-card__desc">Single dashboard for all</div>
            </div>
          </div>
        </div>
      </div>

      <ToolRating toolSlug="fleet-planner" />

      <RelatedResources calculatorSlug="multi-property-fleet-planner" />

      {/* Be-Tech Brand Recommendation */}
      <BeTechCalculatorRecommendation
        description="Be-Tech offers unified smart lock solutions across multiple protocols, helping you standardize your fleet while maintaining flexibility. Professional support for multi-property deployments."
        badge="Fleet Ready"
      />

      {/* Back Link */}
      <div className="max-w-6xl mx-auto mt-8 mb-12">
        <Link href="/calculators" style={{ color: "var(--color-accent)", fontWeight: 500 }}>
          ← Back to All Calculators
        </Link>
      </div>
    </div>
  )
}
