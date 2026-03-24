"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const TOTAL_SLOTS = 4;
const FILLED_SLOTS = 2;
const OPEN_SLOTS = TOTAL_SLOTS - FILLED_SLOTS;

export default function CommissionSlots() {
  return (
    <ScrollReveal>
      <div className="max-w-lg mx-auto bg-brand-dark2 border border-brand-gray/20 rounded-xl p-5 sm:p-6 text-center mb-8">
        <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-3">
          March Commission Slots
        </p>
        <div className="flex items-center justify-center gap-3 mb-3">
          {[...Array(TOTAL_SLOTS)].map((_, i) => {
            const filled = i < FILLED_SLOTS;
            return (
              <motion.div
                key={i}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                  filled
                    ? "border-brand-pink/40 bg-brand-pink/10"
                    : "border-brand-green/40 bg-brand-green/5"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
              >
                {filled ? (
                  <svg className="w-4 h-4 text-brand-pink/60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-green/50 animate-pulse" />
                )}
              </motion.div>
            );
          })}
        </div>
        <p className="font-body text-brand-white text-sm">
          <span className="text-brand-green font-bold">{OPEN_SLOTS} of {TOTAL_SLOTS}</span>{" "}
          <span className="text-white/50">slots open this month</span>
        </p>
      </div>
    </ScrollReveal>
  );
}
