"use client";

import { ShieldCheck, Users, UserPlus } from "lucide-react";

import { usePendingUsers } from "@/hooks/usePendingUsers";
import { useActiveUsers } from "@/hooks/useActiveUsers";

export default function AdminHero() {
  const { data: pendingUsers } =
    usePendingUsers();

  const { data: activeUsers } =
    useActiveUsers();

  const totalPendentes =
    pendingUsers?.length ?? 0;

  const totalAtivos =
    activeUsers?.length ?? 0;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-sidebar p-8 shadow-xl">
      <div
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-[80px]"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-6" />
          </div>

          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Administração
            </h1>

            <p className="mt-2 text-lg text-foreground/70">
              Aprovação e gerenciamento de usuários do sistema.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/20 p-5">
            <div className="flex items-center gap-3">
              <UserPlus className="size-5 text-amber-400" />

              <span className="text-sm text-white/70">
                Usuários Pendentes
              </span>
            </div>

            <p className="mt-2 text-3xl font-bold text-white">
              {totalPendentes}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-5">
            <div className="flex items-center gap-3">
              <Users className="size-5 text-emerald-400" />

              <span className="text-sm text-white/70">
                Usuários Ativos
              </span>
            </div>

            <p className="mt-2 text-3xl font-bold text-white">
              {totalAtivos}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}