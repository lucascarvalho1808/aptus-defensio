import { useQuery } from "@tanstack/react-query";

import {
  orientacaoService,
  type MeuOrientado,
} from "@/services/orientacao.service";

export function useMeusOrientados(professorId?: string) {
  return useQuery<MeuOrientado[]>({
    queryKey: ["meus-orientados", professorId],

    enabled: !!professorId,

    queryFn: async () => {
      const { data, error } =
        await orientacaoService.getMeusOrientados(
          professorId as string
        );

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  });
}