"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginSchema } from "@/schemas/login.schema";

import { authService } from "@/services/auth.service";

import { useAuthStore } from "@/store/useAuthStore";

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
    <div className="w-full max-w-md rounded-2xl bg-[#1a2c41] p-8 shadow-lg">
      <h1 className="mb-8 text-center text-3xl font-bold text-[#c9a063]">
        Aptus Defensio
      </h1>

      <form
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-2 block text-sm text-white">
            E-mail
          </label>

          <input
            type="email"
            {...register("email")}
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-white">
            Senha
          </label>

          <input
            type="password"
            {...register("password")}
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#8b2521]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}