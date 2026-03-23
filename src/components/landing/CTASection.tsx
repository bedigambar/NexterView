import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-12 md:py-20 bg-transparent border-t border-[#1F1F2A]">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <Reveal>
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-4xl font-heading font-semibold text-[#E5E7EB] tracking-tight">
              Ready to Improve Your Interview Performance?
            </h2>
            <p className="text-[#9CA3AF] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Practice realistic interviews, receive AI-driven feedback, and
              track your progress until you’re fully prepared for the real one.
            </p>

            <div className="flex flex-row justify-center items-center gap-4 pt-4">
              <Link href="/dashboard/interviews" className="sm:w-auto">
                <Button
                  size="lg"
                  className="h-12 w-full px-4 md:px-8 rounded-lg bg-[#2D2D3A] text-[#F9FAFB] hover:bg-[#374151] border-0 transition-colors"
                >
                  Get Started for Free
                </Button>
              </Link>

              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full px-4 md:px-8 rounded-lg border border-[#374151] text-[#D1D5DB] hover:bg-[#111118] hover:text-[#F9FAFB] transition-colors bg-transparent"
                >
                  View Features
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
