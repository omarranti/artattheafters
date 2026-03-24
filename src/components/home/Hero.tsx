"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const titleLine1 = "ART AT THE";
const titleLine2 = "AFTERS";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const floatingImages = [
  { src: "/gallery/artwork/stevie-abstract-colorful.jpg", alt: "Abstract colorful", className: "top-[10%] left-[5%] w-40 h-52 md:w-52 md:h-64 -rotate-6" },
  { src: "/gallery/artwork/elmo-fire.jpg", alt: "Elmo on fire", className: "top-[15%] right-[6%] w-36 h-44 md:w-44 md:h-56 rotate-3" },
  { src: "/gallery/artwork/stevie-face-portrait.jpg", alt: "Face portrait", className: "bottom-[18%] left-[8%] w-32 h-40 md:w-40 md:h-52 rotate-6" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-dark px-4">
      {/* Background radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(91,255,160,0.05)_0%,_transparent_60%)]" />

      {/* Floating background artwork thumbnails */}
      {floatingImages.map((img, i) => (
        <motion.div
          key={img.src}
          className={`pointer-events-none absolute ${img.className} overflow-hidden rounded-2xl opacity-[0.07] blur-[2px]`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.07, scale: 1 }}
          transition={{ delay: 1.8 + i * 0.3, duration: 1.2 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="200px"
          />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center md:gap-8">
        {/* 8-ball logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <Image
            src="/icons/concept4_icon_transparent.svg"
            alt="Art at the Afters logo"
            width={90}
            height={90}
            className="h-20 w-20 md:h-[90px] md:w-[90px]"
            priority
          />
        </motion.div>

        {/* Staggered letter title — Playfair Display 700, white */}
        <motion.h1
          className="flex flex-col items-center font-display font-bold leading-[0.85] tracking-wider text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={`${titleLine1} ${titleLine2}`}
        >
          <span className="flex text-5xl md:text-7xl lg:text-8xl">
            {titleLine1.split("").map((char, i) => (
              <motion.span
                key={`l1-${char}-${i}`}
                variants={letterVariants}
                className="inline-block"
                style={{ minWidth: char === " " ? "0.25em" : undefined }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
          <span className="flex text-7xl md:text-9xl lg:text-[10rem]">
            {titleLine2.split("").map((char, i) => (
              <motion.span
                key={`l2-${char}-${i}`}
                variants={letterVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* By line — "by" in Outfit italic muted, "Stevie Alger" in Playfair italic */}
        <motion.p
          className="text-lg md:text-xl"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <span className="font-body italic text-brand-muted">by </span>
          <span className="font-display italic text-brand-muted">Stevie Alger</span>
        </motion.p>

        {/* Tagline */}
        <motion.div
          className="rounded-full px-6 py-3 bg-brand-dark2 border border-brand-gray/20"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="font-body text-sm tracking-wide text-white/80 md:text-base">
            One of a kind custom artwork. Born at the afterparty.
          </p>
        </motion.div>

        {/* CTAs — pink filled primary, green outline secondary (pill buttons) */}
        <motion.div
          className="flex flex-col items-center gap-4 pt-2 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Link
              href="/gallery"
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full border-[1.5px] border-brand-green bg-transparent px-8 py-4 font-body text-base uppercase tracking-wider text-brand-green transition-colors hover:bg-brand-green/10"
            >
              Browse Gallery
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Link
              href="/order"
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-pink px-8 py-4 font-body text-base uppercase tracking-wider text-brand-white transition-colors hover:brightness-110 hover:opacity-90"
            >
              Order Custom Art
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-dark to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
<motion.div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark2 border border-brand-gray/20"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-white/60"
          >
            <path
              d="M3 5L7 9L11 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
