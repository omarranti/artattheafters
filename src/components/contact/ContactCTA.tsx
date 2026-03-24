"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactCTA() {
  return (
    <ScrollReveal>
      <section className="px-6 py-16 border-t border-brand-gray/15 text-center">
        <div className="mx-auto max-w-[500px]">
          <p className="text-[28px] mb-4">🎨</p>
          <h3 className="font-display text-[28px] font-bold mb-3">
            Ready to get <span className="text-brand-pink italic">started?</span>
          </h3>
          <p className="text-brand-muted text-[15px] mb-8 leading-relaxed font-light">
            Tell Stevie your wildest idea. She&apos;ll turn it into something you&apos;ll stare at every day.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/visualize"
              className="px-10 py-4 bg-brand-pink text-brand-white rounded-full text-sm font-semibold tracking-[1.5px] uppercase transition-all duration-300 hover:shadow-[0_4px_20px_rgba(255,51,153,0.2)]"
            >
              Build Your Piece
            </Link>
            <a
              href="https://www.instagram.com/artattheafters/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-transparent border-[1.5px] border-brand-gray2 text-brand-white rounded-full text-sm font-medium tracking-wider transition-all duration-300 hover:border-brand-green hover:text-brand-green"
            >
              DM on Instagram
            </a>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
