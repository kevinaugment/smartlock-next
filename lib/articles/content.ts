import { articleContentByKey } from './content.generated'

export function getArticleContent(category: string, slug: string): string {
  return articleContentByKey[`${category}/${slug}` as keyof typeof articleContentByKey] || ''
}
