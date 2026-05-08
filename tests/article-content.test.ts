import assert from 'node:assert/strict'
import { getArticleContent } from '../lib/articles/content'

async function main() {
  const content = getArticleContent('guides', 'door-compatibility-guide')

  assert.equal(typeof content, 'string', 'article content must be a string')
  assert.notEqual(content.trim(), '', 'article content must not be empty')
  assert.equal(
    content.includes('Error loading article content.'),
    false,
    'article content loader must not return the runtime fallback error'
  )
  assert.equal(
    content.includes('Quick Answer'),
    true,
    'door compatibility article should load real MDX body content'
  )
}

main()
