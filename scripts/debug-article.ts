import { createClient } from '@libsql/client';

const client = createClient({
  url: "libsql://smartlock-next-vercel-icfg-40pfgxlifl73qpqv15kr7dxp.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjM5MTM2NjUsImlkIjoiNjdlOGFjYWMtMTcyNi00ZGI1LTg1NzYtNjU2MmZjNzI5OTE3IiwicmlkIjoiMDM4OTFmZDktZjYyYy00MzZmLWI5MjYtYWU0ZTQ4MDU0ZmMyIn0.l-QGT0gbsxisDr_DUJ-DNM64xSPmJzosQese_nI8Wf_dVRyXqyiPoKE4MaCP-M7cyiYzA-Pcj4Mdf61u8CMRCA"
});

async function debugArticle() {
  try {
    // Check article details
    console.log('1. Checking article in database:');
    const article = await client.execute({
      sql: `SELECT 
        a.id, a.slug, a.title, a.status, 
        a.category_id, c.slug as category_slug, c.name as category_name,
        LENGTH(a.content) as content_length
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      WHERE a.slug = ?`,
      args: ['smart-lock-pairing-complete-guide']
    });
    
    if (article.rows.length === 0) {
      console.log('❌ Article not found in database!');
      return;
    }
    
    console.log('✅ Article found:');
    console.log(article.rows[0]);
    
    // Test the exact query used by page
    console.log('\n2. Testing page query:');
    const pageQuery = await client.execute({
      sql: `SELECT 
        a.id, a.title, a.slug, a.description, a.content,
        a.category_id, c.name as category_name, c.slug as category_slug,
        a.reading_time, a.word_count, a.published_at,
        COALESCE(a.updated_at, a.published_at, a.created_at) as updated_at
       FROM articles a
       JOIN categories c ON a.category_id = c.id
       WHERE c.slug = ? AND a.slug = ?`,
      args: ['guides', 'smart-lock-pairing-complete-guide']
    });
    
    if (pageQuery.rows.length === 0) {
      console.log('❌ Page query returns no results!');
      console.log('This is why you see 404');
      
      // Check if status is wrong
      const statusCheck = await client.execute({
        sql: "SELECT status FROM articles WHERE slug = ?",
        args: ['smart-lock-pairing-complete-guide']
      });
      console.log('\nArticle status:', statusCheck.rows[0]?.status);
      
    } else {
      console.log('✅ Page query works:');
      console.log('Title:', pageQuery.rows[0].title);
      console.log('Category:', pageQuery.rows[0].category_name);
      console.log('Content length:', (pageQuery.rows[0].content as string).length);
    }
    
    // List all articles in guides category
    console.log('\n3. All articles in guides category:');
    const guidesArticles = await client.execute({
      sql: `SELECT slug, title, status FROM articles 
            WHERE category_id = (SELECT id FROM categories WHERE slug='guides')
            ORDER BY id DESC LIMIT 5`
    });
    guidesArticles.rows.forEach(row => {
      console.log(`  - ${row.slug} (${row.status})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    client.close();
  }
}

debugArticle();
