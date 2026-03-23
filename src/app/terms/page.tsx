import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | NexterView",
  description: "Read the NexterView terms of service governing use of our AI-powered mock interview platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050507] text-[#E5E7EB] px-6 py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="text-[#9CA3AF]">
          By using NexterView, you agree to use the platform responsibly and in compliance with applicable laws.
        </p>

        <section className="space-y-2">
          <h2 className="text-xl font-medium">Acceptable Use</h2>
          <p className="text-[#9CA3AF]">
            You must not misuse the platform, attempt unauthorized access, or interfere with normal service operation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-medium">Service Availability</h2>
          <p className="text-[#9CA3AF]">
            We may update, modify, or pause parts of the service as needed for maintenance and improvements.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-medium">Limitation</h2>
          <p className="text-[#9CA3AF]">
            NexterView is provided for interview preparation purposes and does not guarantee hiring outcomes.
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
