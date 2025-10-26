"use client";

import ChatbotButton from "@/components/bot";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ChatbotPage() {
  const searchParams = useSearchParams();
  const agentId = searchParams.get("agentId");
  const clientId = searchParams.get("clientId");

  const [agentData, setAgentData] = useState({
    agentName: "Chatbot",
    firstMessage: "Hello! How can I help you?",
    description: "A friendly chatbot",
    systemInstruction: null as string | null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8787"
      : "https://verbalize-api.mrinank-ai.tech";

  const chatApiUrl = `${baseURL}/testchatbot`;

  // Fetch agent details when component mounts
  useEffect(() => {
    if (agentId && clientId) {
      const fetchAgentData = async () => {
        try {
          const response = await fetch(
            `${baseURL}/clients/${clientId}/agents/${agentId}`
          );

          if (response.ok) {
            const result = await response.json();
            const data = result[0];
            console.log("Fetched agent data:", data);

            setAgentData({
              agentName: data.agentName || "Chatbot",
              firstMessage: data.firstMessage || "Hello! How can I help you?",
              description: data.description || "A friendly chatbot",
              systemInstruction: data.systemInstruction,
            });
          }
        } catch (error) {
          console.error("Error fetching agent data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchAgentData();
    } else {
      setIsLoading(false);
    }
  }, [agentId, clientId, baseURL]);

  // Communicate with parent frame when in iframe
  useEffect(() => {
    // Detect if we're in an iframe
    const isInIframe = window !== window.parent;

    if (isInIframe) {
      // Apply special styles for iframe context
      document.body.style.background = "transparent";
      document.body.style.margin = "0";
      document.body.style.overflow = "hidden";
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading chatbot...</div>
      </div>
    );
  }

  return (
    <div className="">
      <ChatbotButton
        firstMessage={agentData.firstMessage}
        agentName={agentData.agentName}
        systemInstruction={agentData.systemInstruction}
        description={agentData.description}
        agentID={agentId || "default"}
        isEmbedded={true}
        apiUrl={chatApiUrl}
      />
    </div>
  );
}
