"use client";

import { useState } from "react";

import TemaForm from "@/components/temas/TemaForm";
import TemasTable from "@/components/temas/TemasTable";
import TemasHero from "@/components/temas/TemasHero";

import { useRequireCoordinator } from "@/hooks/useRequireCoordinator";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TemasPage() {
  const [refreshKey, setRefreshKey] =
    useState(0);

  const { isAuthorized } =
    useRequireCoordinator();

  if (!isAuthorized) {
    return null;
  }

  function atualizarTabela() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <div className="flex flex-col gap-8">
      <TemasHero />

      <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
        <CardHeader className="border-b border-white/5 pb-5">
          <CardTitle className="font-heading text-xl text-primary">
            Adicionar Novo Tema
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <TemaForm
            onCreated={atualizarTabela}
          />
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
        <CardHeader className="border-b border-white/5 pb-5">
          <CardTitle className="font-heading text-xl text-primary">
            Temas Cadastrados
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <TemasTable
            key={refreshKey}
          />
        </CardContent>
      </Card>
    </div>
  );
}