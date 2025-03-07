"use client";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { BsRobot } from "react-icons/bs";
import { useState } from "react";

const AgentPage = () => {
  // agents/[agentid]/page.tsx
  const { agentid } = useParams();
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-start gap-4 mt-5 mb-5">
          <div className="text-2xl font-bold">General Information</div>
          <div>General Information about your chatbot</div>
        </div>
        <BsRobot size={100} className="mt-10 mb-10" />
        <div>
          <div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <div>Name</div>
                <Input
                  value={agentName}
                  type="text"
                  placeholder="Your chatbot name"
                  onChange={(e) => setAgentName(e.target.value)}
                />
                <div className="text-sm text-gray-700 ">
                  This is how your Al chatbot will be named.
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>Description</div>
                <Input
                  value={description}
                  type="text"
                  placeholder="Short description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="text-sm text-gray-700">
                  This is a short description about your chatbot.
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-5 mb-5">
            <div>Configuration</div>
            <div>Detailed instructions for AI Behavior</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPage;
