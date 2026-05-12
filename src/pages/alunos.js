import { navigateTo } from "../router.js";
import { verificarAutenticacao } from "../modules/auth.js";
import { createSidebar } from "../components/sidebar.js";

export function createAlunosPage() {
    // 1. Verificação de Segurança (Apenas Coordenadores acessam)
    const usuarioLogado = verificarAutenticacao();
    if (!usuarioLogado || usuarioLogado.role?.toLowerCase() !== 'coordenador') {
        navigateTo('/pagina-nao-encontrada-404');
        return document.createElement("div");
    }

    const fragment = document.createDocumentFragment();

    // Sidebar reutilizável
    const aside = createSidebar("alunos", usuarioLogado);

    // 3. Criar o Conteúdo Principal
    const main = document.createElement("main");
    main.classList.add("prof-main-content");

    main.innerHTML = `
    <div class="dash-content-wrapper">
        <header class="dash-header-top">
            <button class="prof-menu-toggle" id="menu-toggle">☰</button>
            <h1>Alunos</h1>
            <div class="dash-user-profile">Olá, ${usuarioLogado.nome}!</div>
        </header>

        <section class="prof-hero-integration" style="text-align: left; padding: 30px;">
            <h2 class="prof-hero-title" style="font-size: 24px;">Gestão de Discentes</h2>
            <p class="prof-hero-subtitle" style="margin: 0;">
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
    </div>

    <footer class="dash-footer">
        <p>&copy; 2026 Aptus Defensio - Todos os direitos reservados.</p>
    </footer>
`;

    // Lógica do Hambúrguer (Mesma da professores.js)
    const btnMenu = main.querySelector("#menu-toggle");
    if (btnMenu) {
        btnMenu.addEventListener("click", (e) => {
            e.stopPropagation();
            aside.classList.toggle("dash-sidebar-open");
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