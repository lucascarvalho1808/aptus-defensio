import { create } from 'zustand';

interface AuthStore {
  role: string | null;
  setRole: (role: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  role: 'aluno',
  setRole: (role) => set({ role }),
}));
