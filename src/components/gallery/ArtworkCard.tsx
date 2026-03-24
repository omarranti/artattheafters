"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Artwork } from "@/types";
import SoldBadge from "./SoldBadge";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  onClick: (artwork: Artwork) => void;
}

const gradients = [
  "from-purple-900/80 to-indigo-900/80",
  "from-emerald-900/80 to-teal-900/80",
  "from-rose-900/80 to-pink-900/80",
  "from-amber-900/80 to-orange-900/80",
  "from-cyan-900/80 to-blue-900/80",
  "from-violet-900/80 to-fuchsia-900/80",
];

const hasRealImage = (image: string) => image.startsWith("/gallery/artwork/");

export default function ArtworkCard({ artwork, index, onClick }: ArtworkCardProps) {
  const aspectClass =
    index % 3 === 0
      ? "aspect-[3/4]"
      : index % 3 === 1
        ? "aspect-square"
        : "aspect-[4/3]";

  const gradient = gradients[index % gradients.length];
  const realImage = hasRealImage(artwork.image);

  return (
    <motion.div
      className="bg-brand-dark2 border border-brand-gray/20 rounded-xl overflow-hidden cursor-pointer break-inside-avoid mb-4 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: (index % 6) * 0.08,
      }}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(255, 68, 170, 0.3)",
      }}
      onClick={() => onClick(artwork)}
      layout
    >
      <div className={`relative ${aspectClass} w-full overflow-hidden`}>
        {/* Image or gradient placeholder */}
        {realImage ? (
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center p-4`}
          >
            <span className="font-display text-brand-white text-lg sm:text-xl text-center leading-tight opacity-60">
              {artwork.title}
            </span>
          </div>
        )}

        {/* Sold badge top-right */}
        {artwork.status === "sold" && (
          <div className="absolute top-3 right-3 z-10">
            <SoldBadge />
          </div>
        )}

        {/* Price tag — always visible on available works */}
        {artwork.status === "available" && artwork.price > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="rounded-full px-3 py-1 text-xs font-bold font-body text-brand-green bg-black/70 backdrop-blur-sm border border-brand-green/20">
              ${artwork.price}
            </span>
          </div>
        )}

        {/* Hover overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-5 gap-2.5">
          <h3 className="font-display text-brand-white text-xl text-center leading-tight">
            {artwork.title}
          </h3>
          <p className="font-body text-white/60 text-sm">{artwork.size}</p>
          {artwork.status === "sold" ? (
            <div className="flex items-center gap-2">
              <span className="rounded-full px-4 py-1.5 text-xs font-bold font-body uppercase tracking-wider text-brand-pink bg-brand-pink/15 border border-brand-pink/30">
                SOLD
              </span>
              {artwork.price > 0 && (
                <span className="font-body text-white/40 text-xs">${artwork.price}</span>
              )}
            </div>
          ) : (
            <span className="rounded-full px-4 py-1.5 text-xs font-bold font-body uppercase tracking-wider text-brand-green bg-brand-green/10 border border-brand-green/20">
              ${artwork.price}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
