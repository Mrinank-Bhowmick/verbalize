import AgentsCard from "@/components/ui/agentsCard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateAgentDialog from "./create-agent-dialog";

type Agent = {
  agentId: string;
  agentName: string;
  isDeployed: boolean;
};

async function getAgents(userId: string): Promise<Agent[]> {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8787"
      : "https://verbalize-api.mrinank-ai.tech";

  try {
    const response = await fetch(`${baseURL}/clients/${userId}/agents`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Failed to fetch agents: ${response.status}`);
      return [];
    }

    const data = (await response.json()) as Agent[];
    return data;
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
}

const AgentsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const agents = await getAgents(userId);
  const deployedAgents = agents.filter((agent) => agent.isDeployed);
  const savedAgents = agents.filter((agent) => !agent.isDeployed);

  return (
    <div className="h-full bg-black min-h-screen">
      <div className="font-extrabold text-4xl text-center mt-[5vh] mb-[5vh] text-yellow-400">
        Agents Arena
      </div>
      <div>
        <div className="text-2xl p-4 font-bold text-yellow-400">Deployed</div>
        <div className="flex gap-4 p-4 flex-wrap ">
          <CreateAgentDialog userId={userId} />
          <div className="flex flex-wrap gap-4">
            {deployedAgents.map((val) => {
              return (
                <AgentsCard
                  key={val.agentId}
                  agentName={val.agentName}
                  agentID={val.agentId}
                />
              );
            })}
          </div>
        </div>
        <div>
          <div className="text-2xl p-4 font-bold text-yellow-400">
            Saved Chatbots
          </div>
          <div className="flex flex-wrap gap-4 p-4">
            {savedAgents.map((val) => {
              return (
                <AgentsCard
                  key={val.agentId}
                  agentName={val.agentName}
                  agentID={val.agentId}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;
