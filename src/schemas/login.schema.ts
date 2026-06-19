import { z } from "zod";

// Schema do formulário de login
export const loginSchema = z.object({
  email: z
    .string()
    .email("Digite um e-mail válido"),

  password: z
    .string()
    .min(6, "A senha deve possuir pelo menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;