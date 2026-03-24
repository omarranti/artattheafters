import type { Metadata } from "next";
import SizeGuide from "@/components/order/SizeGuide";
import CommissionForm from "@/components/order/CommissionForm";
import ProcessTimeline from "@/components/order/ProcessTimeline";
import ShippingInfo from "@/components/order/ShippingInfo";
import OrderTestimonials from "@/components/order/OrderTestimonials";
import { CommissionServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const BASE_URL = 'https://artattheafters.vercel.app';

export const metadata: Metadata = {
  title: 'Order Custom Painting — Commission Hand-Painted Artwork from $50',
  description: 'Commission a one-of-a-kind custom painting by LA artist Stevie Alger. Choose your canvas size (9×12 to 40×50), describe your vision, and get a hand-painted original delivered worldwide. Starting at $50. Pop culture, anime, abstract, portraits — anything you can imagine.',
  keywords: ['commission art', 'custom painting order', 'buy custom art', 'art commission', 'custom canvas painting', 'order painting online', 'personalized art', 'custom art gift', 'affordable art commission'],
  openGraph: {
    title: 'Order Custom Painting — Art at the Afters | From $50',
    description: 'Commission your own custom hand-painted artwork. 7 sizes from $50-$600. Shipped worldwide. 75+ happy collectors.',
    url: `${BASE_URL}/order`,
    images: [
      {
        url: '/gallery/artwork/elmo-fire.jpg',
        width: 1200,
        height: 630,
        alt: 'Order custom artwork from Art at the Afters — Elmo On Fire painting by Stevie Alger',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Order Custom Painting — Art at the Afters',
    description: 'Commission your own custom painting. Starting at $50. Shipped worldwide.',
    images: ['/gallery/artwork/elmo-fire.jpg'],
  },
  alternates: {
    canonical: `${BASE_URL}/order`,
  },
};

export default function OrderPage() {
  return (
    <>
      <CommissionServiceJsonLd />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: BASE_URL },
        { name: 'Order Custom Art', url: `${BASE_URL}/order` },
      ]} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 text-center">
        <h1 className="text-7xl md:text-9xl tracking-tight text-white font-display">
          ORDER YOUR PIECE
        </h1>
        <div className="mt-6 inline-block px-6 py-3 rounded-full bg-brand-dark2 border border-brand-gray/20">
          <p className="text-lg md:text-xl text-brand-muted">
            Every painting is 100% custom. Tell me what you want and I&apos;ll
            make it happen.
          </p>
        </div>
      </section>

      {/* Size Guide */}
      <section className="py-16 md:py-20 px-6" aria-label="Canvas size and pricing guide">
        <SizeGuide />
      </section>

      {/* Commission Form */}
      <section className="py-16 md:py-20 px-6" aria-label="Commission request form">
        <CommissionForm />
      </section>

      {/* Testimonials near form */}
      <section className="py-16 md:py-20 px-6" aria-label="Customer testimonials">
        <OrderTestimonials />
      </section>

      {/* Process Timeline */}
      <section className="py-16 md:py-20 px-6" aria-label="Commission process timeline">
        <ProcessTimeline />
      </section>

      {/* Shipping & Packaging */}
      <section className="py-16 md:py-20 px-6" aria-label="Shipping and packaging information">
        <ShippingInfo />
      </section>
    </>
  );
}
