import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { postTweetWithMedia } from "../_shared/x-post.ts";

/**
 * Call on a schedule (e.g. every 1–5 min) with header:
 *   Authorization: Bearer <CRON_SECRET>
 * or
 *   x-cron-secret: <CRON_SECRET>
 * Set secret CRON_SECRET in Edge Function secrets.
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY to read/update queued rows (bypasses RLS).
 */

function unauthorized() {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST" && req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // #region agent log
  console.log(JSON.stringify({
    hypothesisId: "H1",
    message: "process-x-scheduled-posts entry",
    data: { method: req.method },
    timestamp: Date.now(),
    runId: "pre-fix",
  }));
  // #endregion

  // Trim: pasted GitHub/Supabase secrets often pick up a trailing newline and break auth.
  const cronSecret = Deno.env.get("CRON_SECRET")?.trim() ?? "";
  if (!cronSecret) {
    // #region agent log
    console.log(JSON.stringify({
      hypothesisId: "H2",
      message: "CRON_SECRET missing in Edge env",
      data: {},
      timestamp: Date.now(),
      runId: "pre-fix",
    }));
    // #endregion
    console.error("CRON_SECRET is not set");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const auth = req.headers.get("Authorization");
  const bearer = auth?.replace(/^Bearer\s+/i, "").trim();
  const headerSecret = req.headers.get("x-cron-secret")?.trim() ?? "";
  if (bearer !== cronSecret && headerSecret !== cronSecret) {
    // #region agent log
    console.log(JSON.stringify({
      hypothesisId: "H2",
      message: "process-x-scheduled-posts auth rejected",
      data: {
        hasBearer: !!bearer,
        hasXCronSecretHeader: !!headerSecret,
      },
      timestamp: Date.now(),
      runId: "pre-fix",
    }));
    // #endregion
    return unauthorized();
  }

  // #region agent log
  console.log(JSON.stringify({
    hypothesisId: "H1",
    message: "process-x-scheduled-posts authorized",
    data: { method: req.method },
    timestamp: Date.now(),
    runId: "pre-fix",
  }));
  // #endregion

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const sb = createClient(supabaseUrl, serviceKey);

  const nowIso = new Date().toISOString();

  const { data: rows, error: qErr } = await sb
    .from("x_scheduled_posts")
    .select("id,image_url,caption,scheduled_at,status")
    .eq("status", "pending")
    .lte("scheduled_at", nowIso)
    .order("scheduled_at", { ascending: true })
    .limit(10);

  if (qErr) {
    console.error(qErr);
    return new Response(JSON.stringify({ error: qErr.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // #region agent log
  console.log(JSON.stringify({
    hypothesisId: "H3",
    message: "due rows query result",
    data: {
      nowIso,
      dueCount: (rows || []).length,
      firstScheduledAt: rows && rows[0] ? rows[0].scheduled_at : null,
    },
    timestamp: Date.now(),
    runId: "pre-fix",
  }));
  // #endregion

  const processed: string[] = [];
  const failures: { id: string; message: string }[] = [];

  for (const row of rows || []) {
    try {
      const { tweet_id } = await postTweetWithMedia(row.caption, row.image_url);
      const postedAt = new Date().toISOString();
      const { error: upErr } = await sb
        .from("x_scheduled_posts")
        .update({
          status: "published",
          tweet_id,
          posted_at: postedAt,
          error_message: null,
        })
        .eq("id", row.id)
        .eq("status", "pending");
      if (upErr) throw upErr;
      processed.push(row.id);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("process row", row.id, msg);
      failures.push({ id: row.id, message: msg });
      await sb
        .from("x_scheduled_posts")
        .update({ status: "failed", error_message: msg.slice(0, 2000) })
        .eq("id", row.id)
        .eq("status", "pending");
    }
  }

  return new Response(
    JSON.stringify({
      ok: true,
      due: (rows || []).length,
      processed,
      failures,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
});
