import { supabase } from "@/lib/supabase";
import type { Database } from "@/database.types";

export type NovaOrientacao =
  Database["public"]["Tables"]["orientacoes"]["Insert"];

export const orientacaoService = {
  async create(data: NovaOrientacao) {
    return supabase
      .from("orientacoes")
      .insert(data)
      .select()
      .single();
  },


async getProfessoresAtivos() {
    return supabase
      .from("users")
      .select("*")
      .eq("role", "professor")
      .eq("status", "ativo");
  },
};
