import { Hono } from "hono";
import { serve } from "@hono/node-server"; // Required for running in Node.js
import helloRoutes from "./routes/hello";
import testChatbotRoutes from "./routes/testchatbot";
import agentsRoutes from "./routes/agents";

const app = new Hono();

app.route("/hello", helloRoutes);
app.route("/testchatbot", testChatbotRoutes);
app.route("/clients/:clientId/agents", agentsRoutes);

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`🚀 Server running at http://localhost:${info.port}`);
  }
);
