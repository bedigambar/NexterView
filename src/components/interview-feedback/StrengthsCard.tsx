import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface StrengthsCardProps {
  strengths: string[];
}

export const StrengthsCard = ({ strengths }: StrengthsCardProps) => {
  return (
    <Card className="bg-[#111118] border-white/5 rounded-xl shadow-lg border h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-emerald-400">Key Strengths</CardTitle>
      </CardHeader>
      <CardContent>
        {strengths.length > 0 ? (
          <ul className="space-y-4">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm leading-relaxed">{strength}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-white/50 italic">No specific strengths identified yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
