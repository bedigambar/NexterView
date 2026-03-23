import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";

const faqs = [
  {
    question: "Who is NexterView designed for?",
    answer: "NexterView is built for students, developers, and professionals preparing for technical and behavioral interviews."
  },
  {
    question: "Is NexterView free to use?",
    answer: "You can start practicing interviews for free. Additional features may be introduced in future plans."
  },
  {
    question: "What can I see in my performance dashboard?",
    answer: "Your dashboard displays skill breakdowns with detailed progress bars, overall performance scores, AI-generated insights, and a complete history of all your interview attempts for easy comparison."
  },
  {
    question: "Are the interview questions generated dynamically?",
    answer: "Yes. Questions are generated based on your selected role, topic, difficulty level, and interview type to simulate real interview scenarios."
  },
  {
    question: "How does the AI evaluate my answers?",
    answer: "NexterView evaluates responses using structured prompts across multiple categories including technical accuracy, depth of knowledge, clarity of explanation, and confidence. Final scoring follows a deterministic weighted formula to ensure consistency."
  },
  {
    question: "Is the scoring system consistent?",
    answer: "Yes. While AI assists in qualitative evaluation, the final score is calculated using a predefined weighted scoring model to maintain consistency across sessions."
  },
  {
    question: "Does NexterView support voice interviews?",
    answer: "Yes. Voice interaction is supported using browser-based speech recognition. Responses are securely converted to text before evaluation."
  },
  {
    question: "Can I track my performance over time?",
    answer: "Yes. Your dashboard stores interview history and allows you to track score trends, weak areas, and measurable improvement across multiple sessions with visual progress charts."
  },
  {
    question: "Is my interview data private?",
    answer: "Yes. All interview data is securely linked to your account and is not publicly accessible."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-linear-to-br from-[#050507] via-[#0B0B0F] to-[#16161D] ">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4 bg-linear-to-r from-[#9CA3AF] via-[#E5E7EB] to-[#94A3B8] bg-clip-text text-transparent pb-1">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#9CA3AF]">
              Everything you need to know about how NexterView works.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-[#1F1F2A] bg-[#111118] p-4 sm:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-[#1F1F2A] px-2 py-1 data-[state=open]:bg-[#0B0B0F] rounded-lg transition-colors"
                >
                  <AccordionTrigger className="text-left text-base font-heading font-semibold text-[#E5E7EB] hover:text-[#F9FAFB] hover:no-underline px-2">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#9CA3AF] leading-relaxed px-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
