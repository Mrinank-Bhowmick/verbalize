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

export const Analytics = sqliteTable("Analytics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  agentId: text("agentId").notNull(),
  clientIP: text("clientIP").notNull(),
  sessionId: text("sessionId").notNull(),
  totalTokensUsed: integer("totalTokensUsed").default(0).notNull(),
  messageHistory: text("messageHistory").notNull(),
  conversationCount: integer("conversationCount").default(1).notNull(),
  lastUpdated: text("lastUpdated")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
