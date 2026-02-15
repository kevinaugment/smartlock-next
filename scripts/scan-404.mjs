#!/usr/bin/env node
/**
 * Deep 404 scanner: fetches sitemap, crawls internal links, reports broken URLs.
 * Usage: node scripts/scan-404.mjs
 */

const BASE = 'http://localhost:3000'
const visited = new Set()
const broken = []        // { url, status, foundOn }
const redirects = []     // { url, status, location, foundOn }
const queue = []
const MAX_PAGES = 500

// Seed: all known static + dynamic routes
const SEED_URLS = [
    '/',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/faq',
    '/articles',
    '/calculators',
    '/brands',
    '/compare',
    '/resources',
    '/resources/glossary',
    '/resources/reference-tables',
    '/resources/installation-guides',
    '/resources/buying-guide',
    '/protocols',
    '/sitemap',
    '/status',
    // Calculators
    '/calculators/lock-tco',
    '/calculators/battery-life',
    '/calculators/protocol-wizard',
    '/calculators/signal-strength',
    '/calculators/str-roi',
    '/calculators/installation-cost',
    '/calculators/compatibility',
    '/calculators/mesh-planner',
    '/calculators/rf-coverage',
    '/calculators/fleet-planner',
    '/calculators/credential-planner',
    '/calculators/installation-time',
    '/calculators/subscription-compare',
    '/calculators/offline-resilience',
    '/calculators/emergency-backup',
    '/calculators/access-capacity',
    '/calculators/security-compliance',
    '/calculators/lock-compare',
    '/calculators/warranty-lifecycle',
    '/calculators/network-bandwidth',
    '/calculators/poe-power',
    '/calculators/fire-compliance',
    '/calculators/guest-code',
    '/calculators/ble-range',
    '/calculators/pin-strength',
    '/calculators/door-fit',
    '/calculators/retrofit-advisor',
    '/calculators/hotel-roi',
    '/calculators/energy-cost',
    '/calculators/noise-level',
    '/calculators/cyber-risk',
    '/calculators/privacy-compliance',
    // Protocols
    '/protocols/z-wave',
    '/protocols/zigbee',
    '/protocols/wifi',
    '/protocols/bluetooth',
    '/protocols/thread',
    '/protocols/matter',
]

function normalizeUrl(href, pageUrl) {
    if (!href) return null
    // Skip non-http links
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('javascript:')) return null

    try {
        const url = new URL(href, pageUrl)
        // Only crawl same origin
        if (url.origin !== new URL(BASE).origin) return null
        // Remove hash and trailing slash
        let path = url.pathname.replace(/\/+$/, '') || '/'
        return path
    } catch {
        return null
    }
}

async function fetchPage(path, foundOn) {
    const url = `${BASE}${path}`
    try {
        const resp = await fetch(url, { redirect: 'manual', headers: { 'Accept': 'text/html' } })
        const status = resp.status

        if (status >= 300 && status < 400) {
            const location = resp.headers.get('location')
            redirects.push({ url: path, status, location, foundOn })
            return null
        }

        if (status === 404) {
            broken.push({ url: path, status, foundOn })
            return null
        }

        if (status >= 400) {
            broken.push({ url: path, status, foundOn })
            return null
        }

        const contentType = resp.headers.get('content-type') || ''
        if (!contentType.includes('text/html')) return null

        const html = await resp.text()

        // Check if Next.js rendered the not-found page (soft 404)
        if (html.includes('<title>Not Found</title>') || html.includes('class="not-found"') || html.includes('404 - Page Not Found')) {
            broken.push({ url: path, status: '200(soft-404)', foundOn })
            return null
        }

        return html
    } catch (err) {
        broken.push({ url: path, status: `ERR: ${err.message}`, foundOn })
        return null
    }
}

function extractLinks(html) {
    const links = []
    // Match href attributes
    const regex = /href=["']([^"']+)["']/gi
    let match
    while ((match = regex.exec(html)) !== null) {
        links.push(match[1])
    }
    return links
}

async function crawl() {
    // Seed the queue
    for (const url of SEED_URLS) {
        queue.push({ path: url, foundOn: 'seed' })
    }

    let processed = 0

    while (queue.length > 0 && processed < MAX_PAGES) {
        const { path, foundOn } = queue.shift()

        if (visited.has(path)) continue
        visited.add(path)
        processed++

        // Skip API and admin routes
        if (path.startsWith('/api/') || path.startsWith('/admin')) continue
        // Skip file downloads
        if (path.match(/\.(xml|json|txt|png|jpg|svg|ico|css|js|woff|woff2)$/)) continue

        if (processed % 20 === 0) {
            process.stdout.write(`\r  Scanned ${processed} pages, ${broken.length} broken found...`)
        }

        const html = await fetchPage(path, foundOn)
        if (!html) continue

        // Extract and enqueue links
        const links = extractLinks(html)
        for (const href of links) {
            const normalized = normalizeUrl(href, `${BASE}${path}`)
            if (normalized && !visited.has(normalized)) {
                queue.push({ path: normalized, foundOn: path })
            }
        }
    }

    console.log(`\n\n=== SCAN COMPLETE ===`)
    console.log(`Pages scanned: ${visited.size}`)
    console.log(`Broken (404/error): ${broken.length}`)
    console.log(`Redirects: ${redirects.length}`)

    if (broken.length > 0) {
        console.log(`\n--- BROKEN PAGES (${broken.length}) ---`)
        // Group by status
        const grouped = {}
        for (const b of broken) {
            const key = String(b.status)
            if (!grouped[key]) grouped[key] = []
            grouped[key].push(b)
        }
        for (const [status, items] of Object.entries(grouped)) {
            console.log(`\n  [${status}] (${items.length} pages):`)
            for (const item of items) {
                console.log(`    ${item.url}`)
                console.log(`      ← found on: ${item.foundOn}`)
            }
        }
    }

    if (redirects.length > 0) {
        console.log(`\n--- REDIRECTS (${redirects.length}) ---`)
        for (const r of redirects) {
            console.log(`  ${r.url} → ${r.location} [${r.status}]`)
        }
    }

    console.log(`\n--- ALL VISITED URLS ---`)
    const sorted = [...visited].sort()
    for (const u of sorted) {
        console.log(`  ${u}`)
    }
}

crawl().catch(console.error)
