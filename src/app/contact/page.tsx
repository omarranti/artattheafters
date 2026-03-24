import type { Metadata } from "next";
import ContactCards from "@/components/contact/ContactCards";
import ContactForm from "@/components/contact/ContactForm";
import FAQ from "@/components/contact/FAQ";
import ContactCTA from "@/components/contact/ContactCTA";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact & FAQ",
  description:
    "Get in touch with Stevie Alger. Commission custom artwork, ask questions, or just say hey. Find answers to common questions about ordering, pricing, shipping, and more.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,rgba(255,51,153,0.025)_0%,transparent_50%),radial-gradient(ellipse_at_60%_60%,rgba(57,255,51,0.015)_0%,transparent_50%)]" />
        <ScrollReveal>
          <SectionTitle
            eyebrow="Get in Touch"
            title="Let's Talk Art"
            pinkWord="Talk"
            subtitle="Got a question? Want to commission something wild? Just want to say hey? Here's how to reach Stevie."
          />
        </ScrollReveal>
      </section>

      <ContactCards />
      <ContactForm />
      <FAQ />
      <ContactCTA />
    </>
  );
}
