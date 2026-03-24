"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SHOW_ON_PAGES = ["/gallery", "/sold", "/", "/about", "/visualize"];

export default function FloatingCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const shouldShow = SHOW_ON_PAGES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  useEffect(() => {
    if (!shouldShow || dismissed) return;

    const handleScroll = () => {
      // Show after scrolling past 400px
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldShow, dismissed]);

  // Don't show on order page (they're already there)
  if (pathname === "/order" || !shouldShow || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile: full-width bottom bar */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <div className="bg-brand-dark/95 backdrop-blur-lg border-t border-brand-gray/20 px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-body text-white/90 text-sm font-semibold truncate">
                  Custom pieces from $45
                </p>
                <p className="font-body text-white/40 text-xs">
                  Hand-painted by Stevie, just for you
                </p>
              </div>
              <Link
                href="/order"
                className="flex-shrink-0 bg-brand-pink text-brand-white rounded-full px-5 py-3 min-h-[44px] flex items-center text-sm font-body font-bold uppercase tracking-wider hover:brightness-110 transition-all"
              >
                Start Your Piece
              </Link>
              <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
                className="flex-shrink-0 text-white/30 hover:text-white/60 transition-colors w-10 h-10 flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Desktop: floating pill bottom-right */}
          <motion.div
            className="fixed bottom-8 right-8 z-40 hidden md:block"
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative">
              <Link
                href="/order"
                className="flex items-center gap-3 bg-brand-dark2/95 backdrop-blur-lg border border-brand-gray/20 rounded-full pl-5 pr-2 py-2 shadow-lg shadow-black/30 hover:border-brand-pink/30 transition-all group"
              >
                <div>
                  <p className="font-body text-white/90 text-sm font-semibold group-hover:text-white transition-colors">
                    Custom pieces from $45
                  </p>
                  <p className="font-body text-white/40 text-xs">
                    Hand-painted just for you
                  </p>
                </div>
                <span className="flex-shrink-0 bg-brand-pink text-brand-white rounded-full px-4 py-2 text-xs font-body font-bold uppercase tracking-wider group-hover:brightness-110 transition-all">
                  Start
                </span>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDismissed(true);
                }}
                aria-label="Dismiss"
                className="absolute -top-2 -right-2 w-6 h-6 bg-brand-dark2 border border-brand-gray/20 rounded-full flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
