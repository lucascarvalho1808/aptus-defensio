import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { propostaService } from "@/services/proposta.service";

import type {
  AtualizarProposta,
  Proposta,
} from "@/types/proposta.types";

interface UpdatePropostaPayload {
  id: string;
  alunoId: string;
  proposta: AtualizarProposta;
}

export function useUpdateProposta() {
  const queryClient = useQueryClient();

  return useMutation<
    Proposta,
    Error,
    UpdatePropostaPayload
  >({
    mutationFn: async ({
      id,
      proposta,
    }) => {
      const { data, error } =
        await propostaService.update(
          id,
          proposta
        );

      if (error) {
        throw error;
      }

      return data;
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          "proposta",
          variables.alunoId,
        ],
      });

      await queryClient.invalidateQueries({
        queryKey: ["propostas"],
      });
    },
  });
}