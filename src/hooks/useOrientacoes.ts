import { useQuery } from "@tanstack/react-query";

import { orientacaoService } from "@/services/orientacao.service";

import type { OrientacaoRecebida } from "@/services/orientacao.service";

export function useOrientacoes(
  professorId?: string
) {
  return useQuery<OrientacaoRecebida[]>({
    queryKey: [
      "orientacoes",
      professorId,
    ],

    enabled: !!professorId,

    queryFn: async () => {
      const { data, error } =
        await orientacaoService.getOrientacoesRecebidas(
          professorId as string
        );

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  });
}