import type { Metadata } from "next";

const BASE_URL = 'https://artattheafters.vercel.app';

export const metadata: Metadata = {
  title: 'Visualize Your Custom Painting — Interactive Commission Builder',
  description: 'Build your custom artwork step by step with our interactive visualizer. Choose your canvas size, mood, colors, and extras — then see a live preview before commissioning your painting from Stevie Alger.',
  keywords: ['art visualizer', 'custom painting builder', 'commission preview', 'art configurator', 'custom art tool', 'painting preview'],
  openGraph: {
    title: 'Visualize Your Custom Painting — Art at the Afters',
    description: 'Interactive tool to build and preview your custom artwork commission. Choose size, mood, and extras before ordering.',
    url: `${BASE_URL}/visualize`,
    images: [
      {
        url: '/gallery/artwork/stevie-face-portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Art at the Afters — Interactive commission visualizer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visualize Your Custom Painting — Art at the Afters',
    description: 'Build your custom artwork step by step. Choose size, mood, and extras.',
    images: ['/gallery/artwork/stevie-face-portrait.jpg'],
  },
  alternates: {
    canonical: `${BASE_URL}/visualize`,
  },
};

export default function VisualizeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
