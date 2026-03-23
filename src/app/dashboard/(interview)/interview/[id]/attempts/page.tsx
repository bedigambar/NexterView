import { notFound } from "next/navigation";
import { Attempt } from "@/components/interview-analytics/types";
import { AttemptsHeader } from "@/components/interview-analytics/AttemptsHeader";
import { StatsCards } from "@/components/interview-analytics/StatsCards";
import { ScoreProgressChart } from "@/components/interview-analytics/ScoreProgressChart";
import { AttemptsHistory } from "@/components/interview-analytics/AttemptsHistory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getInterviewAttempts, getInterview } from "@/actions/Interview";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

type FeedbackSkill = {
  name: string;
  score: number;
};

type AttemptFeedback = {
  skills?: FeedbackSkill[];
};

export default async function AttemptsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const [attempts, interview] = await Promise.all([
    getInterviewAttempts(id),
    getInterview(id),
  ]);

  if (!attempts || !interview) {
    return notFound();
  }

  const scores = attempts.map((attempt: (typeof attempts)[number]) => attempt.score);

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


  const mappedAttempts: Attempt[] = attempts.map((attempt: (typeof attempts)[number]) => {
    const feedback = attempt.feedback as AttemptFeedback | null;
    const getSkillScore = (matchTerms: string[]) => {
      if (!feedback?.skills || !Array.isArray(feedback.skills)) return 0;

      const skill = feedback.skills.find((s: FeedbackSkill) =>
        matchTerms.some((term) =>
          s.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );

      if (skill && typeof skill.score === "number") {
        return skill.score <= 10 ? Math.round(skill.score * 10) : skill.score;
      }
      return 0;
    };

    return {
      id: attempt.id,
      score: attempt.score,
      date: attempt.createdAt.toISOString(),
      skills: {
        communication: getSkillScore(["communication", "explain"]),
        technicalKnowledge: getSkillScore(["technical", "knowledge"]),
        problemSolving: getSkillScore(["problem", "solve", "solution"]),
        confidence: getSkillScore(["confidence"]),
        clarity: getSkillScore(["clarity", "clear", "organized"]),
      },
    };
  });

  return (
    <div className=" bg-[#050507] text-white overflow-hidden flex flex-col">
      <ScrollArea className="flex-1 h-full">
        <div className="px-6 py-6 md:p-10 lg:p-12 max-w-6xl mx-auto">
          <Button asChild variant="outline" className="mb-4">
            <Link href="/dashboard/interviews">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Interviews
            </Link>
          </Button>

          <AttemptsHeader role={interview.jobRole} />

          {mappedAttempts.length > 0 ? (
            <>
              <StatsCards attempts={mappedAttempts} trend={trend} />

              <div className="flex flex-col gap-6 mb-8">
                <div className="w-full">
                  <ScoreProgressChart attempts={mappedAttempts} />
                </div>
              </div>
              <AttemptsHistory
                  interviewId={interview.id}
                  attempts={mappedAttempts}
                />
            </>
          ) : (
            <div className="bg-[#111116] border border-[#27272A] rounded-2xl p-12 text-center text-gray-400 mt-10">
              <h3 className="text-xl font-medium text-white mb-2">
                No attempts yet
              </h3>
              <p className="mb-6 max-w-sm mx-auto">
                You haven&apos;t taken this interview yet. Complete your first
                attempt to view analytics.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
