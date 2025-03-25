"use client";

import { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { useChat } from "@ai-sdk/react";
import { Turnstile } from "@marsidev/react-turnstile";

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
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: api,
    initialMessages: [{ id: "0", role: "assistant", content: firstMessage }],
    body: {
      agentID: agentID,
      systemInstruction: systemInstruction
        ? systemInstruction
        : `Your name is ${agentName}. Description about you - ${description}`,
      turnstileToken: turnstileToken,
    },
  });
  // Add a custom submit handler to debug
  const debugSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("API endpoint:", api);
    console.log("Input:", input);
    console.log("Turnstile token:", turnstileToken);

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
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 && firstMessage == "" ? (
              <p className="text-gray-500 italic text-center mt-4">
                Ask me anything...
              </p>
            ) : (
              <div>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <span
                      className={`inline-block px-3 py-2 rounded-lg ${
                        message.role === "user"
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <div
                        className={`text-xs font-medium text-gray-500 mb-1 ${
                          message.role === "user" ? "hidden" : ""
                        }`}
                      >
                        {agentName}
                      </div>
                      {message.content}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200 bg-white">
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
