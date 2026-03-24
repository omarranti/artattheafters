export function WebsiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Art at the Afters',
    url: 'https://artattheafters.vercel.app',
    description: 'One of a kind custom made artwork, delivered to you.',
    creator: {
      '@type': 'Person',
      name: 'Stevie Alger',
      jobTitle: 'Artist',
      url: 'https://instagram.com/artattheafters',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArtGalleryJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ArtGallery',
    name: 'Art at the Afters',
    description: 'Custom hand-painted artwork by Stevie Alger. Pop culture, anime, abstract, and original pieces.',
    url: 'https://artattheafters.vercel.app/gallery',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    founder: {
      '@type': 'Person',
      name: 'Stevie Alger',
    },
    sameAs: [
      'https://instagram.com/artattheafters',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductJsonLd({ name, description, price, image, availability }: {
  name: string;
  description: string;
  price: number;
  image: string;
  availability: 'InStock' | 'SoldOut';
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `https://artattheafters.vercel.app${image}`,
    brand: {
      '@type': 'Brand',
      name: 'Art at the Afters',
    },
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: 'USD',
      availability: availability === 'InStock' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      seller: {
        '@type': 'Person',
        name: 'Stevie Alger',
      },
    },
    creator: {
      '@type': 'Person',
      name: 'Stevie Alger',
    },
    material: 'Acrylic on Canvas',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
