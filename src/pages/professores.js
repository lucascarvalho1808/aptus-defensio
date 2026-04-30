import { addProfessor } from "../services/professorService.js";

export function createProfessoresPage() {
  const container = document.createElement("div");
  container.classList.add("dashboard-container");

  container.innerHTML = `
    <div class="content">
      
      <h1 class="page-title">Gestão de Professores</h1>

      <div class="dashboard-grid">
        <!-- FORMULÁRIO -->
        <div class="admin-card">
          <h2>Cadastrar Professor</h2>
          
          <form id="form-professor">
            <div class="input-group">
              <label>Nome</label>
              <div class="input-wrapper">
                <input type="text" id="nome" required placeholder="Digite o nome completo" />
              </div>
            </div>

            <div class="input-group">
              <label>E-mail</label>
              <div class="input-wrapper">
                <input type="email" id="email" required placeholder="exemplo@instituicao.com" />
              </div>
            </div>

            <div class="input-group">
              <label>Área</label>
              <div class="input-wrapper">
                <input type="text" id="area" placeholder="Ex: Matemática, História..." />
              </div>
            </div>

            <button type="submit" class="btn-submit">
              Cadastrar
            </button>
          </form>
        </div>

        <!-- TABELA -->
        <div class="admin-card">
          <h2>Professores Cadastrados</h2>

          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Área</th>
                </tr>
              </thead>
              <tbody id="lista-professores">
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `;

    const form = container.querySelector("#form-professor");

    form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Pegar os valores que o usuárui digitou em cada campo
    const nome = container.querySelector("#nome").value.trim();
    const email = container.querySelector("#email").value.trim();
    const area = container.querySelector("#area").value.trim();

    // Verificar se campos nome e email estão vazios
    if (!nome || !email) {
        alert("Nome e e-mail são obrigatórios.");
        return;
    }

    // Cria o objeto professor
    const professor = {
        nome,
        email,
        area
    };

    // Salva no LocalStorage
    addProfessor(professor);

    console.log("Professor salvo:", professor);

    // Limpar formulário
    form.reset();

    alert("Professor cadastrado com sucesso!");
    });

  return container;
}

