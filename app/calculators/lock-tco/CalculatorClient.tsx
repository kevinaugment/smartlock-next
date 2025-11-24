'use client'

import { useState } from 'react'

interface TCOInputs {
  lockPrice: number
  doorCount: number
  protocol: 'wifi' | 'zigbee' | 'zwave' | 'thread'
  years: number
  installType: 'diy' | 'pro'
  installCostPerDoor: number
  dailyUsage: number
  subscriptionPerDoorPerMonth: number
  batteryPricePerSet: number
  hubCostOverride: number | null
}

interface TCOResult {
  hardware: number
  batteries: number
  hub: number
  install: number
  subscriptions: number
  total: number
  annualCost: number
  perDoorCost: number
  perDoorPerDay: number
  hardwareShare: number
  batteriesShare: number
  subscriptionsShare: number
  mechanicalTotal: number
  deltaVsMechanical: number
}

interface ProtocolData {
  protocol: string
  hub_cost: number
  battery_life_months: number
}

interface CalculatorClientProps {
  protocols: ProtocolData[]
}

function getDefaultHubCost(protocol: string, protocolsData: ProtocolData[]): number {
  const data = protocolsData.find(p => p.protocol === protocol)
  return data?.hub_cost || 0
}

function getBatteryLife(protocol: string, protocolsData: ProtocolData[]): number {
  const data = protocolsData.find(p => p.protocol === protocol)
  return data?.battery_life_months || 12
}

function adjustForUsage(dailyUsage: number): number {
  if (!dailyUsage || dailyUsage <= 0) return 1
  const factor = 10 / dailyUsage // Changed baseline to 10 operations/day
  return Math.max(0.3, Math.min(2, factor))
}

export default function CalculatorClient({ protocols }: CalculatorClientProps) {
  const [inputs, setInputs] = useState<TCOInputs>({
    lockPrice: 200,
    doorCount: 3,
    protocol: 'zigbee',
    years: 5,
    installType: 'diy',
    installCostPerDoor: 100,
    dailyUsage: 10,
    subscriptionPerDoorPerMonth: 0,
    batteryPricePerSet: 8,
    hubCostOverride: null,
  })

  const calculateTCO = (): TCOResult => {
    const { lockPrice, doorCount, protocol, years, installType, installCostPerDoor, dailyUsage, subscriptionPerDoorPerMonth, batteryPricePerSet, hubCostOverride } = inputs

    const hub = hubCostOverride ?? getDefaultHubCost(protocol, protocols)
    const baseBatteryLifeMonths = getBatteryLife(protocol, protocols)
    const usageFactor = adjustForUsage(dailyUsage)
    const batteryLifeMonths = baseBatteryLifeMonths * usageFactor
    const monthsTotal = years * 12
    const replacementsPerLock = batteryLifeMonths > 0 ? monthsTotal / batteryLifeMonths : 0
    const batteries = replacementsPerLock * batteryPricePerSet * doorCount

    const hardware = lockPrice * doorCount
    const install = installType === 'pro' ? installCostPerDoor * doorCount : 0
    const subscriptions = subscriptionPerDoorPerMonth * 12 * years * doorCount

    const total = hardware + hub + install + batteries + subscriptions
    const hardwareShare = total > 0 ? (hardware / total) * 100 : 0
    const batteriesShare = total > 0 ? (batteries / total) * 100 : 0
    const subscriptionsShare = total > 0 ? (subscriptions / total) * 100 : 0

    const annualCost = total / years
    const perDoorCost = total / doorCount
    const perDoorPerDay = total / (doorCount * years * 365)

    const mechanicalLockPrice = 50
    const mechanicalTotal = mechanicalLockPrice * doorCount
    const deltaVsMechanical = total - mechanicalTotal

    return { hardware, batteries, hub, install, subscriptions, total, annualCost, perDoorCost, perDoorPerDay, hardwareShare, batteriesShare, subscriptionsShare, mechanicalTotal, deltaVsMechanical }
  }

  const result = calculateTCO()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Input Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Parameters</h2>
          
          <div className="space-y-6">
            {/* Lock Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lock Price per Unit: ${inputs.lockPrice}
              </label>
              <input
                type="range"
                min="50"
                max="600"
                step="50"
                value={inputs.lockPrice}
                onChange={(e) => setInputs({...inputs, lockPrice: Number(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$50</span>
                <span>$600</span>
              </div>
            </div>

            {/* Door Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Doors: {inputs.doorCount}
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={inputs.doorCount}
                onChange={(e) => setInputs({...inputs, doorCount: Number(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 door</span>
                <span>50 doors</span>
              </div>
            </div>

            {/* Protocol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Protocol
              </label>
              <select
                value={inputs.protocol}
                onChange={(e) => setInputs({...inputs, protocol: e.target.value as any})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="wifi">Wi-Fi (No hub, high battery cost)</option>
                <option value="zigbee">Zigbee (Low cost hub, efficient)</option>
                <option value="zwave">Z-Wave (Mid cost hub, efficient)</option>
                <option value="thread">Thread (Higher hub, very efficient)</option>
              </select>
            </div>

            {/* Timeframe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeframe: {inputs.years} years
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={inputs.years}
                onChange={(e) => setInputs({...inputs, years: Number(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 year</span>
                <span>10 years</span>
              </div>
            </div>

            {/* Installation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Installation Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer ${inputs.installType === 'diy' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    value="diy"
                    checked={inputs.installType === 'diy'}
                    onChange={(e) => setInputs({...inputs, installType: 'diy'})}
                    className="sr-only"
                  />
                  <span className="font-medium">DIY ($0)</span>
                </label>
                <label className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer ${inputs.installType === 'pro' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    value="pro"
                    checked={inputs.installType === 'pro'}
                    onChange={(e) => setInputs({...inputs, installType: 'pro'})}
                    className="sr-only"
                  />
                  <span className="font-medium">Professional</span>
                </label>
              </div>
            </div>

            {inputs.installType === 'pro' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Installation Cost per Door: ${inputs.installCostPerDoor}
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="10"
                  value={inputs.installCostPerDoor}
                  onChange={(e) => setInputs({...inputs, installCostPerDoor: Number(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            {/* Daily Usage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Operations: {inputs.dailyUsage} times
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={inputs.dailyUsage}
                onChange={(e) => setInputs({...inputs, dailyUsage: Number(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">Affects battery replacement frequency</p>
            </div>

            {/* Subscription */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Subscription per Door: ${inputs.subscriptionPerDoorPerMonth}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={inputs.subscriptionPerDoorPerMonth}
                onChange={(e) => setInputs({...inputs, subscriptionPerDoorPerMonth: Number(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white sticky top-4">
          <h2 className="text-xl font-bold mb-6">Total Cost of Ownership</h2>

          <div className="text-center mb-8">
            <div className="text-5xl font-bold mb-2">${result.total.toFixed(0)}</div>
            <div className="text-lg opacity-90">over {inputs.years} years</div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center pb-3 border-b border-white/20">
              <span className="text-sm opacity-90">Hardware</span>
              <span className="font-semibold">${result.hardware.toFixed(0)}</span>
            </div>
            {result.hub > 0 && (
              <div className="flex justify-between items-center pb-3 border-b border-white/20">
                <span className="text-sm opacity-90">Hub/Gateway</span>
                <span className="font-semibold">${result.hub.toFixed(0)}</span>
              </div>
            )}
            {result.install > 0 && (
              <div className="flex justify-between items-center pb-3 border-b border-white/20">
                <span className="text-sm opacity-90">Installation</span>
                <span className="font-semibold">${result.install.toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between items-center pb-3 border-b border-white/20">
              <span className="text-sm opacity-90">Batteries ({inputs.years}yr)</span>
              <span className="font-semibold">${result.batteries.toFixed(0)}</span>
            </div>
            {result.subscriptions > 0 && (
              <div className="flex justify-between items-center pb-3 border-b border-white/20">
                <span className="text-sm opacity-90">Subscriptions</span>
                <span className="font-semibold">${result.subscriptions.toFixed(0)}</span>
              </div>
            )}
          </div>

          <div className="space-y-2 text-sm bg-white/10 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="opacity-90">Per year:</span>
              <span className="font-semibold">${result.annualCost.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Per door:</span>
              <span className="font-semibold">${result.perDoorCost.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Per door/day:</span>
              <span className="font-semibold">${result.perDoorPerDay.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <p className="text-xs opacity-90">
              💡 vs. Mechanical locks: +${result.deltaVsMechanical.toFixed(0)} over {inputs.years} years
            </p>
          </div>
        </div>
      </div>

      {/* Cost Breakdown Chart */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost Breakdown</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Hardware</span>
                <span className="text-sm text-gray-600">{result.hardwareShare.toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: `${result.hardwareShare}%` }} />
              </div>
            </div>
            {result.batteriesShare > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Batteries</span>
                  <span className="text-sm text-gray-600">{result.batteriesShare.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-600" style={{ width: `${result.batteriesShare}%` }} />
                </div>
              </div>
            )}
            {result.subscriptionsShare > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Subscriptions</span>
                  <span className="text-sm text-gray-600">{result.subscriptionsShare.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600" style={{ width: `${result.subscriptionsShare}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
