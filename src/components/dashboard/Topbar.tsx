"use client";

import { useState } from "react";
import { Bell, Menu, X, BrainCircuit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./Sidebar";
import { useUser } from "@clerk/nextjs";

export function Topbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#1F1F2A] bg-[#0B0B0F]/80 px-4 sm:px-8 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F9FAFB] transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-heading font-semibold text-[#F9FAFB] hidden sm:block">
            Menu
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#9CA3AF] transition-colors hover:bg-[#1F2937] hover:text-[#F9FAFB]">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#0B0B0F]" />
          </button>
          <div className="h-8 w-px bg-[#1F1F2A] hidden sm:block" />
          <Avatar className="h-8 w-8 cursor-pointer border border-[#2D2D3A] hidden sm:block">
            <AvatarImage src={user?.imageUrl} alt={user?.firstName ?? "User"} />
            <AvatarFallback className="bg-[#1F2937] text-[#E5E7EB]">
              {user?.firstName?.[0] ?? "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="relative w-65 max-w-[80%] bg-[#0B0B0F] h-full flex flex-col border-r border-[#1F1F2A] animate-in slide-in-from-left duration-200">
            <button
              className="absolute right-4 top-4 text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937] p-2 rounded-lg transition-colors z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <Link
              href="/"
              className="flex items-center gap-3 p-4 border-b border-[#1F1F2A] cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-black-600 to-gray-600 flex items-center justify-center shadow-sm">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-heading font-semibold tracking-tight text-[#E5E7EB]">
                Interview
                <span className="bg-linear-to-r from-[#E5E7EB] via-[#CBD5F5] to-[#9CA3AF] bg-clip-text text-transparent">
                  IQ
                </span>
              </span>
            </Link>
            <nav className="flex-1 space-y-4 p-4 mt-6 overflow-y-auto">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href) ||
                      (item.href === "/dashboard/interviews" &&
                        pathname.startsWith("/dashboard/interview"));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#1F2937] text-[#F9FAFB]"
                        : "text-[#9CA3AF] hover:bg-[#111118] hover:text-[#F9FAFB]"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${isActive ? "text-[#F9FAFB]" : "text-[#6B7280]"}`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
