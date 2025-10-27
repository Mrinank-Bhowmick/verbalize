"use client";

import { useState, useEffect } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { useChat } from "@ai-sdk/react";
import { Turnstile } from "@marsidev/react-turnstile";
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
//import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";

interface chatbotProps {
  firstMessage: string;
  agentName: string;
  systemInstruction: string | null;
  description: string;
  agentID: string;
  api: string;
}

const ChatbotButton = ({
  firstMessage,
  agentName,
  systemInstruction,
  description,
  agentID,
  api,
}: chatbotProps) => {
  const [showChat, setShowChat] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  //const [fingerprint, setFingerprint] = useState<string | null>(null);

  // Generate sessionId when component mounts
  useEffect(() => {
    if (typeof window !== "undefined" && window.crypto) {
      setSessionId(crypto.randomUUID());
    }
  }, []);

  // useEffect(() => {
  //   const fetchFingerprint = async () => {
  //     const fp = await getFingerprint();
  //     setFingerprint(fp);
  //   };

  //   fetchFingerprint();
  // }, []);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: api,
    initialMessages: [{ id: "0", role: "assistant", content: firstMessage }],
    body: {
      agentID: agentID,
      sessionId: sessionId,
      systemInstruction: systemInstruction
        ? systemInstruction
        : `Your name is ${agentName}. Description about you - ${description}`,
      turnstileToken: turnstileToken,
    },
  });
  // Add a custom submit handler to debug
  const debugSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //console.log("Submitting message with sessionId:", sessionId);
    // Call the original handler
    handleSubmit(e);
  };

  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
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
          <div className="p-4 border-t border-gray-200 bg-white text-black">
            {!turnstileToken ? (
              <Turnstile
                siteKey="0x4AAAAAABCeVBWNr19klCWD"
                onSuccess={handleTurnstileSuccess}
                className="text-center"
              />
            ) : (
              <form onSubmit={debugSubmit} className="flex items-center">
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
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowChat(true)}
          className="bg-neutral-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <FaRobot className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default ChatbotButton;
