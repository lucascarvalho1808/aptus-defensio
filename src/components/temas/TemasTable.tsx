"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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
    <div className="w-full overflow-x-auto rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-black/20">
      <Table>
        <TableHeader className="bg-neutral-100 dark:bg-white/5">
          <TableRow className="border-neutral-200 dark:border-white/10 hover:bg-transparent">
            <TableHead className="font-semibold text-primary">
              IDENTIFICADOR
            </TableHead>

            <TableHead className="font-semibold text-primary">
              NOME DOS TEMAS
            </TableHead>

            <TableHead className="text-center font-semibold text-primary">
              AÇÕES
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="py-10 text-center text-foreground/60">
                Carregando temas...
              </TableCell>
            </TableRow>
          ) : temas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="py-10 text-center text-foreground/60">
                Nenhum tema cadastrado.
              </TableCell>
            </TableRow>
          ) : (
            temas.map((tema, index) => (
              <TableRow 
                key={tema.id}
                className="border-neutral-200 dark:border-white/5 transition-colors hover:bg-neutral-100 dark:hover:bg-white/5"
              >
                <TableCell className="font-mono text-sm text-foreground/80">
                  #TM-{index + 1}
                </TableCell>

                <TableCell className="font-medium text-foreground">
                  {tema.titulo}
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center items-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-1.5 h-8 px-3"
                      disabled={deleteTemaMutation.isPending}
                      onClick={() => removerTema(tema.id)}
                    >
                      <Trash2 className="size-3.5" />
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}