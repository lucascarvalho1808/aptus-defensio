import {
  Calendar,
  FilePenLine,
  GraduationCap,
  Layers3,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type {
  Proposta,
  StatusProposta,
} from "@/types/proposta.types";

interface PropostaCardProps {
  proposta: Proposta;
  onEdit: () => void;
}

const statusClasses: Record<
  StatusProposta,
  string
> = {
  "Aguardando Orientador":
    "bg-amber-500/15 text-amber-500 border border-amber-500/20",

  Aceita:
    "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20",

  Recusada:
    "bg-red-500/15 text-red-500 border border-red-500/20",
};

export default function PropostaCard({
  proposta,
  onEdit,
}: PropostaCardProps) {
  const dataCriacao =
    proposta.created_at
      ? new Date(
          proposta.created_at
        ).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        )
      : "-";

  return (
    <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
      <CardHeader className="border-b border-white/5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl text-primary">
              Minha Proposta de TCC
            </CardTitle>

            <p className="mt-2 text-sm text-muted-foreground">
              Sua proposta foi registrada no
              sistema. Você pode consultar os
              dados abaixo ou realizar
              alterações enquanto ela não for
              avaliada.
            </p>
          </div>

          <span
            className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-medium ${
              statusClasses[
                proposta.status ??
                  "Aguardando Orientador"
              ]
            }`}
          >
            {proposta.status ??
              "Aguardando Orientador"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 pt-6">
        <section className="grid gap-6 md:grid-cols-2">
          <InfoItem
            icon={
              <FilePenLine className="size-5 text-primary" />
            }
            label="Título"
            value={proposta.titulo}
          />

          <InfoItem
            icon={
              <Layers3 className="size-5 text-primary" />
            }
            label="Tipo"
            value={
              proposta.tipo ??
              "-"
            }
          />

          <InfoItem
            icon={
              <UserRound className="size-5 text-primary" />
            }
            label="Orientador"
            value={
              proposta.orientador ??
              "-"
            }
          />

          <InfoItem
            icon={
              <GraduationCap className="size-5 text-primary" />
            }
            label="Linha de Pesquisa"
            value={
              proposta.linha_pesquisa ??
              "-"
            }
          />

          <InfoItem
            icon={
              <Calendar className="size-5 text-primary" />
            }
            label="Data de Cadastro"
            value={dataCriacao}
          />
        </section>

        <div className="border-t border-white/5 pt-6">
          <Button
            onClick={onEdit}
            className="bg-primary hover:bg-primary/90"
          >
            <FilePenLine className="mr-2 size-4" />

            Editar Proposta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-white/5 bg-background/20 p-4">
      <div className="mt-1">
        {icon}
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="text-sm font-medium leading-relaxed">
          {value}
        </p>
      </div>
    </div>
  );
}