function createHeader() {
  const header = document.createElement("header");
  header.classList.add("header");
  header.innerHTML = `
    <div class="logo">
      <strong>Aptus Defensio</strong>
    </div>
    <nav class="nav">
      <a href="#">Sobre</a>
      <a href="#">Coordenação</a>
      <a href="#">Professores</a>
      <a href="#">Alunos</a>
    </nav>
  `;
  return header;
}

function createHero() {
  const section = document.createElement("section");
  section.classList.add("hero");
  section.innerHTML = `
    <h1>CONTROLE DE<br>DEFESA E PRAZOS</h1>
    <p>Gestão inteligente e automatizada para programas de pós-graduação. O caminho seguro até a sua aprovação final.</p>
    <div class="buttons">
      <button class="btn-primary">Acessar o Sistema</button>
      <button class="btn-secondary">Agendar Demonstração</button>
    </div>
  `;
  return section;
}

function createCards() {
  const container = document.createElement("section");
  container.classList.add("cards");

  const data = [
    {
      title: "Proposta de TCC",
      features: ["Sistema de autenticação", "Cadastro de professores e alunos", "Cadastro de temas", "Envio de proposta", "Convite de orientador"]
    },
    {
      title: "Desenvolvimento",
      features: ["Acompanhamento do progresso", "Registro de reuniões", "Visualização de orientandos", "Envio de documentos"]
    },
    {
      title: "Defesa",
      features: ["Inscrição para defesa", "Agendamento de banca", "Convite de avaliadores"]
    }
  ];

  data.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    const list = item.features.map(f => `<li>${f}</li>`).join("");
    card.innerHTML = `
      <h3>${item.title}</h3>
      <ul class="features">${list}</ul>
    `;
    container.appendChild(card);
  });

  return container;
}

// Função principal que o router.js vai chamar
export function createDashboardPage() {
  const fragment = document.createDocumentFragment();
  
  fragment.appendChild(createHeader());
  fragment.appendChild(createHero());
  fragment.appendChild(createCards());
  
  return fragment;
}