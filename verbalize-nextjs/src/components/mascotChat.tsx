import { useChat } from "@ai-sdk/react";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";

const MascotChat = () => {
  const [fingerprint, setFingerprint] = useState("");

  useEffect(() => {
    getFingerprint()
      .then((result) => {
        setFingerprint(result);
      })
      .catch((error) => {
        console.error("Error getting fingerprint:", error);
      });
  }, []);

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8787"
      : "https://verbalize-api.mrinank-ai.tech";

  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: `${baseURL}/mascot`,
    initialMessages: [
      { id: "0", role: "assistant", content: "Hello, visitor" },
    ],
    body: {
      user_id: fingerprint,
    },
  });

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto border rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 text-black">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-3 p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-100 ml-auto max-w-[80%]"
                  : "bg-gray-100 max-w-[80%]"
              }`}
            >
              <div className="font-semibold">
                {message.role === "user" ? "You" : "Verbalize"}
              </div>
              <div>{message.content}</div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Start a conversation
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={status === "streaming"}
        />
        <button
          type="submit"
          disabled={status === "streaming" || !input.trim()}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MascotChat;
