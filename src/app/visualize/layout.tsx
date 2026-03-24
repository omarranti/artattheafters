import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visualize Your Piece — Art at the Afters",
  description:
    "Build your custom artwork step by step. Choose your canvas size, mood, and extras — then see a live preview before commissioning.",
  openGraph: {
    title: "Visualize Your Piece — Art at the Afters",
    description:
      "Build your custom artwork step by step. Choose size, mood, and extras.",
  },
};

export default function VisualizeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
