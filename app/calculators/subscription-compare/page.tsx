'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'
import { Scale, Cloud, Home, Check, X } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'

export default function SubscriptionCompare() {
  const [doors, setDoors] = useState(10)
  const [monthlyFeePerDoor, setMonthlyFeePerDoor] = useState(5)
  const [localSystemCost, setLocalSystemCost] = useState(5000)
  const [years, setYears] = useState(5)

  // New professional fields
  const [annualPriceIncrease, setAnnualPriceIncrease] = useState(3)
  const [localMaintenanceCost, setLocalMaintenanceCost] = useState(0)
  const [cloudFeaturesValue, setCloudFeaturesValue] = useState(0)
  const [scalingDiscount, setScalingDiscount] = useState('none')
  const [includesSupport, setIncludesSupport] = useState(false)

  const calculate = () => {
    // Scaling discount
    const discountRate: Record<string, number> = { none: 0, '5': 0.05, '10': 0.10, '15': 0.15 }
    const discount = discountRate[scalingDiscount] || 0
    const adjustedMonthlyFee = monthlyFeePerDoor * (1 - discount)

    // Compound annual increase on subscription
    let subscriptionTotal = 0
    for (let yr = 0; yr < years; yr++) {
      const yearlyFee = doors * adjustedMonthlyFee * 12 * Math.pow(1 + annualPriceIncrease / 100, yr)
      subscriptionTotal += yearlyFee
    }

    // Support value offset for subscription
    const supportValue = includesSupport ? years * 500 : 0

    // Cloud features value offset
    const featuresValue = cloudFeaturesValue * 12 * years

    const subscriptionMonthly = doors * adjustedMonthlyFee
    const subscriptionYearly = subscriptionMonthly * 12

    // Local total includes maintenance
    const localTotal = localSystemCost + (localMaintenanceCost * years)

    // Net comparison: subscription cost minus value offsets
    const netSubscriptionCost = subscriptionTotal
    const netLocalCost = localTotal + featuresValue + supportValue  // local user misses these features

    const difference = netSubscriptionCost - netLocalCost
    const breakEvenMonths = netLocalCost / subscriptionMonthly
    const breakEvenYears = breakEvenMonths / 12
    const recommendation = difference > 0 ? 'Local system is cheaper' : 'Subscription is cheaper'

    return {
      subscriptionMonthly: Math.round(subscriptionMonthly),
      subscriptionYearly: Math.round(subscriptionYearly),
      subscriptionTotal: Math.round(subscriptionTotal),
      localTotal: Math.round(netLocalCost),
      difference: Math.round(Math.abs(difference)),
      breakEvenYears: Math.round(breakEvenYears * 10) / 10,
      recommendation,
      winner: difference > 0 ? 'local' : 'subscription',
      maintenanceTotalAdded: localMaintenanceCost * years,
      priceIncreaseImpact: Math.round(subscriptionTotal - (subscriptionYearly * years))
    }
  }

  const result = calculate()

  return (
    <div className="page-bg">
      <div className="container-main section">
        <Link href="/calculators" className="back-link">← Back</Link>

        <div className="text-center mb-12">
          <div className="page-header__icon"><Scale className="w-14 h-14 mx-auto" /></div>
          <h1 className="text-4xl font-bold mb-4">Subscription vs Purchase Comparison</h1>
          <p style={{ fontSize: "1.25rem", color: "var(--color-text-secondary)" }}>Compare long-term costs of cloud subscription vs local solution</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Comparison Parameters</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Number of Doors: {doors}</label>
                <input type="range" min="1" max="100" value={doors} onChange={(e) => setDoors(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Monthly Fee per Door: ${monthlyFeePerDoor}</label>
                <input type="range" min="1" max="15" step="0.5" value={monthlyFeePerDoor} onChange={(e) => setMonthlyFeePerDoor(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Local System Cost: ${localSystemCost}</label>
                <input type="range" min="1000" max="20000" step="500" value={localSystemCost} onChange={(e) => setLocalSystemCost(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Timeframe: {years} years</label>
                <input type="range" min="1" max="10" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Annual Price Increase: {annualPriceIncrease}%</label>
                <input type="range" min="0" max="15" value={annualPriceIncrease} onChange={(e) => setAnnualPriceIncrease(Number(e.target.value))} className="w-full" />
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Subscription prices typically increase 3-5% annually</p>
              </div>
              <div>
                <label className="block mb-2 font-medium">Local Maintenance Cost: ${localMaintenanceCost}/year</label>
                <input type="range" min="0" max="500" step="25" value={localMaintenanceCost} onChange={(e) => setLocalMaintenanceCost(Number(e.target.value))} className="w-full" />
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Ongoing maintenance for self-hosted system</p>
              </div>
              <div>
                <label className="block mb-2 font-medium">Cloud Features Value: ${cloudFeaturesValue}/month</label>
                <input type="range" min="0" max="50" step="5" value={cloudFeaturesValue} onChange={(e) => setCloudFeaturesValue(Number(e.target.value))} className="w-full" />
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Estimated value of remote access, audit logs, alerts</p>
              </div>
              <div>
                <label className="block mb-2 font-medium">Volume Discount</label>
                <select value={scalingDiscount} onChange={(e) => setScalingDiscount(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="none">No Discount</option>
                  <option value="5">5% Volume Discount</option>
                  <option value="10">10% Volume Discount</option>
                  <option value="15">15% Enterprise Discount</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                  <input type="checkbox" checked={includesSupport} onChange={(e) => setIncludesSupport(e.target.checked)} className="w-4 h-4" />
                  <span>Subscription Includes Tech Support (est. $500/yr value)</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${result.winner === 'local' ? 'bg-gradient-to-br from-green-600 to-green-700' : 'bg-gradient-to-br from-blue-600 to-blue-700'
              }`}>
              <h2 className="text-xl font-bold mb-6">Cost Comparison</h2>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-2">${result.difference}</div>
                <div className="text-lg">Cost Difference</div>
                <div className="text-sm opacity-90 mt-2">{result.recommendation}</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Subscription ({years}yr)</span>
                  <span className="font-semibold">${result.subscriptionTotal}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Local System</span>
                  <span className="font-semibold">${result.localTotal}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Subscription/year</span>
                  <span className="font-semibold">${result.subscriptionYearly}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Subscription/month</span>
                  <span className="font-semibold">${result.subscriptionMonthly}</span>
                </div>
              </div>
              <div className="pt-4 border-t-2 border-white/40">
                <div className="flex justify-between items-center">
                  <span>Break-even</span>
                  <span className="text-2xl font-bold">{result.breakEvenYears}yr</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-blue-700 inline-flex items-center gap-2"><Cloud className="w-5 h-5" /> Subscription Model</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-success)", marginTop: "2px" }} />
                <span className="text-sm">No upfront cost</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-success)", marginTop: "2px" }} />
                <span className="text-sm">Vendor manages updates</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-success)", marginTop: "2px" }} />
                <span className="text-sm">Cloud backup included</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-danger)", marginTop: "2px" }} />
                <span className="text-sm">Ongoing monthly cost</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-danger)", marginTop: "2px" }} />
                <span className="text-sm">Depends on vendor</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-green-700 inline-flex items-center gap-2"><Home className="w-5 h-5" /> Local Solution</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-success)", marginTop: "2px" }} />
                <span className="text-sm">One-time purchase</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-success)", marginTop: "2px" }} />
                <span className="text-sm">Full control & privacy</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-success)", marginTop: "2px" }} />
                <span className="text-sm">Works offline</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-danger)", marginTop: "2px" }} />
                <span className="text-sm">Higher upfront cost</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-danger)", marginTop: "2px" }} />
                <span className="text-sm">Self-managed updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToolRating toolSlug="subscription-compare" />

      <RelatedResources calculatorSlug="subscription-vs-purchase-calculator" />

      {/* Be-Tech Brand Recommendation */}
      <BeTechCalculatorRecommendation
        description="Be-Tech offers both cloud-connected and local-only options, giving you flexibility in deployment models. No mandatory subscriptions for core functionality."
        badge="Flexible Options"
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
