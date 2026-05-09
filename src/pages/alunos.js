import { navigateTo } from "../router.js";
import { verificarAutenticacao } from "../modules/auth.js";

export function createAlunosPage() {
    // 1. Verificação de Segurança (Apenas Coordenadores acessam)
    const usuarioLogado = verificarAutenticacao();
    if (!usuarioLogado || usuarioLogado.role?.toLowerCase() !== 'coordenador') {
        navigateTo('/pagina-nao-encontrada-404');
        return document.createElement("div");
    }

    const fragment = document.createDocumentFragment();

    // 2. Criar a Sidebar (Reutilizando as classes prof- para aproveitar o CSS)
    const aside = document.createElement("aside");
    aside.classList.add("prof-sidebar");
    aside.innerHTML = `
        <div class="prof-sidebar-header">
            <img src="/img/logo_capacete.png" alt="Logo" class="prof-sidebar-logo">
            <h2 class="prof-sidebar-brand">Aptus Defensio</h2>
        </div>
        <ul class="dash-nav-menu">
            <li class="dash-nav-item" data-page="dashboard">
                <span>Dashboard</span>
            </li>
            <li class="dash-nav-item" data-page="prazos">
                <span>Meus Prazos</span>
            </li>
            <li class="dash-nav-item" data-page="professores">
                <span>Professores</span>
            </li>
            <li class="dash-nav-item dash-active" data-page="alunos">
                <span>Alunos</span>
            </li>
            <li class="dash-nav-item" data-page="documentos">
                <span>Documentos</span>
            </li>
        </ul>
        <div class="dash-nav-item dash-logout-item" id="btn-logout" style="margin-top: auto;">
            <span>Sair</span>
        </div>
    `;

    // 3. Criar o Conteúdo Principal
    const main = document.createElement("main");
    main.classList.add("dash-main-content");
    main.innerHTML = `
        <header class="dash-header-top">
            <button class="prof-menu-toggle" id="menu-toggle">☰</button>
            <h1>Alunos</h1>
            <div class="dash-user-profile">Olá, ${usuarioLogado.nome}!</div>
        </header>

        <section class="dash-hero-integration" style="text-align: left; padding: 30px;">
            <h2 class="dash-hero-title" style="font-size: 24px;">Gestão de Discentes</h2>
            <p class="dash-hero-subtitle" style="margin: 0;">
                Visualize e gerencie os alunos ativos com cadastro devidamente homologado no sistema.
            </p>
        </section>

        <div class="dash-card">
            <h3>Listagem de Alunos Ativos</h3>
            <div class="prof-table-responsive" style="margin-top: 20px;">
                <table class="prof-table">
                    <thead>
                        <tr>
                            <th>MATRÍCULA</th>
                            <th>NOME COMPLETO</th>
                            <th>E-MAIL ACADÊMICO</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody id="lista-alunos">
                        </tbody>
                </table>
            </div>
        </div>
    `;

    // 4. Lógica de Interação (Navegação, Logout e Menu Mobile)
    const menuItems = aside.querySelectorAll(".dash-nav-item");
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            const page = item.getAttribute("data-page");
            if (page) navigateTo(`/${page}`);
        });
    });

    aside.querySelector("#btn-logout").addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.removeItem("usuarioAtivo");
        navigateTo("/");
    });

    // Lógica do Hambúrguer (Mesma da professores.js)
    const btnMenu = main.querySelector("#menu-toggle");
    if (btnMenu) {
        btnMenu.addEventListener("click", (e) => {
            e.stopPropagation();
            aside.classList.toggle("active");
        });
    }

    main.addEventListener("click", () => {
        if (aside.classList.contains("active")) aside.classList.remove("active");
    });

    // 5. Função de Renderização da Tabela de Alunos
    function renderTabelaAlunos() {
        const listaCorpo = main.querySelector("#lista-alunos");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Filtro para ALUNO e ATIVO (Usando optional chaining para segurança)
        const alunosAtivos = usuarios.filter(u => 
            u.role?.toLowerCase() === 'aluno' && 
            u.status?.toLowerCase() === 'ativo'
        );

        if (alunosAtivos.length === 0) {
            listaCorpo.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center; padding: 50px; opacity: 0.5;">
                        Nenhum aluno ativo encontrado no sistema.
                    </td>
                </tr>`;
            return;
        }

        listaCorpo.innerHTML = alunosAtivos.map(aluno => `
            <tr>
                <td><span style="color: var(--gold); font-weight: 600;">#${aluno.matricula || "---"}</span></td>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>
                    <span style="background: rgba(40, 167, 69, 0.1); color: #2ecc71; padding: 5px 12px; border-radius: 50px; font-size: 12px; border: 1px solid rgba(46, 204, 113, 0.3);">
                        ● ATIVO
                    </span>
                </td>
            </tr>
        `).join("");
    }

    renderTabelaAlunos();
    
    fragment.appendChild(aside);
    fragment.appendChild(main);

    return fragment;
}