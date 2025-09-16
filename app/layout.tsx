import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peter Sotomango • Portfolio",
  description:
    "A modern personal portfolio showcasing my work and experience as a Full Stack Engineer, Researcher, and ML Engineer",
  keywords: [
    "Peter Sotomango",
    "Full Stack Engineer",
    "Researcher",
    "ML Engineer",
    "React",
    "TypeScript",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Peter Sotomango" }],
  creator: "Peter Sotomango",
  publisher: "Peter Sotomango",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://petersotomango.com",
    title: "Peter Sotomango • Portfolio",
    description:
      "A modern personal portfolio showcasing my work and experience as a Full Stack Engineer, Researcher, and ML Engineer",
    siteName: "Peter Sotomango Portfolio",
  },
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Allows content to extend under iOS notch/home bar; pair with safe-area CSS below
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
