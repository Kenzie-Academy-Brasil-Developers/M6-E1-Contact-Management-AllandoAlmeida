export interface IContact {
    manualInput: any;
    name: string;
    zipCode: string;
    street: string;
    complement: string;
    district: string;
    locality: string;
    state: string;
    phones: { telephone: string }[];
    emails: { email: string }[];
    contactToCustomers: [
      {
        customerId: string;
      }
    ];
  }
  
  export interface IContactResponse {
    id: string;
    name: string;
    zipCode: string;
    street: string;
    complement: string;
    district: string;
    locality: string;
    state: string;
    createdAt: string;
    updated: string;
    isActive: boolean;
    phones: {
      id: string;
      telephone: string;
      customerId: string | null;
      contactId: string;
    }[];
    emails: {
      id: string;
      email: string;
      customerId: string | null;
      contactId: string;
    }[];
    customers: string[];
  }
  