import { Hono } from "hono";

const clientsRoutes = new Hono();

// Get all clients (if needed)
clientsRoutes.get("/", async (c) => {
  return c.json({ message: "List of clients" });
});

export default clientsRoutes;
