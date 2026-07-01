export default function TemasHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-sidebar p-8 shadow-xl">
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/5 blur-[80px]"
      />

      <div className="relative z-10">
        <h1 className="font-heading mb-3 text-3xl font-bold tracking-tight text-[#8b2521] dark:text-white sm:text-4xl">
          Banco de Áreas de Estudo
        </h1>

        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Cadastre, organize e gerencie os temas disponíveis para os projetos de
          TCC. Os temas cadastrados poderão ser utilizados posteriormente pelos
          alunos durante a elaboração de propostas de orientação.
        </p>
      </div>
    </section>
  );
}