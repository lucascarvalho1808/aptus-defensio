import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { propostaService } from "@/services/proposta.service";

import type {
  NovaProposta,
  Proposta,
} from "@/types/proposta.types";

export function useCreateProposta() {
  const queryClient =
    useQueryClient();

  return useMutation<
  Proposta,
  Error,
  NovaProposta
>({
  mutationFn: async (
    proposta: NovaProposta
  ) => {
    const { data, error } =
      await propostaService.create(
        proposta
      );

    if (error) {
      throw error;
    }

    return data as Proposta;
  },

  onSuccess: (_, variables) => {
    queryClient.invalidateQueries({
      queryKey: [
        "proposta",
        variables.aluno_id,
      ],
    });
  },
});
}