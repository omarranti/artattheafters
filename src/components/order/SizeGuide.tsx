"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface SizeOption {
  name: string;
  dimensions: string;
  price: string;
  width: number;
  height: number;
}

const sizes: SizeOption[] = [
  { name: '5\u00d77', dimensions: '5" \u00d7 7"', price: "$45", width: 50, height: 70 },
  { name: '8\u00d710', dimensions: '8" \u00d7 10"', price: "$75", width: 64, height: 80 },
  { name: '9\u00d712', dimensions: '9" \u00d7 12"', price: "$95", width: 68, height: 90 },
  { name: '11\u00d714', dimensions: '11" \u00d7 14"', price: "$120", width: 78, height: 100 },
  { name: '16\u00d720', dimensions: '16" \u00d7 20"', price: "$180", width: 88, height: 110 },
  { name: '26\u00d732', dimensions: '26" \u00d7 32"', price: "$350", width: 104, height: 128 },
  { name: "Custom", dimensions: "Any size", price: "$???", width: 96, height: 96 },
];

const easeTransition = {
  duration: 0.8,
  ease: "easeOut" as const,
};

export default function SizeGuide() {
  return (
    <section className="py-16 md:py-24">
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-5xl text-brand-white text-center mb-4">
          Sizes & Pricing
        </h2>
        <p className="font-body text-white/50 text-center max-w-xl mx-auto mb-12">
          Every piece is hand-painted on canvas. Prices start at the amounts
          below and may vary based on complexity.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {sizes.map((size, i) => (
          <ScrollReveal key={size.name} delay={i * 0.08}>
            <motion.div
              className="bg-brand-dark2 border border-brand-gray/20 rounded-xl p-6 flex flex-col items-center text-center h-full"
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(255, 51, 153, 0.3)",
              }}
              transition={easeTransition}
            >
              {/* Visual size representation */}
              <div className="flex items-center justify-center h-36 mb-4">
                <motion.div
                  className="border-2 border-brand-green/30 rounded-lg bg-brand-green/5"
                  style={{ width: size.width, height: size.height }}
                  whileHover={{
                    borderColor: "rgba(57,255,51,0.7)",
                    backgroundColor: "rgba(57,255,51,0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <h3 className="font-display text-xl text-brand-white mb-1">
                {size.name}
              </h3>
              <p className="font-body text-white/50 text-sm mb-2">
                {size.dimensions}
              </p>
              <p className="font-display italic text-brand-green text-lg mb-4">
                Starting at {size.price}
              </p>

              <div className="mt-auto w-full">
                <a
                  href="#commission-form"
                  className="rounded-full px-5 py-2.5 text-sm font-body uppercase tracking-wider text-brand-pink bg-brand-pink/15 border border-brand-pink/30 hover:bg-brand-pink/25 hover:border-brand-pink/40 transition-colors inline-flex items-center justify-center w-full"
                >
                  Start Your Piece
                </a>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
