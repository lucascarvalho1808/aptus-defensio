"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/useAuthStore";

const authorizedRoles = ["professor", "coordenador"];

export function useRequireProfessor() {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  const isAuthorized = role ? authorizedRoles.includes(role) : false;

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
