"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { temaService } from "@/services/tema.service";

interface Props {
  onCreated: () => void;
}

export default function TemaForm({
  onCreated,
}: Props) {
  const [titulo, setTitulo] = useState("");

  async function handleSubmit() {
    if (!titulo.trim()) return;

    await temaService.createTema(titulo);

    setTitulo("");
    onCreated();
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

      <Button onClick={handleSubmit}>
        Cadastrar Tema
      </Button>
    </div>
  );
}