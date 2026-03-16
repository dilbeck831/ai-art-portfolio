export const musicPlaceholder = {
  genres: ['Drum and bass', 'Neurofunk', 'Deep house', 'Dubstep'],
  message: 'Music and production notes coming soon. Suno tracks, releases, and process.',
};

/** Suno track embed: use the song ID from your Suno share link (e.g. suno.com/song/abc-123 → id: "abc-123") */
export interface SunoTrack {
  id: string;
  title: string;
}

/** Add your Suno track IDs here. Get the ID from the song URL: suno.com/song/[this-id] or suno.com/s/[this-id] */
export const sunoTracks: SunoTrack[] = [
  { id: 'b2d8fd09-0906-4b17-80f5-28fcd024b753', title: 'Shadows x Fireball x Switch Blade (3X Mashup)' },
];
