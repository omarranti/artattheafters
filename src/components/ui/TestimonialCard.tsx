"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.blockquote
      className="bg-brand-dark2 border border-brand-gray/20 rounded-xl p-5 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
    >
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 text-brand-pink" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="font-body text-white/70 text-sm leading-relaxed mb-4">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="flex items-center justify-between">
        <div>
          <cite className="font-body text-brand-white text-sm font-semibold not-italic">
            {testimonial.name}
          </cite>
          <span className="font-body text-white/30 text-xs ml-2">
            {testimonial.location}
          </span>
        </div>
        {testimonial.piece && (
          <span className="font-body text-white/20 text-xs">
            {testimonial.piece}
          </span>
        )}
      </footer>
    </motion.blockquote>
  );
}
