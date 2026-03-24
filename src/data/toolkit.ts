export interface ToolkitItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // emoji for now, can swap for real images later
  popular?: boolean;
}

export interface ToolkitCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: ToolkitItem[];
}

export const toolkitCategories: ToolkitCategory[] = [
  {
    id: "paints",
    name: "Paints",
    description: "Premium acrylics to lay down your vision",
    icon: "\uD83C\uDFA8",
    items: [
      {
        id: "paint-starter",
        name: "Acrylic Starter Set",
        description: "12 essential colors — everything you need to begin",
        price: 28,
        image: "\uD83C\uDF08",
        popular: true,
      },
      {
        id: "paint-neon",
        name: "Neon & Fluorescent Pack",
        description: "6 electric colors that pop under any light",
        price: 22,
        image: "\u2728",
      },
      {
        id: "paint-earth",
        name: "Earth Tones Collection",
        description: "8 warm naturals for portraits & landscapes",
        price: 24,
        image: "\uD83C\uDF3F",
      },
      {
        id: "paint-metallic",
        name: "Metallic & Iridescent Set",
        description: "6 shimmering metallics — gold, silver, copper & more",
        price: 26,
        image: "\uD83E\uDE99",
      },
      {
        id: "paint-black-white",
        name: "Black & White Essentials",
        description: "Large tubes of titanium white & carbon black",
        price: 14,
        image: "\u26AB",
      },
    ],
  },
  {
    id: "brushes",
    name: "Brushes",
    description: "The right strokes for every style",
    icon: "\uD83D\uDD8C\uFE0F",
    items: [
      {
        id: "brush-starter",
        name: "Essential Brush Set",
        description: "10 mixed brushes — flats, rounds, filberts",
        price: 18,
        image: "\uD83D\uDD8C\uFE0F",
        popular: true,
      },
      {
        id: "brush-detail",
        name: "Detail & Fine Line Pack",
        description: "5 precision brushes for intricate work",
        price: 15,
        image: "\u270F\uFE0F",
      },
      {
        id: "brush-palette-knife",
        name: "Palette Knife Set",
        description: "4 stainless steel knives for texture & mixing",
        price: 12,
        image: "\uD83D\uDD2A",
      },
      {
        id: "brush-large",
        name: "Large Format Brushes",
        description: "3 wide brushes for bold backgrounds & washes",
        price: 16,
        image: "\uD83E\uDDF9",
      },
    ],
  },
  {
    id: "canvas",
    name: "Canvas",
    description: "Your blank slate — pick your size",
    icon: "\uD83D\uDDBC\uFE0F",
    items: [
      {
        id: "canvas-small",
        name: "Small Canvas Pack",
        description: "3-pack of 9\u00D712\" pre-stretched canvases",
        price: 15,
        image: "\u25FB\uFE0F",
      },
      {
        id: "canvas-medium",
        name: "Medium Canvas Pack",
        description: "2-pack of 16\u00D720\" gallery-wrapped canvases",
        price: 22,
        image: "\u25FD",
        popular: true,
      },
      {
        id: "canvas-large",
        name: "Large Statement Canvas",
        description: "1 premium 26\u00D732\" heavy-duty canvas",
        price: 28,
        image: "\u2B1C",
      },
      {
        id: "canvas-pad",
        name: "Canvas Paper Pad",
        description: "20-sheet pad for practice & sketching",
        price: 10,
        image: "\uD83D\uDCD3",
      },
    ],
  },
  {
    id: "extras",
    name: "Extras",
    description: "Level up your setup",
    icon: "\uD83D\uDEE0\uFE0F",
    items: [
      {
        id: "extra-easel",
        name: "Tabletop Easel",
        description: "Adjustable wooden easel — folds flat for storage",
        price: 25,
        image: "\uD83E\uDDCA",
      },
      {
        id: "extra-palette",
        name: "Stay-Wet Palette",
        description: "Keeps paint fresh for days between sessions",
        price: 14,
        image: "\uD83C\uDFAF",
        popular: true,
      },
      {
        id: "extra-varnish",
        name: "Finishing Varnish",
        description: "Satin spray varnish to protect your finished piece",
        price: 12,
        image: "\uD83D\uDCAB",
      },
      {
        id: "extra-apron",
        name: "Artist Apron",
        description: "Canvas apron with pockets — paint without worry",
        price: 18,
        image: "\uD83E\uDDBA",
      },
      {
        id: "extra-cup",
        name: "Brush Wash Cup",
        description: "Stainless steel cup with coil for cleaning brushes",
        price: 8,
        image: "\uD83E\uDD64",
      },
    ],
  },
];

export function getCategory(id: string): ToolkitCategory | undefined {
  return toolkitCategories.find((c) => c.id === id);
}
