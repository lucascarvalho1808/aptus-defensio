"use client";

import { useState } from "react";
import { useCreateProposta } from "@/hooks/useCreateProposta";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function PropostaForm() {

  const user = useAuthStore(
    (state) => state.user
  );

  const createPropostaMutation =
    useCreateProposta();

  // Estados do Formulário
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!titulo || !orientador || !linhaPesquisa || !justificativa) {
      toast.error("Campos obrigatórios", {
        description: "Preencha todos os campos antes de enviar.",
      });
      return;
    }

    if (!user) {
      toast.error("Acesso Negado", {
        description: "Usuário não autenticado.",
      });
      return;
    }

    try {
      await createPropostaMutation.mutateAsync({
        aluno_id: user.id,
        titulo,
        tipo,
        orientador,
        linha_pesquisa: linhaPesquisa,
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
          "Aguardando Orientador",
      });

      toast.success("Proposta enviada", {
        description: "Sua proposta foi enviada com sucesso.",
      });

      // Limpar formulário
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
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar proposta", {
        description: "Não foi possível salvar a proposta.",
      });
  }

  const inputClassName = "w-full rounded-lg border border-white/10 bg-black/20 p-3 text-foreground transition-all duration-200 placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelClassName = "mb-2 block text-sm font-medium text-foreground/90";

  return (
    <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
      <CardHeader className="border-b border-white/5 pb-5">
        <CardTitle className="font-heading text-xl text-primary">
          Formulário de Submissão
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">1. Informações Básicas</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelClassName}>Título da Proposta *</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Digite o título provisório do TCC"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Tipo de Projeto *</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className={`${inputClassName} appearance-none cursor-pointer`}
                >
                  <option value="Pesquisa" className="bg-sidebar">Projeto de Pesquisa</option>
                  <option value="Implementacao" className="bg-sidebar">Projeto de Implementação</option>
                </select>
              </div>

              <div>
                <label className={labelClassName}>Orientador *</label>
                <input
                  type="text"
                  value={orientador}
                  onChange={(e) => setOrientador(e.target.value)}
                  placeholder="Nome do orientador desejado"
                  className={inputClassName}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClassName}>Linha de Pesquisa *</label>
                <input
                  type="text"
                  value={linhaPesquisa}
                  onChange={(e) => setLinhaPesquisa(e.target.value)}
                  placeholder="Ex: Inteligência Artificial, Engenharia de Software..."
                  className={inputClassName}
                />
              </div>
            </div>
          </div>

          <hr className="border-white/5" />

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">2. Fundamentação e Metodologia</h3>
            <div className="space-y-5">
              <div>
                <label className={labelClassName}>Problema e Justificativa *</label>
                <textarea
                  rows={4}
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                  placeholder="Qual o problema abordado e qual a relevância de resolvê-lo?"
                  className={inputClassName}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className={labelClassName}>Objetivo Geral</label>
                  <textarea
                    rows={4}
                    value={objetivoGeral}
                    onChange={(e) => setObjetivoGeral(e.target.value)}
                    placeholder="O que se pretende alcançar ao final da pesquisa?"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className={labelClassName}>Objetivos Específicos</label>
                  <textarea
                    rows={4}
                    value={objetivosEspecificos}
                    onChange={(e) => setObjetivosEspecificos(e.target.value)}
                    placeholder="Passos intermediários para atingir o objetivo geral"
                    className={inputClassName}
                  />
                </div>
              </div>

              <div>
                <label className={labelClassName}>Metodologia</label>
                <textarea
                  rows={4}
                  value={metodologia}
                  onChange={(e) => setMetodologia(e.target.value)}
                  placeholder="Como o trabalho será desenvolvido? Quais técnicas/ferramentas?"
                  className={inputClassName}
                />
              </div>
            </div>
          </div>

          <hr className="border-white/5" />

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">3. Planejamento e Conclusões</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className={labelClassName}>Resultados Esperados</label>
                <textarea
                  rows={3}
                  value={resultados}
                  onChange={(e) => setResultados(e.target.value)}
                  placeholder="O que será entregue ou provado?"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Trabalhos Futuros</label>
                <textarea
                  rows={3}
                  value={trabalhosFuturos}
                  onChange={(e) => setTrabalhosFuturos(e.target.value)}
                  placeholder="Possíveis extensões que não caberão neste escopo"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Materiais e Custos</label>
                <textarea
                  rows={3}
                  value={custos}
                  onChange={(e) => setCustos(e.target.value)}
                  placeholder="Recursos computacionais, licenças, hardware..."
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Cronograma</label>
                <textarea
                  rows={3}
                  value={cronograma}
                  onChange={(e) => setCronograma(e.target.value)}
                  placeholder="Estimativa de tempo para as fases do projeto"
                  className={inputClassName}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClassName}>Referências Bibliográficas</label>
                <textarea
                  rows={4}
                  value={referencias}
                  onChange={(e) => setReferencias(e.target.value)}
                  placeholder="Cite os principais autores e trabalhos correlatos"
                  className={inputClassName}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={
                createPropostaMutation.isPending
              }
              className="w-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary md:w-auto md:px-10"
            >
              {createPropostaMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Enviando Proposta...
                </>
              ) : (
                "Enviar Proposta para Avaliação"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}