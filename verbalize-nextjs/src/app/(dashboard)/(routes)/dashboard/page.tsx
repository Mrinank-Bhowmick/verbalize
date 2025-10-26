"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface Agent {
  agentId: string;
  clientId: string;
  agentName: string;
  firstMessage: string;
  systemInstruction: string | null;
  description: string | null;
  isDeployed: number;
  createdAt: string;
}

interface AnalyticsRecord {
  id: number;
  agentId: string;
  clientIP: string;
  sessionId: string;
  totalTokensUsed: number;
  messageHistory: string;
  conversationCount: number;
  lastUpdated: string;
  createdAt: string;
}

interface Message {
  role: "user" | "assistant" | "model";
  content?: string;
  text?: string;
}

interface SessionData {
  sessionId: string;
  agentId: string;
  agentName: string;
  messages: Message[];
  totalTokens: number;
  messageCount: number;
  lastUpdated: string;
}

interface ProcessedAnalytics {
  overview: {
    totalConversations: number;
    totalTokens: number;
    totalMessages: number;
    totalAgents: number;
  };
  perAgentStats: Array<{
    agentId: string;
    agentName: string;
    conversations: number;
    tokens: number;
    messages: number;
  }>;
  sessions: SessionData[];
}

const Dashboard = () => {
  const { user } = useUser();
  const [analytics, setAnalytics] = useState<ProcessedAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(
    new Set()
  );

  // Base URL configuration
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8787"
      : "https://verbalize-backend.mrinank-ai.workers.dev";

  const toggleSession = (sessionId: string) => {
    setExpandedSessions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId);
      } else {
        newSet.add(sessionId);
      }
      return newSet;
    });
  };

  // Client-side calculation functions
  const processAnalytics = (
    agents: Agent[],
    analyticsData: AnalyticsRecord[]
  ): ProcessedAnalytics => {
    // Create agent lookup map
    const agentMap = new Map(agents.map((a) => [a.agentId, a]));

    // Calculate overview
    const uniqueSessions = new Set(analyticsData.map((a) => a.sessionId));
    const totalTokens = analyticsData.reduce(
      (sum, a) => sum + a.totalTokensUsed,
      0
    );
    const totalMessages = analyticsData.reduce(
      (sum, a) => sum + a.conversationCount,
      0
    );

    // Calculate per-agent stats
    const agentStatsMap = new Map<
      string,
      { conversations: Set<string>; tokens: number; messages: number }
    >();

    analyticsData.forEach((record) => {
      if (!agentStatsMap.has(record.agentId)) {
        agentStatsMap.set(record.agentId, {
          conversations: new Set(),
          tokens: 0,
          messages: 0,
        });
      }
      const stats = agentStatsMap.get(record.agentId)!;
      stats.conversations.add(record.sessionId);
      stats.tokens += record.totalTokensUsed;
      stats.messages += record.conversationCount;
    });

    const perAgentStats = Array.from(agentStatsMap.entries())
      .map(([agentId, stats]) => ({
        agentId,
        agentName: agentMap.get(agentId)?.agentName || "Unknown",
        conversations: stats.conversations.size,
        tokens: stats.tokens,
        messages: stats.messages,
      }))
      .sort((a, b) => b.conversations - a.conversations);

    // Process sessions with message history
    const sessions: SessionData[] = analyticsData.map((record) => {
      let messages: Message[] = [];
      try {
        const parsed = JSON.parse(record.messageHistory);
        messages = Array.isArray(parsed) ? parsed : [];

        // Log for debugging
        console.log("Parsed messages for session:", record.sessionId, messages);
      } catch (e) {
        console.error("Failed to parse message history:", e);
      }

      return {
        sessionId: record.sessionId,
        agentId: record.agentId,
        agentName: agentMap.get(record.agentId)?.agentName || "Unknown",
        messages,
        totalTokens: record.totalTokensUsed,
        messageCount: record.conversationCount,
        lastUpdated: record.lastUpdated,
      };
    });

    return {
      overview: {
        totalConversations: uniqueSessions.size,
        totalTokens,
        totalMessages,
        totalAgents: agents.length,
      },
      perAgentStats,
      sessions,
    };
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await fetch(`${baseURL}/analytics/${user.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch analytics");
        }

        const data = await response.json();

        console.log("Raw analytics data:", data);

        // Process the raw data client-side
        if (data.agents && data.analytics) {
          const processed = processAnalytics(data.agents, data.analytics);
          console.log("Processed analytics:", processed);
          setAnalytics(processed);
        } else {
          setAnalytics(null);
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setAnalytics(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user?.id, baseURL]);

  if (loading) {
    return (
      <div className="h-full bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading analytics...</div>
      </div>
    );
  }

  // Set default empty state for new users
  const displayAnalytics = analytics || {
    overview: {
      totalConversations: 0,
      totalTokens: 0,
      totalMessages: 0,
      totalAgents: 0,
    },
    perAgentStats: [],
    sessions: [],
  };

  return (
    <div className="h-full bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">
            {displayAnalytics.sessions.length === 0
              ? "Start using your chatbots to see analytics"
              : "Overview of your chatbot performance"}
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">
              Total Conversations
            </div>
            <div className="text-3xl font-bold text-yellow-400">
              {displayAnalytics.overview.totalConversations.toLocaleString()}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Total Tokens Used</div>
            <div className="text-3xl font-bold text-blue-400">
              {displayAnalytics.overview.totalTokens.toLocaleString()}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Total Messages</div>
            <div className="text-3xl font-bold text-green-400">
              {displayAnalytics.overview.totalMessages.toLocaleString()}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Active Agents</div>
            <div className="text-3xl font-bold text-purple-400">
              {displayAnalytics.overview.totalAgents}
            </div>
          </div>
        </div>

        {/* Per-Agent Stats */}
        <div className="bg-zinc-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Agent Performance</h2>
          {displayAnalytics.perAgentStats.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-3 px-4">Agent Name</th>
                    <th className="text-right py-3 px-4">Conversations</th>
                    <th className="text-right py-3 px-4">Messages</th>
                    <th className="text-right py-3 px-4">Tokens Used</th>
                  </tr>
                </thead>
                <tbody>
                  {displayAnalytics.perAgentStats.map((stat) => (
                    <tr
                      key={stat.agentId}
                      className="border-b border-zinc-800 hover:bg-zinc-800/50"
                    >
                      <td className="py-3 px-4">{stat.agentName}</td>
                      <td className="text-right py-3 px-4">
                        {stat.conversations.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {stat.messages.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {stat.tokens.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No agent data available yet. Create and deploy agents to see
              performance metrics.
            </div>
          )}
        </div>

        {/* Recent Conversations */}
        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Session Message History</h2>
          {displayAnalytics.sessions.length > 0 ? (
            <div className="space-y-4">
              {displayAnalytics.sessions.map((session) => (
                <div
                  key={session.sessionId}
                  className="bg-zinc-800 rounded-lg overflow-hidden"
                >
                  {/* Session Header */}
                  <div
                    className="p-4 flex justify-between items-center cursor-pointer hover:bg-zinc-700/50 transition-colors"
                    onClick={() => toggleSession(session.sessionId)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-lg">
                          {session.agentName}
                        </span>
                        <span className="text-xs text-gray-400 bg-zinc-700 px-2 py-1 rounded">
                          {session.sessionId.slice(0, 8)}...
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {session.messageCount} messages · {session.totalTokens}{" "}
                        tokens ·{" "}
                        {new Date(session.lastUpdated).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-gray-400">
                      {expandedSessions.has(session.sessionId) ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Message History */}
                  {expandedSessions.has(session.sessionId) && (
                    <div className="p-4 pt-0 border-t border-zinc-700">
                      <div className="space-y-3 mt-3 max-h-96 overflow-y-auto">
                        {session.messages.length > 0 ? (
                          session.messages.map((message, idx) => {
                            const isUser = message.role === "user";
                            const messageText =
                              message.content || message.text || "";

                            return (
                              <div
                                key={idx}
                                className={`p-3 rounded-lg ${
                                  isUser
                                    ? "bg-blue-500/20 border border-blue-500/30 ml-8"
                                    : "bg-green-500/20 border border-green-500/30 mr-8"
                                }`}
                              >
                                <div className="text-xs text-gray-400 mb-1 font-semibold uppercase">
                                  {isUser ? "User" : "Assistant"}
                                </div>
                                <div className="text-sm text-white whitespace-pre-wrap">
                                  {messageText}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center text-gray-500 py-4">
                            No messages available
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No conversation history yet. Start chatting with your agents to
              see message history.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
