import type { Metadata } from "next";
import Image from "next/image";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { artworks } from "@/data/artworks";
import EmailCapture from "@/components/ui/EmailCapture";
import { ArtGalleryJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse the full collection of custom hand-painted artwork by Stevie Alger. Pop culture, anime, abstract, and original pieces. Commission your own custom painting.',
  openGraph: {
    title: 'Gallery — Art at the Afters',
    description: 'Browse 75+ custom hand-painted pieces. Pop culture, anime, abstract art.',
    images: ['/gallery/artwork/stevie-face-portrait.jpg'],
  },
};

export default function GalleryPage() {
  return (
    <>
      <ArtGalleryJsonLd />
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 text-center">
        <h1 className="text-7xl md:text-9xl tracking-tight text-white font-display">
          THE GALLERY
        </h1>
        <div className="mt-6 inline-block px-6 py-3 rounded-full bg-brand-dark2 border border-brand-gray/20">
          <p className="text-lg md:text-xl text-brand-muted">
            Every piece tells a story. Find yours.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-12">
        <GalleryGrid artworks={artworks} />
      </section>

      {/* Nostalgia Series Feature */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden border border-brand-gray/20 bg-brand-dark2">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
            <Image
              src="/photos/social-proof/nostalgia-series-grid.png"
              alt="The Nostalgia Series — 6 hand-painted original paintings by Stevie"
              fill
              className="object-contain bg-black"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          <div className="px-6 py-5 text-center">
            <p className="text-xl md:text-2xl text-white font-display">
              The Nostalgia Series
            </p>
            <p className="mt-1 text-brand-muted text-sm">
              All hand-painted originals
            </p>
          </div>
        </div>
      </section>

      {/* Email capture below gallery */}
      <section className="px-6 pb-24 max-w-xl mx-auto">
        <EmailCapture variant="inline" />
      </section>
    </>
  );
}
