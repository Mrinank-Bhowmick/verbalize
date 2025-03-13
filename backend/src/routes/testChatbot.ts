import { Hono } from "hono";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { streamText } from "ai";
import { env } from "hono/adapter";
import { stream } from "hono/streaming";
import { cors } from "hono/cors";

const testchatbotroutes = new Hono();

// Enable CORS
testchatbotroutes.use(
  "/*",
  cors({
    origin: "*", // In production, specify your frontend origin
    allowMethods: ["POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    exposeHeaders: ["X-Vercel-AI-Data-Stream"],
  })
);

// Handle the actual POST request for chat
testchatbotroutes.post("/", async (c) => {
  const { GOOGLE_API_KEY } = env<{ GOOGLE_API_KEY: string }>(c);
  const google = createGoogleGenerativeAI({ apiKey: GOOGLE_API_KEY });

  const body = await c.req.json();
  console.log("here", body);

  const { agentID, systemInstruction } = body;
  const userMessage = body.messages;

  // Set necessary headers
  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");

  const result = streamText({
    model: google("gemini-1.5-pro-latest"),
    system: systemInstruction,
    messages: userMessage,
  });

  return result.toDataStreamResponse();
});

// Keep the OPTIONS handler for preflight requests
testchatbotroutes.options("/", (c) => {
  return c.text("");
});

export default testchatbotroutes;
