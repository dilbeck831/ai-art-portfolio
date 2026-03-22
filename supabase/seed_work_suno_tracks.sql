-- Optional: one-time seed to match previous static src/data/music.ts (skip duplicates)
INSERT INTO public.work_suno_tracks (suno_song_id, title, sort_order) VALUES
  ('b2d8fd09-0906-4b17-80f5-28fcd024b753', 'Shadows x Fireball x Switch Blade (3X Mashup)', 0),
  ('a16f84a4-650d-4a0c-b164-02ca4e73bfac', 'Desert Bass', 1),
  ('8c70a8ea-1e67-4f58-94ca-960be8bc6b00', 'Last one Asleep', 2),
  ('b4f1b893-8c49-4bbc-a409-33ca3303e4a8', 'Loosing You', 3)
ON CONFLICT (suno_song_id) DO NOTHING;
