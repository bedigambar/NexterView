"use client";

import { Badge } from "@/components/ui/badge";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

export function InterviewReportPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <div className="rounded-2xl border border-[#1F1F2A] bg-[#111118] shadow-none overflow-hidden transition-all hover:border-[#2D2D3A]">
        <div className="border-b border-[#1F1F2A] bg-[#0B0B0F] p-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#E5E7EB]">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <Badge variant="secondary" className="bg-[#1F2937] text-[#D1D5DB] hover:bg-[#374151] font-normal border-0">
            Sample AI Report
          </Badge>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-36 h-36 rounded-full border-[6px] border-[#1F2937]">
              <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset="36.79" 
                />
              </svg>

              <div className="flex flex-col items-center">
                <span className="text-4xl font-heading font-semibold text-[#F9FAFB]">87</span>
                <span className="text-xs text-[#9CA3AF] font-medium uppercase tracking-widest mt-1">/ 100</span>
              </div>
            </div>
            <div className="mt-5 text-center">
              <div className="text-base font-heading font-semibold text-[#F9FAFB]">Overall Performance</div>
              <div className="text-sm text-[#9CA3AF] font-medium mt-1">Top-tier simulated candidate</div>
            </div>
          </div>
          <div className="space-y-5 pt-2">
            <Reveal delay={0.1}>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#E5E7EB] font-medium">Technical Accuracy</span>
                  <span className="text-[#F9FAFB] font-heading font-semibold">8.5</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#1F1F2A] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="h-full rounded-full bg-[#374151]"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#E5E7EB] font-medium">Communication Clarity</span>
                  <span className="text-[#F9FAFB] font-heading font-semibold">8.0</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#1F1F2A] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "80%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="h-full rounded-full bg-[#374151]"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#E5E7EB] font-medium">Depth of Knowledge</span>
                  <span className="text-[#F9FAFB] font-heading font-semibold">9.0</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#1F1F2A] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    className="h-full rounded-full bg-[#374151]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.5}>
            <div className="mt-6 rounded-xl border border-[#1F1F2A] bg-[#0B0B0F] p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#374151]" />
              <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                <BrainCircuit className="h-3 w-3" /> AI Insight Summary
              </div>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Strong understanding of core React concepts. Improve structured explanation and edge-case handling.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
