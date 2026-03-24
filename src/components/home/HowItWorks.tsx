"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const steps = [
  {
    number: "01",
    icon: "\uD83D\uDCAC",
    title: "Tell me what you want",
    description:
      "Send me your idea -- a character, a vibe, a memory. Anything goes. We'll talk details, size, and colors until we're locked in.",
  },
  {
    number: "02",
    icon: "\uD83C\uDFA8",
    title: "I paint it",
    description:
      "I get to work bringing your vision to life on canvas. You'll get progress updates so you can see it come together in real time.",
  },
  {
    number: "03",
    icon: "\uD83D\uDCE6",
    title: "It ships to your door",
    description:
      "Once it's done and sealed, your one-of-a-kind piece gets carefully packed and shipped straight to you, wherever you are.",
  },
];

const easeTransition = {
  duration: 0.8,
  ease: "easeOut" as const,
};

export default function HowItWorks() {
  return (
    <section className="bg-brand-dark2 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="GET YOUR OWN"
          subtitle="Three simple steps to a custom piece"
        />

        <div className="relative mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {/* Decorative connecting line on desktop */}
          <div className="pointer-events-none absolute left-0 right-0 top-[72px] hidden md:block">
            <div className="mx-auto h-[2px] w-[60%] bg-brand-gray/20 rounded-full opacity-30" />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...easeTransition, delay: i * 0.15 }}
            >
              <div className="bg-brand-dark2 border border-brand-gray/20 rounded-xl flex h-full flex-col items-center gap-5 p-8 text-center">
                {/* Step number */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink/10 border border-brand-pink/30">
                  <span className="font-display text-2xl text-brand-pink">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <span className="text-4xl">{step.icon}</span>

                {/* Title */}
                <h3 className="font-display text-xl uppercase text-white md:text-2xl">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm leading-relaxed text-brand-muted">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button href="/order" variant="primary" size="lg">
            Start Your Custom Piece
          </Button>
        </div>
      </div>
    </section>
  );
}
