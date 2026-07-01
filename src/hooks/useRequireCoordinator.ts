import { useRequireRole } from "@/hooks/useRequireRole";

export function useRequireCoordinator() {
  return useRequireRole(["coordenador"]);
}
