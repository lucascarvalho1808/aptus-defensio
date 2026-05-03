import { verificarAutenticacao } from "../modules/auth.js";
import { navigateTo } from "../router.js";

export function createAdminPage() {
  // Proteção de login básico 
  const usuario = verificarAutenticacao();
  if (!usuario) return document.createElement("div");

  // Proteção de Autorização apenas Coordenador tem acesso
  if (usuario.role !== 'coordenador') {
      alert("Acesso negado. Apenas coordenadores podem acessar a administração.");
      navigateTo('/dashboard');
      return document.createElement("div"); 
  }

  // Criação do container principal
  const container = document.createElement("div");
  container.className = "admin-container";

  // Estrutura HTML 
  container.innerHTML = `
    <header class="admin-header">
      <h2>Administração Central de Usuários</h2>
      
      <!-- Filtro dinâmico -->
      <div class="admin-filtros">
        <label for="filtro-papel">Filtrar por Papel:</label>
        <select id="filtro-papel">
          <option value="todos">Todos</option>
          <option value="aluno">Alunos</option>
          <option value="professor">Professores</option>
        </select>
      </div>
    </header>

    <div class="admin-content">
      <!-- Seção de Usuários Pendentes -->
      <section class="secao-usuarios pendentes">
        <h3>Aprovações Pendentes</h3>
        <!-- O Array.map() da T12.4 vai injetar os cards aqui -->
        <div id="grid-pendentes" class="grid-usuarios"></div> 
      </section>

      <hr class="divisor">

      <!-- Seção de Usuários Ativos -->
      <section class="secao-usuarios ativos">
        <h3>Usuários Ativos</h3>
        <!-- O Array.map() da T12.4 vai injetar os cards aqui -->
        <div id="grid-ativos" class="grid-usuarios"></div>
      </section>
    </div>
  `;

  return container;
}