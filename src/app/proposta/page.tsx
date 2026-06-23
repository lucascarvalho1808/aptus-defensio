"use client";

import PropostaHero from "@/components/proposta/PropostaHero";
import PropostaForm from "@/components/proposta/PropostaForm";
import PropostaCard from "@/components/proposta/PropostaCard";

import { useAuthStore } from "@/store/useAuthStore";

import { Loader2 } from "lucide-react";

import { useProposta } from "@/hooks/useProposta";

export default function PropostaPage() {
  const user = useAuthStore(
    (state) => state.user
  );

  const {
    data: proposta,
    isLoading,
  } = useProposta(user?.id);

  return (
    <div className="flex flex-col gap-8">
      <PropostaHero />

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : proposta ? (
        <PropostaCard proposta={proposta} />
      ) : (
        <PropostaForm />
      )}
    </div>
  );
}