import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verbalize",
  description: "Welcome to Verbalize",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
