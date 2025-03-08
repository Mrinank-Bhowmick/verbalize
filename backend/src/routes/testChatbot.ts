import { Hono } from "hono";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { env } from "hono/adapter";
import { stream } from "hono/streaming";
import { cors } from "hono/cors";

const testChatbotRoutes = new Hono();

// Enable CORS
testChatbotRoutes.use(
  "/*",
  cors({
    origin: "*", // In production, specify your frontend origin
    allowMethods: ["POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    exposeHeaders: ["X-Vercel-AI-Data-Stream"],
  })
);

// Handle the actual POST request for chat
testChatbotRoutes.post("/", async (c) => {
  const { GOOGLE_API_KEY } = env<{ GOOGLE_API_KEY: string }>(c);
  const google = createGoogleGenerativeAI({ apiKey: GOOGLE_API_KEY });

  // Parse the request body to get the user's message
  const body = await c.req.json();
  const userMessage =
    body.messages?.[body.messages.length - 1]?.content || "Hi";

  const result = streamText({
    model: google("gemini-1.5-pro-latest"),
    prompt: userMessage,
  });

  // Set necessary headers
  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");

  return stream(c, (stream) => stream.pipe(result.toDataStream()));
});

// Keep the OPTIONS handler for preflight requests
testChatbotRoutes.options("/", (c) => {
  return c.text("");
});

export default testChatbotRoutes;
