"use client";

import Link from "next/link";
import Marquee from "@/components/ui/Marquee";
import { getSoldArtworks } from "@/data/artworks";

const soldArtworks = getSoldArtworks();

export default function SoldMarquee() {
  return (
    <section className="bg-brand-dark py-12 md:py-16">
      {/* Simple dark bg strip */}
      <div className="bg-brand-dark2 mx-4 rounded-2xl py-4 md:mx-8 border border-brand-gray/20">
        <Marquee speed={25} pauseOnHover className="py-2">
          <div className="flex items-center">
            {soldArtworks.map((artwork) => (
              <div key={artwork.id} className="flex items-center px-2">
                <span className="font-display text-lg uppercase tracking-wide text-white md:text-xl">
                  {artwork.title}
                </span>
                <span className="mx-3 rounded-full bg-brand-pink/15 px-3 py-1 font-display text-[10px] uppercase tracking-widest text-brand-pink border border-brand-pink/30">
                  SOLD
                </span>
                <span className="mx-4 text-white/20">&bull;</span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          href="/sold"
          className="font-body text-sm uppercase tracking-wider text-brand-green transition-colors hover:text-white"
        >
          See What&apos;s Found a Home &rarr;
        </Link>
      </div>
    </section>
  );
}
