import { AttemptCard } from "./AttemptCard";
import { Attempt } from "./types";
import { History } from "lucide-react";

interface AttemptsHistoryProps {
  interviewId: string;
  attempts: Attempt[];
}

export function AttemptsHistory({ interviewId, attempts }: AttemptsHistoryProps) {
  if (!attempts || attempts.length === 0) return null;
  const reversedAttempts = [...attempts].reverse();

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-6">
        <History className="w-5 h-5 text-[#E0D4FF]" />
        <h3 className="text-xl font-bold text-white tracking-tight">Attempt History</h3>
      </div>
      
      <div className="space-y-3">
        {reversedAttempts.map((attempt, i) => (
          <AttemptCard 
            key={attempt.id} 
            interviewId={interviewId} 
            attempt={attempt} 
            index={attempts.length - i} 
          />
        ))}
      </div>
    </div>
  );
}
