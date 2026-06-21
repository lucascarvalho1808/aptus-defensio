import { GraduationCap } from "lucide-react";

export default function ProfessoresHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-sidebar p-8 shadow-xl">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-[80px]" aria-hidden="true" />
      
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <GraduationCap className="size-6" aria-hidden="true" />
        </div>
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Corpo Docente
          </h1>
          <p className="mt-2 text-lg text-foreground/70 sm:max-w-2xl text-balance">
            Visualize e gerencie os professores ativos autorizados a orientar projetos e participar de bancas.
          </p>
        </div>
      </div>
    </section>
  );
}