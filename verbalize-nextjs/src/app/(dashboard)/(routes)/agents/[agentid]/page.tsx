"use client";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { BsRobot } from "react-icons/bs";
import { useState, useEffect } from "react";
import ChatbotButton from "@/components/chatbotbutton";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { systemInstructionTemplate } from "./systemPrompt";
import { Tiktoken } from "js-tiktoken/lite";
import cl100k_base from "js-tiktoken/ranks/cl100k_base";

const AgentSchema = z.object({
  agentName: z.string().min(1, { message: "Agent name is required" }),
  description: z.string().min(15).max(30),
  firstMessage: z.string().min(1, { message: "First message is required" }),
});

const AgentPage = () => {
  // agents/[agentid]/page.tsx
  const { agentid } = useParams();
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [firstMessage, setFirstMessage] = useState("");
  const [systemInstruction, setSystemInstruction] = useState<string | null>(
    null
  );
  const [erros, setErrors] = useState<Record<string, string>>({});
  const [tokenCount, setTokenCount] = useState<number>(0);

  useEffect(() => {
    if (systemInstruction) {
      const encoder = new Tiktoken(cl100k_base);
      const tokens = encoder.encode(systemInstruction!);
      setTokenCount(tokens.length);
    }
  }, [systemInstruction]);

  const validateForm = () => {
    try {
      AgentSchema.parse({
        agentName,
        description,
        firstMessage,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const fieldName = err.path[0].toString();

            // For description field, calculate characters left
            if (fieldName === "description" && err.code === "too_small") {
              const currentLength = description.length;
              const requiredLength = 15;
              const charsLeft = requiredLength - currentLength;
              formattedErrors[
                fieldName
              ] = `Min(15) need ${charsLeft} more characters`;
            } else {
              formattedErrors[fieldName] = err.message;
            }
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  useEffect(() => {
    validateForm();
  }, [description, agentName, firstMessage]);

  return (
    <div>
      <div>
        <ChatbotButton
          firstMessage={firstMessage}
          systemInstruction={systemInstruction}
          agentName={agentName}
          description={description}
          agentID={`${agentid}`}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-4 mt-5 mb-5">
          <div className="text-2xl font-bold">General Information</div>
          <div>General Information about your chatbot</div>
        </div>
        <BsRobot size={100} className="mt-10 mb-10" />
        <div>
          <div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <div className="font-bold">Name</div>
                <Input
                  value={agentName}
                  type="text"
                  placeholder="Your chatbot name"
                  onChange={(e) => {
                    setAgentName(e.target.value);
                  }}
                />
                {erros.agentName && (
                  <div className="text-red-500 text-sm">{erros.agentName}</div>
                )}
                <div className="text-sm text-gray-700 italic ">
                  This is how your Al chatbot will be named.
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-bold flex items-end gap-1">
                  Description <div className="text-sm">(few words)</div>
                </div>
                <Input
                  value={description}
                  type="text"
                  placeholder="Short description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                {erros.description && (
                  <div className="text-red-500 text-sm">
                    {erros.description}
                  </div>
                )}
                <div className="text-sm text-gray-700 italic">
                  This is a short description about your chatbot.
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-5 mb-5">
            <div className="font-bold">First Message</div>
            <Input
              value={firstMessage}
              type="text"
              placeholder="Hey, how can I help you?"
              onChange={(e) => {
                setFirstMessage(e.target.value);
              }}
            />
            {erros.firstMessage && (
              <div className="text-red-500 text-sm">{erros.firstMessage}</div>
            )}
            <div className="text-sm text-gray-700 italic">
              First message that will appear by default on chat window.
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-10 mb-5">
            <div className="font-bold text-xl">Configuration</div>
            <div className="text-gray-700 italic">
              Detailed instructions for AI Behavior
            </div>
            <div className="font-bold">System Instruction (optional)</div>
            <div className="text-gray-500 text-sm">
              Input token usage - {tokenCount}/150 tokens
            </div>

            <Textarea
              className="w-[45vw] h-[40vh]"
              placeholder={systemInstructionTemplate}
              onChange={(e) => {
                setSystemInstruction(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPage;
