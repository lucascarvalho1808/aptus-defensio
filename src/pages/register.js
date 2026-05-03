import { navigateTo } from "../router.js";

export function createRegisterPage() {
  const container = document.createElement("div");
  container.classList.add("login-section");

  container.innerHTML = `
    <div class="login-card">
      
      <div class="login-brand">
        <img src="/img/logo_capacete.png" class="login-logo"/>
        <h2>Cadastro</h2>
      </div>

      <!-- Seleção de perfil -->
      <div class="input-group">
        <label>Tipo de usuário</label>
        <div class="input-wrapper">
          <select id="tipo">
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
          </select>
        </div>
      </div>

      <!-- Formulário -->
      <form id="register-form">

        <div class="input-group">
          <label>Nome</label>
          <div class="input-wrapper">
            <input type="text" id="nome" required />
          </div>
        </div>

        <div class="input-group">
          <label>E-mail</label>
          <div class="input-wrapper">
            <input type="email" id="email" required />
          </div>
        </div>

        <div class="input-group">
          <label>Matrícula</label>
          <div class="input-wrapper">
            <input type="text" id="matricula" required />
          </div>
        </div>

        <div class="input-group">
          <label>Senha</label>
          <div class="input-wrapper">
            <input type="password" id="senha" required />
          </div>
        </div>

        <button type="submit" class="btn-submit">
          Cadastrar
        </button>
      </form>

      <a href="/" class="forgot-password">Voltar para login</a>
    </div>
  `;

  return container;
}