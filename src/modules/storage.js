import { hashPassword } from "./auth.js"

// função para inicializar dados mock
export async function initMockUsers() {
  const usuariosExistentes = localStorage.getItem("usuarios")

  // evita recriar sempre
  if (usuariosExistentes) return

  // criando usuários com senha hash
  const usuarios = [
    {
      id: 1,
      nome: "Coordenador",
      email: "coord@ifpb.edu.br",
      role: "COORDENADOR",
      senha: await hashPassword("123456")
    },
    {
      id: 2,
      nome: "Professor",
      email: "prof@ifpb.edu.br",
      role: "PROFESSOR",
      senha: await hashPassword("123456")
    },
    {
      id: 3,
      nome: "Aluno",
      email: "aluno@ifpb.edu.br",
      role: "ALUNO",
      senha: await hashPassword("123456")
    }
  ]

  localStorage.setItem("usuarios", JSON.stringify(usuarios))
}