import Sidebar from "@/components/sidebar";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Verbalize | Dashboard",
  description: "Verbalize Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="h-full relative">
        <Sidebar />
        <div className="md:ml-68 ml-20 mt-2 mr-2 bg-gray-100 p-2 rounded-xl min-h-screen">
          {children}
          <SpeedInsights />
          <Analytics />
        </div>
      </div>
    </ClerkProvider>
  );
}
