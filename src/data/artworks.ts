/**
 * AI Art pieces. Images live at public/art/
 * series: "fragment" | "dark-romantics" | "liminal-spaces" | etc.
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
  /** When true, this artwork is used as the homepage hero image (single image to the right of the text). Only one should be set. */
  homepageHero?: boolean;
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
    id: 'homepage-hero',
    slug: 'fragment-i',
    title: 'Fragment I',
    series: 'fragment',
    image: '0_0 (1).jpeg',
    favorite: true,
    homepageHero: true,
    date: '2026-03',
  },
  {
    id: '2',
    slug: 'fragment-ii',
    title: 'Fragment II',
    series: 'fragment',
    image: '0_0 (2).jpeg',
    favorite: true,
    date: '2026-03',
  },
  {
    id: '3',
    slug: 'fragment-iii',
    title: 'Fragment III',
    series: 'fragment',
    image: '0_0 (3).jpeg',
    favorite: true,
    date: '2026-03',
  },
  {
    id: '4',
    slug: 'fragment-iv',
    title: 'Fragment IV',
    series: 'fragment',
    image: '0_0 (4).jpeg',
    favorite: true,
    date: '2026-03',
  },
  {
    id: '5',
    slug: 'fragment-v',
    title: 'Fragment V',
    series: 'fragment',
    image: '0_0 (5).jpeg',
    favorite: true,
    date: '2026-03',
  },
  {
    id: '6',
    slug: 'fragment-vi',
    title: 'Fragment VI',
    series: 'fragment',
    image: '0_0 (6).jpeg',
    favorite: true,
    date: '2026-03',
  },
  {
    id: '7',
    slug: 'fragment-vii',
    title: 'Fragment VII',
    series: 'fragment',
    image: '0_0 (7).jpeg',
    favorite: true,
    date: '2026-03',
  },
  {
    id: '8',
    slug: 'fragment-viii',
    title: 'Fragment VIII',
    series: 'fragment',
    image: '0_0 (8).jpeg',
    date: '2026-02',
  },
  {
    id: '9',
    slug: 'fragment-ix',
    title: 'Fragment IX',
    series: 'fragment',
    image: '0_0 (9).jpeg',
    date: '2026-02',
  },
  {
    id: '10',
    slug: 'fragment-x',
    title: 'Fragment X',
    series: 'fragment',
    image: '0_0 (10).jpeg',
    date: '2026-02',
  },
  {
    id: '11',
    slug: 'fragment-xi',
    title: 'Fragment XI',
    series: 'fragment',
    image: '0_0 (11).jpeg',
    date: '2026-02',
  },
  {
    id: '12',
    slug: 'fragment-xii',
    title: 'Fragment XII',
    series: 'fragment',
    image: '0_0 (12).jpeg',
    date: '2026-02',
  },
  {
    id: '13',
    slug: 'fragment-xiii',
    title: 'Fragment XIII',
    series: 'fragment',
    image: '0_0 (13).jpeg',
    date: '2026-02',
  },
  {
    id: '14',
    slug: 'fragment-xiv',
    title: 'Fragment XIV',
    series: 'fragment',
    image: '0_0 (14).jpeg',
    date: '2026-02',
  },
];

export function getArtworksBySeries(series?: string): Artwork[] {
  if (!series) return [...artworks].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return artworks.filter((a) => a.series === series);
}

export function getFeaturedArtworks(limit = 7): Artwork[] {
  return artworks.filter((a) => a.favorite).slice(0, limit);
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

/** Returns the artwork designated as the homepage hero (single image right of text). Set homepageHero: true on one entry in artworks. */
export function getHomepageHeroArtwork(): Artwork | undefined {
  return artworks.find((a) => a.homepageHero === true);
}

/** Returns 3 artworks for the hero carousel: hero first, then next 2 from favorites. */
export function getHeroCarouselArtworks(): Artwork[] {
  const hero = getHomepageHeroArtwork();
  const rest = artworks.filter((a) => a.id !== hero?.id);
  const ordered = hero ? [hero, ...rest] : rest;
  return ordered.slice(0, 3);
}
