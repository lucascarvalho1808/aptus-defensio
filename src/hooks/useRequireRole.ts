"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/useAuthStore";
import type { AuthRole } from "@/types/auth.types";

export function useRequireRole(allowedRoles: readonly AuthRole[]) {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  const isAuthorized = role ? allowedRoles.includes(role) : false;

  useEffect(() => {
    if (role && !isAuthorized) {
      router.replace("/dashboard");
    }
  }, [isAuthorized, role, router]);

  return {
    isAuthorized,
    role,
  };
}
