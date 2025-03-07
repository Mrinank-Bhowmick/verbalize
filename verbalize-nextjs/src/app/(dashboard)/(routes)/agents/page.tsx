"use client";
import AgentsCard from "@/components/ui/agentsCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import Link from "next/link";

const AgentsPage = () => {
  const [open, setOpen] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [type, setType] = useState("Chatbot");

  return (
    <div className="h-full">
      <div className="font-extrabold text-4xl text-center mt-[5vh] mb-[5vh]">
        Agents Arena
      </div>
      <div className="flex gap-4 p-4 flex-wrap ">
        <div className="bg-gradient-to-b from-gray-200 to-gray-400 p-6 rounded-lg h-[40vh] w-[30vh] flex flex-col justify-center items-center">
          <CiCirclePlus size={70} className="h-3/4" />
          <div className="h-1/4 flex items-end">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Create</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>New Chatbot</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new chatbot
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4 py-4">
                  <div className="flex items-center space-x-4">
                    <Label htmlFor="name" className="w-20 text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Chatbot Name"
                      className="flex-1"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Label htmlFor="type" className="w-20 text-right">
                      Type
                    </Label>
                    <select
                      id="type"
                      className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="Chatbot">Chatbot</option>
                      <option value="disabled" disabled>
                        Agent (Coming Soon)
                      </option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Link href={`/agents/${agentName}`}>
                    <Button type="button">Create</Button>
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <AgentsCard agentName="Mrinank" agentID="mrinank" />
      </div>
    </div>
  );
};

export default AgentsPage;
