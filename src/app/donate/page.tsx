import type { Metadata } from "next";
import DonateHero from "./donate-hero";

export const metadata: Metadata = {
  title: "Donate - Support the Art",
  description:
    "Support Art at the Afters. Your donation funds new brushes, better paints, and bigger canvases. Keep the dream alive.",
  openGraph: {
    title: "Donate - Art at the Afters",
    description:
      "Support Art at the Afters. Your donation funds new brushes, better paints, and bigger canvases.",
  },
};

export default function DonatePage() {
  return <DonateHero />;
}
