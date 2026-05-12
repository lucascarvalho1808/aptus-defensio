import { verificarAutenticacao } from "../modules/auth.js";
import { navigateTo } from "../router.js";
import { createSidebar } from "../components/sidebar.js";

export function createDashboardPage() {
    // Verifica a segurança
    const usuario = verificarAutenticacao();
    if (!usuario) {
        return document.createElement("div"); 
    }

    const fragment = document.createDocumentFragment();

    // Sidebar reutilizável
    const aside = createSidebar("dashboard", usuario);

    // Cria o conteúdo principal
    const main = document.createElement("main");
    main.classList.add("dash-main-content");
    main.innerHTML = `
        <button class="dash-menu-toggle" id="menu-toggle">☰</button>

        <header class="dash-header-top">
            <h1>Visão Geral</h1>
            <div class="dash-user-profile">Olá, ${usuario.nome}!</div>
        </header>

        <section class="dash-hero-integration">
            <h2 class="dash-hero-title">CONTROLE DE<br>DEFESA E PRAZOS</h2>
            <p class="dash-hero-subtitle">
                Gestão inteligente e automatizada para programas de pós-graduação. 
                O caminho seguro até a sua aprovação final.
            </p>
            <div class="dash-hero-buttons">
                <button class="dash-btn-integrated-primary">Acessar o Sistema</button>
                <button class="dash-btn-integrated-secondary">Agendar Demonstração</button>
            </div>
        </section>

        <h2 style="font-family: 'Cinzel', serif; color: #c9a063; margin-bottom: 25px; font-size: 1.3rem;">
            Módulos do Sistema
        </h2>
        
        <div class="dash-grid">
            <div class="dash-card">
                <h3>Proposta de TCC</h3>
                <ul class="dash-feature-list">
                    <li>Sistema de autenticação</li>
                    <li>Cadastro de temas</li>
                    <li>Envio de proposta</li>
                    <li>Cadastro de Professores e Alunos</li>
                </ul>
                <button class="dash-btn-action">Ver Detalhes</button>
            </div>

            <div class="dash-card">
                <h3>Desenvolvimento</h3>
                <ul class="dash-feature-list">
                    <li>Acompanhamento de progresso</li>
                    <li>Registro de reuniões</li>
                    <li>Visualização de Orientados</li>
                    <li>Envio de documentos</li>
                </ul>
                <button class="dash-btn-action">Acessar Módulo</button>
            </div>

            <div class="dash-card">
                <h3>Defesa</h3>
                <ul class="dash-feature-list">
                    <li>Inscrição para defesa</li>
                    <li>Agendamento de banca</li>
                    <li>Convite de avaliadores</li>
                </ul>
                <button class="dash-btn-action">Iniciar Processo</button>
            </div>
        </div>

        </div> <footer class="dash-footer">
            <p>&copy; 2026 Aptus Defensio - Todos os direitos reservados.</p>
        </footer>
    `;

    // Alternar Sidebar mobile
    const btnMenu = main.querySelector("#menu-toggle");
    btnMenu.addEventListener("click", () => {
        aside.classList.toggle("dash-sidebar-open");
    });

    // Monta a página
    fragment.appendChild(aside);
    fragment.appendChild(main);

    return fragment;
}