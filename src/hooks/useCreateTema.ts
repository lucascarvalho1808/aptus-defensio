import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { temaService } from "@/services/tema.service";

export function useCreateTema() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      titulo: string
    ) => {
      const { error } =
        await temaService.createTema(
          titulo
        );

      if (error) {
        throw error;
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["temas"],
      });
    },
  });
}