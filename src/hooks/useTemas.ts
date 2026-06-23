import { useQuery } from "@tanstack/react-query";

import { temaService } from "@/services/tema.service";

export function useTemas() {
  return useQuery({
    queryKey: ["temas"],

    queryFn: async () => {
      const { data, error } =
        await temaService.getTemas();

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  });
}