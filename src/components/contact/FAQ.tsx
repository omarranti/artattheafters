"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const FAQ_DATA = [
  {
    category: "Ordering",
    items: [
      {
        q: "How do I order a custom piece?",
        a: "DM Stevie on Instagram @artattheafters or use the \"Build Your Piece\" tool on this site. Tell her what you want — literally anything — pick your size, and she'll make it happen. It's that simple.",
      },
      {
        q: "How much does a painting cost?",
        a: "Prices start at $50 for a 5×7 and go up based on canvas size. A 26×32 starts at $600. Every piece is custom, so the final price depends on the size, complexity, and any add-ons you choose. DM Stevie for an exact quote.",
      },
      {
        q: "What sizes are available?",
        a: "5×7 (Mini), 8×10 (Classic), 9×12, 11×14, 16×20 (Statement), 26×32 (Grand), and fully custom sizes. If you need something specific, just ask — Stevie can work with any dimensions.",
      },
      {
        q: "Can I really request anything?",
        a: "Yes. A bull eating Adderall. SpongeBob doing yoga. Your cat as a renaissance painting. Your favorite album cover. A flaming 8-ball. Your dog in a tuxedo. If you can describe it, Stevie can paint it.",
      },
      {
        q: "Do you show prices on the artwork?",
        a: "No — every piece is unique and priced based on size and complexity. DM Stevie or use the Build Your Piece tool to get a quote. No pressure, no commitment.",
      },
    ],
  },
  {
    category: "The Art",
    items: [
      {
        q: "What mediums does Stevie use?",
        a: "Primarily acrylic on canvas. Some pieces include mixed media elements. Add-ons like gold leaf, glow-in-the-dark paint, and heavy texture/impasto are available for an extra charge.",
      },
      {
        q: "How long does a painting take?",
        a: "Typically 1–2 weeks depending on the queue. Need it faster? Add the Rush Order option and Stevie will paint it within 72 hours.",
      },
      {
        q: "Is every piece really one of a kind?",
        a: "100%. Every single painting is custom made for the person who orders it. Stevie never paints the same thing twice. Even if you request a similar subject to a previous piece, it'll be completely unique.",
      },
      {
        q: "Can I send reference photos or inspo?",
        a: "Absolutely — that's encouraged. Upload them through the Build Your Piece tool, DM them on Instagram, or send them however works for you. The more Stevie knows about what you want, the better.",
      },
    ],
  },
  {
    category: "Shipping & Payment",
    items: [
      {
        q: "How do I pay?",
        a: "Venmo (@steviealger) is the primary payment method. PayPal is also accepted. DM Stevie to arrange payment — she'll send you a request once your piece details are confirmed.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes! Art at the Afters has shipped to 5 countries and 17 cities worldwide. Shipping costs vary by location and canvas size. Stevie will give you a shipping quote when you order.",
      },
      {
        q: "How is the artwork shipped?",
        a: "Every piece is carefully wrapped and protected for shipping. Larger canvases are boxed with corner protectors. Stevie takes packaging seriously — your art arrives safe.",
      },
      {
        q: "Can I pick up locally in LA?",
        a: "If you're in Los Angeles, local pickup can be arranged. DM Stevie to coordinate — saves on shipping and you might get to see the studio.",
      },
    ],
  },
  {
    category: "Support the Art",
    items: [
      {
        q: "What does my donation go toward?",
        a: "Every dollar goes directly to art supplies — new brushes, better quality paints, and bigger canvases. You're literally fueling the art. $30 covers a solid supply restock.",
      },
      {
        q: "Can I commission a piece as a gift?",
        a: "Yes! A lot of Stevie's pieces are gifts. Just tell her who it's for and any details that would make it personal. She can even include a handwritten note with the piece.",
      },
    ],
  },
];

function FAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-brand-gray/25 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 bg-transparent border-none flex justify-between items-center cursor-pointer gap-4 text-left"
      >
        <span
          className={`text-base font-medium font-body leading-snug transition-colors duration-300 ${
            open ? "text-brand-white" : "text-brand-muted"
          }`}
        >
          {item.q}
        </span>
        <span
          className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
            open
              ? "border-brand-pink bg-brand-pink/8"
              : "border-brand-gray2 bg-transparent"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            <path
              d="M7 1v12M1 7h12"
              stroke={open ? "#FF3399" : "#777"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        className={`transition-all duration-400 ease-out overflow-hidden ${
          open ? "max-h-[300px] opacity-100 pb-5" : "max-h-0 opacity-0 pb-0"
        }`}
      >
        <p className="text-sm text-brand-muted leading-[1.8] font-light font-body m-0 pr-12">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <ScrollReveal>
      <section className="px-6 pt-5 pb-24">
        <div className="mx-auto max-w-[700px]">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[4px] uppercase text-brand-green font-medium mb-3">
              Questions?
            </p>
            <h2 className="font-display text-[clamp(28px,5vw,40px)] font-bold mb-3 leading-tight">
              Everything You<br />Need to{" "}
              <span className="text-brand-pink italic">Know</span>
            </h2>
            <p className="text-brand-muted text-[15px] max-w-[440px] mx-auto leading-relaxed font-light">
              If your question isn&apos;t here, DM Stevie. She&apos;s a real person and she actually responds.
            </p>
          </div>

          {FAQ_DATA.map((cat, ci) => (
            <div key={ci} className="mb-10">
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    ci % 2 === 0 ? "bg-brand-pink" : "bg-brand-green"
                  }`}
                />
                <h3
                  className={`text-[13px] font-semibold tracking-[2px] uppercase font-body ${
                    ci % 2 === 0 ? "text-brand-pink" : "text-brand-green"
                  }`}
                >
                  {cat.category}
                </h3>
              </div>
              <div className="bg-brand-dark2 rounded-2xl px-6 py-1 border border-brand-gray/15">
                {cat.items.map((item, i) => (
                  <FAQItem key={i} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
