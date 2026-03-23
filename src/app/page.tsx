import { CTASection } from "@/components/landing/CTASection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { Performance } from "@/components/landing/Performance";
import { PerformanceAnalyticsSection } from "@/components/landing/PerformanceAnalyticsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { Footer } from "@/components/landing/Footer";
import { createUser } from "@/lib/CheckUser";

export default async function Home() {
  await createUser();
  return (
    <div className="min-h-screen flex flex-col pb-0">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <Performance />
        <PerformanceAnalyticsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
