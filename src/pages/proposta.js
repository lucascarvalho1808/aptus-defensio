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
                  placeholder="Digite o título do TCC"
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
                  placeholder="Digite um resumo da proposta"
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

  return container;
}