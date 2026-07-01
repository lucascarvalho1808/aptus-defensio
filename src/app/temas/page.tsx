"use client";

import TemasHero from "@/components/temas/TemasHero";
import TemaForm from "@/components/temas/TemaForm";
import TemasTable from "@/components/temas/TemasTable";

import { useRequireProfessor } from "@/hooks/useRequireProfessor";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TemasPage() {
  const { isAuthorized } = useRequireProfessor();

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <TemasHero />

      <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="font-heading text-xl text-primary">
            Cadastrar Novo Tema
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <TemaForm />
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="font-heading text-xl text-primary">
            Temas Cadastrados
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <TemasTable />
        </CardContent>
      </Card>
    </div>
  );
}