import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
//import { db } from "../db";
//import { deployedAgents, savedAgents } from "../db/schema";
import { Agents } from "../db/d1/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { cors } from "hono/cors";

// CF d1
type Bindings = {
  DB: D1Database;
};

const AgentSchema = z.object({
  agentId: z.string().min(4, "Agent ID is required"),
  clientId: z.string().min(1, "Client ID is required"),
  agentName: z.string().min(1, { message: "Agent name is required" }),
  description: z.string().min(15).max(30),
  firstMessage: z.string().min(1, { message: "First message is required" }),
  systemInstruction: z.string().nullable(),
});

const agentsRoutes = new Hono<{ Bindings: Bindings }>();

agentsRoutes.use(cors());

// Get all agents for a client
// http://localhost:8000/clients/client123/agents
agentsRoutes.get("/", async (c) => {
  const clientId = c.req.param("clientId");
  if (!clientId) {
    return c.json({ error: "Client ID is required" }, 400);
  }

  // cf d1
  const db = drizzle(c.env.DB);
  //

  const allAgents = await db
    .select()
    .from(Agents)
    .where(eq(Agents.clientId, clientId));

  return c.json(allAgents);
});

// Get details of a specific agent
agentsRoutes.get("/:agentId", async (c) => {
  const clientId = c.req.param("clientId");
  const agentId = c.req.param("agentId");

  if (!clientId) {
    return c.json("Missing clientID");
  }

  // cf d1
  const db = drizzle(c.env.DB);
  //

  const agentDetails = await db
    .select()
    .from(Agents)
    .where(and(eq(Agents.agentId, agentId), eq(Agents.clientId, clientId)));

  return c.json(agentDetails);
});

// Create a new agent
agentsRoutes.post("/", async (c) => {
  const body = await c.req.json();
  console.log(body);

  const result = AgentSchema.safeParse(body);

  if (!result.success) {
    console.log(result.error.format());
    return c.json(
      {
        error: "Validation failed",
      },
      400
    );
  }

  const validData = result.data;
  console.log(validData);

  const {
    agentId,
    clientId,
    agentName,
    systemInstruction,
    description,
    firstMessage,
  } = body;

  // cf d1
  const db = drizzle(c.env.DB);
  //

  const success = await db
    .insert(Agents)
    .values({
      agentId,
      clientId,
      agentName,
      systemInstruction,
      description,
      firstMessage,
    })
    .returning();

  console.log(success);
  return c.json(success[0], 201);
});

// Update an agent
agentsRoutes.put("/:agentId", async (c) => {});

// Delete an agent
agentsRoutes.delete("/:agentId", async (c) => {});

export default agentsRoutes;
