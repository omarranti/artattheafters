"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { toolkitCategories, type ToolkitItem } from "@/data/toolkit";

const easeTransition = { duration: 0.5, ease: "easeOut" as const };

export default function ToolkitBuilder() {
  const [activeCategory, setActiveCategory] = useState(
    toolkitCategories[0].id
  );
  const [selectedItems, setSelectedItems] = useState<Map<string, ToolkitItem>>(
    new Map()
  );

  const toggleItem = useCallback((item: ToolkitItem) => {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.set(item.id, item);
      }
      return next;
    });
  }, []);

  const totalPrice = Array.from(selectedItems.values()).reduce(
    (sum, item) => sum + item.price,
    0
  );

  const currentCategory = toolkitCategories.find(
    (c) => c.id === activeCategory
  )!;

  const itemCount = selectedItems.size;

  return (
    <section className="bg-brand-dark px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Start Creating"
          title="BUILD YOUR PERFECT TOOL KIT"
          subtitle="For your art journey — pick what speaks to you and we'll bundle it up"
          pinkWord="TOOL KIT"
        />

        {/* Category tabs */}
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {toolkitCategories.map((cat) => {
            const isActive = cat.id === activeCategory;
            const hasSelected = cat.items.some((item) =>
              selectedItems.has(item.id)
            );
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-2.5 rounded-full px-6 py-3 font-body text-sm font-medium uppercase tracking-[1.5px] transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-brand-pink text-white"
                    : "border border-brand-gray/40 text-brand-muted hover:border-brand-pink/50 hover:text-brand-white"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                {cat.name}
                {hasSelected && !isActive && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-brand-dark">
                    {cat.items.filter((i) => selectedItems.has(i.id)).length}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Category description */}
        <p className="mt-6 text-center font-body text-sm text-brand-muted">
          {currentCategory.description}
        </p>

        {/* Items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={easeTransition}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {currentCategory.items.map((item, i) => {
              const isSelected = selectedItems.has(item.id);
              return (
                <motion.button
                  key={item.id}
                  onClick={() => toggleItem(item)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...easeTransition, delay: i * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex cursor-pointer flex-col gap-3 rounded-xl border p-6 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-brand-pink bg-brand-pink/10"
                      : "border-brand-gray/20 bg-brand-dark2 hover:border-brand-gray/50"
                  }`}
                >
                  {/* Popular badge */}
                  {item.popular && (
                    <span className="absolute right-4 top-4 rounded-full bg-brand-green/15 px-2.5 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wider text-brand-green">
                      Popular
                    </span>
                  )}

                  {/* Checkmark */}
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-brand-pink bg-brand-pink"
                        : "border-brand-gray/40 group-hover:border-brand-muted"
                    }`}
                  >
                    {isSelected && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    )}
                  </div>

                  {/* Item emoji */}
                  <span className="text-3xl">{item.image}</span>

                  {/* Info */}
                  <div className="flex flex-col gap-1">
                    <h4 className="font-display text-lg text-brand-white">
                      {item.name}
                    </h4>
                    <p className="font-body text-xs leading-relaxed text-brand-muted">
                      {item.description}
                    </p>
                  </div>

                  {/* Price */}
                  <span className="mt-auto font-body text-lg font-semibold text-brand-pink">
                    ${item.price}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Summary bar */}
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={easeTransition}
              className="mt-12 overflow-hidden rounded-2xl border border-brand-gray/20 bg-brand-dark2"
            >
              <div className="flex flex-col items-center gap-6 p-8 sm:flex-row sm:justify-between">
                {/* Left: summary */}
                <div className="flex flex-col gap-1 text-center sm:text-left">
                  <p className="font-body text-xs font-medium uppercase tracking-[3px] text-brand-green">
                    Your Toolkit
                  </p>
                  <p className="font-display text-2xl text-brand-white md:text-3xl">
                    {itemCount} {itemCount === 1 ? "item" : "items"}{" "}
                    <span className="text-brand-muted">—</span>{" "}
                    <span className="text-brand-pink">${totalPrice}</span>
                  </p>
                  <div className="mt-1 flex flex-wrap justify-center gap-1.5 sm:justify-start">
                    {Array.from(selectedItems.values()).map((item) => (
                      <span
                        key={item.id}
                        className="rounded-full bg-brand-gray/30 px-2.5 py-0.5 font-body text-[11px] text-brand-muted"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="flex shrink-0 flex-col items-center gap-3 sm:items-end">
                  <Button href="/order" variant="primary" size="md">
                    Get This Kit
                  </Button>
                  <button
                    onClick={() => setSelectedItems(new Map())}
                    className="font-body text-xs text-brand-muted underline underline-offset-2 hover:text-brand-white transition-colors cursor-pointer"
                  >
                    Clear selections
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
