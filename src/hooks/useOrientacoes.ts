import { useEffect } from "react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";
import { orientacaoService } from "@/services/orientacao.service";

import type { OrientacaoRecebida } from "@/services/orientacao.service";

export function useOrientacoes(professorId?: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!professorId) return;

    const channel = supabase
      .channel(`orientacoes-professor-${professorId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orientacoes",
          filter: `professor_id=eq.${professorId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["orientacoes", professorId],
          });

          queryClient.invalidateQueries({
            queryKey: ["meus-orientados", professorId],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [professorId, queryClient]);

  return useQuery<OrientacaoRecebida[]>({
    queryKey: ["orientacoes", professorId],

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