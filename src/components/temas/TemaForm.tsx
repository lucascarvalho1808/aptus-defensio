"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  temaSchema,
  type TemaSchema,
} from "@/schemas/tema.schema";

import { useCreateTema } from "@/hooks/useCreateTema";
import { useTemas } from "@/hooks/useTemas";

export default function TemaForm() {
  const createTemaMutation = useCreateTema();

  const { data: temas = [] } = useTemas();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<TemaSchema>({
    resolver: zodResolver(temaSchema),
    defaultValues: {
      titulo: "",
    },
  });

  async function onSubmit(data: TemaSchema) {
    const tituloNormalizado = data.titulo.trim();

    const temaJaExiste = temas.some(
      (tema) =>
        tema.titulo.trim().toLowerCase() ===
        tituloNormalizado.toLowerCase()
    );

    if (temaJaExiste) {
      toast.error(
        "Já existe um tema cadastrado com esse nome."
      );
      return;
    }

    try {
      await createTemaMutation.mutateAsync({
        titulo: tituloNormalizado,
      });

      toast.success(
        "Tema cadastrado com sucesso."
      );

      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Erro ao cadastrar tema."
        );
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-wrap gap-4">
        <div className="min-w-[280px] flex-1">
          <input
            {...register("titulo")}
            className="h-11 w-full rounded-lg border bg-transparent px-3"
            placeholder="Ex: Inteligência Artificial na Saúde"
          />

          {errors.titulo && (
            <p className="mt-2 text-sm text-destructive">
              {errors.titulo.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="h-11 min-w-[170px]"
          disabled={
            isSubmitting ||
            createTemaMutation.isPending
          }
        >
          {isSubmitting ||
          createTemaMutation.isPending
            ? "Salvando..."
            : "Cadastrar Tema"}
        </Button>
      </div>
    </form>
  );
}