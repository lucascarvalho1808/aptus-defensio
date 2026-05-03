import { verificarAutenticacao } from "../modules/auth.js";
import { navigateTo } from "../router.js";

export function createAdminPage() {
  const usuario = verificarAutenticacao();
  if (!usuario) return document.createElement("div");

  const papelUsuario = usuario.role ? usuario.role.toLowerCase() : '';
  if (papelUsuario !== 'coordenador') {
      navigateTo('/pagina-nao-encontrada-404');
      return document.createElement("div"); 
  }

  const container = document.createElement("div");
  container.className = "admin-container";

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
    atualizarListas(event.target.value);
  });

  // Função para mudar o status e salvar no banco 
  function aprovarUsuario(idUsuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.map(u => {
      if (String(u.id) === String(idUsuario)) {
        return { ...u, status: 'ativo' };
      }
      return u;
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    atualizarListas(selectFiltro.value); 
  }

  // Função para excluir o cadastro 
  function rejeitarUsuario(idUsuario) {
    if(!confirm("Tem certeza que deseja rejeitar e excluir este cadastro?")) return;
    
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(u => String(u.id) !== String(idUsuario));
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    atualizarListas(selectFiltro.value); 
  }

  function atualizarListas(filtro) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    let usuariosFiltrados = usuarios.filter(u => u.role && u.role.toLowerCase() !== 'coordenador');

    if (filtro !== 'todos') {
      usuariosFiltrados = usuariosFiltrados.filter(u => u.role && u.role.toLowerCase() === filtro);
    }

    //  Força o toLowerCase() na verificação
    const pendentes = usuariosFiltrados.filter(u => u.status && u.status.toLowerCase() === 'pendente');
    const ativos = usuariosFiltrados.filter(u => u.status && u.status.toLowerCase() === 'ativo');

    renderizarGrid(pendentes, gridPendentes);
    renderizarGrid(ativos, gridAtivos);
  }

  function renderizarGrid(lista, elementoDom) {
    elementoDom.innerHTML = "";
    
    if (lista.length === 0) {
      elementoDom.innerHTML = "<p style='color: #888;'>Nenhum usuário encontrado para este filtro.</p>";
      return;
    }

    const htmlCards = lista.map(user => {
      const statusUser = user.status ? user.status.toLowerCase() : 'pendente';
      const corStatus = statusUser === 'ativo' ? '#28a745' : '#c9a063';
      
      // Cria os botões se o usuário for pendente
      let botoesHtml = '';
      if (statusUser === 'pendente') {
        botoesHtml = `
          <div style="margin-top: 15px; display: flex; gap: 10px;">
            <button class="btn-aprovar" data-id="${user.id}" style="background-color: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; font-weight: bold; flex: 1;">Aprovar</button>
            <button class="btn-rejeitar" data-id="${user.id}" style="background-color: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; font-weight: bold; flex: 1;">Rejeitar</button>
          </div>
        `;
      }
      
      // Adiciona a Matrícula no HTML
      return `
        <div class="user-card">
          <h4 style="color: #c9a063; margin: 0 0 10px 0;">${user.nome || 'Usuário Sem Nome'}</h4>
          <p style="margin: 5px 0;"><strong>Matrícula:</strong> ${user.matricula || 'N/A'}</p>
          <p style="margin: 5px 0;"><strong>E-mail:</strong> ${user.email}</p>
          <p style="margin: 5px 0; text-transform: capitalize;"><strong>Papel:</strong> ${user.role}</p>
          <p style="margin: 5px 0; text-transform: capitalize;">
            <strong>Status:</strong> 
            <span style="color: ${corStatus}; font-weight: bold;">${statusUser}</span>
          </p>
          ${botoesHtml}
        </div>
      `;
    }).join('');

    elementoDom.innerHTML = htmlCards;

    // Conecta os botões de Aprovar e Rejeitar às funções criadas 
    if (elementoDom.id === 'grid-pendentes') {
      elementoDom.querySelectorAll('.btn-aprovar').forEach(btn => {
        btn.addEventListener('click', (e) => aprovarUsuario(e.target.dataset.id));
      });
      elementoDom.querySelectorAll('.btn-rejeitar').forEach(btn => {
        btn.addEventListener('click', (e) => rejeitarUsuario(e.target.dataset.id));
      });
    }
  }

  atualizarListas('todos');
  return container;
}