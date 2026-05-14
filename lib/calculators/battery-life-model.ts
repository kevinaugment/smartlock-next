export type BatteryProtocol = 'zigbee' | 'zwave' | 'thread' | 'ble' | 'wifi' | 'nfc'
export type BatteryConfigKey = '4xAA' | '8xAA' | '4xC' | 'CR123A-x2' | 'lithium-pack' | 'usb-c-rechargeable'
export type BatteryChemistryKey = 'alkaline' | 'lithium' | 'nimh' | 'cr123a' | 'li-ion'
export type BatteryTemperature = 'freezing' | 'cold' | 'normal' | 'hot'
export type BatteryEnvironment = 'indoor' | 'outdoor-covered' | 'outdoor-exposed'

export interface ProtocolData {
  protocol: BatteryProtocol
  label: string
  typicalRuntime: string
  primaryBatteryDriver: string
  efficiencyRating: number
  idlePowerMw: number
  activePowerMw: number
}

export interface BatteryConfig {
  key: BatteryConfigKey
  label: string
  cellCount: number
  capacityMah: number
  voltage: number
}

export interface BatteryFeatures {
  hasKeypad: boolean
  hasAutoLock: boolean
  hasFingerprint: boolean
  hasCamera: boolean
  hasDoorbell: boolean
  hasBleAdvertising: boolean
  hasWifiKeepAlive: boolean
}

export interface BatteryLifeInput {
  protocol: BatteryProtocol
  dailyUsage: number
  batteryConfig: BatteryConfigKey
  batteryChemistry: BatteryChemistryKey
  temperature: BatteryTemperature
  brand: string
  environment: BatteryEnvironment
  nightMode: boolean
  features: BatteryFeatures
}

export interface BatteryLifeEstimate {
  days: number
  months: number
  rawDays: number
  practicalDays: number
  displayMonths: number
  displayLabel: string
  dailyPowerMwh: string
  usableEnergyMwh: string
  annualCost: string
  replacementsPerYear: string
  isOutsideModelRange: boolean
  rangeNote: string
}

export const protocolData: ProtocolData[] = [
  { protocol: 'zigbee', label: 'Zigbee', typicalRuntime: '10-18 months', primaryBatteryDriver: 'Low-power mesh sleep behavior', efficiencyRating: 5, idlePowerMw: 1.0, activePowerMw: 400 },
  { protocol: 'zwave', label: 'Z-Wave', typicalRuntime: '10-18 months', primaryBatteryDriver: 'Low-power mesh sleep behavior', efficiencyRating: 5, idlePowerMw: 1.05, activePowerMw: 400 },
  { protocol: 'thread', label: 'Thread', typicalRuntime: '9-15 months', primaryBatteryDriver: 'Low-power IP mesh behavior', efficiencyRating: 4, idlePowerMw: 1.2, activePowerMw: 420 },
  { protocol: 'ble', label: 'Bluetooth', typicalRuntime: '10-18 months', primaryBatteryDriver: 'Local, short-range access pattern', efficiencyRating: 4, idlePowerMw: 0.95, activePowerMw: 380 },
  { protocol: 'wifi', label: 'Wi-Fi', typicalRuntime: '2-5 months', primaryBatteryDriver: 'Always-on network activity', efficiencyRating: 2, idlePowerMw: 5.0, activePowerMw: 650 },
  { protocol: 'nfc', label: 'NFC', typicalRuntime: '12-20 months', primaryBatteryDriver: 'Local, short-range access pattern', efficiencyRating: 4, idlePowerMw: 0.8, activePowerMw: 320 },
]

export const batteryConfigs: BatteryConfig[] = [
  { key: '4xAA', label: '4x AA', cellCount: 4, capacityMah: 2800, voltage: 1.5 },
  { key: '8xAA', label: '8x AA', cellCount: 8, capacityMah: 2800, voltage: 1.5 },
  { key: '4xC', label: '4x C Cell', cellCount: 4, capacityMah: 8000, voltage: 1.5 },
  { key: 'CR123A-x2', label: '2x CR123A (3V)', cellCount: 2, capacityMah: 1500, voltage: 3.0 },
  { key: 'lithium-pack', label: 'Li-Ion Pack (3.7V)', cellCount: 1, capacityMah: 5000, voltage: 3.7 },
  { key: 'usb-c-rechargeable', label: 'USB-C Rechargeable', cellCount: 1, capacityMah: 8000, voltage: 3.7 },
]

export const batteryChemistries: Record<BatteryChemistryKey, { label: string; capacityMultiplier: number; coldMultiplier: number; usableEnergyFactor: number; cellCost: number }> = {
  alkaline: { label: 'Alkaline (Standard)', capacityMultiplier: 1.0, coldMultiplier: 0.70, usableEnergyFactor: 0.72, cellCost: 0.5 },
  lithium: { label: 'Lithium (Premium)', capacityMultiplier: 1.07, coldMultiplier: 0.90, usableEnergyFactor: 0.82, cellCost: 2.0 },
  nimh: { label: 'NiMH Rechargeable', capacityMultiplier: 0.71, coldMultiplier: 0.75, usableEnergyFactor: 0.78, cellCost: 1.5 },
  cr123a: { label: 'CR123A Lithium', capacityMultiplier: 1.0, coldMultiplier: 0.88, usableEnergyFactor: 0.82, cellCost: 3.5 },
  'li-ion': { label: 'Li-Ion (Built-in)', capacityMultiplier: 1.0, coldMultiplier: 0.85, usableEnergyFactor: 0.85, cellCost: 0 },
}

export const brandPresets: Record<string, { label: string; featureMultiplier: number; efficiency: string }> = {
  generic: { label: 'Generic / Custom', featureMultiplier: 1.0, efficiency: 'Standard' },
  yale: { label: 'Yale', featureMultiplier: 1.05, efficiency: 'Average' },
  schlage: { label: 'Schlage', featureMultiplier: 1.02, efficiency: 'Good' },
  august: { label: 'August', featureMultiplier: 1.08, efficiency: 'Average (Wi-Fi heavy)' },
  kwikset: { label: 'Kwikset', featureMultiplier: 1.03, efficiency: 'Good' },
  level: { label: 'Level', featureMultiplier: 0.92, efficiency: 'Excellent (compact)' },
  aqara: { label: 'Aqara', featureMultiplier: 0.95, efficiency: 'Excellent' },
  ultraloq: { label: 'Ultraloq', featureMultiplier: 1.10, efficiency: 'Average (multi-auth)' },
  betech: { label: 'Be-Tech', featureMultiplier: 0.94, efficiency: 'Excellent (commercial)' },
}

const PRACTICAL_RUNTIME_CAP_DAYS = 730
const MAX_STANDARD_PACK_DAYS = 540
const MAX_EXTENDED_PACK_DAYS = 730
const LOW_POWER_PROTOCOLS: BatteryProtocol[] = ['zigbee', 'zwave', 'thread', 'ble', 'nfc']

function getPracticalRuntimeCap(input: BatteryLifeInput): number {
  if (input.protocol === 'wifi') return 150
  if (LOW_POWER_PROTOCOLS.includes(input.protocol)) {
    if (input.batteryConfig === '8xAA' || input.batteryConfig === '4xC' || input.batteryConfig === 'usb-c-rechargeable') {
      return MAX_EXTENDED_PACK_DAYS
    }
    return MAX_STANDARD_PACK_DAYS
  }
  return PRACTICAL_RUNTIME_CAP_DAYS
}

export function calculateSmartLockBatteryLife(input: BatteryLifeInput): BatteryLifeEstimate {
  const protocolInfo = protocolData.find((p) => p.protocol === input.protocol) || protocolData[0]
  const config = batteryConfigs.find((c) => c.key === input.batteryConfig) || batteryConfigs[0]
  const chemistry = batteryChemistries[input.batteryChemistry] || batteryChemistries.alkaline
  const brandData = brandPresets[input.brand] || brandPresets.generic

  const packEnergyMwh = config.cellCount * config.capacityMah * config.voltage
  let usableEnergyMwh = packEnergyMwh * chemistry.capacityMultiplier * chemistry.usableEnergyFactor

  let tempFactor = 1.0
  if (input.temperature === 'cold') tempFactor = chemistry.coldMultiplier
  if (input.temperature === 'freezing') tempFactor = chemistry.coldMultiplier * 0.7
  if (input.temperature === 'hot') tempFactor = 0.9

  let envFactor = 1.0
  if (input.environment === 'outdoor-covered') envFactor = 0.95
  if (input.environment === 'outdoor-exposed') envFactor = 0.85

  usableEnergyMwh *= tempFactor * envFactor

  const activeSecondsPerDay = input.dailyUsage * 8
  const idleHoursPerDay = Math.max(0, 24 - activeSecondsPerDay / 3600)
  const dailyActiveMwh = (protocolInfo.activePowerMw * activeSecondsPerDay) / 3600
  const dailyIdleMwh = protocolInfo.idlePowerMw * idleHoursPerDay
  let dailyTotalMwh = dailyActiveMwh + dailyIdleMwh

  let featureMultiplier = 1.0
  if (input.features.hasKeypad) featureMultiplier *= 1.08
  if (input.features.hasAutoLock) featureMultiplier *= 1.05
  if (input.features.hasFingerprint) featureMultiplier *= 1.15
  if (input.features.hasCamera) featureMultiplier *= 1.45
  if (input.features.hasDoorbell) featureMultiplier *= 1.12
  if (input.features.hasBleAdvertising) featureMultiplier *= 1.10
  if (input.features.hasWifiKeepAlive) featureMultiplier *= 1.30

  featureMultiplier *= brandData.featureMultiplier
  if (input.nightMode) featureMultiplier *= 0.92
  dailyTotalMwh *= featureMultiplier

  const rawDays = Math.max(1, Math.floor(usableEnergyMwh / dailyTotalMwh))
  const practicalCapDays = getPracticalRuntimeCap(input)
  const estimatedDays = Math.min(rawDays, practicalCapDays)
  const displayMonths = Math.max(1, Math.round(estimatedDays / 30))
  const replacementsPerYear = 365 / estimatedDays
  const annualBatteryCost = replacementsPerYear * config.cellCount * chemistry.cellCost
  const isOutsideModelRange = rawDays > practicalCapDays

  return {
    days: estimatedDays,
    months: Math.floor(estimatedDays / 30),
    rawDays,
    practicalDays: estimatedDays,
    displayMonths,
    displayLabel: `${displayMonths} ${displayMonths === 1 ? 'month' : 'months'}`,
    dailyPowerMwh: dailyTotalMwh.toFixed(1),
    usableEnergyMwh: usableEnergyMwh.toFixed(0),
    annualCost: annualBatteryCost.toFixed(2),
    replacementsPerYear: replacementsPerYear.toFixed(1),
    isOutsideModelRange,
    rangeNote: isOutsideModelRange
      ? `The raw energy estimate is ${rawDays} days, but the calculator caps the planning result at ${practicalCapDays} days because self-discharge, firmware polling, motor strain, and low-voltage cutoff dominate long estimates.`
      : 'Estimate is inside the normal planning range for consumer smart locks.',
  }
}

export function getBatteryLifeMethodology() {
  return {
    formula: 'Estimated life = usable energy / ((idle power x idle hours) + (active power x operations x active seconds))',
    rangeLimit: 'Results above 24 months are flagged as outside the practical planning range because self-discharge, motor load, firmware behavior, and low-voltage cutoff dominate long estimates.',
  }
}
