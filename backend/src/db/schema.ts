import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const savedAgents = pgTable("savedAgents", {
  agentId: varchar({ length: 8 }).primaryKey(),
  clientId: text().notNull(),
  agentName: varchar({ length: 15 }).notNull(),
  firstMessage: text().notNull(),
  systemInstruction: text(),
  description: varchar({ length: 30 }),
  isDeployed: boolean().default(false),
  createdAt: timestamp().defaultNow(),
});

export const deployedAgents = pgTable("deployedAgents", {
  agentId: varchar({ length: 8 }).primaryKey(),
  clientId: text().notNull(),
  agentName: varchar({ length: 15 }).notNull(),
  firstMessage: text().notNull(),
  systemInstruction: text(),
  description: varchar({ length: 30 }),
  isDeployed: boolean().default(true),
  createdAt: timestamp().defaultNow(),
});
