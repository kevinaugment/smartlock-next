import { createClient } from '@libsql/client';
import fs from 'fs';

const client = createClient({
  url: "libsql://smartlock-next-vercel-icfg-40pfgxlifl73qpqv15kr7dxp.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjM5MTM2NjUsImlkIjoiNjdlOGFjYWMtMTcyNi00ZGI1LTg1NzYtNjU2MmZjNzI5OTE3IiwicmlkIjoiMDM4OTFmZDktZjYyYy00MzZmLWI5MjYtYWU0ZTQ4MDU0ZmMyIn0.l-QGT0gbsxisDr_DUJ-DNM64xSPmJzosQese_nI8Wf_dVRyXqyiPoKE4MaCP-M7cyiYzA-Pcj4Mdf61u8CMRCA"
});

// Read original MDX
const mdxPath = '/Users/luokun/Documents/GitHub/smartlock-next/smartlockold/src/content/articles/guides/smart-lock-pairing-complete-guide.mdx';
const mdxContent = fs.readFileSync(mdxPath, 'utf-8');

// Simple MDX to HTML converter (preserving structure and links)
function mdxToHtml(mdx: string): string {
  let html = mdx;
  
  // Remove frontmatter
  html = html.replace(/^---[\s\S]*?---\n/, '');
  
  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  
  // Bold and strong
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Links - keep internal links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Lists
  html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>\n?)+/g, '<ul>$&</ul>');
  html = html.replace(/<\/li>\n<li>/g, '</li><li>');
  
  // Numbered lists  
  html = html.replace(/^\d+\.\s+(.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>\n?){2,}/g, function(match) {
    if (!match.includes('<ul>')) {
      return '<ol>' + match + '</ol>';
    }
    return match;
  });
  
  // Paragraphs
  html = html.replace(/^(?!<[holu]|<li)(.*?)$/gm, '<p>$1</p>');
  
  // Clean up
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>---<\/p>/g, '<hr>');
  html = html.replace(/<p>(\s*)<\/p>/g, '');
  
  // Tables
  html = html.replace(/\|(.+)\|/g, function(match) {
    const cells = match.split('|').filter(c => c.trim());
    const isHeader = match.includes('---');
    if (isHeader) return '';
    
    const tag = cells[0].includes('Protocol') || cells[0].includes('**') ? 'th' : 'td';
    return '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
  });
  html = html.replace(/(<tr>.*?<\/tr>\n?)+/g, '<table>$&</table>');
  
  return html;
}

async function updateArticle() {
  try {
    console.log('📖 Reading MDX file...');
    
    const htmlContent = mdxToHtml(mdxContent);
    
    // Count words
    const textOnly = htmlContent.replace(/<[^>]*>/g, ' ');
    const wordCount = textOnly.trim().split(/\s+/).filter(w => w.length > 0).length;
    
    console.log(`✅ Converted to HTML`);
    console.log(`📊 Word count: ${wordCount} words`);
    console.log(`📦 HTML size: ${htmlContent.length} bytes`);
    
    if (wordCount < 3500) {
      console.log(`⚠️  Warning: Only ${wordCount} words (target: 4000+)`);
    }
    
    console.log('\n🔄 Updating database...');
    
    await client.execute({
      sql: `UPDATE articles SET 
        content = ?,
        word_count = ?,
        updated_at = CURRENT_TIMESTAMP
        WHERE slug = ?`,
      args: [htmlContent, wordCount, 'smart-lock-pairing-complete-guide']
    });
    
    console.log('✅ Article updated in database!');
    
    // Verify
    const result = await client.execute({
      sql: "SELECT word_count, LENGTH(content) as size FROM articles WHERE slug=?",
      args: ['smart-lock-pairing-complete-guide']
    });
    
    console.log('\n📊 Verification:');
    console.log(`Word count in DB: ${result.rows[0].word_count}`);
    console.log(`Content size: ${result.rows[0].size} bytes`);
    console.log('\n✅ Done! Refresh browser to see changes.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    client.close();
  }
}

updateArticle();
