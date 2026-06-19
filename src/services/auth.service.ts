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
    return await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          nome: data.nome,
        },
      },
    });
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