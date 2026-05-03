import { navigateTo } from "../router.js";
import { verificarAutenticacao } from "../modules/auth.js";

export function createProfessoresPage() {
  // Apenas coordenadores devem gerenciar esta lista
  const usuarioLogado = verificarAutenticacao();
  if (!usuarioLogado || usuarioLogado.role.toLowerCase() !== 'coordenador') {
    navigateTo('/pagina-nao-encontrada-404');
    return document.createElement("div");
  }

  const container = document.createElement("div");
  container.classList.add("dashboard-container");

  container.innerHTML = `
    <div class="content">
      <h1 class="page-title">Consultar Professores Ativos</h1>

      <div class="dashboard-grid">
        <!-- TABELA (Foco da T2.4) -->
        <div class="admin-card" style="grid-column: 1 / -1;">
          <h2>Professores Ativos no Sistema</h2>
          <p style="color: #888; margin-bottom: 20px;">Esta lista exibe apenas professores que já foram aprovados pela coordenação.</p>

          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="lista-professores">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  // Função de renderização integrada com o LocalStorage global
  function renderTabela() {
    const listaCorpo = container.querySelector("#lista-professores");
    
    // Puxa todos os usuários do sistema
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Apenas professores que estão ativos
    const professoresAtivos = usuarios.filter(u => 
      u.role.toLowerCase() === 'professor' && 
      u.status.toLowerCase() === 'ativo'
    );

    if (professoresAtivos.length === 0) {
      listaCorpo.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhum professor ativo encontrado.</td></tr>`;
      return;
    }

    listaCorpo.innerHTML = professoresAtivos.map(prof => `
        <tr>
          <td><strong>${prof.matricula || "-"}</strong></td>
          <td>${prof.nome}</td>
          <td>${prof.email}</td>
          <td><span style="color: #28a745; font-weight: bold;">Ativo</span></td>
        </tr>
    `).join("");
  }

  // Renderização inicial
  renderTabela();

  return container;
}