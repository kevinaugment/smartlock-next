import { createClient } from '@libsql/client';

const client = createClient({
  url: "libsql://smartlock-next-vercel-icfg-40pfgxlifl73qpqv15kr7dxp.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjM5MTM2NjUsImlkIjoiNjdlOGFjYWMtMTcyNi00ZGI1LTg1NzYtNjU2MmZjNzI5OTE3IiwicmlkIjoiMDM4OTFmZDktZjYyYy00MzZmLWI5MjYtYWU0ZTQ4MDU0ZmMyIn0.l-QGT0gbsxisDr_DUJ-DNM64xSPmJzosQese_nI8Wf_dVRyXqyiPoKE4MaCP-M7cyiYzA-Pcj4Mdf61u8CMRCA"
});

async function checkContent() {
  try {
    const result = await client.execute({
      sql: "SELECT content FROM articles WHERE slug=?",
      args: ['smart-lock-pairing-complete-guide']
    });
    
    if (result.rows.length === 0) {
      console.log('❌ Article not found');
      return;
    }
    
    const content = result.rows[0].content as string;
    console.log('Content preview (first 500 chars):');
    console.log('─'.repeat(60));
    console.log(content.substring(0, 500));
    console.log('─'.repeat(60));
    console.log(`\nTotal content length: ${content.length} characters`);
    console.log(`\nContent starts with: ${content.substring(0, 50)}`);
    console.log(`Content is empty: ${content.trim().length === 0 ? 'YES ❌' : 'NO ✅'}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    client.close();
  }
}

checkContent();
