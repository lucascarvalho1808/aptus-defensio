export interface LoginData {
  email: string;
  password: string;
}

export const AUTH_ROLES = ["coordenador", "professor", "aluno"] as const;

export type AuthRole = (typeof AUTH_ROLES)[number];

export interface AuthProfile {
  id: string;
  nome: string;
  email: string;
  role: AuthRole;
  status: string | null;
}

export interface RegisterData {
  nome: string;
  email: string;
  matricula: string;
  password: string;
  role: "aluno" | "professor";
  status?: string;
}

export interface AuthUser {
  id: string;
  email: string;
}
