import { artworks } from '@/data/artworks';
import { testimonials } from '@/data/testimonials';

const BASE_URL = 'https://artattheafters.vercel.app';

// ─── Website + Organization (homepage) ────────────────────────────────────────
export function WebsiteJsonLd() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'Art at the Afters',
    url: BASE_URL,
    description: 'One of a kind custom made artwork, delivered to you. Hand-painted originals by LA artist Stevie Alger.',
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/gallery?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Art at the Afters',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/icons/concept4_favicon_512.svg`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/gallery/artwork/stevie-face-portrait.jpg`,
    description: 'Custom hand-painted artwork studio based in Los Angeles. Pop culture, anime, abstract, and original acrylic paintings shipped worldwide.',
    founder: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#artist`,
      name: 'Stevie Alger',
    },
    foundingDate: '2024',
    foundingLocation: {
      '@type': 'Place',
      name: 'Los Angeles, California',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    sameAs: [
      'https://instagram.com/artattheafters',
      'https://tiktok.com/@artattheafters',
      'https://x.com/artafterparty',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${BASE_URL}/order`,
      availableLanguage: 'English',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 34.0522,
        longitude: -118.2437,
      },
      geoRadius: '20000',
    },
    knowsAbout: [
      'Custom paintings',
      'Acrylic on canvas',
      'Pop culture art',
      'Anime paintings',
      'Abstract art',
      'Commission artwork',
      'Hand-painted originals',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    </>
  );
}

// ─── Artist Person Schema (about page) ───────────────────────────────────────
export function ArtistPersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#artist`,
    name: 'Stevie Alger',
    url: `${BASE_URL}/about`,
    image: `${BASE_URL}/photos/stevie/stevie-painting-night.jpg`,
    jobTitle: 'Artist',
    description: 'LA-based artist who started painting at afterparties and has since sold 75+ custom hand-painted pieces to collectors across 5 countries and 17 cities worldwide.',
    knowsAbout: [
      'Acrylic painting',
      'Custom artwork',
      'Pop culture art',
      'Abstract art',
      'Anime art',
      'Canvas painting',
    ],
    birthPlace: {
      '@type': 'Place',
      name: 'Los Angeles, California',
    },
    workLocation: {
      '@type': 'Place',
      name: 'Los Angeles, California',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
    brand: {
      '@type': 'Brand',
      name: 'Art at the Afters',
      url: BASE_URL,
    },
    sameAs: [
      'https://instagram.com/artattheafters',
      'https://tiktok.com/@artattheafters',
      'https://x.com/artafterparty',
    ],
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Custom Art Commission',
        description: 'Hand-painted custom artwork on canvas, any subject or style',
        provider: { '@id': `${BASE_URL}/#artist` },
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

// ─── Art Gallery + ItemList (gallery page) ────────────────────────────────────
export function ArtGalleryJsonLd() {
  const galleryData = {
    '@context': 'https://schema.org',
    '@type': 'ArtGallery',
    '@id': `${BASE_URL}/gallery#gallery`,
    name: 'Art at the Afters — Gallery',
    description: 'Browse the full collection of custom hand-painted artwork by Stevie Alger. Pop culture, anime, abstract, and original acrylic paintings.',
    url: `${BASE_URL}/gallery`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    founder: { '@id': `${BASE_URL}/#artist` },
    parentOrganization: { '@id': `${BASE_URL}/#organization` },
    sameAs: ['https://instagram.com/artattheafters'],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
      description: 'Online gallery — available 24/7',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Art at the Afters Collection',
      itemListElement: artworks.map((artwork, index) => ({
        '@type': 'OfferCatalog',
        position: index + 1,
        itemOffered: {
          '@type': 'VisualArtwork',
          name: artwork.title,
          description: artwork.description,
          artMedium: artwork.medium,
          artform: 'Painting',
          width: { '@type': 'Distance', name: artwork.size.split('×')[0] + ' inches' },
          height: { '@type': 'Distance', name: artwork.size.split('×')[1] + ' inches' },
          image: artwork.image.startsWith('/gallery/artwork/')
            ? `${BASE_URL}${artwork.image}`
            : undefined,
          creator: { '@id': `${BASE_URL}/#artist` },
          offers: {
            '@type': 'Offer',
            price: artwork.price.toString(),
            priceCurrency: 'USD',
            availability: artwork.status === 'available'
              ? 'https://schema.org/InStock'
              : 'https://schema.org/SoldOut',
            url: `${BASE_URL}/gallery`,
            seller: { '@id': `${BASE_URL}/#organization` },
          },
        },
      })),
    },
  };

  // ItemList for Google rich results (carousel)
  const itemListData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Art at the Afters — Artwork Collection',
    description: 'Complete collection of hand-painted artworks by Stevie Alger',
    url: `${BASE_URL}/gallery`,
    numberOfItems: artworks.length,
    itemListElement: artworks.map((artwork, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: artwork.title,
      url: `${BASE_URL}/gallery#${artwork.slug}`,
      image: artwork.image.startsWith('/gallery/artwork/')
        ? `${BASE_URL}${artwork.image}`
        : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }}
      />
    </>
  );
}

// ─── Product Schema (individual artwork in modal) ─────────────────────────────
export function ProductJsonLd({ name, description, price, image, availability, size, slug, dateCreated }: {
  name: string;
  description: string;
  price: number;
  image: string;
  availability: 'InStock' | 'SoldOut';
  size?: string;
  slug?: string;
  dateCreated?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name,
    description,
    artMedium: 'Acrylic on Canvas',
    artform: 'Painting',
    image: image.startsWith('http') ? image : `${BASE_URL}${image}`,
    url: slug ? `${BASE_URL}/gallery#${slug}` : `${BASE_URL}/gallery`,
    dateCreated,
    width: size ? { '@type': 'Distance', name: `${size.split('×')[0]} inches` } : undefined,
    height: size ? { '@type': 'Distance', name: `${size.split('×')[1]} inches` } : undefined,
    creator: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#artist`,
      name: 'Stevie Alger',
    },
    brand: {
      '@type': 'Brand',
      name: 'Art at the Afters',
    },
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: 'USD',
      availability: availability === 'InStock'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Art at the Afters',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 7,
            maxValue: 21,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 10,
            unitCode: 'DAY',
          },
        },
      },
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

// ─── Service + FAQ Schema (order page) ────────────────────────────────────────
export function CommissionServiceJsonLd() {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/order#service`,
    name: 'Custom Art Commission',
    description: 'Commission a one-of-a-kind custom hand-painted artwork by Stevie Alger. Choose your canvas size, describe your vision, and get a hand-painted original delivered to your door.',
    url: `${BASE_URL}/order`,
    provider: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Art at the Afters',
    },
    serviceType: 'Custom Art Commission',
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Commission Sizes & Pricing',
      itemListElement: [
        { '@type': 'Offer', name: '9×12 Custom Painting', price: '50', priceCurrency: 'USD' },
        { '@type': 'Offer', name: '11×14 Custom Painting', price: '100', priceCurrency: 'USD' },
        { '@type': 'Offer', name: '16×20 Custom Painting', price: '200', priceCurrency: 'USD' },
        { '@type': 'Offer', name: '18×24 Custom Painting', price: '300', priceCurrency: 'USD' },
        { '@type': 'Offer', name: '24×30 Custom Painting', price: '400', priceCurrency: 'USD' },
        { '@type': 'Offer', name: '26×32 Custom Painting', price: '500', priceCurrency: 'USD' },
        { '@type': 'Offer', name: '40×50 Custom Painting', price: '600', priceCurrency: 'USD' },
      ],
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.name,
      },
      reviewBody: t.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      ratingCount: testimonials.length.toString(),
      reviewCount: testimonials.length.toString(),
    },
  };

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a custom painting cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Custom paintings start at $50 for a 9×12 canvas and go up to $600 for a 40×50 canvas. Every piece is 100% custom and hand-painted by Stevie Alger.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a custom painting take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most commissions are completed within 1-3 weeks depending on size and complexity. Rush processing is available as an add-on.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you ship internationally?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Art at the Afters ships worldwide. We\'ve delivered paintings to 5 countries and 17 cities including Los Angeles, New York, London, Byron Bay, Amsterdam, Toronto, and Miami.',
        },
      },
      {
        '@type': 'Question',
        name: 'What kind of artwork can I commission?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Anything you can imagine! Popular commissions include pop culture characters (SpongeBob, anime, cartoons), abstract art, portraits, pets, and custom designs. All paintings are acrylic on canvas.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I order a custom painting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visit our Order page, choose your canvas size, describe your vision, and submit your commission request. Stevie will follow up with you to finalize details and begin painting.',
        },
      },
      {
        '@type': 'Question',
        name: 'What payment methods do you accept?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept Venmo (@artattheafters), CashApp ($artattheafters), and Zelle (artattheafters@gmail.com).',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the paintings originals or prints?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every single painting is a hand-painted original. No prints, no reproductions. Each piece is one-of-a-kind and signed by Stevie Alger.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}

// ─── Breadcrumb Schema (reusable) ─────────────────────────────────────────────
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Sold Page (CollectionPage schema) ────────────────────────────────────────
export function SoldCollectionJsonLd() {
  const soldArtworks = artworks.filter(a => a.status === 'sold');

  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Sold Artwork — Art at the Afters',
    description: 'Sold artwork from Art at the Afters. 75+ paintings shipped to 5 countries and 17 cities worldwide.',
    url: `${BASE_URL}/sold`,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: {
      '@type': 'ItemList',
      name: 'Sold Artworks',
      numberOfItems: soldArtworks.length,
      itemListElement: soldArtworks.map((artwork, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'VisualArtwork',
          name: artwork.title,
          description: artwork.description,
          artMedium: artwork.medium,
          creator: { '@id': `${BASE_URL}/#artist` },
          offers: {
            '@type': 'Offer',
            price: artwork.price.toString(),
            priceCurrency: 'USD',
            availability: 'https://schema.org/SoldOut',
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Visualize Page (WebApplication schema) ───────────────────────────────────
export function VisualizerJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Art at the Afters — Commission Visualizer',
    description: 'Interactive tool to build and preview your custom artwork commission. Choose canvas size, mood, and extras before ordering.',
    url: `${BASE_URL}/visualize`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free to use — commission pricing starts at $50',
    },
    creator: { '@id': `${BASE_URL}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
