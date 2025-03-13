import { Hono } from "hono";
import { db } from "../db";
import { agents } from "../db/schema";
import { eq, and } from "drizzle-orm";

const agentsRoutes = new Hono();

// Get all agents for a client
// http://localhost:3000/clients/client123/agents
agentsRoutes.get("/", async (c) => {
  const clientId = c.req.param("clientId");
  if (!clientId) {
    return c.json({ error: "Client ID is required" }, 400);
  }

  const allAgents = await db
    .select()
    .from(agents)
    .where(eq(agents.clientId, clientId));

  return c.json(allAgents);
});

// Get details of a specific agent
agentsRoutes.get("/:agentId", async (c) => {
  const clientId = c.req.param("clientId");
  const agentId = c.req.param("agentId");

  if (!clientId) {
    return c.json("Missing clientID");
  }

  const agentDetails = await db
    .select()
    .from(agents)
    .where(and(eq(agents.agentId, agentId), eq(agents.clientId, clientId)));

  return c.json(agentDetails);
});

// Create a new agent
agentsRoutes.post("/", async (c) => {
  const body = await c.req.json();
  console.log(body);

  const { agentId, clientId, agentName, systemInstruction, description } = body;

  const success = await db
    .insert(agents)
    .values({ agentId, clientId, agentName, systemInstruction, description });

  console.log(success);
  return c.json(body);
});

// Update an agent
agentsRoutes.put("/:agentId", async (c) => {
  const { clientId, agentId } = c.req.param();
  console.log("clientId:", clientId, "agentId:", agentId); // Add this line
  const body = await c.req.json();
  await db.update(agents).set(body).where({ clientId, id: agentId });
  return c.json({ message: "Agent updated" });
});

// Delete an agent
agentsRoutes.delete("/:agentId", async (c) => {
  const { clientId, agentId } = c.req.param();
  console.log("clientId:", clientId, "agentId:", agentId); // Add this line
  await db.delete(agents).where({ clientId, id: agentId });
  return c.json({ message: "Agent deleted" });
});

export default agentsRoutes;
