import type { Artwork } from "@/types";

export const artworks: Artwork[] = [
  // ── REAL IMAGES ──────────────────────────────────────────────────────
  {
    id: "1",
    title: "Red Roses Abstract",
    slug: "red-roses-abstract",
    description: "Large red abstract roses painting",
    size: "26×32",
    medium: "Acrylic on Canvas",
    status: "available",
    category: "abstract,originals",
    image: "/gallery/artwork/red-roses-abstract.jpg",
    featured: true,
    soldTo: null,
    dateCreated: "2025-12-08",
    price: 500,
  },
  {
    id: "2",
    title: "Psychedelic Dreams",
    slug: "psychedelic-dreams",
    description: "Colorful abstract psychedelic piece",
    size: "16×20",
    medium: "Acrylic on Canvas",
    status: "sold",
    category: "abstract,originals",
    image: "/gallery/artwork/stevie-abstract-colorful.jpg",
    featured: true,
    soldTo: "Byron Bay, Australia",
    dateCreated: "2025-12-10",
    price: 350,
  },
  {
    id: "3",
    title: "The Face",
    slug: "the-face",
    description: "Vibrant colorful face portrait",
    size: "26×32",
    medium: "Acrylic on Canvas",
    status: "sold",
    category: "abstract,originals,pop-culture",
    image: "/gallery/artwork/stevie-face-portrait.jpg",
    featured: true,
    soldTo: "Venice, USA",
    dateCreated: "2025-12-12",
    price: 500,
  },
  {
    id: "4",
    title: "Elmo On Fire",
    slug: "elmo-on-fire",
    description: "Elmo character engulfed in flames",
    size: "9×12",
    medium: "Acrylic on Canvas",
    status: "sold",
    category: "characters,pop-culture",
    image: "/gallery/artwork/elmo-fire.jpg",
    featured: true,
    soldTo: "Los Angeles, USA",
    dateCreated: "2025-12-15",
    price: 100,
  },
  {
    id: "5",
    title: "The Dunk",
    slug: "the-dunk",
    description: "Basketball player in action, blue background",
    size: "11×14",
    medium: "Acrylic on Canvas",
    status: "available",
    category: "pop-culture,originals",
    image: "/gallery/artwork/basketball-player.jpg",
    featured: true,
    soldTo: null,
    dateCreated: "2025-12-18",
    price: 150,
  },
  {
    id: "6",
    title: "Green Creature",
    slug: "green-creature",
    description: "Bear/creature on green background",
    size: "11×14",
    medium: "Acrylic on Canvas",
    status: "available",
    category: "characters,originals",
    image: "/gallery/artwork/green-creature.jpg",
    featured: false,
    soldTo: null,
    dateCreated: "2025-12-20",
    price: 150,
  },
  {
    id: "7",
    title: "Red Roses II",
    slug: "red-roses-ii",
    description: "The roses painting outdoor shot",
    size: "26×32",
    medium: "Acrylic on Canvas",
    status: "available",
    category: "abstract,originals",
    image: "/gallery/artwork/red-roses-outdoor.jpg",
    featured: false,
    soldTo: null,
    dateCreated: "2025-12-22",
    price: 500,
  },

  // ── PLACEHOLDERS — real pieces, photos coming soon ───────────────────
  {
    id: "8",
    title: "Bikini Bottom After Dark",
    slug: "bikini-bottom-after-dark",
    description: "SpongeBob cast afterparty",
    size: "11×14",
    medium: "Acrylic on Canvas",
    status: "sold",
    category: "characters,pop-culture",
    image: "/gallery/placeholder-1.jpg",
    featured: true,
    soldTo: "Los Angeles, USA",
    dateCreated: "2025-12-05",
    price: 150,
  },
  {
    id: "9",
    title: "Goku Going Super Saiyan",
    slug: "goku-going-super-saiyan",
    description: "DBZ purple bg",
    size: "9×12",
    medium: "Acrylic on Canvas",
    status: "available",
    category: "anime",
    image: "/gallery/placeholder-2.jpg",
    featured: true,
    soldTo: null,
    dateCreated: "2025-12-28",
    price: 100,
  },
  {
    id: "10",
    title: "Rick's Portal Night",
    slug: "ricks-portal-night",
    description: "Rick & Morty portal",
    size: "16×20",
    medium: "Acrylic on Canvas",
    status: "sold",
    category: "characters,pop-culture",
    image: "/gallery/placeholder-10.jpg",
    featured: false,
    soldTo: "Amsterdam, Netherlands",
    dateCreated: "2026-02-05",
    price: 250,
  },
  {
    id: "11",
    title: "Spongebob Pants Down",
    slug: "spongebob-pants-down",
    description: "Bikini Bottom cast famous piece",
    size: "26×32",
    medium: "Acrylic on Canvas",
    status: "sold",
    category: "characters,pop-culture",
    image: "/gallery/placeholder-12.jpg",
    featured: true,
    soldTo: "Miami, USA",
    dateCreated: "2026-02-15",
    price: 400,
  },
  {
    id: "12",
    title: "Cowboy Bebop Nights",
    slug: "cowboy-bebop-nights",
    description: "Spike Spiegel portrait",
    size: "11×14",
    medium: "Acrylic on Canvas",
    status: "available",
    category: "anime",
    image: "/gallery/placeholder-17.jpg",
    featured: false,
    soldTo: null,
    dateCreated: "2026-03-10",
    price: 150,
  },
];

export function getFeaturedArtworks(): Artwork[] {
  return artworks.filter((artwork) => artwork.featured);
}

export function getSoldArtworks(): Artwork[] {
  return artworks.filter((artwork) => artwork.status === "sold");
}

export function getAvailableArtworks(): Artwork[] {
  return artworks.filter((artwork) => artwork.status === "available");
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((artwork) => artwork.slug === slug);
}

export function getArtworksByCategory(category: string): Artwork[] {
  return artworks.filter((artwork) =>
    artwork.category.split(",").includes(category)
  );
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  artworks.forEach((artwork) => {
    artwork.category.split(",").forEach((cat) => categories.add(cat));
  });
  return Array.from(categories);
}
