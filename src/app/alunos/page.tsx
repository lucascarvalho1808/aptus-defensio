"use client";

import AlunosTable from "@/components/alunos/AlunosTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRequireCoordinator } from "@/hooks/useRequireCoordinator";
import { Users } from "lucide-react";

export default function AlunosPage() {
  const { isAuthorized } = useRequireCoordinator();

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-sidebar p-8 shadow-xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-[80px]" aria-hidden="true" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="size-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#8b2521] dark:text-white sm:text-4xl">
              Alunos
            </h1>
            <p className="mt-2 text-lg text-foreground/70">
              Gestão e acompanhamento dos discentes cadastrados.
            </p>
          </div>
        </div>
      </section>

      <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
        <CardHeader className="border-b border-white/5 pb-5">
          <CardTitle className="font-heading text-xl text-primary">
            Alunos ativos no sistema
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <AlunosTable />
        </CardContent>
      </Card>
    </div>
  );
}
