"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials } from "@/data/testimonials";

export default function OrderTestimonials() {
  // Show 2 on order page — the most relevant to commission experience
  const selected = [testimonials[0], testimonials[3]];

  return (
    <div>
      <ScrollReveal>
        <p className="font-body text-white/40 text-xs uppercase tracking-widest text-center mb-8">
          From Real Collectors
        </p>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
        {selected.map((t, i) => (
          <TestimonialCard key={t.name} testimonial={t} index={i} />
        ))}
      </div>
    </div>
  );
}
