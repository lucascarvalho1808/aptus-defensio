import { useQuery } from "@tanstack/react-query";

import { userService } from "@/services/user.service";

export function useProfessores() {
  return useQuery({
    queryKey: ["professores"],

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