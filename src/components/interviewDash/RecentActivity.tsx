import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/landing/Reveal";

interface RecentAttempt {
  id: string;
  interviewId: string;
  score: number;
  createdAt: Date;
  interview?: {
    jobRole: string;
  };
}

interface RecentActivityProps {
  attempts: RecentAttempt[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ attempts }) => {
  return (
    <Reveal delay={0.15}>
      <div className="h-full flex flex-col">
        <Card className="bg-[#111116] border-[#27272A] shadow-sm flex flex-col rounded-2xl flex-1">
          <div className="px-5 py-4">
            <h3 className="text-lg font-bold text-white">Recent Activity</h3>
          </div>
          <CardContent className="p-0 sm:p-2 sm:px-4 flex-1 flex flex-col">
            {attempts && attempts.length > 0 ? (
              <div className="flex flex-col">
                {attempts.map((attempt) => {
                  const date = new Date(attempt.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    },
                  );
                  const isGood = attempt.score >= 70;
                  const scoreColor = isGood
                    ? "text-emerald-400"
                    : attempt.score >= 40
                      ? "text-amber-400"
                      : "text-rose-400";

                  return (
                    <Link
                      key={attempt.id}
                      href={`/dashboard/interview/${attempt.interviewId}/attempts/feedback/${attempt.id}`}
                      className="flex flex-col gap-0.5 pb-3 border-b border-slate-800/60 hover:bg-slate-800/20 p-3 rounded-xl transition-colors group cursor-pointer last:border-0"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">
                          {attempt.interview?.jobRole}
                        </span>
                        <span className="text-xs text-slate-400 whitespace-nowrap ml-2 bg-slate-800/50 px-2 py-0.5 rounded-md">
                          {date}
                        </span>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Target className="w-3.5 h-3.5" /> Score:{" "}
                          <span
                            className={`font-semibold text-sm ${scoreColor}`}
                          >
                            {attempt.score}
                          </span>
                        </div>
                        <span className="text-xs text-indigo-500/0 group-hover:text-indigo-500 transition-all flex items-center font-medium">
                          View <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center px-8 py-16">
                <p className="text-[#9CA3AF] text-center">No recent activity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Reveal>
  );
};
