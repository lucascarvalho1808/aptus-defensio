import { z } from "zod";

export const orientacaoSchema = z.object({
  id_professor: z.string().min(1, "Selecione um professor."),
  mensagem: z
    .string()
    .min(10, "A mensagem deve possuir pelo menos 10 caracteres."),
});

export type OrientacaoSchema = z.infer<typeof orientacaoSchema>;
