/**
 * 文章系统类型定义
 */

export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  category: 'guides' | 'installation' | 'integration' | 'protocols' | 'security' | 'use-cases';
  pubDate: string;
  wordCount: number;
  readingTime: number;
  keywords: string[];
  tags: string[];
  isPillar: boolean;
  isSupport: boolean;
  featured: boolean;
  relatedArticles?: string[];
  relatedTools?: string[];
  author?: string;
  updatedAt?: string;
}

export interface ArticleData {
  metadata: ArticleMetadata;
  content: string;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  description: string;
  icon?: string;
  count: number;
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  guides: {
    name: 'Guides',
    slug: 'guides',
    description: 'Comprehensive guides and tutorials for smart lock systems',
    count: 19,
  },
  installation: {
    name: 'Installation',
    slug: 'installation',
    description: 'Installation, setup, and maintenance guides',
    count: 10,
  },
  protocols: {
    name: 'Protocols',
    slug: 'protocols',
    description: 'Technical protocols and connectivity guides',
    count: 7,
  },
  security: {
    name: 'Security',
    slug: 'security',
    description: 'Security best practices and compliance',
    count: 5,
  },
  integration: {
    name: 'Integration',
    slug: 'integration',
    description: 'System integration and automation',
    count: 4,
  },
  'use-cases': {
    name: 'Use Cases',
    slug: 'use-cases',
    description: 'Real-world applications and strategies',
    count: 4,
  },
};
