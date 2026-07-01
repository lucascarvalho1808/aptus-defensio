import { hashPassword } from "./auth.js"

// função para inicializar dados mock
export async function initMockUsers() {
  const usuariosExistentes = localStorage.getItem("usuarios")

  // evita recriar sempre
  if (usuariosExistentes) return

  // cria usuários com senha hash, status e matrícula
  const usuarios = [
    {
      id: 1,
      nome: "Coordenador",
      email: "coord@ifpb.edu.br",
      matricula: "202610001",
      role: "COORDENADOR",
      status: "ativo", 
      senha: await hashPassword("123456")
    },
    {
      id: 2,
      nome: "Professor",
      email: "prof@ifpb.edu.br",
      matricula: "202610002",
      role: "PROFESSOR",
      status: "pendente", 
      senha: await hashPassword("123456")
    },
    {
      id: 3,
      nome: "Aluno",
      email: "aluno@ifpb.edu.br",
      matricula: "202610003",
      role: "ALUNO",
      status: "pendente", 
      senha: await hashPassword("123456")
    }
  ]

  localStorage.setItem("usuarios", JSON.stringify(usuarios))
}