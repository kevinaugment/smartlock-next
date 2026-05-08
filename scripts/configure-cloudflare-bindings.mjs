import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('..', import.meta.url)))
const wranglerConfigPath = join(root, 'wrangler.jsonc')
const wranglerBin = existsSync(join(root, 'node_modules/.bin/wrangler'))
  ? join(root, 'node_modules/.bin/wrangler')
  : 'wrangler'

const d1Binding = process.env.CF_D1_BINDING || 'DB'
const d1DatabaseName = process.env.CF_D1_DATABASE_NAME || 'slockhub'
const d1DatabaseId =
  process.env.CF_D1_DATABASE_ID || '1d2ea8dd-d7eb-440b-8b91-a9070bd7bb34'
const kvBinding = process.env.CF_KV_BINDING || 'SLOCKHUB_KV'
const kvNamespaceTitle = process.env.CF_KV_NAMESPACE_TITLE || 'slockhub'
const kvNamespaceId =
  process.env.CF_KV_NAMESPACE_ID || process.env.SLOCKHUB_KV_NAMESPACE_ID || ''

function runWrangler(args) {
  return execFileSync(wranglerBin, args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}

function readConfig() {
  return JSON.parse(readFileSync(wranglerConfigPath, 'utf8'))
}

function writeConfig(config) {
  writeFileSync(wranglerConfigPath, `${JSON.stringify(config, null, 2)}\n`)
}

function parseJsonArray(output) {
  const trimmed = output.trim()
  if (!trimmed.startsWith('[')) return null
  return JSON.parse(trimmed)
}

function resolveKvNamespaceId() {
  if (kvNamespaceId) return kvNamespaceId

  let namespaces
  try {
    namespaces = parseJsonArray(runWrangler(['kv', 'namespace', 'list']))
  } catch (error) {
    const stderr = error?.stderr?.toString?.() || error?.message || String(error)
    throw new Error(
      [
        `Unable to list Cloudflare KV namespaces while resolving "${kvNamespaceTitle}".`,
        'Set CF_KV_NAMESPACE_ID to the namespace id, or run with CLOUDFLARE_API_TOKEN/CLOUDFLARE_ACCOUNT_ID available.',
        stderr.trim(),
      ]
        .filter(Boolean)
        .join('\n')
    )
  }

  if (!Array.isArray(namespaces)) {
    throw new Error(
      `Unable to parse "wrangler kv namespace list" output. Set CF_KV_NAMESPACE_ID for "${kvNamespaceTitle}".`
    )
  }

  const namespace = namespaces.find((item) => {
    const title = item.title || item.name
    return title === kvNamespaceTitle
  })

  if (!namespace?.id) {
    const available = namespaces
      .map((item) => item.title || item.name)
      .filter(Boolean)
      .join(', ')
    throw new Error(
      `Cloudflare KV namespace "${kvNamespaceTitle}" was not found. Available namespaces: ${available || 'none'}`
    )
  }

  return namespace.id
}

const config = readConfig()
const resolvedKvNamespaceId = resolveKvNamespaceId()

config.d1_databases = [
  {
    binding: d1Binding,
    database_name: d1DatabaseName,
    database_id: d1DatabaseId,
  },
]

config.kv_namespaces = [
  {
    binding: kvBinding,
    id: resolvedKvNamespaceId,
  },
]

delete config.r2_buckets

writeConfig(config)

console.log(
  `Cloudflare bindings ready: ${d1Binding} -> D1 ${d1DatabaseName}, ${kvBinding} -> KV ${kvNamespaceTitle}`
)
