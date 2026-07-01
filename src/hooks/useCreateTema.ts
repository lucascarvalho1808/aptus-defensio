import { useMutation, useQueryClient } from "@tanstack/react-query";

import { temaService } from "@/services/tema.service";
import type { TemaInsert } from "@/types/tema.types";

export function useCreateTema() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TemaInsert) => {
      const { data: tema, error } =
        await temaService.createTema(data);

      if (error) {
        throw error;
      }

      return tema;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["temas"],
      });
    },
  });
}