import { useQuery } from "@tanstack/react-query";

import { userService } from "@/services/user.service";

export function useAlunos() {
  return useQuery({
    queryKey: ["alunos"],

    queryFn: async () => {
      const { data, error } =
        await userService.getAlunos();

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  });
}