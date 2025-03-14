import { db, sql } from "./index";
import { savedAgents } from "./schema";

async function main() {
  console.log("🌱 Seeding database with default agents...");

  await db.insert(savedAgents).values([
    {
      agentId: "agent001",
      clientId: "client123",
      agentName: "Assistant",
      systemInstruction:
        "You are a helpful AI assistant that provides clear and concise information.",
      description: "General purpose assistant",
      firstMessage: "Hey, how can I help you?",
    },
    {
      agentId: "agent002",
      clientId: "client123",
      agentName: "Coder",
      systemInstruction:
        "You are an expert programmer who helps with code, debugging, and explaining technical concepts.",
      description: "Programming specialist",
      firstMessage: "Hey, how can I help you?",
    },
    {
      agentId: "agent003",
      clientId: "client123",
      agentName: "Writer",
      systemInstruction:
        "You are a creative writer who can help draft, edit, and improve various types of content.",
      description: "Content creation expert",
      firstMessage: "Hey, how can I help you?",
    },
    {
      agentId: "agent004",
      clientId: "client456",
      agentName: "Researcher",
      systemInstruction:
        "You are a research assistant who can summarize information and provide well-sourced answers.",
      description: "Research and analysis",
      firstMessage: "Hey, how can I help you?",
    },
    {
      agentId: "agent005",
      clientId: "client456",
      agentName: "Translator",
      systemInstruction:
        "You are a language expert who can translate between multiple languages and explain linguistic concepts.",
      description: "Language specialist",
      firstMessage: "Hey, how can I help you?",
    },
  ]);

  console.log("✅ Seed completed successfully");
  await sql.end();
  process.exit(0);
}

main();
