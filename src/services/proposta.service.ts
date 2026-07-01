import { supabase } from "@/lib/supabase";

import type {
  AtualizarProposta,
  NovaProposta,
  Proposta,
} from "@/types/proposta.types";

export const propostaService = {
  async create(
    proposta: NovaProposta
  ) {
    return supabase
      .from("propostas")
      .insert(proposta)
      .select()
      .single<Proposta>();
  },

  async update(
    id: string,
    proposta: AtualizarProposta
  ) {
    return supabase
      .from("propostas")
      .update(proposta)
      .eq("id", id)
      .select()
      .single<Proposta>();
  },

  async getByAluno(
    alunoId: string
  ) {
    return supabase
      .from("propostas")
      .select("*")
      .eq("aluno_id", alunoId)
      .maybeSingle<Proposta>();
  },

  async getById(id: string) {
    return supabase
      .from("propostas")
      .select("*")
      .eq("id", id)
      .single<Proposta>();
  },

  async getAll() {
    return supabase
      .from("propostas")
      .select("*")
      .order("created_at", {
        ascending: false,
      });
  },

  async remove(id: string) {
    return supabase
      .from("propostas")
      .delete()
      .eq("id", id);
  },
};