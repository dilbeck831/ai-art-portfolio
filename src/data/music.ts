export const musicPlaceholder = {
  genres: ['Drum and bass', 'Neurofunk', 'Deep house', 'Dubstep'],
  message: 'Music and production notes coming soon. Suno tracks, releases, and process.',
};

/** Suno track embed: use the song ID from your Suno share link (e.g. suno.com/song/abc-123 → id: "abc-123") */
export interface SunoTrack {
  id: string;
  title: string;
}

/**
 * Fallback playlist for /work when `work_suno_tracks` in Supabase is empty or unreachable.
 * Primary source: Admin → Suno tracks (see `SunoTracksSection.astro`).
 * IDs: suno.com/song/[id] or suno.com/s/[id]
 */
export const sunoTracks: SunoTrack[] = [
  { id: 'b2d8fd09-0906-4b17-80f5-28fcd024b753', title: 'Shadows x Fireball x Switch Blade (3X Mashup)' },
  { id: 'a16f84a4-650d-4a0c-b164-02ca4e73bfac', title: 'Desert Bass' },
  { id: '8c70a8ea-1e67-4f58-94ca-960be8bc6b00', title: 'Last one Asleep' },
  { id: 'b4f1b893-8c49-4bbc-a409-33ca3303e4a8', title: 'Loosing You' },
];
