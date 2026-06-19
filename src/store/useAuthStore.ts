import { create } from "zustand";
import { User } from "@supabase/supabase-js";

// Usuário autenticado
interface AuthState {
  role: User | null;

  setRole: (role: User | null) => void;
}

// Atualiza usuário
export const useAuthStore = create<AuthState>((set) => ({
  role: null,

  setRole: (role) => set({ role }),
}));