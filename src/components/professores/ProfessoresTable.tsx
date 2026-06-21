"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import type { User } from "@/types/user.types";
import { GraduationCap, Loader2 } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const { data } = await userService.getProfessores();
        if (data) {
          setProfessores(data as User[]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-white/10 bg-black/20">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="font-semibold text-primary">MATRÍCULA</TableHead>
            <TableHead className="font-semibold text-primary">NOME COMPLETO</TableHead>
            <TableHead className="font-semibold text-primary">E-MAIL INSTITUCIONAL</TableHead>
            <TableHead className="font-semibold text-primary text-center">STATUS</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center text-foreground/50">
                  <Loader2 className="mb-2 size-6 animate-spin text-primary" />
                  <span className="text-sm font-medium">Carregando corpo docente...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : professores.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-48 text-center">
                <div className="flex flex-col items-center justify-center text-foreground/50">
                  <GraduationCap className="mb-3 size-10 text-white/20" />
                  <p className="text-base font-medium text-white/70">Nenhum professor encontrado</p>
                  <p className="text-sm">Não há professores ativos cadastrados no momento.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            professores.map((professor) => (
              <TableRow 
                key={professor.id} 
                className="border-white/5 transition-colors hover:bg-white/5"
              >
                <TableCell className="font-mono text-sm text-white/80">
                  {professor.matricula ?? "---"}
                </TableCell>

                <TableCell className="font-medium text-white">
                  {professor.nome}
                </TableCell>

                <TableCell className="text-white/70">
                  {professor.email}
                </TableCell>

                <TableCell className="text-center">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    Ativo
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