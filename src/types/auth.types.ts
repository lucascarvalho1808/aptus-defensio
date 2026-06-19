// Dados utilizados no login
export interface LoginData {
  email: string;
  password: string;
}

// Dados utilizados no cadastro
export interface RegisterData {
  nome: string;
  email: string;
  password: string;
}

// Usuário autenticado
export interface AuthUser {
  id: string;
  email: string;
}