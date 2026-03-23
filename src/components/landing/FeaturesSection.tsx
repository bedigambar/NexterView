import { CheckCircle2, XCircle } from "lucide-react";
import { Reveal } from "./Reveal";

const problems = [
  "Unstructured answers",
  "No measurable feedback",
  "No performance tracking",
  "Repeating mistakes unknowingly",
];

const solutions = [
  "Structured AI-driven scoring",
  "Rubric-based evaluation",
  "Performance analytics dashboard",
  "Skill-gap identification",
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-28 bg-linear-to-bl from-[#16161D] via-[#0B0B0F] to-[#050507]"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#E5E7EB]">
              A Better Way to Prepare
            </h2>
          </div>
        </Reveal>
        <div className="relative grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-[#1F1F2A]" />
          <Reveal delay={0.1}>
            <div className="space-y-10 md:pr-12">
              <h3 className="text-lg font-medium text-[#9CA3AF]">
                The Problem with Traditional Practice
              </h3>

              <ul className="space-y-8">
                {problems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 pb-6 border-b border-[#1F1F2A] last:border-none"
                  >
                    <XCircle
                      className="h-5 w-5 text-[#4B5563] mt-1 shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-lg text-[#9CA3AF] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="space-y-10 md:pl-12">
              <h3 className="text-lg font-medium text-[#D1D5DB]">
                With NexterView
              </h3>

              <ul className="space-y-8">
                {solutions.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 pb-6 border-b border-[#1F1F2A] last:border-none"
                  >
                    <CheckCircle2
                      className="h-5 w-5 text-[#D1D5DB] mt-1 shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-lg text-[#E5E7EB] font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}