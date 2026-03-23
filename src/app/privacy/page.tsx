import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | NexterView",
  description: "Privacy policy for NexterView.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050507] text-[#E5E7EB] px-6 py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="text-[#9CA3AF]">
          NexterView collects account and interview usage data to provide and improve the service.
        </p>

        <section className="space-y-2">
          <h2 className="text-xl font-medium">Data We Collect</h2>
          <p className="text-[#9CA3AF]">
            We may store profile information, interview responses, scores, and analytics tied to your account.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-medium">How We Use Data</h2>
          <p className="text-[#9CA3AF]">
            Data is used to run mock interviews, generate scores and feedback, display your progress history, and improve product performance and reliability through analytics.
          </p>
          <p className="text-[#9CA3AF]">
            We do not sell your personal data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-medium">Contact</h2>
          <p className="text-[#9CA3AF]">
            For privacy requests, contact the NexterView team through your official support channel.
          </p>
        </section>

        <Link
          href="/"
          className="inline-block text-sm text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
