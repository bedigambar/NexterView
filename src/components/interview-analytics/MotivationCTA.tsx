import Link from "next/link";
import { Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MotivationCTAProps {
  interviewId: string;
  improvement: number;
}

export function MotivationCTA({ interviewId, improvement }: MotivationCTAProps) {
  return (
    <div className="mt-8 bg-gradient-to-r from-[#111116] to-[#1E114D]/20 border border-[#27272A] rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 group">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#E0D4FF]/5 rounded-full blur-3xl group-hover:bg-[#E0D4FF]/10 transition-colors" />
      
      <div className="relative z-10 flex items-start gap-5 w-full md:w-auto">
        <div className="p-3 bg-[#1F1F2A] rounded-xl border border-[#3F3F46]">
          <Bot className="w-8 h-8 text-[#E0D4FF]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Ready for another round?</h3>
          <p className="text-gray-400 text-sm md:text-base max-w-md">
            {improvement > 0 
              ? `Great progress! Your score improved by ${improvement} points since your first attempt. Keep the momentum going!`
              : "Practice makes perfect. AI mock interviews are the best way to get comfortable before the real deal."}
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full md:w-auto flex justify-end">
        <Link href={`/dashboard/interview/${interviewId}`}>
          <Button className="w-full md:w-auto bg-[#E0D4FF] hover:bg-[#D4C3FF] text-[#1E114D] font-bold py-6 px-8 rounded-xl shadow-[0_0_20px_rgba(224,212,255,0.15)] hover:shadow-[0_0_30px_rgba(224,212,255,0.25)] transition-all flex items-center justify-center gap-2">
            Start New Interview
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
