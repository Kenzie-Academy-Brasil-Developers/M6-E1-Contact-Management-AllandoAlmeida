import { Slide, toast } from "react-toastify";
import { API_BASE_URL } from "../api";
import { IContactForm } from "@/app/components/Form/ContactForm";

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
  cep: string;
  address: string;
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

export async function Contact(
  data: IContactForm
): Promise<IContactResponse | null> {
  try {
    const body = {
      ...data,
    };

    const accessToken = localStorage
      .getItem("@ContactManagement:accessToken")
      ?.replace(/"/g, "");
    const customerId = localStorage.getItem("@ContactManagement:id");

    if (!customerId) throw new Error("Customer not found!");

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      userId: customerId,
    };
    if (customerId) {
      headers.userId = customerId;
    }

    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    
    if (response.ok) {
      const responseData: IContactResponse = await response.json();
      toast.success("Contato Registrado com sucesso", {
        transition: Slide,
        autoClose: 2000,
      });
      return responseData;
    } else {
      console.error("Erro:", response.statusText);
      return null;
    }
  } catch (error) {
    toast.error("Ocorreu um erro ao tentar se cadastrar.", {
      transition: Slide,
      autoClose: 2000,
    });
    return null;
  }
}
