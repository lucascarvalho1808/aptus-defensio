"use client";

import { useState } from "react";

import AppShell from "@/components/layout/AppShell";

import TemasHero from "@/components/temas/TemasHero";
import TemaForm from "@/components/temas/TemaForm";
import TemasTable from "@/components/temas/TemasTable";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TemasPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  function atualizarTabela() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <TemasHero />

        <Card>
          <CardHeader>
            <CardTitle>
              Adicionar Novo Tema
            </CardTitle>
          </CardHeader>

          <CardContent>
            <TemaForm
              onCreated={atualizarTabela}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Temas Cadastrados
            </CardTitle>
          </CardHeader>

          <CardContent>
            <TemasTable key={refreshKey} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}