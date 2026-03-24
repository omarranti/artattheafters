"use client";

import { motion } from "framer-motion";

interface SoldBadgeProps {
  className?: string;
}

export default function SoldBadge({ className = "" }: SoldBadgeProps) {
  return (
    <motion.span
      className={`bg-brand-pink/15 text-brand-pink border border-brand-pink/30 rounded-full px-3 py-1 inline-flex items-center text-xs font-bold font-body uppercase tracking-wider ${className}`}
      animate={{
        boxShadow: [
          "0 0 0px rgba(255,51,153,0)",
          "0 0 12px rgba(255,51,153,0.35)",
          "0 0 0px rgba(255,51,153,0)",
        ],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      SOLD
    </motion.span>
  );
}
