"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/register.schema";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";

export default function RegisterForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "aluno",
    },
  });

  async function onSubmit(dataForm: RegisterSchema) {
    setSubmitError(null);
    setSuccessMessage(null);

    const { error } = await authService.signUp({
      nome: dataForm.nome,
      email: dataForm.email,
      matricula: dataForm.matricula,
      password: dataForm.password,
      role: dataForm.role,
    });

    if (error) {
      setSubmitError("Não foi possível realizar o cadastro.");
      return;
    }

    setSuccessMessage(
      "Cadastro realizado! Por favor, verifique sua caixa de entrada e clique no link para confirmar seu e-mail antes de fazer login."
    );
  }

  const inputClassName =
    "w-full rounded-lg border border-white/10 bg-black/20 p-3 text-foreground transition-all duration-200 placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="w-full max-w-md rounded-2xl border border-sidebar-border bg-sidebar p-8 shadow-2xl">
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
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
        <p className="text-sm font-medium text-muted-foreground">Cadastro</p>
      </div>

      {successMessage && (
        <p
          role="status"
          className="mb-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300"
        >
          {successMessage}
        </p>
      )}

      {submitError && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
        >
          {submitError}
        </p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground/90">
            Tipo de usuário
          </label>
          <select
            {...register("role")}
            className={`${inputClassName} cursor-pointer appearance-none`}
          >
            <option value="aluno" className="bg-sidebar text-foreground">
              Aluno
            </option>
            <option value="professor" className="bg-sidebar text-foreground">
              Professor
            </option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground/90">
            Nome
          </label>
          <input
            type="text"
            autoComplete="off"
            {...register("nome")}
            className={inputClassName}
            placeholder="Seu nome completo"
          />
          {errors.nome && (
            <p className="text-xs font-medium text-destructive">
              {errors.nome.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground/90">
            E-mail
          </label>
          <input
            type="email"
            autoComplete="off"
            {...register("email")}
            className={inputClassName}
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
            Matrícula
          </label>
          <input
            type="text"
            autoComplete="off"
            {...register("matricula")}
            className={inputClassName}
            placeholder="Sua matrícula"
          />
          {errors.matricula && (
            <p className="text-xs font-medium text-destructive">
              {errors.matricula.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground/90">
            Senha
          </label>
          <input
            type="password"
            autoComplete="off"
            {...register("password")}
            className={inputClassName}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-xs font-medium text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground/90">
            Confirmar senha
          </label>
          <input
            type="password"
            autoComplete="off"
            {...register("confirmPassword")}
            className={inputClassName}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="text-xs font-medium text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground shadow-md transition-colors hover:bg-accent/90"
            disabled={isSubmitting || Boolean(successMessage)}
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>

        <Link
          href="/login"
          className="mt-4 block text-center text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:underline"
        >
          Voltar para login
        </Link>
      </form>
    </div>
  );
}
