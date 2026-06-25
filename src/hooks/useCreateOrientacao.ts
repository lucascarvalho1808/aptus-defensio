import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  orientacaoService,
  type NovaOrientacao,
} from "@/services/orientacao.service";

export function useCreateOrientacao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orientacao: NovaOrientacao) => {
      const { data, error } =
        await orientacaoService.create(orientacao);

      if (error) throw error;

      return data;
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          "orientacoes",
          variables.aluno_id,
        ],
      });
    },
  });
}
