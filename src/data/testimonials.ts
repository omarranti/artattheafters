export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  piece?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Stevie painted my dog as a samurai and it's the best thing I own. People stop and stare every time they walk into my apartment.",
    name: "Jake",
    location: "Los Angeles",
    piece: "Custom Commission",
  },
  {
    quote: "I saw the Elmo piece on Instagram and had to have something. Two weeks later I had a one-of-a-kind painting on my wall. The whole process was so easy.",
    name: "Sarah",
    location: "New York",
    piece: "Custom 16×20",
  },
  {
    quote: "Got a custom piece for my boyfriend's birthday. He literally teared up. Worth every penny.",
    name: "Mia",
    location: "Miami",
    piece: "11×14 Commission",
  },
  {
    quote: "The painting arrived wrapped like a gift, insured and everything. Quality is insane — the texture and colors are even better in person.",
    name: "Tom",
    location: "London",
    piece: "26×32 Abstract",
  },
  {
    quote: "I've bought two pieces now. Stevie's energy comes through in every brushstroke. My living room went from boring to a conversation starter.",
    name: "Priya",
    location: "Toronto",
    piece: "Repeat Collector",
  },
];
