export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  matricula: string;
  password: string;
  role: "aluno" | "professor";
}

export interface AuthUser {
  id: string;
  email: string;
}

