import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Lightbulb, ArrowDownRight } from "lucide-react";

export interface ActionableImprovement {
  flaw: string;
  recommendation: string;
}

interface ActionableImprovementsCardProps {
  improvements: ActionableImprovement[];
}

export const ActionableImprovementsCard = ({
  improvements,
}: ActionableImprovementsCardProps) => {
  return (
    <Card className="bg-[#111118] border-white/5 rounded-xl shadow-lg border h-full">
      <CardHeader className="py-2">
        <CardTitle className="text-base font-medium text-rose-400 flex items-center gap-2">
          <span>Areas for Improvement & Action Plan</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        {improvements.length > 0 ? (
          <div className="space-y-3">
            {improvements.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]"
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm leading-snug">
                    {item.flaw}
                  </span>
                </div>
                <div className="flex items-start gap-2 pl-6 mt-0.5">
                  <div className="flex items-center justify-center shrink-0 mt-0.5 relative">
                    <ArrowDownRight className="w-3 h-3 text-white/20 absolute -left-3 -top-2" />
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <span className="text-amber-100/70 text-xs leading-snug italic">
                    {item.recommendation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/50 italic">
            No specific areas of improvement identified yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
