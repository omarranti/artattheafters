"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const socialProofImages = [
  { src: "/photos/social-proof/dm-requests-grid-1.jpg", alt: "DM requests showing artwork interest" },
  { src: "/photos/social-proof/dm-requests-grid-2.jpg", alt: "DM requests from fans" },
  { src: "/photos/social-proof/dm-convinced.png", alt: "Customer convinced to buy artwork" },
  { src: "/photos/social-proof/story-responses.png", alt: "Instagram story responses" },
  { src: "/photos/social-proof/nostalgia-series-dm.png", alt: "Nostalgia series DM conversation" },
  { src: "/photos/social-proof/dm-byron-bay.png", alt: "DM from Byron Bay customer" },
  { src: "/photos/social-proof/story-responses-3.png", alt: "More Instagram story responses" },
  { src: "/photos/social-proof/nostalgia-series-grid.png", alt: "The Nostalgia Series — 6 hand-painted originals" },
];

export default function InstagramFeed() {
  return (
    <section className="bg-brand-dark2 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="THE PEOPLE HAVE SPOKEN" />

        <p className="mt-4 text-center font-body text-lg text-brand-green">
          @artattheafters
        </p>

        {/* Grid of real social proof screenshots */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {socialProofImages.map((post, i) => (
            <motion.div
              key={post.src}
              className="group relative aspect-square overflow-hidden rounded-xl bg-brand-dark2 border border-brand-gray/20 hover:border-brand-pink/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{
                scale: 1.03,
              }}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />

              {/* Hover border glow overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-brand-pink/0 transition-all duration-300 group-hover:border-brand-pink/30" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button
            href="https://www.instagram.com/artattheafters/"
            variant="secondary"
            size="md"
          >
            Follow on Instagram
          </Button>
        </div>
      </div>
    </section>
  );
}
