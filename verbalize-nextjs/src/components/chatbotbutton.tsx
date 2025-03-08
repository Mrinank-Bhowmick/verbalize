"use client";

import { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { useChat } from "@ai-sdk/react";

const ChatbotButton = () => {
  const [showChat, setShowChat] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "http://127.0.0.1:8787/testchatbot",
  });

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showChat ? (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 h-96 flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 ease-in-out">
          <div className="bg-yellow-600 p-4 flex justify-between items-center">
            <h3 className="text-white font-medium">Chat Assistant</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-gray-500 italic text-center mt-4">
                Ask me anything...
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block px-3 py-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-yellow-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </span>
                </div>
              ))
            )}
          </div>
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
                className="bg-yellow-600 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-700 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowChat(true)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <FaRobot className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default ChatbotButton;
