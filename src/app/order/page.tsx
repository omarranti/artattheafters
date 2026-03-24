import type { Metadata } from "next";
import SizeGuide from "@/components/order/SizeGuide";
import CommissionForm from "@/components/order/CommissionForm";
import ProcessTimeline from "@/components/order/ProcessTimeline";
import ShippingInfo from "@/components/order/ShippingInfo";
import OrderTestimonials from "@/components/order/OrderTestimonials";

export const metadata: Metadata = {
  title: 'Order Custom Art',
  description: 'Commission a one-of-a-kind custom painting by Stevie Alger. Choose your canvas size, describe your vision, and get a hand-painted original delivered to your door. Starting at $50.',
  openGraph: {
    title: 'Order Custom Art — Art at the Afters',
    description: 'Commission your own custom painting. Starting at $50. Shipped worldwide.',
    images: ['/gallery/artwork/elmo-fire.jpg'],
  },
};

export default function OrderPage() {
  return (
    <>
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
      <section className="py-16 md:py-20 px-6">
        <SizeGuide />
      </section>

      {/* Commission Form */}
      <section className="py-16 md:py-20 px-6">
        <CommissionForm />
      </section>

      {/* Testimonials near form */}
      <section className="py-16 md:py-20 px-6">
        <OrderTestimonials />
      </section>

      {/* Process Timeline */}
      <section className="py-16 md:py-20 px-6">
        <ProcessTimeline />
      </section>

      {/* Shipping & Packaging */}
      <section className="py-16 md:py-20 px-6">
        <ShippingInfo />
      </section>
    </>
  );
}
