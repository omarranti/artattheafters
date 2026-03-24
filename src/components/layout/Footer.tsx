"use client";

import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-brand-dark2 border-t border-brand-gray/20">
      <div className="mx-auto max-w-5xl px-6 py-20">
        {/* Top: Stacked logo + tagline */}
        <div className="flex flex-col items-center gap-6 mb-16">
          <Link href="/" className="group">
            <Image
              src="/icons/concept4_stacked_dark.svg"
              alt="Art at the Afters"
              width={140}
              height={100}
              className="opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
          <p className="font-body text-sm text-brand-muted text-center max-w-md leading-relaxed">
            {siteConfig.description}
          </p>
        </div>

        {/* Middle: Nav links */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-5 py-2.5 rounded-xl bg-brand-dark border border-brand-gray/20 text-sm font-body text-brand-muted uppercase tracking-wider hover:bg-white/[0.08] hover:text-white transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-dark border border-brand-gray/20 text-brand-muted hover:text-white hover:bg-white/[0.08] transition-all duration-200"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          <a
            href={siteConfig.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-dark border border-brand-gray/20 text-brand-muted hover:text-white hover:bg-white/[0.08] transition-all duration-200"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.24 8.24 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.12z" />
            </svg>
          </a>

          <a
            href={siteConfig.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-dark border border-brand-gray/20 text-brand-muted hover:text-white hover:bg-white/[0.08] transition-all duration-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        {/* Payment info */}
        <p className="text-center font-body text-xs text-brand-muted/50 mb-10">
          Venmo {siteConfig.payment.venmo} &middot; CashApp {siteConfig.payment.cashapp} &middot; Zelle {siteConfig.payment.zelle}
        </p>

        {/* Quote */}
        <p className="text-center font-display italic text-brand-pink text-sm mb-8">
          Follow us on social cause why not.
        </p>

        {/* Divider */}
        <div className="border-t border-brand-gray/20 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-brand-muted/40 font-body">
            <span>&copy; {new Date().getFullYear()} Art at the Afters</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>by Stevie Alger</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
