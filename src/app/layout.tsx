import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nuuvixx | Product & Engineering Studio",
  description: "Nuuvixx designs and builds practical software, specialized commercial engineering solutions in Nuuvixx Studio, and open-source infrastructure in Nuuvixx Labs.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${instrumentSerif.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Nuuvixx",
              "url": "https://nuuvixx.com",
              "logo": "https://nuuvixx.com/logo.png",
              "description": "Product & Engineering Studio. Specialized commercial solutions (Nuuvixx Studio) and open-source autonomous agent infrastructure (Nuuvixx Labs).",
              "sameAs": [
                "https://github.com/Nuuvixx",
                "https://x.com/nuuvixx"
              ]
            })
          }}
        />
      </head>
      <body>
          <a className="skipLink" href="#main-content">Skip to content</a>
          <NavigationBar />
          <div id="main-content" style={{ minHeight: "100vh" }} tabIndex={-1}>
            {children}
          </div>
          <Footer />
      </body>
    </html>
  );
}
