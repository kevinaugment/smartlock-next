import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  formatUsdCents,
  formatUsdCentsForSchema,
  isUsdCentsBelow,
  usdCentsToDollars,
} from '../lib/format/price'

function main() {
  assert.equal(formatUsdCents(29999), '$299.99')
  assert.equal(formatUsdCents(18000), '$180')
  assert.equal(formatUsdCents(null), 'Price not listed')
  assert.equal(usdCentsToDollars(29999), 299.99)
  assert.equal(formatUsdCentsForSchema(29999), '299.99')
  assert.equal(isUsdCentsBelow(14999, 150), true)
  assert.equal(isUsdCentsBelow(15000, 150), false)

  const comparePage = readFileSync('app/compare/[slug]/page.tsx', 'utf8')
  assert.match(comparePage, /formatUsdCents/, 'compare page must format catalog cents as USD')
  assert.doesNotMatch(comparePage, /\$\{product\.price_usd\}/, 'compare page must not render raw price_usd values')

  const bestPage = readFileSync('app/best/[slug]/page.tsx', 'utf8')
  assert.match(bestPage, /formatUsdCents/, 'best page must format catalog cents as USD')
  assert.doesNotMatch(bestPage, /\$`\$\{product\.price_usd\}`/, 'best page must not render raw price_usd values')

  const productPage = readFileSync('app/brands/[slug]/[product]/page.tsx', 'utf8')
  assert.match(productPage, /formatUsdCents/, 'product page must format catalog cents as USD')
  assert.match(productPage, /formatUsdCentsForSchema/, 'product schema must convert catalog cents to decimal USD')
  assert.match(productPage, /priceUsd:\s*usdCentsToDollars\(product\.price_usd\)/, 'product report context must expose decimal USD')
  assert.match(productPage, /priceCents:\s*product\.price_usd \|\| null/, 'product report context must preserve raw cents with an explicit name')
  assert.doesNotMatch(productPage, /price:\s*product\.price_usd\.toFixed\(2\)/, 'product schema must not publish raw cents as dollars')

  const brandPage = readFileSync('app/brands/[slug]/page.tsx', 'utf8')
  assert.match(brandPage, /formatUsdCents/, 'brand page price range must format catalog cents as USD')
  assert.doesNotMatch(brandPage, /price >= 1000 \? price \/ 100/, 'brand page must not keep local price normalization')

  assert.match(bestPage, /isUsdCentsBelow\(product\.price_usd, 150\)/, 'best-page budget badges must compare cents against dollar threshold')
}

main()
