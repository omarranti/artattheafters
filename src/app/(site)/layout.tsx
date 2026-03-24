import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingCTA from "@/components/ui/FloatingCTA";
import { WebsiteJsonLd } from "@/components/seo/JsonLd";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <WebsiteJsonLd />
      <Header />
      <main>{children}</main>
      <FloatingCTA />
      <Footer />
    </>
  );
}
