"use client";

import { Inbox } from "lucide-react";

import FilaOrientacoesTable from "@/components/orientacao/FilaOrientacoesTable";
import { useRequireProfessor } from "@/hooks/useRequireProfessor";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrientacoesRecebidasPage() {
  const { isAuthorized } = useRequireProfessor();

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-sidebar/50 p-8">
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Inbox className="size-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#8b2521] dark:text-white sm:text-4xl">
              Solicitações Recebidas
            </h1>
            <p className="mt-2 text-lg text-foreground/70">
              Acompanhe os pedidos de orientação enviados pelos alunos.
            </p>
          </div>
        </div>
      </section>

      <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
        <CardHeader className="border-b border-white/5 pb-5">
          <CardTitle className="font-heading text-xl text-primary">
            Fila de Solicitações
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <FilaOrientacoesTable />
        </CardContent>
      </Card>
    </div>
  );
}
