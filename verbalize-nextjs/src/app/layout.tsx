import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://verbalize.mrinank-ai.tech"),
  title: {
    default:
      "Verbalize - AI Chatbot-as-a-Service Platform | Create & Deploy Custom Chatbots",
    template: "%s | Verbalize",
  },
  description:
    "Create and deploy AI chatbots effortlessly with Verbalize. Customize with instructions, deploy with one click, embed anywhere via iframe. Real-time streaming & multi-bot dashboard management.",
  keywords: [
    "AI chatbot platform",
    "chatbot as a service",
    "custom chatbot builder",
    "embed chatbot",
    "AI chatbot deployment",
    "chatbot iframe embed",
    "real-time AI chat",
    "chatbot dashboard",
    "AI customer service",
    "chatbot",
    "AI agent",
    "AI agent platform",
    "AI agent chatbot",
  ],
  authors: [{ name: "Mrinank" }],
  creator: "Mrinank",
  publisher: "Verbalize",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Verbalize - AI Chatbot-as-a-Service Platform",
    description:
      "Create & deploy custom AI chatbots with ease. Real-time streaming, one-click deployment, embed anywhere. Manage multiple bots from one dashboard.",
    url: "https://verbalize.mrinank-ai.tech",
    siteName: "Verbalize",
    images: [
      {
        url: "/images/landing.jpg",
        width: 1024,
        height: 513,
        alt: "Verbalize - AI Chatbot Platform Dashboard Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verbalize - AI Chatbot-as-a-Service Platform",
    description:
      "Create & deploy custom AI chatbots with ease. Real-time streaming, one-click deployment, embed anywhere.",
    images: ["/images/landing.jpg"],
    creator: "@mrinank110",
  },
  alternates: {
    canonical: "https://verbalize.mrinank-ai.tech",
  },
  verification: {
    google: "jvi3F5V3qDcAwktKEJ4G_5wnS0L0TWxf1n0Y0RxduN8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Verbalize",
    url: "https://verbalize.mrinank-ai.tech",
    description:
      "Create and deploy AI chatbots effortlessly with Verbalize. Customize with instructions, deploy with one click, embed anywhere via iframe.",
    author: {
      "@type": "Person",
      name: "Mrinank",
      url: "https://verbalize.mrinank-ai.tech",
    },
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta
          name="google-site-verification"
          content="jvi3F5V3qDcAwktKEJ4G_5wnS0L0TWxf1n0Y0RxduN8"
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
