export interface IContactForm {
    name: string;
    zipCode: string;
    street: string;
    complement: string;
    district: string;
    locality: string;
    state: string;
    phones: { telephone: string }[];
    emails: { email: string }[];
  }
  