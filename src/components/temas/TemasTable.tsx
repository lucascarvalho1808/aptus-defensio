"use client";

import {
  useEffect,
  useState,
} from "react";

import { temaService } from "@/services/tema.service";

import type { Tema } from "@/types/tema.types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

export default function TemasTable() {
  const [temas, setTemas] =
    useState<Tema[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function carregarTemas() {
    try {
      setLoading(true);

      const { data, error } =
        await temaService.getTemas();

      if (error) {
        throw error;
      }

      setTemas(
        (data ?? []) as Tema[]
      );
    } catch {
      toast.error(
        "Erro ao carregar temas."
      );
    } finally {
      setLoading(false);
    }
  }

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
      const { error } =
        await temaService.deleteTema(
          id
        );

      if (error) {
        throw error;
      }

      toast.success(
        "Tema removido com sucesso."
      );

      await carregarTemas();
    } catch {
      toast.error(
        "Erro ao remover tema."
      );
    }
  }

  useEffect(() => {
    void carregarTemas();
  }, []);

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
        {loading ? (
          <TableRow>
            <TableCell
              colSpan={3}
            >
              Carregando temas...
            </TableCell>
          </TableRow>
        ) : temas.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={3}
            >
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