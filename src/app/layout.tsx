import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/landing/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "NexterView | AI-Powered Interviews",
  description:
    "Master Interviews. Track Progress. Get Hired. AI-driven structured evaluation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth">
      <ClerkProvider
        appearance={{
          theme: shadcn,
        }}
      >
        <body
          className={`${dmSans.className} ${poppins.variable} ${dmSans.variable} antialiased bg-[#050507] bg-linear-to-b from-[#050507] to-[#16161D] min-h-screen text-[#E5E7EB] selection:bg-[#1F2937]`}
        >
          <Header />
          {children}
          <Toaster position="top-center"/>
        </body>
      </ClerkProvider>
    </html>
  );
}
