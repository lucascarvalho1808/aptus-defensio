import { useQuery } from "@tanstack/react-query";

import { userService } from "@/services/user.service";

import type { User } from "@/types/user.types";

export function useProfessores() {
  return useQuery<User[]>({
    queryKey: ["professores"],

    // Professores mudam com pouca frequência
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,

    queryFn: async () => {
      const { data, error } =
        await userService.getProfessores();

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  });
}