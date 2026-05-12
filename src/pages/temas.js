import { navigateTo } from "../router.js";
import { verificarAutenticacao } from "../modules/auth.js";

export function createTemasPage() {
    // 1. Verificação de Segurança
    const usuarioLogado = verificarAutenticacao();
    if (!usuarioLogado || usuarioLogado.role?.toLowerCase() !== 'coordenador') {
        navigateTo('/404');
        return document.createElement("div");
    }

    const fragment = document.createDocumentFragment();

    // 2. Sidebar
    const aside = document.createElement("aside");
    aside.classList.add("temas-sidebar");
    aside.innerHTML = `
        <div class="temas-sidebar-header">
            <img src="/img/logo_capacete.png" alt="Logo" class="temas-sidebar-logo">
            <h2 class="temas-sidebar-brand">Aptus Defensio</h2>
        </div>
        <ul class="dash-nav-menu">
            <li class="dash-nav-item" data-page="dashboard"><span>Dashboard</span></li>
            <li class="dash-nav-item" data-page="professores"><span>Professores</span></li>
            <li class="dash-nav-item" data-page="alunos"><span>Alunos</span></li>
            <li class="dash-nav-item dash-active" data-page="temas"><span>Temas</span></li>
        </ul>
        <div class="dash-nav-item dash-logout-item" id="btn-logout" style="margin-top: auto;">
            <span>Sair</span>
        </div>
    `;

    // 3. Conteúdo Principal
    const main = document.createElement("main");
    main.classList.add("temas-main-content");

    main.innerHTML = `
    <div class="dash-content-wrapper">
        <header class="dash-header-top">
            <button class="temas-menu-toggle" id="menu-toggle">☰</button>
            <h1>Temas</h1>
            <div class="dash-user-profile">Olá, ${usuarioLogado.nome}!</div>
        </header>

        <section class="dash-hero-integration" style="text-align: left; padding: 30px;">
            <h2 class="dash-hero-title" style="font-size: 24px;">Banco de Áreas de Estudo</h2>
            <p class="dash-hero-subtitle" style="margin: 0;">
                Cadastre e gerencie as áreas e temas disponíveis para os projetos de TCC deste semestre.
            </p>
        </section>

        <div class="dash-card" style="margin-bottom: 30px;">
            <h3>Adicionar Novo Tema</h3>
            <div style="display: flex; gap: 15px; margin-top: 20px; flex-wrap: wrap;">
                <input type="text" id="input-tema" placeholder="Ex: Inteligência Artificial na Saúde" 
                       style="flex: 1; padding: 12px; border-radius: 8px; border: 1px solid rgba(201, 160, 99, 0.3); background: rgba(0,0,0,0.2); color: white; min-width: 250px;">
                <button id="botao-adicionar" class="btn-error" style="background: var(--wine); border: none; padding: 0 25px; border-radius: 8px; color: white; cursor: pointer; font-weight: bold;">
                    Cadastrar Tema
                </button>
            </div>
        </div>

        <div class="dash-card">
            <h3>Temas Cadastrados</h3>
            <div class="temas-table-responsive">
                <table class="temas-table">
                    <thead>
                        <tr>
                            <th>IDENTIFICADOR</th>
                            <th>NOME DOS TEMAS</th>
                            <th style="text-align: center;">AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody id="container-temas">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <footer class="dash-footer">
        <p>&copy; 2026 Aptus Defensio - Todos os direitos reservados.</p>
    </footer>
    `;

    // 4. Lógica de Navegação e Menu
    aside.querySelectorAll(".dash-nav-item").forEach(item => {
        item.addEventListener("click", () => {
            const page = item.getAttribute("data-page");
            if (page) navigateTo(`/${page}`);
        });
    });

    aside.querySelector("#btn-logout").addEventListener("click", () => {
        sessionStorage.removeItem("usuarioAtivo");
        navigateTo("/");
    });

    main.querySelector(".temas-menu-toggle").addEventListener("click", () => {
        aside.classList.toggle("active");
    });

    // 5. Lógica de Temas (LocalStorage)
    const inputTema = main.querySelector("#input-tema");
    const btnAdd = main.querySelector("#botao-adicionar");
    const container = main.querySelector("#container-temas");

    function renderTemas() {
        const temas = JSON.parse(localStorage.getItem("temas")) || [];
        if (temas.length === 0) {
            container.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 40px; opacity: 0.5;">Nenhum tema cadastrado.</td></tr>`;
            return;
        }
        container.innerHTML = temas.map((t, index) => `
    <tr>
        <td style="color: var(--gold); font-weight: 600;">#TM-${index + 1}</td>
        <td>${t}</td>
        <td style="text-align: center;">
            <button class="btn-delete" data-index="${index}" title="Excluir Tema">
                <svg viewBox="0 0 448 512" width="18" height="18" fill="currentColor">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
            </button>
        </td>
    </tr>
`).join("");

        // Eventos de deletar
        container.querySelectorAll(".btn-delete").forEach(btn => {
            btn.addEventListener("click", () => {
                const idx = btn.getAttribute("data-index");
                temas.splice(idx, 1);
                localStorage.setItem("temas", JSON.stringify(temas));
                renderTemas();
            });
        });
    }

    btnAdd.addEventListener("click", () => {
        const novoTema = inputTema.value.trim();
        if (novoTema) {
            const temas = JSON.parse(localStorage.getItem("temas")) || [];
            temas.push(novoTema);
            localStorage.setItem("temas", JSON.stringify(temas));
            inputTema.value = "";
            renderTemas();
        }
    });

    renderTemas();
    fragment.appendChild(aside);
    fragment.appendChild(main);
    return fragment;
}