export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

