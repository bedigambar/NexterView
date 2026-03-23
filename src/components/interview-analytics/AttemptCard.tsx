import Link from "next/link";
import { Attempt } from "./types";
import { Calendar, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AttemptCardProps {
  interviewId: string;
  attempt: Attempt;
  index: number;
}

export function AttemptCard({ interviewId, attempt, index }: AttemptCardProps) {
  const formattedDate = new Date(attempt.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group bg-[#111116] border border-[#27272A] hover:border-[#3F3F46] rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:bg-[#1A1A22]">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#1F1F2A] text-[#A1A1AA] flex items-center justify-center font-bold text-lg border border-[#27272A] group-hover:text-white group-hover:border-[#3F3F46] transition-colors">
          #{index}
        </div>
        <div>
          <h4 className="text-white font-semibold text-lg flex items-center gap-2">
            Attempt {index}
          </h4>
          <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
            <span className="flex items-center gap-1.5 border border-[#27272A] bg-[#1F1F2A] px-2 py-0.5 rounded-md text-xs">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t border-[#27272A] md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
        <div className="flex flex-col items-end md:items-center">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Score</span>
          <div className="flex items-center gap-1.5 font-bold text-xl text-white">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            {attempt.score}
          </div>
        </div>
        
        <Link href={`/dashboard/interview/${interviewId}/attempts/feedback/${attempt.id}`} className="shrink-0">
          <Button variant="secondary" className="bg-[#E0D4FF] hover:bg-[#D4C3FF] text-[#1E114D] font-bold h-9 px-4 text-sm group-hover:shadow-md transition-all">
            View Feedback
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
