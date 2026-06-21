import { supabase } from "@/lib/supabase";
import type {
  NovaProposta,
} from "@/types/proposta.types";

export const propostaService = {
  async create(data: NovaProposta) {
    return supabase
      .from("propostas")
      .insert(data)
      .select()
      .single();
  },

  async getByAluno(
    alunoId: string
  ) {
    return supabase
      .from("propostas")
      .select("*")
      .eq("aluno_id", alunoId);
  },

  async getAll() {
    return supabase
      .from("propostas")
      .select("*");
  },
};