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

  async approveUser(userId: string) {
    return await supabase
      .from("users")
      .update({
        status: "ativo",
      })
      .eq("id", userId);
  },

  async rejectUser(userId: string) {
    return await supabase
      .from("users")
      .delete()
      .eq("id", userId);
  },

  async getActiveUsers() {
  return await supabase
    .from("users")
    .select("*")
    .eq("status", "ativo");
},
};