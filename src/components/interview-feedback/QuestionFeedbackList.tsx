import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { QuestionFeedbackCard, QuestionFeedbackProps } from "./QuestionFeedbackCard";

interface QuestionFeedbackListProps {
  questions: Omit<QuestionFeedbackProps, "id">[];
}

export const QuestionFeedbackList = ({ questions }: QuestionFeedbackListProps) => {
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 mt-12 mb-8">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white/90">Detailed Question Analysis</h3>
        <p className="text-sm text-white/50">Expand each question to see specific strengths and areas for improvement.</p>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {questions.map((q, index) => (
          <QuestionFeedbackCard 
            key={index} 
            id={`question-${index}`} 
            {...q} 
          />
        ))}
      </Accordion>
    </div>
  );
};
