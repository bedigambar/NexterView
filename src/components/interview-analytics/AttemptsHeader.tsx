import { BarChart2 } from "lucide-react";

interface AttemptsHeaderProps {
  role: string;
}

export function AttemptsHeader({ role }: AttemptsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-[#E0D4FF]/10 rounded-lg">
          <BarChart2 className="w-6 h-6 text-[#E0D4FF]" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          {role} Interview
        </h1>
      </div>
      <p className="text-gray-400 text-sm md:text-base max-w-2xl">
        Track your progress and see how your performance improves across attempts. Continuous practice is key to acing your interview.
      </p>
    </div>
  );
}
