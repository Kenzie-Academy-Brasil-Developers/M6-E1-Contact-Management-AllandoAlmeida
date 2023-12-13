import { DeepPartial } from "react-hook-form";
import { z } from "zod";

export const ContactSchema = z.object({
  id: z.string(),
  name: z.string().min(4, "Nome é obrigatório"),
  telephone: z.string().min(8, "Telefone inválido"),
  email: z.string().email("Deve ser um e-mail válido"),
  zipCode: z.string(),
  street: z.string(),
  complement: z.string(),
  district: z.string(),
  locality: z.string(),
  state: z.string(),
});

export const ContactParamsSchema = z.object({
  params: z.object({
    contactId: z.string().nullable(),
  }),
});

export const ContactTypeSchema = z.object({
  name: z.string().optional(),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  district: z.string().optional(),
  locality: z.string().optional(),
  state: z.string().optional(),
  telephone: z.string().optional(),
  email: z.string().email().optional(),
});

export type ContactData = z.infer<typeof ContactSchema>;
export type DeepPartialContactData = DeepPartial<ContactData>;
export type TContactParams = z.infer<typeof ContactParamsSchema>;
export type IContactType = z.infer<typeof ContactTypeSchema>;
