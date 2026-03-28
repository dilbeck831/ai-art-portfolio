import { Buffer } from "node:buffer";
import { TwitterApi } from "npm:twitter-api-v2@1.19.0";

/**
 * Post a tweet with one image (OAuth 1.0a user context).
 * Requires secrets: X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET.
 */
export async function postTweetWithMedia(
  caption: string,
  imageUrl: string,
): Promise<{ tweet_id: string }> {
  const appKey = Deno.env.get("X_API_KEY");
  const appSecret = Deno.env.get("X_API_SECRET");
  const accessToken = Deno.env.get("X_ACCESS_TOKEN");
  const accessSecret = Deno.env.get("X_ACCESS_TOKEN_SECRET");
  if (!appKey || !appSecret || !accessToken || !accessSecret) {
    throw new Error("Missing X API secrets (X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET)");
  }

  const client = new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  });

  const rw = client.readWrite;
  const imageRes = await fetch(imageUrl);
  if (!imageRes.ok) {
    throw new Error(`Could not download image (${imageRes.status})`);
  }
  const mime =
    imageRes.headers.get("content-type")?.split(";")[0]?.trim() || "image/jpeg";
  const buf = new Uint8Array(await imageRes.arrayBuffer());
  const mediaId = await rw.v1.uploadMedia(Buffer.from(buf), { mimeType: mime });
  const tweet = await rw.v2.tweet({
    text: caption,
    media: { media_ids: [mediaId] },
  });
  const id = tweet.data?.id;
  if (!id) throw new Error("X API returned no tweet id");
  return { tweet_id: id };
}
