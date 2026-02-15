#!/usr/bin/env node
/**
 * Fix broken internal links across all MDX article files.
 * Run: node scripts/fix-broken-links.mjs
 */

import { readdir, readFile, writeFile, stat } from 'fs/promises'
import { join, relative } from 'path'

const ARTICLES_DIR = join(process.cwd(), 'app/_articles')

// ========================================
// 1. Article slug → correct full path mapping
// ========================================
// Maps bare slugs to their correct /articles/{category}/{slug} path.
// Built from the article registry and filesystem scan.
const ARTICLE_SLUG_MAP = {
    // guides
    'complete-troubleshooting-guide': '/articles/guides/complete-troubleshooting-guide',
    'disaster-recovery-business-continuity': '/articles/guides/disaster-recovery-business-continuity',
    'door-compatibility-guide': '/articles/guides/door-compatibility-guide',
    'smart-lock-pairing-complete-guide': '/articles/guides/smart-lock-pairing-complete-guide',
    'add-fingerprint-to-lock': '/articles/guides/add-fingerprint-to-lock',
    'change-master-code': '/articles/guides/change-master-code',
    'create-temporary-guest-code': '/articles/guides/create-temporary-guest-code',
    'delete-smart-lock-user': '/articles/guides/delete-smart-lock-user',
    'fingerprint-not-recognized': '/articles/guides/fingerprint-not-recognized',
    'forgot-master-code-reset': '/articles/guides/forgot-master-code-reset',
    'how-to-add-user-code': '/articles/guides/how-to-add-user-code',
    'improve-auto-lock-reliability': '/articles/guides/improve-auto-lock-reliability',
    'lock-auto-relocks-immediately': '/articles/guides/lock-auto-relocks-immediately',
    'lock-motor-noise-troubleshooting': '/articles/guides/lock-motor-noise-troubleshooting',
    'lock-unresponsive-after-firmware-update': '/articles/guides/lock-unresponsive-after-firmware-update',
    'share-access-securely': '/articles/guides/share-access-securely',
    'smart-lock-code-not-working': '/articles/guides/smart-lock-code-not-working',
    'smart-lock-shows-wrong-status': '/articles/guides/smart-lock-shows-wrong-status',
    'smart-lock-wont-lock-unlock-completely': '/articles/guides/smart-lock-wont-lock-unlock-completely',
    // installation
    'calibrate-smart-lock': '/articles/installation/calibrate-smart-lock',
    'clean-maintain-smart-lock': '/articles/installation/clean-maintain-smart-lock',
    'door-sensor-not-working': '/articles/installation/door-sensor-not-working',
    'emergency-battery-died-locked-out': '/articles/installation/emergency-battery-died-locked-out',
    'how-to-change-smart-lock-battery': '/articles/installation/how-to-change-smart-lock-battery',
    'install-smart-lock-step-by-step': '/articles/installation/install-smart-lock-step-by-step',
    'smart-lock-battery-life-guide': '/articles/installation/smart-lock-battery-life-guide',
    'smart-lock-setup-checklist': '/articles/installation/smart-lock-setup-checklist',
    'test-smart-lock-after-install': '/articles/installation/test-smart-lock-after-install',
    'update-smart-lock-firmware': '/articles/installation/update-smart-lock-firmware',
    // integration
    'doorbell-smart-lock-integration': '/articles/integration/doorbell-smart-lock-integration',
    'enterprise-system-integration': '/articles/integration/enterprise-system-integration',
    'local-vs-cloud-architecture': '/articles/integration/local-vs-cloud-architecture',
    'set-up-lock-automations': '/articles/integration/set-up-lock-automations',
    // protocols
    'command-timeout-errors': '/articles/protocols/command-timeout-errors',
    'connect-lock-to-homekit': '/articles/protocols/connect-lock-to-homekit',
    'improve-connection-stability': '/articles/protocols/improve-connection-stability',
    'smart-lock-disconnects-after-power-outage': '/articles/protocols/smart-lock-disconnects-after-power-outage',
    'smart-lock-keeps-going-offline': '/articles/protocols/smart-lock-keeps-going-offline',
    'smart-lock-protocols-overview': '/articles/protocols/smart-lock-protocols-overview',
    'zigbee-vs-zwave-comparison': '/articles/protocols/zigbee-vs-zwave-comparison',
    // security
    'audit-trail-forensic-analysis': '/articles/security/audit-trail-forensic-analysis',
    'data-privacy-compliance-guide': '/articles/security/data-privacy-compliance-guide',
    'multiple-failed-code-attempts': '/articles/security/multiple-failed-code-attempts',
    'secure-smart-lock-best-practices': '/articles/security/secure-smart-lock-best-practices',
    'smart-lock-security-complete-analysis': '/articles/security/smart-lock-security-complete-analysis',
    // use-cases
    'enterprise-commercial-deployment': '/articles/use-cases/enterprise-commercial-deployment',
    'long-term-rental-property-strategy': '/articles/use-cases/long-term-rental-property-strategy',
    'long-term-rental-strategy': '/articles/use-cases/long-term-rental-strategy',
    'smart-locks-airbnb-complete-guide': '/articles/use-cases/smart-locks-airbnb-complete-guide',
}

// ========================================
// 2. Tool/Calculator slug → correct calculator path
// ========================================
const TOOL_TO_CALCULATOR = {
    // /tools/* → /calculators/*
    'offline-resilience-scorecard': '/calculators/offline-resilience',
    'emergency-backup-evaluator': '/calculators/emergency-backup',
    'battery-life-comparison': '/calculators/battery-life',
    'rf-coverage-estimator': '/calculators/rf-coverage',
    'mesh-node-planner': '/calculators/mesh-planner',
    'protocol-selection-wizard': '/calculators/protocol-wizard',
    'lock-tco-calculator': '/calculators/lock-tco',
    'door-lock-compatibility-checker': '/calculators/compatibility',
    'installation-time-estimator': '/calculators/installation-time',
    'multi-property-fleet-planner': '/calculators/fleet-planner',
    'credential-capacity-planner': '/calculators/credential-planner',
    'rental-roi-calculator': '/calculators/str-roi',
    'short-term-rental-roi-calculator': '/calculators/str-roi',
    'str-automation-time-savings': '/calculators/str-roi',
    'smart-home-integration-checker': '/calculators/compatibility',
    'api-compatibility-checker': '/calculators/compatibility',
    'integration-roi-calculator': '/calculators/hotel-roi',
    'turnover-time-estimator': '/calculators/installation-time',
}

// /calculators/* wrong slugs → correct slugs
const CALCULATOR_SLUG_FIX = {
    'battery-life-comparison': '/calculators/battery-life',
    'battery-life-calculator': '/calculators/battery-life',
    'battery-life-estimator': '/calculators/battery-life',
    'protocol-selection-wizard': '/calculators/protocol-wizard',
    'offline-resilience-scorecard': '/calculators/offline-resilience',
    'compatibility-checker': '/calculators/compatibility',
    'door-lock-compatibility-checker': '/calculators/compatibility',
    'signal-strength-analyzer': '/calculators/signal-strength',
    'installation-cost-estimator': '/calculators/installation-cost',
    'installation-time-estimator': '/calculators/installation-time',
    'rental-roi-calculator': '/calculators/str-roi',
    'short-term-rental-roi-calculator': '/calculators/str-roi',
    'subscription-vs-purchase-calculator': '/calculators/subscription-compare',
    'rf-coverage-estimator': '/calculators/rf-coverage',
    'mesh-node-planner': '/calculators/mesh-planner',
    'emergency-backup-evaluator': '/calculators/emergency-backup',
    'lock-tco-calculator': '/calculators/lock-tco',
    'multi-property-fleet-planner': '/calculators/fleet-planner',
    'credential-capacity-planner': '/calculators/credential-planner',
    'integration-roi-calculator': '/calculators/hotel-roi',
    'privacy-impact-assessment': '/calculators/privacy-compliance',
}

// ========================================
// 3. Completely dead links (no equivalent exists) → remove link, keep text
// ========================================
const DEAD_SLUGS = new Set([
    'bia-calculator',
    'rto-rpo-planner',
    'failover-tester',
    'log-analyzer',
    'anomaly-detector',
    'forensic-timeline-builder',
    'compliance-reporter',
    'data-retention-calculator',
    'lock-grading-decoder',
    'wire-gauge-calculator',
    'credential-management-best-practices',
    'door-latch-binding-sticking',
    'smart-lock-wont-fit-door',
    'multi-unit-buildings',
    'rf-mesh-network-planning',
])

// ========================================
// Apply all fixes to a single file's content
// ========================================
function fixContent(content, filePath) {
    let fixed = content
    let changes = 0
    const relPath = relative(process.cwd(), filePath)

    // --- Fix 1: /support/{slug} → /articles/{category}/{slug} ---
    fixed = fixed.replace(/\(\/support\/([a-z0-9-]+)\)/g, (match, slug) => {
        if (DEAD_SLUGS.has(slug)) {
            // Will be handled by dead link removal below
            return match
        }
        if (ARTICLE_SLUG_MAP[slug]) {
            changes++
            return `(${ARTICLE_SLUG_MAP[slug]})`
        }
        console.log(`  ⚠️ [${relPath}] Unknown /support/ slug: ${slug}`)
        return match
    })

    // --- Fix 2: /tools/{slug} → /calculators/{correct-slug} ---
    fixed = fixed.replace(/\(\/tools\/([a-z0-9-]+)\)/g, (match, slug) => {
        if (DEAD_SLUGS.has(slug)) {
            return match // handled below
        }
        if (TOOL_TO_CALCULATOR[slug]) {
            changes++
            return `(${TOOL_TO_CALCULATOR[slug]})`
        }
        console.log(`  ⚠️ [${relPath}] Unknown /tools/ slug: ${slug}`)
        return match
    })

    // --- Fix 3: /guides/{slug} → /articles/guides/{slug} ---
    fixed = fixed.replace(/\(\/guides\/([a-z0-9-]+)\)/g, (match, slug) => {
        if (ARTICLE_SLUG_MAP[slug]) {
            changes++
            return `(${ARTICLE_SLUG_MAP[slug]})`
        }
        console.log(`  ⚠️ [${relPath}] Unknown /guides/ slug: ${slug}`)
        return match
    })

    // --- Fix 4: /installation/{slug} → /articles/installation/{slug} ---
    fixed = fixed.replace(/\(\/installation\/([a-z0-9-]+(?:#[a-z0-9-]*)?)\)/g, (match, slugWithHash) => {
        const slug = slugWithHash.split('#')[0]
        const hash = slugWithHash.includes('#') ? '#' + slugWithHash.split('#')[1] : ''
        if (DEAD_SLUGS.has(slug)) return match
        if (ARTICLE_SLUG_MAP[slug]) {
            changes++
            return `(${ARTICLE_SLUG_MAP[slug]}${hash})`
        }
        console.log(`  ⚠️ [${relPath}] Unknown /installation/ slug: ${slug}`)
        return match
    })

    // --- Fix 5: /integration/{slug} → /articles/integration/{slug} ---
    fixed = fixed.replace(/\(\/integration\/([a-z0-9-]+)\)/g, (match, slug) => {
        if (ARTICLE_SLUG_MAP[slug]) {
            changes++
            return `(${ARTICLE_SLUG_MAP[slug]})`
        }
        console.log(`  ⚠️ [${relPath}] Unknown /integration/ slug: ${slug}`)
        return match
    })

    // --- Fix 6: /security/{slug} → /articles/security/{slug} ---
    fixed = fixed.replace(/\(\/security\/([a-z0-9-]+)\)/g, (match, slug) => {
        if (ARTICLE_SLUG_MAP[slug]) {
            changes++
            return `(${ARTICLE_SLUG_MAP[slug]})`
        }
        console.log(`  ⚠️ [${relPath}] Unknown /security/ slug: ${slug}`)
        return match
    })

    // --- Fix 7: /use-cases/{slug} → /articles/use-cases/{slug} ---
    fixed = fixed.replace(/\(\/use-cases\/([a-z0-9-]+)\)/g, (match, slug) => {
        if (DEAD_SLUGS.has(slug)) return match
        if (ARTICLE_SLUG_MAP[slug]) {
            changes++
            return `(${ARTICLE_SLUG_MAP[slug]})`
        }
        console.log(`  ⚠️ [${relPath}] Unknown /use-cases/ slug: ${slug}`)
        return match
    })

    // --- Fix 8: /protocols/{article-slug} → /articles/protocols/{slug} ---
    // Only fix slugs that ARE article slugs (not protocol names like z-wave, zigbee, wifi etc.)
    const PROTOCOL_PAGE_SLUGS = new Set(['z-wave', 'zigbee', 'wifi', 'bluetooth', 'thread', 'matter'])
    fixed = fixed.replace(/\(\/protocols\/([a-z0-9-]+)\)/g, (match, slug) => {
        if (PROTOCOL_PAGE_SLUGS.has(slug)) return match // valid protocol page
        if (ARTICLE_SLUG_MAP[slug]) {
            changes++
            return `(${ARTICLE_SLUG_MAP[slug]})`
        }
        console.log(`  ⚠️ [${relPath}] Unknown /protocols/ slug: ${slug}`)
        return match
    })

    // --- Fix 9: /calculators/{wrong-slug} → /calculators/{correct-slug} ---
    fixed = fixed.replace(/\(\/calculators\/([a-z0-9-]+)\)/g, (match, slug) => {
        if (DEAD_SLUGS.has(slug)) return match
        if (CALCULATOR_SLUG_FIX[slug]) {
            changes++
            return `(${CALCULATOR_SLUG_FIX[slug]})`
        }
        // Leave valid calculator slugs alone
        return match
    })

    // --- Fix 10: Remove dead links (keep text) ---
    // Markdown pattern: [text](dead-url) → text
    for (const deadSlug of DEAD_SLUGS) {
        const patterns = [
            new RegExp(`\\[([^\\]]+)\\]\\(/tools/${deadSlug}\\)`, 'g'),
            new RegExp(`\\[([^\\]]+)\\]\\(/support/${deadSlug}\\)`, 'g'),
            new RegExp(`\\[([^\\]]+)\\]\\(/calculators/${deadSlug}\\)`, 'g'),
            new RegExp(`\\[([^\\]]+)\\]\\(/use-cases/${deadSlug}\\)`, 'g'),
            new RegExp(`\\[([^\\]]+)\\]\\(/installation/${deadSlug}\\)`, 'g'),
        ]
        for (const pattern of patterns) {
            const before = fixed
            fixed = fixed.replace(pattern, '$1')
            if (fixed !== before) {
                changes++
            }
        }
    }

    // --- Fix 11: HTML href patterns (for registry entries) ---
    // href="/articles/support/{slug}" → href="/articles/{category}/{slug}"
    fixed = fixed.replace(/href="\/articles\/support\/([a-z0-9-]+)"/g, (match, slug) => {
        if (ARTICLE_SLUG_MAP[slug]) {
            changes++
            return `href="${ARTICLE_SLUG_MAP[slug]}"`
        }
        return match
    })

    // href="/calculators/{wrong-slug}" → href="/calculators/{correct-slug}"
    fixed = fixed.replace(/href="\/calculators\/([a-z0-9-]+)"/g, (match, slug) => {
        if (CALCULATOR_SLUG_FIX[slug]) {
            changes++
            return `href="${CALCULATOR_SLUG_FIX[slug]}"`
        }
        return match
    })

    return { fixed, changes }
}

// ========================================
// Recursively find all .mdx files
// ========================================
async function findMdxFiles(dir) {
    const entries = await readdir(dir, { withFileTypes: true })
    const files = []
    for (const entry of entries) {
        const fullPath = join(dir, entry.name)
        if (entry.isDirectory()) {
            files.push(...(await findMdxFiles(fullPath)))
        } else if (entry.name.endsWith('.mdx')) {
            files.push(fullPath)
        }
    }
    return files
}

// ========================================
// Main
// ========================================
async function main() {
    console.log('🔍 Scanning MDX files for broken links...\n')

    const files = await findMdxFiles(ARTICLES_DIR)
    console.log(`Found ${files.length} MDX files\n`)

    let totalChanges = 0
    let filesChanged = 0

    for (const filePath of files) {
        const content = await readFile(filePath, 'utf-8')
        const { fixed, changes } = fixContent(content, filePath)

        if (changes > 0) {
            await writeFile(filePath, fixed, 'utf-8')
            const relPath = relative(process.cwd(), filePath)
            console.log(`  ✅ ${relPath} — ${changes} link(s) fixed`)
            totalChanges += changes
            filesChanged++
        }
    }

    console.log(`\n=== DONE ===`)
    console.log(`Files modified: ${filesChanged}`)
    console.log(`Total links fixed: ${totalChanges}`)
}

main().catch(console.error)
