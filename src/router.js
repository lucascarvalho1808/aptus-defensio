import { createLoginScreen } from './modules/login.js';
import { createDashboardPage } from './pages/dashboard.js';
import { createProfessoresPage } from "./pages/professores.js";

// Mapa de rotas disponíveis na aplicação
const routes = {
  '/': createLoginScreen,
  '/dashboard': createDashboardPage,
  '/professores': createProfessoresPage, 
  
  // Rota padrão para páginas não encontradas
  '404': () => {
    const el = document.createElement('h1');
    el.textContent = '404 - Página não encontrada';
    return el;
  }
};


// Renderiza a página baseado na URL atual e limpa o container e insere o componente correto
export function handleLocation() {
  // Captura o caminho que o usuário tentou acessar
  let path = window.location.pathname;
  
  // Verifica se existe um usuário logado no sessionStorage
  const usuarioLogado = sessionStorage.getItem("usuarioAtivo");

  // Se o usuário não estiver logado e tentar acessar qualquer página que não seja o Login ('/')
  if (path !== '/' && !usuarioLogado) {
    path = '/'; 
  // Atualiza a URL sem criar um novo histórico
    window.history.replaceState({}, "", path); 
  } 
  
  else if (path === '/' && usuarioLogado) {
    path = '/dashboard'; 
    window.history.replaceState({}, "", path);
  }

  // Busca a função da rota 
  const routeFunction = routes[path] || routes['404'];
 
  const app = document.querySelector('#app');
  app.innerHTML = ""; 
  app.appendChild(routeFunction());
}

export function navigateTo(path) {
  window.history.pushState({}, "", path);
  handleLocation();
}
// Escuta o botão Voltar do navegador
window.addEventListener("popstate", handleLocation);