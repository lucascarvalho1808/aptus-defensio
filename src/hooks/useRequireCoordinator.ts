"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/useAuthStore";

export function useRequireCoordinator() {
  const router = useRouter();

  const role = useAuthStore(
    (state) => state.role
  );

  useEffect(() => {
    if (role && role !== "coordenador") {
      router.replace("/dashboard");
    }
  }, [role, router]);

  return {
    isAuthorized: role === "coordenador",
    role,
  };
}