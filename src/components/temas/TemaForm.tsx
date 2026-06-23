"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { useCreateTema } from "@/hooks/useCreateTema";

export default function TemaForm() {
  const [titulo, setTitulo] =
    useState("");

  const createTemaMutation =
    useCreateTema();

  async function handleSubmit() {
    if (!titulo.trim()) {
      toast.error(
        "Informe o nome do tema."
      );
      return;
    }

    try {
      await createTemaMutation.mutateAsync(
        titulo
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