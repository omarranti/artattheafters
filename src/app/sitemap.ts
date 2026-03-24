import { MetadataRoute } from 'next'
import { artworks } from '@/data/artworks'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://artattheafters.vercel.app'
  const now = new Date()

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/order`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sold`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/visualize`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Individual artwork anchors (helps Google index each artwork)
  const artworkPages: MetadataRoute.Sitemap = artworks
    .filter(a => a.image.startsWith('/gallery/artwork/'))
    .map(artwork => ({
      url: `${baseUrl}/gallery#${artwork.slug}`,
      lastModified: new Date(artwork.dateCreated),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...mainPages, ...artworkPages]
}
