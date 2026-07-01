import { supabase } from "@/lib/supabase";

import type {
  Tema,
  TemaInsert,
} from "@/types/tema.types";

export const temaService = {
  async getTemas() {
    return await supabase
      .from("temas")
      .select("*")
      .order("titulo", {
        ascending: true,
      });
  },

  async createTema(data: TemaInsert) {
    return await supabase
      .from("temas")
      .insert(data)
      .select()
      .single();
  },

  async deleteTema(id: Tema["id"]) {
    return await supabase
      .from("temas")
      .delete()
      .eq("id", id);
  },
};