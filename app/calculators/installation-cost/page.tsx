'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function InstallationCostCalculator() {
  const [lockType, setLockType] = useState('standard')
  const [quantity, setQuantity] = useState('1')
  const [professional, setProfessional] = useState(true)
  const [wiring, setWiring] = useState(false)
  const [smartHub, setSmartHub] = useState(true)
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([])

  const lockPrices = {
    basic: 100,
    standard: 200,
    premium: 350,
    commercial: 600,
  }

  const calculateCost = () => {
    const qty = parseInt(quantity)
    const lockPrice = lockPrices[lockType as keyof typeof lockPrices] * qty
    const laborCost = professional ? qty * 150 : 0
    const wiringCost = wiring ? qty * 100 : 0
    const hubCost = smartHub ? 150 : 0
    
    let additionalCost = 0
    if (additionalFeatures.includes('backup')) additionalCost += qty * 50
    if (additionalFeatures.includes('keypad')) additionalCost += qty * 75
    if (additionalFeatures.includes('camera')) additionalCost += qty * 200

    const subtotal = lockPrice + laborCost + wiringCost + hubCost + additionalCost
    const tax = subtotal * 0.08 // 8% tax
    const total = subtotal + tax

    return {
      lockPrice,
      laborCost,
      wiringCost,
      hubCost,
      additionalCost,
      subtotal,
      tax,
      total,
    }
  }

  const costs = calculateCost()

  const toggleFeature = (feature: string) => {
    if (additionalFeatures.includes(feature)) {
      setAdditionalFeatures(additionalFeatures.filter(f => f !== feature))
    } else {
      setAdditionalFeatures([...additionalFeatures, feature])
    }
  }

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
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Installation Cost Estimator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get an accurate estimate for your smart lock installation project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>

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
                    <option value="basic">Basic Lock ($100)</option>
                    <option value="standard">Standard Lock ($200)</option>
                    <option value="premium">Premium Lock ($350)</option>
                    <option value="commercial">Commercial Lock ($600)</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Locks: {quantity}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 lock</span>
                    <span>10 locks</span>
                  </div>
                </div>

                {/* Professional Installation */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={professional}
                    onChange={(e) => setProfessional(e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                  />
                  <div className="flex-1">
                    <label className="font-medium text-gray-900 block mb-1">
                      Professional Installation
                    </label>
                    <p className="text-sm text-gray-600">
                      Recommended for best results. Includes installation, setup, and testing.
                      <span className="font-semibold text-gray-900"> $150 per lock</span>
                    </p>
                  </div>
                </div>

                {/* Additional Services */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Additional Services
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={wiring}
                        onChange={(e) => setWiring(e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                      />
                      <div className="flex-1">
                        <label className="font-medium text-gray-900 block">
                          Electrical Wiring (+$100/lock)
                        </label>
                        <p className="text-sm text-gray-600">For hardwired locks</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={smartHub}
                        onChange={(e) => setSmartHub(e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                      />
                      <div className="flex-1">
                        <label className="font-medium text-gray-900 block">
                          Smart Home Hub (+$150)
                        </label>
                        <p className="text-sm text-gray-600">For Z-Wave or Zigbee locks</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Additional Features
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={additionalFeatures.includes('backup')}
                        onChange={() => toggleFeature('backup')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Backup Battery (+$50/lock)</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={additionalFeatures.includes('keypad')}
                        onChange={() => toggleFeature('keypad')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Keypad Entry (+$75/lock)</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={additionalFeatures.includes('camera')}
                        onChange={() => toggleFeature('camera')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Doorbell Camera (+$200/lock)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white sticky top-4">
              <h2 className="text-xl font-bold mb-6">Cost Breakdown</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-sm opacity-90">Lock Hardware</span>
                  <span className="font-semibold">${costs.lockPrice}</span>
                </div>
                {costs.laborCost > 0 && (
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-sm opacity-90">Labor</span>
                    <span className="font-semibold">${costs.laborCost}</span>
                  </div>
                )}
                {costs.wiringCost > 0 && (
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-sm opacity-90">Wiring</span>
                    <span className="font-semibold">${costs.wiringCost}</span>
                  </div>
                )}
                {costs.hubCost > 0 && (
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-sm opacity-90">Smart Hub</span>
                    <span className="font-semibold">${costs.hubCost}</span>
                  </div>
                )}
                {costs.additionalCost > 0 && (
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-sm opacity-90">Add-ons</span>
                    <span className="font-semibold">${costs.additionalCost}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-sm opacity-90">Tax (8%)</span>
                  <span className="font-semibold">${costs.tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-white/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">Total Cost</span>
                  <span className="text-3xl font-bold">${costs.total.toFixed(2)}</span>
                </div>
                <p className="text-xs opacity-75">All prices in USD</p>
              </div>

              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="text-xs opacity-90">
                  💡 <strong>Tip:</strong> Professional installation includes 1-year warranty on labor
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost Factors Explained</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Included</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Lock Hardware:</strong> Device, keys, mounting hardware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Installation:</strong> Professional mounting and setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Configuration:</strong> Network setup and testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Training:</strong> Basic operation instructions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Money-Saving Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">💡</span>
                    <span>Buy multiple locks for volume discounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">💡</span>
                    <span>DIY installation saves $150 per lock</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">💡</span>
                    <span>Battery-powered locks avoid wiring costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">💡</span>
                    <span>Shop during seasonal sales</span>
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
              href="/articles/installation"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-gray-900 mb-2">Installation Guides</h4>
              <p className="text-sm text-gray-600">Step-by-step instructions</p>
            </Link>
            <Link
              href="/calculators"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-gray-900 mb-2">Other Calculators</h4>
              <p className="text-sm text-gray-600">More planning tools</p>
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
