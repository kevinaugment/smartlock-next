'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function STRROICalculator() {
  const [properties, setProperties] = useState(5)
  const [bookingsPerMonth, setBookingsPerMonth] = useState(8)
  const [keyHandoffTime, setKeyHandoffTime] = useState(30)
  const [lockoutPerYear, setLockoutPerYear] = useState(2)
  const [lostKeyPerYear, setLostKeyPerYear] = useState(1)
  const [lockPrice, setLockPrice] = useState(200)
  const [laborRate, setLaborRate] = useState(25)

  const calculate = () => {
    // 时间节省
    const yearlyHandoffs = properties * bookingsPerMonth * 12
    const minutesSaved = yearlyHandoffs * keyHandoffTime
    const hoursSaved = minutesSaved / 60
    const laborSavings = hoursSaved * laborRate

    // Lockout成本节省
    const lockoutCost = 100 // 平均每次lockout成本
    const lockoutSavings = properties * lockoutPerYear * lockoutCost

    // 丢失钥匙成本节省
    const rekeyingCost = 150 // 重新配钥匙成本
    const keySavings = properties * lostKeyPerYear * rekeyingCost

    // 总成本
    const hardwareCost = properties * lockPrice
    const totalSavings = laborSavings + lockoutSavings + keySavings
    const netSavings = totalSavings - hardwareCost
    const roi = hardwareCost > 0 ? (netSavings / hardwareCost) * 100 : 0
    const paybackMonths = totalSavings > 0 ? (hardwareCost / (totalSavings / 12)) : 0

    return {
      hardwareCost,
      hoursSaved: Math.round(hoursSaved),
      laborSavings: Math.round(laborSavings),
      lockoutSavings,
      keySavings,
      totalSavings: Math.round(totalSavings),
      netSavings: Math.round(netSavings),
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths * 10) / 10,
    }
  }

  const result = calculate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/calculators" className="text-blue-600 hover:text-blue-700 text-sm">
            ← Back to Calculators
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏠</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Short-Term Rental ROI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate labor savings, reduced lockouts, and ROI for your STR smart lock investment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your STR Portfolio</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Properties: {properties}
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={properties}
                  onChange={(e) => setProperties(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bookings per Property per Month: {bookingsPerMonth}
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={bookingsPerMonth}
                  onChange={(e) => setBookingsPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Handoff Time (minutes): {keyHandoffTime}
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={keyHandoffTime}
                  onChange={(e) => setKeyHandoffTime(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Average time spent on in-person key handoffs</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lockouts per Property per Year: {lockoutPerYear}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={lockoutPerYear}
                  onChange={(e) => setLockoutPerYear(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Guests locked out, requiring emergency access</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lost Keys per Property per Year: {lostKeyPerYear}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={lostKeyPerYear}
                  onChange={(e) => setLostKeyPerYear(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Smart Lock Price: ${lockPrice}
                </label>
                <input
                  type="range"
                  min="100"
                  max="400"
                  step="50"
                  value={lockPrice}
                  onChange={(e) => setLockPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Labor Rate: ${laborRate}/hour
                </label>
                <input
                  type="range"
                  min="15"
                  max="50"
                  step="5"
                  value={laborRate}
                  onChange={(e) => setLaborRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className={`rounded-lg shadow-lg p-8 text-white sticky top-4 bg-gradient-to-br ${
              result.netSavings > 0 ? 'from-green-600 to-green-700' : 'from-orange-600 to-orange-700'
            }`}>
              <h2 className="text-xl font-bold mb-6">Annual ROI</h2>

              <div className="text-center mb-8">
                <div className="text-5xl font-bold mb-2">{result.roi}%</div>
                <div className="text-lg opacity-90">Return on Investment</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-sm opacity-90">Hours Saved</span>
                  <span className="font-semibold">{result.hoursSaved}h</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-sm opacity-90">Labor Savings</span>
                  <span className="font-semibold">${result.laborSavings}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-sm opacity-90">Lockout Savings</span>
                  <span className="font-semibold">${result.lockoutSavings}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-sm opacity-90">Key Loss Savings</span>
                  <span className="font-semibold">${result.keySavings}</span>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-white/40 mb-4">
                <div className="flex justify-between items-center">
                  <span>Total Savings/yr</span>
                  <span className="text-2xl font-bold">${result.totalSavings}</span>
                </div>
              </div>

              <div className="text-sm space-y-2 bg-white/10 rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="opacity-90">Initial Cost:</span>
                  <span>${result.hardwareCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Net 1st Year:</span>
                  <span className="font-semibold">${result.netSavings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Payback Time:</span>
                  <span className="font-semibold">{result.paybackMonths} mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Breakdown */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="text-2xl font-bold text-blue-700 mb-1">{result.hoursSaved}h</div>
                <div className="text-sm text-gray-600">Time Saved Annually</div>
                <p className="text-xs text-gray-500 mt-2">No more meeting guests for keys</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-green-700 mb-1">${result.laborSavings}</div>
                <div className="text-sm text-gray-600">Labor Cost Savings</div>
                <p className="text-xs text-gray-500 mt-2">Your time is valuable</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-2">🔐</div>
                <div className="text-2xl font-bold text-purple-700 mb-1">${result.lockoutSavings + result.keySavings}</div>
                <div className="text-sm text-gray-600">Incident Savings</div>
                <p className="text-xs text-gray-500 mt-2">Fewer lockouts & lost keys</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Additional Benefits Not Quantified</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span>✓</span>
                <span><strong>Better guest experience</strong> - Self check-in 24/7</span>
              </div>
              <div className="flex items-start gap-2">
                <span>✓</span>
                <span><strong>Improved security</strong> - Unique codes per guest</span>
              </div>
              <div className="flex items-start gap-2">
                <span>✓</span>
                <span><strong>Remote access control</strong> - Manage from anywhere</span>
              </div>
              <div className="flex items-start gap-2">
                <span>✓</span>
                <span><strong>Access logs</strong> - Know who entered when</span>
              </div>
              <div className="flex items-start gap-2">
                <span>✓</span>
                <span><strong>Scheduling flexibility</strong> - Auto code expiration</span>
              </div>
              <div className="flex items-start gap-2">
                <span>✓</span>
                <span><strong>Higher ratings</strong> - Modern amenity appeal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="max-w-7xl mx-auto mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/articles/use-cases" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
              <h4 className="font-semibold text-gray-900 mb-2">STR Use Cases</h4>
              <p className="text-sm text-gray-600">Best practices guide</p>
            </Link>
            <Link href="/calculators/lock-tco" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
              <h4 className="font-semibold text-gray-900 mb-2">TCO Calculator</h4>
              <p className="text-sm text-gray-600">Total cost analysis</p>
            </Link>
            <Link href="/calculators" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
              <h4 className="font-semibold text-gray-900 mb-2">All Calculators</h4>
              <p className="text-sm text-gray-600">More tools</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
