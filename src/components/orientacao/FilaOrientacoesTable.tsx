"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Loader2,
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

import { useAuthStore } from "@/store/useAuthStore";
import { useOrientacoes } from "@/hooks/useOrientacoes";
import { useUpdateOrientacaoStatus } from "@/hooks/useUpdateOrientacaoStatus";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default function FilaOrientacoesTable() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const user = useAuthStore((state) => state.user);

  const { data: orientacoes = [] } = useOrientacoes(user?.id);

  const updateStatus = useUpdateOrientacaoStatus();

  const [selectedOrientacao, setSelectedOrientacao] = useState<
    (typeof orientacoes)[number] | null
  >(null);

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

  async function handleUpdateStatus(
    id: string,
    status: "aceita" | "recusada"
  ) {
    try {
      await updateStatus.mutateAsync({
        id,
        status,
      });

      toast.success(
        status === "aceita"
          ? "Solicitação aceita com sucesso."
          : "Solicitação recusada com sucesso."
      );

      if (selectedOrientacao?.id === id) {
        closeDialog();
      }
    } catch {
      toast.error("Erro ao atualizar a solicitação.");
    }
  }

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-black/20">
        <Table>
           <TableHeader className="bg-neutral-100 dark:bg-white/5">
            <TableRow className="border-neutral-200 dark:border-white/10 hover:bg-transparent">
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
            {orientacoes.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-foreground/60"
                >
                  Nenhuma solicitação pendente.
                </TableCell>
              </TableRow>
            )}

            {orientacoes.map((orientacao) => (
              <TableRow
                key={orientacao.id}
                className="border-neutral-200 dark:border-white/5 transition-colors hover:bg-neutral-100 dark:hover:bg-white/5"
              >
                <TableCell className="font-medium text-foreground">
                  {orientacao.aluno?.nome ?? "Aluno"}
                </TableCell>

                <TableCell className="text-foreground/70">
                  {orientacao.created_at
                    ? dateFormatter.format(new Date(orientacao.created_at))
                    : "-"}
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
                      <MailOpen className="size-4" />
                      Ler Mensagem
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      disabled={updateStatus.isPending}
                      className="bg-emerald-600 text-white hover:bg-emerald-500"
                      onClick={() =>
                        handleUpdateStatus(
                          orientacao.id,
                          "aceita"
                        )
                      }
                    >
                      {updateStatus.isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="size-4" />
                      )}
                      Aceitar
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      disabled={updateStatus.isPending}
                      className="bg-red-600 text-white hover:bg-red-500"
                      onClick={() =>
                        handleUpdateStatus(
                          orientacao.id,
                          "recusada"
                        )
                      }
                    >
                      {updateStatus.isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <XCircle className="size-4" />
                      )}
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
        onClose={() => setSelectedOrientacao(null)}
        onCancel={() => setSelectedOrientacao(null)}
        className="fixed inset-0 m-auto max-h-[85vh] w-[min(92vw,640px)] max-w-none overflow-hidden rounded-xl border border-neutral-200 dark:border-white/10 bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-black/70"
      >
        {selectedOrientacao && (
          <div className="flex flex-col">
             <div className="border-b border-neutral-200 dark:border-white/10 px-6 py-5">
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                Mensagem do aluno
              </p>

              <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
                {selectedOrientacao.aluno?.nome ?? "Aluno"}
              </h2>
            </div>

            <div className="px-6 py-5">
              <p className="whitespace-pre-line text-sm leading-7 text-foreground/80">
                {selectedOrientacao.mensagem ??
                  "Nenhuma mensagem informada."}
              </p>
            </div>

            <div className="flex justify-end border-t border-neutral-200 dark:border-white/10 px-6 py-4">
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