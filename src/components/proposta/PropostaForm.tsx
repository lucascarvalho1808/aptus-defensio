"use client";

import { useEffect, useMemo, useState } from "react";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuthStore } from "@/store/useAuthStore";

import { useTemas } from "@/hooks/useTemas";
import { useCreateProposta } from "@/hooks/useCreateProposta";
import { useUpdateProposta } from "@/hooks/useUpdateProposta";

import type {
  AtualizarProposta,
  NovaProposta,
  Proposta,
  StatusProposta,
} from "@/types/proposta.types";

import type { Tema } from "@/types/tema.types";

interface PropostaFormProps {
  proposta?: Proposta | null;
  onSuccess?: () => void;
}

export default function PropostaForm({
  proposta,
  onSuccess,
}: PropostaFormProps) {
  const user = useAuthStore(
    (state) => state.user
  );

  const createMutation =
    useCreateProposta();

  const updateMutation =
    useUpdateProposta();

  const {
    data: temas = [],
    isLoading: loadingTemas,
  } = useTemas();

  const isEditing =
    proposta !== null &&
    proposta !== undefined;

  const inputClassName =
    "w-full rounded-lg border border-white/10 bg-black/20 p-3 text-foreground transition-all duration-200 placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50";

  const labelClassName =
    "mb-2 block text-sm font-medium text-foreground/90";

  const [titulo, setTitulo] =
    useState("");

  const [tipo, setTipo] =
    useState("Pesquisa");

  const [orientador, setOrientador] =
    useState("");

  const [temaId, setTemaId] =
    useState("");

  const [justificativa, setJustificativa] =
    useState("");

  const [objetivoGeral, setObjetivoGeral] =
    useState("");

  const [
    objetivosEspecificos,
    setObjetivosEspecificos,
  ] = useState("");

  const [metodologia, setMetodologia] =
    useState("");

  const [resultados, setResultados] =
    useState("");

  const [
    trabalhosFuturos,
    setTrabalhosFuturos,
  ] = useState("");

  const [custos, setCustos] =
    useState("");

  const [cronograma, setCronograma] =
    useState("");

  const [referencias, setReferencias] =
    useState("");

  const temaSelecionado = useMemo(
    () =>
      temas.find(
        (tema: Tema) =>
          tema.id === temaId
      ),
    [temaId, temas]
  );
  useEffect(() => {
    if (!proposta) {
      return;
    }

    setTitulo(proposta.titulo ?? "");
    setTipo(proposta.tipo ?? "Pesquisa");
    setOrientador(proposta.orientador ?? "");
    setTemaId(proposta.tema_id ?? "");
    setJustificativa(proposta.justificativa ?? "");
    setObjetivoGeral(proposta.objetivo_geral ?? "");
    setObjetivosEspecificos(
      proposta.objetivos_especificos ?? ""
    );
    setMetodologia(proposta.metodologia ?? "");
    setResultados(proposta.resultados ?? "");
    setTrabalhosFuturos(
      proposta.trabalhos_futuros ?? ""
    );
    setCustos(proposta.custos ?? "");
    setCronograma(proposta.cronograma ?? "");
    setReferencias(proposta.referencias ?? "");
  }, [proposta]);

  function limparFormulario() {
    setTitulo("");
    setTipo("Pesquisa");
    setOrientador("");
    setTemaId("");
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

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user) {
      toast.error("Usuário não autenticado.");
      return;
    }

    if (
      !titulo.trim() ||
      !orientador.trim() ||
      !temaId ||
      !justificativa.trim()
    ) {
      toast.error(
        "Preencha todos os campos obrigatórios."
      );
      return;
    }

    const tema = temas.find(
      (item) => item.id === temaId
    );

    if (!tema) {
      toast.error(
        "Selecione uma linha de pesquisa."
      );
      return;
    }

    try {
      if (isEditing && proposta) {
        const payload: AtualizarProposta = {
          titulo,
          tipo,
          orientador,
          tema_id: tema.id,
          linha_pesquisa: tema.titulo,
          justificativa,
          objetivo_geral: objetivoGeral,
          objetivos_especificos:
            objetivosEspecificos,
          metodologia,
          resultados,
          trabalhos_futuros:
            trabalhosFuturos,
          custos,
          cronograma,
          referencias,
        };

        await updateMutation.mutateAsync({
          id: proposta.id,
          alunoId: user.id,
          proposta: payload,
        });

        toast.success(
          "Proposta atualizada com sucesso."
        );
      } else {
        const payload: NovaProposta = {
          aluno_id: user.id,
          titulo,
          tipo,
          orientador,
          tema_id: tema.id,
          linha_pesquisa: tema.titulo,
          justificativa,
          objetivo_geral: objetivoGeral,
          objetivos_especificos:
            objetivosEspecificos,
          metodologia,
          resultados,
          trabalhos_futuros:
            trabalhosFuturos,
          custos,
          cronograma,
          referencias,
          status:
            "Aguardando Orientador" satisfies StatusProposta,
        };

        await createMutation.mutateAsync(
          payload
        );

        toast.success(
          "Proposta enviada com sucesso."
        );

        limparFormulario();
      }

      onSuccess?.();
    } catch (error) {
      console.error(error);

      toast.error(
        isEditing
          ? "Não foi possível atualizar a proposta."
          : "Não foi possível enviar a proposta."
      );
    }
  }

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending;
  return (
    <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
      <CardHeader className="border-b border-white/5 pb-5">
        <CardTitle className="font-heading text-xl text-primary">
          {isEditing
            ? "Editar Proposta"
            : "Formulário de Submissão"}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
              1. Informações Básicas
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelClassName}>
                  Título da Proposta *
                </label>

                <input
                  type="text"
                  value={titulo}
                  onChange={(e) =>
                    setTitulo(e.target.value)
                  }
                  placeholder="Digite o título provisório do TCC"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>
                  Tipo de Projeto *
                </label>

                <select
                  value={tipo}
                  onChange={(e) =>
                    setTipo(e.target.value)
                  }
                  className={`${inputClassName} appearance-none cursor-pointer`}
                >
                  <option
                    value="Pesquisa"
                    className="bg-sidebar"
                  >
                    Projeto de Pesquisa
                  </option>

                  <option
                    value="Implementacao"
                    className="bg-sidebar"
                  >
                    Projeto de Implementação
                  </option>
                </select>
              </div>

              <div>
                <label className={labelClassName}>
                  Orientador *
                </label>

                <input
                  type="text"
                  value={orientador}
                  onChange={(e) =>
                    setOrientador(e.target.value)
                  }
                  placeholder="Nome do orientador desejado"
                  className={inputClassName}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClassName}>
                  Linha de Pesquisa *
                </label>

                <select
                  value={temaId}
                  onChange={(e) =>
                    setTemaId(e.target.value)
                  }
                  disabled={loadingTemas}
                  className={`${inputClassName} appearance-none cursor-pointer`}
                >
                  <option value="">
                    {loadingTemas
                      ? "Carregando temas..."
                      : "Selecione uma linha de pesquisa"}
                  </option>

                  {temas.map((tema) => (
                    <option
                      key={tema.id}
                      value={tema.id}
                      className="bg-sidebar"
                    >
                      {tema.titulo}
                    </option>
                  ))}
                </select>

                {temaSelecionado?.descricao && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {temaSelecionado.descricao}
                  </p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-white/5" />

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
              2. Fundamentação e Metodologia
            </h3>

            <div className="space-y-5">
              <div>
                <label className={labelClassName}>
                  Problema e Justificativa *
                </label>

                <textarea
                  rows={4}
                  value={justificativa}
                  onChange={(e) =>
                    setJustificativa(
                      e.target.value
                    )
                  }
                  placeholder="Qual o problema abordado e qual a relevância de resolvê-lo?"
                  className={inputClassName}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className={labelClassName}>
                    Objetivo Geral
                  </label>

                  <textarea
                    rows={4}
                    value={objetivoGeral}
                    onChange={(e) =>
                      setObjetivoGeral(
                        e.target.value
                      )
                    }
                    placeholder="O que se pretende alcançar ao final da pesquisa?"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className={labelClassName}>
                    Objetivos Específicos
                  </label>

                  <textarea
                    rows={4}
                    value={objetivosEspecificos}
                    onChange={(e) =>
                      setObjetivosEspecificos(
                        e.target.value
                      )
                    }
                    placeholder="Passos intermediários para atingir o objetivo geral"
                    className={inputClassName}
                  />
                </div>
              </div>
              <div>
                <label className={labelClassName}>
                  Metodologia
                </label>

                <textarea
                  rows={4}
                  value={metodologia}
                  onChange={(e) =>
                    setMetodologia(
                      e.target.value
                    )
                  }
                  placeholder="Como o trabalho será desenvolvido? Quais técnicas, métodos e ferramentas serão utilizados?"
                  className={inputClassName}
                />
              </div>
            </div>
          </div>

          <hr className="border-white/5" />

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
              3. Planejamento e Conclusões
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className={labelClassName}>
                  Resultados Esperados
                </label>

                <textarea
                  rows={3}
                  value={resultados}
                  onChange={(e) =>
                    setResultados(
                      e.target.value
                    )
                  }
                  placeholder="Descreva quais resultados se espera alcançar com o desenvolvimento do trabalho."
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>
                  Trabalhos Futuros
                </label>

                <textarea
                  rows={3}
                  value={trabalhosFuturos}
                  onChange={(e) =>
                    setTrabalhosFuturos(
                      e.target.value
                    )
                  }
                  placeholder="Apresente possíveis extensões ou melhorias que poderão ser realizadas futuramente."
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>
                  Materiais e Custos
                </label>

                <textarea
                  rows={3}
                  value={custos}
                  onChange={(e) =>
                    setCustos(
                      e.target.value
                    )
                  }
                  placeholder="Informe recursos necessários, softwares, equipamentos ou custos previstos."
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>
                  Cronograma
                </label>

                <textarea
                  rows={3}
                  value={cronograma}
                  onChange={(e) =>
                    setCronograma(
                      e.target.value
                    )
                  }
                  placeholder="Descreva o cronograma previsto para execução do projeto."
                  className={inputClassName}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClassName}>
                  Referências Bibliográficas
                </label>

                <textarea
                  rows={4}
                  value={referencias}
                  onChange={(e) =>
                    setReferencias(
                      e.target.value
                    )
                  }
                  placeholder="Informe livros, artigos científicos, normas técnicas e demais referências utilizadas."
                  className={inputClassName}
                />
              </div>
            </div>
          </div>


          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                loadingTemas
              }
              className="w-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary md:w-auto md:px-10"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />

                  {isEditing
                    ? "Atualizando..."
                    : "Enviando..."}
                </>
              ) : isEditing ? (
                "Salvar Alterações"
              ) : (
                "Enviar Proposta para Avaliação"
              )}
            </Button>

            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  limparFormulario();
                  onSuccess?.();
                }}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}