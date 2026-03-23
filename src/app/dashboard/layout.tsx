"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="flex overflow-hidden bg-[#0B0B0F] text-[#E5E7EB] selection:bg-[#1F2937]">

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-hidden">
          <div className="mx-auto max-w-7xl h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
