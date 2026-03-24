import Hero from "@/components/home/Hero";
import StorySection from "@/components/home/StorySection";
import FeaturedGallery from "@/components/home/FeaturedGallery";
import HowItWorks from "@/components/home/HowItWorks";
import ToolkitBuilder from "@/components/home/ToolkitBuilder";
import SoldMarquee from "@/components/home/SoldMarquee";
import InstagramFeed from "@/components/home/InstagramFeed";
import DonateSection from "@/components/home/DonateSection";
import EmailCapture from "@/components/ui/EmailCapture";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const BASE_URL = 'https://artattheafters.vercel.app';

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', url: BASE_URL }]} />
      <Hero />
      <StorySection />
      <FeaturedGallery />
      <HomeTestimonials />
      <HowItWorks />
      <ToolkitBuilder />
      <SoldMarquee />
      <InstagramFeed />
      <EmailCapture />
      <DonateSection />
    </>
  );
}
