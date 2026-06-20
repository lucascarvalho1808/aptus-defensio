import { z } from "zod";

// Schema do formulário de cadastro
export const registerSchema = z
  .object({
    nome: z
      .string()
      .min(3, "Digite um nome válido"),

    email: z
      .string()
      .email("Digite um e-mail válido"),

    matricula: z
      .string()
      .min(1, "Informe a matrícula"),

    role: z.enum(["aluno", "professor"]),

    password: z
      .string()
      .min(6, "A senha deve possuir pelo menos 6 caracteres"),

    confirmPassword: z
      .string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    }
  );

export type RegisterSchema = z.infer<typeof registerSchema>;