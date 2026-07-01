import { useQuery } from "@tanstack/react-query";

import { propostaService } from "@/services/proposta.service";

import type { Proposta } from "@/types/proposta.types";

export function useProposta(alunoId?: string) {
  return useQuery({
    queryKey: ["proposta", alunoId],

    enabled: Boolean(alunoId),

    queryFn: async (): Promise<Proposta | null> => {
      const { data, error } = await propostaService.getByAluno(
        alunoId as string
      );

      if (error) {
        throw error;
      }

      return data;
    },
  });
}