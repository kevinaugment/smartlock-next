#!/usr/bin/env tsx
/**
 * 重新组织文章分类
 * 将 support 类文章按主题归入相应的主分类
 */

import fs from 'fs/promises';
import path from 'path';

// 文章重新分类映射
// key: 原文件名, value: 新分类
const RECLASSIFY_MAP: Record<string, string> = {
  // 电池相关 -> installation
  'how-to-change-smart-lock-battery': 'installation',
  'emergency-battery-died-locked-out': 'installation',
  
  // 安装配置相关 -> installation  
  'install-smart-lock-step-by-step': 'installation',
  'smart-lock-setup-checklist': 'installation',
  'test-smart-lock-after-install': 'installation',
  'calibrate-smart-lock': 'installation',
  'door-sensor-not-working': 'installation',
  'clean-maintain-smart-lock': 'installation',
  
  // 连接和网络相关 -> protocols
  'smart-lock-keeps-going-offline': 'protocols',
  'improve-connection-stability': 'protocols',
  'smart-lock-disconnects-after-power-outage': 'protocols',
  'command-timeout-errors': 'protocols',
  'connect-lock-to-homekit': 'protocols',
  
  // 用户和访问管理 -> guides
  'how-to-add-user-code': 'guides',
  'create-temporary-guest-code': 'guides',
  'delete-smart-lock-user': 'guides',
  'share-access-securely': 'guides',
  'add-fingerprint-to-lock': 'guides',
  'change-master-code': 'guides',
  'forgot-master-code-reset': 'guides',
  
  // 故障排查 -> guides
  'smart-lock-code-not-working': 'guides',
  'fingerprint-not-recognized': 'guides',
  'smart-lock-shows-wrong-status': 'guides',
  'smart-lock-wont-lock-unlock-completely': 'guides',
  'lock-auto-relocks-immediately': 'guides',
  'lock-motor-noise-troubleshooting': 'guides',
  'lock-unresponsive-after-firmware-update': 'guides',
  'improve-auto-lock-reliability': 'guides',
  
  // 安全相关 -> security
  'secure-smart-lock-best-practices': 'security',
  'multiple-failed-code-attempts': 'security',
  'audit-trail-forensic-analysis': 'security',
  
  // 集成相关 -> integration
  'set-up-lock-automations': 'integration',
  'doorbell-smart-lock-integration': 'integration',
  'local-vs-cloud-architecture': 'integration',
  
  // 固件更新 -> installation
  'update-smart-lock-firmware': 'installation',
};

const ARTICLES_DIR = path.join(process.cwd(), 'app/_articles');

async function moveFile(oldPath: string, newPath: string) {
  try {
    await fs.mkdir(path.dirname(newPath), { recursive: true });
    await fs.rename(oldPath, newPath);
    console.log(`✅ Moved: ${path.basename(oldPath)} -> ${path.relative(ARTICLES_DIR, newPath)}`);
  } catch (error: any) {
    console.error(`❌ Error moving ${oldPath}:`, error.message);
  }
}

async function main() {
  console.log('🔄 开始重新组织文章分类...\n');
  
  let movedCount = 0;
  
  for (const [filename, newCategory] of Object.entries(RECLASSIFY_MAP)) {
    const oldPath = path.join(ARTICLES_DIR, 'support', `${filename}.mdx`);
    const newPath = path.join(ARTICLES_DIR, newCategory, `${filename}.mdx`);
    
    // 检查文件是否存在
    try {
      await fs.access(oldPath);
      await moveFile(oldPath, newPath);
      movedCount++;
    } catch {
      console.log(`⚠️  文件不存在: ${filename}.mdx`);
    }
  }
  
  console.log(`\n✅ 完成！移动了 ${movedCount} 个文件`);
  console.log('\n📝 下一步:');
  console.log('   1. 运行: npx tsx scripts/hardcode-articles.ts');
  console.log('   2. 重新生成注册表');
  console.log('   3. 删除空的 support 目录\n');
}

main().catch(console.error);
