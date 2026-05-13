import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  buildProductFactDisplays,
  getBrandProtocolFacts,
  getProductProtocolFacts,
  getProtocolClaimText,
} from '../lib/brands/fact-policy'

function main() {
  const noProtocolBrand = {
    supports_wifi: false,
    supports_zigbee: false,
    supports_zwave: false,
    supports_thread: false,
    supports_matter: false,
    supports_bluetooth: false,
  }
  const noProtocolFacts = getBrandProtocolFacts(noProtocolBrand)
  assert.equal(getProtocolClaimText(noProtocolFacts), 'Protocol support needs verification')
  assert.equal(noProtocolFacts.every((fact) => fact.status === 'Unknown'), true)

  const zwaveProduct = {
    protocol: 'Z-Wave',
    secondary_protocol: null,
    supports_matter: false,
    battery_life_months: null,
    ansi_grade: null,
  }
  const zwaveFacts = getProductProtocolFacts(zwaveProduct)
  assert.equal(zwaveFacts.find((fact) => fact.label === 'Z-Wave')?.supported, true)
  assert.equal(zwaveFacts.find((fact) => fact.label === 'Wi-Fi')?.supported, false)
  assert.equal(zwaveFacts.find((fact) => fact.label === 'Matter')?.supported, false)
  assert.equal(zwaveFacts.find((fact) => fact.label === 'Thread')?.supported, false)

  const threadOnlyProduct = {
    protocol: 'Thread',
    secondary_protocol: null,
    supports_matter: false,
    battery_life_months: 12,
    ansi_grade: '2',
  }
  const threadOnlyFacts = getProductProtocolFacts(threadOnlyProduct)
  assert.equal(threadOnlyFacts.find((fact) => fact.label === 'Thread')?.supported, true)
  assert.equal(threadOnlyFacts.find((fact) => fact.label === 'Matter')?.supported, false, 'Thread must not imply Matter support')

  const factDisplays = buildProductFactDisplays(zwaveProduct)
  assert.equal(factDisplays.find((fact) => fact.label === 'Battery')?.status, 'Needs verification')
  assert.equal(factDisplays.find((fact) => fact.label === 'ANSI grade')?.status, 'Needs verification')
  assert.equal(factDisplays.find((fact) => fact.label === 'Matter support')?.value, 'Unknown')
  assert.equal(factDisplays.find((fact) => fact.label === 'Warranty')?.status, 'Needs verification')

  const brandPage = readFileSync('app/brands/[slug]/page.tsx', 'utf8')
  assert.doesNotMatch(brandPage, /Wi-Fi, Matter, Z-Wave, Zigbee, Thread, and Bluetooth/, 'brand metadata must not invent full protocol coverage')
  assert.match(brandPage, /getBrandProtocolFacts/, 'brand page must use protocol fact policy')
  assert.match(brandPage, /Brand Fact Evidence/, 'brand page must render evidence block')

  const productPage = readFileSync('app/brands/[slug]/[product]/page.tsx', 'utf8')
  assert.match(productPage, /buildProductFactDisplays/, 'product page must use fact display policy')
  assert.match(productPage, /getProductProtocolFacts/, 'product page must use protocol fact policy')
  assert.match(productPage, /Product Fact Evidence/, 'product page must render evidence block')
  assert.doesNotMatch(productPage, /Matter Support" value=\{product\.supports_matter \? 'Yes ✓' : 'No'\}/, 'product page must not render unverified Matter as No')
}

main()
