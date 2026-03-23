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
  title: "NexterView | Master Mock Interviews with AI Feedback",
  description:
    "Elevate your career with NexterView. Practice role-specific mock interviews with AI, receive instant actionable feedback, and track your readiness scores today.",
  metadataBase: new URL("https://nexter-view.vercel.app"),
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "NexterView | Master Mock Interviews with AI Feedback",
    description:
      "Elevate your career with NexterView. Practice role-specific mock interviews with AI, receive instant actionable feedback, and track your readiness scores today.",
    url: "https://nexter-view.vercel.app",
    siteName: "NexterView",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NexterView — AI-Powered Mock Interviews",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexterView | Master Mock Interviews with AI Feedback",
    description:
      "Elevate your career with NexterView. Practice role-specific mock interviews with AI, receive instant actionable feedback, and track your readiness scores today.",
    images: ["/og-image.png"],
  },
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
