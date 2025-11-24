'use client'

import { useState } from 'react'

// 2025 STR Industry Benchmarks (AirDNA, AllTheRooms, Mashvisor data)
const STR_BENCHMARKS = {
  avgLockoutCost: 125, // Emergency locksmith + guest compensation
  avgRekeyingCost: 175, // Lock replacement + labor
  avgGuestCompensation: 50, // Per lockout inconvenience
  checkInHandoffTime: 25, // Minutes for in-person key handoff
  propertyManagerRate: 30, // $/hour (industry avg 2025)
}

interface ROIResult {
  hardware: number
  yearOneCost: number
  labor: number
  lockouts: number
  rekeying: number
  guestExp: number
  total: number
  net: number
  roi: number
  payback: number
  yearlyHandoffs: number
  hoursSaved: number
}

export default function STRCalculator() {
  const [properties, setProperties] = useState(1)
  const [bookings, setBookings] = useState(10)
  const [handoffTime, setHandoffTime] = useState(15)
  const [lockouts, setLockouts] = useState(1)
  const [lostKeys, setLostKeys] = useState(1)
  const [lockPrice, setLockPrice] = useState(220)
  const [laborRate, setLaborRate] = useState(30)
  const [guestComp, setGuestComp] = useState(true)

  const calculate = (): ROIResult => {
    // Time savings (key handoff elimination)
    // Only ~35% of bookings require manual intervention (rest use self-check-in)
    const yearlyHandoffs = properties * bookings * 12
    const manualHandoffs = yearlyHandoffs * 0.35 // 35% need human intervention
    const minutesSaved = manualHandoffs * handoffTime
    const hoursSaved = minutesSaved / 60
    const labor = hoursSaved * laborRate

    // Lockout cost savings
    const lockoutCost = STR_BENCHMARKS.avgLockoutCost + (guestComp ? STR_BENCHMARKS.avgGuestCompensation : 0)
    const lockoutSavings = properties * lockouts * lockoutCost

    // Lost key/rekeying savings
    const rekeying = properties * lostKeys * STR_BENCHMARKS.avgRekeyingCost

    // Guest experience premium (reviews improvement)
    const guestExp = guestComp ? properties * bookings * 12 * 2 : 0 // $2/booking smoother check-in

    // Total costs (Year 1)
    const hardware = properties * lockPrice
    const installation = properties * 150 // Average professional installation
    const pmsAnnual = properties * 25 * 12 // Optional PMS integration fee (~$25/month, many are free)
    const yearOneCost = hardware + installation + (pmsAnnual * 0) // PMS often free, set to 0 for conservative estimate

    // Totals
    const total = labor + lockoutSavings + rekeying + guestExp
    const net = total - yearOneCost
    const roi = yearOneCost > 0 ? (net / yearOneCost) * 100 : 0
    const payback = total > 0 ? yearOneCost / (total / 12) : 0

    return {
      hardware: Math.round(hardware),
      yearOneCost: Math.round(yearOneCost),
      labor: Math.round(labor),
      lockouts: Math.round(lockoutSavings),
      rekeying: Math.round(rekeying),
      guestExp: Math.round(guestExp),
      total: Math.round(total),
      net: Math.round(net),
      roi: Math.round(roi),
      payback: Math.round(payback * 10) / 10,
      yearlyHandoffs,
      hoursSaved: Math.round(hoursSaved)
    }
  }

  const result = calculate()

  const getROIColor = (roi: number) => {
    if (roi >= 200) return 'from-green-600 to-green-700'
    if (roi >= 100) return 'from-blue-600 to-blue-700'
    if (roi >= 50) return 'from-yellow-600 to-yellow-700'
    return 'from-orange-600 to-orange-700'
  }

  const getROILabel = (roi: number) => {
    if (roi >= 200) return 'Excellent ROI'
    if (roi >= 100) return 'Strong ROI'
    if (roi >= 50) return 'Good ROI'
    return 'Fair ROI'
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your STR Portfolio</h2>
            
            <div className="space-y-6">
              {/* Properties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Properties: {properties}
                </label>
                <input type="range" min="1" max="50" value={properties} onChange={(e) => setProperties(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 property</span>
                  <span>50 properties</span>
                </div>
              </div>

              {/* Bookings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Bookings per Property: {bookings}
                </label>
                <input type="range" min="1" max="30" value={bookings} onChange={(e) => setBookings(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1/month (33% occ)</span>
                  <span>30/month (100% occ)</span>
                </div>
              </div>

              {/* Handoff Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manual Check-in Time (when needed): {handoffTime} minutes
                </label>
                <input type="range" min="10" max="60" step="5" value={handoffTime} onChange={(e) => setHandoffTime(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                <p className="text-xs text-gray-500 mt-1">Travel + coordination for problem check-ins (~35% of bookings need human intervention). Most use self-check-in.</p>
              </div>

              {/* Lockouts */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lockouts per Property per Year: {lockouts}
                </label>
                <input type="range" min="0" max="12" value={lockouts} onChange={(e) => setLockouts(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                <p className="text-xs text-gray-500 mt-1">Industry avg: 0.5-1 lockouts/year (AirDNA 2025 data)</p>
              </div>

              {/* Lost Keys */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lost Keys per Property per Year: {lostKeys}
                </label>
                <input type="range" min="0" max="6" value={lostKeys} onChange={(e) => setLostKeys(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                <p className="text-xs text-gray-500 mt-1">Requires full lock rekeying ($175 avg)</p>
              </div>

              {/* Lock Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Smart Lock Cost per Unit: ${lockPrice}
                </label>
                <select value={lockPrice} onChange={(e) => setLockPrice(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="120">Basic ($120) - Wyze, August Wi-Fi</option>
                  <option value="220">Standard ($220) - Schlage Encode, Yale Assure</option>
                  <option value="350">Premium ($350) - August Pro, Level Lock+</option>
                </select>
              </div>

              {/* Labor Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Manager/Your Hourly Rate: ${laborRate}/hr
                </label>
                <input type="range" min="15" max="75" step="5" value={laborRate} onChange={(e) => setLaborRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                <p className="text-xs text-gray-500 mt-1">Industry avg: $25-35/hr (2025 data)</p>
              </div>

              {/* Guest Compensation */}
              <div>
                <label className="flex items-center">
                  <input type="checkbox" checked={guestComp} onChange={(e) => setGuestComp(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                  <span className="ml-2 text-sm text-gray-700">Include guest experience premium ($2/booking smooth check-in)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-1">
          <div className={`bg-gradient-to-br ${getROIColor(result.roi)} rounded-lg shadow-xl p-8 text-white sticky top-4`}>
            <h2 className="text-xl font-bold mb-6">Annual ROI Summary</h2>

            <div className="text-center mb-8">
              <div className="text-5xl font-bold mb-2">{result.roi > 0 ? '+' : ''}{result.roi}%</div>
              <div className="text-lg opacity-90">{getROILabel(result.roi)}</div>
              <div className="text-sm opacity-75 mt-2">Payback: {result.payback} months</div>
            </div>

            <div className="space-y-3 text-sm bg-white/10 rounded-lg p-4 mb-6">
              <div className="flex justify-between">
                <span className="opacity-90">Total Investment:</span>
                <span className="font-semibold">${result.yearOneCost.toLocaleString()}</span>
              </div>
              <p className="text-xs opacity-75 -mt-2">Hardware (${result.hardware.toLocaleString()}) + Installation ($150/lock)</p>
              <div className="h-px bg-white/20"></div>
              <div className="flex justify-between">
                <span className="opacity-90">Labor Savings:</span>
                <span className="font-semibold">${result.labor.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Lockout Savings:</span>
                <span className="font-semibold">${result.lockouts.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Rekeying Savings:</span>
                <span className="font-semibold">${result.rekeying.toLocaleString()}</span>
              </div>
              {result.guestExp > 0 && (
                <div className="flex justify-between">
                  <span className="opacity-90">Guest Experience:</span>
                  <span className="font-semibold">${result.guestExp.toLocaleString()}</span>
                </div>
              )}
              <div className="h-px bg-white/20"></div>
              <div className="flex justify-between font-bold text-base">
                <span>Total Annual Savings:</span>
                <span>${result.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span>Net Savings (Yr 1):</span>
                <span className={result.net > 0 ? '' : 'text-yellow-200'}>${result.net.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-4 bg-white/10 rounded-lg text-xs">
              <p className="mb-2"><strong>Time Saved:</strong> {result.hoursSaved} hours/year</p>
              <p className="mb-2"><strong>Check-ins Automated:</strong> {result.yearlyHandoffs}/year</p>
              <p><strong>💡 Tip:</strong> {
                result.payback < 6 ? 'Excellent payback! Strong case for immediate implementation.' :
                result.payback < 12 ? 'Good ROI. Typical for mid-size STR operations.' :
                'Consider starting with highest-turnover properties first.'
              }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
