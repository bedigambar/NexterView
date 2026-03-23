"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";
import { steps } from "@/lib/data";
import Image from "next/image";

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="how-it-works"
      className="py-24 relative overflow-hidden bg-linear-to-br from-[#050507] via-[#0B0B0F] to-[#16161D]"
    >
      <div className="container mx-auto max-w-7xl px-3 sm:px-4 relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-[#E5E7EB] bg-linear-to-r from-[#9CA3AF] via-[#E5E7EB] to-[#94A3B8] bg-clip-text pb-1 tracking-tight">
              How It Works
            </h2>
          </div>
        </Reveal>

        <div className="relative" ref={containerRef}>
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#1F1F2A] md:-translate-x-1/2 z-0" />
          <motion.div
            style={{ height }}
            className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-linear-to-b from-transparent via-[#E5E7EB] to-[#E5E7EB] md:-translate-x-1/2 z-0 shadow-[0_0_15px_rgba(229,231,235,0.4)] origin-top"
          />
          <motion.div
            style={{ top: height }}
            className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-2 border-[#E5E7EB] bg-[#0B0B0F] shadow-[0_0_15px_rgba(229,231,235,0.6)] transform -translate-x-1.75 md:-translate-x-2 -mt-2 z-20 flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#E5E7EB]" />
          </motion.div>
          <div className="space-y-16 md:space-y-28 py-8 md:py-16">
            {steps.map((item, index) => (
              <StepRow key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepRow({ item, index }: { item: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "start 40%"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const nodeBorderColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#1F1F2A", "#E5E7EB"],
  );
  const nodeBgColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#111118", "#0B0B0F"],
  );

  return (
    <div
      ref={ref}
      className={`relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 lg:gap-16 ${
        index % 2 !== 0 ? "md:flex-row-reverse" : ""
      } group`}
    >
      <div
        className={`flex-1 w-full text-left pl-20 pr-4 md:pl-0 md:pr-0 ${
          index % 2 !== 0
            ? "md:pl-12 lg:pl-16 md:text-left"
            : "md:pr-12 lg:pr-16 md:text-right"
        }`}
      >
        <motion.div
          style={{
            opacity: textOpacity,
            y: yOffset,
            filter: useTransform(
              scrollYProgress,
              [0, 1],
              ["blur(8px)", "blur(0px)"],
            ),
          }}
          className="space-y-3 transition-transform duration-300 group-hover:-translate-y-1 mt-0 md:mt-0"
        >
          <div className="text-sm font-heading font-semibold text-[#9CA3AF] tracking-widest uppercase">
            Step {item.step}
          </div>
          <h3 className="text-xl md:text-3xl font-heading font-semibold text-[#E5E7EB]">
            {item.title}
          </h3>
          <p className="text-[#9CA3AF] leading-relaxed text-sm md:text-base">
            {item.description}
          </p>
        </motion.div>
      </div>
      <motion.div
        style={{ borderColor: nodeBorderColor, backgroundColor: nodeBgColor }}
        className="absolute left-8 md:static top-12 md:top-auto md:w-auto -translate-x-1/2 md:translate-x-0 w-2.75 h-2.75 rounded-full border-[3px] z-10 transition-colors duration-300 pointer-events-none mt-0"
      />
      <div
        className={`flex-1 w-full pl-20 pr-4 md:pl-0 md:pr-0 ${
          index % 2 !== 0 ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"
        }`}
      >
        <motion.div
          style={{
            opacity: textOpacity,
            y: yOffset,
            filter: useTransform(
              scrollYProgress,
              [0, 1],
              ["blur(8px)", "blur(0px)"],
            ),
          }}
          className={`relative aspect-video w-full max-w-sm md:max-w-none rounded-xl border border-[#1F1F2A] bg-[#111118] overflow-hidden transition-all duration-300 group-hover:border-[#2D2D3A] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] ${
            index % 2 !== 0 ? "ml-0 md:mr-auto" : "ml-0 md:ml-auto"
          }`}
        >
          <Image
            src={item.imgUrl}
            alt="image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </motion.div>
      </div>
    </div>
  );
}
