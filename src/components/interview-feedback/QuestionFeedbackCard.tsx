
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuestionFeedbackProps {
  id: string;
  question: string;
  answerSummary: string;
  score: number;
  strength: string;
  improvement: string;
}

export const QuestionFeedbackCard = ({
  id,
  question,
  answerSummary,
  score,
  strength,
  improvement,
}: QuestionFeedbackProps) => {
  const getQuestionScoreColor = (s: number) => {
    if (s >= 7) return { text: "text-emerald-500", bgMuted: "bg-emerald-500/10" };
    if (s >= 4) return { text: "text-amber-500", bgMuted: "bg-amber-500/10" };
    return { text: "text-rose-500", bgMuted: "bg-rose-500/10" };
  };

  const scoreColors = getQuestionScoreColor(score);

  return (
    <AccordionItem 
      value={id} 
      className="border-white/10 px-6 bg-[#111118] rounded-xl border shadow-sm data-[state=open]:border-white/20 transition-all overflow-hidden"
    >
      <AccordionTrigger className="hover:no-underline py-5 text-left group">
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 pr-4">
          <span className="text-white/90 font-medium leading-relaxed transition-colors group-hover:text-white">{question}</span>
          <Badge className={cn(
            scoreColors.bgMuted, 
            scoreColors.text, 
            `hover:${scoreColors.bgMuted}`, 
            "border-0 shrink-0 font-semibold px-3 py-1.5 text-sm"
          )}>
            {score} / 10
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-white/70 space-y-6 pt-2 pb-6">
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest">Your Answer Summary</h4>
          <p className="leading-relaxed bg-white/5 p-5 rounded-lg text-white/80 border border-white/5">{answerSummary}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 bg-emerald-500/5 p-5 rounded-lg border border-emerald-500/10">
            <h4 className="text-sm font-medium text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Strength
            </h4>
            <p className="leading-relaxed text-white/80">{strength}</p>
          </div>
          
          <div className="space-y-3 bg-rose-500/5 p-5 rounded-lg border border-rose-500/10">
            <h4 className="text-sm font-medium text-rose-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Improvement
            </h4>
            <p className="leading-relaxed text-white/80">{improvement}</p>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
