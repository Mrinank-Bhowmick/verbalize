import { drizzle } from "drizzle-orm/d1";
type Env = {
  DB: D1Database;
};

export function db(env: Env) {
  return drizzle(env.DB);
}
