"use client";

import { propostaService } from "@/services/proposta.service";
import { useAuthStore } from "@/store/useAuthStore";

import { useState } from "react";

const user = useAuthStore((state) => state.user);

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PropostaForm() {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("Pesquisa");
  const [orientador, setOrientador] = useState("");
  const [linhaPesquisa, setLinhaPesquisa] = useState("");
  const [justificativa, setJustificativa] = useState("");
  const [objetivoGeral, setObjetivoGeral] = useState("");
  const [objetivosEspecificos, setObjetivosEspecificos] = useState("");
  const [metodologia, setMetodologia] = useState("");
  const [resultados, setResultados] = useState("");
  const [trabalhosFuturos, setTrabalhosFuturos] = useState("");
  const [custos, setCustos] = useState("");
  const [cronograma, setCronograma] = useState("");
  const [referencias, setReferencias] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      !titulo ||
      !orientador ||
      !linhaPesquisa ||
      !justificativa
    ) {
      alert(
        "Preencha todos os campos obrigatórios."
      );

      return;
    }

    if (!user) {
      alert("Usuário não autenticado.");
      return;
    }

    const { error } =
      await propostaService.create({
        aluno_id: user.id,
        titulo,
        tipo,
        orientador,
        linha_pesquisa: linhaPesquisa,
        justificativa,
        objetivo_geral: objetivoGeral,
        objetivos_especificos: objetivosEspecificos,
        metodologia,
        resultados,
        trabalhos_futuros: trabalhosFuturos,
        custos,
        cronograma,
        referencias,
        status: "Aguardando Orientador",
      });

    if (error) {
      console.error(error);

      alert(
        "Erro ao salvar proposta."
      );

      return;
    }

    alert(
      "Proposta enviada com sucesso!"
    );

    setTitulo("");
    setTipo("Pesquisa");
    setOrientador("");
    setLinhaPesquisa("");
    setJustificativa("");
    setObjetivoGeral("");
    setObjetivosEspecificos("");
    setMetodologia("");
    setResultados("");
    setTrabalhosFuturos("");
    setCustos("");
    setCronograma("");
    setReferencias("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Dados da Proposta
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Título da Proposta *
            </label>

            <input
              type="text"
              value={titulo}
              onChange={(e) =>
                setTitulo(e.target.value)
              }
              placeholder="Digite o título do TCC"
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Tipo de Projeto *
            </label>

            <select
              value={tipo}
              onChange={(e) =>
                setTipo(e.target.value)
              }
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            >
              <option value="Pesquisa">
                Projeto de Pesquisa
              </option>

              <option value="Implementacao">
                Projeto de Implementação
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Orientador *
            </label>

            <input
              type="text"
              value={orientador}
              onChange={(e) =>
                setOrientador(
                  e.target.value
                )
              }
              placeholder="Nome do orientador"
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Linha de Pesquisa *
            </label>

            <input
              type="text"
              value={linhaPesquisa}
              onChange={(e) =>
                setLinhaPesquisa(
                  e.target.value
                )
              }
              placeholder="Ex: IA, Redes, Segurança..."
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Problema e Justificativa *
            </label>

            <textarea
              rows={4}
              value={justificativa}
              onChange={(e) =>
                setJustificativa(e.target.value)
              }
              placeholder="Contextualize o problema do trabalho"
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Objetivo Geral
            </label>

            <textarea
              rows={3}
              value={objetivoGeral}
              onChange={(e) =>
                setObjetivoGeral(e.target.value)
              }
              placeholder="Descreva o objetivo geral"
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Objetivos Específicos
            </label>

            <textarea
              rows={3}
              value={objetivosEspecificos}
              onChange={(e) =>
                setObjetivosEspecificos(e.target.value)
              }
              placeholder="Liste os objetivos específicos"
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Metodologia
            </label>

            <textarea
              rows={4}
              value={metodologia}
              onChange={(e) =>
                setMetodologia(e.target.value)
              }
              placeholder="Explique a metodologia utilizada"
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Resultados Esperados
            </label>

            <textarea
              rows={3}
              value={resultados}
              onChange={(e) =>
                setResultados(e.target.value)
              }
              placeholder="O que se espera alcançar"
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Trabalhos Futuros
            </label>

            <textarea
              rows={3}
              value={trabalhosFuturos}
              onChange={(e) =>
                setTrabalhosFuturos(e.target.value)
              }
              placeholder="Melhorias futuras"
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Materiais e Recursos
            </label>

            <textarea
              rows={3}
              value={custos}
              onChange={(e) =>
                setCustos(e.target.value)
              }
              placeholder="Recursos necessários"
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Cronograma
            </label>

            <textarea
              rows={3}
              value={cronograma}
              onChange={(e) =>
                setCronograma(e.target.value)
              }
              placeholder="Etapas do projeto"
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Referências
            </label>

            <textarea
              rows={3}
              value={referencias}
              onChange={(e) =>
                setReferencias(e.target.value)
              }
              placeholder="Cite as referências em ABNT"
              className="w-full rounded-lg border border-slate-700 bg-[#0b121e] p-3 outline-none focus:border-[#c9a063]"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Enviar Proposta
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}