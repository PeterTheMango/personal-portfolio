import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { REVEAL_STORAGE_KEY, scrollReveal } from "@/components/portfolio/config";

// DESIGN.md §3 — Inter 400/500/600/700, self-hosted via next/font.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Resolves the scroll-reveal experiment before first paint, so content is never
// painted visible and then hidden. Off unless config.ts says otherwise or the
// visitor passed ?reveal=1; never on under prefers-reduced-motion.
const revealBootScript = `(function(){try{
var d=document.documentElement,k=${JSON.stringify(REVEAL_STORAGE_KEY)},s=null;
var q=new URLSearchParams(location.search).get("reveal");
if(q==="1"||q==="0"){s=q;try{localStorage.setItem(k,q)}catch(e){}}
else{try{s=localStorage.getItem(k)}catch(e){}}
var on=s===null?${scrollReveal}:s==="1";
if(on&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-reveal-root","on")}
}catch(e){}})()`;

export const metadata: Metadata = {
  title: "Peter Sotomango • Portfolio",
  description:
    "Engineer and researcher. I build software, then study whether it actually helps. Final-year Data Science and AI at UDST, based in Doha.",
  keywords: [
    "Peter Sotomango",
    "Software Engineer",
    "Researcher",
    "Data Science",
    "Artificial Intelligence",
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
      "Engineer and researcher. I build software, then study whether it actually helps.",
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
  // Allows content to extend under iOS notch/home bar; pair with safe-area CSS.
  viewportFit: "cover",
  themeColor: "#f2f5fa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The boot script stamps data-reveal-root on <html> before hydration, so the
    // server markup deliberately differs by that one attribute. Scoped to this
    // element's own attributes — children are still checked normally.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body className={inter.variable}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
