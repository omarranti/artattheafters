"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials } from "@/data/testimonials";

export default function HomeTestimonials() {
  // Show 3 on homepage
  const featured = testimonials.slice(0, 3);

  return (
    <section className="py-16 md:py-24 px-6">
      <ScrollReveal>
        <p className="font-body text-white/40 text-xs uppercase tracking-widest text-center mb-4">
          What Collectors Say
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-brand-white text-center mb-12">
          Walls That Tell Stories
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
        {featured.map((t, i) => (
          <TestimonialCard key={t.name} testimonial={t} index={i} />
        ))}
      </div>
    </section>
  );
}
