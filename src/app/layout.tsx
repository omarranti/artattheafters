import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingCTA from "@/components/ui/FloatingCTA";

export const metadata: Metadata = {
  title: "Art at the Afters — Custom Artwork by Stevie Alger",
  description:
    "One of a kind custom made artwork delivered to you. 75+ paintings sold across 5 countries. Born at the afterparty in Los Angeles.",
  icons: {
    icon: "/icons/concept4_favicon_512.svg",
    apple: "/icons/concept4_favicon_512.svg",
  },
  openGraph: {
    title: "Art at the Afters",
    description:
      "One of a kind custom artwork. Born at the afterparty.",
    siteName: "Art at the Afters",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-brand-dark text-brand-white font-body antialiased">
        <GrainOverlay />
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <FloatingCTA />
        <Footer />
      </body>
    </html>
  );
}
