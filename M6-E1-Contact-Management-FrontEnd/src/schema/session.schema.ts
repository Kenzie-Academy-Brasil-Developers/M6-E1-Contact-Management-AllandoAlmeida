import { z } from "zod";

export const SessionSchema = z.object({
  username: z.string().min(4, "Username é obrigatório"),
  password: z.string().min(4, "Senha é obrigatório"),
});

export type SessionData = z.infer<typeof SessionSchema>;
