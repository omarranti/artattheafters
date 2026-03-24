import Hero from "@/components/home/Hero";
import StorySection from "@/components/home/StorySection";
import FeaturedGallery from "@/components/home/FeaturedGallery";
import HowItWorks from "@/components/home/HowItWorks";
import SoldMarquee from "@/components/home/SoldMarquee";
import InstagramFeed from "@/components/home/InstagramFeed";
import DonateSection from "@/components/home/DonateSection";
import EmailCapture from "@/components/ui/EmailCapture";
import HomeTestimonials from "@/components/home/HomeTestimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StorySection />
      <FeaturedGallery />
      <HomeTestimonials />
      <HowItWorks />
      <SoldMarquee />
      <InstagramFeed />
      <EmailCapture />
      <DonateSection />
    </>
  );
}
