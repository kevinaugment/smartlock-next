import { createClient } from '@libsql/client';

const client = createClient({
  url: "libsql://smartlock-next-vercel-icfg-40pfgxlifl73qpqv15kr7dxp.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjM5MTM2NjUsImlkIjoiNjdlOGFjYWMtMTcyNi00ZGI1LTg1NzYtNjU2MmZjNzI5OTE3IiwicmlkIjoiMDM4OTFmZDktZjYyYy00MzZmLWI5MjYtYWU0ZTQ4MDU0ZmMyIn0.l-QGT0gbsxisDr_DUJ-DNM64xSPmJzosQese_nI8Wf_dVRyXqyiPoKE4MaCP-M7cyiYzA-Pcj4Mdf61u8CMRCA"
});

async function countWords() {
  try {
    const result = await client.execute({
      sql: "SELECT content FROM articles WHERE slug=?",
      args: ['smart-lock-pairing-complete-guide']
    });
    
    const content = result.rows[0]?.content as string;
    
    // Remove HTML tags
    const textOnly = content.replace(/<[^>]*>/g, ' ');
    
    // Count words
    const words = textOnly.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    console.log('📊 Content Analysis:');
    console.log(`HTML size: ${content.length} bytes`);
    console.log(`Text only: ${textOnly.length} characters`);
    console.log(`Actual word count: ${wordCount} words`);
    console.log(`\nDatabase says: 4200 words ❌`);
    console.log(`Reality: ${wordCount} words`);
    console.log(`\nDifference: ${4200 - wordCount} words SHORT`);
    
    console.log('\n📝 Content preview (first 500 chars):');
    console.log(textOnly.substring(0, 500));
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    client.close();
  }
}

countWords();
