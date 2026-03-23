import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0B0B0F] pt-8 md:pt-16 pb-4 md:pb-8">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-10 mb-12">
          <div className="max-w-xs px-4">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
              <BrainCircuit className="h-5 w-5 text-[#E5E7EB]" />
              <span className="text-xl font-heading font-semibold tracking-tight text-[#E5E7EB]">NexterView</span>
            </div>
            <p className="text-sm text-center sm:text-left text-[#9CA3AF] leading-relaxed">
              AI-powered interview preparation platform designed for structured improvement.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-12 sm:gap-16 px-4 items-start text-left">
            <div className="min-w-35">
              <h4 className="text-[#E5E7EB] font-heading font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-3 text-sm text-[#9CA3AF]">
                <li><Link href="#features" className="hover:text-[#F9FAFB] transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-[#F9FAFB] transition-colors">How It Works</Link></li>
                <li><Link href="#faq" className="hover:text-[#F9FAFB] transition-colors">FAQ</Link></li>
                <li><Link href="/dashboard" scroll className="hover:text-[#F9FAFB] transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div className="min-w-35">
              <h4 className="text-[#E5E7EB] font-heading font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3 text-sm text-[#9CA3AF]">
                <li><Link href="/privacy" className="hover:text-[#F9FAFB] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#F9FAFB] transition-colors">Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-[#F9FAFB] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#1F1F2A] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280] px-4">
            © 2026 NexterView. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
