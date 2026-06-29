import { supabase } from "@/lib/supabase";
import type { Database } from "@/database.types";

export type NovaOrientacao =
  Database["public"]["Tables"]["orientacoes"]["Insert"];

export type OrientacaoRecebida =
  Database["public"]["Tables"]["orientacoes"]["Row"] & {
    aluno: {
      nome: string;
    } | null;
  };

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

  async getOrientacoesRecebidas(professorId: string) {
    return supabase
      .from("orientacoes")
      .select(`
        *,
        aluno:users!orientacoes_aluno_id_fkey(
          nome
        )
      `)
      .eq("professor_id", professorId)
      .eq("status", "pendente")
      .order("created_at", {
        ascending: false,
      });
  },
};