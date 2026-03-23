import { Attempt } from "./types";
import {
  CopyPlus,
  Activity,
  TrendingUp,
  Trophy,
  TrendingDown,
} from "lucide-react";

export function StatsCards({
  attempts,
  trend,
}: {
  attempts: Attempt[];
  trend?: { value: number; isPositive: boolean };
}) {
  if (!attempts || attempts.length === 0) return null;

  const totalAttempts = attempts.length;
  const bestScore = Math.max(...attempts.map((a) => a.score));
  const avgScore = Math.round(
    attempts.reduce((acc, curr) => acc + curr.score, 0) / totalAttempts,
  );
  const worstScore = Math.min(...attempts.map((a) => a.score));

  const stats = [
    {
      label: "Best Score",
      value: `${bestScore}/100`,
      icon: <Trophy className="w-5 h-5 text-yellow-400" />,
      color: "border-yellow-400/20 bg-yellow-400/5",
    },
    {
      label: "Average Score",
      value: `${avgScore}/100`,
      icon: <Activity className="w-5 h-5 text-[#E0D4FF]" />,
      color: "border-[#E0D4FF]/20 bg-[#E0D4FF]/5",
      trend: trend,
    },
    {
      label: "Total Attempts",
      value: totalAttempts.toString(),
      icon: <CopyPlus className="w-5 h-5 text-blue-400" />,
      color: "border-blue-400/20 bg-blue-400/5",
    },
    {
      label: "Lowest Score",
      value: `${worstScore}/100`,
      icon: <Trophy className="w-5 h-5 text-yellow-400" />,
      color: "border-yellow-400/20 bg-yellow-400/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`flex items-center gap-4 p-5 rounded-2xl border ${stat.color} transition-all hover:-translate-y-1 hover:shadow-lg`}
        >
          <div className="p-3 bg-[#1F1F2A] rounded-xl border border-[#27272A] shadow-sm">
            {stat.icon}
          </div>
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
              {stat.label}
            </p>

            <div className="flex justify-between items-center gap-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {stat.value}
              </h3>
              {stat.trend && (
                <div
                  className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                    stat.trend.isPositive
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  }`}
                >
                  {stat.trend.isPositive ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  {stat.trend.isPositive ? "+" : ""}
                  {stat.trend.value}%
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
