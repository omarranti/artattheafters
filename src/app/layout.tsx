import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingCTA from "@/components/ui/FloatingCTA";
import { WebsiteJsonLd } from "@/components/seo/JsonLd";

const BASE_URL = 'https://artattheafters.vercel.app';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0D' },
    { media: '(prefers-color-scheme: light)', color: '#FF3399' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Art at the Afters — Custom Hand-Painted Artwork by Stevie Alger | LA Artist',
    template: '%s | Art at the Afters — Custom Artwork by Stevie Alger',
  },
  description: 'One of a kind custom hand-painted artwork by LA artist Stevie Alger. 75+ original acrylic paintings sold across 5 countries and 17 cities. Custom commissions from $50. Pop culture, anime, abstract art shipped worldwide.',
  keywords: [
    'custom art', 'custom paintings', 'commissioned art', 'acrylic paintings',
    'pop culture art', 'anime art', 'cartoon paintings', 'Stevie Alger',
    'Los Angeles artist', 'hand painted', 'custom canvas art', 'art at the afters',
    'affordable custom art', 'SpongeBob painting', 'anime painting', 'pop art commission',
    'custom artwork online', 'buy original art', 'commission artist', 'LA art',
    'hand painted canvas', 'original paintings for sale', 'custom portrait painting',
    'acrylic canvas art', 'pop culture paintings', 'anime canvas art',
    'abstract paintings', 'custom wall art', 'unique art gifts', 'personalized paintings',
    'art commission service', 'contemporary art', 'street art inspired', 'urban art',
    'one of a kind art', 'handmade paintings', 'custom pet portrait', 'fan art painting',
  ],
  authors: [{ name: 'Stevie Alger', url: 'https://instagram.com/artattheafters' }],
  creator: 'Stevie Alger',
  publisher: 'Art at the Afters',
  category: 'Art & Design',
  classification: 'Art Gallery / Custom Art Commission',
  icons: {
    icon: [
      { url: '/icons/concept4_favicon_512.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icons/concept4_favicon_512.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Art at the Afters',
    title: 'Art at the Afters — Custom Hand-Painted Artwork by Stevie Alger',
    description: 'One of a kind custom hand-painted artwork, delivered to you. 75+ original paintings sold to 5 countries. Commission your own custom piece from $50.',
    images: [
      {
        url: '/gallery/artwork/stevie-face-portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Art at the Afters — Custom hand-painted artwork by Stevie Alger, LA artist',
        type: 'image/jpeg',
      },
      {
        url: '/gallery/artwork/red-roses-abstract.jpg',
        width: 1200,
        height: 630,
        alt: 'Red Roses Abstract — Original acrylic painting by Stevie Alger',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Art at the Afters — Custom Artwork by Stevie Alger',
    description: 'One of a kind custom hand-painted artwork. 75+ paintings sold worldwide. Commission yours from $50.',
    images: ['/gallery/artwork/stevie-face-portrait.jpg'],
    creator: '@artafterparty',
    site: '@artafterparty',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    'msapplication-TileColor': '#FF3399',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Art at the Afters',
    'format-detection': 'telephone=no',
    'pinterest': 'nopin',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        {/* DNS Prefetch & Preconnect for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//instagram.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Geo meta tags for local SEO */}
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Los Angeles" />
        <meta name="geo.position" content="34.0522;-118.2437" />
        <meta name="ICBM" content="34.0522, -118.2437" />
      </head>
      <body className="bg-brand-dark text-brand-white font-body antialiased">
        <GrainOverlay />
        <CustomCursor />
        <WebsiteJsonLd />
        <Header />
        <main id="main-content">{children}</main>
        <FloatingCTA />
        <Footer />
      </body>
    </html>
  );
}
