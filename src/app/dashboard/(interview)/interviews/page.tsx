import { StatCard } from "@/components/dashboard/StatCard";
import { ScoreChart } from "@/components/interviewDash/ScoreChart";
import { Reveal } from "@/components/landing/Reveal";
import {
  ArrowLeft,
  Target,
  TrendingUp,
  Trophy,
  Plus,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import InterviewForm from "@/components/interviewDash/InterviewForm";
import { AllInterviews, getRecentAttempts } from "@/actions/Interview";
import AllInterview from "@/components/interviewDash/AllInterviews";
import type { InterviewData } from "@/components/interviewDash/AllInterviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentActivity } from "@/components/interviewDash/RecentActivity";
import Link from "next/link";

import { Suspense } from "react";
import Skeleton from "@/components/dashboard/Skeleton";

export const dynamic = "force-dynamic";

export default async function InterviewsPage() {
  const [rawInterviews, recentAttempts] = await Promise.all([
    AllInterviews(),
    getRecentAttempts(5),
  ]);

  const interviews = (rawInterviews ?? []) as Array<
    InterviewData & { updatedAt: Date | string }
  >;

  const totalInterviews = interviews.length;

  const interviewLength: number = interviews.filter(
    (i) => i.score !== null,
  ).length;

  const averageScore = Math.round(
    interviewLength
      ? interviews.reduce((acc, interview) => acc + (interview.score ?? 0), 0) /
          interviewLength
      : 0,
  );

  const scores = (interviews ?? [])
    .map((i) => i.score)
    .filter((s): s is number => s !== null);

  const highestScore =
    scores.length > 0 ? scores.reduce((acc, s) => Math.max(acc, s)) : undefined;

  const lowestScore =
    scores.length > 0 ? scores.reduce((acc, s) => Math.min(acc, s)) : undefined;

  const completedInterviews = interviews
    .filter((i) => i.status === "completed")
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

  const notCompletedInterviews = interviews
    .filter((i) => i.status !== "completed")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  let trend = { value: 0, isPositive: false };

  if (scores.length >= 2) {
    const lastScore = scores[scores.length - 1];
    const prevScore = scores[scores.length - 2];

    const diff = lastScore - prevScore;

    trend = {
      value: Math.abs(diff),
      isPositive: diff >= 0,
    };
  }

  return (
    <Suspense fallback={<Skeleton />}>
      <ScrollArea className="h-full">
        <div className="space-y-6 p-4 sm:p-16 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Button asChild variant="outline" className="mb-3">
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <h1 className="text-2xl font-heading font-semibold text-[#F9FAFB] tracking-tight">
                Welcome back
              </h1>
              <p className="text-[#9CA3AF] mt-1">
                Ready to practice your next interview?
              </p>
            </div>
            <InterviewForm>
              <Button className="bg-[#1F2937] hover:bg-[#374151] text-[#F9FAFB] shadow-none border-0 rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Create Interview
              </Button>
            </InterviewForm>
          </div>
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Interviews"
                value={totalInterviews}
                icon={Target}
              />
              <StatCard
                title="Average Score"
                value={averageScore}
                icon={Trophy}
                trend={trend}
                totalInterviews={totalInterviews}
              />
              <StatCard
                title="Highest Score"
                value={highestScore}
                icon={TrendingUp}
              />
              <StatCard
                title="Lowest Score"
                value={lowestScore}
                icon={TrendingDown}
              />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
                <ScoreChart scores={scores} />
              </Reveal>
            </div>
            <div className="lg:col-span-1">
              <RecentActivity attempts={recentAttempts || []} />
            </div>
          </div>
          <Reveal delay={0.2}>
            <Tabs defaultValue="in-progress" className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 mt-2">
                <h3 className="text-2xl font-semibold text-[#F9FAFB]">
                  All Interviews
                </h3>
                <TabsList>
                  <TabsTrigger value="in-progress" className="cursor-pointer">
                    In Progress
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="cursor-pointer">
                    Completed
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="in-progress" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notCompletedInterviews.length > 0 ? (
                    notCompletedInterviews.map((interview) => (
                      <AllInterview
                        key={interview.id}
                        interview={interview as InterviewData}
                      />
                    ))
                  ) : (
                    <div className="text-[#9CA3AF] py-12 text-center col-span-full bg-[#111116] rounded-2xl border border-[#27272A]">
                      You don&apos;t have any interviews in progress.
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedInterviews.length > 0 ? (
                    completedInterviews.map((interview) => (
                      <AllInterview
                        key={interview.id}
                        interview={interview as InterviewData}
                      />
                    ))
                  ) : (
                    <div className="text-[#9CA3AF] py-12 text-center col-span-full bg-[#111116] rounded-2xl border border-[#27272A]">
                      You haven&apos;t completed any interviews yet.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </ScrollArea>
    </Suspense>
  );
}
