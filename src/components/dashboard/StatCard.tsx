import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: undefined | number | string;
  icon: LucideIcon;
  totalInterviews?: number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({
  title,
  value = "--",
  icon: Icon,
  trend,
  totalInterviews = 0,
}: StatCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0f0f17] to-[#0a0a12] backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-white/4 via-transparent to-transparent pointer-events-none" />

      <CardContent className="relative z-10 p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition">
            {title}
          </p>

          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 text-white shadow-inner group-hover:scale-105 transition">
            <Icon className="w-5 h-5 opacity-80" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold tracking-tight text-white">
            {value}
          </h3>

          {trend && totalInterviews > 0 && (
            <div
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                trend.isPositive
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-400 border-rose-500/20"
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
