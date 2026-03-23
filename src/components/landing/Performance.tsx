"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Reveal } from "./Reveal";

const metrics = [
  {
    label: "Communication",
    score: 7.8,
    feedback:
      "Clear articulation, but could structure explanations more sequentially.",
    width: "78%",
  },
  {
    label: "Problem Solving",
    score: 8.4,
    feedback:
      "Strong analytical approach. Edge cases were identified correctly.",
    width: "84%",
  },
  {
    label: "Technical Depth",
    score: 6.9,
    feedback:
      "Good core understanding. Deepen knowledge of underlying framework internals.",
    width: "69%",
  },
  {
    label: "Confidence",
    score: 7.2,
    feedback:
      "Generally assured delivery. Occasional hesitation on complex follow-ups.",
    width: "72%",
  },
];

export function Performance() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  return (
    <section id="testimonials" className="py-24 bg-linear-to-bl from-[#16161D] via-[#0B0B0F] to-[#050507]">
      <div className="container mx-auto max-w-7xl px-3 sm:px-4" ref={ref}>
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-[#E5E7EB] tracking-tight">
              See Your Performance Breakdown
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-[#1F1F2A] bg-[#111118] p-6 sm:p-10 shadow-sm">
            <div className="space-y-8">
              {metrics.map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[#E5E7EB] font-heading font-medium">
                      {metric.label}
                    </span>
                    <span className="text-[#F9FAFB] font-heading font-semibold text-lg">
                      {metric.score}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#1F1F2A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4B5563] rounded-full transition-all duration-1500 ease-out"
                      style={{ 
                        width: isInView ? metric.width : "0%",
                        transitionDelay: `${index * 150}ms`
                      }}
                    />
                  </div>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {metric.feedback}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
