import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';

// Load env vars if not already loaded (Next.js automatically does, but standalone script might not)
// We assume checking process.env is sufficient as user passes them or they are in .env

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
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error('Usage: tsx scripts/db-execute.ts <path/to/script.sql>');
        process.exit(1);
    }

    const filePath = args[0];
    const absolutePath = path.resolve(process.cwd(), filePath);

    if (!fs.existsSync(absolutePath)) {
        console.error(`File not found: ${absolutePath}`);
        process.exit(1);
    }

    console.log(`Executing SQL from ${filePath}...`);
    const sqlContent = fs.readFileSync(absolutePath, 'utf8');

    // Split by semicolon (naive implementation, but works for seeds usually)
    // or just execute as one batch if supported. createClient support strict execute.
    // Actually LibSQL client `executeMultiple` is what we want for scripts.

    try {
        await client.executeMultiple(sqlContent);
        console.log('✅ Execution successful.');
    } catch (e) {
        console.error('❌ Execution failed:', e);
        process.exit(1);
    }
}

main();
