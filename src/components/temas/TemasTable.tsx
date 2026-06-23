"use client";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { toast } from "sonner";

import { useDeleteTema } from "@/hooks/useDeleteTema";
import { useTemas } from "@/hooks/useTemas";

export default function TemasTable() {
  const {
    data: temas = [],
    isLoading,
  } = useTemas();

  const deleteTemaMutation =
    useDeleteTema();

  async function removerTema(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Deseja realmente excluir este tema?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTemaMutation.mutateAsync(
        id
      );

      toast.success(
        "Tema removido com sucesso."
      );
    } catch {
      toast.error(
        "Erro ao remover tema."
      );
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            IDENTIFICADOR
          </TableHead>

          <TableHead>
            NOME DOS TEMAS
          </TableHead>

          <TableHead>
            AÇÕES
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={3}>
              Carregando temas...
            </TableCell>
          </TableRow>
        ) : temas.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3}>
              Nenhum tema cadastrado.
            </TableCell>
          </TableRow>
        ) : (
          temas.map(
            (tema, index) => (
              <TableRow
                key={tema.id}
              >
                <TableCell>
                  #TM-{index + 1}
                </TableCell>

                <TableCell>
                  {tema.titulo}
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="destructive"
                    disabled={
                      deleteTemaMutation.isPending
                    }
                    onClick={() =>
                      removerTema(
                        tema.id
                      )
                    }
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            )
          )
        )}
      </TableBody>
    </Table>
  );
}