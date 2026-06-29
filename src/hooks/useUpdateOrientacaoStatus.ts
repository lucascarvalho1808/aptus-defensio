import { useMutation, useQueryClient } from "@tanstack/react-query";

import { orientacaoService } from "@/services/orientacao.service";

export function useUpdateOrientacaoStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "aceita" | "recusada";
    }) => {
      const { data, error } =
        await orientacaoService.updateStatus(id, status);

      if (error) {
        throw error;
      }

      return data;
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          "orientacoes",
          variables.id,
        ],
      });

      await queryClient.invalidateQueries({
        queryKey: ["orientacoes"],
      });
    },
  });
}