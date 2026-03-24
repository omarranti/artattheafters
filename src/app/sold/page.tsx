import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getSoldArtworks } from "@/data/artworks";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sold — Art at the Afters",
};

export default function SoldPage() {
  const soldArtworks = getSoldArtworks();

  return (
    <>
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
      <section className="px-6 pb-24">
        <GalleryGrid artworks={soldArtworks} showSoldBadge={true} />
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
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
