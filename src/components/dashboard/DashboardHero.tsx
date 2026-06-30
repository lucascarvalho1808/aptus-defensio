import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

export default function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-sidebar p-8 shadow-xl md:p-12">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-[80px]" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl">
        <h1 className="font-heading mb-4 text-3xl font-bold tracking-tight text-[#8b2521] dark:text-white sm:text-4xl md:text-5xl lg:text-balance">
          CONTROLE DE <span className="text-primary">DEFESA E PRAZOS</span>
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-foreground/70 sm:text-xl">
          Gestão inteligente e automatizada para programas de pós-graduação.
          O caminho seguro até a sua aprovação final.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button className="gap-2 bg-primary text-primary-foreground shadow-md transition-colors hover:bg-primary/90">
            <BookOpen className="size-4" aria-hidden="true" />
            Acessar o Sistema
          </Button>

          <Button variant="outline" className="gap-2 border-primary/50 bg-transparent text-primary transition-colors hover:bg-primary/10">
            Agendar Demonstração
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}