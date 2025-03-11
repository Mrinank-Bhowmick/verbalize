import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const agents = pgTable("agents", {
  agent_id: varchar({ length: 8 }).primaryKey(),
  client_id: text().notNull(),
  agent_name: varchar({ length: 15 }).notNull(),
  system_instruction: text(),
  description: varchar({ length: 30 }),
  createdAt: timestamp().defaultNow(),
});
