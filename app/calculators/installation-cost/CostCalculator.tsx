'use client'

import { useState } from 'react'

// 2025 US labor rates (HomeAdvisor, Angi, Thumbtack data)
const LABOR_RATES = {
  diy: 0,
  locksmith: 85, // $75-100/hr average
  handyman: 65, // $50-80/hr average  
  electrician: 95 // $85-110/hr for wiring
}

// Installation time by complexity (hours)
const INSTALL_TIME = {
  simple: 1.5, // Replace existing deadbolt
  standard: 2.5, // New installation, no wiring
  complex: 4.0, // Wiring required, frame modification
  commercial: 6.0 // Commercial-grade, access control integration
}

interface CostBreakdown {
  hardware: number
  labor: number
  wiring: number
  tools: number
  hub: number
  modification: number
  total: number
  timeHours: number
}

export default function CostCalculator() {
  const [lockType, setLockType] = useState('standard')
  const [quantity, setQuantity] = useState(1)
  const [installer, setInstaller] = useState('locksmith')
  const [complexity, setComplexity] = useState('standard')
  const [needsWiring, setNeedsWiring] = useState(false)
  const [needsHub, setNeedsHub] = useState(true)
  const [needsModification, setNeedsModification] = useState(false)
  const [hasTools, setHasTools] = useState(false)

  const calculateCost = (): CostBreakdown => {
    // Hardware costs (2025 market averages)
    const lockPrices: Record<string, number> = {
      basic: 120, // Wyze, August Wi-Fi
      standard: 220, // Schlage Encode, Yale Assure
      premium: 380, // August Pro + Connect, Level Lock+
      commercial: 650 // Schlage NDE, Assa Abloy
    }

    const hardware = lockPrices[lockType] * quantity

    // Labor calculation
    const baseTime = INSTALL_TIME[complexity as keyof typeof INSTALL_TIME]
    const totalTime = baseTime * quantity
    const hourlyRate = LABOR_RATES[installer as keyof typeof LABOR_RATES]
    const labor = totalTime * hourlyRate

    // Wiring cost (electrician if needed)
    const wiring = needsWiring ? (quantity * 2 * LABOR_RATES.electrician) : 0

    // Hub/bridge cost
    const hubPrices: Record<string, number> = {
      basic: 0, // Wi-Fi direct
      standard: 80, // Zigbee/Z-Wave hub
      premium: 150, // Thread border router
      commercial: 300 // Access control panel
    }
    const hub = needsHub ? hubPrices[lockType] : 0

    // Door modification (backset/thickness incompatibility)
    const modification = needsModification ? (quantity * 75) : 0

    // Tools (DIY only)
    const tools = (installer === 'diy' && !hasTools) ? 45 : 0

    const total = hardware + labor + wiring + hub + modification + tools

    return {
      hardware,
      labor,
      wiring,
      tools,
      hub,
      modification,
      total,
      timeHours: totalTime
    }
  }

  const cost = calculateCost()

  const getComplexityInfo = () => {
    const info: Record<string, string> = {
      simple: 'Replacing existing deadbolt, no wiring',
      standard: 'New installation, standard door prep',
      complex: 'Wiring required or frame modification needed',
      commercial: 'Commercial lock with access control integration'
    }
    return info[complexity]
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Input Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Installation Parameters</h2>
          
          <div className="space-y-6">
            {/* Lock Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lock Type & Price Range
              </label>
              <select
                value={lockType}
                onChange={(e) => setLockType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="basic">Basic ($120) - Wyze, August Wi-Fi</option>
                <option value="standard">Standard ($220) - Schlage Encode, Yale Assure</option>
                <option value="premium">Premium ($380) - August Pro, Level Lock+</option>
                <option value="commercial">Commercial ($650) - Schlage NDE, Assa Abloy</option>
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
                max="20"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 lock</span>
                <span>20 locks</span>
              </div>
            </div>

            {/* Installer Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Who Will Install?
              </label>
              <select
                value={installer}
                onChange={(e) => setInstaller(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="diy">DIY ($0/hr)</option>
                <option value="handyman">Handyman ($65/hr)</option>
                <option value="locksmith">Locksmith ($85/hr) - Recommended</option>
                <option value="electrician">Electrician ($95/hr) - For wiring</option>
              </select>
            </div>

            {/* Complexity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Installation Complexity
              </label>
              <select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="simple">Simple (1.5 hrs)</option>
                <option value="standard">Standard (2.5 hrs)</option>
                <option value="complex">Complex (4 hrs)</option>
                <option value="commercial">Commercial (6 hrs)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">{getComplexityInfo()}</p>
            </div>

            {/* Additional Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Additional Requirements
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={needsWiring}
                    onChange={(e) => setNeedsWiring(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Wiring Required (+${LABOR_RATES.electrician*2}/lock)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={needsHub}
                    onChange={(e) => setNeedsHub(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Hub/Bridge Needed (protocol-dependent)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={needsModification}
                    onChange={(e) => setNeedsModification(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Door Modification (+$75/door - backset/thickness)</span>
                </label>
                {installer === 'diy' && (
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hasTools}
                      onChange={(e) => setHasTools(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">I have required tools</span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white sticky top-4">
          <h2 className="text-xl font-bold mb-6">Total Cost Estimate</h2>

          <div className="text-center mb-8">
            <div className="text-5xl font-bold mb-2">${cost.total.toLocaleString()}</div>
            <div className="text-lg opacity-90">{cost.timeHours.toFixed(1)} hours total</div>
            <div className="text-sm opacity-75 mt-1">${(cost.total / quantity).toFixed(0)}/lock</div>
          </div>

          <div className="space-y-3 text-sm bg-white/10 rounded-lg p-4 mb-6">
            <div className="flex justify-between">
              <span className="opacity-90">Hardware ({quantity}×):</span>
              <span className="font-semibold">${cost.hardware.toLocaleString()}</span>
            </div>
            {cost.labor > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Labor ({cost.timeHours}hrs):</span>
                <span className="font-semibold">${cost.labor.toLocaleString()}</span>
              </div>
            )}
            {cost.wiring > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Wiring:</span>
                <span className="font-semibold">${cost.wiring}</span>
              </div>
            )}
            {cost.hub > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Hub/Bridge:</span>
                <span className="font-semibold">${cost.hub}</span>
              </div>
            )}
            {cost.modification > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Door Modification:</span>
                <span className="font-semibold">${cost.modification}</span>
              </div>
            )}
            {cost.tools > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Tools:</span>
                <span className="font-semibold">${cost.tools}</span>
              </div>
            )}
          </div>

          <div className="p-4 bg-white/10 rounded-lg">
            <p className="text-xs opacity-90">
              <strong>💡 Tip:</strong> {
                installer === 'diy' 
                  ? 'DIY saves labor cost but requires 2-3 hours skill time per lock.'
                  : cost.total / quantity > 400
                  ? `At $${(cost.total/quantity).toFixed(0)}/lock, consider bulk discount negotiation.`
                  : 'Professional installation includes warranty and proper alignment.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
