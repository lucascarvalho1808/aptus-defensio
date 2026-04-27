export function CreateLoginScreen() {
    const section = document.createElement("section");
    section.classList.add("login-section");

    section.innerHTML = `
    <div class="login-card">
      <h2>Login - Aptus Defensio</h2>
      <form id="login-form">
        <div class="input-group">
          <label for="email">E-mail</label>
          <input type="text" id="email" required placeholder="Insira seus dados">
        </div>
        <div class="input-group">
          <label for="password">Senha</label>
          <input type="password" id="password" required placeholder="Insira sua senha">
        </div>
        <button type="submit" class="btn-primary">Entrar</button>
      </form>
    </div>
  `;

  return section;
    
}