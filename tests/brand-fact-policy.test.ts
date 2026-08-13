import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  buildProductFactDisplays,
  formatFactDisplayValue,
  formatProtocolFactValue,
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
  assert.equal(formatProtocolFactValue(zwaveFacts.find((fact) => fact.label === 'Z-Wave')!), 'Supported · Catalog field')
  assert.equal(formatProtocolFactValue(zwaveFacts.find((fact) => fact.label === 'Wi-Fi')!), 'Not listed')
  assert.equal(formatFactDisplayValue(factDisplays.find((fact) => fact.label === 'Battery')), 'Needs verification')
  assert.equal(formatFactDisplayValue(factDisplays.find((fact) => fact.label === 'Protocol')), 'Z-WAVE · Catalog field')

  const brandPage = readFileSync('app/brands/[slug]/page.tsx', 'utf8')
  assert.doesNotMatch(brandPage, /Wi-Fi, Matter, Z-Wave, Zigbee, Thread, and Bluetooth/, 'brand metadata must not invent full protocol coverage')
  assert.match(brandPage, /getBrandProtocolFacts/, 'brand page must use protocol fact policy')
  assert.match(brandPage, /Brand Fact Evidence/, 'brand page must render evidence block')

  const brandIndexPage = readFileSync('app/brands/page.tsx', 'utf8')
  assert.doesNotMatch(brandIndexPage, /function getProtocols/, 'brand index page must not maintain a separate protocol parser')
  assert.match(brandIndexPage, /getBrandProtocolFacts/, 'brand index page must use shared protocol fact policy')
  assert.match(brandIndexPage, /Needs verification/, 'brand index page must label missing protocol support instead of hiding it')

  const productPage = readFileSync('app/brands/[slug]/[product]/page.tsx', 'utf8')
  assert.match(productPage, /buildProductFactDisplays/, 'product page must use fact display policy')
  assert.match(productPage, /getProductProtocolFacts/, 'product page must use protocol fact policy')
  assert.match(productPage, /Product Fact Evidence/, 'product page must render evidence block')
  assert.match(productPage, /formatProtocolFactValue\(fact\)/, 'product page must format protocol fact display values through the shared policy helper')
  assert.match(productPage, /formatFactDisplayValue\(batteryFact\)/, 'product page must format battery fact display values through the shared policy helper')
  assert.match(productPage, /formatFactDisplayValue\(ansiFact\)/, 'product page must format ANSI fact display values through the shared policy helper')
  assert.doesNotMatch(productPage, /\$\{fact\.supported \? 'Supported' : 'Unknown'\} · \$\{fact\.status\}/, 'product page must not render unsupported protocol facts as Unknown · Unknown')
  assert.doesNotMatch(productPage, /value=\{`\$\{batteryFact\?\.value\} · \$\{batteryFact\?\.status\}`\}/, 'missing battery values must not render Unknown · Needs verification in compact spec cards')
  assert.doesNotMatch(productPage, /value=\{`\$\{ansiFact\?\.value\} · \$\{ansiFact\?\.status\}`\}/, 'missing ANSI values must not render Unknown · Needs verification in compact spec cards')
  assert.match(productPage, /\.\.\.\(product\.protocol \? \[\{ name: 'Primary protocol', value: product\.protocol\.toUpperCase\(\) \}\] : \[\]\)/, 'product JSON-LD must skip Primary protocol when protocol is missing')
  assert.doesNotMatch(productPage, /^\s*\{ name: 'Primary protocol', value: product\.protocol\.toUpperCase\(\) \},$/m, 'product JSON-LD must not always write Primary protocol')
  assert.doesNotMatch(productPage, /Matter Support" value=\{product\.supports_matter \? 'Yes ✓' : 'No'\}/, 'product page must not render unverified Matter as No')
}

main()
