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
      <div className="h-full relative bg-black brightness-85">
        <Sidebar />
        <div className="md:ml-68 ml-20 mt-3 mr-2 bg-black p-2 rounded-xl  border-4 border-yellow-500 min-h-screen">
          {children}
          <SpeedInsights />
          <Analytics />
        </div>
      </div>
    </ClerkProvider>
  );
}
