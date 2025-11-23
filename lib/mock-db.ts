/**
 * 本地开发Mock数据
 * 生产环境使用真实D1数据库
 */

export const mockCategories = [
  { id: 1, name: 'Protocols', slug: 'protocols', icon: '📡', description: 'Z-Wave, Zigbee, Matter protocols', display_order: 1 },
  { id: 2, name: 'Security', slug: 'security', icon: '🔒', description: 'Security analysis & best practices', display_order: 2 },
  { id: 3, name: 'Installation', slug: 'installation', icon: '🔋', description: 'Battery & installation guides', display_order: 3 },
  { id: 4, name: 'Guides', slug: 'guides', icon: '🔧', description: 'Troubleshooting & problem solving', display_order: 4 },
  { id: 5, name: 'Use Cases', slug: 'use-cases', icon: '🏢', description: 'Real-world applications', display_order: 5 },
  { id: 6, name: 'Support', slug: 'support', icon: '💡', description: 'Quick support & how-to', display_order: 6 },
  { id: 7, name: 'Integration', slug: 'integration', icon: '🔗', description: 'System integration & APIs', display_order: 7 },
]

export const mockArticles = [
  {
    id: 1,
    title: 'Smart Lock Troubleshooting Guide: Fix 95% of Issues in 5 Minutes',
    slug: 'smart-lock-troubleshooting-guide',
    description: 'Complete troubleshooting guide for smart locks. Fix connectivity, battery, and mechanical issues quickly.',
    content: `# Smart Lock Troubleshooting Guide

## Quick Diagnosis Flowchart

### Issue: Lock Won't Respond

1. **Check Battery**
   - Low battery is the #1 cause
   - Replace with fresh batteries
   - Expected life: 6-12 months

2. **Check Network Connection**
   - Z-Wave: Check hub connectivity
   - Zigbee: Verify mesh network
   - WiFi: Test signal strength

## Common Issues

### 1. Lock Jammed
**Symptoms**: Motor strain, clicking sound
**Solution**: 
- Check door alignment
- Lubricate mechanism
- Adjust strike plate

### 2. Connection Lost
**Symptoms**: Offline status, no response
**Solution**:
- Power cycle hub
- Re-pair device
- Check network settings

### 3. Code Not Working
**Symptoms**: Valid code rejected
**Solution**:
- Verify code in app
- Check user permissions
- Reset master code

## Prevention Tips

- Monthly battery check
- Quarterly cleaning
- Annual lubrication
- Regular firmware updates
`,
    category_id: 6,
    author_id: 1,
    is_pillar: true,
    featured: true,
    reading_time: 23,
    word_count: 4500,
    status: 'published',
    published_at: '2024-01-15T10:00:00Z',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Smart Lock Battery Life: Complete 2024 Optimization Guide',
    slug: 'smart-lock-battery-life-guide',
    description: 'Maximize your smart lock battery life with proven optimization techniques. Learn about battery types, consumption patterns, and best practices.',
    content: `# Smart Lock Battery Life Guide

## Battery Fundamentals

### Expected Battery Life
- **Standard usage**: 8-12 months
- **Heavy usage**: 4-6 months
- **With accessories**: 3-4 months

### Battery Types
1. AA Alkaline (most common)
2. AA Lithium (best performance)
3. Rechargeable (eco-friendly)

## Power Consumption Analysis

### High Power Activities
- Motor operation: 50-100mA
- Bluetooth connection: 15-30mA
- Z-Wave transmission: 30-40mA

### Low Power Activities
- Standby mode: 50-100μA
- Sensor monitoring: 100-200μA

## Optimization Tips

1. **Disable unnecessary features**
2. **Reduce auto-lock frequency**
3. **Use lithium batteries in cold weather**
4. **Minimize remote checks**

## Battery Monitoring

- Check app for battery level
- Set low battery alerts
- Keep spare batteries ready
`,
    category_id: 3,
    author_id: 1,
    is_pillar: false,
    featured: true,
    reading_time: 20,
    word_count: 4000,
    status: 'published',
    published_at: '2024-01-20T10:00:00Z',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z',
  },
  {
    id: 3,
    title: 'Z-Wave vs Zigbee: Complete Protocol Comparison 2024',
    slug: 'zigbee-vs-zwave-comparison',
    description: 'In-depth comparison of Z-Wave and Zigbee protocols for smart locks. Learn about range, security, compatibility, and performance.',
    content: `# Z-Wave vs Zigbee Comparison

## Protocol Overview

### Z-Wave
- **Frequency**: 908.42 MHz (US)
- **Range**: 30-100m
- **Devices**: 232 per network
- **Security**: AES-128

### Zigbee
- **Frequency**: 2.4 GHz
- **Range**: 10-20m (extendable)
- **Devices**: 65,000+ per network
- **Security**: AES-128

## Performance Comparison

| Feature | Z-Wave | Zigbee |
|---------|--------|--------|
| Interference | Low | Medium |
| Battery Life | Excellent | Good |
| Mesh Network | Yes | Yes |
| Cost | Higher | Lower |

## Use Cases

### Choose Z-Wave if:
- Large property
- Minimal WiFi interference
- Premium devices

### Choose Zigbee if:
- Many devices
- Budget conscious
- Existing Zigbee ecosystem
`,
    category_id: 1,
    author_id: 1,
    is_pillar: true,
    featured: false,
    reading_time: 15,
    word_count: 3000,
    status: 'published',
    published_at: '2024-01-25T10:00:00Z',
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-01-25T10:00:00Z',
  },
]

export const mockUsers = [
  {
    id: 1,
    email: 'admin@smartlock.com',
    name: 'Smart Lock Engineering Team',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z',
  },
]

// Mock数据库查询函数
export const mockDb = {
  // 获取所有分类
  getCategories: async () => {
    return { results: mockCategories }
  },

  // 获取单个分类
  getCategory: async (slug: string) => {
    return mockCategories.find(c => c.slug === slug) || null
  },

  // 获取所有文章
  getArticles: async (limit = 50) => {
    return {
      results: mockArticles.slice(0, limit).map(a => ({
        ...a,
        category_slug: mockCategories.find(c => c.id === a.category_id)?.slug || '',
        category_name: mockCategories.find(c => c.id === a.category_id)?.name || '',
      }))
    }
  },

  // 按分类获取文章
  getArticlesByCategory: async (categoryId: number) => {
    return {
      results: mockArticles.filter(a => a.category_id === categoryId)
    }
  },

  // 获取单篇文章
  getArticle: async (slug: string, categorySlug: string) => {
    const category = mockCategories.find(c => c.slug === categorySlug)
    if (!category) return null

    const article = mockArticles.find(a => a.slug === slug && a.category_id === category.id)
    if (!article) return null

    return {
      ...article,
      category_slug: category.slug,
      category_name: category.name,
      author_name: mockUsers[0].name,
    }
  },

  // 获取相关文章
  getRelatedArticles: async (categoryId: number, excludeId: number, limit = 3) => {
    return {
      results: mockArticles
        .filter(a => a.category_id === categoryId && a.id !== excludeId)
        .slice(0, limit)
        .map(a => ({
          ...a,
          category_slug: mockCategories.find(c => c.id === a.category_id)?.slug || '',
        }))
    }
  },
}

// 环境检测：本地开发使用Mock数据，生产环境使用真实D1
export const isDevelopment = process.env.NODE_ENV === 'development'
