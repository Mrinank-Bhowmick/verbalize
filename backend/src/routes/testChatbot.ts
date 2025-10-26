import { Hono } from "hono";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { getConnInfo } from "hono/cloudflare-workers";
import { Analytics } from "../db/d1/schema";
import { drizzle } from "drizzle-orm/d1";
import { eq, and, sql } from "drizzle-orm";
// CF d1
type Bindings = {
  DB: D1Database;
};

const testchatbotroutes = new Hono<{ Bindings: Bindings }>();

// Enable CORS
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://verbalize.mrinank-ai.tech"
    : "*";

testchatbotroutes.use(
  "/*",
  cors({
    origin: allowedOrigin,
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

  const { agentID, systemInstruction, sessionId } = body;
  const userMessage = body.messages;

  const db = drizzle(c.env.DB);

  // Set necessary headers
  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: systemInstruction,
    messages: userMessage,
    onFinish: async (output) => {
      try {
        const tokenCount = output.usage.totalTokens;
        const requestBody = JSON.parse(output.request.body!);
        const msgHistory = requestBody.contents.map((content: any) => ({
          role: content.role,
          text: content.parts[0].text,
        }));
        const info = getConnInfo(c);
        const clientIP = info.remote.address || "unknown";

        console.log("Client IP:", clientIP);
        console.log("Session ID:", sessionId);
        console.log("Tokens used:", tokenCount);

        // Check if session already exists
        const existing = await db
          .select()
          .from(Analytics)
          .where(
            and(
              eq(Analytics.agentId, agentID),
              eq(Analytics.sessionId, sessionId),
              eq(Analytics.clientIP, clientIP)
            )
          )
          .get();

        if (existing) {
          // Update existing session
          await db
            .update(Analytics)
            .set({
              totalTokensUsed: existing.totalTokensUsed + tokenCount,
              messageHistory: JSON.stringify(msgHistory),
              conversationCount: existing.conversationCount + 1,
              lastUpdated: sql`CURRENT_TIMESTAMP`,
            })
            .where(eq(Analytics.id, existing.id));

          console.log("Updated existing analytics record:", existing.id);
        } else {
          // Create new session
          await db.insert(Analytics).values({
            agentId: agentID,
            clientIP: clientIP,
            sessionId: sessionId,
            totalTokensUsed: tokenCount,
            messageHistory: JSON.stringify(msgHistory),
            conversationCount: 1,
          });

          console.log("Created new analytics record for session:", sessionId);
        }
      } catch (error) {
        console.error("Error saving analytics:", error);
      }
    },
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    },
  });

  return result.toDataStreamResponse();
});

// Keep the OPTIONS handler for preflight requests
testchatbotroutes.options("/", (c) => {
  return c.text("");
});

export default testchatbotroutes;
