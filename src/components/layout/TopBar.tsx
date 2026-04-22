"use client";

const STRIPE_DONATE_URL = "https://buy.stripe.com/7sY7sLcK9dwG52ocQs1VK00";

const tickerItems = [
  "COMMISSION A PIECE",
  "ANY SIZE",
  "ANY BUDGET",
];

const contactLinks = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    label: "DM ON INSTAGRAM",
    href: "https://www.instagram.com/artattheafters/",
    external: true,
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
    label: "STEVIE-ALGER@HOTMAIL.COM",
    href: "mailto:stevie-alger@hotmail.com",
    external: false,
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">V</text>
      </svg>
    ),
    label: "VENMO @STEVIEALGER",
    href: STRIPE_DONATE_URL,
    external: true,
  },
  {
    label: "@STEVIEALGER",
    href: "https://www.instagram.com/steviealger/",
    external: true,
  },
];

export default function TopBar() {
  return (
    <div className="w-full bg-brand-white text-brand-dark border-b border-black/10 z-50 relative">
      <div className="flex items-center justify-between h-8 px-4 overflow-hidden">
        {/* Ticker - left side */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] tracking-widest font-body font-medium text-black/70">+</span>
          {tickerItems.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-[10px] tracking-[2px] font-body font-semibold uppercase text-black/80">
                {item}
              </span>
              {i < tickerItems.length - 1 && (
                <span className="text-[10px] text-black/30">&middot;</span>
              )}
            </span>
          ))}
          <span className="text-[10px] tracking-widest font-body font-medium text-black/70">+</span>
        </div>

        {/* Contact links - right side */}
        <div className="hidden md:flex items-center gap-5">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-1.5 text-[10px] tracking-[1.5px] font-body font-medium uppercase text-black/60 hover:text-black transition-colors"
            >
              {link.icon && <span className="opacity-60">{link.icon}</span>}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
