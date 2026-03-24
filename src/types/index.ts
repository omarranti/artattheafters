export interface Artwork {
  id: string;
  title: string;
  slug: string;
  description: string;
  size: string;
  medium: string;
  status: "available" | "sold" | "reserved";
  category: string;
  image: string;
  featured: boolean;
  soldTo: string | null;
  dateCreated: string;
  price: number;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  artistName: string;
  email: string;
  socials: {
    instagram: string;
    tiktok: string;
    twitter: string;
  };
  payment: {
    venmo: string;
    cashapp: string;
    zelle: string;
  };
}

export interface NavLink {
  label: string;
  href: string;
}
