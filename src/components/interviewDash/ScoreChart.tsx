"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";
import { useIsClient } from "@/lib/useIsClient";

export function ScoreChart({ scores }: { scores: number[] | null }) {
  const isMounted = useIsClient();
  const data = useMemo(() => {
    return scores?.map((a, i) => ({
      name: `Interview ${i + 1}`,
      score: a,
    }));
  }, [scores]);
  if (!scores || scores.length < 2) {
    return (
      <div className="bg-[#111116] border border-[#27272A] rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center min-h-75">
        <div className="bg-[#1F1F2A] rounded-full p-4 mb-3 border border-[#3F3F46]">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-1">
          More data needed
        </h3>
        <p className="text-gray-400 text-sm max-w-xs">
          Take at least one more interview attempt to see your progress chart.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#111116] border border-[#27272A] rounded-2xl p-6 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white">Score Progress</h3>
        <p className="text-sm text-gray-400">
          Your performance trend over time
        </p>
      </div>
      <div className="h-87.5 w-full">
        {isMounted ? (
          <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#1F1F2A"
              opacity={0.5}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              domain={[40, 100]}
              ticks={[40, 60, 80, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111118",
                border: "1px solid #2D2D3A",
                borderRadius: "8px",
                boxShadow: "none",
              }}
              itemStyle={{ color: "#E5E7EB", fontWeight: "500" }}
              labelStyle={{ color: "#9CA3AF", marginBottom: "4px" }}
              cursor={{
                stroke: "#2D2D3A",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#E5E7EB"
              strokeWidth={2}
              dot={{
                fill: "#111118",
                stroke: "#E5E7EB",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{ r: 6, fill: "#F9FAFB", stroke: "#F9FAFB" }}
            />
          </LineChart>
        </ResponsiveContainer>
        ) : (
          <div style={{ height: 350 }} />
        )}
      </div>
    </div>
  );
}
