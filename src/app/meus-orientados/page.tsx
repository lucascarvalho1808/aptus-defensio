import MeusOrientadosTable from "@/components/orientacao/MeusOrientadosTable";

export default function MeusOrientadosPage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-sidebar p-8 shadow-xl md:p-12">
        <div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-[80px]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            MEUS <span className="text-primary">ORIENTADOS</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-foreground/70">
            Visualize todos os alunos sob sua orientação.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-heading text-2xl font-semibold tracking-wide text-primary">
          Lista de Orientados
        </h2>

        <MeusOrientadosTable />
      </section>
    </div>
  );
}