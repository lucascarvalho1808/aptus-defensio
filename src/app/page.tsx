import { BookOpenCheck, GraduationCap, LayoutDashboard } from 'lucide-react';

const summaryCards = [
  {
    title: 'Propostas',
    value: '12',
    description: 'Projetos em acompanhamento',
    icon: BookOpenCheck,
  },
  {
    title: 'Bancas',
    value: '4',
    description: 'Defesas previstas',
    icon: GraduationCap,
  },
  {
    title: 'Pendências',
    value: '3',
    description: 'Itens aguardando revisão',
    icon: LayoutDashboard,
  },
];

export default function Home() {
  return (
    <section className="flex flex-1 flex-col gap-8">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_16px_40px_rgba(0,0,0,0.12)] md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[1px] text-primary">
          Visão geral
        </p>
        <h2 className="font-heading mt-3 max-w-3xl text-3xl font-bold tracking-[1px] text-card-foreground md:text-4xl">
          Acompanhe o fluxo de trabalhos acadêmicos em um só painel.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Este dashboard inicial prepara o espaço central da aplicação para os
          próximos módulos de autenticação, propostas, temas e gestão de
          usuários.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <strong className="mt-2 block text-3xl font-bold text-card-foreground">
                    {card.value}
                  </strong>
                </div>
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-[0_4px_10px_rgba(139,37,33,0.3)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                {card.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
