"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/siteConfig";
import Button from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 pointer-events-none">
        <nav
          className={`
            mx-auto max-w-6xl rounded-2xl transition-all duration-500 ease-out pointer-events-auto
            ${
              scrolled
                ? "bg-brand-dark/95 backdrop-blur-md border border-brand-gray/30 shadow-lg"
                : "bg-transparent border border-transparent"
            }
          `}
        >
          <div className="flex h-16 items-center justify-between px-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/icons/concept4_icon_transparent.svg"
                alt="Art at the Afters"
                width={36}
                height={36}
                className="transition-transform duration-300 group-hover:scale-110"
                priority
              />
              <span className="hidden sm:block font-display italic font-bold text-white tracking-wider text-sm uppercase">
                Art at the Afters
              </span>
            </Link>

            {/* Desktop Nav — pill group */}
            <div className="hidden md:flex items-center gap-1 rounded-xl bg-white/[0.04] p-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-[13px] font-body font-medium text-brand-muted uppercase tracking-wider rounded-xl transition-all duration-200 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Instagram */}
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-xl text-brand-muted hover:text-white hover:bg-white/10 transition-all duration-200"
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

              {/* Order Now CTA */}
              <Button href="/order" size="sm">
                Order Now
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2 rounded-xl text-brand-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
