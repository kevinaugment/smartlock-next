import type { Metadata } from 'next'

type SeoMetadataInput = {
  title: string
  description: string
  canonical: string
  keywords?: string
}

export function buildSeoMetadata({
  title,
  description,
  canonical,
  keywords,
}: SeoMetadataInput): Metadata {
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'SLockHub.com',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
