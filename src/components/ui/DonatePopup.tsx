"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STRIPE_DONATE_URL =
  "https://buy.stripe.com/7sY7sLcK9dwG52ocQs1VK00";

const POPUP_DELAY_MS = 45_000; // 45 seconds
const DISMISS_KEY = "aata_donate_popup_dismissed";

export default function DonatePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const timer = setTimeout(() => setShow(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={dismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card */}
          <motion.div
            className="relative z-10 w-full max-w-md rounded-2xl border border-brand-pink/20 bg-brand-dark2 p-8 text-center"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Accent glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,_rgba(255,68,170,0.08)_0%,_transparent_60%)]" />

            <div className="relative flex flex-col items-center gap-5">
              <span className="text-4xl">🎨</span>

              <h2 className="font-display text-2xl md:text-3xl text-brand-white leading-tight">
                Get a <span className="text-brand-pink italic">Free</span>{" "}
                Custom Consultation
              </h2>

              <p className="font-body text-sm text-white/50 leading-relaxed max-w-sm">
                Donate to the craft and Stevie will personally walk you through
                your custom piece -- colors, size, vibe, everything. Every
                dollar goes straight to new brushes, better paints, and bigger
                canvases.
              </p>

              <motion.a
                href={STRIPE_DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full bg-brand-pink px-8 py-4 font-body text-sm uppercase tracking-wider text-brand-white hover:brightness-110 transition-colors inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                onClick={() => sessionStorage.setItem(DISMISS_KEY, "1")}
              >
                Donate & Get Your Consultation
              </motion.a>

              <button
                onClick={dismiss}
                className="font-body text-xs text-white/30 hover:text-white/50 transition-colors cursor-pointer"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
