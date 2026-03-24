"use client";

import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const allCategories = ["all", ...categories];

  return (
    <div className="bg-brand-dark2 border border-brand-gray/20 rounded-xl p-2 mx-4 sm:mx-0">
      <div className="w-full overflow-x-auto scrollbar-hide">
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className="flex gap-1.5 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
          {allCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`relative rounded-xl px-5 py-2.5 text-sm font-body uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                  isActive
                    ? "text-brand-pink"
                    : "text-brand-muted hover:bg-white/[0.08]"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                layout
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-brand-pink/10 border border-brand-pink/20"
                    layoutId="activeCategory"
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                )}
                <span className="relative z-10">
                  {category === "all"
                    ? "All"
                    : category
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
