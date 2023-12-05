import { TCurrentContact } from "../contact.service/@type.contact";

export interface TFormCurrentContact extends TCurrentContact {
  currentContact: {
    id?: string;
    name: string;
    zipCode: string;
    street: string;
    complement: string;
    district: string;
    locality: string;
    state: string;
    telephone: string;
    email: string;
  };
}
