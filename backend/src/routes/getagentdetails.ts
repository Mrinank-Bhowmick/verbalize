import { Hono } from "hono";
import { db } from "../db/index";
import { agents } from "../db/schema";
import { eq } from "drizzle-orm";

const getagentdetails = new Hono();

getagentdetails.get("/:agentId", async (c) => {
  const agentId = c.req.param("agentId");

  // Fetch agent details from DB
  const agent = await db
    .select()
    .from(agents)
    .where(eq(agents.agent_id, agentId));

  if (agent.length === 0) {
    return c.json({ error: "Agent not found" }, 404);
  }

  return c.json(agent[0]);
});

export default getagentdetails;
