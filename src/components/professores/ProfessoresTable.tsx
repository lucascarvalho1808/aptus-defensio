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

export default function ProfessoresTable() {
  const [professores, setProfessores] = useState<User[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await userService.getProfessores();

      if (data) {
        setProfessores(data as User[]);
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
        {professores.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              Nenhum professor ativo encontrado.
            </TableCell>
          </TableRow>
        ) : (
          professores.map((professor) => (
            <TableRow key={professor.id}>
              <TableCell>
                {professor.matricula ?? "---"}
              </TableCell>

              <TableCell>{professor.nome}</TableCell>

              <TableCell>{professor.email}</TableCell>

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