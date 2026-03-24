"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const details = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Careful Packaging",
    desc: "Every painting is wrapped in glassine paper, foam-cornered, and secured in a custom-fit box. No bubble wrap touching the paint surface — ever.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Insured Shipping",
    desc: "All shipments are fully insured for the value of the artwork. USPS Priority or UPS depending on size. US domestic shipping included on orders over $150.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Timeline",
    desc: "Custom commissions take 1–2 weeks from deposit to delivery. Rush orders (72 hours) available. You'll get progress photos along the way.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
      </svg>
    ),
    title: "Satisfaction Guarantee",
    desc: "If your commission doesn't match what we agreed on, Stevie will make it right — revisions or full refund. For finished available works, returns accepted within 14 days.",
  },
];

export default function ShippingInfo() {
  return (
    <section className="py-16 md:py-24">
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-5xl text-brand-white text-center mb-4">
          Shipping & Packaging
        </h2>
        <p className="font-body text-white/50 text-center max-w-lg mx-auto mb-12">
          Your art is treated like the one-of-a-kind piece it is — from studio to your wall.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
        {details.map((d, i) => (
          <ScrollReveal key={d.title} delay={i * 0.1}>
            <div className="bg-brand-dark2 border border-brand-gray/20 rounded-xl p-5 h-full">
              <div className="text-brand-green mb-3">{d.icon}</div>
              <h3 className="font-display text-lg text-brand-white mb-2">{d.title}</h3>
              <p className="font-body text-white/50 text-sm leading-relaxed">{d.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
