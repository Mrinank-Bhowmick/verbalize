import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import {
  sqliteTable,
  integer,
  text as sqliteText,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

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

// CF D1 database

export const savedAgents_D1 = sqliteTable("savedAgents", {
  agentId: sqliteText("agentId").primaryKey(),
  clientId: sqliteText("clientId").notNull(),
  agentName: sqliteText("agentName").notNull(),
  firstMessage: sqliteText("firstMessage").notNull(),
  systemInstruction: sqliteText("systemInstruction"),
  description: sqliteText("description"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(
    sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`
  ),
});

export const deployedAgents_D1 = sqliteTable("deployedAgents", {
  agentId: sqliteText("agentId").primaryKey(),
  clientId: sqliteText("clientId").notNull(),
  agentName: sqliteText("agentName").notNull(),
  firstMessage: sqliteText("firstMessage").notNull(),
  systemInstruction: sqliteText("systemInstruction"),
  description: sqliteText("description"),
  isDeployed: integer("isDeployed", { mode: "boolean" }).default(true),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(
    sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`
  ),
});
