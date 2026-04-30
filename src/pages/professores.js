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

  return container;
}