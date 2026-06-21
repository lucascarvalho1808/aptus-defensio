"use client";

import { useEffect, useState } from "react";

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

export default function TemasTable() {
  const [temas, setTemas] = useState<Tema[]>([]);

  async function carregarTemas() {
    const { data } = await temaService.getTemas();

    if (data) {
      setTemas(data as Tema[]);
    }
  }

  async function removerTema(id: string) {
    await temaService.deleteTema(id);

    carregarTemas();
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void carregarTemas();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>IDENTIFICADOR</TableHead>
          <TableHead>NOME DOS TEMAS</TableHead>
          <TableHead>AÇÕES</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {temas.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3}>
              Nenhum tema cadastrado.
            </TableCell>
          </TableRow>
        ) : (
          temas.map((tema, index) => (
            <TableRow key={tema.id}>
              <TableCell>
                #TM-{index + 1}
              </TableCell>

              <TableCell>
                {tema.titulo}
              </TableCell>

              <TableCell className="text-center">
                <Button
                  variant="destructive"
                  onClick={() => removerTema(tema.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
