'use client'

import { useState } from 'react'

interface ProtocolData {
  protocol: string
  baseLifeDays: number
  idlePowerMw: number
  activePowerMw: number
  typicalCapacityMah: number
}

const protocolData: ProtocolData[] = [
  {
    protocol: 'bluetooth',
    baseLifeDays: 365,
    idlePowerMw: 0.05,
    activePowerMw: 15,
    typicalCapacityMah: 2800
  },
  {
    protocol: 'zigbee',
    baseLifeDays: 365,
    idlePowerMw: 0.02,
    activePowerMw: 12,
    typicalCapacityMah: 2800
  },
  {
    protocol: 'zwave',
    baseLifeDays: 365,
    idlePowerMw: 0.03,
    activePowerMw: 13,
    typicalCapacityMah: 2800
  },
  {
    protocol: 'wifi',
    baseLifeDays: 90,
    idlePowerMw: 100,
    activePowerMw: 300,
    typicalCapacityMah: 2800
  },
  {
    protocol: 'thread',
    baseLifeDays: 320,
    idlePowerMw: 0.03,
    activePowerMw: 14,
    typicalCapacityMah: 2800
  }
]

export default function BatteryCalculator() {
  const [protocol, setProtocol] = useState('zigbee')
  const [dailyUsage, setDailyUsage] = useState(10)
  const [batteryType, setBatteryType] = useState('alkaline')
  const [hasKeypad, setHasKeypad] = useState(true)
  const [hasAutoLock, setHasAutoLock] = useState(true)
  const [temperature, setTemperature] = useState('normal')

  const calculateBatteryLife = () => {
    const protocolInfo = protocolData.find(p => p.protocol === protocol) || protocolData[0]
    
    // Battery capacity by type (mAh)
    const batteryCapacity: Record<string, number> = {
      'alkaline': 2800,
      'lithium': 3000,
      'rechargeable': 2000
    }
    
    const capacityMah = batteryCapacity[batteryType]
    
    // Calculate daily power consumption
    const activeMinutesPerDay = dailyUsage * 0.5 // 30 seconds per operation
    const idleMinutesPerDay = 1440 - activeMinutesPerDay
    
    const dailyActiveMwh = (protocolInfo.activePowerMw * activeMinutesPerDay) / 60
    const dailyIdleMwh = (protocolInfo.idlePowerMw * idleMinutesPerDay) / 60
    const dailyTotalMwh = dailyActiveMwh + dailyIdleMwh
    
    // Additional features power draw
    let featureMultiplier = 1.0
    if (hasKeypad) featureMultiplier *= 1.08 // Keypad backlight
    if (hasAutoLock) featureMultiplier *= 1.05 // Motor engagement
    
    const adjustedDailyMwh = dailyTotalMwh * featureMultiplier
    
    // Temperature compensation
    let tempFactor = 1.0
    if (temperature === 'cold') tempFactor = 0.7 // -10°C to 0°C
    if (temperature === 'hot') tempFactor = 0.9 // 35°C to 45°C
    
    // Battery voltage: AA = 1.5V, total energy = capacity * voltage
    const totalEnergyMwh = (capacityMah * 1.5) * tempFactor
    
    // Calculate days
    const estimatedDays = Math.floor(totalEnergyMwh / adjustedDailyMwh)
    
    return {
      days: estimatedDays,
      months: Math.floor(estimatedDays / 30),
      dailyPowerMwh: adjustedDailyMwh.toFixed(2),
      totalEnergyMwh: totalEnergyMwh.toFixed(0)
    }
  }

  const result = calculateBatteryLife()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Input Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Battery Configuration</h2>
          
          <div className="space-y-6">
            {/* Protocol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Communication Protocol
              </label>
              <select
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="zigbee">Zigbee (Most Efficient)</option>
                <option value="zwave">Z-Wave (Very Efficient)</option>
                <option value="thread">Thread/Matter (Efficient)</option>
                <option value="bluetooth">Bluetooth (Good)</option>
                <option value="wifi">Wi-Fi (Least Efficient)</option>
              </select>
            </div>

            {/* Daily Usage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Operations: {dailyUsage} times
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={dailyUsage}
                onChange={(e) => setDailyUsage(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1/day</span>
                <span>50/day</span>
              </div>
            </div>

            {/* Battery Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Battery Type (4× AA)
              </label>
              <select
                value={batteryType}
                onChange={(e) => setBatteryType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="alkaline">Alkaline (2800mAh) - Standard</option>
                <option value="lithium">Lithium (3000mAh) - Premium</option>
                <option value="rechargeable">NiMH Rechargeable (2000mAh)</option>
              </select>
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operating Temperature
              </label>
              <select
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="normal">Normal (15°C - 30°C)</option>
                <option value="cold">Cold (-10°C - 0°C)</option>
                <option value="hot">Hot (35°C - 45°C)</option>
              </select>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Active Features
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hasKeypad}
                    onChange={(e) => setHasKeypad(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Keypad with Backlight (+8% drain)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hasAutoLock}
                    onChange={(e) => setHasAutoLock(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Auto-Lock Enabled (+5% drain)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white sticky top-4">
          <h2 className="text-xl font-bold mb-6">Estimated Battery Life</h2>

          <div className="text-center mb-8">
            <div className="text-6xl font-bold mb-2">{result.months}</div>
            <div className="text-xl opacity-90">months</div>
            <div className="text-sm opacity-75 mt-2">({result.days} days)</div>
          </div>

          <div className="space-y-3 text-sm bg-white/10 rounded-lg p-4 mb-6">
            <div className="flex justify-between">
              <span className="opacity-90">Protocol:</span>
              <span className="font-semibold capitalize">{protocol}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Daily Usage:</span>
              <span className="font-semibold">{dailyUsage}×</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Battery Type:</span>
              <span className="font-semibold capitalize">{batteryType}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Temperature:</span>
              <span className="font-semibold capitalize">{temperature}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs bg-white/10 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="opacity-90">Daily Power:</span>
              <span className="font-semibold">{result.dailyPowerMwh} mWh</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Total Energy:</span>
              <span className="font-semibold">{result.totalEnergyMwh} mWh</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <p className="text-xs opacity-90">
              💡 <strong>Tip:</strong> {
                protocol === 'wifi' 
                  ? 'Wi-Fi locks drain batteries 4× faster. Consider Zigbee for longer life.'
                  : temperature === 'cold'
                  ? 'Cold temperatures reduce capacity by 30%. Use lithium batteries.'
                  : dailyUsage > 30
                  ? 'Heavy usage detected. Consider rechargeable batteries.'
                  : 'Optimal configuration! Expect consistent performance.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
