"use client";
import React from "react";
import { Calendar, Briefcase, RefreshCw, History, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkRetakeRateLimit } from "@/actions/Interview";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Link from "next/link";

interface FeedbackHeaderProps {
  role: string;
  date: string;
  retakeHref: string;
  allAttemptsHref: string;
}

export const FeedbackHeader = ({
  role,
  date,
  retakeHref,
  allAttemptsHref,
}: FeedbackHeaderProps) => {
  const router = useRouter();
  const checkRetake = async () => {
    const data = await checkRetakeRateLimit();

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    router.push(retakeHref);
  };
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Interview Feedback Report
        </h1>
        <p className="text-muted-foreground">
          AI analysis of your interview performance
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mt-4">
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-primary" />
            <span>{role}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{date}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full sm:w-auto">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full sm:w-auto font-medium rounded-full shrink-0 border-white/20 text-white hover:bg-white/10 bg-transparent"
        >
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Dashboard
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full sm:w-auto font-medium rounded-full shrink-0 border-white/20 text-white hover:bg-white/10 bg-transparent"
        >
          <Link href={allAttemptsHref}>
            <History className="mr-2 w-4 h-4" />
            All Attempts
          </Link>
        </Button>
        <Button
          onClick={checkRetake}
          size="lg"
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full shrink-0 cursor-pointer"
        >
          <RefreshCw className="mr-2 w-4 h-4" />
          Retake Interview
        </Button>
      </div>
    </div>
  );
};
