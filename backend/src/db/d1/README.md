1. npx drizzle-kit generate:sqlite --config=drizzle-cf.config.ts

2. npx wrangler d1 migrations apply verbalize --remote

3. npx wrangler d1 execute verbalize --file=src/db/d1/seed.sql --remote
