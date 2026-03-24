"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { number: "75+", label: "Paintings" },
  { number: "5+", label: "Countries" },
  { number: "17+", label: "Cities" },
];

const easeTransition = {
  duration: 0.8,
  ease: "easeOut" as const,
};

export default function StorySection() {
  return (
    <section className="bg-brand-dark2 px-4 py-24 md:py-32">
      <motion.div
        className="bg-brand-dark2 border border-brand-gray/20 rounded-xl mx-auto max-w-6xl p-8 md:p-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={easeTransition}
      >
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Left: real image */}
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...easeTransition, delay: 0.1 }}
          >
            <Image
              src="/photos/stevie/stevie-painting-night.jpg"
              alt="Stevie painting at night with a friend"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Right: text content */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...easeTransition, delay: 0.2 }}
          >
            {/* Pull quote — Playfair italic pink */}
            <p className="font-display italic text-2xl leading-relaxed text-brand-pink md:text-3xl">
              &ldquo;It started with 3 canvases at 2am. By morning, they were
              all sold.&rdquo;
            </p>

            {/* Story text */}
            <p className="font-body text-base leading-relaxed text-white/70">
              What began as late-night painting sessions after the party became
              something bigger. Every piece carries the energy of those early
              morning hours -- raw, unfiltered, and a little chaotic. Art at
              the Afters is where pop culture meets paint, and every canvas
              tells a story that started when everyone else went home.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 pt-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-brand-dark border border-brand-gray/20 rounded-xl px-6 py-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                >
                  <span className="block font-display text-4xl text-brand-green">
                    {stat.number}
                  </span>
                  <span className="block font-body text-xs uppercase tracking-wider text-brand-muted">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Link */}
            <Link
              href="/about"
              className="mt-2 inline-flex items-center gap-1 font-body text-sm uppercase tracking-wider text-brand-green transition-colors hover:text-white"
            >
              Read the full story &rarr;
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
