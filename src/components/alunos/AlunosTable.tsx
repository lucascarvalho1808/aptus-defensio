"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import type { User } from "@/types/user.types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AlunosTable() {
  const [alunos, setAlunos] = useState<User[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await userService.getAlunos();

      if (data) {
        setAlunos(data as User[]);
      }
    }

    load();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>MATRÍCULA</TableHead>
          <TableHead>NOME COMPLETO</TableHead>
          <TableHead>E-MAIL ACADÊMICO</TableHead>
          <TableHead>STATUS</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {alunos.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              Nenhum aluno ativo encontrado.
            </TableCell>
          </TableRow>
        ) : (
          alunos.map((aluno) => (
            <TableRow key={aluno.id}>
              <TableCell>
                {aluno.matricula ?? "---"}
              </TableCell>

              <TableCell>{aluno.nome}</TableCell>

              <TableCell>{aluno.email}</TableCell>

              <TableCell>
                <span className="text-green-500 font-semibold">
                  ● ATIVO
                </span>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}