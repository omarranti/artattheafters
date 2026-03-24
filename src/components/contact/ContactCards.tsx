"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const cards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    title: "Instagram",
    value: "@artattheafters",
    link: "https://www.instagram.com/artattheafters/",
    linkLabel: "DM Stevie",
    color: "pink" as const,
  },
  {
    icon: <span className="text-xl font-extrabold font-body text-brand-green">V</span>,
    title: "Venmo",
    value: "@steviealger",
    link: "https://venmo.com/u/Steviealger",
    linkLabel: "Send Payment",
    color: "green" as const,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
    title: "Email",
    value: "DM for email address",
    link: "https://www.instagram.com/artattheafters/",
    linkLabel: "Reach Out",
    color: "pink" as const,
  },
  {
    icon: <span className="text-xl">🎨</span>,
    title: "Commission",
    value: "Build your custom piece",
    link: "/visualize",
    linkLabel: "Start Building",
    color: "green" as const,
  },
];

function ContactCard({
  icon,
  title,
  value,
  link,
  linkLabel,
  color,
}: (typeof cards)[number]) {
  const isPink = color === "pink";

  return (
    <a
      href={link}
      target={link.startsWith("http") ? "_blank" : undefined}
      rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`
        group flex flex-col items-center text-center p-9 pb-8
        bg-brand-dark2 rounded-2xl border transition-all duration-300
        ${isPink
          ? "border-brand-gray/20 hover:border-brand-pink/30"
          : "border-brand-gray/20 hover:border-brand-green/30"
        }
        hover:-translate-y-1 hover:shadow-lg
      `}
    >
      <div
        className={`
          w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4
          transition-transform duration-300 group-hover:scale-110
          ${isPink
            ? "bg-brand-pink/8 border border-brand-pink/20 text-brand-pink"
            : "bg-brand-green/8 border border-brand-green/20 text-brand-green"
          }
        `}
      >
        {icon}
      </div>
      <div className="text-base font-semibold text-brand-white mb-1 font-body">{title}</div>
      <div className="text-[13px] text-brand-muted font-light font-body mb-3">{value}</div>
      <span
        className={`
          text-xs font-semibold tracking-[1.5px] uppercase font-body
          ${isPink ? "text-brand-pink" : "text-brand-green"}
        `}
      >
        {linkLabel}
      </span>
    </a>
  );
}

export default function ContactCards() {
  return (
    <ScrollReveal>
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-[900px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <ContactCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
