"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import type { Artwork } from "@/types";
import CategoryFilter from "./CategoryFilter";
import ArtworkCard from "./ArtworkCard";
import ArtworkModal from "./ArtworkModal";
import { getAllCategories } from "@/data/artworks";

interface GalleryGridProps {
  artworks: Artwork[];
  showSoldBadge?: boolean;
}

export default function GalleryGrid({
  artworks,
  showSoldBadge = false,
}: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = useMemo(() => getAllCategories(), []);

  const filteredArtworks = useMemo(() => {
    if (activeCategory === "all") return artworks;
    return artworks.filter((artwork) =>
      artwork.category.split(",").includes(activeCategory)
    );
  }, [artworks, activeCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleCardClick = useCallback((artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArtwork(null), 300);
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedArtwork) return;
    const currentIndex = filteredArtworks.findIndex(
      (a) => a.id === selectedArtwork.id
    );
    const nextIndex = (currentIndex + 1) % filteredArtworks.length;
    setSelectedArtwork(filteredArtworks[nextIndex]);
  }, [selectedArtwork, filteredArtworks]);

  const handlePrev = useCallback(() => {
    if (!selectedArtwork) return;
    const currentIndex = filteredArtworks.findIndex(
      (a) => a.id === selectedArtwork.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredArtworks.length) % filteredArtworks.length;
    setSelectedArtwork(filteredArtworks[prevIndex]);
  }, [selectedArtwork, filteredArtworks]);

  return (
    <div className="w-full">
      {/* Category filter */}
      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Masonry grid */}
      <LayoutGroup>
        <div className="rounded-xl p-4 sm:p-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredArtworks.map((artwork, index) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  index={index}
                  onClick={handleCardClick}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </LayoutGroup>

      {/* Empty state */}
      {filteredArtworks.length === 0 && (
        <div className="text-center py-20">
          <p className="font-body text-white/40 text-lg">
            No artworks found in this category.
          </p>
        </div>
      )}

      {/* Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
