import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import type { AuthRole } from "@/types/auth.types";

interface AuthState {
  user: User | null;
  role: AuthRole | null;
  setAuth: (user: User | null, role: AuthRole | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  setAuth: (user, role) => set({ user, role }),
  clearAuth: () => set({ user: null, role: null }),
}));
