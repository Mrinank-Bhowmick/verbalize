import { Button } from "./button";

interface AgentsCardProps {
  agentName: string;
}

const AgentsCard = ({ agentName }: AgentsCardProps) => {
  return (
    <div className="bg-gradient-to-b from-yellow-200 to-yellow-300 p-6 rounded-lg h-[40vh] w-[30vh] flex flex-col justify-between items-center gap-4">
      <div className="text-xl font-bold">{agentName}</div>
      <div>
        <Button>View</Button>
      </div>
    </div>
  );
};

export default AgentsCard;
