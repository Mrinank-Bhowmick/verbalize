import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

export const sql = postgres(connectionString as string);
export const db = drizzle(sql);
