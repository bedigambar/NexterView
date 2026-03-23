import { Reveal } from "@/components/landing/Reveal";
import { MiniScoreChart } from "@/components/dashboard/MiniScoreChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AllInterviews, getRecentAttempts } from "@/actions/Interview";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  FileText,
  Target,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Overview | NexterView",
  description: "Your interview readiness and performance command center.",
};

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Skeleton from "@/components/dashboard/Skeleton";
import { RecentActivity } from "@/components/interviewDash/RecentActivity";
import type { InterviewData } from "@/components/interviewDash/AllInterviews";

type RecentAttempt = {
  createdAt: Date | string;
  score: number;
  interview?: {
    jobRole?: string;
  };
};

export default async function OverviewPage() {
  const [rawInterviews, recentAttempts] = await Promise.all([
    AllInterviews(),
    getRecentAttempts(12),
  ]);

  const attempts = (recentAttempts ?? []) as RecentAttempt[];

  const interviews = (rawInterviews ?? []) as Array<
    InterviewData & { updatedAt: Date | string }
  >;

  const totalInterviews = interviews.length;
  const attemptScores = [...attempts]
    .sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )
    .map((attempt) => attempt.score);

  const focusAttempt = attempts.reduce<RecentAttempt | null>((lowest, attempt) => {
    if (!lowest || attempt.score < lowest.score) {
      return attempt;
    }
    return lowest;
  }, null);

  const focusPrimary = focusAttempt
    ? `${focusAttempt.interview?.jobRole ?? "Recent interview"} needs attention with a score of ${focusAttempt.score}.`
    : "Complete your first interview attempt to identify your current focus area.";

  const focusSecondary = !focusAttempt
    ? "Once you have attempt data, this section will highlight the most important improvement opportunity."
    : focusAttempt.score < 60
      ? "Prioritize core concepts, structure your answers clearly, and practice fundamentals daily."
      : "Keep improving by refining examples, clarity, and confidence in your weakest interview area.";

  const completedScores = interviews
    .map((interview) => interview.score)
    .filter((score): score is number => score !== null);

  const metricScores = attemptScores.length > 0 ? attemptScores : completedScores;

  const averageScore =
    metricScores.length > 0
      ? Math.round(
          metricScores.reduce((acc, score) => acc + score, 0) /
            metricScores.length,
        )
      : "--";

  const weakestScore =
    metricScores.length > 0 ? Math.min(...metricScores) : "--";

  const readinessScore =
    metricScores.length > 0
      ? Math.round(
          metricScores.reduce((acc, score) => acc + score, 0) /
            metricScores.length,
        )
      : 0;

  let trendValue = 0;
  if (metricScores.length >= 2) {
    trendValue =
      metricScores[metricScores.length - 1] -
      metricScores[metricScores.length - 2];
  }

  return (
    <Suspense fallback={<Skeleton />}>
      <ScrollArea className="h-full">
        <div className="space-y-6 p-4 sm:p-8 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Overview
              </h1>
              <p className="text-slate-400 mt-1">
                Your performance command center.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button asChild variant="outline" className="w-fit">
                <Link href="/dashboard/interviews">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Interview Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-fit">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
          <Reveal>
            <Card className="bg-[#111118] border-slate-800/70 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <CardContent className="p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <h2 className="text-2xl font-semibold text-white tracking-tight">
                    Interview Readiness Score
                  </h2>
                  <p className="text-slate-400 max-w-lg mx-auto md:mx-0">
                    Based on your recent interview performance and resume
                    analysis.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mt-4">
                    <TrendingUp className="w-4 h-4" />
                    {totalInterviews > 0
                      ? `Readiness trend: ${trendValue >= 0 ? "+" : ""}${trendValue} from your recent attempts.`
                      : "Start your first interview to generate your readiness trend."}
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-36 h-36 shrink-0">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      className="text-slate-800"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-indigo-500"
                      strokeWidth="8"
                      strokeDasharray="264"
                      strokeDashoffset={264 - (264 * readinessScore) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-white">
                    <span className="text-4xl font-bold tracking-tighter">
                      {readinessScore}
                      <span className="text-2xl text-slate-400">%</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Interviews" value={totalInterviews} icon={Target} />
              <StatCard title="Average Score" value={averageScore} icon={Trophy} />
              <StatCard
                title="Completed Interviews"
                value={metricScores.length}
                icon={FileText}
              />
              <StatCard
                title="Lowest Score"
                value={weakestScore}
                icon={BrainCircuit}
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Reveal delay={0.2}>
                <div className="h-80">
                  <MiniScoreChart scores={attemptScores} />
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div>
                  <Card className="bg-[#111118] border-rose-500/20 shadow-sm flex flex-col h-full hover:border-rose-500/40 transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-rose-500/5 pointer-events-none" />
                    <CardContent className="p-6 flex flex-col h-full relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-white">Focus Area</h3>
                      </div>

                      <div className="space-y-4 flex-1">
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {focusPrimary}
                        </p>
                        <p className="text-rose-400/80 text-sm leading-relaxed">
                          {focusSecondary}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-1">
              <RecentActivity attempts={recentAttempts || []} />
            </div>
          </div>
        </div>
      </ScrollArea>
    </Suspense>
  );
}
