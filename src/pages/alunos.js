import { navigateTo } from "../router.js";
import { verificarAutenticacao } from "../modules/auth.js";

export function createAlunosPage() {
  // Apenas coordenadores acessam a listagem oficial
  const usuarioLogado = verificarAutenticacao();
  if (!usuarioLogado || usuarioLogado.role.toLowerCase() !== 'coordenador') {
    navigateTo('/pagina-nao-encontrada-404');
    return document.createElement("div");
  }

  const container = document.createElement("div");
  container.classList.add("dashboard-container");

  container.innerHTML = `
    <div class="content">
      <h1 class="page-title">Consultar Alunos Ativos</h1>

      <div class="dashboard-grid">
        <div class="admin-card" style="grid-column: 1 / -1;">
          <h2>Listagem de Discentes</h2>
          <p style="color: #888; margin-bottom: 20px;">Relatório de alunos com cadastro devidamente homologado no sistema.</p>

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
              <tbody id="lista-alunos">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  function renderTabelaAlunos() {
    const listaCorpo = container.querySelector("#lista-alunos");
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //  Apenas alunos que estão ATIVOS
    const alunosAtivos = usuarios.filter(u => 
      u.role.toLowerCase() === 'aluno' && 
      u.status.toLowerCase() === 'ativo'
    );

    if (alunosAtivos.length === 0) {
      listaCorpo.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhum aluno ativo encontrado no sistema.</td></tr>`;
      return;
    }

    listaCorpo.innerHTML = alunosAtivos.map(aluno => `
        <tr>
          <td><strong>${aluno.matricula || "-"}</strong></td>
          <td>${aluno.nome}</td>
          <td>${aluno.email}</td>
          <td><span style="color: #28a745; font-weight: bold;">Ativo</span></td>
        </tr>
    `).join("");
  }

  renderTabelaAlunos();
  return container;
}