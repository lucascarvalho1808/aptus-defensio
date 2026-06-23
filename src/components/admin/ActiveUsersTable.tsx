"use client";

import { Loader2, Users } from "lucide-react";

import { useActiveUsers } from "@/hooks/useActiveUsers";
import type { User } from "@/types/user.types";

import { useMemo, useState } from "react";

import AdminFilter from "@/components/admin/AdminFilter";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ActiveUsersTable() {
  const {
    data,
    isLoading,
    isError,
  } = useActiveUsers();
  
  const usuarios = (data ?? []) as User[];
  
  const [roleFilter, setRoleFilter] = useState<
    "todos" | "aluno" | "professor" >("todos");

  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return usuarios.filter((user) => {
      const roleMatch =
        roleFilter === "todos" ||
        user.role === roleFilter;

      const searchMatch =
        search.trim() === "" ||
        user.nome
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return roleMatch && searchMatch;
    });
  }, [usuarios, roleFilter, search]);
  
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-white/10 bg-black/20">
      <div className="m-4">
        <AdminFilter
          value={roleFilter}
          onChange={(value) =>
            setRoleFilter(value as "todos" | "aluno" | "professor")
          }
          search={search}
          onSearchChange={setSearch}
        />
      </div>
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
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center text-foreground/50">
                  <Loader2 className="mb-2 size-6 animate-spin text-primary" />
                  <span className="text-sm font-medium">
                    Carregando usuários ativos...
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-red-400">
                Erro ao carregar usuários ativos.
              </TableCell>
            </TableRow>
          ) : filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-48 text-center">
                <div className="flex flex-col items-center justify-center text-foreground/50">
                  <Users className="mb-3 size-10 text-white/20" />

                  <p className="text-base font-medium text-white/70">
                    Nenhum usuário ativo
                  </p>

                  <p className="text-sm">
                    Não existem usuários aprovados.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((usuario) => (
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
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    <span
                      className="size-1.5 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    />
                    {usuario.role}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}