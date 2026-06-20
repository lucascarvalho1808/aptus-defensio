import { z } from "zod";

// Regex para e-mail institucional do IFPB
const emailRegex =
  /^[a-zA-Z0-9._%+-]+@academico\.ifpb\.edu\.br$/;

// Regex para senha forte
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

// Schema do formulário de cadastro
export const registerSchema = z
  .object({
    nome: z
      .string()
      .min(3, "Digite um nome válido"),

    email: z
      .string()
      .regex(
        emailRegex,
        "Utilize um e-mail institucional do IFPB"
      ),

    matricula: z
      .string()
      .min(1, "Informe a matrícula"),

    role: z.enum(
      ["aluno", "professor"],
      {
        message: "Selecione um perfil válido",
      }
    ),

    password: z
      .string()
      .regex(
        passwordRegex,
        "A senha deve possuir no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial"
      ),

    confirmPassword: z.string(),
  })
  // Confirmação das senhas
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "As senhas não coincidem",
    }
  );

export type RegisterSchema = z.infer<typeof registerSchema>;