/**
 * artworks.ts — Supabase-powered artwork data
 * Replaces static array with live Supabase queries.
 * Add your env vars to .env:
 *   PUBLIC_SUPABASE_URL=https://sbbmducevhpirnthzvtz.supabase.co
 *   PUBLIC_SUPABASE_KEY=sb_publishable_X1bha7SOQmNtwVvC4Rhp-Q_67c3guiX
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL ?? 'https://sbbmducevhpirnthzvtz.supabase.co';
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY ?? 'sb_publishable_X1bha7SOQmNtwVvC4Rhp-Q_67c3guiX';

export const sb = createClient(supabaseUrl, supabaseKey);

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
  const { data, error } = await sb
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('Supabase error:', error); return []; }
  return data ?? [];
}

export async function getFeaturedArtworks(limit = 6): Promise<Artwork[]> {
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
  let query = sb.from('artworks').select('*').order('created_at', { ascending: false });
  if (collection) query = query.eq('collection', collection);
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) { console.error('Supabase error:', error); return []; }
  return data ?? [];
}

export async function getRecentArtworks(limit = 4): Promise<Artwork[]> {
  const { data, error } = await sb
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) { console.error('Supabase error:', error); return []; }
  return data ?? [];
}
