import assert from 'node:assert/strict'
import {
  calculateSmartLockBatteryLife,
  getBatteryLifeMethodology,
} from '../lib/calculators/battery-life-model'

function main() {
  const defaultEstimate = calculateSmartLockBatteryLife({
    protocol: 'zigbee',
    dailyUsage: 10,
    batteryConfig: '4xAA',
    batteryChemistry: 'alkaline',
    temperature: 'normal',
    brand: 'generic',
    environment: 'indoor',
    nightMode: false,
    features: {
      hasKeypad: true,
      hasAutoLock: true,
      hasFingerprint: false,
      hasCamera: false,
      hasDoorbell: false,
      hasBleAdvertising: false,
      hasWifiKeepAlive: false,
    },
  })

  assert.ok(
    defaultEstimate.days >= 300 && defaultEstimate.days <= 540,
    `default Zigbee estimate must stay in the stated 10-18 month range, received ${defaultEstimate.days} days`
  )
  assert.equal(defaultEstimate.displayMonths, 11, 'default Zigbee estimate should round to a user-facing 11 months')
  assert.equal(defaultEstimate.displayLabel, '11 months', 'default Zigbee display label should match rounded months')
  assert.equal(defaultEstimate.isOutsideModelRange, false, 'default Zigbee estimate should be inside model range')

  const wifiEstimate = calculateSmartLockBatteryLife({
    protocol: 'wifi',
    dailyUsage: 20,
    batteryConfig: '4xAA',
    batteryChemistry: 'alkaline',
    temperature: 'normal',
    brand: 'generic',
    environment: 'indoor',
    nightMode: false,
    features: {
      hasKeypad: true,
      hasAutoLock: true,
      hasFingerprint: false,
      hasCamera: false,
      hasDoorbell: false,
      hasBleAdvertising: false,
      hasWifiKeepAlive: true,
    },
  })

  assert.ok(
    wifiEstimate.days >= 45 && wifiEstimate.days <= 150,
    `Wi-Fi estimate should land near the stated 2-5 month planning range, received ${wifiEstimate.days} days`
  )
  assert.equal(wifiEstimate.displayMonths, 2, '55-day Wi-Fi estimates should not display as 1 month')
  assert.equal(wifiEstimate.displayLabel, '2 months', 'Wi-Fi display label should use rounded months')
  assert.ok(
    wifiEstimate.days < defaultEstimate.days,
    'Wi-Fi keep-alive estimate must be shorter than low-power Zigbee estimate'
  )

  for (const protocol of ['zigbee', 'zwave', 'thread', 'ble', 'nfc'] as const) {
    const estimate = calculateSmartLockBatteryLife({
      protocol,
      dailyUsage: 10,
      batteryConfig: '4xAA',
      batteryChemistry: 'alkaline',
      temperature: 'normal',
      brand: 'generic',
      environment: 'indoor',
      nightMode: false,
      features: {
        hasKeypad: true,
        hasAutoLock: true,
        hasFingerprint: false,
        hasCamera: false,
        hasDoorbell: false,
        hasBleAdvertising: false,
        hasWifiKeepAlive: false,
      },
    })

    assert.ok(
      estimate.days >= 240 && estimate.days <= 540,
      `${protocol} default estimate should stay inside the page's low-power protocol planning range, received ${estimate.days} days`
    )
  }

  const methodology = getBatteryLifeMethodology()
  assert.match(methodology.formula, /usable energy/i, 'methodology must disclose the usable-energy formula')
  assert.match(methodology.rangeLimit, /24 months/i, 'methodology must disclose the planning cap')

  const lowUsageEstimate = calculateSmartLockBatteryLife({
    protocol: 'zigbee',
    dailyUsage: 1,
    batteryConfig: '8xAA',
    batteryChemistry: 'alkaline',
    temperature: 'normal',
    brand: 'generic',
    environment: 'indoor',
    nightMode: true,
    features: {
      hasKeypad: false,
      hasAutoLock: false,
      hasFingerprint: false,
      hasCamera: false,
      hasDoorbell: false,
      hasBleAdvertising: false,
      hasWifiKeepAlive: false,
    },
  })

  assert.ok(
    lowUsageEstimate.rawDays > lowUsageEstimate.days,
    'low-use theoretical estimates should expose the raw estimate separately from the practical planning result'
  )
  assert.ok(
    lowUsageEstimate.days <= 730,
    `extended-pack low-power estimates must be capped to a practical planning range, received ${lowUsageEstimate.days} days`
  )
  assert.equal(lowUsageEstimate.isOutsideModelRange, true, 'capped estimates must be flagged')
}

main()
