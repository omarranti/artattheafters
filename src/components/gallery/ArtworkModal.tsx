"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Artwork } from "@/types";
import SoldBadge from "./SoldBadge";

interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const gradients = [
  "from-purple-900 to-indigo-900",
  "from-emerald-900 to-teal-900",
  "from-rose-900 to-pink-900",
  "from-amber-900 to-orange-900",
  "from-cyan-900 to-blue-900",
  "from-violet-900 to-fuchsia-900",
];

const hasRealImage = (image: string) => image.startsWith("/gallery/artwork/");

const easeTransition = {
  duration: 0.8,
  ease: "easeOut" as const,
};

export default function ArtworkModal({
  artwork,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: ArtworkModalProps) {
  const [copied, setCopied] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCopyLink = () => {
    if (!artwork) return;
    const url = `${window.location.origin}/gallery/${artwork.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const gradientIndex = artwork
    ? parseInt(artwork.id, 10) % gradients.length
    : 0;

  return (
    <AnimatePresence>
      {isOpen && artwork && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-brand-dark2 border border-brand-gray/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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

          {/* Prev arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-brand-dark2 border border-brand-gray/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Previous artwork"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-brand-dark2 border border-brand-gray/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Next artwork"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Content card */}
          <motion.div
            className="relative z-10 bg-brand-dark2 rounded-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col lg:flex-row border border-brand-gray/20"
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={easeTransition}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image area */}
            <div className="lg:w-1/2 flex-shrink-0">
              <div className="relative w-full aspect-[3/4]">
                {hasRealImage(artwork.image) ? (
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradients[gradientIndex]} flex items-center justify-center p-8`}
                  >
                    <span className="font-display text-brand-white text-2xl sm:text-3xl text-center leading-tight opacity-70">
                      {artwork.title}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Details panel */}
            <div className="lg:w-1/2 bg-brand-dark2 p-6 sm:p-8 flex flex-col gap-5">
              <div>
                <h2 className="font-display text-brand-white text-2xl sm:text-3xl mb-2">
                  {artwork.title}
                </h2>
                <p className="font-body text-white/50 text-sm leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              {/* Price — prominent display */}
              {artwork.price > 0 && (
                <div className="flex items-center gap-3">
                  <span className="font-display text-brand-green text-3xl sm:text-4xl italic">
                    ${artwork.price}
                  </span>
                  {artwork.status === "sold" ? (
                    <SoldBadge />
                  ) : (
                    <span className="rounded-full px-3 py-1 text-xs font-bold font-body uppercase tracking-wider text-brand-green bg-brand-green/10 border border-brand-green/20 inline-flex items-center">
                      Available
                    </span>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-body text-white/40 text-xs uppercase tracking-wider block mb-1">
                    Size
                  </span>
                  <span className="font-body text-brand-white text-sm">
                    {artwork.size}
                  </span>
                </div>
                <div>
                  <span className="font-body text-white/40 text-xs uppercase tracking-wider block mb-1">
                    Medium
                  </span>
                  <span className="font-body text-brand-white text-sm">
                    {artwork.medium}
                  </span>
                </div>
              </div>

              {artwork.status === "sold" ? (
                <div className="flex flex-col gap-3">
                  {artwork.soldTo && (
                    <p className="font-body text-white/40 text-sm">
                      Sold to {artwork.soldTo}
                    </p>
                  )}
                  <a
                    href="/order"
                    className="rounded-full px-6 py-3.5 min-h-[48px] flex items-center justify-center text-center font-body font-bold uppercase tracking-wider text-sm bg-brand-pink text-brand-white hover:brightness-110 hover:opacity-90 transition-colors"
                  >
                    Commission Something Similar
                  </a>
                </div>
              ) : (
                <a
                  href="/order"
                  className="rounded-full px-6 py-3.5 min-h-[48px] flex items-center justify-center text-center font-body font-bold uppercase tracking-wider text-sm bg-brand-green/15 text-brand-green border border-brand-green/20 hover:bg-brand-green/25 hover:border-brand-green/35 transition-colors"
                >
                  Start Your Custom Piece — ${artwork.price}
                </a>
              )}

              {/* Share button */}
              <button
                onClick={handleCopyLink}
                className="rounded-full px-4 py-2 flex items-center gap-2 font-body text-white/50 text-sm bg-brand-dark border border-brand-gray/20 hover:text-white/80 transition-colors cursor-pointer self-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
