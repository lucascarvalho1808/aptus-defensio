"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { temaService } from "@/services/tema.service";

import { toast } from "sonner";

interface Props {
  onCreated: () => void;
}

export default function TemaForm({
  onCreated,
}: Props) {
  const [titulo, setTitulo] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  async function handleSubmit() {
    if (!titulo.trim()) {
      toast.error(
        "Informe o nome do tema."
      );
      return;
    }

    try {
      setIsLoading(true);

      const { error } =
        await temaService.createTema(
          titulo
        );

      if (error) {
        throw error;
      }

      toast.success(
        "Tema cadastrado com sucesso."
      );

      setTitulo("");
      onCreated();
    } catch {
      toast.error(
        "Erro ao cadastrar tema."
      );
    } finally {
      setIsLoading(false);
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
        disabled={isLoading}
        onClick={handleSubmit}
      >
        {isLoading
          ? "Salvando..."
          : "Cadastrar Tema"}
      </Button>
    </div>
  );
}