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
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Kestrel Labs",
    "Kestrel Labs LLC",
    "Atlanta software engineering",
    "Atlanta web design",
    "website design",
    "internal tools",
    "software engineering",
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
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "Kestrel Labs LLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kestrel Labs LLC",
    description:
      "Dependable digital systems for growing businesses, from polished websites and internal tools to demanding software and infrastructure work.",
    images: ["/og-image"],
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
