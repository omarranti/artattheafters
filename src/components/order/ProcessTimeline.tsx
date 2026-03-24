"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function LightbulbIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
      />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}

const steps: Step[] = [
  {
    number: 1,
    title: "Submit Your Idea",
    description: "Tell us what you want painted",
    icon: <LightbulbIcon />,
  },
  {
    number: 2,
    title: "Stevie Confirms",
    description: "Details & price confirmed",
    icon: <CheckIcon />,
  },
  {
    number: 3,
    title: "Payment",
    description: "Pay via Venmo or PayPal",
    icon: <DollarIcon />,
  },
  {
    number: 4,
    title: "Art Ships to You",
    description: "Custom painted & delivered",
    icon: <PackageIcon />,
  },
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-16 md:py-24">
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-5xl text-brand-white text-center mb-4">
          How It Works
        </h2>
        <p className="font-body text-white/50 text-center max-w-lg mx-auto mb-16">
          From idea to your wall in four simple steps.
        </p>
      </ScrollReveal>

      <div ref={containerRef}>
        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-16">
          {/* Background line */}
          <div className="absolute left-[26px] top-0 bottom-0 w-px bg-white/10" />
          {/* Animated line */}
          <motion.div
            className="absolute left-[26px] top-0 w-px bg-brand-pink"
            style={{ height: lineHeight }}
          />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.12}>
                <div className="relative">
                  {/* Number circle */}
                  <div className="absolute -left-16 top-0 w-12 h-12 rounded-full bg-brand-pink/10 border border-brand-pink/30 flex items-center justify-center text-brand-pink font-display text-lg font-bold z-10">
                    {step.number}
                  </div>
                  {/* Content */}
                  <div className="bg-brand-dark2 border border-brand-gray/20 rounded-xl p-5">
                    <div className="text-brand-pink mb-2">{step.icon}</div>
                    <h3 className="font-display text-xl text-brand-white mb-1">
                      {step.title}
                    </h3>
                    <p className="font-body text-white/50 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          {/* Background line */}
          <div className="absolute top-[26px] left-0 right-0 h-px bg-white/10" />
          {/* Animated line */}
          <motion.div
            className="absolute top-[26px] left-0 h-px bg-brand-pink"
            style={{ width: lineWidth }}
          />

          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center">
                  {/* Number circle */}
                  <div className="w-[52px] h-[52px] rounded-full bg-brand-pink/10 border border-brand-pink/30 flex items-center justify-center text-brand-pink font-display text-lg font-bold mb-6 z-10 relative">
                    {step.number}
                  </div>
                  {/* Card */}
                  <div className="bg-brand-dark2 border border-brand-gray/20 rounded-xl p-5 w-full">
                    <div className="text-brand-pink mb-3 flex justify-center">{step.icon}</div>
                    <h3 className="font-display text-xl text-brand-white mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-white/50 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
