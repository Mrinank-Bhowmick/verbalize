"use client";

import ChatbotButton from "@/components/bot";
import { useEffect } from "react";

export default function ChatbotPage() {
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

  return (
    <div className="">
      <ChatbotButton
        firstMessage="Hello, I'm your !"
        agentName="Chatbot"
        systemInstruction={"You are a personal assistant of mrinank"}
        description="A friendly chatbot that helps answer your questions."
        agentID="default"
        isEmbedded={true}
      />
    </div>
  );
}
