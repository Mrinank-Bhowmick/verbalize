import { Button } from "./button";
import { BsRobot } from "react-icons/bs";
import Link from "next/link";

interface AgentsCardProps {
  agentName: string;
  agentID: string;
}

const AgentsCard = ({ agentName, agentID }: AgentsCardProps) => {
  return (
    <div className="bg-gradient-to-b from-yellow-200 to-yellow-300 p-6 rounded-lg h-[40vh] w-[30vh] flex flex-col justify-between items-center gap-4">
      <div className="text-xl font-bold">{agentName}</div>
      <BsRobot size={70} className="h-3/4" />
      <div>
        <Link href={`/agents/${agentID}`}>
          <Button className="bg-white text-black hover:bg-gray-200">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AgentsCard;
