"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { useCreateTema } from "@/hooks/useCreateTema";
import { useTemas } from "@/hooks/useTemas";

export default function TemaForm() {
  const [titulo, setTitulo] =
    useState("");

  const createTemaMutation =
    useCreateTema();

  const { data: temas = [] } =
    useTemas();

  async function handleSubmit() {
    const tituloNormalizado =
      titulo.trim();

    if (!tituloNormalizado) {
      toast.error(
        "Informe o nome do tema."
      );
      return;
    }

    const temaJaExiste = temas.some(
      (tema) =>
        tema.titulo
          .trim()
          .toLowerCase() ===
        tituloNormalizado.toLowerCase()
    );

    if (temaJaExiste) {
      toast.error(
        "Já existe um tema cadastrado com esse nome."
      );
      return;
    }

    try {
      await createTemaMutation.mutateAsync(
        tituloNormalizado
      );

      toast.success(
        "Tema cadastrado com sucesso."
      );

      setTitulo("");
    } catch {
      toast.error(
        "Erro ao cadastrar tema."
      );
    }
  }

  return (
    <div className="flex flex-wrap gap-4">
      <input
        className="flex-1 rounded-lg border p-3 bg-transparent"
        placeholder="Ex: Inteligência Artificial na Saúde"
        value={titulo}
        onChange={(e) =>
          setTitulo(e.target.value)
        }
      />

      <Button
        className="min-w-[170px]"
        disabled={
          createTemaMutation.isPending
        }
        onClick={handleSubmit}
      >
        {createTemaMutation.isPending
          ? "Salvando..."
          : "Cadastrar Tema"}
      </Button>
    </div>
  );
}