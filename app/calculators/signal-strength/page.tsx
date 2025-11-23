'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SignalStrengthCalculator() {
  const [protocol, setProtocol] = useState('zwave')
  const [distance, setDistance] = useState('10')
  const [wallCount, setWallCount] = useState('2')
  const [wallType, setWallType] = useState('drywall')
  const [interference, setInterference] = useState('low')

  const calculateSignal = () => {
    let signalStrength = 100 // 基础信号强度

    // 协议基础衰减
    const protocolFactor = {
      zwave: 0.8, // Z-Wave 更好的穿透
      zigbee: 1.0,
      wifi: 1.2,
      bluetooth: 1.5,
    }[protocol] || 1.0

    // 距离衰减（每米）
    const dist = parseInt(distance)
    signalStrength -= dist * 2 * protocolFactor

    // 墙体衰减
    const walls = parseInt(wallCount)
    const wallAttenuation = {
      drywall: 10,
      wood: 15,
      brick: 25,
      concrete: 35,
    }[wallType] || 10
    signalStrength -= walls * wallAttenuation

    // 干扰影响
    const interferenceImpact = {
      low: 5,
      medium: 15,
      high: 30,
    }[interference] || 5
    signalStrength -= interferenceImpact

    return Math.max(0, Math.min(100, Math.round(signalStrength)))
  }

  const signal = calculateSignal()
  
  const getSignalQuality = (signal: number) => {
    if (signal >= 80) return { label: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-600' }
    if (signal >= 60) return { label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-600' }
    if (signal >= 40) return { label: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-600' }
    if (signal >= 20) return { label: 'Poor', color: 'text-orange-600', bgColor: 'bg-orange-600' }
    return { label: 'Very Poor', color: 'text-red-600', bgColor: 'bg-red-600' }
  }

  const quality = getSignalQuality(signal)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/calculators" className="text-blue-600 hover:text-blue-700 text-sm">
            ← Back to Calculators
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📶</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Signal Strength Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analyze your smart lock's wireless signal strength and get optimization recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuration</h2>

              <div className="space-y-6">
                {/* Protocol */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wireless Protocol
                  </label>
                  <select
                    value={protocol}
                    onChange={(e) => setProtocol(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="zwave">Z-Wave (908 MHz)</option>
                    <option value="zigbee">Zigbee (2.4 GHz)</option>
                    <option value="wifi">WiFi (2.4 GHz)</option>
                    <option value="bluetooth">Bluetooth (2.4 GHz)</option>
                  </select>
                </div>

                {/* Distance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance to Hub: {distance} meters
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1m</span>
                    <span>30m</span>
                  </div>
                </div>

                {/* Wall Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Walls: {wallCount}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={wallCount}
                    onChange={(e) => setWallCount(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>None</span>
                    <span>5 walls</span>
                  </div>
                </div>

                {/* Wall Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wall Material
                  </label>
                  <select
                    value={wallType}
                    onChange={(e) => setWallType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="drywall">Drywall (Low attenuation)</option>
                    <option value="wood">Wood (Moderate)</option>
                    <option value="brick">Brick (High)</option>
                    <option value="concrete">Concrete (Very High)</option>
                  </select>
                </div>

                {/* Interference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interference Level
                  </label>
                  <select
                    value={interference}
                    onChange={(e) => setInterference(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low (Few devices)</option>
                    <option value="medium">Medium (Normal home)</option>
                    <option value="high">High (Many devices)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-1">
            <div className={`rounded-lg shadow-lg p-8 text-white sticky top-4 bg-gradient-to-br ${
              signal >= 60 ? 'from-green-600 to-green-700' : 
              signal >= 40 ? 'from-yellow-600 to-yellow-700' : 
              'from-red-600 to-red-700'
            }`}>
              <h2 className="text-xl font-bold mb-6">Signal Strength</h2>

              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-2">{signal}%</div>
                <div className="text-xl opacity-90">{quality.label}</div>
              </div>

              {/* Signal Bar */}
              <div className="mb-6">
                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${signal}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-t border-white/20">
                  <span className="opacity-90">Protocol</span>
                  <span className="font-semibold uppercase">{protocol}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-white/20">
                  <span className="opacity-90">Distance</span>
                  <span className="font-semibold">{distance}m</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-white/20">
                  <span className="opacity-90">Walls</span>
                  <span className="font-semibold">{wallCount} ({wallType})</span>
                </div>
              </div>

              {signal < 60 && (
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="text-xs opacity-90">
                    ⚠️ <strong>Warning:</strong> Signal may be unreliable. Consider adding a repeater.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Signal Strength</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Signal Quality Levels</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">●</span>
                    <span><strong>Excellent (80-100%):</strong> Perfect connectivity, no issues expected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">●</span>
                    <span><strong>Good (60-79%):</strong> Reliable operation, occasional delays possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">●</span>
                    <span><strong>Fair (40-59%):</strong> May experience connection issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">●</span>
                    <span><strong>Poor (&lt;40%):</strong> Unreliable, needs improvement</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Improvement Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Add mesh network repeaters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Relocate hub for better line-of-sight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Switch to Z-Wave for better penetration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Reduce 2.4GHz interference sources</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="max-w-6xl mx-auto mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/articles/protocols/zigbee-vs-zwave-comparison"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-gray-900 mb-2">Protocol Comparison</h4>
              <p className="text-sm text-gray-600">Z-Wave vs Zigbee guide</p>
            </Link>
            <Link
              href="/calculators"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-gray-900 mb-2">All Calculators</h4>
              <p className="text-sm text-gray-600">Explore other tools</p>
            </Link>
            <Link
              href="/articles"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-gray-900 mb-2">Knowledge Base</h4>
              <p className="text-sm text-gray-600">Browse all articles</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
