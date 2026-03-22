-- Work page Suno embed playlist (managed from /admin/)
-- Run via Supabase SQL editor or CLI if migrations are not auto-applied.

CREATE TABLE IF NOT EXISTS public.work_suno_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  suno_song_id text NOT NULL,
  title text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT work_suno_tracks_suno_song_id_key UNIQUE (suno_song_id)
);

CREATE INDEX IF NOT EXISTS work_suno_tracks_sort_order_idx ON public.work_suno_tracks (sort_order ASC);

ALTER TABLE public.work_suno_tracks ENABLE ROW LEVEL SECURITY;

-- Public read (anon key) for the marketing site
CREATE POLICY "work_suno_tracks_select_public"
  ON public.work_suno_tracks FOR SELECT
  USING (true);

-- Authenticated users only (admin)
CREATE POLICY "work_suno_tracks_insert_authenticated"
  ON public.work_suno_tracks FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "work_suno_tracks_update_authenticated"
  ON public.work_suno_tracks FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "work_suno_tracks_delete_authenticated"
  ON public.work_suno_tracks FOR DELETE
  USING (auth.uid() IS NOT NULL);

COMMENT ON TABLE public.work_suno_tracks IS 'Suno song IDs for /work Tracks section; order by sort_order.';
