"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const easeTransition = {
  duration: 0.8,
  ease: "easeOut" as const,
};

export default function DonateSection() {
  return (
    <section className="bg-brand-dark px-4 py-16 md:py-20">
      <div className="mx-auto max-w-2xl">
        <motion.div
          className="bg-brand-dark2 border border-brand-gray/20 rounded-xl flex flex-col items-center gap-6 p-8 text-center md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={easeTransition}
        >
          {/* Heading */}
          <h2 className="font-display text-4xl uppercase text-white md:text-5xl">
            Keep The Dream Alive
          </h2>

          {/* Quote */}
          <p className="max-w-md font-body text-base leading-relaxed text-white/70">
            &ldquo;By donating to the afters, you&apos;re allowing art to be
            created with new brushes, better paints and bigger
            canvases.&rdquo;
          </p>

          {/* Price callout */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/10 px-6 py-3">
            <span className="font-display text-2xl text-brand-green">
              $30
            </span>
            <span className="font-body text-sm text-white/60">
              &mdash; Brushes, Paints &amp; Canvases
            </span>
          </div>

          {/* Donate button */}
          <motion.a
            href="https://buy.stripe.com/7sY7sLcK9dwG52ocQs1VK00"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-pink px-8 py-4 font-body text-base uppercase tracking-wider text-brand-white transition-colors hover:brightness-110 hover:opacity-90"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            Donate via Venmo @steviealger
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
