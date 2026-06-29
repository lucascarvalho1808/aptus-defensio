"use client";

import { GraduationCap } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMeusOrientados } from "@/hooks/useMeusOrientados";
import { useAuthStore } from "@/store/useAuthStore";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default function MeusOrientadosTable() {
  const user = useAuthStore((state) => state.user);

  const { data: orientados = [], isLoading } = useMeusOrientados(user?.id);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/20 p-10">
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <div className="rounded-full bg-primary/10 p-4">
            <GraduationCap
              className="size-8 text-primary"
              aria-hidden="true"
            />
          </div>

          <p className="text-sm text-white/60">
            Carregando orientados...
          </p>
        </div>
      </div>
    );
  }

  if (orientados.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/20 p-10">
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <div className="rounded-full bg-primary/10 p-4">
            <GraduationCap
              className="size-8 text-primary"
              aria-hidden="true"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              Nenhum orientado encontrado
            </h3>

            <p className="mt-2 text-sm text-white/60">
              Quando houver orientações aceitas, seus alunos aparecerão aqui.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-white/10 bg-black/20">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="font-semibold text-primary">
              ALUNO
            </TableHead>

            <TableHead className="font-semibold text-primary">
              E-MAIL
            </TableHead>

            <TableHead className="font-semibold text-primary">
              MATRÍCULA
            </TableHead>

            <TableHead className="font-semibold text-primary">
              ACEITO EM
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orientados.map((orientado) => (
            <TableRow
              key={orientado.id}
              className="border-white/5 transition-colors hover:bg-white/5"
            >
              <TableCell className="font-medium text-white">
                {orientado.aluno?.nome ?? "-"}
              </TableCell>

              <TableCell className="text-white/70">
                {orientado.aluno?.email ?? "-"}
              </TableCell>

              <TableCell className="text-white/70">
                {orientado.aluno?.matricula ?? "-"}
              </TableCell>

              <TableCell className="text-white/70">
                {orientado.created_at
                  ? dateFormatter.format(new Date(orientado.created_at))
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}