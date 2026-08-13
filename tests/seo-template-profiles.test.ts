import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { getComparisonSeoProfile } from '../lib/seo/comparison-page-seo'
import type { ComparisonCaveats } from '../lib/seo/comparison-page-seo'
import {
  getBestPageCalculatorPathways,
  getBestPageCommercialIntent,
  getBestPageEvidence,
  getBestPageFaqs,
  getBestPageSeoProfile,
} from '../lib/seo/best-page-seo'
import {
  getCanonicalComparisonHref,
  getBrandComparisonLinks,
  getComparisonPairKey,
  getRelatedComparisonLinks,
  priorityComparisonLinks,
} from '../lib/seo/priority-comparisons'
import {
  coreHubLinks,
  priorityBestPageLinks,
  strategicSeoPathwayLinks,
} from '../lib/seo/priority-pages'
import type { Brand, ProductWithBrand } from '../lib/db/brand-models'

function brand(slug: string, name: string): Brand {
  return {
    id: 1,
    name,
    slug,
    description: `${name} smart locks`,
    supports_wifi: true,
    supports_zigbee: false,
    supports_zwave: false,
    supports_thread: false,
    supports_matter: false,
    supports_bluetooth: true,
    target_market: 'Residential',
    price_tier: 'mid',
    rating: 4.2,
    featured: false,
    status: 'published',
    display_order: 1,
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
    description: '',
    price_usd: 19900,
    battery_life_months: 12,
    protocol: 'wifi',
    supports_matter: false,
    has_fingerprint: false,
    has_keypad: true,
    has_auto_lock: true,
    has_auto_unlock: false,
    has_voice_control: false,
    has_guest_codes: true,
    has_activity_log: true,
    has_physical_key: true,
    has_remote_access: true,
    ansi_grade: '2',
    ul_listed: false,
    operations_per_day: 10,
    rating: 4.3,
    review_count: 100,
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

function assertComparisonDecisionProfile(
  profile: {
    chooseReasons: { brand1: string[]; brand2: string[] }
    caveats: ComparisonCaveats
    evidence: { lastVerified: string; sourceBoundary: string; dataLimitations: string }
  },
  label: string
) {
  assert.equal(profile.chooseReasons.brand1.length, 3, `${label} must define three brand1 choice reasons`)
  assert.equal(profile.chooseReasons.brand2.length, 3, `${label} must define three brand2 choice reasons`)
  for (const reason of [...profile.chooseReasons.brand1, ...profile.chooseReasons.brand2]) {
    assertMeaningfulText(reason, `${label} choice reason`)
  }
  for (const [key, value] of Object.entries(profile.caveats)) {
    assertMeaningfulText(value, `${label} ${key} caveat`)
  }
  assert.ok(profile.evidence.lastVerified.length >= 6, `${label} evidence must include a visible review date`)
  assertMeaningfulText(profile.evidence.sourceBoundary, `${label} source boundary`)
  assertMeaningfulText(profile.evidence.dataLimitations, `${label} data limitations`)
}

function assertBestPageEvidence(evidence: {
  lastVerified: string
  inclusionRule: string
  exclusionRule: string
  sourceBoundary: string
  dataLimitations: string
}, label: string) {
  assert.ok(evidence.lastVerified.length >= 6, `${label} evidence must include a visible review date`)
  assertMeaningfulText(evidence.inclusionRule, `${label} inclusion rule`)
  assertMeaningfulText(evidence.exclusionRule, `${label} exclusion rule`)
  assertMeaningfulText(evidence.sourceBoundary, `${label} source boundary`)
  assertMeaningfulText(evidence.dataLimitations, `${label} data limitations`)
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

function collectSourceFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) continue
    const path = join(dir, entry)
    const stats = statSync(path)
    if (stats.isDirectory()) {
      files.push(...collectSourceFiles(path))
      continue
    }
    if (/\.(ts|tsx|md|mdx|json)$/.test(path)) files.push(path)
  }
  return files
}

function assertInternalCompareLinksAreCanonical() {
  const sourceFiles = ['app', 'components', 'lib']
    .filter(existsSync)
    .flatMap(collectSourceFiles)
    .filter(path => !path.endsWith('lib/articles/content.generated.ts'))

  const violations: string[] = []
  const compareHrefPattern = /\/compare\/([a-z0-9-]+)-vs-([a-z0-9-]+)/g

  for (const file of sourceFiles) {
    const text = readFileSync(file, 'utf8')
    let match: RegExpExecArray | null
    while ((match = compareHrefPattern.exec(text))) {
      const href = `/compare/${match[1]}-vs-${match[2]}`
      const canonicalHref = getCanonicalComparisonHref(match[1], match[2])
      if (href !== canonicalHref) {
        violations.push(`${file}: ${href} should be ${canonicalHref}`)
      }
    }
  }

  assert.deepEqual(violations, [], 'internal static compare links must use canonical comparison URLs')
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
  assert.deepEqual(
    priorityBestPageLinks.map(link => link.href).sort(),
    publishedTopNPageSlugs.map(slug => `/best/${slug}`).sort(),
    'priority best-page links must cover exactly the published top_n_pages slugs used for sitemap fallback'
  )
  for (const href of [
    '/calculators',
    '/protocols',
    '/resources',
    '/articles/security/smart-lock-security-complete-analysis',
    '/best/smart-locks-with-longest-battery-life',
    '/articles/guides/door-compatibility-guide',
  ]) {
    assert.ok(strategicSeoPathwayLinks.some(link => link.href === href), `${href} must be present in shared strategic SEO pathways`)
  }
  assert.ok(coreHubLinks.some(link => link.href === '/resources'), 'core hub links must expose the resources hub, not only resource subpages')
  assertInternalCompareLinksAreCanonical()

  const comparisonPairs = [
    ['nuki', 'Nuki', 'tedee', 'Tedee'],
    ['schlage', 'Schlage', 'weiser', 'Weiser'],
    ['kwikset', 'Kwikset', 'defiant', 'Defiant'],
    ['schlage', 'Schlage', 'defiant', 'Defiant'],
    ['kwikset', 'Kwikset', 'schlage', 'Schlage'],
    ['samsung', 'Samsung', 'xiaomi', 'Xiaomi'],
    ['tedee', 'Tedee', 'august', 'August'],
    ['schlage', 'Schlage', 'veise', 'Veise'],
    ['veise', 'Veise', 'schlage', 'Schlage'],
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
    assertComparisonDecisionProfile(profile, `${slug1}-vs-${slug2}`)
    assertMeaningfulText(profile.faq.question, `${slug1}-vs-${slug2} FAQ question`)
    assertMeaningfulText(profile.faq.answer, `${slug1}-vs-${slug2} FAQ answer`)
  }

  const requiredPriorityComparisonHrefs = [
    '/compare/schlage-vs-weiser',
    '/compare/schlage-vs-defiant',
    '/compare/kwikset-vs-defiant',
    '/compare/nuki-vs-tedee',
    '/compare/kwikset-vs-schlage',
    '/compare/samsung-vs-xiaomi',
    '/compare/tedee-vs-august',
    '/compare/veise-vs-schlage',
    '/compare/lockly-vs-schlage',
    '/compare/eufy-vs-simplisafe',
  ]
  assert.equal(
    new Set(priorityComparisonLinks.map(link => link.href)).size,
    priorityComparisonLinks.length,
    'priority comparison links must not duplicate hrefs'
  )
  assert.equal(
    new Set(priorityComparisonLinks.map(link => getComparisonPairKey(link.slugs))).size,
    priorityComparisonLinks.length,
    'priority comparison links must not expose duplicate directions for the same brand pair'
  )
  for (const link of priorityComparisonLinks) {
    assert.equal(
      link.href,
      getCanonicalComparisonHref(link.slugs[0], link.slugs[1]),
      `${link.href} must be the canonical internal URL for its brand pair`
    )
  }
  for (const href of requiredPriorityComparisonHrefs) {
    const link = priorityComparisonLinks.find(item => item.href === href)
    assert.ok(link, `${href} must exist in the shared priority comparison source`)
    assert.equal(link?.source, 'gsc', `${href} must be marked as a GSC priority comparison`)
    assertMeaningfulText(link?.detail || '', `${href} priority detail`)
  }
  const duplicateDirectionChecks = [
    ['schlage', 'kwikset', '/compare/kwikset-vs-schlage'],
    ['august', 'tedee', '/compare/tedee-vs-august'],
    ['schlage', 'veise', '/compare/veise-vs-schlage'],
    ['schlage', 'lockly', '/compare/lockly-vs-schlage'],
    ['yale', 'aqara', '/compare/aqara-vs-yale'],
    ['switchbot', 'nuki', '/compare/nuki-vs-switchbot'],
  ] as const
  for (const [slug1, slug2, expectedHref] of duplicateDirectionChecks) {
    assert.equal(getCanonicalComparisonHref(slug1, slug2), expectedHref, `${slug1}/${slug2} must resolve to the priority URL`)
    assert.equal(getCanonicalComparisonHref(slug2, slug1), expectedHref, `${slug2}/${slug1} must resolve to the same priority URL`)
  }
  const samsungRelatedLinks = getRelatedComparisonLinks(['samsung', 'xiaomi'], '/compare/samsung-vs-xiaomi', 8)
  assert.equal(samsungRelatedLinks.some(link => link.href === '/compare/samsung-vs-xiaomi'), false, 'related comparison links must exclude the current page')
  const reverseKwiksetSchlageRelatedLinks = getRelatedComparisonLinks(['schlage', 'kwikset'], '/compare/schlage-vs-kwikset', 8)
  assert.equal(reverseKwiksetSchlageRelatedLinks.some(link => link.href === '/compare/kwikset-vs-schlage'), false, 'related comparison links must exclude the same unordered pair even when the current URL is a reverse direction')
  assert.ok(getBrandComparisonLinks('samsung', 3).some(link => link.href === '/compare/samsung-vs-xiaomi'), 'Samsung brand page must link to the Samsung vs Xiaomi priority comparison')
  for (const link of getBrandComparisonLinks('defiant', 5)) {
    assert.equal(link.href, getCanonicalComparisonHref(link.slugs[0], link.slugs[1]), `${link.href} brand fallback link must use the canonical comparison URL`)
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
    assertBestPageEvidence(getBestPageEvidence(slug), slug)
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
  assert.match(bestPage, /Review, Inclusion, Data Limits/, 'best page must render visible evidence boundaries')
  assert.match(bestPage, /getBestPageEvidence\(slug\)/, 'best page must load shared evidence boundaries')
  assert.match(bestPage, /Validate This Shortlist With Tools/, 'best page must render calculator pathways above product list')
  assert.match(bestPage, /calculatorPathways\.map/, 'best page must render configured calculator pathways')
  assert.match(bestPage, /getBestPageFaqs\(slug, pageData\.faqs\)/, 'best page must prefer profile FAQs over legacy DB FAQs')
  assert.doesNotMatch(bestPage, /pageData\.faqs\.map/, 'best page must not directly render legacy DB FAQs')
  assert.match(bestPage, /function getProductEvidenceSummary/, 'best page must generate product summaries from structured evidence')
  assert.match(bestPage, /description: getProductEvidenceSummary\(product\)/, 'best page Product schema must use structured evidence summaries')
  assert.doesNotMatch(bestPage, /\{product\.description\}/, 'best page must not directly render legacy product descriptions')

  const comparePage = readFileSync('app/compare/[slug]/page.tsx', 'utf8')
  assert.match(comparePage, /getCanonicalComparisonHref/, 'compare static params must use canonical comparison URLs')
  assert.match(comparePage, /const canonicalSlug = getCanonicalComparisonHref\(parsed\.slug1, parsed\.slug2\)\.replace\('\/compare\/', ''\)/, 'compare detail route must calculate the canonical slug before rendering')
  assert.match(comparePage, /if \(canonicalSlug !== slug\) return null/, 'compare detail route must 404 reverse-direction duplicate URLs')
  assert.match(comparePage, /ProductModel\.getForComparisonByBrandSlugs\(brandSlugs\)/, 'compare detail route must avoid loading the full product catalog per request')
  assert.match(comparePage, /Best For, Avoid If, Evidence Needed/, 'compare page must render commercial intent block')
  assert.match(comparePage, /Validate This Comparison With Tools/, 'compare page must render calculator pathways above product list')
  assert.match(comparePage, /commercialIntent\.map/, 'compare page must render configured commercial intent blocks')
  assert.match(comparePage, /seoProfile\.chooseReasons\.brand1\.map/, 'compare page must render pair-specific brand1 choice reasons')
  assert.match(comparePage, /Door, Region, Model Caveats/, 'compare page must render pair-specific caveats')
  assert.match(comparePage, /Evidence and Update Boundary/, 'compare page must render visible evidence boundaries')
  assert.match(comparePage, /Related Brand Matchups/, 'compare page must render related comparison silo links')

  const compareHub = readFileSync('app/compare/page.tsx', 'utf8')
  assert.match(compareHub, /priorityComparisonLinks\.map/, 'compare hub must render shared priority comparison links')

  const brandPage = readFileSync('app/brands/[slug]/page.tsx', 'utf8')
  assert.match(brandPage, /getBrandComparisonLinks\(brandSlug, 3\)/, 'brand pages must use shared priority comparison links')

  const productPage = readFileSync('app/brands/[slug]/[product]/page.tsx', 'utf8')
  assert.match(productPage, /ProductModel\.getByBrandAndSlug\(brandSlug, productSlug\)/, 'product detail metadata and page body must query products with the brand slug constraint')
  assert.match(productPage, /ProductModel\.getByBrandSlug\(brandSlug\)/, 'product detail pages must query only sibling products for the active brand')
  assert.match(productPage, /getCanonicalComparisonHref\(product\.brand_slug, competitor\)/, 'product detail comparison links must point directly to canonical comparison URLs')
  assert.doesNotMatch(productPage, /getProductsForDetail = cache\(\(\) => ProductModel\.getAllForComparison\(\)\)/, 'product detail pages must not load the full comparison product catalog per request')

  const seoPathways = readFileSync('components/seo/SeoPathways.tsx', 'utf8')
  assert.match(seoPathways, /strategicSeoPathwayLinks/, 'SeoPathways must render shared strategic SEO pathways')
  assert.match(seoPathways, /Research Hubs/, 'SeoPathways must label shared research hub links')

  const articlePage = readFileSync('app/articles/[category]/[slug]/page.tsx', 'utf8')
  assert.match(articlePage, /resolveCalculatorRouteSlug\(toolSlug\)/, 'article pages must resolve relatedTools to crawlable calculator routes')
  assert.match(articlePage, /Tools for This Topic/, 'article pages must render related tool links from article metadata')

  const middleware = readFileSync('middleware.ts', 'utf8')
  assert.match(middleware, /getCanonicalComparisonHref\(match\[1\], match\[2\]\)/, 'middleware must canonicalize compare route direction')
  assert.match(middleware, /NextResponse\.redirect\(new URL\(canonicalPath, request\.url\), 301\)/, 'middleware must redirect reverse compare URLs with a 301')

  const glossaryLayout = readFileSync('app/resources/glossary/layout.tsx', 'utf8')
  const buyingGuideLayout = readFileSync('app/resources/buying-guide/layout.tsx', 'utf8')
  assert.match(glossaryLayout, /canonical: '\/resources\/glossary'/, 'glossary resource page must declare its own canonical')
  assert.match(buyingGuideLayout, /canonical: '\/resources\/buying-guide'/, 'buying guide resource page must declare its own canonical')

  const humanSitemap = readFileSync('app/sitemap/page.tsx', 'utf8')
  assert.match(humanSitemap, /Priority Brand Comparisons/, 'human sitemap must expose priority comparison links')
  assert.match(humanSitemap, /coreHubLinks\.map/, 'human sitemap must render shared core hub links')
  assert.match(humanSitemap, /priorityBestPageLinks\.map/, 'human sitemap must render shared priority best-page links')

  const xmlSitemap = readFileSync('app/sitemap.ts', 'utf8')
  assert.match(xmlSitemap, /calculatorRouteSlugs\.map/, 'XML sitemap must use the shared calculator slug registry')
  assert.match(xmlSitemap, /getCanonicalComparisonHref/, 'XML sitemap must canonicalize dynamic brand comparison URLs')
  assert.match(xmlSitemap, /priorityComparisonLinks\.map/, 'XML sitemap must include priority comparison fallback URLs')
  assert.match(xmlSitemap, /priorityBestPageLinks\.map/, 'XML sitemap must include priority best-page fallback URLs')
  assert.match(xmlSitemap, /uniqueSitemapPages/, 'XML sitemap must de-duplicate static fallback and dynamic DB URLs')
  assert.match(xmlSitemap, /TopNPageModel\.getAllForSeo\(\)/, 'XML sitemap must use DB lastmod data for best pages')
  assert.match(xmlSitemap, /SITEMAP_LKG_KV_KEY/, 'XML sitemap must define a last-known-good cache key')
  assert.match(xmlSitemap, /getCachedSitemapPages/, 'XML sitemap must read last-known-good pages when generation fails')
  assert.match(xmlSitemap, /cacheSitemapPages\(pages\)/, 'XML sitemap must cache the full generated sitemap after successful DB-backed generation')
  assert.match(xmlSitemap, /if \(cachedPages\) return cachedPages/, 'XML sitemap must return last-known-good pages before failing closed')
  assert.match(xmlSitemap, /throw error/, 'XML sitemap must still fail closed when DB generation fails and no last-known-good sitemap exists')
  assert.doesNotMatch(xmlSitemap, /catch \{\s*\/\/ Database not available/, 'XML sitemap must not silently publish a partial sitemap when dynamic DB reads fail')
  assert.doesNotMatch(xmlSitemap, /BUILD_DATE/, 'XML sitemap must not stamp static fallback URLs with the build date')

  const packageJson = readFileSync('package.json', 'utf8')
  assert.match(packageJson, /"test:seo"/, 'package scripts must expose the SEO regression test bundle')
}

main()
