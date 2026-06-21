import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import type {
  LoginData,
  RegisterData,
} from "@/types/auth.types";

// Serviço responsável pelas operações de autenticação
export const authService = {
  // Faz login
  async signIn(data: LoginData) {
    return await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
  },

  // Faz cadastro
  async signUp(data: RegisterData) {
    // Cria usuário no Auth
    const authResponse = await supabase.auth.signUp({
      email: data.email,
      password: data.password,

      options: {
        data: {
          nome: data.nome,
          role: data.role,
        },
      },
    });

    // Se ocorrer erro interrompe
    if (authResponse.error || !authResponse.data.user) {
      return {
        data: null,
        error: authResponse.error,
      };
    }

    // Salva dados adicionais na tabela users
    const { error } = await supabase
      .from("users")
      .insert({
        id: authResponse.data.user.id,
        nome: data.nome,
        email: data.email,
        matricula: data.matricula,
        role: data.role,
        status: "pendente",
      });

    return {
      data: authResponse.data,
      error,
    };
  },

  // Encerra sessão
  async signOut() {
    return await supabase.auth.signOut();
  },

  // Obtém sessão atual
  async getSession() {
    return await supabase.auth.getSession();
  },
  // Observa alterações na sessão
  onAuthStateChange(callback: (session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(
      (_event, session) => {
        callback(session);
      }
    );
  },
};