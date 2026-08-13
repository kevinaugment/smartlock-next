#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE_ORIGIN = 'https://www.slockhub.com'
const DEFAULT_PERFORMANCE_CSV = '/Users/luokun/Downloads/https___www.slockhub.com_-Performance-on-Search-2026-08-06/网页.csv'
const DEFAULT_OUTPUT = 'analysis/gsc/2026-08-13_url-inspection-priority.md'

const TECHNICAL_VERIFICATION_URLS = [
  ['Live test only', 'https://www.slockhub.com/sitemap.xml', 'Stable 200. No partial sitemap on DB failure.'],
  ['Live test only', 'https://www.slockhub.com/compare/weiser-vs-schlage', '301 to `/compare/schlage-vs-weiser`.'],
  ['Live test only', 'https://www.slockhub.com/compare/schlage-vs-weiser', '200, self-canonical.'],
  ['Live test only', 'https://www.slockhub.com/brands/wrong-brand/yale-assure-lock-2-plus', '404/noindex/no canonical. Do not request indexing.'],
  ['Live test only', 'https://www.slockhub.com/resources/glossary', '200, self-canonical.'],
  ['Live test only', 'https://www.slockhub.com/resources/buying-guide', '200, self-canonical.'],
]

const PRODUCT_SAMPLE_LIMIT = 5
const SHORT_RESOURCE_SAMPLE_LIMIT = 5
const CURRENT_SITEMAP_COMPARE_URLS = 1081

function readSourceText(filePath) {
  return readFileSync(resolve(filePath), 'utf8')
}

function parseCsv(source) {
  const rows = []
  let row = []
  let cell = ''
  let quoted = false

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index]
    const next = source[index + 1]

    if (char === '"' && quoted && next === '"') {
      cell += '"'
      index += 1
      continue
    }
    if (char === '"') {
      quoted = !quoted
      continue
    }
    if (char === ',' && !quoted) {
      row.push(cell)
      cell = ''
      continue
    }
    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') index += 1
      row.push(cell)
      if (row.some((value) => value.trim() !== '')) rows.push(row)
      row = []
      cell = ''
      continue
    }
    cell += char
  }

  if (cell || row.length > 0) {
    row.push(cell)
    if (row.some((value) => value.trim() !== '')) rows.push(row)
  }
  return rows
}

function readCsvObjects(filePath) {
  if (!existsSync(filePath)) return []
  const rows = parseCsv(readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''))
  if (rows.length === 0) return []
  const [headers, ...records] = rows
  return records.map((record) => Object.fromEntries(headers.map((header, index) => [header.trim(), record[index]?.trim() || ''])))
}

function normalizeUrl(value) {
  if (!value) return null
  try {
    const parsed = new URL(value, SITE_ORIGIN)
    if (parsed.origin !== SITE_ORIGIN) return null
    parsed.hash = ''
    parsed.search = ''
    parsed.pathname = parsed.pathname.replace(/\/+$/, '') || '/'
    return parsed.href
  } catch {
    return null
  }
}

function parseNumber(value) {
  return Number(String(value || '').replace(/[,%\s]/g, '')) || 0
}

function classifyTemplate(url) {
  const pathname = new URL(url).pathname
  if (pathname === '/') return 'core-hub'
  if (pathname.startsWith('/compare/')) return 'compare'
  if (/^\/brands\/[^/]+\/[^/]+$/.test(pathname)) return 'product'
  if (/^\/brands\/[^/]+$/.test(pathname)) return 'brand'
  if (pathname.startsWith('/articles/resources/')) return 'short-resource-candidate'
  if (pathname.startsWith('/articles/')) return 'article'
  if (pathname.startsWith('/calculators/')) return 'calculator'
  if (pathname.startsWith('/best/')) return 'best'
  if (pathname.startsWith('/protocols/')) return 'protocol'
  if (pathname.startsWith('/resources')) return 'resource-hub'
  return 'static-or-hub'
}

function parseCompareHref(url, comparisonSources) {
  const pathname = new URL(url).pathname
  const match = pathname.match(/^\/compare\/(.+)-vs-(.+)$/)
  if (!match) return null
  const canonicalPath = getCanonicalComparisonHref(match[1], match[2], comparisonSources)
  return {
    slugs: [match[1], match[2]],
    canonicalUrl: `${SITE_ORIGIN}${canonicalPath}`,
    sourceUrl: url,
    isCanonical: pathname === canonicalPath,
  }
}

function getComparisonPairKey(slugs) {
  return [...slugs].sort().join('::')
}

function readComparisonSources() {
  const source = readSourceText('lib/seo/priority-comparisons.ts')
  const fallbackOrderSource = source.match(/const comparisonFallbackBrandOrder = \[([\s\S]*?)\]/)?.[1] || ''
  const fallbackOrder = Array.from(fallbackOrderSource.matchAll(/'([^']+)'/g)).map((match) => match[1])
  const fallbackRank = new Map(fallbackOrder.map((slug, index) => [slug, index]))
  const priorityHrefByPair = new Map()

  for (const match of source.matchAll(/href:\s*'([^']+)'[\s\S]*?slugs:\s*\['([^']+)'\s*,\s*'([^']+)'\]/g)) {
    priorityHrefByPair.set(getComparisonPairKey([match[2], match[3]]), match[1])
  }

  return { fallbackRank, priorityHrefByPair }
}

function orderComparisonSlugs(slug1, slug2, fallbackRank) {
  const rank1 = fallbackRank.get(slug1)
  const rank2 = fallbackRank.get(slug2)

  if (rank1 != null && rank2 != null && rank1 !== rank2) return rank1 < rank2 ? [slug1, slug2] : [slug2, slug1]
  if (rank1 != null && rank2 == null) return [slug1, slug2]
  if (rank1 == null && rank2 != null) return [slug2, slug1]

  return slug1.localeCompare(slug2) <= 0 ? [slug1, slug2] : [slug2, slug1]
}

function getCanonicalComparisonHref(slug1, slug2, comparisonSources) {
  const priorityHref = comparisonSources.priorityHrefByPair.get(getComparisonPairKey([slug1, slug2]))
  if (priorityHref) return priorityHref

  const [first, second] = orderComparisonSlugs(slug1, slug2, comparisonSources.fallbackRank)
  return `/compare/${first}-vs-${second}`
}

function readShortResourceArticles() {
  const source = readSourceText('lib/articles/registry.ts')
  return Array.from(source.matchAll(/slug:\s*'([^']+)'[\s\S]*?category:\s*'([^']+)'[\s\S]*?wordCount:\s*(\d+)/g))
    .map((match) => ({
      slug: match[1],
      category: match[2],
      wordCount: Number(match[3]),
    }))
    .filter((article) => article.category === 'resources' && article.wordCount < 600)
}

function readPerformanceRows(performanceCsv) {
  return readCsvObjects(performanceCsv).map((row) => {
    const url = normalizeUrl(row['排名靠前的网页'] || row.URL || row.url || Object.values(row)[0])
    if (!url) return null
    return {
      url,
      template: classifyTemplate(url),
      clicks: parseNumber(row['点击次数'] || row.Clicks || row.clicks),
      impressions: parseNumber(row['展示'] || row.Impressions || row.impressions),
      position: Number(String(row['排名'] || row.Position || row.position || '0').replace(',', '.')) || 0,
    }
  }).filter(Boolean)
}

function compareByDemand(a, b) {
  if (b.impressions !== a.impressions) return b.impressions - a.impressions
  if (b.clicks !== a.clicks) return b.clicks - a.clicks
  return a.url.localeCompare(b.url)
}

function groupCompareRows(performanceRows, comparisonSources) {
  const grouped = new Map()

  for (const row of performanceRows) {
    const compare = parseCompareHref(row.url, comparisonSources)
    if (!compare) continue
    const current = grouped.get(compare.canonicalUrl) || {
      url: compare.canonicalUrl,
      clicks: 0,
      impressions: 0,
      canonicalSeen: false,
      variants: [],
    }
    current.clicks += row.clicks
    current.impressions += row.impressions
    current.canonicalSeen = current.canonicalSeen || compare.isCanonical
    if (!compare.isCanonical) current.variants.push(row.url)
    grouped.set(compare.canonicalUrl, current)
  }

  return Array.from(grouped.values()).sort(compareByDemand)
}

function getHighValueNonCompareRows(performanceRows, limit) {
  return performanceRows
    .filter((row) => row.template !== 'compare')
    .sort(compareByDemand)
    .slice(0, limit)
}

function getProductRows(performanceRows) {
  return performanceRows.filter((row) => row.template === 'product').sort(compareByDemand)
}

function getShortResourceSamples(performanceRows) {
  const performanceByUrl = new Map(performanceRows.map((row) => [row.url, row]))
  return readShortResourceArticles()
    .map((article) => {
      const url = `${SITE_ORIGIN}/articles/${article.category}/${article.slug}`
      const performance = performanceByUrl.get(url) || { clicks: 0, impressions: 0, position: 0 }
      return {
        url,
        wordCount: article.wordCount,
        clicks: performance.clicks,
        impressions: performance.impressions,
        reason: performance.impressions > 0 ? 'Short resource with performance visibility.' : 'Very short resource sample.',
      }
    })
    .sort((a, b) => {
      if (b.impressions !== a.impressions) return b.impressions - a.impressions
      if (a.wordCount !== b.wordCount) return a.wordCount - b.wordCount
      return a.url.localeCompare(b.url)
    })
}

function renderRows(rows, headers, cells) {
  if (rows.length === 0) return '_No rows._'
  return [
    `| ${headers.join(' | ')} |`,
    `|${headers.map((header) => header.endsWith('.') || header === 'Priority' ? '---:' : '---').join('|')}|`,
    ...rows.map((row, index) => `| ${cells(row, index).join(' | ')} |`),
  ].join('\n')
}

function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`
}

function renderReport({ performanceCsv, performanceRows, compareRows, nonCompareRows, productRows, shortResourceRows }) {
  const nonCanonicalVariantCount = compareRows.reduce((sum, row) => sum + row.variants.length, 0)
  const comparePerformanceRows = performanceRows.filter((row) => row.template === 'compare')
  const visibleShortResources = shortResourceRows.filter((row) => row.impressions > 0)

  return `# SLockHub URL Inspection Priority Queue

- Generated: ${new Date().toISOString().slice(0, 10)}
- Rule: submit a small number of high-value and diagnostic URLs only. Do not bulk-submit all compare long-tail URLs.
- Evidence base: local source review, Coverage aggregate counts, and GSC Performance URL rows.
- Performance CSV: \`${performanceCsv}\`

## Summary

- Performance URL rows imported: ${performanceRows.length}
- Compare performance rows: ${comparePerformanceRows.length}
- Canonical compare groups: ${compareRows.length}
- Non-canonical compare variants in performance export: ${nonCanonicalVariantCount}
- Product rows with performance visibility: ${productRows.length}
- Short resource articles under 600 words: ${shortResourceRows.length}
- Short resource articles with performance visibility: ${visibleShortResources.length}

## Batch 0: Deployment And Technical Verification

Purpose: verify that the deployed static Cloudflare Pages site is serving the generated sitemap and redirects before requesting indexing.

Do not click \`Request indexing\` for diagnostic negative URLs. Use URL Inspection live test only.

${renderRows(TECHNICAL_VERIFICATION_URLS, ['Action', 'URL', 'Expected result'], (row) => [row[0], `\`${row[1]}\``, row[2]])}

Stop if any of these return Cloudflare 503, unexpected 404, wrong canonical, or no redirect.

## Batch 1: High-Value Canonical Compare Pages

Purpose: preserve existing compare demand while consolidating non-canonical variants.

Submit canonical URLs only after Batch 0 passes and URL Inspection says the canonical URL is not indexed.

${renderRows(compareRows.slice(0, 10), ['Priority', 'URL', 'Performance signal', 'Non-canonical variant seen'], (row, index) => [
    String(index + 1),
    `\`${row.url}\``,
    `${pluralize(row.impressions, 'grouped impression')}, ${pluralize(row.clicks, 'grouped click')}`,
    row.variants[0] ? `\`${row.variants[0]}\`` : '-',
  ])}

## Batch 2: Non-Canonical Compare Consolidation Checks

Purpose: confirm that Google sees old/reverse compare URLs as permanent redirects, not indexable duplicates or 404s.

Use URL Inspection live test. Do not request indexing on the non-canonical source URL.

${renderRows(compareRows.filter((row) => row.variants.length > 0).slice(0, 10), ['Source URL', 'Expected canonical target'], (row) => [
    `\`${row.variants[0]}\``,
    `\`${row.url}\``,
  ])}

## Batch 3: High-Exposure Non-Compare Pages

Purpose: protect useful pages with existing impressions across guides, best pages, calculators, products, and brands.

Submit only if Batch 0 passes and the URL is not already indexed in URL Inspection.

${renderRows(nonCompareRows.slice(0, 10), ['Priority', 'URL', 'Template', 'Performance signal'], (row, index) => [
    String(index + 1),
    `\`${row.url}\``,
    row.template,
    `${pluralize(row.impressions, 'impression')}, ${pluralize(row.clicks, 'click')}`,
  ])}

## Batch 4: Product And Brand Samples

Purpose: verify the product brand-slug fix and product-detail indexability across known exposed URLs.

${renderRows(productRows.slice(0, PRODUCT_SAMPLE_LIMIT), ['Priority', 'URL', 'Reason'], (row, index) => [
    String(index + 1),
    `\`${row.url}\``,
    index === 0 ? 'Highest product exposure in performance export.' : 'Product detail sample with performance visibility.',
  ])}

## Batch 5: Short Resource Quality Samples

Purpose: determine whether short resource pages are being excluded for quality/thin-content reasons before changing index policy.

Live inspect first. Request indexing only when the page is useful, canonical, 200, and not already indexed.

${renderRows(shortResourceRows.slice(0, SHORT_RESOURCE_SAMPLE_LIMIT), ['URL', 'Word count', 'Performance signal', 'Reason'], (row) => [
    `\`${row.url}\``,
    String(row.wordCount),
    `${pluralize(row.impressions, 'impression')}, ${pluralize(row.clicks, 'click')}`,
    row.reason,
  ])}

## Do Not Submit In Bulk

Do not bulk-submit:

- All ${CURRENT_SITEMAP_COMPARE_URLS} compare sitemap URLs.
- All ${nonCanonicalVariantCount} non-canonical compare variants found in the performance export.
- All ${shortResourceRows.length} resource articles under 600 words.
- Any URL from the \`Other 4xx\`, \`404\`, robots-blocked, duplicate-canonical, or noindex buckets until the URL-level Page Indexing export identifies the exact URLs.

## Promotion Rules After URL-Level Export Exists

When the missing Page Indexing URL examples are exported:

1. Move exact \`Other 4xx\` and \`404\` URLs into a repair queue, not an indexing request queue.
2. Move exact duplicate canonical URLs into a canonical/redirect verification queue.
3. Move exact \`Crawled - currently not indexed\` URLs into quality review by page type.
4. Move exact \`Discovered - currently not indexed\` URLs into internal-link and sitemap-discovery review.
5. Request indexing only for repaired, canonical, high-value URLs that return 200 and show correct canonical metadata.
`
}

export function generateUrlInspectionPriority({
  performanceCsv = DEFAULT_PERFORMANCE_CSV,
  output = DEFAULT_OUTPUT,
  nonCompareLimit = 10,
} = {}) {
  const resolvedPerformanceCsv = resolve(performanceCsv)
  const performanceRows = readPerformanceRows(resolvedPerformanceCsv)
  const comparisonSources = readComparisonSources()
  const compareRows = groupCompareRows(performanceRows, comparisonSources)
  const nonCompareRows = getHighValueNonCompareRows(performanceRows, nonCompareLimit)
  const productRows = getProductRows(performanceRows)
  const shortResourceRows = getShortResourceSamples(performanceRows)
  const report = renderReport({
    performanceCsv: resolvedPerformanceCsv,
    performanceRows,
    compareRows,
    nonCompareRows,
    productRows,
    shortResourceRows,
  })

  mkdirSync(resolve(output, '..'), { recursive: true })
  writeFileSync(output, report)
  return {
    output,
    performanceRows,
    compareRows,
    nonCompareRows,
    productRows,
    shortResourceRows,
  }
}

function parseArgs(argv) {
  const args = {}
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--performance-csv') args.performanceCsv = argv[++index]
    if (arg === '--output') args.output = argv[++index]
  }
  return args
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = generateUrlInspectionPriority(parseArgs(process.argv.slice(2)))
  process.stdout.write(`Imported ${result.performanceRows.length} performance rows\nGenerated ${result.compareRows.length} canonical compare groups\nWrote ${result.output}\n`)
}
