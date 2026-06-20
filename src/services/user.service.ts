import { supabase } from "@/lib/supabase";
import type { UserData } from "@/types/user.types";

// Serviço responsável pelas consultas de usuários
export const userService = {
  // Busca usuários pendentes
  async getPendingUsers(): Promise<UserData[]> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("status", "pendente")
      .order("created_at");

    if (error) {
      throw error;
    }

    return data;
  },
};