import { useMutation, useQueryClient } from "@tanstack/react-query";

import { temaService } from "@/services/tema.service";

export function useDeleteTema() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await temaService.deleteTema(id);

      if (error) {
        throw error;
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["temas"],
      });
    },
  });
}