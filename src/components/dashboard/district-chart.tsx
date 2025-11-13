'use client';

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart"

interface DistrictChartProps {
  data: { name: string; value: number, fill: string }[];
}

const chartConfig = {
  value: {
    label: "Adoption",
  },
  Koramangala: {
    label: "Koramangala",
    color: "hsl(var(--chart-1))",
  },
  Indiranagar: {
    label: "Indiranagar",
    color: "hsl(var(--chart-2))",
  },
  Jayanagar: {
    label: "Jayanagar",
    color: "hsl(var(--chart-3))",
  },
  Whitefield: {
    label: "Whitefield",
    color: "hsl(var(--chart-4))",
  },
  'Electronic City': {
    label: "Electronic City",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function DistrictChart({ data }: DistrictChartProps) {
  return (
    <div className="h-[350px] w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart 
            data={data} 
            layout="vertical" 
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
            accessibilityLayer
        >
          <XAxis 
            type="number" 
            hide 
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={80}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <Tooltip 
             cursor={{ fill: 'hsl(var(--secondary))' }}
             content={<ChartTooltipContent indicator="line" nameKey="name" />}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
