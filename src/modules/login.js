import { hashPassword } from "./auth.js";
import { navigateTo } from "../router.js";

export function createLoginScreen() {
    const section = document.createElement("section");
    section.classList.add("login-section");

    section.innerHTML = `
    <div class="login-card">
        <div class="login-brand">
            <img src="/img/logo_capacete.png" alt="Logo" class="login-logo">
            <h2>Aptus Defensio</h2>
        </div>

        <div id="login-error" class="error-message" style="display: none;"></div>

        <form id="login-form">
            <div class="input-group">
                <label for="email">E-mail :</label>
                <div class="input-wrapper">
                    <input type="email" id="email" placeholder="Insira seu e-mail institucional" required>
                </div>
            </div>

            <div class="input-group">
                <label for="password">Senha :</label>
                <div class="input-wrapper">
                    <input type="password" id="password" placeholder="Insira sua senha" required>
                </div>
            </div>

            <button type="submit" class="btn-submit">Entrar</button>
            
            <a href="#" class="forgot-password">Esqueceu sua senha?</a>
            <a href="/register" id="go-register" class="forgot-password">
              Criar conta
            </a>
        </form>
    </div>
  `;

  section.querySelector("#go-register").addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/register");
  });

  // Captura o formulario criado
  const form = section.querySelector("#login-form");

  // Captura a caixa de erro e cria a função de exibir a mensagem
  const errorBox = section.querySelector("#login-error");
  const mostrarErro = (mensagem) => {
    errorBox.textContent = mensagem;
    errorBox.style.display = "block";
    setTimeout(() => {
        errorBox.style.display = "none";
    }, 3000);
  };

  // Escuta quando o usuário clica em entrar ou aperta enter
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Pega o valor que o usuário digitou nos campos de email e de senha
    const emailDigitado = section.querySelector("#email").value.trim();
    const senhaDigitada = section.querySelector("#password").value;

    // Verificar se nenhum campo está vazio
    if (!emailDigitado || !senhaDigitada) {
      mostrarErro("Preencha todos os campos.");
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
      mostrarErro("E-mail ou senha inválidos.");
      return;
    }

    // Se encontrar apresenta mensagem de sucesso no console
    console.log("Login realizado:", usuarioEncontrado);

    // Salva o usuário ativo na session storage
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