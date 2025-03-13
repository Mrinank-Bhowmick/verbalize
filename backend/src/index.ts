import { Hono } from "hono";
import { serve } from "@hono/node-server"; // Required for running in Node.js
import helloRoutes from "./routes/hello";
import testChatbotRoutes from "./routes/testchatbot";
import getagentdetails from "./routes/getagentdetails";
import agentsRoutes from "./routes/agents";

const app = new Hono();

app.route("/hello", helloRoutes);
app.route("/testchatbot", testChatbotRoutes);
app.route("/getagentdetails", getagentdetails);
app.route("/clients/:clientId/agents", agentsRoutes);

serve(app, (info) => {
  console.log(`🚀 Server running at http://localhost:${info.port}`);
});
