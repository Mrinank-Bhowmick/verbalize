// Cloudflare workers
import { Hono } from "hono";
import { cors } from "hono/cors";
//import { serve } from "@hono/node-server";
import testChatbotRoutes from "./routes/testChatbot";
import agentsRoutes from "./routes/agents";
import demochatbotroute from "./routes/demochatbot";
import mascotroute from "./routes/mascot";
import analyticsRoutes from "./routes/analytics";

export type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();
// Enable CORS
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://verbalize.mrinank-ai.tech"
    : "*";

// Global CORS configuration
app.use(
  "*",
  cors({
    origin: allowedOrigin,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["X-Vercel-AI-Data-Stream"],
    credentials: false,
    maxAge: 86400, // 24 hours
  })
);

app.get("/", async (c) => {
  return c.json({ hello: "world" });
});

app.route("/testchatbot", testChatbotRoutes);
app.route("/clients/:clientId/agents", agentsRoutes);
app.route("/demochatbot", demochatbotroute);
app.route("/mascot", mascotroute);
app.route("/analytics", analyticsRoutes);

export default app;
