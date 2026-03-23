"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useIsClient } from "@/lib/useIsClient";

export function MiniScoreChart({ scores }: { scores?: number[] }) {
  const isMounted = useIsClient();
  const data = (scores ?? []).map((score, index) => ({
    name: `#${index + 1}`,
    score,
  }));

  if (data.length === 0) {
    return (
      <Card className="bg-[#111118] border-[#1F1F2A] shadow-none h-full flex flex-col rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-heading font-semibold text-[#F9FAFB]">
            Performance Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-4 px-4 min-h-0 flex items-center justify-center">
          <p className="text-sm text-gray-400 text-center">
            No performance data yet. Complete an interview to see your trend.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#111118] border-[#1F1F2A] shadow-none h-full flex flex-col rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-heading font-semibold text-[#F9FAFB]">Performance Trend</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-2 px-2 min-h-0 overflow-hidden">
        <div className="h-52.5 w-full overflow-hidden">
          {isMounted ? (
            <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={data} margin={{ top: 8, right: 10, left: -12, bottom: 24 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#374151" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#374151" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                stroke="#6B7280" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10}
                height={28}
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111118",
                  border: "1px solid #1F1F2A",
                  borderRadius: "8px",
                  color: "#E5E7EB",
                  boxShadow: "none"
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#6B7280"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorScore)"
              />
            </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 210 }} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
