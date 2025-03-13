import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const agents = pgTable("agents", {
  agentId: varchar({ length: 8 }).primaryKey(),
  clientId: text().notNull(),
  agentName: varchar({ length: 15 }).notNull(),
  systemInstruction: text(),
  description: varchar({ length: 30 }),
  createdAt: timestamp().defaultNow(),
});
