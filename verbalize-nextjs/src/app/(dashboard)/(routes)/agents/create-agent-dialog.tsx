"use client";

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
import { useRouter } from "next/navigation";

interface CreateAgentDialogProps {
  userId: string;
}

export default function CreateAgentDialog({ userId }: CreateAgentDialogProps) {
  const [open, setOpen] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [type, setType] = useState("Chatbot");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8787"
      : "https://verbalize-api.mrinank-ai.tech";

  const createAgent = async () => {
    if (!agentName.trim()) {
      alert("Please enter an agent name");
      return;
    }

    // Generate a unique agent ID
    const agentId = `${agentName
      .toLowerCase()
      .replace(/\s+/g, "-")}-${Date.now()}`;

    setIsLoading(true);

    try {
      const response = await fetch(`${baseURL}/clients/${userId}/agents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agentId: agentId,
          clientId: userId,
          agentName: agentName,
          description: "New chatbot description",
          firstMessage: "Hello! How can I help you today?",
          systemInstruction: null,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Agent created successfully:", result);

      // Close dialog and redirect to the new agent page
      setOpen(false);
      setAgentName("");
      router.push(`/agents/${agentId}`);
      router.refresh(); // Refresh to get updated data
    } catch (error) {
      console.error("Error creating agent:", error);
      alert("Failed to create agent. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 p-6 rounded-lg h-[40vh] w-[30vh] flex flex-col justify-center items-center border-2 border-yellow-400 shadow-lg hover:shadow-yellow-500/50 transition-all">
      <CiCirclePlus size={70} className="h-3/4 text-yellow-400" />
      <div className="h-1/4 flex items-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 border border-yellow-300">
              Create
            </Button>
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                >
                  <option value="Chatbot">Chatbot</option>
                  <option value="disabled" disabled>
                    Agent (Coming Soon)
                  </option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={createAgent} disabled={isLoading}>
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
