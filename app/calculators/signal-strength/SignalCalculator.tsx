'use client'

import { useState } from 'react'

interface ProtocolData {
  protocol: string
  frequency: number // MHz
  txPower: number // dBm
  rxSensitivity: number // dBm
  wavelength: number // meters
}

// Z-Wave frequencies by region (Silicon Labs Z-Wave 700/800, 2025)
const zwaveFrequencies: Record<string, { freq: number; wavelength: number }> = {
  us: { freq: 908, wavelength: 0.33 },
  eu: { freq: 868, wavelength: 0.345 },
  au: { freq: 921, wavelength: 0.326 },
  jp: { freq: 922, wavelength: 0.325 }
}

const protocolData: ProtocolData[] = [
  {
    protocol: 'zwave',
    frequency: 908, // Default US
    txPower: 1,
    rxSensitivity: -104,
    wavelength: 0.33
  },
  {
    protocol: 'zigbee',
    frequency: 2400,
    txPower: 8,
    rxSensitivity: -100,
    wavelength: 0.125
  },
  {
    protocol: 'wifi',
    frequency: 2400,
    txPower: 20,
    rxSensitivity: -90,
    wavelength: 0.125
  },
  {
    protocol: 'bluetooth',
    frequency: 2400,
    txPower: 4,
    rxSensitivity: -94,
    wavelength: 0.125
  },
  {
    protocol: 'thread',
    frequency: 2400,
    txPower: 8,
    rxSensitivity: -100,
    wavelength: 0.125
  }
]

// Material attenuation in dB per wall
const materialAttenuation: Record<string, number> = {
  drywall: 3,
  wood: 5,
  brick: 8,
  concrete: 12,
  metal: 20,
  glass: 2
}

export default function SignalCalculator() {
  const [protocol, setProtocol] = useState('zwave')
  const [zwaveRegion, setZwaveRegion] = useState('us')
  const [distance, setDistance] = useState(10)
  const [wallCount, setWallCount] = useState(2)
  const [wallType, setWallType] = useState('drywall')
  const [interference, setInterference] = useState('low')
  const [environment, setEnvironment] = useState('indoor')

  const calculateSignal = () => {
    let protocolInfo = protocolData.find(p => p.protocol === protocol) || protocolData[0]
    
    // Apply Z-Wave regional frequency
    if (protocol === 'zwave') {
      const regionalFreq = zwaveFrequencies[zwaveRegion]
      protocolInfo = { ...protocolInfo, frequency: regionalFreq.freq, wavelength: regionalFreq.wavelength }
    }
    
    // Free Space Path Loss (FSPL) per ITU-R P.525-4: FSPL(dB) = 20*log10(d) + 20*log10(f) - 27.55
    const distanceMeters = distance
    const frequencyMHz = protocolInfo.frequency
    const fspl = 20 * Math.log10(distanceMeters) + 20 * Math.log10(frequencyMHz) - 27.55
    
    // Wall attenuation
    const wallLoss = wallCount * materialAttenuation[wallType]
    
    // Interference margin (dB)
    const interferenceMargin = {
      low: 0,
      medium: 5,
      high: 10
    }[interference] || 0
    
    // Environment factor
    const envFactor = environment === 'outdoor' ? 0 : 3 // Indoor adds multipath
    
    // Total path loss
    const totalPathLoss = fspl + wallLoss + interferenceMargin + envFactor
    
    // Received Signal Strength (dBm)
    const rssi = protocolInfo.txPower - totalPathLoss
    
    // Link margin (dBm) - how much above sensitivity
    const linkMargin = rssi - protocolInfo.rxSensitivity
    
    // Convert to percentage (0-100)
    // Excellent: >20dB margin, Poor: <5dB margin
    let signalPercent = 0
    if (linkMargin >= 20) signalPercent = 100
    else if (linkMargin >= 15) signalPercent = 90
    else if (linkMargin >= 10) signalPercent = 75
    else if (linkMargin >= 5) signalPercent = 55
    else if (linkMargin >= 0) signalPercent = 30
    else signalPercent = Math.max(0, 30 + linkMargin * 3) // Negative margin
    
    return {
      signalPercent: Math.round(signalPercent),
      rssi: Math.round(rssi),
      linkMargin: Math.round(linkMargin * 10) / 10,
      pathLoss: Math.round(totalPathLoss * 10) / 10,
      fspl: Math.round(fspl * 10) / 10,
      wallLoss,
      maxRange: Math.round(Math.pow(10, (protocolInfo.txPower - protocolInfo.rxSensitivity - 27.55 - wallLoss) / 20) / (frequencyMHz / 1000))
    }
  }

  const result = calculateSignal()
  
  const getSignalQuality = (signal: number) => {
    if (signal >= 80) return { label: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-600', icon: '📶' }
    if (signal >= 60) return { label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-600', icon: '📶' }
    if (signal >= 40) return { label: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-600', icon: '📡' }
    if (signal >= 20) return { label: 'Poor', color: 'text-orange-600', bgColor: 'bg-orange-600', icon: '⚠️' }
    return { label: 'No Signal', color: 'text-red-600', bgColor: 'bg-red-600', icon: '❌' }
  }

  const quality = getSignalQuality(result.signalPercent)

  const getRecommendation = () => {
    if (result.linkMargin >= 15) return 'Excellent signal. No action needed.'
    if (result.linkMargin >= 10) return 'Good signal. Should work reliably.'
    if (result.linkMargin >= 5) return 'Fair signal. Consider adding a repeater for reliability.'
    if (result.linkMargin >= 0) return 'Weak signal. Add a mesh repeater immediately.'
    return 'No connection possible. Reduce distance or add multiple repeaters.'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Input Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Signal Analysis Parameters</h2>
          
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
                <option value="zwave">Z-Wave (908 MHz, Sub-GHz)</option>
                <option value="zigbee">Zigbee (2.4 GHz, +8dBm)</option>
                <option value="thread">Thread/Matter (2.4 GHz)</option>
                <option value="wifi">Wi-Fi (2.4 GHz, +20dBm)</option>
                <option value="bluetooth">Bluetooth (2.4 GHz, +4dBm)</option>
              </select>
            </div>

            {/* Z-Wave Region (conditional) */}
            {protocol === 'zwave' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Z-Wave Region (Frequency)
                </label>
                <select
                  value={zwaveRegion}
                  onChange={(e) => setZwaveRegion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="us">US/Canada (908 MHz)</option>
                  <option value="eu">Europe (868 MHz)</option>
                  <option value="au">Australia/NZ (921 MHz)</option>
                  <option value="jp">Japan (922 MHz)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Regional frequency affects path loss calculation
                </p>
              </div>
            )}

            {/* Distance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance to Hub: {distance} meters
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1m</span>
                <span>50m</span>
              </div>
            </div>

            {/* Wall Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Walls/Obstacles: {wallCount}
              </label>
              <input
                type="range"
                min="0"
                max="8"
                value={wallCount}
                onChange={(e) => setWallCount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 walls</span>
                <span>8 walls</span>
              </div>
            </div>

            {/* Wall Material */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wall/Obstacle Material
              </label>
              <select
                value={wallType}
                onChange={(e) => setWallType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="glass">Glass/Window (2dB loss)</option>
                <option value="drywall">Drywall/Plasterboard (3dB loss)</option>
                <option value="wood">Wood Door/Wall (5dB loss)</option>
                <option value="brick">Brick Wall (8dB loss)</option>
                <option value="concrete">Concrete/Stone (12dB loss)</option>
                <option value="metal">Metal/Aluminum (20dB loss)</option>
              </select>
            </div>

            {/* Environment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Environment
              </label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="indoor">Indoor (Multipath reflections)</option>
                <option value="outdoor">Outdoor (Line of sight)</option>
              </select>
            </div>

            {/* Interference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                2.4 GHz Interference Level
              </label>
              <select
                value={interference}
                onChange={(e) => setInterference(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low (0dB) - Few Wi-Fi networks</option>
                <option value="medium">Medium (5dB) - Typical home</option>
                <option value="high">High (10dB) - Congested environment</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Only affects 2.4 GHz protocols (Zigbee, Wi-Fi, Bluetooth, Thread)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-1">
        <div className={`rounded-lg shadow-lg p-8 text-white sticky top-4 bg-gradient-to-br ${
          result.signalPercent >= 60 ? 'from-green-600 to-green-700' : 
          result.signalPercent >= 40 ? 'from-yellow-600 to-yellow-700' : 
          'from-red-600 to-red-700'
        }`}>
          <h2 className="text-xl font-bold mb-6">Signal Analysis Result</h2>

          <div className="text-center mb-6">
            <div className="text-5xl mb-2">{quality.icon}</div>
            <div className="text-5xl font-bold mb-2">{result.signalPercent}%</div>
            <div className="text-xl opacity-90 mb-1">{quality.label}</div>
            <div className="text-sm opacity-75">{result.rssi} dBm</div>
          </div>

          {/* Signal Bar */}
          <div className="mb-6">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${result.signalPercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 text-sm bg-white/10 rounded-lg p-4 mb-4">
            <div className="flex justify-between">
              <span className="opacity-90">Link Margin:</span>
              <span className="font-semibold">{result.linkMargin} dB</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Path Loss:</span>
              <span className="font-semibold">{result.pathLoss} dB</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">FSPL:</span>
              <span className="font-semibold">{result.fspl} dB</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Wall Loss:</span>
              <span className="font-semibold">{result.wallLoss} dB</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Est. Max Range:</span>
              <span className="font-semibold">{result.maxRange}m</span>
            </div>
          </div>

          <div className="p-4 bg-white/10 rounded-lg">
            <p className="text-xs opacity-90">
              <strong>Recommendation:</strong> {getRecommendation()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
