"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { authService } from "@/services/auth.service";

// Atualiza a sessão do usuário
export function useSession() {
  const setUser = useAuthStore((state) => state.setRole);

  useEffect(() => {
    async function loadSession() {
      const { data } = await authService.getSession();

      setUser(data.session?.user ?? null);
    }

    loadSession();
  }, [setUser]);
}