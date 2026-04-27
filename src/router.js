import { createLoginScreen } from './modules/login.js';
import { createDashboardPage } from './pages/dashboard.js';

// Mapa de rotas disponíveis na aplicação
const routes = {
  '/': createLoginScreen,
  '/dashboard': createDashboardPage,
  // Rota padrão para páginas não encontradas
  '404': () => {
    const el = document.createElement('h1');
    el.textContent = '404 - Página não encontrada';
    return el;
  }
};


// Renderiza a página baseado na URL atual e limpa o container e insere o componente correto
export function handleLocation() {
  const path = window.location.pathname;
  // Busca a rota correspondente ou utiliza a rota 404
  const routeFunction = routes[path] || routes['404'];
  
  // Seleciona o elemento raiz da aplicação
  const app = document.querySelector('#app');
  app.innerHTML = ""; 
  app.appendChild(routeFunction());
}

export function navigateTo(path) {
  // Atualiza o histórico do navegador
  window.history.pushState({}, "", path);
  // Renderiza a página correspondente
  handleLocation();
}

// Escuta o botão Voltar do navegador
window.addEventListener("popstate", handleLocation);