import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface RecommendationsCardProps {
  recommendations: string[];
}

export const RecommendationsCard = ({ recommendations }: RecommendationsCardProps) => {
  return (
    <Card className="bg-[#111118] border-white/5 rounded-xl shadow-lg border h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-amber-400">AI Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <ul className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm leading-relaxed">{recommendation}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-white/50 italic">No recommendations available yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
