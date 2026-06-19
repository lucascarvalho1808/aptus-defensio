//Busca todas as propostas salvas no LocalStorage
export function getPropostas() {
  return JSON.parse(localStorage.getItem("propostas")) || [];
}

// Salva uma nova proposta no LocalStorage
export function saveProposta(proposta) {

  // Busca propostas já cadastradas
  const propostas = getPropostas();

  // Adiciona nova proposta no array
  propostas.push(proposta);

  // Salva novamente no LocalStorage
  localStorage.setItem(
    "propostas",
    JSON.stringify(propostas)
  );
}