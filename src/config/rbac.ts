import {
  AUTH_ROLES,
  type AuthRole,
} from "@/types/auth.types";

export interface ProtectedRoute {
  label: string;
  href: string;
  roles?: readonly AuthRole[];
}

export const protectedRoutes: readonly ProtectedRoute[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Administração", href: "/admin", roles: ["coordenador"] },
  { label: "Professores", href: "/professores", roles: ["coordenador"] },
  { label: "Alunos", href: "/alunos", roles: ["coordenador"] },
  { label: "Temas", href: "/temas", roles: ["coordenador", "professor"] },
  { label: "Proposta", href: "/proposta", roles: ["aluno"] },
  { label: "Orientação", href: "/orientacao", roles: ["aluno"] },
  {
    label: "Orientações Recebidas",
    href: "/orientacoes-recebidas",
    roles: ["professor", "coordenador"],
  },
];

export const privateRoutes = protectedRoutes.map((route) => route.href);

export function isAuthRole(role: string | null | undefined): role is AuthRole {
  return AUTH_ROLES.includes(role as AuthRole);
}

export function getProtectedRoute(pathname: string) {
  return protectedRoutes.find(
    (route) => pathname === route.href || pathname.startsWith(`${route.href}/`)
  );
}

export function canAccessRoute(
  route: ProtectedRoute,
  role: AuthRole | null
) {
  if (!route.roles) return true;
  return role ? route.roles.includes(role) : false;
}

export function canAccessPath(pathname: string, role: AuthRole | null) {
  const route = getProtectedRoute(pathname);

  if (!route) return true;

  return canAccessRoute(route, role);
}
