"use client";

import { ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import PendingUsersTable from "@/components/admin/PendingUsersTable";
import ActiveUsersTable from "@/components/admin/ActiveUsersTable";
import AdminHero from "@/components/admin/AdminHero";

import { useRequireCoordinator } from "@/hooks/useRequireCoordinator";

import { useAuthStore } from "@/store/useAuthStore";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPage() {
  const { isAuthorized } =
    useRequireCoordinator();

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminHero />

      <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
        <CardHeader className="border-b border-white/5 pb-5">
          <CardTitle className="font-heading text-xl text-primary">
            Aprovações Pendentes
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <PendingUsersTable />
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
        <CardHeader className="border-b border-white/5 pb-5">
          <CardTitle className="font-heading text-xl text-primary">
            Usuários Ativos
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <ActiveUsersTable />
        </CardContent>
      </Card>
    </div>
  );
}