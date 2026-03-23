import React, { Suspense } from "react";
import { FeedbackHeader } from "@/components/interview-feedback/FeedbackHeader";
import { OverallScoreCard } from "@/components/interview-feedback/OverallScoreCard";
import { SkillsBreakdown } from "@/components/interview-feedback/SkillsBreakdown";
import { StrengthsCard } from "@/components/interview-feedback/StrengthsCard";
import { ActionableImprovementsCard } from "@/components/interview-feedback/ActionableImprovementsCard";

import { QuestionFeedbackList } from "@/components/interview-feedback/QuestionFeedbackList";
import {
  FeedbackSkeleton,
  FeedbackNotFound,
} from "@/components/interview-feedback/FeedbackStates";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAttemptFeedback } from "@/actions/Interview";
import { FeedbackType } from "@/services/generateQuestions";

export const dynamic = "force-dynamic";

async function FeedbackContent({ id }: { id: string }) {
  const data = await getAttemptFeedback(id);

  if (!data) return <FeedbackNotFound />;

  const feedback = data.feedback as unknown as FeedbackType;
  const retakeHref = `/dashboard/interview/${data.interviewId}`;
  const allAttemptsHref = `/dashboard/interview/${data.interviewId}/attempts`;

  return (
    <ScrollArea className="h-full">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 text-white animate-in fade-in duration-500">
        <FeedbackHeader
          role={feedback?.role}
          date={data?.createdAt?.toISOString().slice(0, 10)}
          retakeHref={retakeHref}
          allAttemptsHref={allAttemptsHref}
        />

        <div className="space-y-6 mt-6">
          <OverallScoreCard
            score={feedback?.overallScore}
            summary={feedback?.overallSummary}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkillsBreakdown skills={feedback?.skills} />
            <ActionableImprovementsCard
              improvements={feedback?.actionableImprovements}
            />
          </div>
          <StrengthsCard strengths={feedback?.strengths} />
        </div>

        <div className="mt-8">
          <QuestionFeedbackList questions={feedback?.questions} />
        </div>
      </div>
    </ScrollArea>
  );
}

export default async function FeedbackPage({
  params,
}: {
  params: Promise<{ attemptid: string }>;
}) {
  const { attemptid } = await params;

  return (
    <>
      <Suspense fallback={<FeedbackSkeleton />}>
        <FeedbackContent id={attemptid} />
      </Suspense>
    </>
  );
}
