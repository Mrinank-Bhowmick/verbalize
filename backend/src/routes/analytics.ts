import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { Analytics, Agents } from "../db/d1/schema";
import { eq, sql, desc } from "drizzle-orm";
import { cors } from "hono/cors";

type Bindings = {
  DB: D1Database;
};

const analyticsRoutes = new Hono<{ Bindings: Bindings }>();

// Enable CORS
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://verbalize.mrinank-ai.tech"
    : "*";

analyticsRoutes.use(
  "/*",
  cors({
    origin: allowedOrigin,
    allowMethods: ["GET", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

// Get analytics overview for a specific client - MINIMAL DB CALLS
analyticsRoutes.get("/:clientId", async (c) => {
  try {
    const clientId = c.req.param("clientId");
    const db = drizzle(c.env.DB);

    // CALL 1: Get all agents for this client
    const agents = await db
      .select()
      .from(Agents)
      .where(eq(Agents.clientId, clientId));

    if (!agents || agents.length === 0) {
      return c.json({
        agents: [],
        analytics: [],
      });
    }

    const agentIds = agents.map((agent) => agent.agentId);

    // CALL 2: Get ALL analytics data for these agents (let client calculate)
    const analytics = await db
      .select()
      .from(Analytics)
      .where(
        sql`${Analytics.agentId} IN (${sql.join(
          agentIds.map((id) => sql`${id}`),
          sql`, `
        )})`
      )
      .orderBy(desc(Analytics.lastUpdated));

    // Return raw data - let client do the calculations
    console.log(JSON.stringify(analytics, null, 2));
    return c.json({
      agents,
      analytics,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return c.json({ error: "Failed to fetch analytics" }, 500);
  }
});

// Get analytics for a specific agent - MINIMAL DB CALLS
analyticsRoutes.get("/agent/:agentId", async (c) => {
  try {
    const agentId = c.req.param("agentId");
    const db = drizzle(c.env.DB);

    // CALL 1: Get agent info
    const agent = await db
      .select()
      .from(Agents)
      .where(eq(Agents.agentId, agentId))
      .get();

    if (!agent) {
      return c.json({ error: "Agent not found" }, 404);
    }

    // CALL 2: Get all analytics for this agent
    const analytics = await db
      .select()
      .from(Analytics)
      .where(eq(Analytics.agentId, agentId))
      .orderBy(desc(Analytics.lastUpdated));

    // Return raw data - let client do the calculations
    return c.json({
      agent,
      analytics,
    });
  } catch (error) {
    console.error("Error fetching agent analytics:", error);
    return c.json({ error: "Failed to fetch agent analytics" }, 500);
  }
});

export default analyticsRoutes;
