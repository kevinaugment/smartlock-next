# SLockHub.com — Smart Lock Knowledge Hub

Professional smart lock knowledge base with interactive calculators, brand comparisons, and expert guides.

**Live Site:** [https://www.slockhub.com](https://www.slockhub.com)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Turso / LibSQL
- **Auth:** JWT (jose)
- **Styling:** TailwindCSS
- **Deployment:** Vercel

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and set:

```bash
TURSO_DATABASE_URL="libsql://your-database.turso.io"
TURSO_AUTH_TOKEN="your-turso-auth-token"
```

### 3. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Project Structure

```
├── app/
│   ├── articles/        # Article pages (guides, installation, protocols...)
│   ├── calculators/     # 15+ interactive calculators
│   ├── brands/          # Brand pages & product database
│   ├── compare/         # Brand vs brand comparisons
│   ├── protocols/       # Protocol pages & product matrix
│   ├── resources/       # Resource center
│   ├── admin/           # Admin dashboard
│   ├── api/             # API routes
│   ├── sitemap.ts       # Dynamic sitemap generation
│   └── robots.ts        # Robots.txt
├── components/          # React components
├── content/resources/   # Static content
├── database/
│   ├── schema.sql       # Database schema
│   ├── seed.sql         # Initial seed data
│   ├── migrations/      # Schema migrations
│   └── seeds/           # Data seed files
├── lib/
│   ├── db/              # Database client & models
│   ├── services/        # Business logic layer
│   └── utils.ts         # Utility functions
├── vercel.json          # Vercel configuration
└── next.config.mjs      # Next.js configuration
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Push to GitHub → Vercel auto-deploys.

Environment variables required on Vercel:
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

## License

MIT
