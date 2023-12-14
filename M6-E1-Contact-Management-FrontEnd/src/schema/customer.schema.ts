import { DeepPartial } from "react-hook-form";
import { z } from "zod";

export const CustomerSchema = z.object({
  name: z.string().min(4, "Nome é obrigatório"),
  username: z.string().min(4, "Username é obrigatório"),
  password: z.string().min(4, "Senha é obrigatório"),
  telephone: z.string().min(8, "Telefone inválido"),
  email: z.string().email("Deve ser um e-mail válido"),
});

export type CustomerData = z.infer<typeof CustomerSchema>;

export const CustomerContactSchema = z.object({
  customer: z.union([
    z.object({
      id: z.string(),
      username: z.string(),
      name: z.string(),
      telephone: z.string(),
      email: z.string().email(),
      isActive: z.boolean(),
      contacts: z.object({
        id: z.string(),
        name: z.string(),
        zipCode: z.string(),
        street: z.string(),
        complement: z.string(),
        district: z.string(),
        locality: z.string(),
        state: z.string(),
        telephone: z.string(),
        email: z.string().email(),
      }),
    }),
    z.null(), // Permitindo que 'customer' possa ser null
  ]),
});

export type CustomerContactData = z.infer<typeof CustomerContactSchema>;
export type DeepPartialCustomerContactData = DeepPartial<CustomerContactData>;


export const CustomerParamsSchema = z.object({
  params: z.object({
    customerId: z.string().nullable(),
  }),
});

export const CustomerTypeSchema = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  telephone: z.string().optional(),
  email: z.string().email().optional(),
});

export type TCustomerParams = z.infer<typeof CustomerParamsSchema>;
export type ICustomerType = z.infer<typeof CustomerTypeSchema>;