"use client";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { BsRobot } from "react-icons/bs";
import { FaCheck, FaCopy } from "react-icons/fa";
import { useState, useEffect, MouseEvent } from "react";
import ChatbotButton from "@/components/bot";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { systemInstructionTemplate } from "./systemPrompt";
import { Tiktoken } from "js-tiktoken/lite";
import cl100k_base from "js-tiktoken/ranks/cl100k_base";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AgentSchema = z.object({
  agentName: z.string().min(1, { message: "Agent name is required" }),
  description: z.string().min(15).max(30),
  firstMessage: z.string().min(1, { message: "First message is required" }),
});

const AgentPage = () => {
  // agents/[agentid]/page.tsx
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8787"
      : "https://verbalize-api.mrinank-ai.tech";

  const { agentid } = useParams();
  const { userId } = useAuth();
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [firstMessage, setFirstMessage] = useState("");
  const [systemInstruction, setSystemInstruction] = useState<string | null>(
    null
  );
  const [isDeployed, setIsDeployed] = useState<boolean>(false);
  const [erros, setErrors] = useState<Record<string, string>>({});
  const [tokenCount, setTokenCount] = useState<number>(0);
  const [copySuccess, setCopySuccess] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogConfig, setDialogConfig] = useState<{
    title: string;
    description: string;
    type: "alert" | "confirm";
    onConfirm?: () => void;
  }>({
    title: "",
    description: "",
    type: "alert",
  });

  useEffect(() => {
    if (systemInstruction) {
      const encoder = new Tiktoken(cl100k_base);
      const tokens = encoder.encode(systemInstruction!);
      setTokenCount(tokens.length);
    }
  }, [systemInstruction]);
  useEffect(() => {
    if (!userId || !agentid || !baseURL) return; // Ensure all values are available

    const fetchAgentDetails = async () => {
      try {
        const response = await fetch(
          `${baseURL}/clients/${userId}/agents/${agentid}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched data:", result);
        const data = result[0];

        setAgentName(data.agentName || "");
        setDescription(data.description || "");
        setFirstMessage(data.firstMessage || "");
        setSystemInstruction(data.systemInstruction || "");
        setIsDeployed(data.isDeployed === 1 || false);
      } catch (error) {
        console.error("Error fetching agent details:", error);
      }
    };

    fetchAgentDetails();
  }, [userId, agentid, baseURL]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, agentName, firstMessage]);

  // Generate embed code for the chatbot
  const generateEmbedCode = () => {
    const embedUrl = `${window.location.origin}/chatbot?agentId=${agentid}&clientId=${userId}`;

    return `<!-- Verbalize Chatbot Embed Code -->
<iframe 
  id="verbalize-chatbot-${agentid}"
  src="${embedUrl}"
  style="position: fixed; bottom: 20px; right: 20px; width: 400px; height: 500px; border: none; z-index: 9999;"
  allow="clipboard-read; clipboard-write"
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
></iframe>`;
  };

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode());
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      setCopySuccess("Failed to copy");
      console.error("Failed to copy:", err);
    }
  };

  const showAlert = (title: string, description: string) => {
    setDialogConfig({
      title,
      description,
      type: "alert",
    });
    setDialogOpen(true);
  };

  const showConfirm = (
    title: string,
    description: string,
    onConfirm: () => void
  ) => {
    setDialogConfig({
      title,
      description,
      type: "confirm",
      onConfirm,
    });
    setDialogOpen(true);
  };

  const saveButton = async (e: MouseEvent) => {
    e.preventDefault();

    // Validate form before saving
    if (!validateForm()) {
      showAlert(
        "Validation Error",
        "Please fix the validation errors before saving."
      );
      return;
    }

    try {
      const response = await fetch(
        `${baseURL}/clients/${userId}/agents/${agentid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agentId: agentid,
            clientId: userId,
            agentName: agentName,
            firstMessage: firstMessage,
            systemInstruction: systemInstruction,
            description: description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Agent saved successfully:", result);
      showAlert("Success", "Agent saved successfully!");
    } catch (error) {
      console.error("Error saving agent:", error);
      showAlert("Error", "Failed to save agent. Please try again.");
    }
  };

  const deleteButton = async (e: MouseEvent) => {
    e.preventDefault();

    showConfirm(
      "Delete Agent",
      `Are you sure you want to delete "${agentName}"? This action cannot be undone.`,
      async () => {
        try {
          const response = await fetch(
            `${baseURL}/clients/${userId}/agents/${agentid}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          showAlert("Success", "Agent deleted successfully!");
          // Redirect to agents page after deletion
          setTimeout(() => {
            window.location.href = "/agents";
          }, 1500);
        } catch (error) {
          console.error("Error deleting agent:", error);
          showAlert("Error", "Failed to delete agent. Please try again.");
        }
      }
    );
  };

  const deployButton = async (e: MouseEvent) => {
    e.preventDefault();

    // If already deployed, undeploy it
    if (isDeployed) {
      showConfirm(
        "Undeploy Agent",
        `Are you sure you want to undeploy "${agentName}"?`,
        async () => {
          try {
            const response = await fetch(
              `${baseURL}/clients/${userId}/agents/${agentid}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  agentId: agentid,
                  clientId: userId,
                  agentName: agentName,
                  firstMessage: firstMessage,
                  systemInstruction: systemInstruction,
                  description: description,
                  isDeployed: 0, // Set deployment flag to false
                }),
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Agent undeployed successfully:", result);
            setIsDeployed(false);
            showAlert("Success", "Agent undeployed successfully!");
          } catch (error) {
            console.error("Error undeploying agent:", error);
            showAlert("Error", "Failed to undeploy agent. Please try again.");
          }
        }
      );
      return;
    }

    // Validate form before deploying
    if (!validateForm()) {
      showAlert(
        "Validation Error",
        "Please fix the validation errors before deploying."
      );
      return;
    }

    try {
      const response = await fetch(
        `${baseURL}/clients/${userId}/agents/${agentid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agentId: agentid,
            clientId: userId,
            agentName: agentName,
            firstMessage: firstMessage,
            systemInstruction: systemInstruction,
            description: description,
            isDeployed: 1, // Set deployment flag to true
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Agent deployed successfully:", result);
      setIsDeployed(true);
      showAlert("Success", "Agent deployed successfully!");
    } catch (error) {
      console.error("Error deploying agent:", error);
      showAlert("Error", "Failed to deploy agent. Please try again.");
    }
  };

  return (
    <>
      <ChatbotButton
        firstMessage={firstMessage}
        systemInstruction={systemInstruction}
        agentName={agentName}
        description={description}
        agentID={`${agentid}`}
      />
      <div className="bg-black min-h-screen text-yellow-50">
        <div className="flex flex-col justify-center items-center">
          <div className="fixed top-6 flex flex-wrap gap-2 justify-between bg-yellow-400/90 transition-all w-4/6 py-2 px-4 rounded-2xl shadow-lg border-2 border-yellow-500">
            <div className="flex gap-2 items-center">
              <Button
                onClick={(e) => deleteButton(e)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </Button>
              {isDeployed && (
                <div className="backdrop-blur-md bg-white/55 text-green-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Deployed
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <Button
                onClick={(e) => saveButton(e)}
                className="bg-green-500 hover:bg-gray-900 text-white text-lg px-6 py-2 border border-yellow-400"
              >
                Save
              </Button>
              <Button
                onClick={(e) => deployButton(e)}
                className="bg-black hover:bg-gray-900 text-white text-lg px-6 py-2 border border-yellow-400"
              >
                {isDeployed ? "Undeploy" : "Deploy"}
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 mt-20 mb-5">
            <div className="text-2xl font-bold text-yellow-400">
              General Information
            </div>
            <div className="text-yellow-100">
              General Information about your chatbot
            </div>
          </div>
          <BsRobot size={100} className="mt-10 mb-10 text-yellow-400" />
          <div>
            <div>
              <div className="flex flex-wrap gap-8">
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-yellow-400">Name</div>
                  <Input
                    value={agentName}
                    type="text"
                    placeholder="Your chatbot name"
                    className="bg-gray-900 text-yellow-50 border-yellow-400"
                    onChange={(e) => {
                      setAgentName(e.target.value);
                    }}
                  />
                  {erros.agentName && (
                    <div className="text-red-500 text-sm">
                      {erros.agentName}
                    </div>
                  )}
                  <div className="text-sm text-yellow-100 italic ">
                    This is how your Al chatbot will be named.
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bold flex items-end gap-1 text-yellow-400">
                    Description <div className="text-sm">(few words)</div>
                  </div>
                  <Input
                    value={description}
                    type="text"
                    placeholder="Short description"
                    className="bg-gray-900 text-yellow-50 border-yellow-400"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  {erros.description && (
                    <div className="text-red-500 text-sm">
                      {erros.description}
                    </div>
                  )}
                  <div className="text-sm text-yellow-100 italic">
                    This is a short description about your chatbot.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-5 mb-5">
              <div className="font-bold text-yellow-400">First Message</div>
              <Input
                value={firstMessage}
                type="text"
                placeholder="Hey, how can I help you?"
                className="bg-gray-900 text-yellow-50 border-yellow-400"
                onChange={(e) => {
                  setFirstMessage(e.target.value);
                }}
              />
              {erros.firstMessage && (
                <div className="text-red-500 text-sm">{erros.firstMessage}</div>
              )}
              <div className="text-sm text-yellow-100 italic">
                First message that will appear by default on chat window.
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-10 mb-5">
              <div className="font-bold text-xl text-yellow-400">
                Configuration
              </div>
              <div className="text-yellow-100 italic">
                Detailed instructions for AI Behavior
              </div>
              <div className="font-bold text-yellow-400">
                System Instruction (optional)
              </div>
              <div className="text-yellow-200 text-sm">
                Input token usage - {tokenCount} tokens
              </div>

              <Textarea
                className="w-[45vw] h-[40vh] bg-gray-900 text-yellow-50 border-yellow-400"
                placeholder={systemInstructionTemplate}
                value={systemInstruction || ""}
                onChange={(e) => {
                  setSystemInstruction(e.target.value);
                }}
              />
            </div>

            {/* Embed Code Section - Only show when deployed */}
            {isDeployed && (
              <div className="flex flex-col gap-4 mt-10 mb-5 p-6 bg-gradient-to-r from-gray-900 to-black rounded-lg border-2 border-yellow-400">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="font-bold text-xl text-yellow-400 flex items-center gap-2">
                      🎉 Your Chatbot is Live!
                    </div>
                    <div className="text-yellow-100 italic">
                      Copy and paste this code into your website
                    </div>
                  </div>
                  <Button
                    onClick={copyEmbedCode}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 flex items-center gap-2"
                  >
                    {copySuccess ? (
                      <>
                        <FaCheck /> {copySuccess}
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute top-2 right-2 text-xs text-yellow-400 bg-gray-800 px-2 py-1 rounded">
                    HTML
                  </div>
                  <Textarea
                    className="w-full h-[30vh] font-mono text-sm bg-gray-900 text-yellow-400 border-yellow-500"
                    value={generateEmbedCode()}
                    readOnly
                    onClick={(e) => {
                      e.currentTarget.select();
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 text-sm text-yellow-100">
                  <div className="font-semibold text-yellow-400">
                    📋 Integration Instructions:
                  </div>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>
                      Copy the code above using the &ldquo;Copy Code&rdquo;
                      button
                    </li>
                    <li>
                      Paste it before the closing{" "}
                      <code className="bg-gray-800 px-1 rounded text-yellow-400">
                        &lt;/body&gt;
                      </code>{" "}
                      tag in your HTML file
                    </li>
                    <li>The chatbot will appear in the bottom-right corner</li>
                    <li>
                      Customize the position by modifying the{" "}
                      <code className="bg-gray-800 px-1 rounded text-yellow-400">
                        style
                      </code>{" "}
                      attribute
                    </li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alert Dialog */}
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{dialogConfig.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {dialogConfig.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {dialogConfig.type === "confirm" ? (
                <>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      dialogConfig.onConfirm?.();
                      setDialogOpen(false);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </>
              ) : (
                <AlertDialogAction onClick={() => setDialogOpen(false)}>
                  OK
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default AgentPage;
