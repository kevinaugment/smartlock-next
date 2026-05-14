import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { getComparisonSeoProfile } from '../lib/seo/comparison-page-seo'
import {
  getBestPageCalculatorPathways,
  getBestPageCommercialIntent,
  getBestPageFaqs,
  getBestPageSeoProfile,
} from '../lib/seo/best-page-seo'
import type { Brand, ProductWithBrand } from '../lib/db/brand-models'

function brand(slug: string, name: string): Brand {
  return {
    id: 1,
    name,
    slug,
    description: `${name} smart locks`,
    logo_url: null,
    website_url: null,
    country: null,
    founded_year: null,
    parent_company: null,
    market_position: null,
    target_market: 'Residential',
    price_tier: 'mid',
    warranty_years: null,
    support_rating: null,
    innovation_score: null,
    status: 'published',
    display_order: 1,
    meta_title: null,
    meta_description: null,
    created_at: '',
    updated_at: '',
  }
}

function product(brandSlug: string, overrides: Partial<ProductWithBrand> = {}): ProductWithBrand {
  return {
    id: 1,
    brand_id: 1,
    series_id: 1,
    name: `${brandSlug} lock`,
    slug: `${brandSlug}-lock`,
    model_number: null,
    description: '',
    price_usd: 19900,
    currency: 'USD',
    battery_type: null,
    battery_count: null,
    battery_life_months: 12,
    standby_power_mw: null,
    active_power_mw: null,
    protocol: 'wifi',
    secondary_protocol: null,
    supports_matter: false,
    has_fingerprint: false,
    has_keypad: true,
    has_guest_codes: true,
    has_remote_access: true,
    max_pin_codes: null,
    max_fingerprints: null,
    door_thickness_min_mm: null,
    door_thickness_max_mm: null,
    bore_diameter_mm: null,
    backset_mm: null,
    ansi_grade: '2',
    ul_listed: false,
    encryption_type: null,
    ip_rating: null,
    rating: 4.3,
    review_count: 100,
    pros_json: null,
    cons_json: null,
    specs_json: null,
    meta_title: null,
    meta_description: null,
    is_active: true,
    display_order: 1,
    created_at: '',
    updated_at: '',
    brand_name: brandSlug,
    brand_slug: brandSlug,
    ...overrides,
  }
}

function assertMeaningfulText(value: string, label: string) {
  assert.ok(value.length >= 45, `${label} must be specific enough for SEO use`)
  assert.equal(value.includes('undefined'), false, `${label} must not contain undefined`)
  assert.equal(value.includes('null'), false, `${label} must not contain null`)
}

const expectedCommercialLabels = ['Best for', 'Avoid if', 'Decision factor', 'Evidence needed']
const expectedCalculatorPrefixes = ['/calculators/']

function assertCommercialIntent(blocks: Array<{ label: string; detail: string }>, label: string) {
  assert.deepEqual(blocks.map((block) => block.label), expectedCommercialLabels, `${label} must include all commercial investigation blocks in order`)
  for (const block of blocks) {
    assertMeaningfulText(block.detail, `${label} ${block.label}`)
  }
}

function assertCalculatorPathways(pathways: Array<{ href: string; label: string; detail: string }>, label: string) {
  assert.equal(pathways.length >= 3, true, `${label} must include at least three calculator pathways`)
  for (const pathway of pathways) {
    assert.ok(expectedCalculatorPrefixes.some((prefix) => pathway.href.startsWith(prefix)), `${label} pathway must link to calculator: ${pathway.href}`)
    assert.ok(existsSync(`app${pathway.href}/page.tsx`), `${label} pathway must point to an implemented calculator page: ${pathway.href}`)
    assert.ok(pathway.label.length >= 8, `${label} pathway label must be clear`)
    assert.equal(pathway.label.includes('undefined'), false, `${label} pathway label must not contain undefined`)
    assert.equal(pathway.label.includes('null'), false, `${label} pathway label must not contain null`)
    assertMeaningfulText(pathway.detail, `${label} pathway detail`)
  }
}

function assertProfileFaqs(faqs: Array<{ question: string; answer: string }>, label: string) {
  assert.equal(faqs.length, 5, `${label} must include five profile FAQs`)
  assert.equal(new Set(faqs.map((faq) => faq.question)).size, faqs.length, `${label} FAQ questions must be unique`)
  const joinedFaqs = faqs.map((faq) => `${faq.question} ${faq.answer}`).join(' ')
  assert.doesNotMatch(joinedFaqs, /\btested\b|\bverified\b|unhackable|99\.7|0\.002|gold standard|unbeatable|ALL ecosystems|Expert-ranked|expert-ranked|pinnacle|exclusive to premium/i, `${label} FAQs must not carry unsupported legacy claims`)
  for (const faq of faqs) {
    assert.ok(faq.question.length >= 25, `${label} FAQ question must be clear enough for SEO use`)
    assert.equal(faq.question.includes('undefined'), false, `${label} FAQ question must not contain undefined`)
    assert.equal(faq.question.includes('null'), false, `${label} FAQ question must not contain null`)
    assertMeaningfulText(faq.answer, `${label} FAQ answer`)
  }
}

function getPublishedTopNPageSlugsFromSeed(): string[] {
  const seed = readFileSync('database/d1-import-ordered.sql', 'utf8')
  const slugs: string[] = []
  const topNPageInsertPattern = /INSERT INTO "top_n_pages" \([^)]+\) VALUES \([^,]+, '([^']+)'[\s\S]*?'published'/g
  let match: RegExpExecArray | null
  while ((match = topNPageInsertPattern.exec(seed))) {
    slugs.push(match[1])
  }
  return slugs
}

function main() {
  const canonicalBestPageSlugs = [
    'z-wave-smart-locks',
    'smart-locks-for-airbnb',
    'matter-smart-locks',
    'smart-locks-with-longest-battery-life',
    'renter-friendly-smart-locks',
    'smart-locks-2026',
    'thread-smart-locks',
    'smart-locks-for-apartments',
    'smart-locks-for-rental-properties',
    'smart-locks-for-commercial',
    'smart-locks-for-families',
    'smart-locks-for-home-security',
    'auto-unlock-smart-locks',
    'homekit-smart-locks',
    'wifi-smart-locks',
    'zigbee-smart-locks',
    'fingerprint-smart-locks',
    'keypad-smart-locks',
    'budget-smart-locks',
    'mid-range-smart-locks',
    'premium-smart-locks',
  ]
  const publishedTopNPageSlugs = getPublishedTopNPageSlugsFromSeed()
  assert.deepEqual(
    [...canonicalBestPageSlugs].sort(),
    [...publishedTopNPageSlugs, 'renter-friendly-smart-locks'].sort(),
    'canonical best-page profile test list must cover every published top_n_pages slug plus intentional aliases'
  )

  const comparisonPairs = [
    ['nuki', 'Nuki', 'tedee', 'Tedee'],
    ['schlage', 'Schlage', 'weiser', 'Weiser'],
    ['kwikset', 'Kwikset', 'defiant', 'Defiant'],
    ['schlage', 'Schlage', 'defiant', 'Defiant'],
    ['schlage', 'Schlage', 'veise', 'Veise'],
    ['switchbot', 'SwitchBot', 'nuki', 'Nuki'],
    ['august', 'August', 'nuki', 'Nuki'],
    ['august', 'August', 'switchbot', 'SwitchBot'],
    ['eufy', 'Eufy', 'philips', 'Philips'],
    ['schlage', 'Schlage', 'philips', 'Philips'],
    ['schlage', 'Schlage', 'eufy', 'Eufy'],
    ['lockly', 'Lockly', 'eufy', 'Eufy'],
    ['eufy', 'Eufy', 'simplisafe', 'SimpliSafe'],
    ['schlage', 'Schlage', 'lockly', 'Lockly'],
    ['yale', 'Yale', 'godrej', 'Godrej'],
    ['yale', 'Yale', 'aqara', 'Aqara'],
    ['schlage', 'Schlage', 'brinks', 'Brinks'],
    ['kwikset', 'Kwikset', 'philips', 'Philips'],
  ] as const

  for (const [slug1, name1, slug2, name2] of comparisonPairs) {
    const profile = getComparisonSeoProfile(
      brand(slug1, name1),
      brand(slug2, name2),
      [product(slug1)],
      [product(slug2, { price_usd: 14900, rating: 4.1 })]
    )

    assert.match(profile.title, new RegExp(`${name1}|${name2}`), `${slug1}-vs-${slug2} title must name a queried brand`)
    assertMeaningfulText(profile.description, `${slug1}-vs-${slug2} description`)
    assert.doesNotMatch(profile.description, /\$19900|\$14900/, `${slug1}-vs-${slug2} description must not render raw price cents`)
    assert.doesNotMatch(profile.description, /\$1\.99|\$1\.49/, `${slug1}-vs-${slug2} description must not double-convert price cents`)
    assertMeaningfulText(profile.subtitle, `${slug1}-vs-${slug2} subtitle`)
    assertMeaningfulText(profile.verdict, `${slug1}-vs-${slug2} verdict`)
    assertMeaningfulText(profile.angle, `${slug1}-vs-${slug2} angle`)
    assertCommercialIntent(profile.commercialIntent, `${slug1}-vs-${slug2}`)
    assertCalculatorPathways(profile.calculatorPathways, `${slug1}-vs-${slug2}`)
    assertMeaningfulText(profile.faq.question, `${slug1}-vs-${slug2} FAQ question`)
    assertMeaningfulText(profile.faq.answer, `${slug1}-vs-${slug2} FAQ answer`)
  }

  for (const slug of [
    'best-z-wave-smart-locks',
    'best-smart-locks-for-airbnb',
    'renter-friendly-smart-locks-no-drill-apartments',
    ...canonicalBestPageSlugs,
  ]) {
    const profile = getBestPageSeoProfile(slug)
    assert.ok(profile, `${slug} must have a dedicated best-page SEO profile`)
    assertMeaningfulText(profile.title, `${slug} title`)
    assertMeaningfulText(profile.description, `${slug} description`)
    assertMeaningfulText(profile.h1, `${slug} H1`)
    assertMeaningfulText(profile.intro, `${slug} intro`)
    assert.equal(profile.methodology.length, 3, `${slug} must define three methodology bullets`)
    assert.equal(profile.intentSignals.length, 3, `${slug} must define three intent signals`)
    assertCommercialIntent(getBestPageCommercialIntent(slug), slug)
    assertCalculatorPathways(getBestPageCalculatorPathways(slug), slug)
    assertProfileFaqs(getBestPageFaqs(slug, [{ question: 'Legacy seed question?', answer: 'Legacy seed answer.' }]), slug)
  }

  const bestPageTitles = canonicalBestPageSlugs.map((slug) => getBestPageSeoProfile(slug)?.title)
  const bestPageDescriptions = canonicalBestPageSlugs.map((slug) => getBestPageSeoProfile(slug)?.description)
  assert.equal(new Set(bestPageTitles).size, canonicalBestPageSlugs.length, 'canonical best-page profiles must not reuse titles')
  assert.equal(new Set(bestPageDescriptions).size, canonicalBestPageSlugs.length, 'canonical best-page profiles must not reuse descriptions')

  assertCommercialIntent(getBestPageCommercialIntent('garage-smart-locks'), 'fallback best page')
  assertCalculatorPathways(getBestPageCalculatorPathways('garage-smart-locks'), 'fallback best page')
  assert.deepEqual(getBestPageFaqs('garage-smart-locks', [{ question: 'Fallback question?', answer: 'Fallback answer.' }]), [{ question: 'Fallback question?', answer: 'Fallback answer.' }], 'fallback best page must preserve supplied DB FAQs')

  const bestPage = readFileSync('app/best/[slug]/page.tsx', 'utf8')
  assert.match(bestPage, /Best For, Avoid If, Evidence Needed/, 'best page must render commercial intent block')
  assert.match(bestPage, /Validate This Shortlist With Tools/, 'best page must render calculator pathways above product list')
  assert.match(bestPage, /calculatorPathways\.map/, 'best page must render configured calculator pathways')
  assert.match(bestPage, /getBestPageFaqs\(slug, pageData\.faqs\)/, 'best page must prefer profile FAQs over legacy DB FAQs')
  assert.doesNotMatch(bestPage, /pageData\.faqs\.map/, 'best page must not directly render legacy DB FAQs')
  assert.match(bestPage, /function getProductEvidenceSummary/, 'best page must generate product summaries from structured evidence')
  assert.match(bestPage, /description: getProductEvidenceSummary\(product\)/, 'best page Product schema must use structured evidence summaries')
  assert.doesNotMatch(bestPage, /\{product\.description\}/, 'best page must not directly render legacy product descriptions')

  const comparePage = readFileSync('app/compare/[slug]/page.tsx', 'utf8')
  assert.match(comparePage, /Best For, Avoid If, Evidence Needed/, 'compare page must render commercial intent block')
  assert.match(comparePage, /Validate This Comparison With Tools/, 'compare page must render calculator pathways above product list')
  assert.match(comparePage, /commercialIntent\.map/, 'compare page must render configured commercial intent blocks')
}

main()
