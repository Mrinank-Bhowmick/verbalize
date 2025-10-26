"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

interface TrendData {
  date: string;
  conversations: number;
  tokens: number;
}

interface GradientChartProps {
  data: TrendData[];
}

const chartConfig = {
  conversations: {
    label: "Conversations",
    color: "hsl(var(--chart-1))",
  },
  tokens: {
    label: "Tokens (K)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function GradientChartComponent({ data }: GradientChartProps) {
  // Format data for the chart
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    conversations: item.conversations,
    tokens: Math.round(item.tokens / 1000), // Convert to thousands for better display
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>7-Day Conversation Trends</CardTitle>
        <CardDescription>
          Daily conversations and token usage (in thousands)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient
                id="fillConversations"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-conversations)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-conversations)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTokens" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-tokens)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-tokens)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="conversations"
              type="natural"
              fill="url(#fillConversations)"
              fillOpacity={0.4}
              stroke="var(--color-conversations)"
              stackId="a"
            />
            <Area
              dataKey="tokens"
              type="natural"
              fill="url(#fillTokens)"
              fillOpacity={0.4}
              stroke="var(--color-tokens)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
