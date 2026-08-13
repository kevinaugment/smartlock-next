#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE_ORIGIN = 'https://www.slockhub.com'
const DEFAULT_DETAILS_DIR = '/Users/luokun/Downloads/https___www.slockhub.com_-Coverage-2026-08-13-url-details'
const DEFAULT_PERFORMANCE_CSV = '/Users/luokun/Downloads/https___www.slockhub.com_-Performance-on-Search-2026-08-06/网页.csv'
const DEFAULT_OUTPUT = 'analysis/gsc/2026-08-13_page-indexing-url-queues.md'

const ISSUE_ALIASES = [
  ['crawled-not-indexed', ['crawled', '已抓取']],
  ['discovered-not-indexed', ['discovered', '已发现']],
  ['other-4xx', ['other 4xx', '其他 4xx']],
  ['not-found-404', ['404', 'not found', '未找到']],
  ['duplicate-canonical', ['duplicate', 'canonical', '重复', '规范']],
  ['robots-blocked', ['robots', 'robots.txt', '屏蔽']],
  ['noindex', ['noindex']],
]

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

function detectUrl(record) {
  for (const [key, value] of Object.entries(record)) {
    const lowered = key.toLowerCase()
    if (lowered === 'url' || lowered.includes('url') || lowered.includes('网页') || lowered.includes('页面')) {
      const url = normalizeUrl(value)
      if (url) return url
    }
  }
  for (const value of Object.values(record)) {
    const url = normalizeUrl(value)
    if (url) return url
  }
  return null
}

function detectIssueFromName(fileName) {
  const lowered = fileName.toLowerCase()
  return ISSUE_ALIASES.find(([, aliases]) => aliases.some((alias) => lowered.includes(alias.toLowerCase())))?.[0] || 'unknown'
}

function detectIssue(record, fileName) {
  const haystack = [fileName, ...Object.keys(record), ...Object.values(record)].join(' ').toLowerCase()
  return ISSUE_ALIASES.find(([, aliases]) => aliases.some((alias) => haystack.includes(alias.toLowerCase())))?.[0] || detectIssueFromName(fileName)
}

function parseNumber(value) {
  return Number(String(value || '').replace(/[,%\s]/g, '')) || 0
}

function readPerformanceMap(filePath) {
  if (!existsSync(filePath)) return new Map()
  const rows = readCsvObjects(filePath)
  const map = new Map()
  for (const row of rows) {
    const url = normalizeUrl(row['排名靠前的网页'] || row.URL || row.url || Object.values(row)[0])
    if (!url) continue
    map.set(url, {
      clicks: parseNumber(row['点击次数'] || row.Clicks || row.clicks),
      impressions: parseNumber(row['展示'] || row.Impressions || row.impressions),
      position: Number(String(row['排名'] || row.Position || row.position || '0').replace(',', '.')) || 0,
    })
  }
  return map
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
  if (pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.startsWith('/status')) return 'intentional-exclusion'
  return 'static-or-hub'
}

function actionFor(issue, template, performance) {
  if (issue === 'other-4xx' || issue === 'not-found-404') return 'repair-or-redirect; do not request indexing'
  if (issue === 'duplicate-canonical') return 'verify canonical/301 target; inspect target URL only'
  if (issue === 'robots-blocked' || issue === 'noindex') return template === 'intentional-exclusion' ? 'confirm intentional exclusion' : 'investigate possible accidental block'
  if (issue === 'crawled-not-indexed') {
    if (template === 'short-resource-candidate') return 'quality review: upgrade, merge, or noindex after inspection'
    if (template === 'compare' && performance?.impressions > 0) return 'inspect canonical high-value compare; submit only if 200/self-canonical'
    return 'quality/internal-link review before submission'
  }
  if (issue === 'discovered-not-indexed') return 'strengthen internal links and sitemap discovery; submit only priority URLs'
  return 'classify manually'
}

function loadUrlDetails(detailsDir, performanceMap) {
  if (!existsSync(detailsDir)) {
    return {
      rows: [],
      status: {
        state: 'missing-directory',
        message: 'The Page Indexing URL detail directory does not exist yet.',
        files: [],
      },
    }
  }
  const files = readdirSync(detailsDir).filter((fileName) => fileName.toLowerCase().endsWith('.csv'))
  if (files.length === 0) {
    return {
      rows: [],
      status: {
        state: 'missing-csv',
        message: 'The Page Indexing URL detail directory exists, but it contains no CSV files.',
        files,
      },
    }
  }

  const rows = []
  const aggregateFiles = []
  for (const fileName of files) {
    const filePath = join(detailsDir, fileName)
    const records = readCsvObjects(filePath)
    const keys = new Set(records.flatMap((record) => Object.keys(record)))
    const looksAggregateCoverage = keys.has('原因') && keys.has('来源') && keys.has('验证') && keys.has('网页')
    const looksChart = keys.has('日期') && keys.has('未编入索引') && keys.has('已编入索引')
    const looksMetadata = keys.has('资源') && keys.has('值')
    if (looksAggregateCoverage || looksChart || looksMetadata) {
      aggregateFiles.push(fileName)
      continue
    }

    for (const record of records) {
      const url = detectUrl(record)
      if (!url) continue
      const issue = detectIssue(record, fileName)
      const template = classifyTemplate(url)
      const performance = performanceMap.get(url) || { clicks: 0, impressions: 0, position: 0 }
      rows.push({
        url,
        issue,
        template,
        sourceFile: fileName,
        performance,
        action: actionFor(issue, template, performance),
      })
    }
  }
  if (aggregateFiles.length > 0 && rows.length === 0) {
    return {
      rows,
      status: {
        state: 'aggregate-only',
        message: 'Only aggregate Coverage CSV files were found. Export URL-level Page Indexing issue examples instead.',
        files,
        aggregateFiles,
      },
    }
  }
  return {
    rows,
    status: {
      state: 'ok',
      message: rows.length > 0 ? 'URL-level Page Indexing rows were imported.' : 'CSV files were found, but no SLockHub URL rows could be detected.',
      files,
      aggregateFiles,
    },
  }
}

function groupBy(rows, keyFn) {
  return rows.reduce((groups, row) => {
    const key = keyFn(row)
    if (!groups[key]) groups[key] = []
    groups[key].push(row)
    return groups
  }, {})
}

function sortRows(rows) {
  return [...rows].sort((a, b) => {
    if (b.performance.impressions !== a.performance.impressions) return b.performance.impressions - a.performance.impressions
    return a.url.localeCompare(b.url)
  })
}

function renderTable(rows, limit = 40) {
  if (rows.length === 0) return '_No rows._'
  const lines = ['| URL | Issue | Template | Impr. | Clicks | Action |', '|---|---|---|---:|---:|---|']
  for (const row of sortRows(rows).slice(0, limit)) {
    lines.push(`| \`${row.url}\` | ${row.issue} | ${row.template} | ${row.performance.impressions} | ${row.performance.clicks} | ${row.action} |`)
  }
  if (rows.length > limit) lines.push(`| ... | ... | ... | ... | ... | ${rows.length - limit} more rows omitted from this preview. |`)
  return lines.join('\n')
}

function renderEvidenceStatus(status) {
  const lines = [
    '## Evidence Status',
    '',
    `- State: \`${status.state}\``,
    `- Message: ${status.message}`,
  ]
  if (status.files?.length) lines.push(`- CSV files seen: ${status.files.map((file) => `\`${file}\``).join(', ')}`)
  if (status.aggregateFiles?.length) lines.push(`- Aggregate-only files ignored: ${status.aggregateFiles.map((file) => `\`${file}\``).join(', ')}`)
  if (status.state !== 'ok') {
    lines.push('- Action required: export URL-level rows from each Search Console Page Indexing issue bucket before URL Inspection or noindex decisions.')
  }
  return lines.join('\n')
}

function renderReport({ rows, detailsDir, status }) {
  const byIssue = groupBy(rows, (row) => row.issue)
  const byTemplate = groupBy(rows, (row) => row.template)
  const repairRows = rows.filter((row) => ['other-4xx', 'not-found-404'].includes(row.issue))
  const canonicalRows = rows.filter((row) => row.issue === 'duplicate-canonical')
  const exclusionRows = rows.filter((row) => ['robots-blocked', 'noindex'].includes(row.issue))
  const qualityRows = rows.filter((row) => ['crawled-not-indexed', 'discovered-not-indexed'].includes(row.issue))
  const submitCandidates = rows.filter((row) =>
    ['crawled-not-indexed', 'discovered-not-indexed'].includes(row.issue) &&
    row.performance.impressions > 0 &&
    !['short-resource-candidate'].includes(row.template)
  )

  return `# GSC Page Indexing URL Queues

Generated: ${new Date().toISOString().slice(0, 10)}
Source folder: \`${detailsDir}\`

## Summary

- URL detail rows imported: ${rows.length}
- Issue buckets: ${Object.entries(byIssue).map(([issue, issueRows]) => `${issue}: ${issueRows.length}`).join(', ') || 'none'}
- Template buckets: ${Object.entries(byTemplate).map(([template, templateRows]) => `${template}: ${templateRows.length}`).join(', ') || 'none'}

If this report has 0 rows, the Page Indexing URL-level CSV files are still missing. Export the URL examples for each issue bucket from Search Console and save them into the source folder above.

${renderEvidenceStatus(status)}

## Repair Queue: 4xx / 404

These URLs should be repaired, redirected, or intentionally left as 404/410. Do not request indexing for these source URLs.

${renderTable(repairRows)}

## Canonical / Duplicate Queue

Verify the Google-selected canonical and inspect the canonical target, not the duplicate source URL.

${renderTable(canonicalRows)}

## Robots / Noindex Queue

Confirm these are intentional admin/API/status surfaces. Anything else is a possible accidental block.

${renderTable(exclusionRows)}

## Quality And Discovery Queue

Use these rows to decide which compare/product/resource pages need stronger content, internal links, merging, or noindex.

${renderTable(qualityRows, 80)}

## Submit Candidate Queue

Only submit repaired, canonical, high-value URLs that return 200 and show correct self-canonical metadata. This queue is performance-prioritized and excludes short-resource candidates by default.

${renderTable(submitCandidates, 40)}
`
}

export function generatePageIndexingQueues({
  detailsDir = DEFAULT_DETAILS_DIR,
  performanceCsv = DEFAULT_PERFORMANCE_CSV,
  output = DEFAULT_OUTPUT,
} = {}) {
  const resolvedDetailsDir = resolve(detailsDir)
  const performanceMap = readPerformanceMap(performanceCsv)
  const { rows, status } = loadUrlDetails(resolvedDetailsDir, performanceMap)
  const report = renderReport({ rows, detailsDir: resolvedDetailsDir, status })
  mkdirSync(resolve(output, '..'), { recursive: true })
  writeFileSync(output, report)
  return { detailsDir: resolvedDetailsDir, output, rows, status }
}

function parseArgs(argv) {
  const args = {}
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--details-dir') args.detailsDir = argv[++index]
    if (arg === '--performance-csv') args.performanceCsv = argv[++index]
    if (arg === '--output') args.output = argv[++index]
  }
  return args
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = generatePageIndexingQueues(parseArgs(process.argv.slice(2)))
  process.stdout.write(`Imported ${result.rows.length} URL detail rows from ${basename(result.detailsDir)}\nEvidence status: ${result.status.state}\nWrote ${result.output}\n`)
}
