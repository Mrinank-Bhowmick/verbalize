import { Hono } from "hono";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { streamText } from "ai";
import { env } from "hono/adapter";
import { cors } from "hono/cors";

const demochatbotroute = new Hono();

demochatbotroute.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    exposeHeaders: ["X-Vercel-AI-Data-Stream"],
  })
);

// Handle the actual POST request for chat
demochatbotroute.post("/", async (c) => {
  const {
    GOOGLE_API_KEY,
    TURNSTILE_KEY,
    CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_AI_GATEWAY_ID,
  } = env<{
    GOOGLE_API_KEY: string;
    TURNSTILE_KEY: string;
    CLOUDFLARE_ACCOUNT_ID: string;
    CLOUDFLARE_AI_GATEWAY_ID: string;
  }>(c);

  const google = createGoogleGenerativeAI({
    apiKey: GOOGLE_API_KEY,
    baseURL: `https://gateway.ai.cloudflare.com/v1/${CLOUDFLARE_ACCOUNT_ID}/${CLOUDFLARE_AI_GATEWAY_ID}/google-ai-studio/v1beta`,
  });

  const body = await c.req.json();
  //console.log("here", body);

  const { agentID, systemInstruction, turnstileToken } = body;
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: TURNSTILE_KEY,
        response: turnstileToken,
      }),
    }
  );

  const data = (await response.json()) as any;
  console.log(data);
  if (!data.success) {
    return c.json({
      result: false,
      message: "Cloudflare captcha failed, Refresh page.",
    });
  }
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
demochatbotroute.options("/", (c) => {
  return c.text("");
});

export default demochatbotroute;
