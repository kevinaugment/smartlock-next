import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
    console.error('Error: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required.');
    process.exit(1);
}

const client = createClient({
    url,
    authToken,
});

async function main() {
    const resourcesDir = path.join(process.cwd(), 'content/resources');
    if (!fs.existsSync(resourcesDir)) {
        console.error(`Directory not found: ${resourcesDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(resourcesDir).filter(f => f.endsWith('.md'));
    console.log(`Found ${files.length} resource files.`);

    // Get Admin User ID (for author_id)
    const adminUser = await client.execute("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
    const authorId = adminUser.rows.length > 0 ? adminUser.rows[0].id : 1;

    // Get Resources Category ID
    const categoryRes = await client.execute("SELECT id FROM categories WHERE slug = 'resources'");
    if (categoryRes.rows.length === 0) {
        console.error("Category 'resources' not found. Run seeds/resources-category.sql first.");
        process.exit(1);
    }
    const categoryId = categoryRes.rows[0].id;

    for (const file of files) {
        const filePath = path.join(resourcesDir, file);
        const contentRaw = fs.readFileSync(filePath, 'utf8');

        // Split content by "---" separator to handle multiple documents in one file if present
        // My generation script separated them by `---` (standard yaml separator)
        // But standard gray-matter only parses the first one.
        // I put `---` relative to each doc.
        // If the file contains multiple docs separated by `---` lines that are NOT frontmatter delimiters...
        // The previous generation used `---` as a separator BETWEEN docs. 
        // Let's assume the file content is split by `\n---\n` or similar.

        // Actually, `gray-matter` doesn't support multi-doc stream.
        // I need to split manually.

        const docs = contentRaw.split(/^---\s*$/gm).slice(1); // naive split?
        // Proper splitting: The file looks like:
        // ---
        // frontmatter
        // ---
        // content
        //
        // ---
        // frontmatter 2
        // ---
        // content 2

        // Regex to split: `(?=^---\n)` but that matches the start of frontmatter too.
        // Let's rely on the fact that I put `\n---\n` between them in the generation steps.
        // Or I can read the file, and if I see multiple `---` blocks...

        // Simpler approach: Split by `\n---\n` where it looks like a separator.
        // However, the files I generated have:
        // ... content ...
        //
        // ---
        // ---
        // title: ...

        // The generator put `---` then another `---`. 
        // Wait, let's look at Step 102/151 etc.
        // `---`
        // `title: ...`
        // `---`
        // `content`
        // `---` (Separator)
        // `---` (Start of next)

        // So the separator is `\n---\n\n---`. 
        // Or just split by the start of a new frontmatter block.

        // Let's try splitting by `^---\n` and grouping them.
        // Or simpler: use a regex to find all frontmatter blocks.

        const rawDocs = contentRaw.split(/\n---\n\n---\n/); // Matches the separator I likely outputted?
        // Actually, Step 102 output:
        // ...
        // *   **Thickness**: ...
        //
        // ---
        //
        // ---
        // title: ...

        // So splitting by `\n---\n\n---\n` should work for the gap.
        // But the very first one starts with `---`.

        // Let's try to normalize and split.
        const normalized = contentRaw.replace(/\r\n/g, '\n');
        const sections = normalized.split('\n---\n\n---\n');

        // If that fails, we might have just one doc.
        // Also the split removes the separator. The second doc starts with `title: ...` because we consumed the opening `---`.
        // We need to re-add it.

        for (let i = 0; i < sections.length; i++) {
            let section = sections[i];
            if (i > 0) {
                // Re-add the opening `---` for gray-matter
                section = '---\n' + section;
            }

            // Clean up whitespace
            section = section.trim();
            if (!section) continue;

            try {
                const { data, content } = matter(section);
                if (!data.slug || !data.title) continue;

                console.log(`Processing: ${data.title} (${data.slug})`);

                // 1. Insert/Update Article
                await client.execute({
                    sql: `INSERT INTO articles (title, slug, description, content, category_id, author_id, status, published_at, created_at, updated_at)
                      VALUES (?, ?, ?, ?, ?, ?, 'published', datetime('now'), datetime('now'), datetime('now'))
                      ON CONFLICT(slug) DO UPDATE SET 
                        title=excluded.title, 
                        description=excluded.description, 
                        content=excluded.content, 
                        updated_at=datetime('now')`,
                    args: [data.title, data.slug, data.description || '', content, categoryId, authorId]
                });

                // Get Article ID
                const articleRes = await client.execute({
                    sql: "SELECT id FROM articles WHERE slug = ?",
                    args: [data.slug]
                });
                const articleId = articleRes.rows[0].id;

                // 2. Handle Tags
                if (data.tags && Array.isArray(data.tags)) {
                    for (const tagSlug of data.tags) {
                        // Find tag id (tags should be seeded)
                        const tagRes = await client.execute({
                            sql: "SELECT id FROM tags WHERE slug = ?",
                            args: [tagSlug]
                        });

                        if (tagRes.rows.length > 0) {
                            const tagId = tagRes.rows[0].id;
                            await client.execute({
                                sql: "INSERT OR IGNORE INTO article_tags (article_id, tag_id) VALUES (?, ?)",
                                args: [articleId, tagId]
                            });
                        }
                    }
                }

                // 3. Link to Calculator
                if (data.calculator_slug) {
                    const calcRes = await client.execute({
                        sql: "SELECT id FROM calculators WHERE slug = ?",
                        args: [data.calculator_slug]
                    });

                    if (calcRes.rows.length > 0) {
                        const calcId = calcRes.rows[0].id;
                        await client.execute({
                            sql: `INSERT INTO calculator_articles (calculator_id, article_id, custom_title, custom_description, display_order)
                              VALUES (?, ?, ?, ?, 99)
                              ON CONFLICT(calculator_id, article_id) DO NOTHING`,
                            args: [calcId, articleId, data.title, data.description]
                        });
                    } else {
                        console.warn(`Calculator not found: ${data.calculator_slug}`);
                    }
                }

            } catch (e) {
                console.error(`Error processing section in ${file}:`, e);
            }
        }
    }
}

main();
