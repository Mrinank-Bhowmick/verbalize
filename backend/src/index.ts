import { Hono } from "hono";
import { serve } from "@hono/node-server";
import testChatbotRoutes from "./routes/testchatbot";
import agentsRoutes from "./routes/agents";
import demochatbotroute from "./routes/demochatbot";

const app = new Hono();

app.get("/", async (c) => {
  return c.json({ hello: "world" });
});

app.route("/testchatbot", testChatbotRoutes);
app.route("/clients/:clientId/agents", agentsRoutes);
app.route("/demochatbot", demochatbotroute);

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`🚀 Server running at http://localhost:${info.port}`);
  }
);
