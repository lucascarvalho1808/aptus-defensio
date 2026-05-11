import { showMessage } from "../modules/feedback.js";
import { saveProposta } from "../services/propostaService.js";

export function createPropostaPage() {

  // Container principal da página
  const container = document.createElement("div");
  container.classList.add("dashboard-container");

  container.innerHTML = `
    <div class="content">

      <h1 class="page-title">
        Registro de Proposta de TCC
      </h1>

      <div class="dashboard-grid">

        <div class="admin-card">

          <!-- Caixa de feedback -->
          <div 
            class="feedback-message"
            style="display: none;"
          ></div>

          <form id="proposta-form">

            <!-- TÍTULO -->
            <div class="input-group">
                <label>Título da Proposta</label>

                <div class="input-wrapper">
                <input
                    type="text"
                    id="titulo"
                    placeholder="Digite o título do TCC"
                />
                </div>
            </div>

            <!-- TIPO -->
            <div class="input-group">
                <label>Tipo de Projeto</label>

                <div class="input-wrapper">
                <select id="tipo">
                    <option value="Pesquisa">
                    Projeto de Pesquisa
                    </option>

                    <option value="Implementacao">
                    Projeto de Implementação
                    </option>
                </select>
                </div>
            </div>

            <!-- ORIENTADOR -->
            <div class="input-group">
                <label>Orientador</label>

                <div class="input-wrapper">
                <input
                    type="text"
                    id="orientador"
                    placeholder="Nome do orientador"
                />
                </div>
            </div>

            <!-- LINHA -->
            <div class="input-group">
                <label>Linha de Pesquisa</label>

                <div class="input-wrapper">
                <input
                    type="text"
                    id="linhaPesquisa"
                    placeholder="Ex: Redes, IA, Segurança..."
                />
                </div>
            </div>

            <!-- JUSTIFICATIVA -->
            <div class="input-group">
                <label>Problema e Justificativa</label>

                <div class="input-wrapper">
                <textarea
                    id="justificativa"
                    placeholder="Contextualize o problema do trabalho"
                ></textarea>
                </div>
            </div>

            <!-- OBJETIVO GERAL -->
            <div class="input-group">
                <label>Objetivo Geral</label>

                <div class="input-wrapper">
                <textarea
                    id="objetivoGeral"
                    placeholder="Descreva o objetivo geral"
                ></textarea>
                </div>
            </div>

            <!-- OBJETIVOS ESPECÍFICOS -->
            <div class="input-group">
                <label>Objetivos Específicos</label>

                <div class="input-wrapper">
                <textarea
                    id="objetivosEspecificos"
                    placeholder="Liste os objetivos específicos"
                ></textarea>
                </div>
            </div>

            <!-- METODOLOGIA -->
            <div class="input-group">
                <label>Metodologia</label>

                <div class="input-wrapper">
                <textarea
                    id="metodologia"
                    placeholder="Explique a metodologia utilizada"
                ></textarea>
                </div>
            </div>

            <!-- RESULTADOS -->
            <div class="input-group">
                <label>Resultados Esperados</label>

                <div class="input-wrapper">
                <textarea
                    id="resultados"
                    placeholder="Descreva os resultados esperados"
                ></textarea>
                </div>
            </div>

            <!-- TRABALHOS FUTUROS -->
            <div class="input-group">
                <label>Trabalhos Futuros</label>

                <div class="input-wrapper">
                <textarea
                    id="trabalhosFuturos"
                    placeholder="Descreva possíveis melhorias futuras"
                ></textarea>
                </div>
            </div>

            <!-- CUSTOS -->
            <div class="input-group">
                <label>Custos, Condições e Materiais</label>

                <div class="input-wrapper">
                <textarea
                    id="custos"
                    placeholder="Materiais e recursos necessários"
                ></textarea>
                </div>
            </div>

            <!-- CRONOGRAMA -->
            <div class="input-group">
                <label>Cronograma</label>

                <div class="input-wrapper">
                <textarea
                    id="cronograma"
                    placeholder="Descreva o cronograma do projeto"
                ></textarea>
                </div>
            </div>

            <!-- REFERÊNCIAS -->
            <div class="input-group">
                <label>Referências</label>

                <div class="input-wrapper">
                <textarea
                    id="referencias"
                    placeholder="Digite as referências utilizadas"
                ></textarea>
                </div>
            </div>

            <button type="submit" class="btn-submit">
                Salvar Proposta
            </button>

            </form>

        </div>
      </div>
    </div>
  `;

  // Captura o formulario criado
  const form = container.querySelector("#proposta-form");

  form.addEventListener("submit", (event) => {
    // Isso vai impedir que a página seja recarregada ao submeter o formulário.
    event.preventDefault();

    // Captura os dados do formulário
    const titulo = container.querySelector("#titulo").value.trim();
    const tipo = container.querySelector("#tipo").value;
    const orientador = container.querySelector("#orientador").value.trim();
    const linhaPesquisa = container.querySelector("#linhaPesquisa").value.trim();
    const justificativa = container.querySelector("#justificativa").value.trim();
    const objetivoGeral = container.querySelector("#objetivoGeral").value.trim();
    const objetivosEspecificos = container.querySelector("#objetivosEspecificos").value.trim();
    const metodologia = container.querySelector("#metodologia").value.trim();
    const resultados = container.querySelector("#resultados").value.trim();
    const trabalhosFuturos = container.querySelector("#trabalhosFuturos").value.trim();
    const custos = container.querySelector("#custos").value.trim();
    const cronograma = container.querySelector("#cronograma").value.trim();
    const referencias = container.querySelector("#referencias").value.trim();

    // Verificar se os campos estão vazios
    if (!titulo || !orientador || !linhaPesquisa || !justificativa) {
        showMessage( container, "Preencha os campos obrigatórios.", "error" );
        return;
    }

    const usuarioAtivo = JSON.parse(
      sessionStorage.getItem("usuarioAtivo")
    );

    // Verificar se o usuário está logado
    if (!usuarioAtivo) {
      showMessage(container, "Usuário não autenticado.", "error");
      return;
    }

    // montar objeto proposta
    const proposta = {
    id: Date.now(),

    alunoId: usuarioAtivo.id,
    alunoNome: usuarioAtivo.nome,

    titulo,
    tipo,
    orientador,
    linhaPesquisa,

    justificativa,
    objetivoGeral,
    objetivosEspecificos,
    metodologia,
    resultados,
    trabalhosFuturos,
    custos,
    cronograma,
    referencias,

    status: "Aguardando Orientador",

    createdAt: new Date().toISOString()
    };

    // salvar no localStorage
    saveProposta(proposta);

    showMessage(container, "Proposta cadastrada com sucesso!", "success");

    // Limpa formulário
    form.reset();
  });

  return container;
}