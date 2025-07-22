import { Hono } from "hono";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { streamText } from "ai";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { createMem0 } from "@mem0/vercel-ai-provider";

const mascotroute = new Hono();

// Enable CORS
mascotroute.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    exposeHeaders: ["X-Vercel-AI-Data-Stream"],
  })
);

// Handle the actual POST request for chat
mascotroute.post("/", async (c) => {
  const { GOOGLE_API_KEY, mem0ApiKey } = env<{
    GOOGLE_API_KEY: string;
    mem0ApiKey: string;
  }>(c);
  const google = createGoogleGenerativeAI({ apiKey: GOOGLE_API_KEY });
  const mem0 = createMem0({
    provider: "gemini",
    mem0ApiKey: mem0ApiKey,
    apiKey: GOOGLE_API_KEY,
  });

  const body = await c.req.json();
  console.log("here", body);

  const { user_id, systemInstruction } = body;
  const userMessage = body.messages;

  // Set necessary headers
  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");

  const result = streamText({
    model: mem0("gemini-2.5-flash", { user_id: user_id }),
    system: systemInstruction,
    messages: userMessage,
  });

  return result.toDataStreamResponse();
});

// Keep the OPTIONS handler for preflight requests
mascotroute.options("/", (c) => {
  return c.text("");
});

export default mascotroute;
