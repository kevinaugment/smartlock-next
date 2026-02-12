import { createClient } from '@libsql/client';

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
    const sql = process.argv[2];
    if (!sql) {
        console.error('Usage: tsx scripts/db-query.ts "SELECT * FROM ... "');
        process.exit(1);
    }

    try {
        const rs = await client.execute(sql);
        console.log(JSON.stringify(rs, null, 2));
    } catch (e) {
        console.error('❌ Query failed:', e);
        process.exit(1);
    }
}

main();
