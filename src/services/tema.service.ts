import { supabase } from "@/lib/supabase";

export const propostaService = {
  async create(data: any) {
    return supabase
      .from("propostas")
      .insert(data);
  },

  async getAll() {
    return supabase
      .from("propostas")
      .select("*");
  },

  async getByAluno(alunoId: string) {
    return supabase
      .from("propostas")
      .select("*")
      .eq("aluno_id", alunoId);
  }
};