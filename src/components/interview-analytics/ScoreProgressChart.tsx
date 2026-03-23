"use client";

import { useMemo } from "react";
import { useIsClient } from "@/lib/useIsClient";
import { Attempt } from "./types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ScoreProgressChartProps {
  attempts: Attempt[];
}

export function ScoreProgressChart({ attempts }: ScoreProgressChartProps) {
  const isMounted = useIsClient();
  const data = useMemo(() => {
    return attempts.map((a, i) => ({
      name: `Attempt ${i + 1}`,
      score: a.score,
    }));
  }, [attempts]);

  if (attempts.length < 2) {
    return (
      <div className="bg-[#111116] border border-[#27272A] rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center min-h-[300px]">
        <div className="bg-[#1F1F2A] rounded-full p-4 mb-3 border border-[#3F3F46]">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-1">More data needed</h3>
        <p className="text-gray-400 text-sm max-w-xs">Take at least one more interview attempt to see your progress chart.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111116] border border-[#27272A] rounded-2xl p-6 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white">Score Progress</h3>
        <p className="text-sm text-gray-400">Your performance trend over time</p>
      </div>
      
      <div className="h-[280px] w-full">
        {isMounted ? (
          <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#A1A1AA"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#A1A1AA"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F1F2A',
                border: '1px solid #3F3F46',
                borderRadius: '8px',
                color: '#fff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: '#E0D4FF' }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#E0D4FF"
              strokeWidth={3}
              dot={{ fill: '#1F1F2A', stroke: '#E0D4FF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#E0D4FF', stroke: '#1F1F2A', strokeWidth: 2 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
        ) : (
          <div style={{ height: 280 }} />
        )}
      </div>
    </div>
  );
}
