"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface EmailCaptureProps {
  variant?: "full" | "inline";
}

export default function EmailCapture({ variant = "full" }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: connect to email service (Mailchimp, ConvertKit, etc.)
    setSubmitted(true);
  }

  if (variant === "inline") {
    return (
      <ScrollReveal>
        <div className="bg-brand-dark2 border border-brand-gray/20 rounded-xl p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-2"
              >
                <p className="font-body text-brand-green text-sm font-semibold">You&apos;re in! We&apos;ll hit you up when new work drops.</p>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0 }}>
                <p className="font-body text-white/70 text-sm mb-3">
                  Get early access to new drops + behind-the-scenes content.
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 bg-brand-dark border border-brand-gray/20 rounded-full px-4 py-2.5 text-brand-white font-body text-sm placeholder:text-white/30 focus:border-brand-pink/40 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 bg-brand-pink text-brand-white rounded-full px-5 py-2.5 text-sm font-body font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <section className="py-16 md:py-24 px-6">
      <ScrollReveal>
        <div className="max-w-xl mx-auto bg-brand-dark2 border border-brand-gray/20 rounded-2xl p-8 sm:p-10 text-center">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4"
              >
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-display text-2xl text-brand-white mb-2">You&apos;re on the list</h3>
                <p className="font-body text-white/50 text-sm">We&apos;ll notify you when new work drops and commission slots open up.</p>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0 }}>
                <h3 className="font-display text-2xl sm:text-3xl text-brand-white mb-3">
                  Get Early Access to New Drops
                </h3>
                <p className="font-body text-white/50 text-sm mb-2">
                  Join 75+ collectors who get first dibs on new work, commission openings, and behind-the-scenes content.
                </p>
                <p className="font-body text-white/25 text-xs mb-6">
                  No spam. Just art.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 bg-brand-dark border border-brand-gray/20 rounded-full px-5 py-3.5 text-brand-white font-body placeholder:text-white/30 focus:border-brand-pink/40 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 bg-brand-pink text-brand-white rounded-full px-6 py-3.5 text-sm font-body font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
                  >
                    I&apos;m In
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </section>
  );
}
