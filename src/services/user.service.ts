import { supabase } from "@/lib/supabase";
import type { Tables } from "@/database.types";

export type UserDB = Tables<"users">;

const activeStatuses = ["ativo", "aprovado"];

export const userService = {
  async getProfessores() {
    return await supabase
      .from("users")
      .select("*")
      .eq("role", "professor")
      .in("status", activeStatuses);
  },

  async getAlunos() {
    return await supabase
      .from("users")
      .select("*")
      .eq("role", "aluno")
      .in("status", activeStatuses);
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
        status: "aprovado",
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
      .in("status", activeStatuses);
  },
};
