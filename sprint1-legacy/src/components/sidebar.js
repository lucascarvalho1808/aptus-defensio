import { navigateTo } from "../router.js";

// Sidebar reutilizável para o sistema
export function createSidebar(activePage, usuario) {

    const aside = document.createElement("aside");
    aside.classList.add("dash-sidebar");

    // Menu padrão do sistema
    const menuItems = [];

    // Dashboard disponível para todos
    menuItems.push({
        label: "Dashboard",
        route: "/dashboard",
        key: "dashboard"
    });

    // Menus exclusivos do coordenador
    if (usuario?.role?.toLowerCase() === "coordenador") {

        menuItems.push(
            {
                label: "Administração",
                route: "/admin",
                key: "admin"
            },
            {
                label: "Professores",
                route: "/professores",
                key: "professores"
            },
            {
                label: "Alunos",
                route: "/alunos",
                key: "alunos"
            },
            {
                label: "Temas",
                route: "/temas",
                key: "temas"
            }
        );
    }

    // Menu disponível para alunos
    if (usuario?.role?.toLowerCase() === "aluno") {

        menuItems.push({
            label: "Proposta",
            route: "/proposta",
            key: "proposta"
        });
    }

    // Estrutura HTML da sidebar
    aside.innerHTML = `
        <div class="dash-sidebar-header">
            <img 
                src="/img/logo_capacete.png" 
                alt="Logo" 
                class="dash-sidebar-logo"
            >

            <h2 class="dash-sidebar-brand">
                Aptus Defensio
            </h2>
        </div>

        <ul class="dash-nav-menu">
            ${menuItems.map(item => `
                <li 
                    class="dash-nav-item ${activePage === item.key ? "dash-active" : ""}"
                    data-route="${item.route}"
                >
                    <span>${item.label}</span>
                </li>
            `).join("")}
        </ul>

        <div 
            class="dash-nav-item dash-logout-item"
            id="btn-logout"
            style="margin-top: auto;"
        >
            <span>Sair</span>
        </div>
    `;

    // Navegação dos itens
    const navItems = aside.querySelectorAll(".dash-nav-item");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const route = item.getAttribute("data-route");

            // Ignora item sem rota
            if (!route) return;

            navigateTo(route);

            // Fecha sidebar mobile
            aside.classList.remove("dash-sidebar-open");
            aside.classList.remove("active");
        });

    });

    // Logout
    const btnLogout = aside.querySelector("#btn-logout");

    btnLogout.addEventListener("click", () => {

        sessionStorage.removeItem("usuarioAtivo");

        navigateTo("/");
    });

    return aside;
}