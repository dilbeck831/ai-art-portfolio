import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { postTweetWithMedia } from "../_shared/x-post.ts";

/**
 * Call with either:
 *   Authorization: Bearer <CRON_SECRET>  (GitHub Actions / cron)
 *   Authorization: Bearer <user JWT>     (logged-in admin from /admin — same validation as post-to-x)
 * Optional: x-cron-secret: <CRON_SECRET>
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY to read/update queued rows (bypasses RLS).
 */

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-cron-secret",
};

function json(
  body: Record<string, unknown>,
  status: number,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function unauthorized(): Response {
  return json({ error: "Unauthorized" }, 401);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST" && req.method !== "GET") {
    return json({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const sbAuth = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const cronSecret = Deno.env.get("CRON_SECRET")?.trim() ?? "";
  const auth = req.headers.get("Authorization");
  const bearer = auth?.replace(/^Bearer\s+/i, "").trim() ?? "";
  const headerSecret = req.headers.get("x-cron-secret")?.trim() ?? "";

  let authorized = false;
  if (cronSecret && (bearer === cronSecret || headerSecret === cronSecret)) {
    authorized = true;
  } else if (bearer) {
    const { data: userData, error: userErr } = await sbAuth.auth.getUser(
      bearer,
    );
    if (!userErr && userData?.user) {
      authorized = true;
    }
  }

  if (!authorized) {
    return unauthorized();
  }

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
    return json({ error: qErr.message }, 500);
  }

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

  return json({
    ok: true,
    serverTimeUtc: nowIso,
    due: (rows || []).length,
    processed,
    failures,
  }, 200);
});
