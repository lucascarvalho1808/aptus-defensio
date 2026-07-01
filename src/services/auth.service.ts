import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import type {
  AuthProfile,
  AuthRole,
  LoginData,
  RegisterData,
} from "@/types/auth.types";

const authRoles: AuthRole[] = ["coordenador", "professor", "aluno"];

function createAuthError(message: string) {
  return new Error(message);
}

function normalizeRole(role: string | null): AuthRole | null {
  const normalizedRole = role?.toLowerCase();

  if (authRoles.includes(normalizedRole as AuthRole)) {
    return normalizedRole as AuthRole;
  }

  return null;
}

function normalizeStatus(status: string | null) {
  return status?.toLowerCase() ?? "pendente";
}

function getProfileAccessError(profile: AuthProfile) {
  const status = normalizeStatus(profile.status);

  if (profile.role !== "coordenador" && status === "pendente") {
    return createAuthError(
      "Seu cadastro ainda está pendente de aprovação pela coordenação."
    );
  }

  return null;
}

async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id, nome, email, role, status")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    return {
      data: null,
      error,
    };
  }

  if (!data) {
    return {
      data: null,
      error: createAuthError(
        "Perfil de usuário não encontrado. Verifique se o cadastro está vinculado corretamente."
      ),
    };
  }

  const role = normalizeRole(data.role);

  if (!role) {
    return {
      data: null,
      error: createAuthError("Perfil de usuário inválido."),
    };
  }

  return {
    data: {
      ...data,
      role,
      status: normalizeStatus(data.status),
    } satisfies AuthProfile,
    error: null,
  };
}

export const authService = {
  async signIn(data: LoginData) {
    const authResponse = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authResponse.error || !authResponse.data.user) {
      return {
        data: null,
        error:
          authResponse.error ??
          createAuthError("Não foi possível autenticar este usuário."),
      };
    }

    const profileResponse = await getUserProfile(authResponse.data.user.id);

    if (profileResponse.error || !profileResponse.data) {
      await supabase.auth.signOut();

      return {
        data: null,
        error:
          profileResponse.error ??
          createAuthError("Não foi possível carregar o perfil do usuário."),
      };
    }

    const accessError = getProfileAccessError(profileResponse.data);

    if (accessError) {
      await supabase.auth.signOut();

      return {
        data: null,
        error: accessError,
      };
    }

    return {
      data: {
        ...authResponse.data,
        profile: profileResponse.data,
        role: profileResponse.data.role,
      },
      error: null,
    };
  },

  async signUp(data: RegisterData) {
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

    if (authResponse.error || !authResponse.data.user) {
      return {
        data: null,
        error: authResponse.error,
      };
    }

    const { error } = await supabase.from("users").insert({
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

  async signOut() {
    return await supabase.auth.signOut();
  },

  async getSession() {
    return await supabase.auth.getSession();
  },

  getUserProfile,

  getProfileAccessError,

  onAuthStateChange(callback: (session: Session | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  },
};
