// CF D1 database

import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const Agents = sqliteTable("Agents", {
  agentId: text("agentId").primaryKey(),
  clientId: text("clientId").notNull(),
  agentName: text("agentName").notNull(),
  firstMessage: text("firstMessage").notNull(),
  systemInstruction: text("systemInstruction"),
  description: text("description"),
  isDeployed: integer("isDeployed").default(0).notNull(),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
