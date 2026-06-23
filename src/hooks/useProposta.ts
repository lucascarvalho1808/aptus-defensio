import { useQuery } from "@tanstack/react-query";

import { propostaService } from "@/services/proposta.service";

import type {
  Proposta,
} from "@/types/proposta.types";

export function useProposta(alunoId?: string) {
  return useQuery<Proposta | null>({
    queryKey: ["proposta", alunoId],

    enabled: !!alunoId,

    queryFn: async () => {
      const { data, error } =
        await propostaService.getByAluno(
          alunoId as string
        );

      if (error) {
        throw error;
      }

      return data as Proposta | null;
    },
  });
}