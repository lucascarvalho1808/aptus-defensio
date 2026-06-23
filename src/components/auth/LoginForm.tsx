"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginSchema } from "@/schemas/login.schema";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";

function getAuthErrorMessage(message?: string) {
  if (!message) return "E-mail ou senha inválidos.";

  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("email not confirmed") ||
    normalizedMessage.includes("email_not_confirmed")
  ) {
    return "Por favor, confirme seu e-mail clicando no link que enviamos para você antes de entrar.";
  }

  if (normalizedMessage.includes("invalid login credentials")) {
    return "E-mail ou senha inválidos.";
  }

  return message;
}

export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(dataForm: LoginSchema) {
    setAuthError(null);

    const { data, error } = await authService.signIn(dataForm);

    if (error || !data?.user) {
      setAuthError(getAuthErrorMessage(error?.message));
      return;
    }

    setAuth(data.user, data.role);
    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-sidebar-border bg-sidebar p-8 shadow-2xl">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Image
          src="/img/logo_capacete.png"
          alt="Logo Aptus Defensio"
          width={86}
          height={86}
          className="h-auto w-20 drop-shadow-md"
          priority
        />
        <h1 className="font-heading text-3xl font-bold tracking-wider text-primary">
          Aptus Defensio
        </h1>
      </div>

      {authError && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
        >
          {authError}
        </p>
      )}

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground/90">
            E-mail
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-lg border border-white/10 bg-black/20 p-3 text-foreground transition-all duration-200 placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="seu@email.com"
          />
          {errors.email && (
            <p className="text-xs font-medium text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground/90">
            Senha
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full rounded-lg border border-white/10 bg-black/20 p-3 text-foreground transition-all duration-200 placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-xs font-medium text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="mt-6 w-full bg-accent text-accent-foreground shadow-md transition-colors hover:bg-accent/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <div className="mt-5 border-t border-white/10 pt-5 text-center">
        <p className="mb-3 text-sm text-muted-foreground">
          Ainda não tem uma conta?
        </p>
        <Button
          asChild
          variant="outline"
          className="w-full border-primary/30 bg-transparent text-primary hover:bg-primary/10"
        >
          <Link href="/register">Criar conta</Link>
        </Button>
      </div>
    </div>
  );
}
