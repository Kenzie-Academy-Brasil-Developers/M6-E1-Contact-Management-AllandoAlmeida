import { z } from "zod";

export const CustomerSchema = z.object({
  name: z.string().min(4, "Nome é obrigatório"),
  username: z.string().min(4, "Username é obrigatório"),
  password: z.string().min(4, "Senha é obrigatório"),
  telephone: z.string().min(8, "Telefone inválido"),
  email: z.string().email("Deve ser um e-mail válido"),
})

export type CustomerData = z.infer<typeof CustomerSchema>;