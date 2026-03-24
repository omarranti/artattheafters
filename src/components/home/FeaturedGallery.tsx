"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedArtworks } from "@/data/artworks";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const featuredArtworks = getFeaturedArtworks();

export default function FeaturedGallery() {
  return (
    <section className="bg-brand-dark px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="FRESH OFF THE EASEL"
          subtitle="Featured pieces from the latest sessions"
        />

        {/* CSS Columns masonry layout */}
        <div className="mt-16 columns-2 gap-4 lg:columns-3">
          {featuredArtworks.map((artwork, i) => {
            const hasRealImage = artwork.image.startsWith("/gallery/artwork/");

            return (
              <motion.div
                key={artwork.id}
                className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl bg-brand-dark2 border border-brand-gray/20 hover:border-brand-pink/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Image or gradient placeholder */}
                {hasRealImage ? (
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-brand-dark2 via-brand-dark to-brand-dark2">
                    <span className="px-4 text-center font-body text-sm uppercase tracking-widest text-brand-muted">
                      {artwork.title}
                    </span>
                  </div>
                )}

                {/* Hover overlay — slides up from bottom */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5 pt-16 transition-transform duration-300 ease-out group-hover:translate-y-0">
                  <p className="font-display text-lg uppercase text-white">
                    {artwork.title}
                  </p>
                  <p className="mt-1 font-body text-xs text-brand-muted">
                    {artwork.size} &middot; {artwork.medium}
                  </p>
                  <Link
                    href="/order"
                    className="mt-3 inline-flex w-fit items-center rounded-full px-4 py-2 font-body text-xs uppercase tracking-wider text-white bg-brand-dark2 border border-brand-gray/20 transition-colors hover:bg-white/10"
                  >
                    Inquire
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button href="/gallery" variant="secondary" size="lg">
            See All Work &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
}
