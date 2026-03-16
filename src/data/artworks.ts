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
    image: '0_0 (1).jpeg',
    favorite: true,
    date: '2024-03',
  },
  {
    id: '2',
    slug: 'fragment-02',
    title: 'Fragment 02',
    series: 'fragment',
    image: '0_0 (1).jpeg',
    favorite: true,
    date: '2024-03',
  },
  {
    id: '3',
    slug: 'fragment-03',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (1).jpeg',
    date: '2024-02',
  },
   {
    id: '4',
    slug: 'fragment-05',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (1).jpeg',
    date: '2024-02',
  },
   {
    id: '5',
    slug: 'fragment-05',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (2).jpeg',
    date: '2024-02',
  },
  {
    id: '6',
    slug: 'fragment-06',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (3).jpeg',
    date: '2024-02',
  },
  {
    id: '7',
    slug: 'fragment-07',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (4).jpeg',
    date: '2024-02',
  },
  {
    id: '8',
    slug: 'fragment-08',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (5).jpeg',
    date: '2024-02',
  },
  {
    id: '9',
    slug: 'fragment-09',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (6).jpeg',
    date: '2024-02',
  },
  {
    id: '10',
    slug: 'fragment-10',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (7).jpeg',
    date: '2024-02',
  },
  {
    id: '11',
    slug: 'fragment-11',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (8).jpeg',
    date: '2024-02',
  },
  {
    id: '12',
    slug: 'fragment-12',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (9).jpeg',
    date: '2024-02',
  },
  {
    id: '13',
    slug: 'fragment-13',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (10).jpeg',
    date: '2024-02',
  },
  {
    id: '14',
    slug: 'fragment-14',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (11).jpeg',
    date: '2024-02',
  },
  {
    id: '15',
    slug: 'fragment-15',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (12).jpeg',
    date: '2024-02',
  },
  {
    id: '16',
    slug: 'fragment-16',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (13).jpeg',
    date: '2024-02',
  },
  {
    id: '17',
    slug: 'fragment-17',
    title: 'Fragment 03',
    series: 'fragment',
    image: '0_0 (14).jpeg',
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
