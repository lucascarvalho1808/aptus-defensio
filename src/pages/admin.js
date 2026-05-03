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
  // Captura as grids e o select no DOM recém-criado
  const selectFiltro = container.querySelector('#filtro-papel');
  const gridPendentes = container.querySelector('#grid-pendentes');
  const gridAtivos = container.querySelector('#grid-ativos');

  // Evento de escuta para quando o Coordenador mudar o select
  selectFiltro.addEventListener('change', (event) => {
    const papelSelecionado = event.target.value;
    atualizarListas(papelSelecionado);
  });

  // Função central que busca, filtra e manda renderizar
  function atualizarListas(filtro) {
    // Puxa os dados do localStorage 
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Remove o próprio coordenador da lista de aprovações
    let usuariosFiltrados = usuarios.filter(u => u.role !== 'coordenador');

    // Aplica o filtro selecionado no DOM (aluno, professor ou todos)
    if (filtro !== 'todos') {
      usuariosFiltrados = usuariosFiltrados.filter(u => u.role === filtro);
    }

    // Separa os resultados em Pendentes e Ativos
    const pendentes = usuariosFiltrados.filter(u => u.status === 'pendente');
    const ativos = usuariosFiltrados.filter(u => u.status === 'ativo');

    // Envia para a função de renderização 
    renderizarGrid(pendentes, gridPendentes);
    renderizarGrid(ativos, gridAtivos);
  }

  
  function renderizarGrid(lista, elementoDom) {
    // Limpa a grid atual
    elementoDom.innerHTML = "";
    
    if (lista.length === 0) {
      elementoDom.innerHTML = "<p style='color: #888;'>Nenhum usuário encontrado para este filtro.</p>";
      return;
    }

    
    elementoDom.innerHTML = `<p style="color: #c9a063;">Exibindo ${lista.length} registro(s) ocultos. (Os cards visuais virão na T12.4!)</p>`;
  }

  // Chama a função pela primeira vez para carregar a tela inicial como "Todos"
  atualizarListas('todos');
  return container;
}