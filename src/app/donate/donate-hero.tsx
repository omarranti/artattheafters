"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STRIPE_DONATE_URL =
  "https://buy.stripe.com/7sY7sLcK9dwG52ocQs1VK00";

const tiers = [
  {
    amount: "$10",
    label: "A few new brushes",
    emoji: "🖌️",
  },
  {
    amount: "$30",
    label: "Brushes, paints & canvases",
    emoji: "🎨",
    featured: true,
  },
  {
    amount: "$50+",
    label: "Keep the dream alive",
    emoji: "✨",
  },
];

export default function DonateHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-brand-dark px-4 py-24 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,68,170,0.06)_0%,_transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-2xl flex flex-col items-center text-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/icons/concept4_icon_transparent.svg"
            alt="Art at the Afters"
            width={72}
            height={72}
            className="h-16 w-16 md:h-[72px] md:w-[72px]"
            priority
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="space-y-2"
        >
          <p className="font-body text-sm uppercase tracking-[3px] text-brand-muted">
            Venmo @steviealger
          </p>
          <h1 className="font-display text-4xl font-bold uppercase text-white md:text-6xl lg:text-7xl leading-[0.9]">
            Keep The
            <br />
            <span className="text-brand-pink italic">Dream</span> Alive
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          className="max-w-md font-body text-base leading-relaxed text-white/60"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          By donating to the afters, you&apos;re allowing art to be created with
          new brushes, better paints and bigger canvases. Every dollar goes
          straight to the craft.
        </motion.p>

        {/* Tier cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {tiers.map((tier) => (
            <div
              key={tier.amount}
              className={`
                flex flex-col items-center gap-2 rounded-2xl border p-6 transition-all duration-300
                ${
                  tier.featured
                    ? "border-brand-pink/30 bg-brand-pink/[0.06]"
                    : "border-brand-gray/20 bg-brand-dark2"
                }
              `}
            >
              <span className="text-2xl">{tier.emoji}</span>
              <span className="font-display text-2xl text-white">
                {tier.amount}
              </span>
              <span className="font-body text-xs text-brand-muted leading-tight">
                {tier.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.a
            href={STRIPE_DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-pink px-10 py-5 font-body text-lg uppercase tracking-wider text-brand-white transition-colors hover:brightness-110"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            Donate via Venmo @steviealger
          </motion.a>
          <p className="font-body text-xs text-white/30">
            Secure payment powered by Stripe
          </p>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="rounded-full px-6 py-3 bg-brand-dark2 border border-brand-gray/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <p className="font-body text-sm text-white/50">
            75+ pieces sold across 5 countries and 17 cities
          </p>
        </motion.div>
      </div>
    </section>
  );
}
