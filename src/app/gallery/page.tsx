import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { artworks } from "@/data/artworks";
import EmailCapture from "@/components/ui/EmailCapture";

export const metadata: Metadata = {
  title: "Gallery — Art at the Afters",
};

export default function GalleryPage() {
  return (
    <>
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

      {/* Email capture below gallery */}
      <section className="px-6 pb-24 max-w-xl mx-auto">
        <EmailCapture variant="inline" />
      </section>
    </>
  );
}
