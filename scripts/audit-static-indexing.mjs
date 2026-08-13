#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE_ORIGIN = 'https://www.slockhub.com'
const DEFAULT_DIST = 'out'
const DEFAULT_OUTPUT = 'analysis/gsc/2026-08-13_static-indexing-evidence.md'

function normalizeSiteUrl(parsed) {
  if (parsed.origin !== SITE_ORIGIN) return null
  parsed.hash = ''
  parsed.search = ''
  parsed.pathname = parsed.pathname.replace(/\/+$/, '') || '/'
  if (parsed.pathname === '/index.html') parsed.pathname = '/'
  if (parsed.pathname.endsWith('/index.html')) parsed.pathname = parsed.pathname.slice(0, -'/index.html'.length) || '/'
  return parsed.href
}

function walkHtmlFiles(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) return walkHtmlFiles(fullPath)
    return entry.isFile() && entry.name.endsWith('.html') ? [fullPath] : []
  })
}

function fileToUrl(filePath, distDir) {
  let path = relative(distDir, filePath).replace(/\\/g, '/')
  if (path === 'index.html') return `${SITE_ORIGIN}/`
  if (path.endsWith('/index.html')) path = path.slice(0, -'/index.html'.length)
  else path = path.slice(0, -'.html'.length)
  return `${SITE_ORIGIN}/${path}`
}

function normalizeUrl(value, baseUrl) {
  try {
    const parsed = new URL(value.replace(/&amp;/g, '&'), baseUrl)
    return normalizeSiteUrl(parsed)
  } catch {
    return null
  }
}

function classifyUrl(url) {
  const pathname = new URL(url).pathname
  if (pathname === '/') return 'core-hub'
  if (pathname.startsWith('/compare/')) return 'compare'
  if (/^\/brands\/[^/]+\/[^/]+$/.test(pathname)) return 'product'
  if (/^\/brands\/[^/]+$/.test(pathname)) return 'brand'
  if (pathname.startsWith('/articles/resources/')) return 'short-resource'
  if (pathname.startsWith('/articles/')) return 'article'
  if (pathname.startsWith('/calculators/')) return 'calculator'
  if (pathname.startsWith('/best/')) return 'best'
  if (pathname.startsWith('/protocols/')) return 'protocol'
  if (pathname.startsWith('/resources')) return 'resource-hub'
  if (pathname.startsWith('/admin') || pathname.startsWith('/status') || pathname === '/404') return 'intentional-exclusion'
  return 'static-or-hub'
}

function readSitemapUrls(distDir) {
  const sitemapPath = join(distDir, 'sitemap.xml')
  if (!existsSync(sitemapPath)) return []
  return Array.from(readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g))
    .map((match) => normalizeUrl(match[1], SITE_ORIGIN))
    .filter(Boolean)
}

function buildLinkGraph(distDir) {
  const files = walkHtmlFiles(distDir)
  const urlByFile = new Map(files.map((file) => [file, fileToUrl(file, distDir)]))
  const existingUrls = new Set(urlByFile.values())
  const incoming = new Map(Array.from(existingUrls).map((url) => [url, new Set()]))
  const outgoing = new Map()
  const broken = []

  for (const [filePath, sourceUrl] of urlByFile.entries()) {
    const html = readFileSync(filePath, 'utf8')
    const links = new Set()
    for (const match of html.matchAll(/<a\s+[^>]*href=["']([^"']+)["']/gi)) {
      const targetUrl = normalizeUrl(match[1], sourceUrl)
      if (!targetUrl) continue
      links.add(targetUrl)
      if (existingUrls.has(targetUrl)) {
        if (targetUrl !== sourceUrl) incoming.get(targetUrl)?.add(sourceUrl)
      } else if (targetUrl !== `${SITE_ORIGIN}/`) {
        broken.push({ from: sourceUrl, to: targetUrl })
      }
    }
    outgoing.set(sourceUrl, links)
  }

  return { existingUrls, incoming, outgoing, broken }
}

function summarizeRows(rows) {
  return {
    total: rows.length,
    inSitemap: rows.filter((row) => row.inSitemap).length,
    inbound0: rows.filter((row) => row.inbound === 0).length,
    inbound1to2: rows.filter((row) => row.inbound > 0 && row.inbound < 3).length,
    inbound3plus: rows.filter((row) => row.inbound >= 3).length,
  }
}

function renderRows(rows, limit = 25) {
  if (rows.length === 0) return '_No rows._'
  const lines = ['| URL | In sitemap | Inbound | Outbound |', '|---|---:|---:|---:|']
  for (const row of rows.slice(0, limit)) {
    lines.push(`| \`${row.url}\` | ${row.inSitemap ? 'yes' : 'no'} | ${row.inbound} | ${row.outbound} |`)
  }
  if (rows.length > limit) lines.push(`| ... | ... | ... | ${rows.length - limit} more rows omitted. |`)
  return lines.join('\n')
}

function renderSummaryList(summary) {
  return [
    `- Total pages: ${summary.total}`,
    `- In XML sitemap: ${summary.inSitemap}`,
    `- 0 inbound internal links: ${summary.inbound0}`,
    `- 1-2 inbound internal links: ${summary.inbound1to2}`,
    `- 3+ inbound internal links: ${summary.inbound3plus}`,
  ].join('\n')
}

function renderReport({ distDir, sitemapUrls, rows, broken }) {
  const byType = new Map()
  for (const row of rows) {
    const group = byType.get(row.type) || []
    group.push(row)
    byType.set(row.type, group)
  }

  const compareRows = byType.get('compare') || []
  const productRows = byType.get('product') || []
  const shortResourceRows = byType.get('short-resource') || []
  const sitemapOnlyNoHtml = sitemapUrls.filter((url) => !rows.some((row) => row.url === url))

  const compareWeak = compareRows.filter((row) => row.inSitemap && row.inbound < 3)
  const productWeak = productRows.filter((row) => row.inSitemap && row.inbound < 3)
  const shortResourceWeak = shortResourceRows.filter((row) => row.inSitemap && row.inbound < 3)

  return `# Static Indexing Evidence

Generated: ${new Date().toISOString().slice(0, 10)}
Dist: \`${distDir}\`

## Summary

- HTML pages found: ${rows.length}
- XML sitemap URLs: ${sitemapUrls.length}
- Sitemap URLs missing HTML file: ${sitemapOnlyNoHtml.length}
- Internal links to missing local HTML files: ${broken.length}

## Compare Pages

${renderSummaryList(summarizeRows(compareRows))}

Compare pages in sitemap with fewer than 3 inbound links should stay out of manual URL Inspection batches unless URL-level GSC evidence or business priority justifies them.

${renderRows(compareWeak)}

## Product Pages

${renderSummaryList(summarizeRows(productRows))}

Product pages are stronger sitemap candidates when they have brand/category/product-neighbor links and correct self-canonical metadata.

${renderRows(productWeak)}

## Short Resource Pages

${renderSummaryList(summarizeRows(shortResourceRows))}

Short resource pages under weak inbound support are quality-review candidates. Upgrade, merge, or noindex only after URL-level GSC Page Indexing evidence identifies the exact URLs.

${renderRows(shortResourceWeak)}

## Broken Internal Link Sample

${broken.length === 0 ? '_No broken internal links detected._' : broken.slice(0, 40).map((row) => `- \`${row.from}\` -> \`${row.to}\``).join('\n')}
`
}

export function auditStaticIndexing({
  dist = DEFAULT_DIST,
  output = DEFAULT_OUTPUT,
} = {}) {
  const distDir = resolve(dist)
  const sitemapUrls = readSitemapUrls(distDir)
  const sitemapSet = new Set(sitemapUrls)
  const graph = buildLinkGraph(distDir)
  const rows = Array.from(graph.existingUrls).map((url) => ({
    url,
    type: classifyUrl(url),
    inSitemap: sitemapSet.has(url),
    inbound: graph.incoming.get(url)?.size || 0,
    outbound: graph.outgoing.get(url)?.size || 0,
  })).sort((a, b) => {
    if (a.type !== b.type) return a.type.localeCompare(b.type)
    if (a.inbound !== b.inbound) return a.inbound - b.inbound
    return a.url.localeCompare(b.url)
  })

  const report = renderReport({ distDir, sitemapUrls, rows, broken: graph.broken })
  mkdirSync(dirname(resolve(output)), { recursive: true })
  writeFileSync(output, report)
  return { output, sitemapUrls, rows, broken: graph.broken }
}

function parseArgs(argv) {
  const args = {}
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--dist') args.dist = argv[++index]
    if (arg === '--output') args.output = argv[++index]
  }
  return args
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = auditStaticIndexing(parseArgs(process.argv.slice(2)))
  process.stdout.write(`Audited ${result.rows.length} static pages\nSitemap URLs: ${result.sitemapUrls.length}\nBroken internal links: ${result.broken.length}\nWrote ${result.output}\n`)
}
