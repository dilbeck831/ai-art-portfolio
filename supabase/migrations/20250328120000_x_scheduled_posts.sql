-- 𝕏 scheduled posts queue (admin /admin → 𝕏 Scheduler)
-- Apply in Supabase SQL Editor or via `supabase db push`.
-- After this, deploy Edge Functions `post-to-x` and `process-x-scheduled-posts`, set secrets (see function README in repo).

CREATE TABLE IF NOT EXISTS public.x_scheduled_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id uuid,
  artwork_title text,
  image_url text NOT NULL,
  caption text NOT NULL,
  scheduled_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'published', 'failed')),
  posted_at timestamptz,
  tweet_id text,
  error_message text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS x_scheduled_posts_status_scheduled_at_idx
  ON public.x_scheduled_posts (status, scheduled_at);

COMMENT ON TABLE public.x_scheduled_posts IS 'Queue for 𝕏 posts; pending rows with scheduled_at <= now() are processed by the process-x-scheduled-posts Edge Function.';

ALTER TABLE public.x_scheduled_posts ENABLE ROW LEVEL SECURITY;

-- No public access
CREATE POLICY "x_scheduled_posts_select_authenticated"
  ON public.x_scheduled_posts FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "x_scheduled_posts_insert_authenticated"
  ON public.x_scheduled_posts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "x_scheduled_posts_update_authenticated"
  ON public.x_scheduled_posts FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "x_scheduled_posts_delete_authenticated"
  ON public.x_scheduled_posts FOR DELETE
  USING (auth.uid() IS NOT NULL);
