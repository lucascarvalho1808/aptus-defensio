import { verificarAutenticacao } from "../modules/auth.js";
import { navigateTo } from "../router.js";
import { createSidebar } from "../components/sidebar.js";

export function createAdminPage() {
    const usuarioLogado = verificarAutenticacao();
    if (!usuarioLogado || usuarioLogado.role?.toLowerCase() !== 'coordenador') {
        navigateTo('/pagina-nao-encontrada-404');
        return document.createElement("div");
    }

    const fragment = document.createDocumentFragment();

    // Sidebar reutilizável
    const aside = createSidebar("admin", usuarioLogado);
    
    const main = document.createElement("main");
    main.classList.add("admin-main-content");

    main.innerHTML = `
    <div class="admin-content-wrapper">
        <header class="admin-header-top">
            <div class="admin-header-left">
                <button class="dash-menu-toggle" id="menu-toggle">☰</button>
                <h1>Administração de Usuários</h1>
            </div>
            <div class="admin-filter-wrapper">
                <label>Filtrar por:</label>
                <div class="admin-custom-select" id="custom-select">
                    <div class="select-trigger">
                        <span>Todos</span>
                        <div class="arrow"></div>
                    </div>
                    <div class="select-options">
                        <div class="option selected" data-value="todos">Todos</div>
                        <div class="option" data-value="aluno">Alunos</div>
                        <div class="option" data-value="professor">Professores</div>
                    </div>
                </div>
            </div>
        </header>

        <div class="admin-card-section">
            <div class="admin-section-header">
                <h3 class="admin-aprovacoes-title">Aprovações Pendentes</h3>
                <span id="badge-pendentes" class="admin-badge-count">0</span>
            </div>
            <div id="grid-pendentes" class="admin-grid"></div>
        </div>

        <div class="admin-card-section">
            <h3 class="admin-section-title">Usuários Ativos</h3>
            <div id="grid-ativos" class="admin-grid"></div>
        </div>
    </div>

    <footer class="admin-footer">
        <p>&copy; 2026 Aptus Defensio - Todos os direitos reservados.</p>
    </footer>
    `;

    const gridPendentes = main.querySelector('#grid-pendentes');
    const gridAtivos = main.querySelector('#grid-ativos');
    const badgePendentes = main.querySelector('#badge-pendentes');

    // Seletores do Dropdown Customizado
    const customSelect = main.querySelector('#custom-select');
    const trigger = customSelect.querySelector('.select-trigger');
    const options = customSelect.querySelectorAll('.option');
    const triggerText = trigger.querySelector('span');

    // Variável de controle de filtro atual
    let filtroAtual = 'todos';

    const atualizarListas = (filtro) => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let filtrados = usuarios.filter(u => u.role?.toLowerCase() !== 'coordenador');

        if (filtro !== 'todos') {
            filtrados = filtrados.filter(u => u.role?.toLowerCase() === filtro);
        }

        const pendentes = filtrados.filter(u => u.status?.toLowerCase() === 'pendente');
        const ativos = filtrados.filter(u => u.status?.toLowerCase() === 'ativo');

        badgePendentes.textContent = pendentes.length;
        renderizarCards(pendentes, gridPendentes, true);
        renderizarCards(ativos, gridAtivos, false);
    };

    function renderizarCards(lista, elemento, isPendente) {
        elemento.innerHTML = lista.length === 0
            ? `<p class="admin-empty-msg">Nenhum usuário encontrado.</p>`
            : "";

        lista.forEach(user => {
            const card = document.createElement("div");
            card.classList.add("admin-user-card");

            card.innerHTML = `
                <div class="admin-user-info">
                    <span class="admin-user-role">${user.role}</span>
                    <h4 class="admin-user-name">${user.nome}</h4>
                    <p><strong>Matrícula:</strong> #${user.matricula}</p>
                    <p><strong>E-mail:</strong> ${user.email}</p>
                </div>
                ${isPendente ? `
                    <div class="admin-actions">
                        <button class="admin-btn approve" data-id="${user.id}">Aprovar</button>
                        <button class="admin-btn reject" data-id="${user.id}">Rejeitar</button>
                    </div>
                ` : `
                    <div class="admin-status-ok">● Ativo</div>
                `}
            `;

            if (isPendente) {
                card.querySelector('.approve').onclick = () => mudarStatus(user.id, 'ativo');
                card.querySelector('.reject').onclick = () => excluirUsuario(user.id);
            }
            elemento.appendChild(card);
        });
    }

    function mudarStatus(id, status) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        usuarios = usuarios.map(u => String(u.id) === String(id) ? { ...u, status } : u);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        atualizarListas(filtroAtual);
    }

    function excluirUsuario(id) {
        if (!confirm("Excluir cadastro?")) return;
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        usuarios = usuarios.filter(u => String(u.id) !== String(id));
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        atualizarListas(filtroAtual);
    }

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        customSelect.classList.toggle('open');
    });

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            const value = opt.getAttribute('data-value');
            filtroAtual = value;

            triggerText.textContent = opt.textContent;
            options.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');

            customSelect.classList.remove('open');
            atualizarListas(value);
        });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', () => {
        customSelect.classList.remove('open');
    });

    main.querySelector("#menu-toggle").onclick = (e) => {
        e.stopPropagation();
        aside.classList.toggle("dash-sidebar-open");
    };

    atualizarListas('todos');
    fragment.appendChild(aside);
    fragment.appendChild(main);
    return fragment;
}