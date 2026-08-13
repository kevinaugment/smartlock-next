# SLockHub.com — Smart Lock Knowledge Hub

Professional smart lock knowledge base with interactive calculators, brand comparisons, and expert guides.

**Live Site:** [https://www.slockhub.com](https://www.slockhub.com)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Build-time data:** checked-in LibSQL seed (`database/d1-import-ordered.sql`)
- **Runtime:** Static HTML/CSS/JS exported by Next.js
- **Styling:** TailwindCSS
- **Deployment:** Cloudflare Pages

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Static builds work without remote database secrets. By default, the build imports `database/d1-import-ordered.sql` into a temporary local LibSQL database and generates `out/` from that data.

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
│   ├── admin/           # Noindex static admin placeholder
│   ├── sitemap.ts       # Static sitemap generation
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
├── public/_redirects    # Static 301 redirects for Cloudflare Pages
├── public/_headers      # Static response headers for Cloudflare Pages
├── wrangler.jsonc       # Cloudflare Pages configuration
└── next.config.mjs      # Next.js configuration
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Preview the exported static site
npm run lint     # Run ESLint
```

## Deployment

`npm run build` generates the static site in `out/`.

No database secrets are required for static generation.

Deploy with:

```bash
npm run deploy
```

## License

MIT
