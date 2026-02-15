'use client'

import { useState } from 'react'

interface ProtocolData {
  protocol: string
  frequency: number // MHz
  txPower: number // dBm
  rxSensitivity: number // dBm
  wavelength: number // meters
}

// Z-Wave frequencies by region (Silicon Labs Z-Wave 700/800, 2026)
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

// Floor material attenuation in dB per floor
const floorAttenuation: Record<string, number> = {
  wood: 8,
  concrete: 15,
  steel: 22,
  mixed: 12,
}

// Antenna type gain adjustment (dBi relative to internal PCB)
const antennaGain: Record<string, number> = {
  'internal-pcb': 0,
  'external-whip': 3,
  'patch': 5,
  'directional': 8,
}

// Building type presets (additional loss modifier)
const buildingTypeModifier: Record<string, number> = {
  residential: 0,
  office: 3,
  warehouse: -2, // More open space
  hotel: 6,      // Fire doors, concrete floors
  hospital: 8,   // RF shielding
  school: 4,
}

export default function SignalCalculator() {
  const [protocol, setProtocol] = useState('zwave')
  const [zwaveRegion, setZwaveRegion] = useState('us')
  const [distance, setDistance] = useState(10)
  const [wallCount, setWallCount] = useState(2)
  const [wallType, setWallType] = useState('drywall')
  const [interference, setInterference] = useState('low')
  const [environment, setEnvironment] = useState('indoor')
  const [floorCount, setFloorCount] = useState(0)
  const [floorMaterial, setFloorMaterial] = useState('concrete')
  const [antennaType, setAntennaType] = useState('internal-pcb')
  const [repeaterCount, setRepeaterCount] = useState(0)
  const [buildingType, setBuildingType] = useState('residential')

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

    // Floor attenuation
    const floorLoss = floorCount * (floorAttenuation[floorMaterial] || 12)

    // Interference margin (dB)
    const interferenceMargin = {
      low: 0,
      medium: 5,
      high: 10
    }[interference] || 0

    // Environment factor
    const envFactor = environment === 'outdoor' ? 0 : 3

    // Building type additional loss
    const buildingLoss = buildingTypeModifier[buildingType] || 0

    // Antenna gain (improves signal)
    const antennaBoost = antennaGain[antennaType] || 0

    // Total path loss
    const totalPathLoss = fspl + wallLoss + floorLoss + interferenceMargin + envFactor + buildingLoss

    // Received Signal Strength (dBm) — antenna gain added to TX side
    const rssi = (protocolInfo.txPower + antennaBoost) - totalPathLoss

    // Repeater improvement: each repeater effectively halves the path, adding ~10dB
    const repeaterBoost = repeaterCount * 10
    const effectiveRssi = rssi + repeaterBoost

    // Link margin (dBm) - how much above sensitivity
    const linkMargin = effectiveRssi - protocolInfo.rxSensitivity

    // Convert to percentage (0-100)
    let signalPercent = 0
    if (linkMargin >= 20) signalPercent = 100
    else if (linkMargin >= 15) signalPercent = 90
    else if (linkMargin >= 10) signalPercent = 75
    else if (linkMargin >= 5) signalPercent = 55
    else if (linkMargin >= 0) signalPercent = 30
    else signalPercent = Math.max(0, 30 + linkMargin * 3)

    return {
      signalPercent: Math.round(signalPercent),
      rssi: Math.round(effectiveRssi),
      linkMargin: Math.round(linkMargin * 10) / 10,
      pathLoss: Math.round(totalPathLoss * 10) / 10,
      fspl: Math.round(fspl * 10) / 10,
      wallLoss,
      floorLoss,
      repeaterBoost,
      maxRange: Math.round(Math.pow(10, (protocolInfo.txPower + antennaBoost - protocolInfo.rxSensitivity - 27.55 - wallLoss - floorLoss) / 20) / (frequencyMHz / 1000))
    }
  }

  const result = calculateSignal()

  const getSignalQuality = (signal: number) => {
    if (signal >= 80) return { label: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-600', icon: '●' }
    if (signal >= 60) return { label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-600', icon: '●' }
    if (signal >= 40) return { label: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-600', icon: '~' }
    if (signal >= 20) return { label: 'Poor', color: 'text-orange-600', bgColor: 'bg-orange-600', icon: '!' }
    return { label: 'No Signal', color: 'text-red-600', bgColor: 'bg-red-600', icon: '✕' }
  }

  const quality = getSignalQuality(result.signalPercent)

  const getRecommendation = () => {
    if (result.linkMargin >= 15) return 'Excellent signal. No action needed.'
    if (result.linkMargin >= 10) return 'Good signal. Should work reliably.'
    if (result.linkMargin >= 5) return repeaterCount === 0 ? 'Fair signal. Consider adding a repeater for reliability.' : 'Fair signal with repeaters. Consider upgrading antenna or reducing distance.'
    if (result.linkMargin >= 0) return repeaterCount === 0 ? 'Weak signal. Add a mesh repeater immediately.' : 'Still weak with repeaters. Reduce distance or use sub-GHz protocol (Z-Wave).'
    return 'No connection possible. Reduce distance, add repeaters, or switch to Z-Wave (sub-GHz).'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Input Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Signal Analysis Parameters</h2>

          <div className="space-y-6">

            {/* Building Type */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Building Type
              </label>
              <select value={buildingType} onChange={(e) => setBuildingType(e.target.value)} className="form-input">
                <option value="residential">Residential Home</option>
                <option value="office">Office Building (+3dB loss)</option>
                <option value="warehouse">Warehouse / Open Plan (-2dB, open space)</option>
                <option value="hotel">Hotel (+6dB, fire doors)</option>
                <option value="hospital">Hospital (+8dB, RF shielding)</option>
                <option value="school">School (+4dB)</option>
              </select>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Building type applies additional attenuation based on typical construction</p>
            </div>

            {/* Protocol */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Wireless Protocol
              </label>
              <select value={protocol} onChange={(e) => setProtocol(e.target.value)} className="form-input">
                <option value="zwave">Z-Wave (908 MHz, Sub-GHz — best penetration)</option>
                <option value="zigbee">Zigbee (2.4 GHz, +8dBm)</option>
                <option value="thread">Thread/Matter (2.4 GHz)</option>
                <option value="wifi">Wi-Fi (2.4 GHz, +20dBm)</option>
                <option value="bluetooth">Bluetooth LE (2.4 GHz, +4dBm)</option>
              </select>
            </div>

            {/* Z-Wave Region (conditional) */}
            {protocol === 'zwave' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                  Z-Wave Region (Frequency)
                </label>
                <select value={zwaveRegion} onChange={(e) => setZwaveRegion(e.target.value)} className="form-input">
                  <option value="us">US/Canada (908 MHz)</option>
                  <option value="eu">Europe (868 MHz)</option>
                  <option value="au">Australia/NZ (921 MHz)</option>
                  <option value="jp">Japan (922 MHz)</option>
                </select>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Regional frequency affects path loss calculation</p>
              </div>
            )}

            {/* Antenna Type */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Antenna Type
              </label>
              <select value={antennaType} onChange={(e) => setAntennaType(e.target.value)} className="form-input">
                <option value="internal-pcb">Internal PCB (0 dBi — standard lock antenna)</option>
                <option value="external-whip">External Whip (+3 dBi — hub/repeater)</option>
                <option value="patch">Patch Antenna (+5 dBi — commercial hub)</option>
                <option value="directional">Directional (+8 dBi — long-range point-to-point)</option>
              </select>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Hub/gateway antenna type affects effective TX power</p>
            </div>

            {/* Distance */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Distance to Hub: {distance} meters
              </label>
              <input
                type="range" min="1" max="100" value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
              />
              <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                <span>1m</span>
                <span>100m</span>
              </div>
            </div>

            {/* Wall Count */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Number of Walls/Obstacles: {wallCount}
              </label>
              <input
                type="range" min="0" max="10" value={wallCount}
                onChange={(e) => setWallCount(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
              />
              <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                <span>0 walls</span>
                <span>10 walls</span>
              </div>
            </div>

            {/* Wall Material */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Wall/Obstacle Material
              </label>
              <select value={wallType} onChange={(e) => setWallType(e.target.value)} className="form-input">
                <option value="glass">Glass/Window (2dB loss)</option>
                <option value="drywall">Drywall/Plasterboard (3dB loss)</option>
                <option value="wood">Wood Door/Wall (5dB loss)</option>
                <option value="brick">Brick Wall (8dB loss)</option>
                <option value="concrete">Concrete/Stone (12dB loss)</option>
                <option value="metal">Metal/Aluminum (20dB loss)</option>
              </select>
            </div>

            {/* Floor Count */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Floors Between Lock and Hub: {floorCount}
              </label>
              <input
                type="range" min="0" max="10" value={floorCount}
                onChange={(e) => setFloorCount(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
              />
              <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                <span>Same floor</span>
                <span>10 floors</span>
              </div>
            </div>

            {/* Floor Material (conditional) */}
            {floorCount > 0 && (
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                  Floor Construction Material
                </label>
                <select value={floorMaterial} onChange={(e) => setFloorMaterial(e.target.value)} className="form-input">
                  <option value="wood">Wood Frame (8dB/floor)</option>
                  <option value="mixed">Mixed/Composite (12dB/floor)</option>
                  <option value="concrete">Concrete Slab (15dB/floor)</option>
                  <option value="steel">Steel Deck (22dB/floor)</option>
                </select>
              </div>
            )}

            {/* Repeater Count */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Mesh Repeaters / Range Extenders: {repeaterCount}
              </label>
              <input
                type="range" min="0" max="5" value={repeaterCount}
                onChange={(e) => setRepeaterCount(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
              />
              <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                <span>0 repeaters</span>
                <span>5 repeaters</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Each repeater adds ~10dB effective gain (Zigbee/Z-Wave mesh nodes)</p>
            </div>

            {/* Environment */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Environment
              </label>
              <select value={environment} onChange={(e) => setEnvironment(e.target.value)} className="form-input">
                <option value="indoor">Indoor (Multipath reflections, +3dB loss)</option>
                <option value="outdoor">Outdoor (Line of sight)</option>
              </select>
            </div>

            {/* Interference */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                2.4 GHz Interference Level
              </label>
              <select value={interference} onChange={(e) => setInterference(e.target.value)} className="form-input">
                <option value="low">Low (0dB) — Few Wi-Fi networks nearby</option>
                <option value="medium">Medium (5dB) — Typical residential / office</option>
                <option value="high">High (10dB) — Dense apartment / convention center</option>
              </select>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {protocol === 'zwave' ? 'Minimal impact on Z-Wave (sub-GHz avoids 2.4 GHz congestion)' : 'Affects 2.4 GHz protocols (Zigbee, Wi-Fi, BLE, Thread)'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-1">
        <div className={`rounded-lg shadow-lg p-8 text-white sticky top-4 bg-gradient-to-br ${result.signalPercent >= 60 ? 'from-green-600 to-green-700' :
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
            {result.floorLoss > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Floor Loss:</span>
                <span className="font-semibold">{result.floorLoss} dB</span>
              </div>
            )}
            {result.repeaterBoost > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Repeater Boost:</span>
                <span className="font-semibold">+{result.repeaterBoost} dB</span>
              </div>
            )}
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
