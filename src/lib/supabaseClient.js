// spectra/src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Graceful degradation in local dev without .env
if (!supabaseUrl || !supabaseAnonKey) {
  if (!import.meta.env.DEV) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  }
  console.warn('[DEV] Supabase env vars not set — donations will not be recorded.');
}

function makeMockQuery(data = []) {
  const q = {
    data, error: null,
    select: () => q, insert: () => q, update: () => q,
    eq: () => q, order: () => q, single: () => ({ data: null, error: null }),
    then: (resolve) => Promise.resolve(resolve({ data, error: null })),
  };
  return q;
}

const mockClient = {
  from: () => makeMockQuery(),
  functions: { invoke: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) },
};

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : mockClient;
