// Cloudflare workers
import { Hono } from "hono";
import { cors } from "hono/cors";
//import { serve } from "@hono/node-server";
import testChatbotRoutes from "./routes/testchatbot";
import agentsRoutes from "./routes/agents";
import demochatbotroute from "./routes/demochatbot";
import mascotroute from "./routes/mascot";

export type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Global CORS configuration
app.use(
  "*",
  cors({
    origin: (origin) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://verbalize.mrinank-ai.tech",
      ];
      return origin || "*";
    },
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

export default app;
