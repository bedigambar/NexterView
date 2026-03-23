import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface ImprovementsCardProps {
  improvements: string[];
}

export const ImprovementsCard = ({ improvements }: ImprovementsCardProps) => {
  return (
    <Card className="bg-[#111118] border-white/5 rounded-xl shadow-lg border h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-rose-400">Areas for Improvement</CardTitle>
      </CardHeader>
      <CardContent>
        {improvements.length > 0 ? (
          <ul className="space-y-4">
            {improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm leading-relaxed">{improvement}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-white/50 italic">No specific areas of improvement identified yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
