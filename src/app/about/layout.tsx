import type { Metadata } from "next";

const BASE_URL = 'https://artattheafters.vercel.app';

export const metadata: Metadata = {
  title: 'About Stevie Alger — LA Artist Behind Art at the Afters',
  description: 'Meet Stevie Alger, the Los Angeles artist behind Art at the Afters. From painting at 2am afterparties to selling 75+ custom pieces to 5 countries and 17 cities. Care free, confident, and creative.',
  keywords: ['Stevie Alger', 'LA artist', 'Los Angeles painter', 'art at the afters artist', 'custom art artist', 'afterparty painter', 'emerging artist LA'],
  openGraph: {
    title: 'About Stevie Alger — The Artist Behind Art at the Afters',
    description: 'The LA artist who started painting at 2am afterparties. 75+ paintings sold to 5 countries worldwide. Every piece is custom, every piece tells a story.',
    url: `${BASE_URL}/about`,
    images: [
      {
        url: '/photos/stevie/stevie-painting-night.jpg',
        width: 1200,
        height: 630,
        alt: 'Stevie Alger painting at night in the studio — Art at the Afters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Stevie Alger — Art at the Afters',
    description: 'The LA artist who started painting at 2am afterparties. 75+ paintings sold worldwide.',
    images: ['/photos/stevie/stevie-painting-night.jpg'],
  },
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
