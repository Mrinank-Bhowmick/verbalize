"use client";
import { useState, useEffect, useRef } from "react";
import ChatbotButton from "../chatbotbutton";
import { Input } from "@/components/ui/input";
import { Tiktoken } from "js-tiktoken/lite";
import cl100k_base from "js-tiktoken/ranks/cl100k_base";
import { Textarea } from "@/components/ui/textarea";
import { systemInstructionTemplate } from "./systemPrompt";

const Demo = () => {
  const [agentName, setAgentName] = useState("John Doe");
  const [description, setDescription] = useState("");
  const [firstMessage, setFirstMessage] = useState("Hello");
  const [systemInstruction, setSystemInstruction] = useState<string | null>(
    null
  );
  const [tokenCount, setTokenCount] = useState<number>(0);
  const agentid = "trial";
  const targetRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8787"
      : "https://verbalize-api.mrinank-ai.tech";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entires) => {
        entires.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );
    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio play failed:", error);
      });
    }
  }, [isVisible]);

  useEffect(() => {
    if (systemInstruction) {
      const encoder = new Tiktoken(cl100k_base);
      const tokens = encoder.encode(systemInstruction!);
      setTokenCount(tokens.length);
    } else {
      setTokenCount(0);
    }
  }, [systemInstruction]);

  return (
    <>
      {isVisible && (
        <>
          <ChatbotButton
            firstMessage={firstMessage}
            systemInstruction={systemInstruction}
            agentName={agentName}
            description={description}
            agentID={`${agentid}`}
            api={`${baseURL}/demochatbot`}
          />
          <audio ref={audioRef} src="/sound/pop.mp3" preload="auto" />
          {/* Add audio element */}
        </>
      )}
      <div
        className="flex flex-col justify-center items-center mt-20 mb-20"
        id="demo"
      >
        <div>
          <div className="text-center font-extrabold text-6xl md:text-8xl py-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400 font-sans mb-20">
            Try it Now
          </div>

          <div
            className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md border-8 border-orange-500"
            ref={targetRef}
          >
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex flex-col gap-2 flex-1">
                <div className="font-bold text-lg">Name</div>
                <Input
                  value={agentName}
                  type="text"
                  placeholder="Your chatbot name"
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  onChange={(e) => {
                    setAgentName(e.target.value);
                  }}
                />
                <div className="text-sm text-gray-600 italic">
                  This is how your Al chatbot will be named.
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="font-bold text-lg flex items-center gap-2">
                  Description{" "}
                  <span className="text-sm font-normal">(few words)</span>
                </div>
                <Input
                  value={description}
                  type="text"
                  placeholder="Short description"
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <div className="text-sm text-gray-600 italic">
                  This is a short description about your chatbot.
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <div className="font-bold text-lg">First Message</div>
                <Input
                  value={firstMessage}
                  type="text"
                  placeholder="Hey, how can I help you?"
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  onChange={(e) => {
                    setFirstMessage(e.target.value);
                  }}
                />
                <div className="text-sm text-gray-600 italic">
                  First message that will be send by your chatbot.
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <div className="font-bold text-lg">
                System Instruction (optional)
              </div>
              <div className="text-gray-500 text-sm">
                Input token usage -{" "}
                <span
                  className={`font-medium ${
                    tokenCount > 150 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {tokenCount}/150 tokens
                </span>
              </div>
              <Textarea
                className="w-full h-[200px] border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md"
                placeholder={systemInstructionTemplate}
                value={systemInstruction || ""}
                onChange={(e) => {
                  setSystemInstruction(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
