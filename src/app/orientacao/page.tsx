import OrientacaoForm from "@/components/orientacao/OrientacaoForm";
import { GraduationCap } from "lucide-react";

export default function OrientacaoPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-sidebar/50 p-8">
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <GraduationCap className="size-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Solicitar Orientação
            </h1>
            <p className="mt-2 text-lg text-foreground/70">
              Escolha um professor disponível e envie sua solicitação de orientação.
            </p>
          </div>
        </div>
      </section>

      <OrientacaoForm />
    </div>
  );
}