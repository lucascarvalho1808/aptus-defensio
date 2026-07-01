import { z } from "zod";

export const temaSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, "O tema deve possuir pelo menos 3 caracteres.")
    .max(120, "O tema deve possuir no máximo 120 caracteres."),
});

export type TemaSchema = z.infer<typeof temaSchema>;