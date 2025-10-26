"use client";

import ChatbotButton from "@/components/bot";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ChatbotContent() {
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

  useEffect(() => {
    const isInIframe = window !== window.parent;

    if (isInIframe) {
      document.body.style.background = "transparent";
      document.body.style.margin = "0";
      document.body.style.overflow = "hidden";
    }
  }, []);

  if (isLoading) {
    return (
      <div className="fixed bottom-6 right-6">
        <div className="bg-gray-700 text-white rounded-full p-4 shadow-lg animate-pulse">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
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

export default function ChatbotPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed bottom-6 right-6">
          <div className="bg-gray-700 text-white rounded-full p-4 shadow-lg animate-pulse">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
        </div>
      }
    >
      <ChatbotContent />
    </Suspense>
  );
}
