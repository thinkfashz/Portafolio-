import { createClient as createInsForgeClient } from '@insforge/sdk';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export type PortfolioContent = {
  heroTitle: string;
  heroSubtitle: string;
  contactLabel: string;
};

const fallbackContent: PortfolioContent = {
  heroTitle: 'Creo productos digitales que convierten ideas en resultados.',
  heroSubtitle: 'React, automatización e inteligencia artificial con foco en negocio.',
  contactLabel: 'Hablemos de tu proyecto',
};

const insforgeUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
const insforgeAnonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const insforge = insforgeUrl
  ? createInsForgeClient({ baseUrl: insforgeUrl, anonKey: insforgeAnonKey })
  : null;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createSupabaseClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function getPortfolioContent(): Promise<PortfolioContent> {
  if (insforge) {
    const { data, error } = await insforge.database.from('portfolio_content').select('*').limit(1);
    if (!error && Array.isArray(data) && data[0]) return { ...fallbackContent, ...data[0] };
  }

  if (supabase) {
    const { data, error } = await supabase.from('portfolio_content').select('*').limit(1).maybeSingle();
    if (!error && data) return { ...fallbackContent, ...data };
  }

  return fallbackContent;
}

export async function savePortfolioContent(content: PortfolioContent) {
  if (insforge) {
    const { data, error } = await insforge.database
      .from('portfolio_content')
      .upsert({ id: 'main', ...content })
      .select();
    if (!error) return { provider: 'insforge' as const, data };
  }

  if (supabase) {
    const { data, error } = await supabase
      .from('portfolio_content')
      .upsert({ id: 'main', ...content })
      .select();
    if (!error) return { provider: 'supabase' as const, data };
    throw error;
  }

  throw new Error('Configura InsForge o Supabase para guardar cambios.');
}