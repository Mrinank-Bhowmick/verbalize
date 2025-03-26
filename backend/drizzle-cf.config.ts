import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle/d1-migration",
  dialect: "sqlite",
  schema: "./src/db/d1/schema.ts",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID as string,
    databaseId: process.env.CLOUDFLARE_D1_ID as string,
    token: process.env.CLOUDFLARE_D1_TOKEN as string,
  },
});
