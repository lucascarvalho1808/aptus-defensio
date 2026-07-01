"use client";

import { useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";

export function useSession() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    let isMounted = true;

    async function syncSession(session: Session | null) {
      if (!session?.user) {
        clearAuth();
        return;
      }

      const { data: profile, error } = await authService.getUserProfile(
        session.user.id
      );

      if (!isMounted) return;

      if (error || !profile) {
        clearAuth();
        return;
      }

      const accessError = authService.getProfileAccessError(profile);

      if (accessError) {
        await authService.signOut();
        clearAuth();
        return;
      }

      setAuth(session.user, profile.role);
    }

    async function loadSession() {
      const { data, error } = await authService.getSession();

      if (!isMounted) return;

      if (error) {
        clearAuth();
        return;
      }

      await syncSession(data.session);
    }

    void loadSession();

    const {
      data: { subscription },
    } = authService.onAuthStateChange((session) => {
      void syncSession(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [setAuth, clearAuth]);
}
