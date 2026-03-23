import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getScoreColor } from "@/lib/score-utils";

interface SkillEvaluation {
  name: string;
  score: number; // Max 10
}

interface SkillsBreakdownProps {
  skills: SkillEvaluation[];
}

export const SkillsBreakdown = ({ skills }: SkillsBreakdownProps) => {
  return (
    <Card className="bg-[#111118] border-white/5 rounded-xl shadow-lg border h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white/90">Skills Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skills.map((skill, index) => {
          const percentage = (skill.score / 10) * 100;
          const scoreColors = getScoreColor(percentage);

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/80 font-medium">{skill.name}</span>
                <span className="text-white/50 font-mono">{skill.score}/10</span>
              </div>
              <Progress 
                value={percentage} 
                className="h-2.5 bg-white/5" 
                indicatorClassName={scoreColors.bg}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
