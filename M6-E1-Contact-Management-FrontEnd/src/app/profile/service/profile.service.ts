// profile.service.ts
"use client";
import {
  ISessionResponse,
  isTokenExpired,
  updateToken,
} from "@/app/(login)/service/session.service";
import { API_BASE_URL } from "@/service/api";

export interface CustomerType {
  id: string;
  username: string;
  name: string;
  telephone: string;
  email: string;
  isActive: string;
}

export interface ContactType {
  contact: any;
  id: string;
  name: string;
  zipCode: string;
  street: string;
  complement: string;
  district: string;
  locality: string;
  state: string;
  telephone: string;
  email: string;
}

export interface ICustomerSignUp {
  customer: CustomerType;
  contacts: { ContactType: any }[];
}

export interface TCustomerProfile {
  customer: {
    id: string;
    username: string;
    name: string;
    telephone: string;
    email: string;
    isActive: string;
  };
  contacts: {
    id: string;
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

export async function fetchProfile(): Promise<ICustomerSignUp> {
  try {
    const tokenWithQuotes = localStorage.getItem("@Management:accessToken");

    if (tokenWithQuotes) {
      const token = tokenWithQuotes.replace(/"/g, "");
      const accessTokenData = JSON.parse(atob(token.split(".")[1]));

      if (await isTokenExpired()) {
        const updatedToken = await updateToken();

        if (!updatedToken) {
          console.error("Falha ao atualizar o token");
          throw new Error("Falha ao atualizar o token");
        }
      }

      const userId = accessTokenData.sub;

      const response = await fetch(`${API_BASE_URL}/customers/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: ICustomerSignUp = await response.json();
        return data;
      }

      console.error("Falha ao obter dados do perfil");
      throw new Error("Falha ao obter dados do perfil");
    }
  } catch (error) {
    console.error("Falha ao obter dados do perfil:", error);
    throw new Error("Falha ao obter dados do perfil");
  }

  throw new Error("Falha ao obter dados do perfil");
}
