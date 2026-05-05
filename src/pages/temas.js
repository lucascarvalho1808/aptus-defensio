import { verificarAutenticacao } from "../modules/auth.js";

export function createTemasPage() {
  const usuarioLogado = verificarAutenticacao();
  if (!usuarioLogado) 
    return document.createElement("div");

  const container = document.createElement("div");
  

  container.innerHTML = `
    <div class="temas-page">
      <h1 class="page-title"> Gerenciamento de Temas</h1>

      <div class="admin-card">
        <h2> Adicionar Tema </h2>

        <input type="text" id="input-tema" placeholder="Digite um tema.." />
        <button id="botao-adicionar">Adicionar Tema</button>

        <div id="container-temas">  </div>
      
        </div>
    </div>
  `;

  return container;
}