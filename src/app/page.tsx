import { BookOpenCheck, GraduationCap, LayoutDashboard } from 'lucide-react';
import { supabase } from "@/lib/supabase";

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
      <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[1px] text-[#c9a063]">
          Visão geral
        </p>
        <h2 className="font-heading mt-3 max-w-3xl text-3xl font-bold tracking-[1px] text-white md:text-4xl">
          Acompanhe o fluxo de trabalhos acadêmicos em um só painel.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
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
              className="rounded-2xl border border-[#c9a063]/15 bg-[#1a2c41] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white/55">{card.title}</p>
                  <strong className="mt-2 block text-3xl font-bold text-white">
                    {card.value}
                  </strong>
                </div>
                <span className="flex size-11 items-center justify-center rounded-xl bg-[#8b2521] text-white shadow-[0_4px_10px_rgba(139,37,33,0.3)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-5 text-sm leading-6 text-white/60">
                {card.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
