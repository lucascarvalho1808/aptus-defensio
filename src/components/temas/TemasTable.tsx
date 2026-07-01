"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useDeleteTema } from "@/hooks/useDeleteTema";
import { useTemas } from "@/hooks/useTemas";

export default function TemasTable() {
  const {
    data: temas = [],
    isLoading,
  } = useTemas();

  const deleteTemaMutation = useDeleteTema();

  const [temaSelecionado, setTemaSelecionado] = useState<string | null>(null);

  async function removerTema(id: string) {
    if (deleteTemaMutation.isPending) return;

    const confirmado = window.confirm(
      "Deseja realmente excluir este tema?"
    );

    if (!confirmado) return;

    try {
      setTemaSelecionado(id);

      await deleteTemaMutation.mutateAsync(id);

      toast.success("Tema removido com sucesso.");
    } catch {
      toast.error("Erro ao remover tema.");
    } finally {
      setTemaSelecionado(null);
    }
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-black/20">
      <Table>
        <TableHeader className="bg-neutral-100 dark:bg-white/5">
          <TableRow className="border-neutral-200 hover:bg-transparent dark:border-white/10">
            <TableHead className="font-semibold text-primary">
              IDENTIFICADOR
            </TableHead>

            <TableHead className="font-semibold text-primary">
              NOME DO TEMA
            </TableHead>

            <TableHead className="text-center font-semibold text-primary">
              AÇÕES
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="py-10 text-center text-foreground/60"
              >
                Carregando temas...
              </TableCell>
            </TableRow>
          ) : temas.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="py-10 text-center text-foreground/60"
              >
                Nenhum tema cadastrado.
              </TableCell>
            </TableRow>
          ) : (
            temas.map((tema, index) => (
              <TableRow
                key={tema.id}
                className="border-neutral-200 transition-colors hover:bg-neutral-100 dark:border-white/5 dark:hover:bg-white/5"
              >
                <TableCell className="font-mono text-sm text-foreground/80">
                  #TM-{String(index + 1).padStart(3, "0")}
                </TableCell>

                <TableCell className="font-medium text-foreground">
                  {tema.titulo}
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    disabled={
                      deleteTemaMutation.isPending &&
                      temaSelecionado === tema.id
                    }
                    onClick={() => removerTema(tema.id)}
                  >
                    <Trash2 className="size-4" />

                    {deleteTemaMutation.isPending &&
                    temaSelecionado === tema.id
                      ? "Excluindo..."
                      : "Excluir"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}