// Cloudflare workers
import { Hono } from "hono";
//import { serve } from "@hono/node-server";
import testChatbotRoutes from "./routes/testchatbot";
import agentsRoutes from "./routes/agents";
import demochatbotroute from "./routes/demochatbot";
import mascotroute from "./routes/mascot";

export type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
  return c.json({ hello: "world" });
});

app.route("/testchatbot", testChatbotRoutes);
app.route("/clients/:clientId/agents", agentsRoutes);
app.route("/demochatbot", demochatbotroute);
app.route("/mascot", mascotroute);

export default app;
