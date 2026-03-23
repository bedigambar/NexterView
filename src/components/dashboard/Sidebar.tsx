"use client";

import {
  BrainCircuit,
  LayoutDashboard,
  GraduationCap,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";

export const navItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Interviews", icon: GraduationCap, href: "/dashboard/interviews" },
];

export function Sidebars() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="hidden md:flex md:w-62 flex-col border-r border-white/5 bg-[#0B0B0F] h-full">
      <Link
        href="/"
        className="flex items-center gap-3 px-5 py-5 border-b border-white/5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#111827] to-[#374151] shadow-md">
          <BrainCircuit className="h-5 w-5 text-white" />
        </div>

        <span className="text-lg font-semibold tracking-tight text-white">
          Interview
          <span className="bg-linear-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent">
            IQ
          </span>
        </span>
      </Link>
      <nav className="flex-1 px-3 py-6 space-y-1">
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
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#15151C] text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#111118]"
              }`}
            >
              <item.icon
                className={`h-4.5 w-4.5 transition ${
                  isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                }`}
              />

              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/5 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#111118] p-3 hover:bg-[#15151C] transition">
          
          <UserButton afterSignOutUrl="/" />

          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-semibold text-white">
              {user?.firstName ?? "User"}
            </span>

            <span className="text-xs text-gray-400">
              Free Plan
            </span>
          </div>

        </div>
      </div>
    </aside>
  );
}