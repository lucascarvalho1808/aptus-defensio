import { useRequireRole } from "@/hooks/useRequireRole";

export function useRequireProfessor() {
  return useRequireRole(["professor", "coordenador"]);
}
