"use client";

import { useEffect, useState } from "react";

import PropostaHero from "@/components/proposta/PropostaHero";
import PropostaForm from "@/components/proposta/PropostaForm";
import PropostaCard from "@/components/proposta/PropostaCard";

import { propostaService } from "@/services/proposta.service";
import { useAuthStore } from "@/store/useAuthStore";

import type { Proposta } from "@/types/proposta.types";

import { Loader2 } from "lucide-react";

export default function PropostaPage() {

  const user = useAuthStore(
    (state) => state.user
  );

  const [loading, setLoading] =
    useState(true);

  const [proposta, setProposta] =
    useState<Proposta | null>(null);

  useEffect(() => {

    async function loadProposta() {

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } =
        await propostaService.getByAluno(
          user.id
        );

      if (!error && data) {
        setProposta(data as Proposta);
      }

      setLoading(false);
    }

    loadProposta();

  }, [user]);

  return (
    <div className="flex flex-col gap-8">

      <PropostaHero />

      {loading ? (
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