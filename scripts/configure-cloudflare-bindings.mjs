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
const kvNamespacePlaceholder = 'REPLACE_WITH_SLOCKHUB_KV_NAMESPACE_ID'
const requireKvNamespace = process.env.CF_BINDINGS_REQUIRE_KV === '1'

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

function isUsableKvNamespaceId(id) {
  return Boolean(id && id !== kvNamespacePlaceholder && !id.startsWith('REPLACE_WITH_'))
}

function getExistingKvNamespaceId(config) {
  const namespace = config.kv_namespaces?.find((item) => item.binding === kvBinding)
  return isUsableKvNamespaceId(namespace?.id) ? namespace.id : ''
}

function resolveKvNamespaceId(config) {
  if (kvNamespaceId) return kvNamespaceId
  const existingNamespaceId = getExistingKvNamespaceId(config)
  if (existingNamespaceId) return existingNamespaceId

  let namespaces
  try {
    namespaces = parseJsonArray(runWrangler(['kv', 'namespace', 'list']))
  } catch (error) {
    const stderr = error?.stderr?.toString?.() || error?.message || String(error)
    const message =
      [
        `Unable to list Cloudflare KV namespaces while resolving "${kvNamespaceTitle}".`,
        'Set CF_KV_NAMESPACE_ID to the namespace id, or run with CLOUDFLARE_API_TOKEN/CLOUDFLARE_ACCOUNT_ID and KV list permission.',
        stderr.trim(),
      ]
        .filter(Boolean)
        .join('\n')
    if (requireKvNamespace) throw new Error(message)
    console.warn(`${message}\nContinuing without KV binding.`)
    return null
  }

  if (!Array.isArray(namespaces)) {
    const message = `Unable to parse "wrangler kv namespace list" output. Set CF_KV_NAMESPACE_ID for "${kvNamespaceTitle}".`
    if (requireKvNamespace) throw new Error(message)
    console.warn(`${message}\nContinuing without KV binding.`)
    return null
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
    const message = `Cloudflare KV namespace "${kvNamespaceTitle}" was not found. Available namespaces: ${available || 'none'}`
    if (requireKvNamespace) throw new Error(message)
    console.warn(`${message}\nContinuing without KV binding.`)
    return null
  }

  return namespace.id
}

const config = readConfig()
const resolvedKvNamespaceId = resolveKvNamespaceId(config)

config.d1_databases = [
  {
    binding: d1Binding,
    database_name: d1DatabaseName,
    database_id: d1DatabaseId,
  },
]

if (resolvedKvNamespaceId) {
  config.kv_namespaces = [
    {
      binding: kvBinding,
      id: resolvedKvNamespaceId,
    },
  ]
} else {
  delete config.kv_namespaces
}

delete config.r2_buckets

writeConfig(config)

console.log(
  `Cloudflare bindings ready: ${d1Binding} -> D1 ${d1DatabaseName}${
    resolvedKvNamespaceId ? `, ${kvBinding} -> KV ${kvNamespaceTitle}` : ''
  }`
)
