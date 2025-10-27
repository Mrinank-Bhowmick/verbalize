"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaRobot, FaTimes } from "react-icons/fa";
import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/shadcn-io/ai/conversation";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/shadcn-io/ai/message";
import userAvatar from "../../public/images/user.png";
import botAvatar from "../../public/images/bot.png";
import { Response } from "@/components/ui/shadcn-io/ai/response";

interface chatbotProps {
  firstMessage: string;
  agentName: string;
  systemInstruction: string | null;
  description: string;
  agentID: string;
  isEmbedded?: boolean;
}

export default function ChatbotButton({
  firstMessage,
  agentName,
  systemInstruction,
  description,
  agentID,
  isEmbedded = false,
}: chatbotProps) {
  const [showChat, setShowChat] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine API URL based on environment or prop
  const chatApiUrl =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8787/testchatbot"
      : "https://verbalize-api.mrinank-ai.tech/testchatbot";

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: chatApiUrl,
    initialMessages: [
      {
        id: "initial",
        role: "assistant",
        content: firstMessage,
      },
    ],
    body: {
      agentID: agentID,
      systemInstruction: systemInstruction
        ? systemInstruction
        : `Your name is ${agentName}. Description about you - ${description}`,
    },
  });

  // Notify parent window when chat state changes (for iframe embedding)
  useEffect(() => {
    if (isEmbedded && window.parent !== window) {
      if (showChat) {
        window.parent.postMessage("chatbot-opened", "*");
      } else {
        window.parent.postMessage("chatbot-closed", "*");
      }
    }
  }, [showChat, isEmbedded]);

  // For embedded mode, adjust position and appearance
  const containerClass = isEmbedded
    ? "fixed bottom-0 right-0 z-50"
    : "fixed bottom-6 right-6 z-50";

  // Don't render on server side
  if (!mounted) return null;

  const chatbotContent = (
    <div className={containerClass} style={{ position: "fixed" }}>
      {showChat ? (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 h-96 flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 ease-in-out">
          <div className="bg-black p-4 flex justify-between items-center">
            <h3 className="text-white font-medium">{agentName}</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gray-200 transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>
          <Conversation
            className="relative w-full text-black"
            style={{ height: "250px" }}
          >
            <ConversationContent>
              {messages.length === 0 && firstMessage == "" ? (
                <p className="text-gray-500 italic text-center mt-4">
                  Ask me anything...
                </p>
              ) : (
                messages.map((message) => (
                  <Message from={message.role} key={message.id}>
                    <MessageContent>
                      <Response>{message.content}</Response>
                    </MessageContent>
                    {message.role === "assistant" ? (
                      <MessageAvatar name={agentName} src={botAvatar.src} />
                    ) : (
                      <MessageAvatar name="You" src={userAvatar.src} />
                    )}
                  </Message>
                ))
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
          <div className="p-4 border-t border-gray-200 bg-white">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="text"
                name="prompt"
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 transition-colors cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowChat(true)}
          className="bg-gray-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <FaRobot className="text-2xl" />
        </button>
      )}
    </div>
  );

  // Use portal to render outside parent container hierarchy
  return createPortal(chatbotContent, document.body);
}
