import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | NexterView",
  description: "Get in touch with the NexterView team for support, feedback, or collaboration enquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050507] text-[#E5E7EB] px-6 py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="text-[#9CA3AF]">
          Reach out for support, collaboration, or product questions.
        </p>

        <div className="space-y-4 rounded-2xl border border-[#1F1F2A] bg-[#0B0B0F] p-6">
          <div>
            <p className="text-sm text-[#9CA3AF]">Email</p>
            <a
              href="mailto:beheradigambar563@gmail.com"
              className="text-[#E5E7EB] hover:text-white transition-colors"
            >
              beheradigambar563@gmail.com
            </a>
          </div>

          <div>
            <p className="text-sm text-[#9CA3AF]">X</p>
            <a
              href="https://x.com/digambarcodes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E5E7EB] hover:text-white transition-colors"
            >
              https://x.com/digambarcodes
            </a>
          </div>

          <div>
            <p className="text-sm text-[#9CA3AF]">LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/digambar-behera"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E5E7EB] hover:text-white transition-colors"
            >
              https://www.linkedin.com/in/digambar-behera
            </a>
          </div>
        </div>

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
