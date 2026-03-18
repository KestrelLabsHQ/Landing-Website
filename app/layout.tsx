import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kestrellabshq.com"),
  title: {
    default: "Kestrel Labs LLC",
    template: "%s | Kestrel Labs LLC",
  },
  description:
    "Dependable digital systems for growing businesses, from polished websites and internal tools to demanding software and infrastructure work.",
  applicationName: "Kestrel Labs",
  keywords: [
    "Kestrel Labs",
    "Atlanta software engineering",
    "website design",
    "internal tools",
    "infrastructure support",
    "advanced systems",
  ],
  openGraph: {
    title: "Kestrel Labs LLC",
    description:
      "Dependable digital systems for growing businesses, from polished websites and internal tools to demanding software and infrastructure work.",
    url: "https://kestrellabshq.com",
    siteName: "Kestrel Labs",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kestrel Labs LLC",
    description:
      "Dependable digital systems for growing businesses, from polished websites and internal tools to demanding software and infrastructure work.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plexMono.variable} bg-white font-sans text-black antialiased`}>
        <div className="min-h-screen bg-white">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
