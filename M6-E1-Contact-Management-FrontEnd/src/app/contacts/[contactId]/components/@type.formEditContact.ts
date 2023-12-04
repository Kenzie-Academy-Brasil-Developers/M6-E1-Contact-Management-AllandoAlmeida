import { TCurrentContact } from "../contact.service/@type.contact";

export interface TFormCurrentContac extends TCurrentContact {
    currentContact: {
      id?: string;
      name: string;
      zipCode: string;
      street: string;
      complement: string;
      district: string;
      locality: string;
      state: string;
      phones: { telephone: string }[];
      emails: { email: string }[];
    };
  }
  