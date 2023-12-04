export interface IContactType {
  contacts: { ContactType: any }[];
}
export interface IPageProps {
  params: { contactId: string };
}

export interface TCurrentContact {
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
}
