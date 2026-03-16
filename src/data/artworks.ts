/**
 * AI Art pieces. Add images to public/art/ (e.g. public/art/fragment/).
 * series: "fragment" | future "dark-romantics" | "liminal-spaces" | etc.
 */

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  series: string;
  image: string;
  video?: string;
  description?: string;
  year?: string;
  favorite?: boolean;
  date?: string;
}

export interface ArtSeries {
  id: string;
  name: string;
  description?: string;
  count: number;
}

export const artworks: Artwork[] = [
  {
    id: '1',
    slug: 'fragment-01',
    title: 'Fragment 01',
    series: 'fragment',
    image: 'placeholder.svg',
    favorite: true,
    date: '2024-03',
  },
  {
    id: '2',
    slug: 'fragment-02',
    title: 'Fragment 02',
    series: 'fragment',
    image: 'placeholder.svg',
    favorite: true,
    date: '2024-03',
  },
  {
    id: '3',
    slug: 'fragment-03',
    title: 'Fragment 03',
    series: 'fragment',
    image: 'placeholder.svg',
    date: '2024-02',
  },
  // Add remaining 14 Fragment pieces; replace image with fragment/01.jpg etc.
];

export function getArtworksBySeries(series?: string): Artwork[] {
  if (!series) return [...artworks].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return artworks.filter((a) => a.series === series);
}

export function getFeaturedArtworks(limit = 6): Artwork[] {
  return artworks.filter((a) => a.favorite).slice(0, limit);
}
