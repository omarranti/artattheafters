import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Stevie Alger',
  description: 'Meet Stevie Alger, the LA-based artist behind Art at the Afters. Started painting at afterparties, now shipping custom art to 5+ countries. Care free, confident, and creative.',
  openGraph: {
    title: 'About Stevie Alger — Art at the Afters',
    description: 'The LA artist who started painting at 2am afterparties. 75+ paintings sold worldwide.',
    images: ['/photos/stevie/stevie-painting-night.jpg'],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
