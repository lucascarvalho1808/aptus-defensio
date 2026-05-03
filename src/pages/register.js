import { navigateTo } from "../router.js";
import { hashPassword } from "../modules/auth.js";

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
          <div id="campos-dinamicos"></div>
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

  // Captura elementos
  const selectTipo = container.querySelector("#tipo");
  const camposDinamicos = container.querySelector("#campos-dinamicos");

  // Função que renderiza os campos
  function renderCampos(tipo) {
    if (tipo === "aluno") {
      camposDinamicos.innerHTML = `
        <div class="input-group">
          <label>Matrícula do Aluno</label>
          <div class="input-wrapper">
            <input type="text" id="matricula" required />
          </div>
        </div>
      `;
    } else {
      camposDinamicos.innerHTML = `
        <div class="input-group">
          <label>Matrícula do Professor</label>
          <div class="input-wrapper">
            <input type="text" id="matricula" required />
          </div>
        </div>

        <div class="input-group">
          <label>Área</label>
          <div class="input-wrapper">
            <input type="text" id="area" />
          </div>
        </div>
      `;
    }
  }

  // Render inicial (tipo = aluno)
  renderCampos(selectTipo.value);

  // Evento de mudança
  selectTipo.addEventListener("change", () => {
    renderCampos(selectTipo.value);
  });

  const form = container.querySelector("#register-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Captura valores
    const tipo = container.querySelector("#tipo").value;
    const nome = container.querySelector("#nome").value.trim();
    const email = container.querySelector("#email").value.trim();
    const matricula = container.querySelector("#matricula").value.trim();
    const senha = container.querySelector("#senha").value;

    // // Verificar se os campos estão vazios
    if (!nome || !email || !matricula || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    // gerar hash da senha
    const senhaHash = await hashPassword(senha);

    console.log("Senha original:", senha);
    console.log("Senha hash:", senhaHash);

    // montar objeto usuário
    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      matricula,
      senha: senhaHash,
      role: tipo,
      status: "pendente"
    };

    // pegar usuários existentes
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // adicionar novo usuário
    usuarios.push(novoUsuario);

    // salvar no localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    console.log("Usuário cadastrado:", novoUsuario);

    alert("Cadastro realizado com sucesso! Aguarde aprovação.");

    // redirecionar para login
    navigateTo("/");
  });

  return container;
}