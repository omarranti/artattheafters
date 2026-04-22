import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingCTA from "@/components/ui/FloatingCTA";
import DonatePopup from "@/components/ui/DonatePopup";
import { WebsiteJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL('https://artattheafters.vercel.app'),
  title: {
    default: 'Art at the Afters — Custom Artwork by Stevie Alger',
    template: '%s | Art at the Afters',
  },
  description: 'One of a kind custom made artwork, delivered to you. 75+ hand-painted pieces sold across 5 countries and 17 cities. Custom paintings from $50 by LA artist Stevie Alger.',
  keywords: ['custom art', 'custom paintings', 'commissioned art', 'acrylic paintings', 'pop culture art', 'anime art', 'cartoon paintings', 'Stevie Alger', 'Los Angeles artist', 'hand painted', 'custom canvas art', 'art at the afters', 'affordable custom art', 'SpongeBob painting', 'anime painting', 'pop art commission'],
  authors: [{ name: 'Stevie Alger', url: 'https://instagram.com/artattheafters' }],
  creator: 'Stevie Alger',
  publisher: 'Art at the Afters',
  icons: {
    icon: '/icons/concept4_favicon_512.svg',
    apple: '/icons/concept4_favicon_512.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://artattheafters.vercel.app',
    siteName: 'Art at the Afters',
    title: 'Art at the Afters — Custom Artwork by Stevie Alger',
    description: 'One of a kind custom made artwork, delivered to you. Hand-painted originals from LA.',
    images: [
      {
        url: '/gallery/artwork/stevie-face-portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Art at the Afters — Custom paintings by Stevie Alger',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Art at the Afters — Custom Artwork by Stevie Alger',
    description: 'One of a kind custom made artwork, delivered to you. 75+ paintings sold worldwide.',
    images: ['/gallery/artwork/stevie-face-portrait.jpg'],
    creator: '@artattheafters',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {},
  alternates: {
    canonical: 'https://artattheafters.vercel.app',
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
        <WebsiteJsonLd />
        <TopBar />
        <Header />
        <main>{children}</main>
        <FloatingCTA />
        <DonatePopup />
        <Footer />
      </body>
    </html>
  );
}
