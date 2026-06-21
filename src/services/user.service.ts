import { supabase } from "@/lib/supabase";
import type { Tables } from "@/database.types";

export type UserDB = Tables<"users">;

export const userService = {
  async getProfessores() {
    return await supabase
      .from("users")
      .select("*")
      .eq("role", "professor")
      .eq("status", "ativo");
  },

  async getAlunos() {
    return await supabase
      .from("users")
      .select("*")
      .eq("role", "aluno")
      .eq("status", "ativo");
  },

  async getPendingUsers() {
    return await supabase
      .from("users")
      .select("*")
      .eq("status", "pendente");
  },
};