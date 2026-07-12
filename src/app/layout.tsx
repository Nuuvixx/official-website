import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

import SmoothScroller from "@/components/layout/SmoothScroller";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/layout/CommandPalette";
import CustomCursor from "@/components/layout/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nuuvixx | Infrastructure for the machines that think",
  description: "Nuuvixx builds the layer beneath the AI systems everyone else is building. Open-source. Production-grade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${jetbrainsMono.variable} ${GeistSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Nuuvixx",
              "url": "https://nuuvixx.dev",
              "logo": "https://nuuvixx.dev/logo.png",
              "description": "Infrastructure for the machines that think. Open-source, production-grade AI engineering organization.",
              "sameAs": [
                "https://github.com/Nuuvixx"
              ]
            })
          }}
        />
      </head>
      <body>
        <CustomCursor />
        <SmoothScroller>
          <NavigationBar />
          <CommandPalette />
          <main style={{ minHeight: "100vh", paddingTop: "80px" }}>
            {children}
          </main>
          <Footer />
        </SmoothScroller>
      </body>
    </html>
  );
}
