"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/siteConfig";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const linkVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.15 + i * 0.05,
      duration: 0.8,
      ease: "easeOut" as const,
    },
  }),
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.97,
    transition: { duration: 0.15 },
  },
} satisfies Record<string, unknown>;

const bottomVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
} satisfies Record<string, unknown>;

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-brand-dark/95 backdrop-blur-md"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Top bar: logo + close */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            {/* Logo */}
            <Image
              src="/icons/concept4_icon_transparent.svg"
              alt="Art at the Afters"
              width={40}
              height={40}
            />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              aria-label="Close menu"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-dark2 border border-brand-gray/20 text-white hover:bg-white/15 transition-colors duration-200"
              whileTap={{ scale: 0.9 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>
          </div>

          {/* Nav Links — large Playfair Display */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-3 px-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-sm"
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-center w-full px-8 py-4 rounded-2xl bg-brand-dark2 border border-brand-gray/20 font-display text-2xl text-white uppercase tracking-wider hover:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom section */}
          <motion.div
            className="flex flex-col items-center gap-5 px-8 pb-12"
            variants={bottomVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Order Now — full-width */}
            <div className="w-full max-w-sm">
              <Button href="/order" size="lg" className="w-full">
                Order Now
              </Button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-dark2 border border-brand-gray/20 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-dark2 border border-brand-gray/20 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.24 8.24 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.12z" />
                </svg>
              </a>

              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-dark2 border border-brand-gray/20 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
