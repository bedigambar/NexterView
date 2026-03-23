import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, AlertCircle } from "lucide-react";

export const FeedbackSkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8 animate-pulse text-white mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-8">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-10 w-3/4 bg-white/10" />
          <Skeleton className="h-4 w-1/2 bg-white/10" />
          <div className="flex gap-4 mt-4">
            <Skeleton className="h-4 w-20 bg-white/10" />
            <Skeleton className="h-4 w-24 bg-white/10" />
            <Skeleton className="h-4 w-16 bg-white/10" />
          </div>
        </div>
        <Skeleton className="h-12 w-40 rounded-full bg-white/10 shrink-0" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Skeleton className="h-64 rounded-xl bg-white/5" />
          <Skeleton className="h-80 rounded-xl bg-white/5" />
          <Skeleton className="h-60 rounded-xl bg-white/5" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-60 rounded-xl bg-white/5" />
          <Skeleton className="h-80 rounded-xl bg-white/5" />
        </div>
      </div>
      
      <div className="space-y-4 pt-8">
         <Skeleton className="h-8 w-64 bg-white/10" />
         <Skeleton className="h-20 rounded-xl bg-white/5" />
         <Skeleton className="h-20 rounded-xl bg-white/5" />
      </div>
    </div>
  );
};

export const FeedbackProcessing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-white/5 p-6 rounded-full mb-6">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Analyzing Interview</h2>
      <p className="text-white/60 max-w-md">
        Our AI is processing your interview performance. Check back in a few minutes for your comprehensive feedback report.
      </p>
    </div>
  );
};

export const FeedbackNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-white/5 p-6 rounded-full mb-6 text-rose-500">
        <AlertCircle className="w-12 h-12" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Feedback Not Found</h2>
      <p className="text-white/60 max-w-md">
        We couldn&apos;t find the feedback report for this interview. It may have been deleted or never recorded.
      </p>
    </div>
  );
};
