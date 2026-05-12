import { navigateTo } from "../router.js";
import { verificarAutenticacao } from "../modules/auth.js";
import { createSidebar } from "../components/sidebar.js";

export function createProfessoresPage() {
    // 1. Verificação de Segurança
    const usuarioLogado = verificarAutenticacao();
    if (!usuarioLogado || usuarioLogado.role?.toLowerCase() !== 'coordenador') {
        navigateTo('/pagina-nao-encontrada-404');
        return document.createElement("div");
    }

    const fragment = document.createDocumentFragment();

    // Sidebar reutilizável
    const aside = createSidebar("professores", usuarioLogado);

    // 3. Criar o Conteúdo Principal (Com botão hambúrguer para mobile)
    const main = document.createElement("main");
    main.classList.add("prof-main-content");

    main.innerHTML = `
    <div class="dash-content-wrapper">
        <header class="dash-header-top">
            <button class="prof-menu-toggle" id="menu-toggle">☰</button>
            <h1>Professores</h1>
            <div class="dash-user-profile">Olá, ${usuarioLogado.nome}!</div>
        </header>

        <section class="prof-hero-integration">
            <h2 class="prof-hero-title" style="font-size: 24px;">Gestão de Corpo Docente</h2>
            <p class="prof-hero-subtitle" style="margin: 0;">
                Visualize e gerencie os professores ativos autorizados a orientar projetos e participar de bancas.
            </p>
        </section>

        <div class="dash-card">
            <h3>Professores Ativos no Sistema</h3>
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
                    <tbody id="lista-professores">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <footer class="dash-footer">
        <p>&copy; 2026 Aptus Defensio - Todos os direitos reservados.</p>
    </footer>
`;

    // Lógica do Botão Hambúrguer
    const btnMenu = main.querySelector(".prof-menu-toggle");
    btnMenu.addEventListener("click", () => {
        aside.classList.toggle("dash-sidebar-open");
    });

    // 5. Função de Renderização da Tabela (Com data-labels para mobile)
    function renderTabela() {
        const listaCorpo = main.querySelector("#lista-professores");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const professoresAtivos = usuarios.filter(u =>
            u.role?.toLowerCase() === 'professor' &&
            u.status?.toLowerCase() === 'ativo'
        );

        if (professoresAtivos.length === 0) {
            listaCorpo.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center; padding: 50px; opacity: 0.5;">
                        Nenhum professor ativo encontrado no sistema.
                    </td>
                </tr>`;
            return;
        }

        listaCorpo.innerHTML = professoresAtivos.map(prof => `
            <tr>
                <td data-label="Matrícula"><span style="color: var(--gold); font-weight: 600;">#${prof.matricula || "000"}</span></td>
                <td data-label="Nome">${prof.nome}</td>
                <td data-label="E-mail">${prof.email}</td>
                <td data-label="Status">
                    <span style="background: rgba(40, 167, 69, 0.1); color: #2ecc71; padding: 5px 12px; border-radius: 50px; font-size: 12px; border: 1px solid rgba(46, 204, 113, 0.3);">
                        ● ATIVO
                    </span>
                </td>
            </tr>
        `).join("");
    }

    renderTabela();
    fragment.appendChild(aside);
    fragment.appendChild(main);

    return fragment;
}