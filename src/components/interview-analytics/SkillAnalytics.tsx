import { useMemo } from "react";
import { Attempt } from "./types";
import { TrendingUp, AlertCircle } from "lucide-react";

export function SkillAnalytics({ attempts }: { attempts: Attempt[] }) {
  const analytics = useMemo(() => {
    if (!attempts || attempts.length === 0) return null;

    const skillKeys = [
      "communication",
      "technicalKnowledge",
      "problemSolving",
      "confidence",
      "clarity",
    ] as const;
    const averages = skillKeys.reduce((acc, key) => {
      const sum = attempts.reduce((s, a) => s + (a.skills[key] || 0), 0);
      acc[key] = Math.round(sum / attempts.length);
      return acc;
    }, {} as Record<string, number>);
    let weakest: keyof Attempt["skills"] = skillKeys[0];
    let minScore = averages[weakest];
    let mostImproved: keyof Attempt["skills"] = skillKeys[0];
    let maxImprovement = -100;

    const firstAttempt = attempts[0];
    const lastAttempt = attempts[attempts.length - 1];

    skillKeys.forEach(key => {
      if (averages[key] < minScore) {
        minScore = averages[key];
        weakest = key as keyof Attempt["skills"];
      }
      const improvement = (lastAttempt.skills[key] || 0) - (firstAttempt.skills[key] || 0);
      if (improvement > maxImprovement) {
        maxImprovement = improvement;
        mostImproved = key as keyof Attempt["skills"];
      }
    });

    return { averages, weakest, mostImproved, maxImprovement };
  }, [attempts]);

  if (!analytics) return null;

  const { averages, weakest, mostImproved, maxImprovement } = analytics;

  const formatSkillName = (key: string) => 
    key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  return (
    <div className="bg-[#111116] border border-[#27272A] rounded-2xl p-6 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white">Skill Analysis</h3>
        <p className="text-sm text-gray-400">Average performance across all attempts</p>
      </div>

      <div className="space-y-5 flex-grow">
        {Object.entries(averages).map(([key, score]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-300 font-medium">{formatSkillName(key)}</span>
              <span className="text-white font-bold">{score}%</span>
            </div>
            <div className="w-full bg-[#1F1F2A] rounded-full h-2">
              <div 
                className="bg-[#E0D4FF] h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {attempts.length > 1 && (
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="bg-[#1F1F2A] rounded-xl p-3 border border-[#27272A]">
            <div className="flex items-center gap-1.5 text-green-400 text-xs font-semibold mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Most Improved
            </div>
            <div className="text-white text-sm font-medium">
              {formatSkillName(mostImproved)} <span className="text-green-400 text-xs ml-1">+{maxImprovement}%</span>
            </div>
          </div>
          <div className="bg-[#1F1F2A] rounded-xl p-3 border border-[#27272A]">
            <div className="flex items-center gap-1.5 text-yellow-500 text-xs font-semibold mb-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Focus Area
            </div>
            <div className="text-white text-sm font-medium">
              {formatSkillName(weakest)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
