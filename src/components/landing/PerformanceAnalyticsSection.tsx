"use client";

import { Reveal } from "./Reveal";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useIsClient } from "@/lib/useIsClient";

const chartData = [
  { week: "Week 1", score: 65 },
  { week: "Week 2", score: 72 },
  { week: "Week 3", score: 68 },
  { week: "Week 4", score: 78 },
  { week: "Week 5", score: 82 },
  { week: "Week 6", score: 85 },
  { week: "Week 7", score: 88 },
];

export function PerformanceAnalyticsSection() {
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { once: true, margin: "-50px 0px" });
  const isMounted = useIsClient();

  return (
    <section
      id="analytics"
      className="py-24 bg-linear-to-br from-[#050507] via-[#0B0B0F] to-[#16161D]"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="space-y-6 max-w-lg">
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-[#E5E7EB] tracking-tight">
                Track Improvement Over Time
              </h2>
              <p className="text-lg text-[#9CA3AF] leading-relaxed">
                Consistency is key. Monitor your overall performance trajectory,
                identify recurring weak points, and ensure you are actually
                improving with each session.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#9CA3AF]">
                    Historical score trends
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
                  <span className="text-[#9CA3AF]">
                    Skill-specific progression
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#EC4899]" />
                  <span className="text-[#9CA3AF]">Weekly analytics</span>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div ref={chartRef} className="relative aspect-4/3 w-full rounded-xl border border-[#1F1F2A] bg-[#111118] p-6 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center border-b border-[#1F1F2A] pb-4 mb-4">
                <div className="text-sm font-medium text-[#E5E7EB]">
                  Performance Score
                </div>
                <div className="text-xs text-[#6B7280]">Last 7 Weeks</div>
              </div>
              {isMounted ? (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F1F2A" vertical={false} />
                    <XAxis
                      dataKey="week"
                      stroke="#6B7280"
                      style={{ fontSize: "12px" }}
                      tick={{ fill: "#6B7280" }}
                    />
                    <YAxis
                      stroke="#6B7280"
                      domain={[0, 100]}
                      style={{ fontSize: "12px" }}
                      tick={{ fill: "#6B7280" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F1F2A",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#E5E7EB",
                      }}
                      labelStyle={{ color: "#E5E7EB" }}
                      formatter={(value) => [`${value}`, "Score"]}
                    />
                    <Bar
                      dataKey="score"
                      fill="#3B82F6"
                      radius={[8, 8, 0, 0]}
                      isAnimationActive={isInView}
                      animationBegin={200}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ height: 280 }} />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
