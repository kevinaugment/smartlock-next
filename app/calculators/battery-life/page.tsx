'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BatteryLifeCalculator() {
  const [lockType, setLockType] = useState('standard')
  const [usageFrequency, setUsageFrequency] = useState('10')
  const [hasKeypad, setHasKeypad] = useState(true)
  const [hasWifi, setHasWifi] = useState(false)
  const [hasAutoLock, setHasAutoLock] = useState(true)
  const [batteryType, setBatteryType] = useState('alkaline')

  const calculateBatteryLife = () => {
    let baseLife = 365 // 基础天数

    // 锁类型影响
    if (lockType === 'premium') baseLife *= 1.2
    if (lockType === 'basic') baseLife *= 0.8

    // 使用频率影响
    const frequency = parseInt(usageFrequency)
    baseLife *= (1 - frequency / 100)

    // 功能影响
    if (hasKeypad) baseLife *= 0.9
    if (hasWifi) baseLife *= 0.7
    if (hasAutoLock) baseLife *= 0.95

    // 电池类型影响
    if (batteryType === 'lithium') baseLife *= 1.3
    if (batteryType === 'rechargeable') baseLife *= 0.7

    return Math.round(baseLife)
  }

  const batteryLife = calculateBatteryLife()
  const months = Math.floor(batteryLife / 30)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🔋</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Battery Life Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estimate how long your smart lock batteries will last based on usage patterns and features
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuration</h2>

              <div className="space-y-6">
                {/* Lock Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lock Type
                  </label>
                  <select
                    value={lockType}
                    onChange={(e) => setLockType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="basic">Basic Lock</option>
                    <option value="standard">Standard Lock</option>
                    <option value="premium">Premium Lock</option>
                  </select>
                </div>

                {/* Usage Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Usage: {usageFrequency} times
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={usageFrequency}
                    onChange={(e) => setUsageFrequency(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 time/day</span>
                    <span>50 times/day</span>
                  </div>
                </div>

                {/* Battery Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Battery Type
                  </label>
                  <select
                    value={batteryType}
                    onChange={(e) => setBatteryType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="alkaline">Alkaline (AA)</option>
                    <option value="lithium">Lithium (AA)</option>
                    <option value="rechargeable">Rechargeable (NiMH)</option>
                  </select>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Features
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={hasKeypad}
                        onChange={(e) => setHasKeypad(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Keypad Entry</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={hasWifi}
                        onChange={(e) => setHasWifi(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">WiFi Connected</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={hasAutoLock}
                        onChange={(e) => setHasAutoLock(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Auto-Lock Enabled</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white sticky top-4">
              <h2 className="text-xl font-bold mb-6">Estimated Battery Life</h2>

              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-2">{months}</div>
                <div className="text-xl opacity-90">months</div>
                <div className="text-sm opacity-75 mt-2">({batteryLife} days)</div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-t border-blue-500">
                  <span className="opacity-90">Lock Type</span>
                  <span className="font-semibold capitalize">{lockType}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-blue-500">
                  <span className="opacity-90">Daily Usage</span>
                  <span className="font-semibold">{usageFrequency}x</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-blue-500">
                  <span className="opacity-90">Battery Type</span>
                  <span className="font-semibold capitalize">{batteryType}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/10 rounded-lg">
                <p className="text-xs opacity-90">
                  💡 <strong>Tip:</strong> Use lithium batteries in cold climates for better performance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Battery Life</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Factors That Affect Battery Life</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Usage Frequency:</strong> More lock/unlock cycles = faster drain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>WiFi/Bluetooth:</strong> Constant connectivity uses significant power</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Temperature:</strong> Cold weather reduces battery capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Motor Quality:</strong> Efficient motors consume less power</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Optimization Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Use lithium batteries for 30% longer life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Disable unnecessary features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Keep lock firmware updated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Check batteries monthly</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="max-w-6xl mx-auto mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/articles/installation/smart-lock-battery-life-guide"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-gray-900 mb-2">Battery Life Guide</h4>
              <p className="text-sm text-gray-600">Complete optimization guide</p>
            </Link>
            <Link
              href="/articles"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-gray-900 mb-2">All Articles</h4>
              <p className="text-sm text-gray-600">Browse knowledge base</p>
            </Link>
            <Link
              href="/"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-gray-900 mb-2">More Calculators</h4>
              <p className="text-sm text-gray-600">Explore other tools</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
