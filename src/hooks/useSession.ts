"use client";

import { useEffect } from "react";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";

// Atualiza a sessão do usuário
export function useSession() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    async function loadSession() {
      const { data } = await authService.getSession();

      setUser(data.session?.user ?? null);
    }

    loadSession();

    const {
      data: { subscription },
    } = authService.onAuthStateChange((session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);
}