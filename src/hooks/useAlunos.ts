import { useQuery } from "@tanstack/react-query";

import { userService } from "@/services/user.service";
import type { User } from "@/types/user.types";

export function useAlunos() {
  return useQuery<User[]>({
    queryKey: ["alunos"],

    queryFn: async () => {
      const { data, error } = await userService.getAlunos();

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  });
}