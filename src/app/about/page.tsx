"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

const stats = [
  { label: "Paintings", value: "75+" },
  { label: "Countries", value: "5" },
  { label: "Cities", value: "17" },
  { label: "Starting Price", value: "$50" },
];

const socialProofImages = [
  "/photos/social-proof/dm-requests-grid-1.jpg",
  "/photos/social-proof/dm-requests-grid-2.jpg",
  "/photos/social-proof/dm-convinced.png",
  "/photos/social-proof/dm-byron-bay.png",
  "/photos/social-proof/nostalgia-series-dm.png",
  "/photos/social-proof/story-responses.png",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 text-center">
        <ScrollReveal>
          <h1 className="text-7xl md:text-9xl tracking-tight text-white font-display">
            MEET THE ARTIST
          </h1>
        </ScrollReveal>
      </section>

      {/* Artist Photo + Intro */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-brand-dark2 border border-brand-gray/20">
              <Image
                src="/photos/stevie/stevie-painting-night.jpg"
                alt="Stevie painting at night"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="space-y-6">
              <div className="rounded-xl bg-brand-dark2 border border-brand-gray/20 p-8 md:p-10">
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  It all started in LA. I live about two minutes from the bar, and one
                  night after the party wound down, people ended up at my place. I had
                  some canvases and paint lying around, so I just started painting.
                </p>
              </div>
              <div className="rounded-xl bg-brand-dark2 border border-brand-gray/20 p-8 md:p-10">
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  People were watching, vibing, music still going. Someone asked if
                  they could buy one. As a joke I said $50... they all sold
                  immediately. Every single one. That night changed everything.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Pull Quote */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <ScrollReveal>
          <div className="inline-block w-full px-8 py-6 rounded-full bg-brand-dark2 border border-brand-gray/20 text-center">
            <p className="text-2xl md:text-3xl text-brand-pink italic font-display">
              &ldquo;Care free, confident and creative.&rdquo;
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Story Continued */}
      <section className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <ScrollReveal>
          <div className="rounded-xl bg-brand-dark2 border border-brand-gray/20 p-8 md:p-10">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              What started as $50 afterparty paintings grew into something real.
              Pieces started going for $200, $500, then $900. Not because I
              changed what I was doing -- I just kept painting what I felt. People
              connected with that.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-xl bg-brand-dark2 border border-brand-gray/20 p-8 md:p-10">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              75+ paintings later, my work has ended up in 5 countries and 17
              cities. Every single one is custom. Every single one tells a story.
              And it all started at the afters.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="inline-block w-full px-8 py-6 rounded-full bg-brand-dark2 border border-brand-gray/20 text-center">
            <p className="text-2xl md:text-3xl text-brand-green italic font-display">
              &ldquo;I just paint, I don&apos;t care what someone thinks.
              It&apos;s art to someone.&rdquo;
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="rounded-xl bg-brand-dark2 border border-brand-gray/20 p-6">
                <p className="text-5xl md:text-6xl text-brand-green font-display">
                  {stat.value}
                </p>
                <p className="mt-2 text-brand-muted text-sm uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* The Vibe — Studio Photos */}
      <section className="py-20 px-6">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl text-white text-center mb-12 font-display">
            THE VIBE
          </h2>
        </ScrollReveal>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              src: "/photos/studio/studio-supplies.jpg",
              alt: "Studio supplies",
            },
            {
              src: "/photos/studio/studio-process.jpg",
              alt: "Painting process",
            },
            {
              src: "/photos/studio/fell-asleep-painting.jpg",
              alt: "Fell asleep painting",
            },
            {
              src: "/photos/stevie/stevie-painting-night.jpg",
              alt: "Stevie painting at night",
            },
            {
              src: "/photos/studio/studio-supplies.jpg",
              alt: "Studio detail",
            },
            {
              src: "/photos/studio/studio-process.jpg",
              alt: "Process detail",
            },
          ].map((photo, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="aspect-square rounded-xl overflow-hidden bg-brand-dark2 border border-brand-gray/20 relative">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl text-white text-center mb-4 font-display">
            THE PEOPLE SPEAK
          </h2>
          <p className="text-center text-brand-muted mb-12">
            Real DMs. Real requests. Real love.
          </p>
        </ScrollReveal>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {socialProofImages.map((src, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="rounded-xl overflow-hidden bg-brand-dark2 border border-brand-gray/20 relative aspect-[3/4]">
                <Image
                  src={src}
                  alt={`Social proof ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center rounded-xl bg-brand-dark2 border border-brand-gray/20 p-10 md:p-14">
            <h2 className="text-4xl md:text-5xl text-white mb-4 font-display">
              Want a piece of the afters?
            </h2>
            <p className="text-brand-muted mb-8">
              Every painting is custom. Tell Stevie what you want.
            </p>
            <Button href="/order">Commission a Painting &rarr;</Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
