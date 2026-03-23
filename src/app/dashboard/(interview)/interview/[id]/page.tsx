import VoiceInterview from "@/components/interviewDash/VoiceInterview";
import { getInterview } from "@/actions/Interview";
import { checkRetakeRateLimit } from "@/actions/Interview";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rateLimit = await checkRetakeRateLimit();
  if (!rateLimit.success) {
    redirect("/dashboard/interviews");
  }
  const interview = await getInterview(id);
  if (!interview) {
    return <div>Interview not found.</div>;
  }

  return (
    <VoiceInterview
      questions={interview.questions}
      role={interview.jobRole}
      skills={interview.topics}
      interviewId={interview.id}
    />
  );
}
