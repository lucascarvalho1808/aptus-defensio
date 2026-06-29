"use client";

import { GraduationCap } from "lucide-react";

export default function MeusOrientadosTable() {
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