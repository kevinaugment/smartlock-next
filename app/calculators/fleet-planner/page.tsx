'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FleetPlanner() {
  const [properties, setProperties] = useState(10)
  const [avgLocksPerProperty, setAvgLocksPerProperty] = useState(3)
  const [currentProtocols, setCurrentProtocols] = useState<string[]>(['zigbee', 'wifi'])
  const [budget, setBudget] = useState('medium')

  const toggleProtocol = (p: string) => {
    setCurrentProtocols(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  const calculate = () => {
    const totalLocks = properties * avgLocksPerProperty
    const protocolCount = currentProtocols.length
    const fragmentationScore = Math.min(100, protocolCount * 25)
    const unificationCost = totalLocks * 200
    const maintenanceSavings = protocolCount > 1 ? totalLocks * 50 : 0
    const trainingSavings = protocolCount > 1 ? properties * 100 : 0
    const annualSavings = maintenanceSavings + trainingSavings
    const paybackYears = annualSavings > 0 ? unificationCost / annualSavings : 0
    
    return { 
      totalLocks, 
      protocolCount, 
      fragmentationScore,
      unificationCost,
      maintenanceSavings,
      trainingSavings,
      annualSavings,
      paybackYears: Math.round(paybackYears * 10) / 10,
      recommendation: protocolCount > 2 ? 'Highly recommend unification' : protocolCount > 1 ? 'Consider unification' : 'Already unified'
    }
  }

  const result = calculate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/calculators" className="text-blue-600 text-sm mb-8 inline-block">← Back</Link>
        
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏢</div>
          <h1 className="text-4xl font-bold mb-4">Multi-Property Fleet Planner</h1>
          <p className="text-xl text-gray-600">Analyze protocol fragmentation across your property portfolio</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Portfolio Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Number of Properties: {properties}</label>
                <input type="range" min="1" max="100" value={properties} onChange={(e) => setProperties(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Avg Locks per Property: {avgLocksPerProperty}</label>
                <input type="range" min="1" max="20" value={avgLocksPerProperty} onChange={(e) => setAvgLocksPerProperty(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Current Protocols in Use</label>
                <div className="space-y-2">
                  {['zigbee', 'zwave', 'wifi', 'thread'].map(p => (
                    <label key={p} className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" checked={currentProtocols.includes(p)} onChange={() => toggleProtocol(p)} className="w-4 h-4"/>
                      <span className="capitalize">{p}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${
              result.fragmentationScore < 30 ? 'bg-gradient-to-br from-green-600 to-green-700' :
              result.fragmentationScore < 60 ? 'bg-gradient-to-br from-yellow-600 to-yellow-700' :
              'bg-gradient-to-br from-red-600 to-red-700'
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
              <div className="pt-4 border-t-2 border-white/40">
                <div className="flex justify-between">
                  <span>Payback Period</span>
                  <span className="text-2xl font-bold">{result.paybackYears}yr</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Unification Benefits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🔧</div>
              <div className="font-semibold mb-2">Simpler Maintenance</div>
              <div className="text-sm text-gray-600">One protocol = one skill set</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">💰</div>
              <div className="font-semibold mb-2">Bulk Discounts</div>
              <div className="text-sm text-gray-600">Better pricing at scale</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-semibold mb-2">Unified Management</div>
              <div className="text-sm text-gray-600">Single dashboard for all</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
