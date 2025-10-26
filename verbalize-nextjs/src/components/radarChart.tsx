"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface AgentStat {
  agentId: string;
  agentName: string;
  conversations: number;
  tokens: number;
  messages: number;
}

interface RadarChartProps {
  data: AgentStat[];
}

const chartConfig = {
  conversations: {
    label: "Conversations",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RadarChartComponent({ data }: RadarChartProps) {
  // Format data for radar chart - take top 6 agents
  const chartData = data.slice(0, 6).map((item) => ({
    agent:
      item.agentName.length > 15
        ? item.agentName.slice(0, 15) + "..."
        : item.agentName,
    conversations: item.conversations,
  }));

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Agent Performance</CardTitle>
        <CardDescription>Conversations per agent (top 6)</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid className="fill-[--color-conversations] opacity-20" />
            <PolarAngleAxis dataKey="agent" />
            <Radar
              dataKey="conversations"
              fill="var(--color-conversations)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
