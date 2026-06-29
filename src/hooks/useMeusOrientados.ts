import { useEffect } from "react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";
import {
  orientacaoService,
  type MeuOrientado,
} from "@/services/orientacao.service";

export function useMeusOrientados(professorId?: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!professorId) return;

    const channel = supabase
      .channel(`meus-orientados-${professorId}`)
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
            queryKey: ["meus-orientados", professorId],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [professorId, queryClient]);

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