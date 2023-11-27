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
  
  export interface IContact {
    id: string;
    name: string;
    createdAt: string; 
    updatedAt?: string;
    isActive: boolean;
  }
  