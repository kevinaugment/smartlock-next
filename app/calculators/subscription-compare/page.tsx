'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

export default function SubscriptionCompare() {
  const [doors, setDoors] = useState(10)
  const [monthlyFeePerDoor, setMonthlyFeePerDoor] = useState(5)
  const [localSystemCost, setLocalSystemCost] = useState(5000)
  const [years, setYears] = useState(5)

  const calculate = () => {
    const subscriptionMonthly = doors * monthlyFeePerDoor
    const subscriptionYearly = subscriptionMonthly * 12
    const subscriptionTotal = subscriptionYearly * years
    const localTotal = localSystemCost
    const difference = subscriptionTotal - localTotal
    const breakEvenMonths = localSystemCost / subscriptionMonthly
    const breakEvenYears = breakEvenMonths / 12
    const recommendation = difference > 0 ? 'Local system is cheaper' : 'Subscription is cheaper'
    
    return {
      subscriptionMonthly,
      subscriptionYearly: Math.round(subscriptionYearly),
      subscriptionTotal: Math.round(subscriptionTotal),
      localTotal,
      difference: Math.round(Math.abs(difference)),
      breakEvenYears: Math.round(breakEvenYears * 10) / 10,
      recommendation,
      winner: difference > 0 ? 'local' : 'subscription'
    }
  }

  const result = calculate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/calculators" className="text-blue-600 text-sm mb-8 inline-block">← Back</Link>
        
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">⚖️</div>
          <h1 className="text-4xl font-bold mb-4">Subscription vs Purchase Comparison</h1>
          <p className="text-xl text-gray-600">Compare long-term costs of cloud subscription vs local solution</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Comparison Parameters</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Number of Doors: {doors}</label>
                <input type="range" min="1" max="100" value={doors} onChange={(e) => setDoors(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Monthly Fee per Door: ${monthlyFeePerDoor}</label>
                <input type="range" min="1" max="15" step="0.5" value={monthlyFeePerDoor} onChange={(e) => setMonthlyFeePerDoor(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Local System Cost: ${localSystemCost}</label>
                <input type="range" min="1000" max="20000" step="500" value={localSystemCost} onChange={(e) => setLocalSystemCost(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Timeframe: {years} years</label>
                <input type="range" min="1" max="10" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full"/>
              </div>
            </div>
          </div>

          <div>
            <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${
              result.winner === 'local' ? 'bg-gradient-to-br from-green-600 to-green-700' : 'bg-gradient-to-br from-blue-600 to-blue-700'
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
            <h3 className="text-lg font-bold mb-4 text-blue-700">☁️ Subscription Model</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-sm">No upfront cost</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-sm">Vendor manages updates</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-sm">Cloud backup included</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-sm">Ongoing monthly cost</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-sm">Depends on vendor</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-green-700">🏠 Local Solution</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-sm">One-time purchase</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-sm">Full control & privacy</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-sm">Works offline</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-sm">Higher upfront cost</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-sm">Self-managed updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Be-Tech Brand Recommendation */}
      <BeTechCalculatorRecommendation 
        description="Be-Tech offers both cloud-connected and local-only options, giving you flexibility in deployment models. No mandatory subscriptions for core functionality."
        badge="Flexible Options"
      />

      {/* Back Link */}
      <div className="max-w-6xl mx-auto mt-8 mb-12">
        <Link href="/calculators" className="text-blue-600 hover:text-blue-700 font-medium">
          ← Back to All Calculators
        </Link>
      </div>
    </div>
  )
}
