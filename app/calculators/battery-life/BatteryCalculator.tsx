'use client'

import { useState } from 'react'

interface ProtocolData {
  protocol: string
  label: string
  baseLifeDays: number
  idlePowerMw: number
  activePowerMw: number
  typicalCapacityMah: number
}

const protocolData: ProtocolData[] = [
  { protocol: 'zigbee', label: 'Zigbee', baseLifeDays: 365, idlePowerMw: 0.02, activePowerMw: 12, typicalCapacityMah: 2800 },
  { protocol: 'zwave', label: 'Z-Wave', baseLifeDays: 365, idlePowerMw: 0.03, activePowerMw: 13, typicalCapacityMah: 2800 },
  { protocol: 'thread', label: 'Thread', baseLifeDays: 320, idlePowerMw: 0.03, activePowerMw: 14, typicalCapacityMah: 2800 },
  { protocol: 'ble', label: 'Bluetooth', baseLifeDays: 350, idlePowerMw: 0.05, activePowerMw: 15, typicalCapacityMah: 2800 },
  { protocol: 'wifi', label: 'Wi-Fi', baseLifeDays: 90, idlePowerMw: 100, activePowerMw: 300, typicalCapacityMah: 2800 },
  { protocol: 'nfc', label: 'NFC', baseLifeDays: 500, idlePowerMw: 0.01, activePowerMw: 8, typicalCapacityMah: 2800 },
]

interface BatteryConfig {
  key: string
  label: string
  cellCount: number
  capacityMah: number
  voltage: number
}

const batteryConfigs: BatteryConfig[] = [
  { key: '4xAA', label: '4× AA', cellCount: 4, capacityMah: 2800, voltage: 1.5 },
  { key: '8xAA', label: '8× AA', cellCount: 8, capacityMah: 2800, voltage: 1.5 },
  { key: '4xC', label: '4× C Cell', cellCount: 4, capacityMah: 8000, voltage: 1.5 },
  { key: 'CR123A-x2', label: '2× CR123A (3V)', cellCount: 2, capacityMah: 1500, voltage: 3.0 },
  { key: 'lithium-pack', label: 'Li-Ion Pack (3.7V)', cellCount: 1, capacityMah: 5000, voltage: 3.7 },
  { key: 'usb-c-rechargeable', label: 'USB-C Rechargeable', cellCount: 1, capacityMah: 8000, voltage: 3.7 },
]

const batteryChemistries: Record<string, { label: string; capacityMultiplier: number; coldMultiplier: number }> = {
  'alkaline': { label: 'Alkaline (Standard)', capacityMultiplier: 1.0, coldMultiplier: 0.70 },
  'lithium': { label: 'Lithium (Premium)', capacityMultiplier: 1.07, coldMultiplier: 0.90 },
  'nimh': { label: 'NiMH Rechargeable', capacityMultiplier: 0.71, coldMultiplier: 0.75 },
  'cr123a': { label: 'CR123A Lithium', capacityMultiplier: 1.0, coldMultiplier: 0.88 },
  'li-ion': { label: 'Li-Ion (Built-in)', capacityMultiplier: 1.0, coldMultiplier: 0.85 },
}

const brandPresets: Record<string, { label: string; featureMultiplier: number; efficiency: string }> = {
  'generic': { label: 'Generic / Custom', featureMultiplier: 1.0, efficiency: 'Standard' },
  'yale': { label: 'Yale', featureMultiplier: 1.05, efficiency: 'Average' },
  'schlage': { label: 'Schlage', featureMultiplier: 1.02, efficiency: 'Good' },
  'august': { label: 'August', featureMultiplier: 1.08, efficiency: 'Average (Wi-Fi heavy)' },
  'kwikset': { label: 'Kwikset', featureMultiplier: 1.03, efficiency: 'Good' },
  'level': { label: 'Level', featureMultiplier: 0.92, efficiency: 'Excellent (compact)' },
  'aqara': { label: 'Aqara', featureMultiplier: 0.95, efficiency: 'Excellent' },
  'ultraloq': { label: 'Ultraloq', featureMultiplier: 1.10, efficiency: 'Average (multi-auth)' },
  'betech': { label: 'Be-Tech', featureMultiplier: 0.94, efficiency: 'Excellent (commercial)' },
}

export default function BatteryCalculator() {
  const [protocol, setProtocol] = useState('zigbee')
  const [dailyUsage, setDailyUsage] = useState(10)
  const [batteryConfig, setBatteryConfig] = useState('4xAA')
  const [batteryChemistry, setBatteryChemistry] = useState('alkaline')
  const [temperature, setTemperature] = useState('normal')
  const [brand, setBrand] = useState('generic')
  const [environment, setEnvironment] = useState('indoor')
  const [nightMode, setNightMode] = useState(false)

  // Feature toggles
  const [hasKeypad, setHasKeypad] = useState(true)
  const [hasAutoLock, setHasAutoLock] = useState(true)
  const [hasFingerprint, setHasFingerprint] = useState(false)
  const [hasCamera, setHasCamera] = useState(false)
  const [hasDoorbell, setHasDoorbell] = useState(false)
  const [hasBleAdvertising, setHasBleAdvertising] = useState(false)
  const [hasWifiKeepAlive, setHasWifiKeepAlive] = useState(false)

  const calculateBatteryLife = () => {
    const protocolInfo = protocolData.find(p => p.protocol === protocol) || protocolData[0]
    const config = batteryConfigs.find(c => c.key === batteryConfig) || batteryConfigs[0]
    const chemistry = batteryChemistries[batteryChemistry] || batteryChemistries['alkaline']
    const brandData = brandPresets[brand] || brandPresets['generic']

    // Total capacity: cells × per-cell capacity × chemistry multiplier
    const totalCapacityMah = config.cellCount * config.capacityMah * chemistry.capacityMultiplier

    // Daily power consumption
    const activeMinutesPerDay = dailyUsage * 0.5 // 30 seconds per operation
    const idleMinutesPerDay = 1440 - activeMinutesPerDay

    const dailyActiveMwh = (protocolInfo.activePowerMw * activeMinutesPerDay) / 60
    const dailyIdleMwh = (protocolInfo.idlePowerMw * idleMinutesPerDay) / 60
    let dailyTotalMwh = dailyActiveMwh + dailyIdleMwh

    // Feature multipliers
    let featureMultiplier = 1.0
    if (hasKeypad) featureMultiplier *= 1.08
    if (hasAutoLock) featureMultiplier *= 1.05
    if (hasFingerprint) featureMultiplier *= 1.15
    if (hasCamera) featureMultiplier *= 1.45
    if (hasDoorbell) featureMultiplier *= 1.12
    if (hasBleAdvertising) featureMultiplier *= 1.10
    if (hasWifiKeepAlive) featureMultiplier *= 1.30

    // Brand efficiency factor
    featureMultiplier *= brandData.featureMultiplier

    // Night mode saves ~8% overall (reduces polling 8hrs/day)
    if (nightMode) featureMultiplier *= 0.92

    dailyTotalMwh *= featureMultiplier

    // Temperature compensation
    let tempFactor = 1.0
    if (temperature === 'cold') tempFactor = chemistry.coldMultiplier
    if (temperature === 'freezing') tempFactor = chemistry.coldMultiplier * 0.7
    if (temperature === 'hot') tempFactor = 0.9

    // Environment impact
    let envFactor = 1.0
    if (environment === 'outdoor-covered') envFactor = 0.95
    if (environment === 'outdoor-exposed') envFactor = 0.85

    // Total energy available
    const totalEnergyMwh = (totalCapacityMah * config.voltage) * tempFactor * envFactor

    const estimatedDays = Math.floor(totalEnergyMwh / dailyTotalMwh)

    // Annual battery cost estimate
    const replacementsPerYear = estimatedDays > 0 ? 365 / estimatedDays : 0
    const cellCost = batteryChemistry === 'lithium' ? 2.0 : batteryChemistry === 'nimh' ? 1.5 : batteryChemistry === 'cr123a' ? 3.5 : batteryChemistry === 'li-ion' ? 0 : 0.5
    const annualBatteryCost = replacementsPerYear * config.cellCount * cellCost

    return {
      days: estimatedDays,
      months: Math.floor(estimatedDays / 30),
      dailyPowerMwh: dailyTotalMwh.toFixed(2),
      totalEnergyMwh: totalEnergyMwh.toFixed(0),
      annualCost: annualBatteryCost.toFixed(2),
      replacementsPerYear: replacementsPerYear.toFixed(1),
    }
  }

  const result = calculateBatteryLife()

  const labelStyle = { display: 'block' as const, fontSize: '0.875rem', fontWeight: 500 as const, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }
  const hintStyle = { fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Input Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="content-card">
          <h2 className="section-title">Battery Configuration</h2>

          <div className="space-y-6">
            {/* Brand Preset */}
            <div>
              <label style={labelStyle}>Lock Brand Preset</label>
              <select value={brand} onChange={(e) => setBrand(e.target.value)} className="form-input">
                {Object.entries(brandPresets).map(([key, data]) => (
                  <option key={key} value={key}>{data.label} — {data.efficiency}</option>
                ))}
              </select>
              <p style={hintStyle}>Applies brand-specific power efficiency factor</p>
            </div>

            {/* Protocol */}
            <div>
              <label style={labelStyle}>Communication Protocol</label>
              <select value={protocol} onChange={(e) => setProtocol(e.target.value)} className="form-input">
                {protocolData.map(p => (
                  <option key={p.protocol} value={p.protocol}>{p.label} (Idle: {p.idlePowerMw}mW, Active: {p.activePowerMw}mW)</option>
                ))}
              </select>
            </div>

            {/* Battery Configuration */}
            <div>
              <label style={labelStyle}>Battery Configuration</label>
              <select value={batteryConfig} onChange={(e) => setBatteryConfig(e.target.value)} className="form-input">
                {batteryConfigs.map(c => (
                  <option key={c.key} value={c.key}>{c.label} — {c.capacityMah}mAh × {c.cellCount} @ {c.voltage}V</option>
                ))}
              </select>
            </div>

            {/* Battery Chemistry */}
            <div>
              <label style={labelStyle}>Battery Chemistry</label>
              <select value={batteryChemistry} onChange={(e) => setBatteryChemistry(e.target.value)} className="form-input">
                {Object.entries(batteryChemistries).map(([key, data]) => (
                  <option key={key} value={key}>{data.label}</option>
                ))}
              </select>
            </div>

            {/* Daily Usage */}
            <div>
              <label style={labelStyle}>Daily Operations: {dailyUsage} times</label>
              <input
                type="range" min="1" max="100" value={dailyUsage}
                onChange={(e) => setDailyUsage(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
              />
              <div className="flex justify-between" style={hintStyle}>
                <span>1/day</span>
                <span>100/day</span>
              </div>
            </div>

            {/* Temperature */}
            <div>
              <label style={labelStyle}>Operating Temperature</label>
              <select value={temperature} onChange={(e) => setTemperature(e.target.value)} className="form-input">
                <option value="freezing">Extreme Cold (below -10°C / 14°F)</option>
                <option value="cold">Cold (-10°C to 5°C / 14°F to 41°F)</option>
                <option value="normal">Normal (5°C to 35°C / 41°F to 95°F)</option>
                <option value="hot">Hot (above 35°C / 95°F)</option>
              </select>
            </div>

            {/* Installation Environment */}
            <div>
              <label style={labelStyle}>Installation Environment</label>
              <select value={environment} onChange={(e) => setEnvironment(e.target.value)} className="form-input">
                <option value="indoor">Indoor (climate controlled)</option>
                <option value="outdoor-covered">Outdoor Covered (porch, awning)</option>
                <option value="outdoor-exposed">Outdoor Exposed (direct weather)</option>
              </select>
              <p style={hintStyle}>Outdoor exposure increases self-discharge and humidity impact</p>
            </div>

            {/* Night Mode */}
            <div>
              <label style={labelStyle}>Power Save Mode</label>
              <div className="grid grid-cols-2 gap-4">
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-md)', border: !nightMode ? '2px solid var(--color-accent)' : '2px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: !nightMode ? 'var(--color-surface-alt)' : 'transparent' }}>
                  <input type="radio" checked={!nightMode} onChange={() => setNightMode(false)} className="sr-only" />
                  <span className="font-medium">Always On</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-md)', border: nightMode ? '2px solid var(--color-accent)' : '2px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: nightMode ? 'var(--color-surface-alt)' : 'transparent' }}>
                  <input type="radio" checked={nightMode} onChange={() => setNightMode(true)} className="sr-only" />
                  <span className="font-medium">Night Mode (−8%)</span>
                </label>
              </div>
              <p style={hintStyle}>Reduces polling frequency during 11pm–7am</p>
            </div>

            {/* Active Features */}
            <div>
              <label style={labelStyle}>Active Features</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { checked: hasKeypad, setter: setHasKeypad, label: 'Keypad with Backlight', impact: '+8%' },
                  { checked: hasAutoLock, setter: setHasAutoLock, label: 'Auto-Lock Enabled', impact: '+5%' },
                  { checked: hasFingerprint, setter: setHasFingerprint, label: 'Fingerprint Reader', impact: '+15%' },
                  { checked: hasCamera, setter: setHasCamera, label: 'Camera / Video Log', impact: '+45%' },
                  { checked: hasDoorbell, setter: setHasDoorbell, label: 'Doorbell Integration', impact: '+12%' },
                  { checked: hasBleAdvertising, setter: setHasBleAdvertising, label: 'BLE Always-On Advertising', impact: '+10%' },
                  { checked: hasWifiKeepAlive, setter: setHasWifiKeepAlive, label: 'Wi-Fi Keep-Alive', impact: '+30%' },
                ].map(({ checked, setter, label, impact }) => (
                  <label key={label} className="flex items-center gap-2" style={{ fontSize: '0.875rem', padding: 'var(--space-xs) var(--space-sm)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                    <input
                      type="checkbox" checked={checked}
                      onChange={(e) => setter(e.target.checked)}
                      style={{ width: '1rem', height: '1rem', accentColor: 'var(--color-accent)' }}
                    />
                    <span>{label}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>({impact})</span>
                  </label>
                ))}
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
              <span className="font-semibold">{protocolData.find(p => p.protocol === protocol)?.label || protocol}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Battery:</span>
              <span className="font-semibold">{batteryConfigs.find(c => c.key === batteryConfig)?.label || batteryConfig}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Daily Usage:</span>
              <span className="font-semibold">{dailyUsage}×</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Brand:</span>
              <span className="font-semibold">{brandPresets[brand]?.label || 'Generic'}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs bg-white/10 rounded-lg p-4 mb-6">
            <div className="flex justify-between">
              <span className="opacity-90">Daily Power:</span>
              <span className="font-semibold">{result.dailyPowerMwh} mWh</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Total Energy:</span>
              <span className="font-semibold">{result.totalEnergyMwh} mWh</span>
            </div>
          </div>

          <div className="space-y-2 text-xs bg-white/10 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="opacity-90">Replacements/Year:</span>
              <span className="font-semibold">{result.replacementsPerYear}×</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Annual Battery Cost:</span>
              <span className="font-semibold">${result.annualCost}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <p className="text-xs opacity-90">
              <strong>Tip:</strong> {
                protocol === 'wifi'
                  ? 'Wi-Fi locks drain batteries 4× faster. Consider Zigbee or BLE for longer life.'
                  : hasCamera
                    ? 'Camera feature uses 45% more power. Consider hardwired power if available.'
                    : temperature === 'cold' || temperature === 'freezing'
                      ? 'Cold temps reduce capacity significantly. Use lithium batteries.'
                      : dailyUsage > 50
                        ? 'Very heavy usage. Consider USB-C rechargeable or hardwired locks.'
                        : 'Optimal configuration! Expect consistent performance.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
