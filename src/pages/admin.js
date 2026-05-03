import { verificarAutenticacao } from "../modules/auth.js";
import { navigateTo } from "../router.js";

export function createAdminPage() {
  // Proteção de login básico 
  const usuario = verificarAutenticacao();
  if (!usuario) return document.createElement("div");

  // Garante que a string será sempre minúscula para evitar bugs
  const papelUsuario = usuario.role ? usuario.role.toLowerCase() : '';

  if (papelUsuario !== 'coordenador') {

      // Redireciona para uma rota que vai cair no '404' do router silenciosamente.
      navigateTo('/pagina-nao-encontrada-404');
      return document.createElement("div"); 
  }

  // Criação do container principal
  const container = document.createElement("div");
  container.className = "admin-container";

  // Estrutura HTML 
  container.innerHTML = `
    <header class="admin-header">
      <h2>Administração Central de Usuários</h2>
      
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
      <section class="secao-usuarios pendentes">
        <h3>Aprovações Pendentes</h3>
        <div id="grid-pendentes" class="grid-usuarios"></div> 
      </section>

      <hr class="divisor">

      <section class="secao-usuarios ativos">
        <h3>Usuários Ativos</h3>
        <div id="grid-ativos" class="grid-usuarios"></div>
      </section>
    </div>
  `;

  const selectFiltro = container.querySelector('#filtro-papel');
  const gridPendentes = container.querySelector('#grid-pendentes');
  const gridAtivos = container.querySelector('#grid-ativos');

  selectFiltro.addEventListener('change', (event) => {
    const papelSelecionado = event.target.value;
    atualizarListas(papelSelecionado);
  });

  function atualizarListas(filtro) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    let usuariosFiltrados = usuarios.filter(u => u.role && u.role.toLowerCase() !== 'coordenador');

    if (filtro !== 'todos') {
      usuariosFiltrados = usuariosFiltrados.filter(u => u.role && u.role.toLowerCase() === filtro);
    }

    const pendentes = usuariosFiltrados.filter(u => u.status === 'pendente');
    const ativos = usuariosFiltrados.filter(u => u.status === 'ativo');

    renderizarGrid(pendentes, gridPendentes);
    renderizarGrid(ativos, gridAtivos);
  }

  // Renderização com Array.map()
  function renderizarGrid(lista, elementoDom) {
    elementoDom.innerHTML = "";
    
    if (lista.length === 0) {
      elementoDom.innerHTML = "<p style='color: #888;'>Nenhum usuário encontrado para este filtro.</p>";
      return;
    }

    // Percorre a lista de usuários e transforma cada objeto num bloco de HTML
    const htmlCards = lista.map(user => {
      // Adiciona lógica visual verde para ativo, dourado para pendente
      const corStatus = user.status === 'ativo' ? '#28a745' : '#c9a063';
      
      return `
        <div class="user-card">
          <h4 style="color: #c9a063; margin: 0 0 10px 0;">${user.nome || 'Usuário Sem Nome'}</h4>
          <p style="margin: 5px 0;"><strong>E-mail:</strong> ${user.email}</p>
          <p style="margin: 5px 0; text-transform: capitalize;"><strong>Papel:</strong> ${user.role}</p>
          <p style="margin: 5px 0; text-transform: capitalize;">
            <strong>Status:</strong> 
            <span style="color: ${corStatus}; font-weight: bold;">${user.status}</span>
          </p>
        </div>
      `;
    }).join(''); 

    // Injetam tudo de no DOM
    elementoDom.innerHTML = htmlCards;
  }

  atualizarListas('todos');
  return container;
}