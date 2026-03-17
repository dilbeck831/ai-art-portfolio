/**
 * artworks.ts — Supabase-powered artwork data.
 * Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_KEY (or PUBLIC_SUPABASE_ANON_KEY) in .env and in GitHub Actions secrets.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? import.meta.env.PUBLIC_SUPABASE_KEY ?? '').toString();
const hasConfig = Boolean(supabaseUrl && supabaseKey);

export const sb = hasConfig ? createClient(supabaseUrl, supabaseKey) : null;

export interface Artwork {
  id: string;
  title: string;
  description?: string;
  collection: string;
  tags: string[];
  image_url: string;
  image_path: string;
  favorite: boolean;
  created_at: string;
}

export async function getAllArtworks(): Promise<Artwork[]> {
  if (!sb) return [];
  const { data, error } = await sb
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('Supabase error:', error); return []; }
  return data ?? [];
}

export async function getFeaturedArtworks(limit = 6): Promise<Artwork[]> {
  if (!sb) return [];
  const { data, error } = await sb
    .from('artworks')
    .select('*')
    .eq('favorite', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) { console.error('Supabase error:', error); return []; }
  return data ?? [];
}

export async function getArtworksByCollection(collection?: string, limit?: number): Promise<Artwork[]> {
  if (!sb) return [];
  let query = sb.from('artworks').select('*').order('created_at', { ascending: false });
  if (collection) query = query.eq('collection', collection);
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) { console.error('Supabase error:', error); return []; }
  return data ?? [];
}

export async function getRecentArtworks(limit = 4): Promise<Artwork[]> {
  if (!sb) return [];
  const { data, error } = await sb
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) { console.error('Supabase error:', error); return []; }
  return data ?? [];
}

/** Alias for getArtworksByCollection(series, limit). */
export async function getArtworksBySeries(series: string, limit?: number): Promise<Artwork[]> {
  return getArtworksByCollection(series, limit);
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | undefined> {
  if (!sb) return undefined;
  const { data, error } = await sb
    .from('artworks')
    .select('*')
    .eq('id', slug)
    .maybeSingle();
  if (error) { console.error('Supabase error:', error); return undefined; }
  return data ?? undefined;
}
