import { supabase } from "@/lib/supabase";
import type { TemaInsert } from "@/types/tema.types";

export const temaService = {
  async getTemas() {
    return supabase
      .from("temas")
      .select("*")
      .order("created_at", { ascending: false });
  },

  async createTema(titulo: string) {
    const novoTema: TemaInsert = {
      titulo,
    };

    return supabase
      .from("temas")
      .insert(novoTema);
  },

  async deleteTema(id: string) {
    return supabase
      .from("temas")
      .delete()
      .eq("id", id);
  },
};