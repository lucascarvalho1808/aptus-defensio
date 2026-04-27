import { hashPassword } from "./auth";

export function createLoginScreen() {
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

  // Captura o formuçario criado
  const form = section.querySelector("#login-form");

  // Escuta quando o usuário clica em entrar ou aperta enter
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    // Pega o valor que o usuário digitou no campo de senha
    const senhaDigitada = section.querySelector("#password").value;

    // Chama a função para criptografar a senha
    const senhaCriptografada = await hashPassword(senhaDigitada);

    // Mostra o resultado no console para testes
    console.log("TESTE - Senha Original:", senhaDigitada);
    console.log("TESTE -  Senha com Hash:", senhaCriptografada);
    
    // Futuramente, aqui entrará a lógica de verificar se o hash bate com o salvo no banco de dados
    alert("TESTE - Hash gerado com sucesso, veja o console.");
  });

  return section;
}