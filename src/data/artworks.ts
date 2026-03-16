/**
 * Add your AI art here. To add a new piece:
 * 1. Put the image (or video) in public/art/
 * 2. Add an entry below with the filename and optional title/description.
 * Set favorite: true for pieces to show in the "Featured" section on the home page.
 */

export type Artwork = {
  id: string;
  title: string;
  /** Filename in public/art/ (e.g. "piece-01.jpg") */
  image: string;
  /** Optional: filename for video in public/art/ (e.g. "piece-01.mp4") */
  video?: string;
  description?: string;
  /** Show in Featured section on home page */
  favorite?: boolean;
  /** Optional date (e.g. "2024-03") for sorting */
  date?: string;
};

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Example piece",
    image: "placeholder.svg",
    description: "Replace with your first artwork.",
    favorite: true,
    date: "2024-03",
  },
  {
    id: "2",
    title: "Another piece",
    image: "placeholder.svg",
    favorite: true,
    date: "2024-02",
  },
  {
    id: "3",
    title: "Gallery piece",
    image: "placeholder.svg",
    date: "2024-01",
  },
];
