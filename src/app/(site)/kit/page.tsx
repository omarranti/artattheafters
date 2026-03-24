import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PaintKitQuiz from "@/components/kit/PaintKitQuiz";

export const metadata: Metadata = {
  title: "Paint Kit Builder",
  description:
    "Find your perfect paint kit. Take our 7-question quiz and get a personalized recommendation for brushes, paints, canvas, easel, and more — curated by Stevie Alger.",
};

export default function KitPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(91,255,160,0.03)_0%,transparent_50%),radial-gradient(ellipse_at_70%_70%,rgba(255,68,170,0.025)_0%,transparent_50%)]" />
        <ScrollReveal>
          <SectionTitle
            eyebrow="Free Tool"
            title="Paint Kit Builder"
            pinkWord="Kit"
            subtitle="7 quick questions. We'll build you a personalized kit — exactly the right brushes, paints, canvas, easel, and more for how you paint."
          />
        </ScrollReveal>
      </section>

      {/* Quiz */}
      <section className="pb-32 px-6">
        <div className="mx-auto max-w-2xl">
          <ScrollReveal delay={0.15}>
            <PaintKitQuiz />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
