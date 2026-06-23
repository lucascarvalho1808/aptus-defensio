"use client";

import { useMemo, useState } from "react";

import { Loader2, UserPlus } from "lucide-react";
import { useApproveUser } from "@/hooks/useApproveUser";
import { useRejectUser } from "@/hooks/useRejectUser";
import { usePendingUsers } from "@/hooks/usePendingUsers";
import type { User } from "@/types/user.types";

import AdminFilter from "@/components/admin/AdminFilter";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { toast } from "sonner";

export default function PendingUsersTable() {
  const [processingId, setProcessingId] =
    useState<string | null>(null);

  const [roleFilter, setRoleFilter] =
    useState("todos");

  const approveMutation = useApproveUser();

  const rejectMutation = useRejectUser();

  const {
    data,
    isLoading,
    isError,
  } = usePendingUsers();

  const usuarios = (data ?? []) as User[];

  const usuariosFiltrados = useMemo(() => {
    if (roleFilter === "todos") {
      return usuarios;
    }

    return usuarios.filter(
      (usuario) => usuario.role === roleFilter
    );
  }, [usuarios, roleFilter]);

  async function handleApprove(id: string) {
    try {
      setProcessingId(id);

      await approveMutation.mutateAsync(id);

      toast.success(
        "Usuário aprovado com sucesso."
      );
    } catch {
      toast.error(
        "Erro ao aprovar usuário."
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject(id: string) {
    const confirmed = window.confirm(
      "Deseja realmente rejeitar este cadastro?"
    );

    if (!confirmed) return;

    try {
      setProcessingId(id);

      await rejectMutation.mutateAsync(id);

      toast.success(
        "Usuário rejeitado com sucesso."
      );
    } catch {
      toast.error(
        "Erro ao rejeitar usuário."
      );
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <AdminFilter
        value={roleFilter}
        onChange={setRoleFilter}
      />

      <div className="w-full overflow-x-auto rounded-lg border border-white/10 bg-black/20">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="font-semibold text-primary">
                MATRÍCULA
              </TableHead>

              <TableHead className="font-semibold text-primary">
                NOME COMPLETO
              </TableHead>

              <TableHead className="font-semibold text-primary">
                E-MAIL
              </TableHead>

              <TableHead className="font-semibold text-primary text-center">
                PERFIL
              </TableHead>

              <TableHead className="font-semibold text-primary text-center">
                AÇÕES
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-foreground/50">
                    <Loader2 className="mb-2 size-6 animate-spin text-primary" />
                    <span className="text-sm font-medium">
                      Carregando usuários pendentes...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-red-400"
                >
                  Erro ao carregar usuários pendentes.
                </TableCell>
              </TableRow>
            ) : usuariosFiltrados.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-48 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-foreground/50">
                    <UserPlus className="mb-3 size-10 text-white/20" />

                    <p className="text-base font-medium text-white/70">
                      Nenhum usuário encontrado
                    </p>

                    <p className="text-sm">
                      Não existem usuários pendentes para o filtro selecionado.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              usuariosFiltrados.map((usuario) => (
                <TableRow
                  key={usuario.id}
                  className="border-white/5 transition-colors hover:bg-white/5"
                >
                  <TableCell className="font-mono text-sm text-white/80">
                    {usuario.matricula ?? "---"}
                  </TableCell>

                  <TableCell className="font-medium text-white">
                    {usuario.nome}
                  </TableCell>

                  <TableCell className="text-white/70">
                    {usuario.email}
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
                      <span
                        className="size-1.5 rounded-full bg-amber-500"
                        aria-hidden="true"
                      />
                      {usuario.role}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        disabled={
                          processingId === usuario.id
                        }
                        onClick={() =>
                          handleApprove(usuario.id)
                        }
                      >
                        Aprovar
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={
                          processingId === usuario.id
                        }
                        onClick={() =>
                          handleReject(usuario.id)
                        }
                      >
                        Rejeitar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}