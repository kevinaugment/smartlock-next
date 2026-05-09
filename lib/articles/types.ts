/**
 * 文章系统类型定义
 */

export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  category: 'guides' | 'installation' | 'integration' | 'protocols' | 'security' | 'use-cases' | 'resources';
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
  faqs?: { question: string; answer: string }[];
  howToSteps?: { name: string; text: string }[];
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
    name: 'Troubleshooting Guides',
    slug: 'guides',
    description: 'Fix smart lock pairing, PIN codes, fingerprints, users, auto-lock, reset, and access problems.',
    count: 19,
  },
  installation: {
    name: 'Installation Guides',
    slug: 'installation',
    description: 'Install, calibrate, maintain, update, test, and repair smart locks after setup.',
    count: 11,
  },
  protocols: {
    name: 'Protocol Guides',
    slug: 'protocols',
    description: 'Compare Matter, Thread, Wi-Fi, Z-Wave, Zigbee, Bluetooth, hubs, signal, and battery tradeoffs.',
    count: 22,
  },
  security: {
    name: 'Security Guides',
    slug: 'security',
    description: 'Evaluate smart lock encryption, PIN risk, privacy, audit trails, compliance, and backup access.',
    count: 7,
  },
  integration: {
    name: 'Integration Guides',
    slug: 'integration',
    description: 'Connect smart locks with HomeKit, doorbells, automations, APIs, cloud systems, and local hubs.',
    count: 5,
  },
  'use-cases': {
    name: 'Rental and Business',
    slug: 'use-cases',
    description: 'Plan smart locks for Airbnb, rentals, hotels, commercial doors, and multi-property operations.',
    count: 10,
  },
  resources: {
    name: 'Tables and Glossary',
    slug: 'resources',
    description: 'Use smart lock specs, standards, glossary terms, diagrams, costs, and reference tables.',
    count: 25,
  },
};
