import { Button } from "./button";
import { BsRobot } from "react-icons/bs";
import Link from "next/link";

interface AgentsCardProps {
  agentName: string;
  agentID: string;
}

const AgentsCard = ({ agentName, agentID }: AgentsCardProps) => {
  return (
    <div className="bg-gradient-to-b from-yellow-400 to-yellow-500 p-6 rounded-lg h-[40vh] w-[30vh] flex flex-col justify-between items-center gap-4 border-2 border-yellow-300 shadow-lg hover:shadow-yellow-500/50 transition-all">
      <div className="text-xl font-bold text-black">{agentName}</div>
      <BsRobot size={70} className="h-3/4 text-black" />
      <div>
        <Link href={`/agents/${agentID}`}>
          <Button className="bg-black text-yellow-400 hover:bg-gray-900 hover:text-yellow-300 border border-yellow-400">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AgentsCard;
