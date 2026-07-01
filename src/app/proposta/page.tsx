"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import PropostaHero from "@/components/proposta/PropostaHero";
import PropostaForm from "@/components/proposta/PropostaForm";
import PropostaCard from "@/components/proposta/PropostaCard";

import { useRequireRole } from "@/hooks/useRequireRole";
import { useProposta } from "@/hooks/useProposta";
import { useAuthStore } from "@/store/useAuthStore";

export default function PropostaPage() {
  const { isAuthorized } = useRequireRole(["aluno"]);

  const user = useAuthStore((state) => state.user);

  const [isEditing, setIsEditing] =
    useState(false);

  const {
    data: proposta,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useProposta(user?.id);

  if (!isAuthorized) {
    return null;
  }

  const mostrarFormulario =
    !proposta || isEditing;

  return (
    <div className="flex flex-col gap-8">
      <PropostaHero />

      {(isLoading || isFetching) && (
        <section className="flex items-center justify-center rounded-2xl border border-border bg-card py-20 shadow-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="size-6 animate-spin text-primary" />
            <span>
              Carregando proposta...
            </span>
          </div>
        </section>
      )}

      {!isLoading &&
        !isFetching &&
        isError && (
          <section className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
            <h2 className="mb-2 text-lg font-semibold text-destructive">
              Erro ao carregar proposta
            </h2>

            <p className="mb-6 text-sm text-muted-foreground">
              Não foi possível consultar
              sua proposta de TCC.
            </p>

            <button
              onClick={() => refetch()}
              className="rounded-lg bg-primary px-6 py-2 text-primary-foreground transition hover:bg-primary/90"
            >
              Tentar novamente
            </button>
          </section>
        )}

      {!isLoading &&
        !isFetching &&
        !isError &&
        mostrarFormulario && (
          <PropostaForm
            proposta={proposta ?? undefined}
            onSuccess={() =>
              setIsEditing(false)
            }
          />
        )}

      {!isLoading &&
        !isFetching &&
        !isError &&
        proposta &&
        !isEditing && (
          <PropostaCard
            proposta={proposta}
            onEdit={() =>
              setIsEditing(true)
            }
          />
        )}
    </div>
  );
}