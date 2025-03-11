import { db, sql } from "./index";
import { agents } from "./schema";

async function main() {
  console.log("🌱 Seeding database with default agents...");

  await db.insert(agents).values([
    {
      agent_id: "agent001",
      client_id: "client123",
      agent_name: "Assistant",
      system_instruction:
        "You are a helpful AI assistant that provides clear and concise information.",
      description: "General purpose assistant",
    },
    {
      agent_id: "agent002",
      client_id: "client123",
      agent_name: "Coder",
      system_instruction:
        "You are an expert programmer who helps with code, debugging, and explaining technical concepts.",
      description: "Programming specialist",
    },
    {
      agent_id: "agent003",
      client_id: "client123",
      agent_name: "Writer",
      system_instruction:
        "You are a creative writer who can help draft, edit, and improve various types of content.",
      description: "Content creation expert",
    },
    {
      agent_id: "agent004",
      client_id: "client456",
      agent_name: "Researcher",
      system_instruction:
        "You are a research assistant who can summarize information and provide well-sourced answers.",
      description: "Research and analysis",
    },
    {
      agent_id: "agent005",
      client_id: "client456",
      agent_name: "Translator",
      system_instruction:
        "You are a language expert who can translate between multiple languages and explain linguistic concepts.",
      description: "Language specialist",
    },
  ]);

  console.log("✅ Seed completed successfully");
  await sql.end();
  process.exit(0);
}

main();
