import { createClient } from "@supabase/supabase-js";

// URL do projeto
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Chave pública
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente do Supabase
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);