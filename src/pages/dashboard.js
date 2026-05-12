import { verificarAutenticacao } from "../modules/auth.js";
import { navigateTo } from "../router.js";

export function createDashboardPage() {
    // Verifica a segurança
    const usuario = verificarAutenticacao();
    if (!usuario) {
        return document.createElement("div"); 
    }

    const fragment = document.createDocumentFragment();

    // Cria a Sidebar
    const aside = document.createElement("aside");
    aside.classList.add("dash-sidebar"); 
    aside.innerHTML = `
        <div class="dash-sidebar-header">
            <img src="/img/logo_capacete.png" alt="Logo" class="dash-sidebar-logo">
            <h2 class="dash-sidebar-brand">Aptus Defensio</h2>
        </div>
        <ul class="dash-nav-menu">
            <li class="dash-nav-item dash-active" data-page="dashboard">
                <span>Dashboard</span>
            </li>
            <li class="dash-nav-item" data-page="prazos">
                <span>Meus Prazos</span>
            </li>
            <li class="dash-nav-item" data-page="professores">
                <span>Professores</span>
            </li>
            <li class="dash-nav-item" data-page="documentos">
                <span>Documentos</span>
            </li>
        </ul>
        <div class="dash-nav-item dash-logout-item" id="btn-logout" style="margin-top: auto;">
            <span>Sair</span>
        </div>
    `;

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

    // Itens do menu
    const menuItems = aside.querySelectorAll(".dash-nav-item");
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(el => el.classList.remove("dash-active"));
            item.classList.add("dash-active");
            
            // Fecha a sidebar ao clicar em um item no mobile
            aside.classList.remove("dash-sidebar-open");
        });
    });

    // Evento de Logout
    const btnLogout = aside.querySelector("#btn-logout");
    btnLogout.addEventListener("click", (event) => {
        event.preventDefault(); 
        sessionStorage.removeItem("usuarioAtivo"); 
        navigateTo("/"); 
    });

    // Monta a página
    fragment.appendChild(aside);
    fragment.appendChild(main);

    return fragment;
}