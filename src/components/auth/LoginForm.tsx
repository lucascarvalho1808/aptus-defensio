"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/login.schema";
import { authService } from "@/services/auth.service";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // Realiza login
  async function onSubmit(dataForm: LoginSchema) {
    const { error } = await authService.signIn(dataForm);

    if (error) {
      alert("E-mail ou senha inválidos.");
      return;
    }

    // O hook useSession atualiza a store automaticamente
    router.push("/");
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-sidebar-border bg-sidebar p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-wider text-primary font-heading">
        Aptus Defensio
      </h1>

      <form
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
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
    </div>
  );
}
