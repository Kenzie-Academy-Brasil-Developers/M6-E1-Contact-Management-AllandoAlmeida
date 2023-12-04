import { IContact } from "@/app/contacts/service/@Type.contact";


export interface ISignUp {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    telephone: string;
    email: string;
  }
  
  export interface ISignUpResponse {
    customer: ICustomers[];
  }
  
  export interface ICustomers {
    id: string;
    name: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    isActive: Boolean;
    phones: IPhone[];
    emails: IEmail[];
    contacts: IContact[];
  }
  
  export interface IPhone {
    id: string;
    telephone: string;
    
  }
  
  export interface IEmail {
    id: string;
    email: string;
  }

export interface IFormSignUp {
  name: string;
  username: string;
  password: string;
  bio?: string;
  confirmPassword: string;
  telephone: string;
  email: string;
}
