"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/register.schema";

import { Button } from "@/components/ui/button";

export default function RegisterForm() {
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

  // Cadastro será implementado na próxima task
  async function onSubmit(data: RegisterSchema) {
    console.log(data);
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-[#1a2c41] p-8 shadow-lg">
      <h1 className="mb-8 text-center text-3xl font-bold text-[#c9a063]">
        Cadastro
      </h1>

      <form
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-2 block text-sm text-white">
            Tipo de usuário
          </label>

          <select
            {...register("role")}
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white"
          >
            <option value="aluno">
              Aluno
            </option>

            <option value="professor">
              Professor
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-white">
            Nome
          </label>

          <input
            type="text"
            autoComplete="off"
            {...register("nome")}
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white"
          />

          {errors.nome && (
            <p className="mt-1 text-sm text-red-400">
              {errors.nome.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-white">
            E-mail
          </label>

          <input
            type="email"
            autoComplete="off"
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
            Matrícula
          </label>

          <input
            type="text"
            autoComplete="off"
            {...register("matricula")}
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white"
          />

          {errors.matricula && (
            <p className="mt-1 text-sm text-red-400">
              {errors.matricula.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-white">
            Senha
          </label>

          <input
            type="password"
            autoComplete="off"
            {...register("password")}
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-white">
            Confirmar senha
          </label>

          <input
            type="password"
            autoComplete="off"
            {...register("confirmPassword")}
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#8b2521]"
          disabled={isSubmitting}
        >
          Cadastrar
        </Button>

        <Link
          href="/login"
          className="block text-center text-sm text-[#c9a063]"
        >
          Voltar para login
        </Link>
      </form>
    </div>
  );
}