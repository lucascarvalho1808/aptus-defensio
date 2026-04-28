import { hashPassword } from "./auth.js";
import { navigateTo } from "../router.js";

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

    // Pega o valor que o usuário digitou nos campos de email e de senha
    const emailDigitado = section.querySelector("#email").value.trim();
    const senhaDigitada = section.querySelector("#password").value;

    // Verificar se nenhum campo está vazio
    if (!emailDigitado || !senhaDigitada) {
      alert("Preencha todos os campos.");
      return;
    }

    // Chama a função para criptografar a senha
    const senhaCriptografada = await hashPassword(senhaDigitada);

    // Pegar Array de objetos com usuários
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Busca usuário a partir da condição (email e senha) retornando o primeiro elemento encontrado no Array
    const usuarioEncontrado = usuarios.find(user =>
      user.email === emailDigitado && user.senha === senhaCriptografada
    );

    // Se não encontrar apresenta erro
    if (!usuarioEncontrado) {
      alert("E-mail ou senha inválidos.");
      return;
    }

    // Se encontrar apresenta mensagem de sucesso no console
    console.log("Login realizado:", usuarioEncontrado);

    // isso é da task 1.6
    sessionStorage.setItem("usuarioAtivo", JSON.stringify({
      id: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
      role: usuarioEncontrado.role
    }));

    // Redireciona para a rota após login bem-sucedido
    navigateTo("/dashboard");
  });

  return section;
}