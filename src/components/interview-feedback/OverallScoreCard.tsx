import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getScoreColor, getScoreLabel } from "@/lib/score-utils";
import { cn } from "@/lib/utils";

interface OverallScoreCardProps {
  score: number;
  summary: string;
}

export const OverallScoreCard = ({ score, summary }: OverallScoreCardProps) => {
  const scoreColors = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <Card className="bg-[#111118] border-white/5 rounded-xl shadow-lg border">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white/90">
          Overall Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center gap-8">
        <div className={cn("relative shrink-0 flex items-center justify-center w-35 h-35 rounded-full border-[8px]", scoreColors.border, scoreColors.bgMuted)}>
          <div className="flex flex-col items-center justify-center z-10 text-center">
            <span className={cn("text-4xl lg:text-5xl font-extrabold tracking-tight", scoreColors.text)}>
              {score}
            </span>
            <span className="text-xs text-white/50 uppercase tracking-widest mt-2 font-semibold">
              / 100
            </span>
          </div>
        </div>
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <span
              className={cn(
                "inline-flex items-center px-3 py-1 text-sm font-medium rounded-full",
                scoreColors.bgMuted,
                scoreColors.text,
                "border border-white/10",
              )}
            >
              {label}
            </span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">{summary}</p>
        </div>
      </CardContent>
    </Card>
  );
};
