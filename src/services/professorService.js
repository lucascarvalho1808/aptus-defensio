const STORAGE_KEY = "professores";

// Busca todos os professores
export function getProfessores() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}


// Salva lista completa de professores
function saveProfessores(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

// Adiciona um novo professor
export function addProfessor(professor) {
  const professores = getProfessores();

  // Gera um ID simples
  const novoProfessor = {
    id: Date.now(),
    ...professor
  };

  professores.push(novoProfessor);

  saveProfessores(professores);

  return novoProfessor;
}