import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getSoldArtworks } from "@/data/artworks";
import Button from "@/components/ui/Button";
import { SoldCollectionJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const BASE_URL = 'https://artattheafters.vercel.app';

export const metadata: Metadata = {
  title: 'Sold Artwork — See What Collectors Are Buying',
  description: 'Sold artwork from Art at the Afters by Stevie Alger. 75+ custom hand-painted pieces shipped to collectors in Los Angeles, New York, London, Byron Bay, Amsterdam, Toronto, Miami, and more. See what\'s been collected.',
  keywords: ['sold artwork', 'art collectors', 'sold paintings', 'custom art sold', 'art at the afters sold', 'collected paintings', 'sold commissions'],
  openGraph: {
    title: 'Sold Artwork — Art at the Afters | 75+ Pieces Worldwide',
    description: '75+ custom paintings sold to 5 countries and 17 cities worldwide. See what collectors are buying from Stevie Alger.',
    url: `${BASE_URL}/sold`,
    images: [
      {
        url: '/gallery/artwork/stevie-abstract-colorful.jpg',
        width: 1200,
        height: 630,
        alt: 'Psychedelic Dreams — Sold to Byron Bay, Australia. Custom painting by Stevie Alger.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sold Artwork — Art at the Afters',
    description: '75+ custom paintings sold worldwide. See what collectors are buying.',
    images: ['/gallery/artwork/stevie-abstract-colorful.jpg'],
  },
  alternates: {
    canonical: `${BASE_URL}/sold`,
  },
};

export default function SoldPage() {
  const soldArtworks = getSoldArtworks();

  return (
    <>
      <SoldCollectionJsonLd />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: BASE_URL },
        { name: 'Sold', url: `${BASE_URL}/sold` },
      ]} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 text-center">
        <h1
          className="text-7xl md:text-9xl tracking-tight text-brand-pink font-display"
          style={{
            textShadow:
              "0 0 40px rgba(255, 51, 153, 0.4), 0 0 80px rgba(255, 51, 153, 0.15)",
          }}
        >
          SOLD
        </h1>
        <div className="mt-6 inline-block px-6 py-3 rounded-full bg-brand-dark2 border border-brand-gray/20">
          <p className="text-lg md:text-xl text-brand-muted">
            These pieces found their forever homes.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24" aria-label="Sold artwork collection">
        <GalleryGrid artworks={soldArtworks} showSoldBadge={true} />
      </section>

      {/* CTA */}
      <section className="py-20 px-6" aria-label="Commission call to action">
        <div className="max-w-2xl mx-auto text-center rounded-xl bg-brand-dark2 border border-brand-gray/20 p-10 md:p-14">
          <h2 className="text-4xl md:text-5xl text-white mb-4 font-display">
            Want the next one?
          </h2>
          <p className="text-brand-muted mb-8">
            Commission a custom piece before it&apos;s gone.
          </p>
          <Button href="/order">Commission your custom piece &rarr;</Button>
        </div>
      </section>
    </>
  );
}
