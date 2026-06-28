"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  MailOpen,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrientacaoRecebidaMock {
  id: string;
  aluno_nome: string;
  mensagem: string;
  status: "pendente";
  created_at: string;
}

const orientacoesMock: OrientacaoRecebidaMock[] = [
  {
    id: "ori-001",
    aluno_nome: "Ana Beatriz Lima",
    mensagem:
      "Professor, gostaria de solicitar sua orientação para um projeto sobre acessibilidade em plataformas educacionais. A proposta envolve mapear barreiras de uso em ambientes virtuais de aprendizagem e sugerir melhorias de interface para estudantes com deficiência visual.",
    status: "pendente",
    created_at: "2026-06-21T14:30:00.000Z",
  },
  {
    id: "ori-002",
    aluno_nome: "Carlos Eduardo Souza",
    mensagem:
      "Tenho interesse em desenvolver um trabalho sobre segurança da informação aplicada a sistemas acadêmicos. Minha ideia inicial é analisar riscos comuns em fluxos de autenticação e propor boas práticas para proteger dados sensíveis de alunos e professores.",
    status: "pendente",
    created_at: "2026-06-22T09:15:00.000Z",
  },
  {
    id: "ori-003",
    aluno_nome: "Mariana Costa Ribeiro",
    mensagem:
      "Gostaria de saber se o senhor poderia me orientar em um projeto de inteligência artificial para classificação de temas de TCC. A ideia é usar os textos das propostas para sugerir áreas de pesquisa e possíveis orientadores.",
    status: "pendente",
    created_at: "2026-06-23T18:45:00.000Z",
  },
];

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default function FilaOrientacoesTable() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedOrientacao, setSelectedOrientacao] =
    useState<OrientacaoRecebidaMock | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (selectedOrientacao && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [selectedOrientacao]);

  function closeDialog() {
    dialogRef.current?.close();
    setSelectedOrientacao(null);
  }

  function handleAccept() {
    toast.success("Aceito (Mock)");
  }

  function handleReject() {
    toast.info("Recusado (Mock)");
  }

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg border border-white/10 bg-black/20">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="font-semibold text-primary">
                ALUNO
              </TableHead>
              <TableHead className="font-semibold text-primary">
                DATA
              </TableHead>
              <TableHead className="font-semibold text-primary">
                STATUS
              </TableHead>
              <TableHead className="text-center font-semibold text-primary">
                AÇÕES
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orientacoesMock.map((orientacao) => (
              <TableRow
                key={orientacao.id}
                className="border-white/5 transition-colors hover:bg-white/5"
              >
                <TableCell className="font-medium text-white">
                  {orientacao.aluno_nome}
                </TableCell>
                <TableCell className="text-white/70">
                  {dateFormatter.format(new Date(orientacao.created_at))}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    <span
                      className="size-1.5 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    Pendente
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrientacao(orientacao)}
                    >
                      <MailOpen className="size-4" aria-hidden="true" />
                      Ler Mensagem
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-emerald-600 text-white hover:bg-emerald-500"
                      onClick={handleAccept}
                    >
                      <CheckCircle2 className="size-4" aria-hidden="true" />
                      Aceitar
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-500"
                      onClick={handleReject}
                    >
                      <XCircle className="size-4" aria-hidden="true" />
                      Recusar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <dialog
        ref={dialogRef}
        onCancel={() => setSelectedOrientacao(null)}
        className="w-[min(92vw,640px)] rounded-xl border border-white/10 bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-black/70"
      >
        {selectedOrientacao && (
          <div className="flex flex-col">
            <div className="border-b border-white/10 px-6 py-5">
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                Mensagem do aluno
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-white">
                {selectedOrientacao.aluno_nome}
              </h2>
            </div>

            <div className="px-6 py-5">
              <p className="whitespace-pre-line text-sm leading-7 text-foreground/80">
                {selectedOrientacao.mensagem}
              </p>
            </div>

            <div className="flex justify-end border-t border-white/10 px-6 py-4">
              <Button type="button" onClick={closeDialog}>
                Fechar
              </Button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
