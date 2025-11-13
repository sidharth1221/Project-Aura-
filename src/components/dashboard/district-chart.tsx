'use client';

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import {
  ChartTooltipContent,
} from "@/components/ui/chart"

interface DistrictChartProps {
  data: { name: string; value: number, fill: string }[];
}

export function DistrictChart({ data }: DistrictChartProps) {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <XAxis 
            type="number" 
            hide 
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={60}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <Tooltip 
             cursor={{ fill: 'hsl(var(--secondary))' }}
             content={<ChartTooltipContent />}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
