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

            <div class="input-group">
              <label>Título do TCC</label>

              <div class="input-wrapper">
                <input
                  type="text"
                  id="titulo"
                  placeholder="Digite o título"
                />
              </div>
            </div>

            <div class="input-group">
              <label>Linha de Pesquisa</label>

              <div class="input-wrapper">
                <input
                  type="text"
                  id="linhaPesquisa"
                  placeholder="Ex: Inteligência Artificial"
                />
              </div>
            </div>

            <div class="input-group">
              <label>Resumo</label>

              <div class="input-wrapper">
                <textarea
                  id="resumo"
                  placeholder="Digite o resumo da proposta"
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

    // Captura valores
    const titulo = container.querySelector("#titulo").value.trim();
    const linhaPesquisa = container.querySelector("#linhaPesquisa").value.trim();
    const resumo = container.querySelector("#resumo").value.trim();

    // Verificar se os campos estão vazios
    if (!titulo || !linhaPesquisa || !resumo) {
      showMessage(container, "Preencha todos os campos.", "error");
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
      linhaPesquisa,
      resumo,
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